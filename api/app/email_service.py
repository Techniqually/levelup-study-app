"""Outbound email via Resend.

Idempotency: every send is bound to an `idempotency_key` that's unique within
its `kind`. We insert a row into public.email_log first; if the unique index
trips, the send was already done and we return the prior result without calling
Resend again. This is what guards us against Stripe webhook retries causing
duplicate purchase receipts.

Resend is intentionally the only provider — keeps the surface tiny for the POC.
If a different provider is needed later, swap the `_send_via_provider` call.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

import httpx
from postgrest.exceptions import APIError
from supabase import Client

logger = logging.getLogger("levelup.email")


@dataclass
class SendResult:
    ok: bool
    deduped: bool = False
    provider_id: str | None = None
    error: str | None = None


class EmailService:
    def __init__(
        self,
        *,
        admin_client: Client,
        resend_api_key: str,
        from_address: str,
        reply_to: str | None = None,
        enabled: bool = True,
    ) -> None:
        self._admin = admin_client
        self._resend_key = (resend_api_key or "").strip()
        self._from = (from_address or "").strip()
        self._reply_to = (reply_to or "").strip() or None
        self._enabled = bool(enabled and self._resend_key and self._from)

    @property
    def enabled(self) -> bool:
        return self._enabled

    async def send_welcome(self, *, user_id: str, recipient: str, display_name: str | None) -> SendResult:
        first = (display_name or recipient.split("@")[0] or "there").split()[0]
        subject = "Welcome to LevelUp"
        html = (
            "<p>Hey "
            + _escape(first)
            + ",</p>"
            + "<p>Thanks for signing up to LevelUp. Topic 1 of every subject is free — "
            + 'try one now: <a href="https://levelupstudyhub.com/hub.html">Open your hub</a>.</p>'
            + "<p>Need a parent dashboard? Reply to this email and we'll wire it up.</p>"
            + "<p>— LevelUp</p>"
        )
        return await self._send(
            kind="welcome",
            user_id=user_id,
            recipient=recipient,
            subject=subject,
            html=html,
            idempotency_key=f"welcome:{user_id}",
            meta={"display_name": display_name},
        )

    async def send_purchase_receipt(
        self,
        *,
        user_id: str,
        recipient: str,
        items: list[dict[str, Any]],
        amount_total_cents: int,
        currency: str,
        stripe_session_id: str,
    ) -> SendResult:
        if amount_total_cents < 0:
            amount_total_cents = 0
        line_rows = "".join(
            f"<tr><td>{_escape(str(it.get('display_name') or it.get('id') or 'item'))}</td>"
            f"<td style='text-align:right'>{_format_money(int(it.get('amount_cents') or 0), currency)}</td></tr>"
            for it in items
        )
        html = (
            "<p>Thanks for your LevelUp purchase. Your subjects are unlocked instantly.</p>"
            + "<table style='width:100%;border-collapse:collapse;font-family:system-ui,sans-serif;'>"
            + line_rows
            + f"<tr><td style='padding-top:12px'><strong>Total</strong></td>"
            + f"<td style='padding-top:12px;text-align:right'><strong>"
            + _format_money(amount_total_cents, currency)
            + "</strong></td></tr></table>"
            + "<p>Reference: " + _escape(stripe_session_id) + "</p>"
            + "<p>— LevelUp</p>"
        )
        return await self._send(
            kind="purchase_receipt",
            user_id=user_id,
            recipient=recipient,
            subject="Your LevelUp purchase",
            html=html,
            idempotency_key=f"purchase:{stripe_session_id}",
            meta={
                "items": items,
                "amount_total_cents": amount_total_cents,
                "currency": currency,
                "stripe_session_id": stripe_session_id,
            },
        )

    async def _send(
        self,
        *,
        kind: str,
        user_id: str | None,
        recipient: str,
        subject: str,
        html: str,
        idempotency_key: str,
        meta: dict[str, Any] | None = None,
    ) -> SendResult:
        meta = meta or {}
        if not recipient or "@" not in recipient:
            return SendResult(ok=False, error="invalid_recipient")
        if not self._enabled:
            self._log_skip(kind=kind, user_id=user_id, recipient=recipient, idempotency_key=idempotency_key, meta=meta)
            return SendResult(ok=True, deduped=False, error="email_disabled")

        # Reserve the idempotency key by inserting a queued row first.
        try:
            inserted = (
                self._admin.table("email_log")
                .insert(
                    {
                        "user_id": user_id,
                        "kind": kind,
                        "recipient": recipient,
                        "subject": subject,
                        "provider": "resend",
                        "status": "queued",
                        "idempotency_key": idempotency_key,
                        "meta": meta,
                    }
                )
                .execute()
            )
        except APIError as exc:
            msg = str(exc)
            code = getattr(exc, "code", "")
            if code == "23505" or "duplicate key value" in msg.lower():
                logger.info("email %s deduped (key=%s)", kind, idempotency_key)
                return SendResult(ok=True, deduped=True)
            logger.exception("email log insert failed (%s)", kind)
            return SendResult(ok=False, error=f"db_insert: {msg[:200]}")

        log_id = (inserted.data or [{}])[0].get("id")

        try:
            provider_id = await self._send_via_resend(recipient=recipient, subject=subject, html=html)
        except Exception as exc:
            logger.exception("resend send failed (%s)", kind)
            self._mark_failed(log_id, str(exc)[:400])
            return SendResult(ok=False, error=str(exc)[:200])

        self._mark_sent(log_id, provider_id)
        return SendResult(ok=True, provider_id=provider_id)

    async def _send_via_resend(self, *, recipient: str, subject: str, html: str) -> str:
        payload: dict[str, Any] = {
            "from": self._from,
            "to": [recipient],
            "subject": subject,
            "html": html,
        }
        if self._reply_to:
            payload["reply_to"] = self._reply_to
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.post(
                "https://api.resend.com/emails",
                json=payload,
                headers={
                    "Authorization": f"Bearer {self._resend_key}",
                    "Content-Type": "application/json",
                },
            )
        if res.status_code >= 300:
            raise RuntimeError(f"resend HTTP {res.status_code}: {res.text[:300]}")
        body = res.json() if res.content else {}
        return str(body.get("id") or "")

    def _mark_sent(self, log_id: int | None, provider_id: str) -> None:
        if not log_id:
            return
        try:
            (
                self._admin.table("email_log")
                .update({"status": "sent", "provider_id": provider_id})
                .eq("id", log_id)
                .execute()
            )
        except APIError:
            logger.exception("email_log mark sent failed")

    def _mark_failed(self, log_id: int | None, error: str) -> None:
        if not log_id:
            return
        try:
            (
                self._admin.table("email_log")
                .update({"status": "failed", "error": error})
                .eq("id", log_id)
                .execute()
            )
        except APIError:
            logger.exception("email_log mark failed failed")

    def _log_skip(
        self,
        *,
        kind: str,
        user_id: str | None,
        recipient: str,
        idempotency_key: str,
        meta: dict[str, Any],
    ) -> None:
        try:
            self._admin.table("email_log").insert(
                {
                    "user_id": user_id,
                    "kind": kind,
                    "recipient": recipient,
                    "subject": None,
                    "provider": "resend",
                    "status": "failed",
                    "error": "email_disabled (no RESEND_API_KEY or EMAIL_FROM set)",
                    "idempotency_key": idempotency_key,
                    "meta": meta,
                }
            ).execute()
        except APIError:
            pass


def _escape(s: str) -> str:
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _format_money(cents: int, currency: str) -> str:
    cur = (currency or "sgd").upper()
    return f"{cur} {cents / 100:.2f}"
