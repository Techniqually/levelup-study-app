from __future__ import annotations

import logging
from typing import Any

import stripe
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from app.supabase_admin import SupabaseAdminStore

logger = logging.getLogger("levelup.billing")


class CheckoutSessionBody(BaseModel):
    price_ids: list[str] = Field(..., min_length=1, max_length=10)
    success_url: str = Field(..., min_length=8, max_length=600)
    cancel_url: str = Field(..., min_length=8, max_length=600)


def create_billing_router(
    *,
    stripe_secret_key: str,
    admin_store: SupabaseAdminStore,
) -> APIRouter:
    router = APIRouter()
    stripe.api_key = stripe_secret_key.strip()

    @router.post("/billing/checkout-session")
    async def create_checkout_session(body: CheckoutSessionBody, request: Request) -> dict[str, Any]:
        user_id = str(getattr(request.state, "auth_user_id", "") or "")
        if not user_id:
            raise HTTPException(status_code=401, detail="Sign in required")

        catalog_rows = admin_store.lookup_prices(body.price_ids)
        if not catalog_rows:
            raise HTTPException(status_code=400, detail="No catalog rows matched the supplied price ids")

        line_items: list[dict[str, Any]] = []
        for row in catalog_rows:
            sp = (row.get("stripe_price_id") or "").strip()
            if not sp:
                raise HTTPException(
                    status_code=503,
                    detail=(
                        f"catalog price {row.get('id')!r} has no stripe_price_id yet. "
                        "Create the price in Stripe and update catalog_prices.stripe_price_id."
                    ),
                )
            line_items.append({"price": sp, "quantity": 1})

        try:
            session = stripe.checkout.Session.create(
                mode="payment",
                line_items=line_items,
                client_reference_id=user_id,
                success_url=body.success_url,
                cancel_url=body.cancel_url,
                allow_promotion_codes=True,
                metadata={
                    "internal_price_ids": ",".join(r["id"] for r in catalog_rows),
                },
            )
        except Exception as exc:  # noqa: BLE001
            logger.exception("checkout session create failed")
            raise HTTPException(status_code=502, detail=f"Stripe error: {exc!s}") from exc

        return {"ok": True, "url": session.url, "session_id": session.id}

    @router.get("/billing/catalog")
    async def get_catalog() -> dict[str, Any]:
        """Public read of active prices, for the pricing page."""
        res = (
            admin_store.client.table("catalog_prices")
            .select(
                "id,country_code,class_code,kind,subject_slug,bundle_slugs,"
                "display_name,amount_cents,currency,sort_order,stripe_price_id"
            )
            .eq("is_active", True)
            .order("sort_order")
            .execute()
        )
        rows = list(res.data or [])
        # Don't leak Stripe price ids — only the existence of one.
        for r in rows:
            r["available"] = bool((r.pop("stripe_price_id", None) or "").strip())
        return {"ok": True, "prices": rows}

    return router
