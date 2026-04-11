# LLM integration plan — LevelUp study app

This document scopes how to add optional, student-controlled LLM features to the existing **vanilla HTML/CSS/JS** app (see `AGENTS.md`), with emphasis on **exam outcomes**, **concept clarity**, and **low token spend**.

---

## Goals (aligned with the app)

1. **Raise scores**: feedback that matches mark schemes, syllabus wording, and common examiner expectations (O-level style).
2. **Deepen understanding**: short, targeted explanations—not generic essays.
3. **Respect constraints**: no bundler requirement on the static app; LLM credentials should live on a **small backend** you control (recommended) or in client storage only for BYOK experiments.
4. **Optional & degradable**: core app works with LLM off; when on, fail gracefully (rate limits, network, missing key).

---

## Your ideas — expanded

### 1) Explain concepts (prompt → answer)

- **UX**: “Ask about this topic” anchored to `subjectId` / `topicId` / current screen so the model gets **structured context** without the student pasting the whole syllabus.
- **Pedagogy**: default to **exam register** (definitions, required keywords, “state / explain / describe” discipline). Optional toggle: “plain English first, then exam wording.”
- **Token savings**: send a **compressed context pack** (learning objectives + 5 bullet facts from your manifest) instead of full topic text when possible.

### 2) Explain wrong / correct answers (quiz)

- **Flow**: after submit, show your existing UI; optional “Why?” opens a panel that calls the LLM with: question stem, options, correct key, student choice, **1–2 lines from your canonical explanation** if present.
- **Caching / reuse**:
  - **Key**: hash of `(questionId, correctIndex, wrongIndex)` or full stem hash if IDs unstable.
  - **Store**: `localStorage` or `IndexedDB` with TTL (e.g. 30–90 days) and max entries (LRU eviction) to avoid bloat.
  - **Reuse**: identical wrong-pattern → serve cache; skip API. Invalidate when `APP_VERSION` or question text changes (include a `contentVersion` in the hash).
- **Token savings**: ask the model for **strict JSON** (see below) so you render bullets in UI and don’t pay for redundant prose.

### 3) Extended / high-mark written answers (future feature)

- **Input**: typed text + **Web Speech API** (`SpeechRecognition`) where supported (speech not implemented yet).
- **Anti-paste nudge (static app, implemented in `quiz-extended.js`)**: `paste` + `beforeinput` (`insertFromPaste`, `insertFromDrop`) + `drop` on the extended-answer textareas. Determined users can still bypass (DevTools, etc.) — this is **not** security.
- **Write-first UX (implemented)**: on the **Written** tab (not Quiz), **one question at a time**; two-step disclosure — **Show mark scheme** (rubric only), then **Show model answer** after mark scheme once **and** typed length ≥ **40** (override with `minCharsForModel`). **XP (optional):** once per question per UTC calendar day, only if mark scheme + model were viewed and heuristics pass (`WRITTEN_CLAIM_*` in `app-constants.js`); `addXp` uses `activityType: "written_practice"` with an hourly cap. LLM marking remains future work.
- **Marking**:
  - Send: question, max marks, **official-style mark scheme** (from your content), student answer, subject.
  - Ask LLM for: `score / max`, **brief** justification, **gap list** (missing points), **one model paragraph** that would earn full marks (keep short unless “show perfect answer” expanded).
- **Safety**: label output as **practice feedback**, not official marking; encourage comparison to mark scheme.
- **Token savings**: use a **rubric table** in the prompt (bullet points with marks) instead of long exemplar essays unless the user clicks “show full exemplar.”

### 4) Keys, proxy URL, and config blob

**What lives in `localStorage` (agreed default):** only **`proxyBaseUrl`** + **`appToken`**.

- **`proxyBaseUrl`**: origin of your FastAPI service (no trailing slash ambiguity—pick one convention in code).
- **`appToken`**: same value as **`APP_TOKEN`** in server **`.env`**. Generate a **long random secret** (e.g. `openssl rand -hex 32` or password-manager random string—**not** a short password). Sent on each request (e.g. `Authorization: Bearer <appToken>`). This is a **cheap abuse gate** (stops drive-by URL reuse), **not** strong identity auth—anyone who gets the token can call your proxy, so treat it like an API key and use **HTTPS** in production.

**What stays on the server only:** `OPENAI_API_KEY` (and any fallbacks / `OPENAI_BASE_URL` / `MODEL`). Never paste the provider key into the static app or into this JSON blob.

**Single localStorage JSON** (e.g. `LEVELUP_LLM_CONFIG_JSON`): `mode`, `proxyBaseUrl`, `appToken`, feature flags, cache settings. Provider **rotation** stays server-side (Python + `.env`).

**Optional BYOK variant** (not your default): student-held provider key in `localStorage` and forwarded by FastAPI—only if you explicitly want it; otherwise ignore.

- **XSS note**: anything in `localStorage` can be stolen by malicious JS—so a long `appToken` limits casual abuse but does not stop a compromised page; **server rate limits** + short TTL thoughts apply if you ever embed third-party scripts.
- **Parent/student**: parent gate for editing proxy URL / `appToken`; optional “disable LLM” lock.

---

## Creative, low-token uses (high leverage)

| Idea | Why it helps exams | Token discipline |
|------|--------------------|------------------|
| **Micro-misconception check** | Fixes the single idea that loses marks | One short student sentence in → one corrected sentence + one exam phrase out |
| **Keyword gap scan** | Examiners reward precise terms | Output JSON: `{ "missing_terms": [], "misused": [] }` only |
| **Command-word trainer** | “Explain” vs “describe” vs “outline” | Pass only the command word + 2-line stem; ask for structure outline (bullets) |
| **Wrong distractor rationale** | Solidifies MCQ reasoning | You already know distractors; ask why each wrong option trips students up—in **one line each** |
| **30-second recap** | Spaced practice | After a topic, LLM generates **3 cloze bullets** (you render; optional fill-in offline) |
| **Self-explain then verify** | “Elaborative interrogation” effect | Student types “I think X because…”; model replies **agree / partial / fix** in ≤4 sentences |
| **Examiner “if this, then that”** | trains if/then reasoning in sciences | Structured JSON: `if_student_says` → `loses_marks_because` |
| **Bilingual gloss** (if relevant) | clarify then snap back to English exam terms | Strict: target language + English keyword line only |

**Global tactic**: prefer **JSON schema-style responses** you parse and render; keep `max_tokens` low; use **temperature** low (0.2–0.5) for marking/explanations, slightly higher only for “analogy” mode.

Example response shape for quiz feedback (illustrative):

```json
{
  "wrong_choice_explained": "≤80 words",
  "correct_logic": "≤60 words",
  "examiners_phrase": "one line",
  "try_again_question": "one short question or null"
}
```

---

## Provider & integration options

### A) **FastAPI proxy + Docker Compose (recommended for you)**

**Why it is usually better than browser-direct:**

| Concern | Browser → OpenAI | App → your FastAPI |
|--------|-------------------|---------------------|
| CORS | Often blocked or painful | You allow your static origin only |
| Secret exposure | Provider key in JS / localStorage | Provider key in **server `.env`** only |
| Rate limits / abuse | Hard to centralize | Per-IP, per-token, body size caps in one place |
| Model routing / rotation | Fat client config | Python: try model A, fallback B |
| Logging / debugging | No server trail | Optional request logs (redact prompts if needed) |

**Rough layout** (repo root):

```text
api/
  Dockerfile
  docker-compose.yml      # service: fastapi + env_file: .env
  .env.example            # OPENAI_API_KEY, APP_TOKEN, CORS_ORIGINS, MODEL, …
  requirements.txt
  app/
    main.py               # FastAPI app, POST /v1/chat or /v1/complete
    llm_upstream.py       # httpx → OpenAI-compatible API
```

- **`docker compose up`** (or `docker-compose up`) gives you a repeatable host: bind port, set `.env`, reverse-proxy TLS in production. Add **`api/.env` to `.gitignore`** when you scaffold (keep **`.env.example`** committed as documentation).
- **Static app**: `fetch(proxyBaseUrl + "/v1/…", { headers: { Authorization: "Bearer " + appToken } })` with JSON body `{ "messages": [...], "max_tokens": 400 }`—shape can mirror OpenAI for familiarity.
- **Keys in localStorage**: **only** `proxyBaseUrl` + **`appToken`** (plus feature flags in JSON). Never store the upstream LLM API key in the browser when using this proxy pattern.

**Python side**: `httpx` or official `openai` SDK inside the container is fine (no impact on the vanilla front-end). Keep endpoints narrow (e.g. only `quiz_explain`, `concept_help`) to limit prompt injection surface vs a raw “anything goes” proxy.

**Prompt ownership (recommended split):** Keep **instruction prompts + JSON output contract** in **`api/`** (single place to review safety and schema). The browser sends **structured course context** only (`subject_title`, `topic_title`, `level`, …) so answers match chemistry vs geography without shipping a full “system prompt” from the client (avoids treating user-controlled text as instructions). Optional later: **per-subject prompt snippets** in `data/subjects/<id>/llm-context.md` loaded by the client as a short `syllabus_snippet` field — still merged via a **server template**, not raw client system prompts.

### B) Direct browser `fetch` to provider API

- **Pros**: zero infra; fits vanilla JS.
- **Cons**: CORS + **exposed keys**; usually a dead end for real providers.
- **Fit**: quick dev only, or vendors that explicitly support browser keys.

### C) Small in-repo module (front-end shape)

- `js/features/llm/llm-config.js`, `llm-client.js` (calls **your** FastAPI base URL), `llm-prompts.js`, `llm-cache.js` (still client-side cache for identical quiz explanations).
- Client stays thin: one `fetch` target, JSON in/out.

### D) Supabase Edge Function as pass-through

- Same role as FastAPI but serverless on Supabase; good if you already live there and want no VM.
- **vs FastAPI**: less flexible for long-running tweaks, heavier coupling to Supabase; **vs self-hosted FastAPI**: you choose Compose + `.env` on any VPS/home lab.

### E) Local / upstream models

- **Ollama** behind FastAPI on the same machine: useful for zero cloud cost in dev.
- **Groq / Together / OpenRouter**: often OpenAI-compatible—point `base_url` in **server** env.

### “Good library?”

- **Browser**: keep **native `fetch`** + small wrapper.
- **api/**: use **`httpx`** or **`openai` Python SDK**; no need to mirror the front-end’s no-bundler rule.

### Backend: orchestration framework

**Default (recommended for this app):** **no heavy orchestration framework** (skip LangChain / LlamaIndex / Haystack unless you later add RAG, tool agents, or long conversational memory). A thin FastAPI service plus a **small in-repo module** (e.g. `app/provider_router.py`) is enough: build messages, call upstream with **`httpx`**, parse JSON, handle errors.

**Optional upgrade — [LiteLLM](https://github.com/BerriAI/litellm) (Python):** single API shape over many providers (OpenAI, Gemini, Anthropic, DeepSeek-compatible endpoints, etc.), built-in **retries / fallbacks / router** patterns, and less glue for non–OpenAI-compatible payloads. Tradeoff: extra dependency and you still configure each provider’s key in `.env`. Use it if maintaining N ad-hoc HTTP clients feels worse than one library.

**Not assumed:** LangGraph-style agents, vector DBs, or “AI platform” products—overkill for quiz explain + short marking.

### Do we need a server-side database?

**No, not for the first version.** The proxy can stay **stateless**: each request is independent; provider keys and a **provider priority list** live in **environment variables** (or a mounted config file). In-process state is enough for:

- **Failover**: if provider A returns `429` / quota / `insufficient_quota` / certain `5xx`, try B, then C (with short backoff and a hard cap on hops per request).

**Add a DB only if you need** something that must survive restarts or span instances, for example:

| Need | Typical choice |
|------|----------------|
| Usage / cost logging per day | **SQLite** (single file) or append-only log |
| Multi-replica rate limiting & shared cooldown | **Redis** |
| Per-student API quotas (future) | Postgres (you already use Supabase for the app—could be a separate table later, not required in `api/`) |

For **free-tier exhaustion** specifically, you do **not** need a DB: read limits from response headers when present, mark provider “cooldown until” in **memory** (optional: persist last-known-good in SQLite if you want dashboards).

### Multiple providers when one hits limits (OpenAI, Gemini, DeepSeek, …)

**Goal:** one exhausted or rate-limited account does not brick the feature.

1. **Ordered chain in `.env`** (example idea): declare providers **1 → 2 → 3** with each `BASE_URL`, `API_KEY`, `MODEL` (names illustrative—use real env keys in `.env.example`).
2. **Same request** tries chain until success or all fail; return a clear error to the client if every hop failed.
3. **Normalize APIs:** OpenAI and many others share a **chat-completions**-style JSON; **Gemini** uses different request/response shapes—either a **tiny adapter per provider** in your router or **LiteLLM** to absorb differences.
4. **Realism:** free tiers differ by **RPM, TPM, daily caps**, and “free” models change; log which provider served the request so you can tune order. **Cold start / billing** quirks: some errors look like generic `400`—tune your retry list conservatively.

**Rough layout addition** under `api/app/`:

```text
  provider_router.py   # chain, cooldowns in memory, adapters per API family
  # optional: litellm_client.py if you adopt LiteLLM
```

---

## Configuration schema (draft)

### Proxy-first (recommended)

Stored as one string, e.g. `localStorage.setItem("LEVELUP_LLM_CONFIG_JSON", …)`:

```json
{
  "v": 2,
  "enabled": true,
  "mode": "fastapi",
  "proxyBaseUrl": "https://llm.example.com",
  "appToken": "<same-long-secret-as-server-APP_TOKEN-paste-once-in-setup>",
  "features": {
    "conceptChat": true,
    "quizExplain": true,
    "extendedMarking": false
  },
  "cache": {
    "maxEntries": 200,
    "ttlDays": 60
  }
}
```

Server **`.env`** (never commit real values; use `.env.example` in `api/`):

```env
OPENAI_API_KEY=sk-...
# Optional second key or alternate base for rotation (implement in Python):
# OPENAI_API_KEY_FALLBACK=
OPENAI_BASE_URL=https://api.openai.com/v1
MODEL=gpt-4o-mini
# Must match appToken in LEVELUP_LLM_CONFIG_JSON (e.g. openssl rand -hex 32)
APP_TOKEN=
CORS_ORIGINS=https://your-static-host.com,http://localhost:5500

# Multi-provider fallback (illustrative—implement as ordered chain in router):
# LLM_CHAIN=openai,gemini,deepseek
# OPENAI_API_KEY=…  OPENAI_BASE_URL=…  OPENAI_MODEL=…
# GEMINI_API_KEY=…   GEMINI_MODEL=…
# DEEPSEEK_API_KEY=… DEEPSEEK_BASE_URL=https://api.deepseek.com/v1  DEEPSEEK_MODEL=…
```

### Legacy / BYOK (browser holds provider key)

`"mode": "byok"` with embedded `providers[]` (previous schema) remains possible for experiments; FastAPI can accept `Authorization: Bearer <openai_key>` and forward **without storing**—still prefer **server `.env`** for daily use.

**Setup UX**: two fields (or one JSON blob): **proxy base URL** + **app token** (paste once after copying from server `.env` / password manager)—same spirit as `SUPABASE_*` in `setup-forms.js`; validate JSON on save.

---

## Privacy, safety, syllabus fidelity

- **PII**: discourage pasting name/school; prompts can include a system line “student answer may contain PII—do not repeat it.”
- **Syllabus drift**: ground explanations in **your** topic snippets / mark schemes when available; system prompt: “If conflict, prefer provided source material.”
- **Content policy**: marking and “why wrong” can touch sensitive topics in humanities—use neutral, academic tone in system instructions.

---

## Phased implementation (suggested)

| Phase | Scope | Outcome |
|-------|--------|---------|
| **P0** | `api/` FastAPI minimal `POST /health` + `POST /llm/quiz-explain` (or OpenAI-shaped `/v1/chat/completions`), Docker Compose + `.env.example` | Runnable proxy; keys only on server |
| **P0b** | Front-end: `llm-config` + `fetch` to `proxyBaseUrl`, CORS tested against real static origin | End-to-end one feature |
| **P1** | Quiz “Why?” + strict JSON + **client** LRU cache | Immediate value, bounded tokens |
| **P2** | Topic-scoped “Explain this” with manifest context | Study-time comprehension |
| **P3** | Extended-answer marking + speech + anti-paste UX | **Partial:** Chemistry topics 1–2 have `extendedQuestions` + Quiz tab UI (`quiz-extended.js`): two-step rubric/model, min-length gate, anti-paste/drop. LLM marking + speech still **not** wired. |
| **P4** | Server: rate limits, max body size, **provider chain + in-memory cooldowns**, optional SQLite usage logs, structured logging | Production hardening |

---

## Testing notes

- Extend `tests/integration.html` with **mocked `fetch`** for LLM client (no live keys in CI).
- Manual: verify behavior with key missing, malformed JSON, quota errors, and cache hit path.

---

## Open decisions (to pick before coding)

1. **Hosting**: same machine as static files vs separate subdomain for `api/` (separate origin simplifies caching and TLS).
2. **Auth**: `APP_TOKEN` only vs future per-family keys (still no OpenAI key in browser).
3. **Default model** / cost cap (text mini models usually enough).
4. **Whether cached explanations sync to Supabase** (probably **no**—keep cache local unless explicit consent + retention policy).
5. **Parent controls**: disable LLM entirely on shared devices.

---

## Summary

- **Self-hosted FastAPI + Docker Compose** is the **default recommended path**: fixes CORS, keeps **provider keys in `.env`**, and keeps the vanilla app as a thin `fetch` client storing **only `proxyBaseUrl` + long `appToken`** (mirrors `APP_TOKEN` on the server)—**not** “strong auth,” but a reasonable shared secret for a lightweight gate.
- Use **structured JSON outputs**, **content-derived context**, and **client LRU cache** for token efficiency.
- Optional **BYOK** via localStorage + your proxy is acceptable for advanced users; **server-side keys** are simpler and safer for typical students.
- Supabase Edge remains an alternative if you prefer serverless over a small always-on container.
