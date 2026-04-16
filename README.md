# LevelUp! 

**Notes · Visuals (SVG) · Flashcards · Timed quiz (20 random from ~26+ bank) · Games · Shop · Boss battles · Encrypted progress export**

## Run

```bash
npx serve .
```

Open the URL (required for runtime script loading).

## Content layout (subjects)

The app supports multiple subjects. In production POC mode, `js/app.js` reads `window.SUBJECT_ID` and subject data is loaded from Supabase Storage (`study-materials` bucket) only.

### Subject picker shells

- `index.html` (landing): links to subject shells
- `subject.html`: generic shell (set by `?subject=<id>`, e.g. `subject?subject=physics`)
- `study.html`: legacy chemistry redirect to `subject?subject=chemistry` (kept for convenience)

### Per-subject topic data (storage source of truth)

Each subject provides files in `content/data/subjects/<subject>/`, synced to bucket object keys `<subject>/...`:

- `topics-manifest.js` (also converted to `<subject>/topics-manifest.json` during sync)
- `theme*/topic-*.js` (theme folders + topic scripts)

Topic scripts must call `window.__registerTopic({ id, title, ... })`.

`web/` no longer falls back to local `data/...` files. Missing bucket objects now fail the subject bootstrap by design.

**Regenerate topic files** after editing `scripts/topics-chunk-*.mjs`:

```bash
node scripts/build-all.mjs
```

## Sync subject data to Supabase Storage (repeatable)

For monetized delivery, upload a subject from `content/data/subjects/<subject>/` into private bucket `study-materials`.

```bash
SUPABASE_URL=http://127.0.0.1:54321 \
SUPABASE_SERVICE_ROLE_KEY=... \
node content/tools/sync-study-materials.mjs --subject chemistry --free-topic theme1-matter/topic-01.js
```

The script:
- uploads all files under `content/data/subjects/<subject>/` to `<subject>/...` in the bucket
- generates and uploads `<subject>/topics-manifest.json` from `topics-manifest.js`
- uploads `content/data/shop-rewards.js` to `shared/shop-rewards.js` (required runtime data)
- optionally writes a free preview copy to `<subject>/free/<topic-file>`
- keeps incremental hash state in `<subject>/.upload-manifest.json` (changed files only on future runs)

Use the same script for local and remote Supabase by changing only `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## Infographics extra-info (generic)

Each subject may have *per-infographic* markdown text in:

- `content/data/subjects/<subject>/infographics-info.md` (synced to `<subject>/infographics-info.md`)

The generic loader parses that markdown synchronously into:

- `window.INFO_MD_BY_TOPIC_AND_FILE[topicId][infoKey]`

Loader location:

- `js/infographics-info-loader.js`

### Markdown format (`infographics-info.md`)

- `#### Topic <id>` (supports `3A`, `11C`, etc.)
- then one or more blocks:
  - `### File: <filename>`
  - markdown content for that specific infographic
- keep `***` lines as visible dividers

### How the renderer finds the right snippet

In `renderVisuals()` (inside `js/app.js`), for each infographic entry `inf`:

- `infoKey = inf.infoKey` if provided
- otherwise `infoKey = basename(inf.image)` (for image-backed infographics)
- then it renders `window.INFO_MD_BY_TOPIC_AND_FILE[t.id][infoKey]`

### Physics-style image wiring (optional)

If topic files do *not* embed `infographics`, add:

- `data/subjects/<subject>/infographics-images.js`

This script sets:

- `window.SUBJECT_INFOS_BY_TOPIC[topicId] = [{ image, caption, infoKey }]`

If topic files already embed infographics, you can omit `infographics-images.js` for that subject.

### Required load order in the subject shell

Subject shell must inject (with cache-busting `?v=`):

1. remote bootstrap via `js/features/study/remote-manifest.js` (manifest + optional assets + shop rewards from bucket)
2. `js/infographics-info-loader.js`
3. `js/app.js`

## Adding a new subject (minimal checklist)

1. Create a subject shell HTML (copy an existing one):
   - `subject.html` pattern is preferred (generic `?subject=<id>` driven)
   - set `window.SUBJECT_ID` and `window.SUBJECT_TITLE`
   - inject scripts with the required load order above
2. Add topic data in `content/`:
   - `content/data/subjects/<newSubject>/topics-manifest.js`
   - `content/data/subjects/<newSubject>/theme*/topic-*.js` (must call `window.__registerTopic`)
3. Add infographic images (folder):
   - `content/data/subjects/<newSubject>/images/` (for image-backed infographics)
4. Add infographic extra-info markdown:
   - `content/data/subjects/<newSubject>/infographics-info.md`
   - ensure `### File: <filename>` keys match the infographic `infoKey` (usually the exact image filename)
5. If needed, add image wiring:
   - `content/data/subjects/<newSubject>/infographics-images.js` (only if topic scripts don’t embed `infographics`)

## Image prompts (Nano Banana etc.)

[`docs/nanobanana-image-prompts.md`](docs/nanobanana-image-prompts.md)

## Legacy

`js/chemistry-data.js` is **not** used if you load `topics-manifest.js` + theme topic files.

## Progress

Stored in `localStorage` (`levelup_chem_v1`). **Settings → Transfer progress** for encrypted copy/paste between browsers.

## Supabase setup (required for central progress + parent dashboard)

This app supports hybrid persistence:
- local cache in `localStorage` (offline/fallback)
- central sync to Supabase (scores, XP/events, purchases, parent analytics)

### 1) Create/run database schema

Run all SQL files in order from:

- `supabase/migrations/*.sql`

The script includes:
- core tables + study tables
- RLS policies
- student identity (`student_id`) support
- idempotent event/purchase upsert indexes
- reward purchase RPC
- monetization POC entitlements + Stripe webhook idempotency tables
- private `study-materials` storage policies
- parent dashboard RPC + parent code setup function
- profile data clear function

### 2) Configure client keys in app

Use the **Setup package** tool (subject hub, subject Settings, or parent page): paste a Base64 string or JSON with `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and optional `LEVELUP_STUDENT_*`, `llm`, `parent`, etc. Values are stored in `localStorage`.

For monetization POC, use real Supabase keys and login; offline defaults are not part of the paid-access path.

From the console (opens the same package UI):
- `window.configureConfigPackage()` (hub)
- `window.configureSupabaseKeys()` / `window.configureStudentProfile()` (subject — aliases for the package tool)

### Setup package (one copy/paste string)

To simplify parent/student setup, use the **Setup package** tool (Hub / Subject Settings / Parent pages).

- **Generate** builds a full JSON template (every key we embed: Supabase, student, `llm`; empty strings where nothing is stored yet) and the matching Base64 string, so you can edit blanks and share.
- **Encode JSON → Base64** (after editing the JSON preview) refreshes the one-line package for the student. **Decode → JSON** fills JSON from a pasted string and also refreshes the Base64 field to match.
- **Apply** accepts either field; on success, both stay in sync.
- This is convenience only (not security/encryption).

Recommended JSON shape:

```json
{
  "v": 2,
  "SUPABASE_URL": "https://xxxx.supabase.co",
  "SUPABASE_ANON_KEY": "eyJ...",
  "LEVELUP_STUDENT_ID": "carol-1",
  "LEVELUP_STUDENT_NAME": "Carol",
  "llm": {
    "enabled": true,
    "mode": "fastapi",
    "proxyBaseUrl": "https://your-render-app.onrender.com",
    "features": { "quizExplain": true },
    "cache": { "maxEntries": 200, "ttlDays": 60 }
  }
}
```

Parent dashboard project/parent codes are **not** part of generated packages — enter them on **`parent.html`** (same Supabase as the student app is enough).

Compatibility notes:
- `fastapi` is accepted as an alias for `llm` when importing.
- `LEVELUP_STUDENT_NAME` is optional on import (omit if you only need to refresh other keys).
- Legacy pastes may still include a `parent` object; **Apply** will still write those keys if present.
- **`llm`**: a block with `enabled: true` but empty `proxyBaseUrl` is **not** written. Use `"enabled": false` to persist a disabled stub, or set the URL.
- Only known keys are applied; unknown fields are ignored.

Important:
- Do **not** use DB connection string or service role in browser.
- Use only Project URL + anon/public key.
- FastAPI verifies Supabase JWTs server-side with `SUPABASE_JWT_SECRET`; browser only sends the normal Supabase access token.

### 3) Student identity

Student profile setup asks for:
- student display name
- student id (stable identifier across devices)

With same student id + same Supabase project, multiple devices map to the same logical student profile.

### 4) Parent dashboard

Open:
- `parent.html`

Before first use, set a parent code in SQL:

```sql
select public.study_set_parent_code('study-app', 'your-parent-pin');
```

Then enter project code + parent PIN in `parent.html`.

Optional:
- `Remember 30 days` stores only a SHA-256 token in browser storage (not plain PIN).

### 5) Clear one student/profile data

Delete one student's data (and optionally profile row):

```sql
select public.study_clear_profile_data(
  p_project_code => 'study-app',
  p_student_id => 'carol-1',
  p_delete_profile => true
);
```

### 6) Troubleshooting

- `401 Unauthorized` on `/rest/v1/...`:
  - wrong key type or wrong project key
  - verify URL + anon key pair from the same project
- `permission denied for schema public`:
  - grants missing; rerun `supabase/study_app_phase1.sql`
- upsert `400` on `on_conflict` for XP/purchase:
  - rerun script to ensure non-partial unique indexes exist
