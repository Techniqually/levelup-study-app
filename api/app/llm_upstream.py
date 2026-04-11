"""OpenAI-compatible chat completions via httpx."""

from __future__ import annotations

import json
import re
from typing import Any

import httpx

_FENCE_RE = re.compile(r"^```(?:json)?\s*|\s*```$", re.MULTILINE)


def _parse_openai_style_error(body: str) -> tuple[str, str]:
    """From JSON `{\"error\":{...}}` return (code_or_type, message)."""
    if not (body and body.strip()):
        return "", ""
    try:
        j = json.loads(body)
        err = j.get("error") if isinstance(j, dict) else None
        if isinstance(err, dict):
            code = str(err.get("code") or err.get("type") or "")
            msg = str(err.get("message") or "")
            return code, msg
    except (json.JSONDecodeError, TypeError):
        pass
    return "", ""


class UpstreamHttpError(Exception):
    """Non-success response from the LLM HTTP API."""

    def __init__(self, status_code: int, body: str, headers: httpx.Headers) -> None:
        self.status_code = status_code
        self.body = body
        self.headers = headers
        self.provider_code, self.provider_message = _parse_openai_style_error(body)
        super().__init__(f"Upstream HTTP {status_code}")


def strip_json_fences(text: str) -> str:
    t = text.strip()
    t = _FENCE_RE.sub("", t).strip()
    return t


def _raise_if_error(resp: httpx.Response) -> None:
    if resp.status_code >= 400:
        raise UpstreamHttpError(resp.status_code, resp.text, resp.headers)


async def chat_completion_json(
    *,
    base_url: str,
    api_key: str,
    model: str,
    messages: list[dict[str, str]],
    max_tokens: int,
    temperature: float,
    timeout_s: float,
) -> dict[str, Any]:
    """
    POST /chat/completions (OpenAI-compatible).
    Uses response_format json_object when supported; retries once without it on 400.
    """
    root = base_url.rstrip("/")
    url = f"{root}/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    base_body: dict[str, Any] = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }
    async with httpx.AsyncClient(timeout=timeout_s) as client:
        body = {**base_body, "response_format": {"type": "json_object"}}
        resp = await client.post(url, headers=headers, json=body)
        if resp.status_code == 400:
            resp2 = await client.post(url, headers=headers, json=base_body)
            _raise_if_error(resp2)
            data = resp2.json()
        else:
            _raise_if_error(resp)
            data = resp.json()

    choice0 = (data.get("choices") or [{}])[0]
    msg = choice0.get("message") or {}
    content = (msg.get("content") or "").strip()
    usage = data.get("usage")

    parsed: dict[str, Any] | None = None
    parse_error: str | None = None
    if content:
        try:
            cleaned = strip_json_fences(content)
            parsed = json.loads(cleaned)
            if not isinstance(parsed, dict):
                parse_error = "model JSON was not an object"
                parsed = None
        except json.JSONDecodeError as e:
            parse_error = str(e)

    return {
        "model": data.get("model", model),
        "usage": usage,
        "raw_content": content,
        "parsed": parsed,
        "parse_error": parse_error,
    }
