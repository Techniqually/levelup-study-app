/**
 * Sets `window.APP_VERSION` for `?v=` on first-party scripts/CSS.
 *
 * Why `<html data-levelup-build>` matters:
 *   `asset-version.js` itself is loaded without a query string. If a CDN/browser caches it
 *   aggressively, an OLD copy could keep emitting an OLD `APP_VERSION`. The **HTML document**
 *   is usually revalidated more often; putting the build id on `<html data-levelup-build="…">`
 *   lets this script (even an older cached copy, once it contains this reader) pick up the
 *   new value from the fresh HTML parse.
 *
 * Where to bump (production):
 *   1) Set `data-levelup-build` on `<html>` in **subject.html**, **index.html**, and **parent.html**
 *      (keep the same value on all three).
 *   2) Keep the fallback string below in sync for edge cases (no attribute, file://, tests).
 *
 * Local dev: on localhost / 127.0.0.1 we use UTC `YYYYMMDD-dev` unless `APP_VERSION` or
 *   `data-levelup-build` already set.
 */
(function (g) {
  if (g.APP_VERSION) return;
  var doc = g.document;
  var fromHtml =
    doc &&
    doc.documentElement &&
    doc.documentElement.getAttribute &&
    String(doc.documentElement.getAttribute("data-levelup-build") || "").trim();
  if (fromHtml) {
    g.APP_VERSION = fromHtml;
    return;
  }
  var host = String((g.location && g.location.hostname) || "");
  if (/^(localhost|127\.0\.0\.1)$/i.test(host)) {
    g.APP_VERSION = new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-dev";
    return;
  }
  g.APP_VERSION = "2026-04-13-9";
})(window);
