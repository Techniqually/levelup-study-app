import unittest

from fastapi import FastAPI
from fastapi.testclient import TestClient

import app.stripe_webhook as stripe_webhook_module


class _FakeAdminStore:
    """Stand-in for SupabaseAdminStore in webhook tests."""

    def __init__(self, *, duplicate=False, catalog_rows=None):
        self.duplicate = duplicate
        self.catalog_rows = list(catalog_rows or [])
        self.granted_calls = []

    def lookup_prices_by_stripe(self, stripe_price_ids):
        return list(self.catalog_rows)

    def grant_entitlements_from_stripe(self, **kwargs):
        self.granted_calls.append(kwargs)
        granted = (
            []
            if self.duplicate
            else [
                {
                    "country_code": r.get("country_code", "sg"),
                    "class_code": r.get("class_code", "olevel"),
                    "subject_slug": r.get("subject_slug", "chemistry"),
                }
                for r in self.catalog_rows
                if r.get("kind") == "single"
            ]
        )
        return type("R", (), {"duplicate_event": self.duplicate, "granted": granted})()

    def fetch_user_email(self, user_id):
        return None


class StripeWebhookTests(unittest.TestCase):
    def setUp(self):
        self._construct_backup = stripe_webhook_module.stripe.Webhook.construct_event
        self._list_li_backup = stripe_webhook_module.stripe.checkout.Session.list_line_items

    def tearDown(self):
        stripe_webhook_module.stripe.Webhook.construct_event = self._construct_backup
        stripe_webhook_module.stripe.checkout.Session.list_line_items = self._list_li_backup

    def _client_with_event(self, event, *, duplicate=False, catalog_rows=None, line_items=None):
        stripe_webhook_module.stripe.Webhook.construct_event = staticmethod(
            lambda payload, sig_header, secret: event
        )
        stripe_webhook_module.stripe.checkout.Session.list_line_items = staticmethod(
            lambda _session_id, **_kw: {"data": list(line_items or [])}
        )
        store = _FakeAdminStore(duplicate=duplicate, catalog_rows=catalog_rows)
        app = FastAPI()
        app.include_router(
            stripe_webhook_module.create_stripe_webhook_router(
                stripe_secret_key="sk_test_123",
                stripe_webhook_secret="whsec_test_123",
                admin_store=store,
                email_service=None,
            )
        )
        return TestClient(app), store

    def test_ignores_non_checkout_events(self):
        event = {"id": "evt_1", "type": "payment_intent.succeeded", "data": {"object": {}}}
        client, store = self._client_with_event(event)
        r = client.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json().get("ignored"))
        self.assertEqual(store.granted_calls, [])

    def test_completed_event_grants_subject_entitlement(self):
        event = {
            "id": "evt_2",
            "type": "checkout.session.completed",
            "data": {
                "object": {
                    "id": "cs_test_1",
                    "client_reference_id": "user-uuid-1",
                    "customer": "cus_123",
                }
            },
        }
        catalog_rows = [
            {
                "id": "sg_olevel_chemistry",
                "country_code": "sg",
                "class_code": "olevel",
                "kind": "single",
                "subject_slug": "chemistry",
                "stripe_price_id": "price_chem_test",
                "amount_cents": 2900,
                "currency": "sgd",
                "display_name": "O-Level Chemistry",
            }
        ]
        line_items = [{"price": {"id": "price_chem_test"}}]
        client, store = self._client_with_event(
            event, catalog_rows=catalog_rows, line_items=line_items
        )
        r = client.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 200, r.text)
        j = r.json()
        self.assertEqual(j.get("ok"), True)
        self.assertEqual(j.get("user_id"), "user-uuid-1")
        self.assertEqual(len(store.granted_calls), 1)
        self.assertEqual(j["granted"][0]["subject_slug"], "chemistry")

    def test_duplicate_event_returns_duplicate_true(self):
        event = {
            "id": "evt_3",
            "type": "checkout.session.completed",
            "data": {"object": {"id": "cs_test_2", "client_reference_id": "user-uuid-2"}},
        }
        client, _store = self._client_with_event(event, duplicate=True, line_items=[])
        r = client.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("duplicate"), True)

    def test_missing_client_reference_id_returns_400(self):
        event = {
            "id": "evt_4",
            "type": "checkout.session.completed",
            "data": {"object": {"id": "cs_test_3"}},
        }
        client, _store = self._client_with_event(event, line_items=[])
        r = client.post("/webhook/stripe", data="{}", headers={"stripe-signature": "sig"})
        self.assertEqual(r.status_code, 400)


if __name__ == "__main__":
    unittest.main()
