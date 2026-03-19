# LevelUp! 

**Notes · Visuals (SVG) · Flashcards · Timed quiz (20 random from ~26+ bank) · Games · Shop · Boss battles · Encrypted progress export**

## Run

```bash
npx serve .
```

Open the URL (needed for dynamic topic scripts and markdown XHR if the browser blocks `file://`).

## Content layout (subjects)

The app supports multiple subjects. `js/app.js` reads `window.SUBJECT_ID` and loads that subject’s topic/infographics assets from `data/subjects/<subject>/...`.

### Subject picker shells

- `index.html` (landing): links to subject shells
- `subject.html`: generic shell (set by `?subject=<id>`, e.g. `subject?subject=physics`)
- `study.html`: legacy chemistry redirect to `subject?subject=chemistry` (kept for convenience)

### Per-subject topic data

Each subject provides:

- `data/subjects/<subject>/topics-manifest.js`
- `data/subjects/<subject>/theme*/topic-*.js` (theme folders + topic scripts)

Topic scripts must call `window.__registerTopic({ id, title, ... })`.

**How loading works:** see [`docs/DATA-LOADING.md`](docs/DATA-LOADING.md) (still valid, just under `data/subjects/<subject>/...`).

**Regenerate topic files** after editing `scripts/topics-chunk-*.mjs`:

```bash
node scripts/build-all.mjs
```

## Infographics extra-info (generic)

Each subject may have *per-infographic* markdown text stored here:

- `data/subjects/<subject>/infographics-info.md`

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

1. `data/subjects/<subject>/topics-manifest.js`
2. (optional) `data/subjects/<subject>/infographics-images.js`
3. `js/infographics-info-loader.js`
4. `data/shop-rewards.js`
5. `js/app.js`

## Adding a new subject (minimal checklist)

1. Create a subject shell HTML (copy an existing one):
   - `subject.html` pattern is preferred (generic `?subject=<id>` driven)
   - set `window.SUBJECT_ID` and `window.SUBJECT_TITLE`
   - inject scripts with the required load order above
2. Add topic data:
   - `data/subjects/<newSubject>/topics-manifest.js`
   - `data/subjects/<newSubject>/theme*/topic-*.js` (must call `window.__registerTopic`)
3. Add infographic images (folder):
   - `data/subjects/<newSubject>/images/` (for image-backed infographics)
4. Add infographic extra-info markdown:
   - `data/subjects/<newSubject>/infographics-info.md`
   - ensure `### File: <filename>` keys match the infographic `infoKey` (usually the exact image filename)
5. If needed, add image wiring:
   - `data/subjects/<newSubject>/infographics-images.js` (only if topic scripts don’t embed `infographics`)

## Image prompts (Nano Banana etc.)

[`docs/nanobanana-image-prompts.md`](docs/nanobanana-image-prompts.md)

## Legacy

`js/chemistry-data.js` is **not** used if you load `topics-manifest.js` + theme topic files.

## Progress

Stored in `localStorage` (`levelup_chem_v1`). **Settings → Transfer progress** for encrypted copy/paste between browsers.
