from __future__ import annotations

import os
import secrets
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.llm_upstream import UpstreamHttpError, chat_completion_json


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    openai_api_key: str = Field(default="", validation_alias="OPENAI_API_KEY")
    openai_base_url: str = Field(
        default="https://api.openai.com/v1",
        validation_alias="OPENAI_BASE_URL",
    )
    model: str = Field(default="gpt-4o-mini", validation_alias="MODEL")
    app_token: str = Field(default="", validation_alias="APP_TOKEN")
    cors_origins: str = Field(default="", validation_alias="CORS_ORIGINS")
    max_tokens: int = Field(default=512, validation_alias="MAX_TOKENS")
    llm_timeout_s: float = Field(default=60.0, validation_alias="LLM_TIMEOUT_S")


def get_settings() -> Settings:
    return Settings()


settings = get_settings()

app = FastAPI(title="LevelUp LLM proxy", version="0.1.0")


def _parse_cors_origins(raw: str) -> list[str]:
    """Comma-separated list; strips Windows \\r so entries match browser Origin exactly."""
    if not raw:
        return []
    out: list[str] = []
    for part in raw.split(","):
        p = part.strip().replace("\r", "").strip()
        if p:
            out.append(p)
    return out


# Any http(s) localhost / 127.0.0.1 with optional port — dev only fallback when CORS_ORIGINS is unset in container.
_LOCALHOST_ORIGIN_REGEX = r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"

_origins = _parse_cors_origins(settings.cors_origins or "")
if _origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_origins,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    print(f"[levelup-llm-proxy] CORS allow_origins={_origins!r}")
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=_LOCALHOST_ORIGIN_REGEX,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    print(
        "[levelup-llm-proxy] WARNING: CORS_ORIGINS is empty — using localhost/127.0.0.1 regex only. "
        "Set CORS_ORIGINS for GitHub Pages / production (see README)."
    )


def require_app_token(request: Request) -> None:
    """When APP_TOKEN is non-empty, require Authorization: Bearer <token>."""
    expected = (settings.app_token or "").strip()
    if not expected:
        return
    auth = request.headers.get("authorization") or ""
    parts = auth.split(None, 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization")
    if not secrets.compare_digest(parts[1].strip(), expected):
        raise HTTPException(status_code=401, detail="Invalid token")


TokenDep = Annotated[None, Depends(require_app_token)]


def _context_line(value: str | None, max_len: int) -> str:
    if not value or not str(value).strip():
        return ""
    t = " ".join(str(value).strip().split())
    return t[:max_len]


class QuizExplainBody(BaseModel):
    question: str = Field(..., min_length=1, max_length=8000)
    options: list[str] = Field(..., min_length=2, max_length=16)
    correct_index: int = Field(..., ge=0)
    chosen_index: int = Field(..., ge=0)
    canonical_hint: str | None = Field(default=None, max_length=2000)
    # Optional — from app; server merges into a fixed template (not free-form system prompts).
    subject_id: str | None = Field(default=None, max_length=64)
    subject_title: str | None = Field(default=None, max_length=200)
    topic_title: str | None = Field(default=None, max_length=300)
    level: str | None = Field(default=None, max_length=80)

    @model_validator(mode="after")
    def indices_in_range(self) -> QuizExplainBody:
        n = len(self.options)
        if self.correct_index >= n or self.chosen_index >= n:
            raise ValueError("correct_index and chosen_index must be valid option indices")
        return self


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/llm/quiz-explain")
async def quiz_explain(body: QuizExplainBody, _: TokenDep) -> dict:
    key = (settings.openai_api_key or "").strip()
    if not key:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured",
        )

    labels = [f"{i}. {t}" for i, t in enumerate(body.options)]
    hint_block = ""
    if body.canonical_hint and body.canonical_hint.strip():
        hint_block = f"\nAuthor hint (ground truth): {body.canonical_hint.strip()}\n"

    ctx_lines: list[str] = []
    lv = _context_line(body.level, 80)
    if lv:
        ctx_lines.append(f"Qualification level: {lv}")
    st = _context_line(body.subject_title, 200)
    if st:
        ctx_lines.append(f"Subject: {st}")
    elif body.subject_id and str(body.subject_id).strip():
        ctx_lines.append(f"Subject id: {_context_line(body.subject_id, 64)}")
    tt = _context_line(body.topic_title, 300)
    if tt:
        ctx_lines.append(f"Topic / chapter: {tt}")
    context_block = ""
    if ctx_lines:
        context_block = (
            "Student context (tune terminology, examples, and depth to this course; "
            "do not invent syllabus content beyond the question and hint):\n"
            + "\n".join(ctx_lines)
            + "\n\n"
        )

    system = (
        "You are a tutor for O-Level / secondary-style multiple-choice (e.g. Singapore-Cambridge "
        "or similar). The student may have answered wrong or wants reinforcement. "
        "Respond with a single JSON object only, no markdown. "
        "Keys: wrong_choice_explained (string, <=80 words), correct_logic (string, <=60 words), "
        "examiners_phrase (string, one line), try_again_question (string or null). "
        "Use exam-style wording where helpful. If the chosen index equals the correct index, "
        "still briefly reinforce why the answer is right."
    )
    user = (
        context_block
        + f"Question:\n{body.question}\n\n"
        + "Options:\n"
        + "\n".join(labels)
        + "\n\n"
        + f"Correct option index: {body.correct_index}\n"
        + f"Student's chosen index: {body.chosen_index}\n"
        + hint_block
    )

    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]

    try:
        result = await chat_completion_json(
            base_url=settings.openai_base_url,
            api_key=key,
            model=settings.model,
            messages=messages,
            max_tokens=min(settings.max_tokens, 1024),
            temperature=0.35,
            timeout_s=settings.llm_timeout_s,
        )
    except UpstreamHttpError as e:
        if e.status_code == 429:
            uc = (e.provider_code or "").lower()
            um = (e.provider_message or "").strip()
            detail: dict[str, str] = {
                "error": "upstream_rate_limit",
                "upstream_code": e.provider_code or "",
                "upstream_message": um[:800] if um else "",
            }
            # OpenAI often uses HTTP 429 for insufficient_quota / billing — unrelated to "requests shown" on chart.
            if (
                "insufficient" in uc
                or uc == "billing_hard_limit_reached"
                or "billing" in um.lower()
                or "credit" in um.lower()
                or "quota" in um.lower()
            ):
                detail["message"] = (
                    "OpenAI blocked this call for billing/quota (dashboard can still show 0 successful requests). "
                    "Complete Billing: add a payment method and/or buy credits — the “Add credits” banner means "
                    "new API keys cannot run until the account can be charged."
                )
            else:
                detail["message"] = (
                    "The LLM provider returned 429 (rate limit or temporary quota). Wait and retry, "
                    "or check Usage/limits in the provider dashboard."
                    + (f" Raw: {um[:400]}" if um else "")
                )
            ra = (e.headers.get("retry-after") or "").strip()
            if ra:
                detail["retry_after"] = ra
            raise HTTPException(status_code=429, detail=detail) from e
        if e.status_code in (401, 403):
            raise HTTPException(
                status_code=502,
                detail="Upstream rejected the API key (401/403). Check OPENAI_API_KEY in api/.env.",
            ) from e
        snippet = (e.body or "")[:800]
        raise HTTPException(
            status_code=502,
            detail=f"Upstream LLM HTTP {e.status_code}: {snippet or e.status_code}",
        ) from e
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream LLM error: {e!s}") from e

    return {
        "ok": True,
        "parsed": result.get("parsed"),
        "raw_content": result.get("raw_content"),
        "parse_error": result.get("parse_error"),
        "model": result.get("model"),
        "usage": result.get("usage"),
    }


# Allow `uvicorn app.main:app` with cwd = api/
if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)
