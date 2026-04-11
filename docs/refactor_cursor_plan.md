# Refactor plan (updated) — study-app JS split + wiring

This supersedes the in-chat Cursor plan from the refactor kickoff. **Do not edit** [docs/refactor_wiring_plan.md](refactor_wiring_plan.md) for now (per your note). Original feature-layout ideas stay in [docs/refactor_plan.md](refactor_plan.md). **[data/](data/) remains untouched.**

## What you already did

- Moved **almost all** functions from the TSV map into the suggested `js/` subtrees (utils, core, features, ui).
- **Not moved yet:** the manifest theme index — the **`buildThemes` IIFE** still lives in [js/app.js](js/app.js) (lines ~50–66), building `themeOrder` / `themesByKey` from `manifest`.
- **Not done yet:** hoisting **shared constants / policies** out of `app.js` into a small module (or a single `window.LevelupConfig` object) per the TSV “notes” column; **`subject.html` / `index.html` / `parent.html`** unchanged.
- **Backup:** [js/app.js.backup](js/app.js.backup) = full original monolith (keep until wiring is verified).

## Current `app.js` role (post-split)

[js/app.js](js/app.js) is a **bootstrap shell**: globals for subject/version, manifest guard, **theme index IIFE**, DOM refs (`main`, `dock`), `state` / `route` / trackers, **constants** (`QUESTION_MS`, `TIME_XP`, `DAILY_CHALLENGE`, …), then event listeners + `progressStore` init. Split modules still need a **defined contract** for how they see `manifest`, `state`, constants, and DOM (today many pieces assume **shared globals** — see below).

## Outstanding work (by owner)

### 1. You (optional / small)

- **`themes-index`:** Extract `buildThemes` into [js/features/study/themes-index.js](js/features/study/themes-index.js) as e.g. `buildThemeIndex(manifest)` returning `{ themeOrder, themesByKey }`, then `app.js` assigns the result. Pure refactor; no behavior change.

### 2. Agent / next implementation pass (no need for you on SQL)

- **Constants + config:** Move the large `const` block from `app.js` into e.g. `js/core/app-constants.js` (or attach to `window.LevelupConfig`) so feature files do not rely on accidental globals. Align with TSV notes (`STATE_VERSION`, `XP_RATE_LIMITS`, farm lock, purchase windows, boss knobs, etc.).
- **HTML extractions** (still per original plan):
  - [subject.html](subject.html): first inline script → `js/shell/subject-config.js`; second (script chain) → `js/shell/subject-script-chain.js`; update loader to **`push` every new split script** in a **fixed order** before `js/app.js`.
  - [index.html](index.html): hub setup → `js/shell/hub-setup.js` and **dedupe** with subject-config where possible.
  - [parent.html](parent.html): dashboard IIFE → `js/parent-dashboard.js` (+ optional `css/parent.css` later for inline `<style>`).
- **Global / wiring contract:** Many moved files (example: [js/features/study/topic-load.js](js/features/study/topic-load.js)) reference `manifest`, `APP_VERSION`, `loadScriptPromises` as **bare identifiers**. Either:
  - **A)** Publish a explicit `window.LevelupRuntime = { manifest, state, route, … }` (or namespaced functions) updated from `app.js`, and change modules to read that; or  
  - **B)** Keep classic scripts and rely on **global `var`** / `window.*` assignments from `app.js` before other scripts (fragile but minimal diff); or  
  - **C)** Introduce a bundler / ES modules (larger change; must preserve topic script order and `__topicRegistry` timing).

### 3. [supabase/study_app_phase1.sql](supabase/study_app_phase1.sql) — do you need to help?

**No**, for “wire JS back together.” The SQL file is **schema + RPC definitions**; the front-end refactor does not require you to edit it unless you intentionally **change RPC names, parameters, or table shapes** consumed by [js/supabase-client.js](js/supabase-client.js) / [js/progress-store.js](js/progress-store.js). If wiring exposes a bug that turns out to be **server contract** mismatch, we can call that out then.

### 4. Other JS files — do you need to help?

- **[js/progress-store.js](js/progress-store.js)** / **[js/supabase-client.js](js/supabase-client.js)** / **[js/infographics-info-loader.js](js/infographics-info-loader.js):** No refactor required for the file split **unless** the wiring plan switches to ES modules and you want cleaner imports — still implementable without you.
- **Split feature files:** Any follow-up is **wiring + globals/constants**, not re-copying from backup.

## Next phase: “wire all together” (checklist for a later session)

1. Define **one** runtime contract (see §2) and make every split file use it consistently.
2. Update **subject.html** script list: deterministic order (utils → core → features → ui → **app.js** last).
3. Smoke-test: home, topic tabs, quiz + boss, shop + sync, settings import/export, daily challenge counters.
4. Remove or archive **app.js.backup** only after tests pass.

## Related docs

- [docs/refactor_plan.md](refactor_plan.md) — original feature-folder inspiration (still valid directionally).
- [docs/refactor_wiring_plan.md](refactor_wiring_plan.md) — **out of scope** until you say otherwise.
