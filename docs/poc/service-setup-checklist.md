# POC Service Setup Checklist

Practical end-to-end setup for getting the LevelUp PoC running locally and then shipping it.

---

## 0) Repo layout refresher

| Path | Purpose |
|---|---|
| `web/` | Vanilla HTML/JS/CSS frontend (served with any static server) |
| `web/index.html` | Public landing page (unauthenticated) |
| `web/hub.html` | Signed-in subject hub (auth-gated) |
| `web/subject.html` | Per-subject app shell |
| `web/parent.html` | Parent dashboard (Google-auth-gated) |
| `web/admin.html` | Manual admin helpers (link student, grant entitlement) |
| `api/` | FastAPI proxy: `/config`, `/llm/*`, `/admin/*`, Stripe webhook |
| `supabase/` | Local Supabase config + migrations |
| `docs/poc/` | Plan, tasks tracker, this checklist |

---

## 1) Local developer setup (single source of truth)

### 1.1 Supabase local stack

1. Install Supabase CLI: `npm i -D supabase` (repo ships with it).
2. `supabase/config.toml` must have:

   ```toml
   [auth]
   site_url = "http://localhost:3000"
   # Wildcard allows any path on the local web origin to be an OAuth redirect target.
   additional_redirect_urls = [
     "http://localhost:3000/**",
     "http://127.0.0.1:3000/**"
   ]

   [auth.external.google]
   enabled = true
   client_id = "<google oauth web client id>"
   secret    = "<google oauth client secret>"
   ```

3. Start the stack: `npx supabase start`
4. Apply migrations (auto on `start`; otherwise `supabase db reset --local`).
5. Note the auto-printed values:
   - API URL: `http://127.0.0.1:54321`
   - Publishable (anon) key: `sb_publishable_...`
   - Secret (service role) key: `sb_secret_...`

> Whenever `config.toml` changes, `npx supabase stop --no-backup && npx supabase start` to pick it up.

### 1.2 API service (`api/`)

1. `cp api/.env.example api/.env`, then set at minimum:

   ```env
   OPENAI_API_KEY=sk-...                 # optional for /llm endpoints
   SUPABASE_URL=http://host.docker.internal:54321
   SUPABASE_ANON_KEY_PUBLIC=sb_publishable_...
   SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
   SUPABASE_JWT_SECRET=<from: npx supabase status | grep JWT>
   CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ADMIN_API_KEY=<random 32+ chars>
   # Stripe values optional for dev; webhook stays disabled if missing.
   ```

2. Start it: `cd api && docker compose up --build -d`
3. Container publishes `:8081 -> :8080`. Verify:

   ```bash
   curl -s http://localhost:8081/config   # should return supabaseUrl + supabaseAnonKey
   curl -s http://localhost:8081/health   # should return {"status":"ok"}
   ```

### 1.3 Web frontend

1. `cp web/config/api.json.example web/config/api.json` (already defaults to `http://localhost:8081`).
2. Serve: `cd web && npx serve -l 3000 .`
3. Open `http://localhost:3000/` — landing page.

### 1.4 One-time verification loop

- `http://localhost:3000/` loads without console errors.
- Click "Try Topic 1 free" → auth modal opens with Google button.
- Sign in → lands on `http://localhost:3000/hub.html`.
- Subjects show as locked ("Upgrade →").
- Reload hub.html — still signed in.
- Click "Sign out" — returns to `/`.

---

## 2) Google OAuth setup (Cloud Console)

1. Create/select a Google Cloud project.
2. Configure the OAuth consent screen (External, testing mode is fine for PoC).
3. Create an OAuth Client ID — type **Web application**.
4. Authorized redirect URIs — add BOTH:
   - `http://localhost:54321/auth/v1/callback` (local Supabase Kong)
   - `https://<your-project-ref>.supabase.co/auth/v1/callback` (prod Supabase)
5. Save the Client ID + secret into `supabase/config.toml` (local) and the hosted Supabase project ("Authentication → Providers → Google" pane).

### Why both URIs?

The `redirect_uri` Google sees is always the Supabase callback, not your web app. Your app's origin only matters for the _final_ hop, which Supabase controls via `additional_redirect_urls`.

### Common traps

| Symptom | Root cause |
|---|---|
| Page bounces back to landing after Google login | `redirectTo` value not covered by `additional_redirect_urls` → Supabase drops the token fragment. Use wildcard `http://localhost:3000/**`. |
| `redirect_uri_mismatch` Google error | Client ID doesn't have the Supabase callback URL whitelisted. |
| `provider not enabled` | `[auth.external.google] enabled = false` or missing secret. |
| Logged in but subjects stay locked | Working as designed — user has no `user_entitlements` row. Use `admin.html` to grant for testing. |

---

## 3) Stripe setup (entitlement fulfillment)

### Dashboard

1. Create a recurring (or one-time) Price for each subject SKU (Chemistry / Physics / Geography / All).
2. Build a Checkout Session or Payment Link.
3. At checkout-session creation, always pass:
   - `client_reference_id = <supabase user_id>` (the student's UID)
   - `metadata.entitlement = olevel_chem | olevel_phys | olevel_geo | olevel_all`
   - (optional) `metadata.parent_user_id` if a parent is buying for a child

### Webhook

1. Endpoint: `POST https://<api-domain>/webhook/stripe`.
2. Events: `checkout.session.completed` (add `invoice.paid` for renewals later).
3. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. API boots fine if Stripe env is missing — the webhook route just stays disabled.

### Local dev test

```bash
stripe listen --forward-to localhost:8081/webhook/stripe
stripe trigger checkout.session.completed
```

Then check `user_entitlements` in Supabase Studio (`http://localhost:54323`) — a row should appear for the `client_reference_id`.

---

## 4) Email

Use Supabase Auth's default SMTP for now; plug in a real provider before shipping.

1. Pick Resend or Brevo (cheapest/DX-friendliest for PoC).
2. Verify a sending domain (SPF + DKIM + DMARC).
3. Supabase Studio → Authentication → Email → SMTP settings → paste host/port/user/pass + from address.
4. Customize confirm / recovery / magic-link templates.
5. Send a test to an inbox you control — and to Gmail/Outlook — to check spam placement.

> Google-only login means you won't send confirmation/recovery mails for most users in the PoC. Transactional mail (invites, receipts) is still on you.

---

## 5) What people usually miss

- DNS: SPF + DKIM + DMARC on the sending domain.
- CORS allowlist: set `CORS_ORIGINS` explicitly for prod; don't rely on the dev localhost regex.
- Stripe idempotency: already handled by `stripe_webhook_events.stripe_event_id unique` — keep it.
- Secret separation: distinct `.env` per env. Service-role + Stripe secret + JWT secret **never** in the browser bundle.
- Rate limits: `/llm/*` has a 5/min/user limiter; mirror something similar on `/admin/*` if you expose it.
- Error monitoring: add Sentry or equivalent to `api/` (min-viable alerting on 5xx).
- Backup drill: prove you can restore the Supabase DB from a dated backup.
- Legal pages: Privacy Policy + ToS are required by Google for OAuth verification.
- Key rotation runbook: `ADMIN_API_KEY`, `SUPABASE_JWT_SECRET`, `STRIPE_WEBHOOK_SECRET` — document who rotates, where, and the blast radius.

---

## 6) Env matrix

### Browser / `web/config/api.json` (public)

- `apiBase` — URL of the FastAPI proxy, e.g. `http://localhost:8081`

### Browser localStorage (populated at runtime by `bootstrap.js`, do not hand-edit in prod)

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### API `.env` (secret; never ship to browser)

- `OPENAI_API_KEY`
- `SUPABASE_URL`, `SUPABASE_ANON_KEY_PUBLIC`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_DEFAULT_ENTITLEMENT`
- `ADMIN_API_KEY`
- `CORS_ORIGINS`

### Supabase (per env)

- Auth → Providers → Google (Client ID + secret)
- Auth → URL configuration (`site_url` + `redirect_urls`)
- Storage → `study-materials` bucket (private, RLS gated)

---

## 7) Rollout order (fastest path to a working demo)

1. Supabase local + migrations + Google login ✅
2. API local + `/config` + CORS ✅
3. Web local + landing/hub routing ✅
4. Stripe test-mode checkout + webhook → entitlement unlock
5. Hosted Supabase + hosted API (Render/Fly) + static hosting (Netlify/Vercel) + domain
6. Real email provider + DNS auth (SPF/DKIM/DMARC)
7. Monitoring + alerting + key-rotation runbook

---

## 8) Quick smoke-test script

```bash
# Supabase up?
curl -s http://localhost:54321/auth/v1/health

# API up and returning public config?
curl -s http://localhost:8081/config | jq

# Frontend routing sane?
curl -sI http://localhost:3000/             | head -1   # 200 (landing)
curl -sI http://localhost:3000/hub.html     | head -1   # 200 (hub)
curl -sI http://localhost:3000/subject.html | head -1   # 200 (subject shell)

# Admin endpoints locked without key?
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8081/admin/link-student   # 401
```

If all four greens, your local loop is working.
