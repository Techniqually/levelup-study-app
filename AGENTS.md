# LevelUp study app — agent notes

Vanilla **HTML + CSS + JS** (no bundler). Three entry pages: **`index.html`** (subject hub), **`subject.html`** (per-subject app), **`parent.html`** (parent dashboard).

Optional **LLM proxy:** **`api/`** — FastAPI + Docker Compose; provider keys stay server-side (`OPENAI_API_KEY` in `.env`). See **`api/README.md`** and **`docs/llm-integration-plan.md`**.

## Cache busting (central)

- **Production bump:** set **`data-levelup-build`** on the `<html>` tag in **`subject.html`**, **`index.html`**, and **`parent.html`** (same value on all three). That value becomes `APP_VERSION` even if **`asset-version.js`** is still an older cached file (HTML is usually revalidated sooner than long‑cached JS).
- **Fallback:** `js/shell/asset-version.js` ends with a string literal if there is no `data-levelup-build` (e.g. `file://`, odd entrypoints). Keep it aligned with the HTML attribute when you ship.
- **Local dev:** without `data-levelup-build`, `localhost` / `127.0.0.1` use **UTC `YYYYMMDD-dev`**. Tests may set `window.APP_VERSION` before `asset-version.js` runs (then this file does nothing).
- **Who reads `APP_VERSION`:** `subject-script-chain.js` (`mkV`), `subject-head-assets.js`, `write-*-tail-scripts.js`, `topic-load.js`, `app.js`. `subject-config.js` only sets `window.APP_VERSION` if still unset (`|| "dev"`).
- **Study report digest:** `saveState` → `progressStore.scheduleReportDigest("save")` (debounced). Tab hidden → `flushReportDigest("hidden")` after `REPORT_DIGEST_HIDDEN_DELAY_MS`. Uploads capped per local day (`REPORT_DIGEST_MAX_UPLOADS_PER_DAY`); skips if fingerprint unchanged. Inserts `event_log` rows with `event_type = study_report_digest` (`text` capped, `event_data` JSON). Tunables in `app-constants.js`.
- **Subject:** `subject.html` loads `asset-version.js` + **`subject-head-assets.js`** (injects `link` for `css/styles.css?v=…`), then **`write-subject-tail-scripts.js`** (chains Supabase CDN → `auth-client` → `setup-forms` → `subject-config` → `remote-manifest` → `subject-script-chain` via `onload`, no `document.write`).
- **Hub / parent:** `write-hub-tail-scripts.js` loads Supabase CDN → `auth-client.js` → `auth-ui.js` → `setup-forms.js` → `hub-setup.js`; **`write-parent-tail-scripts.js`** loads `setup-forms.js` → `parent-dashboard.js`.
- **Subject runtime data source:** production POC uses Supabase Storage (`study-materials`) only; `subject-script-chain.js` hard-fails if remote bootstrap is missing/invalid.
- HTML entry URLs are usually fine without a query; use server `Cache-Control` on `.html` if needed.

**Do not** use a rolling calendar date as the **production** default: it would bust every visitor’s cache every day even when no code changed.

## Boot order (subject)

1. **`js/shell/asset-version.js`** then **`subject-head-assets.js`** (in `<head>`).
2. **`js/shell/write-subject-tail-scripts.js`** (end of `<body>`) → Supabase CDN, **`js/features/auth/auth-client.js`**, **`setup-forms.js`**, **`subject-config.js`**, **`js/features/study/remote-manifest.js`**, **`subject-script-chain.js`** (each with `?v=APP_VERSION` where applicable).
3. **`subject-config.js`** — sets `window.SUBJECT_ID` / `SUBJECT_TITLE`, mirrors local storage setup to `window`, requires Supabase session, and enforces entitlement checks before app bootstrap.
4. **`subject-script-chain.js`** — waits on `__LEVELUP_SUBJECT_SETUP`, then calls `LevelupRemoteManifest.loadSubjectBootstrap(subjectId)` (loads `topics-manifest.json`, optional subject JS, `shared/shop-rewards.js`, optional `infographics-info.md`), then appends feature scripts with **`js/app.js`** last.

If you add globals consumed in `app.js`, load their script **before** `app.js` in `subject-script-chain.js`.

## Boot order (hub)

`index.html` loads **`asset-version.js`** then **`write-hub-tail-scripts.js`** → Supabase CDN, `auth-client.js`, `auth-ui.js`, `setup-forms.js`, **`hub-setup.js`**.

## Layout of `js/`

| Area | Path | Role |
|------|------|------|
| Core | `js/core/app-constants.js`, `app-runtime.js`, `state-schema.js`, `state-persistence.js` | Tunables, mutable `var` globals (`state`, `route`, …), `defaultState` / `normalizeState`, `saveState` / `loadState` |
| Shell | **`asset-version.js`**, **`subject-head-assets.js`**, **`write-*-tail-scripts.js`**, `subject-config.js`, `subject-script-chain.js`, `hub-setup.js`, `setup-forms.js` | Version stamp, busted static includes, subject resolution, ordered loading, hub banner, setup modals |
| Features | `js/features/study/*`, `js/features/xp/*`, `js/features/shop/*`, `js/features/daily/*`, `js/features/llm/*` | Topic/quiz/shop/XP/daily/LLM proxy client (`LEVELUP_LLM_CONFIG_JSON`) + keepalive pings (`llm-keepalive.js`) |
| UI | `js/ui/topbar.js`, `modals.js`, … | DOM updates |
| Data | `content/data/subjects/<subject>/*` + `content/data/shop-rewards.js` (synced to Storage) | Source content for storage-backed runtime |
| Sync | `js/supabase-client.js`, `js/progress-store.js` | Supabase client + `ProgressStore` API |

**Structured (long) answers:** optional `extendedQuestions` on a topic (command word, marks, `prompt`, `rubric[]`, `modelAnswer`, optional `syllabusNote`, optional `minCharsForModel`). UI: **`Written`** tab in `subject.html` dock (`route.tab === "written"`); `topic-panels.js` → `renderWrittenPanel` / `LevelupExtendedQuiz.renderWrittenShell` + `bindWritten`. One question at a time (step in `sessionStorage`). **XP:** `state.writtenClaims` (once per question per local UTC day) + `addXp` `activityType: "written_practice"` after mark scheme + model viewed + heuristic quality (`app-constants.js` `WRITTEN_CLAIM_*`). Script: `quiz-extended.js` before `quiz-engine.js`.

## Identity & storage keys

- **`LEVELUP_STUDENT_ID`**, **`LEVELUP_STUDENT_NAME`** in `localStorage`; mirrored on `window` as `LEVELUP_STUDENT_ID` / `LEVELUP_STUDENT_NAME` before the app runs.
- **`SUPABASE_URL`**, **`SUPABASE_ANON_KEY`** in `localStorage`.
- Per-subject persisted state: key **`levelup_<SUBJECT_ID>_v1`** (`STORAGE_KEY` in `app.js`).

`app.js` maps `STUDENT_ID` / `STUDENT_NAME` from `window` + `localStorage` (see top of `js/app.js`).

## Tests

- **`tests/integration.html`** — in-browser harness: loads a subset of scripts + stubs DOM ids used by `topbar.js` / `saveState`. Open over **`http://localhost/...`** (not `file:`) if anything relies on fetch/XHR behavior.
- **When changing** XP ledger, state schema, shop snapshot rules, crypto, or format helpers, **update or extend** `tests/integration.html` so assertions stay aligned (see suites: `utils`, `crypto`, `state`, `xp`, `shop`, **`shop-contract`**, `quiz`, `persistence`, `supabase` smoke).
- Supabase rows in that file are **read-only smoke**; anon/RLS may hide rows (tests allow null profile).

## Conventions for edits

- Prefer **small, focused diffs**; match existing style (`function` declarations, `var` in legacy paths, IIFEs in shell).
- Custom events include `levelup:xp-gained`, `levelup:state-saved`, `levelup:route-changed` (see `xp-ledger.js`, `state-persistence.js`, `render-home-topic.js`).
- Shop: server is source of truth for XP after purchase; **`applyShopSnapshot`** in `shop-sync.js` reconciles local `state.xp` and coupon lists.

## Decision quality guardrail

- If a user-requested suggestion/change appears to conflict with best practices, introduces notable security/maintainability risk, or creates major trade-offs, **pause and ask for explicit confirmation before applying it**.
- In that confirmation, briefly state why it is risky and propose the safer/default alternative.
- If the user confirms, proceed as requested and document the trade-off in the final summary.

## Cursor / AGENTS

Keep this file updated when **entrypoints**, **load order**, or **test strategy** change. Point contributors at **`js/shell/subject-script-chain.js`** for the canonical script list.
