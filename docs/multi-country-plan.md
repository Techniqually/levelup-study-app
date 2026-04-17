# Multi-country / multi-class plan

## Current POC

- **One user sticks to one country + one class.** No cross-country browsing.
- **UI** is hard-coded for `sg` + `olevel` (three subjects).
- **Data + API** already accept a `(country_code, class_code, subject_slug)` triple; only the UI is locked for now.

## Data model

### `public.profiles`

| column         | type | default   | notes                                       |
| -------------- | ---- | --------- | ------------------------------------------- |
| `country_code` | text | `'sg'`    | 2-3 lowercase letters, check-constrained     |
| `class_code`   | text | `'olevel'`| 2-20 lowercase alnum/underscore              |

Trigger `handle_new_user()` fills defaults from `raw_user_meta_data` if provided (so we can pass them at sign-up time), else the table defaults apply.

### Catalog tables (RLS: readable by everyone)

- `catalog_countries (country_code, display_name, sort_order, is_active)`
- `catalog_classes (country_code, class_code, display_name, sort_order, is_active)`
- `catalog_subjects (country_code, class_code, subject_slug, display_name, sort_order, is_active)`

Only active rows are shown in UI; inactive rows are reserved slots (PSLE, A-Level, HK, IN, US, etc.). Seeded by migration `20260417000000_country_class.sql`.

Client mirror: `content/data/catalog.js` (`window.LEVELUP_CATALOG`). Keep the two in sync until we fetch from the DB at boot.

### `public.subject_entitlements` (structured, row per subject)

```
(user_id, country_code, class_code, subject_slug) primary key
 access_from, access_to, source, created_at
```

- `subject_slug = '__all__'` means "all subjects in that country + class".
- Helper: `public.user_has_subject_entitlement(user_id, country, class, subject)`.

### Legacy `public.user_entitlements.entitlements text[]`

Retained **only as a denormalized projection** of SG O-Level subject_entitlements rows. Kept in sync by trigger `trg_subject_ent_sync` (fires on insert/update/delete on `subject_entitlements`). Existing client code (`web/js/features/auth/auth-client.js`) keeps working unchanged.

Write path for new entitlements (e.g. Stripe webhook) should target `subject_entitlements` directly; the trigger fans out into the legacy array for us.

## Storage (content files)

- Paths stay flat: `study-materials/<subject>/...` (e.g. `chemistry/topics-manifest.json`).
- RLS (`20260417000000_country_class.sql`, policy `study_materials_read`) derives `(country, class)` from the reader's `profiles` row and gates access on `user_has_subject_entitlement(user_id, country, class, subject_from_path)`.
- **When we add a second country / class**, migrate content to nested paths `<country>/<class>/<subject>/...` and update RLS to read country/class from the path (no profile join needed). `LevelupContext.storagePrefix()` is the placeholder the client already reads.

## Client plumbing (provisional)

- `web/js/shell/app-context.js` exposes `window.LevelupContext`:
  - `get()` — sync read of `{ country, class }` (defaults `sg` / `olevel`; localStorage cached).
  - `loadFromProfile()` — async refresh from the authenticated `profiles` row.
  - `setProfile({ country, class })` — cache write (also dispatches `levelup:context-changed`).
  - `storagePrefix()` — returns `""` today, will return `"<country>/<class>/"` once content is nested.
- Loaded by `write-hub-tail-scripts.js`, `write-subject-tail-scripts.js`, `write-parent-tail-scripts.js` **before** `auth-client.js`.
- `remote-manifest.js` does **not** use the prefix yet (flat paths); the hook is ready when we flip.

## Adding a new country / class (future checklist)

1. Insert rows into `catalog_countries`, `catalog_classes`, `catalog_subjects` (or flip `is_active`).
2. Mirror the additions in `content/data/catalog.js`.
3. Upload content under `<country>/<class>/<subject>/...` in Supabase Storage.
4. Switch `LevelupContext.storagePrefix()` to return `ctx.country + "/" + ctx["class"] + "/"`.
5. Update `study_materials_read` RLS to use `split_part(name,'/',1)` = country, `split_part(name,'/',2)` = class, `split_part(name,'/',3)` = subject.
6. UI: add country + class picker on hub (or during sign-up); write via `LevelupContext.setProfile` + a `profiles` UPDATE.
7. Stripe SKU → `subject_entitlements` rows via webhook (already structured).

## Entitlement semantics reminder

- A user sees a subject if **any** of:
  - that row exists in `subject_entitlements` for `(user_id, their_country, their_class, subject)`, OR
  - a `subject_slug = '__all__'` row exists for the same `(country, class)`.
  - `access_to` is NULL (perpetual) or in the future.
- Free preview (Topic 1 of each subject) is **independent of entitlements**; controlled by `<subject>/free/*` storage paths (RLS allows anyone authenticated to read).
