/**
 * Deployment-aware paths + guard against reusing local Supabase keys on prod hosts.
 * Load this synchronously before api-config.js / bootstrap.js on every page that auth-bootstraps.
 */
(function (global) {
  function isDevHostname() {
    var h = (global.location && global.location.hostname) || "";
    return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
  }

  /** True if URL points at local Supabase (or other dev-only Kong on loopback). */
  function isLocalSupabaseUrl(url) {
    var s = String(url || "").toLowerCase();
    if (!s) return false;
    if (s.indexOf("127.0.0.1:54321") !== -1) return true;
    if (s.indexOf("localhost:54321") !== -1) return true;
    if (s.indexOf("0.0.0.0:54321") !== -1) return true;
    return false;
  }

  /**
   * Absolute URL for a sibling page under the same directory as the current document
   * (GitHub Pages project root, static server subfolder, or site root).
   */
  function pageHref(fileName) {
    var loc = global.location;
    var path = loc.pathname || "/";
    if (/\.html$/i.test(path)) path = path.replace(/[^/]+$/i, "");
    if (!path || path.charAt(path.length - 1) !== "/") path += "/";
    var origin = loc.origin || loc.protocol + "//" + loc.host;
    var base = origin + path;
    try {
      return new URL(String(fileName || "index.html"), base).href;
    } catch (_e) {
      return origin + "/" + String(fileName || "index.html");
    }
  }

  /**
   * If the user opens production (or any non-loopback host) but still has local
   * Supabase credentials in localStorage from dev, drop them so bootstrap fetches
   * the real /config (or fails loudly) instead of talking to 127.0.0.1:54321.
   */
  function clearStaleSupabaseLocalCache() {
    if (isDevHostname()) return;
    try {
      var u = localStorage.getItem("SUPABASE_URL");
      if (u && isLocalSupabaseUrl(u)) {
        localStorage.removeItem("SUPABASE_URL");
        localStorage.removeItem("SUPABASE_ANON_KEY");
      }
    } catch (_e) {}
  }

  /**
   * Canonical post-OAuth landing URL for a page. Always deployment-aware:
   * returns `<origin><base>hub.html` for prod (github.io project site), dev
   * localhost, or any static server in a subfolder.
   *
   * If Supabase's project `site_url` / `additional_redirect_urls` is still
   * pinned to localhost, Supabase will IGNORE whatever redirectTo we pass and
   * fall back to site_url. That cannot be fixed from the client — see
   * docs/poc/service-setup-checklist.md §2.6 "Production OAuth URL config".
   */
  function postAuthRedirectUrl(fileName) {
    return pageHref(fileName || "hub.html");
  }

  global.LevelupPath = {
    isDevHostname: isDevHostname,
    isLocalSupabaseUrl: isLocalSupabaseUrl,
    pageHref: pageHref,
    postAuthRedirectUrl: postAuthRedirectUrl,
    clearStaleSupabaseLocalCache: clearStaleSupabaseLocalCache,
  };
})(window);
