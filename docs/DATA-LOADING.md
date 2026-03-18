# How topic data loads

1. **`index.html`** loads `js/topics-manifest.js` then `js/app.js`.
2. **Manifest** (`TOPICS_MANIFEST`) lists each topic’s `id`, display `theme`, `title`, and **`file`** path (e.g. `data/theme1-matter/topic-01.js`).
3. **First time** you open a topic, `app.js` injects a `<script src="…">` for that file only.
4. The script calls **`window.__registerTopic({ … })`**, which stores the topic in **`window.__topicRegistry[id]`**.
5. **Same topic again** → no second request (cached in memory). **Another topic in the same theme folder** → separate file, separate script load.
6. **Boss battle** loads **all** topic scripts in that theme in parallel, merges their `quiz` arrays, then runs the boss round.

## Folder layout (theme-wise)

| Folder | Topics |
|--------|--------|
| `data/theme1-matter/` | 1–5 |
| `data/theme2-reactions/` | 6–16 |
| `data/theme3-sustainable/` | 17–19 |

## Regenerating / editing content

- **Source of truth for generation:** `scripts/topics-chunk-1.mjs`, `topics-chunk-2.mjs`, `topics-chunk-3.mjs` + `scripts/build-all.mjs` + `scripts/emit-topic.js`.
- Run: **`node scripts/build-all.mjs`** from the project root → overwrites the `data/theme*/topic-NN.js` files.
- Or edit a generated `topic-NN.js` directly for quick fixes (will be overwritten next time you run the build unless you change the chunks).

## Hosting (Netlify / Vercel)

Deploy the whole site; paths are relative to the site root. HTTPS is required for some features (e.g. crypto in settings). Each `topic-NN.js` is a static asset fetched like any other script.
