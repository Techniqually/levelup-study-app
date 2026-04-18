import time
import unittest
from uuid import uuid4

import jwt
from fastapi.testclient import TestClient

import app.main as main_module


def _valid_body():
    return {
        "question": "What is 2 + 2?",
        "options": ["3", "4"],
        "correct_index": 1,
        "chosen_index": 0,
    }


class SecurityTests(unittest.TestCase):
    def setUp(self):
        self._settings_backup = {
            "openai_api_key": main_module.settings.openai_api_key,
            "supabase_jwt_secret": main_module.settings.supabase_jwt_secret,
        }
        self._chat_backup = main_module.chat_completion_json
        main_module.settings.supabase_jwt_secret = "super-secret-jwt-token-with-at-least-32-characters-long"
        main_module._rate_windows.clear()
        self.client = TestClient(main_module.app)

    def tearDown(self):
        main_module.settings.openai_api_key = self._settings_backup["openai_api_key"]
        main_module.settings.supabase_jwt_secret = self._settings_backup["supabase_jwt_secret"]
        main_module.chat_completion_json = self._chat_backup
        main_module._rate_windows.clear()

    def _make_token(self, uid=None):
        now = int(time.time())
        payload = {
            "sub": uid or str(uuid4()),
            "role": "authenticated",
            "iat": now,
            "exp": now + 3600,
        }
        return jwt.encode(payload, main_module.settings.supabase_jwt_secret, algorithm="HS256")

    def test_missing_authorization_returns_401(self):
        res = self.client.post("/llm/quiz-explain", json=_valid_body())
        self.assertEqual(res.status_code, 401)
        self.assertIn("Authorization", str(res.json()))

    def test_invalid_authorization_token_returns_401(self):
        res = self.client.post(
            "/llm/quiz-explain",
            json=_valid_body(),
            headers={"Authorization": "Bearer invalid.token.value"},
        )
        self.assertEqual(res.status_code, 401)

    def test_valid_token_with_missing_openai_key_returns_503(self):
        main_module.settings.openai_api_key = ""
        token = self._make_token()
        res = self.client.post(
            "/llm/quiz-explain",
            json=_valid_body(),
            headers={"Authorization": "Bearer " + token},
        )
        self.assertEqual(res.status_code, 503)

    def test_rate_limit_enforced_per_user(self):
        async def _fake_chat_completion_json(**_kwargs):
            return {
                "parsed": {"wrong_choice_explained": "x", "correct_logic": "y"},
                "raw_content": "{}",
                "parse_error": None,
                "model": "test-model",
                "usage": {"prompt_tokens": 1, "completion_tokens": 1},
            }

        main_module.settings.openai_api_key = "dummy"
        main_module.chat_completion_json = _fake_chat_completion_json
        token = self._make_token(uid="rate-limit-user")
        headers = {"Authorization": "Bearer " + token}

        statuses = []
        for _ in range(6):
            r = self.client.post("/llm/quiz-explain", json=_valid_body(), headers=headers)
            statuses.append(r.status_code)

        self.assertEqual(statuses[:5], [200, 200, 200, 200, 200])
        self.assertEqual(statuses[5], 429)


if __name__ == "__main__":
    unittest.main()
