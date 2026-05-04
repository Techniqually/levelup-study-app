from __future__ import annotations

import collections
import logging
import os

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.auth import is_admin_user, verify_supabase_jwt
from app.billing import create_billing_router
from app.email_service import EmailService
from app.llm_upstream import UpstreamHttpError, chat_completion_json
from app.stripe_webhook import create_stripe_webhook_router
from app.supabase_admin import SupabaseAdminStore

logger = logging.getLogger("levelup.api")
logging.basicConfig(level=os.environ.get("LOG_LEVEL", "INFO"))


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    openai_api_key: str = Field(default="", validation_alias="OPENAI_API_KEY")
    openai_base_url: str = Field(
        default="https://api.openai.com/v1",
        validation_alias="OPENAI_BASE_URL",
    )
    model: str = Field(default="gpt-4o-mini", validation_alias="MODEL")
    cors_origins: str = Field(default="", validation_alias="CORS_ORIGINS")
    max_tokens: int = Field(default=512, validation_alias="MAX_TOKENS")
    llm_timeout_s: float = Field(default=60.0, validation_alias="LLM_TIMEOUT_S")
    supabase_url: str = Field(default="", validation_alias="SUPABASE_URL")
    supabase_service_role_key: str = Field(default="", validation_alias="SUPABASE_SERVICE_ROLE_KEY")
    supabase_jwt_secret: str = Field(default="", validation_alias="SUPABASE_JWT_SECRET")
    supabase_anon_key_public: str = Field(default="", validation_alias="SUPABASE_ANON_KEY_PUBLIC")
    stripe_secret_key: str = Field(default="", validation_alias="STRIPE_SECRET_KEY")
    stripe_webhook_secret: str = Field(default="", validation_alias="STRIPE_WEBHOOK_SECRET")
    # Admin API key — kept as a fallback for ops scripts. Real admin UI uses Supabase auth + role check.
    admin_api_key: str = Field(default="", validation_alias="ADMIN_API_KEY")
    # Email (Resend)
    resend_api_key: str = Field(default="", validation_alias="RESEND_API_KEY")
    email_from: str = Field(default="", validation_alias="EMAIL_FROM")
    email_reply_to: str = Field(default="", validation_alias="EMAIL_REPLY_TO")
    # Internal webhook signing secret (set on Supabase Database Webhook → /internal/email/welcome)
    internal_webhook_secret: str = Field(default="", validation_alias="INTERNAL_WEBHOOK_SECRET")


def get_settings() -> Settings:
    return Settings()


settings = get_settings()

app = FastAPI(title="LevelUp LLM proxy", version="0.2.0")

_RATE_WINDOW_SECONDS = 60.0
_RATE_MAX_REQUESTS = 5
_rate_windows: dict[str, collections.deque[float]] = {}


def _enforce_per_user_rate_limit(user_id: str) -> None:
    import time

    now = time.time()
    win = _rate_windows.get(user_id)
    if win is None:
        win = collections.deque()
        _rate_windows[user_id] = win
    cutoff = now - _RATE_WINDOW_SECONDS
    while win and win[0] < cutoff:
        win.popleft()
    if len(win) >= _RATE_MAX_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "rate_limited",
                "message": "Rate limit exceeded (max 5 requests per minute per user)",
            },
        )
    win.append(now)


def _parse_cors_origins(raw: str) -> list[str]:
    if not raw:
        return []
    out: list[str] = []
    for part in raw.split(","):
        p = part.strip().replace("\r", "").strip()
        if p:
            out.append(p)
    return out


_LOCALHOST_ORIGIN_REGEX = r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"

# CORS is registered *after* auth_guard_middleware below — FastAPI prepends each
# add_middleware, so registering CORSMiddleware last keeps it outside auth on
# the inbound chain. Otherwise OPTIONS preflight hits auth first, gets 401, and
# browsers report missing Access-Control-Allow-Origin.

# ── Shared singletons ────────────────────────────────────────────────────────

_admin_store: SupabaseAdminStore | None = None
if (settings.supabase_url or "").strip() and (settings.supabase_service_role_key or "").strip():
    try:
        _admin_store = SupabaseAdminStore(
            settings.supabase_url, settings.supabase_service_role_key
        )
    except Exception as exc:  # noqa: BLE001
        logger.warning("SupabaseAdminStore disabled: %s", exc)

_email_service: EmailService | None = None
if _admin_store is not None and (settings.resend_api_key or "").strip():
    try:
        _email_service = EmailService(
            admin_client=_admin_store.client,
            resend_api_key=settings.resend_api_key,
            from_address=settings.email_from,
            reply_to=settings.email_reply_to or None,
            enabled=True,
        )
    except Exception as exc:  # noqa: BLE001
        logger.warning("EmailService disabled: %s", exc)


# ── Auth guard ────────────────────────────────────────────────────────────────

@app.middleware("http")
async def auth_guard_middleware(request: Request, call_next):
    path = request.url.path
    # /llm/* and /billing/* require a signed-in user
    if path.startswith("/llm/") or path.startswith("/billing/"):
        try:
            ctx = verify_supabase_jwt(request, settings.supabase_jwt_secret)
        except HTTPException as exc:
            return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})
        request.state.auth_user_id = ctx.user_id

    # /admin/* requires either admin API key OR an admin user JWT
    if path.startswith("/admin/"):
        api_key = (request.headers.get("x-admin-api-key") or "").strip()
        expected = (settings.admin_api_key or "").strip()
        if expected and api_key == expected:
            return await call_next(request)
        try:
            ctx = verify_supabase_jwt(request, settings.supabase_jwt_secret)
        except HTTPException:
            return JSONResponse(
                status_code=401,
                content={"detail": "Admin requires X-Admin-Api-Key or an admin user JWT"},
            )
        is_admin = await is_admin_user(
            settings.supabase_url, settings.supabase_service_role_key, ctx.user_id
        )
        if not is_admin:
            return JSONResponse(status_code=403, content={"detail": "Not an admin user"})
        request.state.auth_user_id = ctx.user_id

    # /internal/* requires the shared internal webhook secret (used by Supabase DB webhooks)
    if path.startswith("/internal/"):
        provided = (request.headers.get("x-internal-secret") or "").strip()
        expected = (settings.internal_webhook_secret or "").strip()
        if not expected or provided != expected:
            return JSONResponse(
                status_code=401,
                content={"detail": "Missing or invalid X-Internal-Secret header"},
            )

    return await call_next(request)


_origins = _parse_cors_origins(settings.cors_origins or "")
if _origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_origins,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    logger.info("CORS allow_origins=%r", _origins)
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=_LOCALHOST_ORIGIN_REGEX,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    logger.warning(
        "CORS_ORIGINS is empty — using localhost regex only. "
        "Set CORS_ORIGINS for production (see README)."
    )


# ── Public endpoints ──────────────────────────────────────────────────────────

@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/config")
async def get_client_config() -> dict[str, str]:
    return {
        "supabaseUrl": settings.supabase_url,
        "supabaseAnonKey": settings.supabase_anon_key_public,
    }


# ── Admin endpoints ───────────────────────────────────────────────────────────

class LinkStudentBody(BaseModel):
    parent_user_id: str = Field(..., min_length=1, max_length=64)
    student_user_id: str = Field(..., min_length=1, max_length=64)
    label: str | None = Field(default=None, max_length=100)


class GrantSubjectEntitlementBody(BaseModel):
    student_user_id: str = Field(..., min_length=1, max_length=64)
    country_code: str = Field(..., min_length=2, max_length=3)
    class_code: str = Field(..., min_length=2, max_length=20)
    subject_slug: str = Field(..., min_length=1, max_length=64)
    access_to: str | None = Field(default=None, description="ISO 8601 expiry datetime, or null for no expiry")


def _require_admin_store() -> SupabaseAdminStore:
    if _admin_store is None:
        raise HTTPException(status_code=503, detail="Supabase service role not configured")
    return _admin_store


@app.post("/admin/link-student")
async def link_student(body: LinkStudentBody) -> dict:
    store = _require_admin_store()
    try:
        store.client.table("parent_student_links").insert(
            {
                "parent_user_id": body.parent_user_id,
                "student_user_id": body.student_user_id,
                "label": body.label,
            }
        ).execute()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Supabase error: {exc!s}") from exc
    return {"ok": True, "parent_user_id": body.parent_user_id, "student_user_id": body.student_user_id}


@app.post("/admin/grant-subject-entitlement")
async def grant_subject_entitlement(body: GrantSubjectEntitlementBody) -> dict:
    store = _require_admin_store()
    payload: dict = {
        "user_id": body.student_user_id,
        "country_code": body.country_code,
        "class_code": body.class_code,
        "subject_slug": body.subject_slug,
        "source": "admin_manual",
    }
    if body.access_to:
        payload["access_to"] = body.access_to
    try:
        store.client.table("subject_entitlements").upsert(
            payload, on_conflict="user_id,country_code,class_code,subject_slug"
        ).execute()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Supabase error: {exc!s}") from exc
    return {"ok": True, "granted": payload}


# ── Internal webhook endpoints (Supabase DB → /internal/...) ────────────────

class WelcomeEmailBody(BaseModel):
    user_id: str = Field(..., min_length=1, max_length=64)
    email: str = Field(..., min_length=3, max_length=320)
    display_name: str | None = Field(default=None, max_length=200)


@app.post("/internal/email/welcome")
async def internal_welcome_email(body: WelcomeEmailBody) -> dict:
    if _email_service is None or not _email_service.enabled:
        return {"ok": True, "skipped": "email_disabled"}
    res = await _email_service.send_welcome(
        user_id=body.user_id,
        recipient=body.email,
        display_name=body.display_name,
    )
    return {"ok": res.ok, "deduped": res.deduped, "provider_id": res.provider_id, "error": res.error}


# ── LLM endpoints (unchanged shape) ──────────────────────────────────────────


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


@app.post("/llm/quiz-explain")
async def quiz_explain(body: QuizExplainBody, request: Request) -> dict:
    user_id = str(getattr(request.state, "auth_user_id", "") or "")
    if user_id:
        _enforce_per_user_rate_limit(user_id)

    key = (settings.openai_api_key or "").strip()
    if not key:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY is not configured")

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
            if (
                "insufficient" in uc
                or uc == "billing_hard_limit_reached"
                or "billing" in um.lower()
                or "credit" in um.lower()
                or "quota" in um.lower()
            ):
                detail["message"] = (
                    "OpenAI blocked this call for billing/quota. "
                    "Complete Billing: add a payment method and/or buy credits."
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
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=f"Upstream LLM error: {e!s}") from e

    return {
        "ok": True,
        "parsed": result.get("parsed"),
        "raw_content": result.get("raw_content"),
        "parse_error": result.get("parse_error"),
        "model": result.get("model"),
        "usage": result.get("usage"),
    }


# ── Stripe + billing routers ─────────────────────────────────────────────────

if (
    (settings.stripe_secret_key or "").strip()
    and (settings.stripe_webhook_secret or "").strip()
    and _admin_store is not None
):
    try:
        app.include_router(
            create_stripe_webhook_router(
                stripe_secret_key=settings.stripe_secret_key,
                stripe_webhook_secret=settings.stripe_webhook_secret,
                admin_store=_admin_store,
                email_service=_email_service,
            )
        )
        logger.info("Stripe webhook router enabled")
    except Exception as exc:  # noqa: BLE001
        logger.warning("Stripe webhook router disabled: %s", exc)
else:
    logger.info("Stripe webhook router disabled (missing Stripe/Supabase env vars)")

if (settings.stripe_secret_key or "").strip() and _admin_store is not None:
    try:
        app.include_router(
            create_billing_router(
                stripe_secret_key=settings.stripe_secret_key,
                admin_store=_admin_store,
            )
        )
        logger.info("Billing router enabled")
    except Exception as exc:  # noqa: BLE001
        logger.warning("Billing router disabled: %s", exc)


# Allow `uvicorn app.main:app` with cwd = api/
if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", "8080"))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)
