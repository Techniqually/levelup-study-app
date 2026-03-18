# LevelUp! O-Level Chemistry

**Notes · Visuals (SVG) · Flashcards · Timed quiz (20 random from ~26+ bank) · Games · Shop · Boss battles · Encrypted progress export**

## Run

```bash
npx serve .
```

Open the URL (needed for dynamic topic scripts if the browser blocks `file://`).

## Content layout (theme folders)

| Path | Topics |
|------|--------|
| `data/theme1-matter/topic-01.js` … `topic-05.js` | Theme 1 |
| `data/theme2-reactions/topic-06.js` … `topic-16.js` | Theme 2 |
| `data/theme3-sustainable/topic-17.js` … `topic-19.js` | Theme 3 |

**How loading works:** see [`docs/DATA-LOADING.md`](docs/DATA-LOADING.md).

**Regenerate topic files** after editing `scripts/topics-chunk-*.mjs`:

```bash
node scripts/build-all.mjs
```

## Image prompts (Nano Banana etc.)

[`docs/nanobanana-image-prompts.md`](docs/nanobanana-image-prompts.md)

## Legacy

`js/chemistry-data.js` is **not** used if you load `topics-manifest.js` + theme topic files.

## Progress

Stored in `localStorage` (`levelup_chem_v1`). **Settings → Transfer progress** for encrypted copy/paste between browsers.
