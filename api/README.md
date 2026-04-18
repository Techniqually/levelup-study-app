# LevelUp LLM proxy (FastAPI)

Small proxy so the static study app never holds `OPENAI_API_KEY`. See [`docs/llm-integration-plan.md`](../docs/llm-integration-plan.md).

## Quick start

```bash
cd api
cp .env.example .env
# Edit .env: set OPENAI_API_KEY, SUPABASE_*, STRIPE_*, CORS_ORIGINS
docker compose up --build
```

- API listens inside the container on **8080**; Compose maps host **8081 → 8080** (change the left side in `docker-compose.yml` if needed).
- **Health (no auth):** `curl -s http://127.0.0.1:8081/health`
- **Quiz explain (requires Supabase session JWT):**

```bash
curl -s -X POST http://127.0.0.1:8081/llm/quiz-explain \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN" \
  -d "{\"question\":\"What is 2+2?\",\"options\":[\"3\",\"4\",\"5\"],\"correct_index\":1,\"chosen_index\":0}"
```

Request JSON for `quiz-explain` includes the MCQ fields plus optional **course context** (filled by the static app): `subject_id`, `subject_title`, `topic_title`, `level` (e.g. `"O-Level"`). The server merges these into a fixed prompt template — instruction wording and JSON output shape stay **server-side**; the client only supplies short structured labels (not a free-form system prompt).

Response JSON includes `parsed` (object if the model returned valid JSON), `raw_content`, `parse_error`, `model`, `usage`.

- **401:** missing/wrong Supabase bearer token.
- **429:** enforced at **5 requests/minute per user id**.
- **429:** OpenAI (or upstream) rate limit **or billing** — the proxy returns **429** with JSON `detail.message` (not 502). **Usage charts can stay at 0** if every call fails: OpenAI often returns **429 + `insufficient_quota`** until Billing has a card / credits (“Add credits” in the dashboard). That is not the same as “you used too many RPM.”
- **503:** `OPENAI_API_KEY` missing.

### Stripe webhook fulfillment

- Endpoint: `POST /webhook/stripe`
- Signature header required: `Stripe-Signature`
- Event handled: `checkout.session.completed`
- `client_reference_id` must be the Supabase auth user UUID.
- Entitlement source:
  - first preference: `session.metadata.entitlement`
  - fallback: `STRIPE_DEFAULT_ENTITLEMENT`
- Idempotency is enforced in `public.stripe_webhook_events`.

Local Stripe CLI test:

```bash
stripe listen --forward-to http://127.0.0.1:8081/webhook/stripe
```

### CORS errors in the browser

1. **Run Compose from the `api/` folder** (where `docker-compose.yml` and `.env` live):  
   `cd api` then `docker compose up --build`.  
   If Compose starts from another directory, `env_file: .env` may not pick up `api/.env` and **`CORS_ORIGINS` can be empty** inside the container → no CORS headers → browser reports a preflight / CORS error.

2. **Check startup logs** — you should see either  
   `[levelup-llm-proxy] CORS allow_origins=['http://localhost:3000', ...]`  
   or, if `CORS_ORIGINS` was empty, a **WARNING** about using the localhost-only regex (dev fallback).

3. **Exact origin** — scheme + host + port must match, e.g. `http://localhost:3000` ≠ `http://127.0.0.1:3000`. Include every dev URL you use.

4. **Windows `.env`** — if you still see CORS after adding origins, save `.env` as **UTF-8 LF** (some editors add `\r` on each line and break matching). The server strips `\r` from each origin segment, but an empty or malformed line can still clear the list.

### GitHub Pages (or any public `https://` site)

- **Mixed content:** Pages are served over **HTTPS**. The browser will **block** `fetch("http://...your-api...")` from that page. Your proxy must be reachable at **`https://...`** (TLS certificate), e.g. reverse proxy, tunnel, or a host like Fly/Railway/Render.

- **CORS:** Set **`CORS_ORIGINS`** to your **exact** site origin, e.g. `https://yourname.github.io` (no path, usually no trailing slash). For a **project** site use `https://yourname.github.io/repo-name` only if that is the real `Origin` header (GitHub uses that form for project pages).

- **Secrets:** Browser stores only proxy URL; bearer token is Supabase session JWT. **`OPENAI_API_KEY`** stays in server `.env`.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | For LLM calls | Upstream secret (never in the browser). |
| `OPENAI_BASE_URL` | No | Default `https://api.openai.com/v1` (OpenAI-compatible). |
| `MODEL` | No | Default `gpt-4o-mini`. |
| `SUPABASE_URL` | Yes | Supabase project URL for webhook fulfillment writes. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key for server-side entitlement updates. |
| `SUPABASE_JWT_SECRET` | Yes | Verifies browser Supabase access tokens on `/llm/*`. |
| `STRIPE_SECRET_KEY` | Yes (webhook) | Stripe secret key used by Stripe SDK. |
| `STRIPE_WEBHOOK_SECRET` | Yes (webhook) | Signature secret for Stripe webhook verification. |
| `STRIPE_DEFAULT_ENTITLEMENT` | No | Fallback entitlement if metadata missing (default `olevel_chem`). |
| `CORS_ORIGINS` | No | Comma-separated origins; if empty, API falls back to localhost/127.0.0.1 origin regex only. |
| `MAX_TOKENS` | No | Cap for quiz-explain (default 512). |
| `LLM_TIMEOUT_S` | No | Upstream HTTP timeout (default 60). |

## Later (not implemented here)

- Plan-based quotas across multiple API instances (Redis/Postgres backed).
- Multi-provider fallback / rotation (ordered chain in `.env`) — see the integration plan.
