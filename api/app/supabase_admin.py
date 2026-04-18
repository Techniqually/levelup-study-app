from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Iterable

from postgrest.exceptions import APIError
from supabase import Client, create_client


@dataclass
class EntitlementUpdateResult:
    duplicate_event: bool
    granted: list[dict[str, str]]   # [{country_code, class_code, subject_slug}, ...]


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class SupabaseAdminStore:
    def __init__(self, url: str, service_role_key: str) -> None:
        if not (url or "").strip():
            raise ValueError("SUPABASE_URL is required")
        if not (service_role_key or "").strip():
            raise ValueError("SUPABASE_SERVICE_ROLE_KEY is required")
        self._client: Client = create_client(url.strip(), service_role_key.strip())

    @property
    def client(self) -> Client:
        return self._client

    def lookup_prices(self, price_ids: Iterable[str]) -> list[dict[str, Any]]:
        """Resolve catalog_prices rows for the given internal price ids."""
        ids = sorted({str(x).strip() for x in price_ids if str(x).strip()})
        if not ids:
            return []
        res = (
            self._client.table("catalog_prices")
            .select(
                "id,country_code,class_code,kind,subject_slug,bundle_slugs,"
                "display_name,amount_cents,currency,stripe_price_id"
            )
            .in_("id", ids)
            .eq("is_active", True)
            .execute()
        )
        return list(res.data or [])

    def lookup_prices_by_stripe(self, stripe_price_ids: Iterable[str]) -> list[dict[str, Any]]:
        ids = sorted({str(x).strip() for x in stripe_price_ids if str(x).strip()})
        if not ids:
            return []
        res = (
            self._client.table("catalog_prices")
            .select(
                "id,country_code,class_code,kind,subject_slug,bundle_slugs,"
                "display_name,amount_cents,currency,stripe_price_id"
            )
            .in_("stripe_price_id", ids)
            .eq("is_active", True)
            .execute()
        )
        return list(res.data or [])

    def grant_entitlements_from_stripe(
        self,
        *,
        user_id: str,
        items: list[dict[str, Any]],     # rows from catalog_prices the user purchased
        stripe_event_id: str,
        stripe_event_type: str,
        stripe_customer_id: str | None,
        stripe_checkout_session_id: str | None,
        payload: dict[str, Any],
    ) -> EntitlementUpdateResult:
        # 1. Idempotency on the Stripe event id.
        try:
            self._client.table("stripe_webhook_events").insert(
                {
                    "stripe_event_id": stripe_event_id,
                    "stripe_event_type": stripe_event_type,
                    "payload": payload,
                }
            ).execute()
        except APIError as exc:
            msg = str(exc)
            code = getattr(exc, "code", "")
            if code == "23505" or "duplicate key value" in msg.lower():
                return EntitlementUpdateResult(duplicate_event=True, granted=[])
            raise

        # 2. Expand bundles into one (country, class, subject) row per slug.
        granted: list[dict[str, str]] = []
        for item in items:
            country = str(item.get("country_code") or "")
            class_code = str(item.get("class_code") or "")
            kind = str(item.get("kind") or "")
            if not country or not class_code:
                continue
            if kind == "single":
                slug = str(item.get("subject_slug") or "")
                if slug:
                    granted.append({"country_code": country, "class_code": class_code, "subject_slug": slug})
            elif kind == "bundle":
                for slug in (item.get("bundle_slugs") or []):
                    s = str(slug)
                    if s:
                        granted.append({"country_code": country, "class_code": class_code, "subject_slug": s})

        # 3. Upsert subject_entitlements rows (no expiry — lifetime POC).
        if granted:
            now_iso = _utc_now_iso()
            rows = [
                {
                    "user_id": user_id,
                    "country_code": r["country_code"],
                    "class_code": r["class_code"],
                    "subject_slug": r["subject_slug"],
                    "access_from": now_iso,
                    "access_to": None,
                    "source": "stripe",
                }
                for r in granted
            ]
            self._client.table("subject_entitlements").upsert(
                rows, on_conflict="user_id,country_code,class_code,subject_slug"
            ).execute()

        # 4. Sidecar: stash Stripe metadata on user_entitlements (per-user, not per-subject).
        self._client.table("user_entitlements").upsert(
            {
                "user_id": user_id,
                "stripe_customer_id": stripe_customer_id,
                "stripe_last_checkout_session": stripe_checkout_session_id,
                "stripe_last_event_id": stripe_event_id,
                "updated_at": _utc_now_iso(),
            },
            on_conflict="user_id",
        ).execute()

        return EntitlementUpdateResult(duplicate_event=False, granted=granted)

    def fetch_user_email(self, user_id: str) -> str | None:
        """Read the auth.users email via the admin API."""
        try:
            res = self._client.auth.admin.get_user_by_id(user_id)
        except Exception:  # noqa: BLE001 - admin SDK throws a few different things
            return None
        user = getattr(res, "user", None) or (res.get("user") if isinstance(res, dict) else None)
        if not user:
            return None
        if isinstance(user, dict):
            return user.get("email")
        return getattr(user, "email", None)

    def fetch_user_display_name(self, user_id: str) -> str | None:
        try:
            res = (
                self._client.table("profiles")
                .select("display_name")
                .eq("user_id", user_id)
                .maybe_single()
                .execute()
            )
        except APIError:
            return None
        if not res or not res.data:
            return None
        return res.data.get("display_name")
