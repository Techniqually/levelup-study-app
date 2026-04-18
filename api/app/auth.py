from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import httpx
import jwt
from fastapi import HTTPException, Request
from jwt import InvalidTokenError


@dataclass
class AuthContext:
    user_id: str
    role: str
    claims: dict[str, Any]


def _get_bearer_token(request: Request) -> str:
    auth = (request.headers.get("authorization") or "").strip()
    parts = auth.split(None, 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization")
    token = parts[1].strip()
    if not token:
        raise HTTPException(status_code=401, detail="Missing bearer token")
    return token


def verify_supabase_jwt(request: Request, jwt_secret: str) -> AuthContext:
    if not (jwt_secret or "").strip():
        raise HTTPException(status_code=500, detail="SUPABASE_JWT_SECRET is not configured")
    token = _get_bearer_token(request)
    try:
        claims = jwt.decode(
            token,
            jwt_secret.strip(),
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
    except InvalidTokenError as exc:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT") from exc

    user_id = str(claims.get("sub") or "").strip()
    role = str(claims.get("role") or "").strip()
    if not user_id:
        raise HTTPException(status_code=401, detail="JWT missing user id")
    if role not in ("authenticated", "service_role"):
        raise HTTPException(status_code=403, detail="JWT role is not allowed")
    return AuthContext(user_id=user_id, role=role, claims=claims)


async def is_admin_user(supabase_url: str, service_role_key: str, user_id: str) -> bool:
    """Look up profiles.role for a user via the REST API. Returns True iff role='admin'."""
    if not (supabase_url or "").strip() or not (service_role_key or "").strip() or not user_id:
        return False
    base = supabase_url.rstrip("/")
    headers = {
        "apikey": service_role_key,
        "Authorization": f"Bearer {service_role_key}",
    }
    async with httpx.AsyncClient(timeout=5.0) as client:
        res = await client.get(
            f"{base}/rest/v1/profiles",
            params={"user_id": f"eq.{user_id}", "select": "role"},
            headers=headers,
        )
    if res.status_code != 200:
        return False
    rows = res.json() or []
    if not rows:
        return False
    return str(rows[0].get("role", "")).strip() == "admin"
