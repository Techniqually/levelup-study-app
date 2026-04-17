/**
 * App context: per-user country + class. The POC hard-defaults to Singapore
 * O-Level. Once the profile query below returns something different, the
 * helpers below start returning the stored values. UI layers can call
 * LevelupContext.get() synchronously for the defaults, or await the async
 * loadFromProfile() variant if they need the server-authoritative value.
 *
 * Wiring plan:
 *  - remote-manifest.js (future): pass country/class when constructing
 *    storage paths once content is nested (<country>/<class>/<subject>/...).
 *  - hub UI (future): offer a country/class picker and write back via
 *    LevelupContext.setProfile({ country, class }).
 *  - entitlements: queries use (country_code, class_code, subject_slug) from
 *    subject_entitlements. The legacy user_entitlements.entitlements[] array
 *    stays in sync via a DB trigger, so hub-setup.js keeps working unchanged.
 */
(function (global) {
  var DEFAULTS = { country: "sg", class: "olevel" };
  var STORAGE_KEY = "LEVELUP_CONTEXT";

  function readCached() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return null;
      return {
        country: String(obj.country || "").toLowerCase() || DEFAULTS.country,
        class:   String(obj.class   || "").toLowerCase() || DEFAULTS["class"],
      };
    } catch (_) {
      return null;
    }
  }

  function writeCached(ctx) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        country: ctx.country, "class": ctx["class"],
      }));
    } catch (_) {}
  }

  function get() {
    var cached = readCached();
    return cached || { country: DEFAULTS.country, "class": DEFAULTS["class"] };
  }

  function setProfile(ctx) {
    var next = {
      country: String(ctx && ctx.country || DEFAULTS.country).toLowerCase(),
      "class": String(ctx && ctx["class"] || DEFAULTS["class"]).toLowerCase(),
    };
    writeCached(next);
    try {
      document.dispatchEvent(new CustomEvent("levelup:context-changed", { detail: next }));
    } catch (_) {}
    return next;
  }

  async function loadFromProfile() {
    var sb = global.LevelupAuth && typeof global.LevelupAuth.getClient === "function"
      ? global.LevelupAuth.getClient()
      : null;
    if (!sb) return get();
    try {
      var sess = await sb.auth.getSession();
      var uid = sess && sess.data && sess.data.session && sess.data.session.user
        ? sess.data.session.user.id
        : null;
      if (!uid) return get();
      var q = await sb.from("profiles").select("country_code, class_code").eq("user_id", uid).maybeSingle();
      if (q.error || !q.data) return get();
      var next = {
        country: String(q.data.country_code || DEFAULTS.country).toLowerCase(),
        "class": String(q.data.class_code   || DEFAULTS["class"]).toLowerCase(),
      };
      writeCached(next);
      return next;
    } catch (_) {
      return get();
    }
  }

  // Reserved helper: once content paths go nested, remote-manifest.js can use this.
  function storagePrefix() {
    // For now content is flat at <subject>/..., so return empty string.
    // When we move to <country>/<class>/<subject>/..., return ctx.country + "/" + ctx.class + "/".
    return "";
  }

  global.LevelupContext = {
    DEFAULTS: DEFAULTS,
    get: get,
    setProfile: setProfile,
    loadFromProfile: loadFromProfile,
    storagePrefix: storagePrefix,
  };
})(window);
