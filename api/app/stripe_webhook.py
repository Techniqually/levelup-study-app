from __future__ import annotations

import logging
from typing import Any

import stripe
from fastapi import APIRouter, HTTPException, Request

from app.email_service import EmailService
from app.supabase_admin import SupabaseAdminStore

logger = logging.getLogger("levelup.stripe")


def create_stripe_webhook_router(
    *,
    stripe_secret_key: str,
    stripe_webhook_secret: str,
    admin_store: SupabaseAdminStore,
    email_service: EmailService | None,
) -> APIRouter:
    router = APIRouter()
    stripe.api_key = stripe_secret_key.strip()

    @router.post("/webhook/stripe")
    async def stripe_webhook(request: Request) -> dict[str, Any]:
        if not (stripe_webhook_secret or "").strip():
            raise HTTPException(status_code=503, detail="STRIPE_WEBHOOK_SECRET is not configured")

        payload = await request.body()
        sig_header = request.headers.get("stripe-signature", "")
        try:
            event = stripe.Webhook.construct_event(
                payload=payload,
                sig_header=sig_header,
                secret=stripe_webhook_secret.strip(),
            )
        except stripe.error.SignatureVerificationError as exc:
            raise HTTPException(status_code=400, detail="Invalid Stripe signature") from exc
        except ValueError as exc:
            raise HTTPException(status_code=400, detail="Invalid Stripe payload") from exc

        event_type = str(event.get("type") or "")
        event_id = str(event.get("id") or "")
        if event_type != "checkout.session.completed":
            return {"ok": True, "ignored": event_type or "unknown"}

        session_obj = (event.get("data") or {}).get("object") or {}
        session_id = str(session_obj.get("id") or "").strip()
        user_id = str(session_obj.get("client_reference_id") or "").strip()
        if not user_id:
            raise HTTPException(
                status_code=400,
                detail="checkout.session.completed is missing client_reference_id",
            )

        # Resolve the line items for this session — we need the price IDs to map
        # back to catalog_prices.
        try:
            line_items = stripe.checkout.Session.list_line_items(session_id, limit=20).get("data", [])
        except Exception as exc:  # noqa: BLE001
            logger.exception("failed to list line items for session %s", session_id)
            raise HTTPException(status_code=502, detail=f"stripe line items: {exc!s}") from exc

        stripe_price_ids = [
            str((li.get("price") or {}).get("id") or "")
            for li in line_items
            if (li.get("price") or {}).get("id")
        ]
        catalog_rows = admin_store.lookup_prices_by_stripe(stripe_price_ids) if stripe_price_ids else []

        if not catalog_rows:
            logger.warning(
                "checkout.session.completed (%s) had no matching catalog_prices row "
                "(stripe_price_ids=%r). Granting nothing.",
                session_id,
                stripe_price_ids,
            )

        result = admin_store.grant_entitlements_from_stripe(
            user_id=user_id,
            items=catalog_rows,
            stripe_event_id=event_id,
            stripe_event_type=event_type,
            stripe_customer_id=str(session_obj.get("customer") or "") or None,
            stripe_checkout_session_id=session_id or None,
            payload=event,
        )
        if result.duplicate_event:
            return {"ok": True, "duplicate": True, "event_id": event_id}

        # Fire-and-mostly-forget the receipt email. Idempotency is on the email_log
        # row keyed by stripe session id, so a Stripe webhook retry won't double-send.
        if email_service is not None and email_service.enabled and catalog_rows:
            recipient = (
                str(session_obj.get("customer_email") or "").strip()
                or admin_store.fetch_user_email(user_id)
                or ""
            )
            if recipient:
                amount_total = int(session_obj.get("amount_total") or 0)
                currency = str(session_obj.get("currency") or "sgd")
                try:
                    await email_service.send_purchase_receipt(
                        user_id=user_id,
                        recipient=recipient,
                        items=catalog_rows,
                        amount_total_cents=amount_total,
                        currency=currency,
                        stripe_session_id=session_id,
                    )
                except Exception:  # noqa: BLE001
                    logger.exception("send_purchase_receipt failed (session=%s)", session_id)

        return {
            "ok": True,
            "event_id": event_id,
            "user_id": user_id,
            "granted": result.granted,
        }

    return router
