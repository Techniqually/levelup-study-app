/**
 * LLM proxy config in localStorage (LEVELUP_LLM_CONFIG_JSON).
 * Browser holds proxyBaseUrl + feature flags. Auth token comes from Supabase session.
 */
(function (global) {
  var STORAGE_KEY = "LEVELUP_LLM_CONFIG_JSON";

  function parse(raw) {
    if (raw == null || raw === "") return null;
    try {
      var o = JSON.parse(raw);
      if (!o || typeof o !== "object") return null;
      if (o.v !== 2 && o.v !== 1) return null;
      return o;
    } catch (e) {
      return null;
    }
  }

  function normalizeProxyBaseUrl(u) {
    return String(u || "")
      .trim()
      .replace(/\/+$/, "");
  }

  function get() {
    return parse(global.localStorage.getItem(STORAGE_KEY));
  }

  function save(obj) {
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }

  function isProxyReady() {
    var c = get();
    if (!c || c.enabled === false) return false;
    var url = normalizeProxyBaseUrl(c.proxyBaseUrl);
    return !!url;
  }

  function isQuizExplainEnabled() {
    if (!isProxyReady()) return false;
    var c = get();
    if (c && c.features && c.features.quizExplain === false) return false;
    return true;
  }

  function getClientConfig() {
    var c = get();
    if (!isProxyReady() || !c) return null;
    return {
      proxyBaseUrl: normalizeProxyBaseUrl(c.proxyBaseUrl),
    };
  }

  function getContentVersion() {
    return String(global.APP_VERSION || "dev");
  }

  function defaultConfig(partial) {
    var o = partial && typeof partial === "object" ? partial : {};
    return {
      v: 2,
      enabled: o.enabled !== false,
      mode: o.mode || "fastapi",
      proxyBaseUrl: normalizeProxyBaseUrl(o.proxyBaseUrl),
      features: {
        quizExplain: !(o.features && o.features.quizExplain === false),
      },
      cache: {
        maxEntries:
          (o.cache && typeof o.cache.maxEntries === "number" && o.cache.maxEntries > 0
            ? o.cache.maxEntries
            : 200),
        ttlDays:
          (o.cache && typeof o.cache.ttlDays === "number" && o.cache.ttlDays > 0
            ? o.cache.ttlDays
            : 60),
      },
    };
  }

  // ── Dev auto-config ────────────────────────────────────────────────────────
  // If we're running on localhost/127.0.0.1 and no LLM config is stored yet, try
  // probing a likely dev proxy (http://<host>:8000/health). If it responds, we
  // save a default config so the AI tutor "just works" in dev. No-op otherwise.
  function isDevHost() {
    var h = (global.location && global.location.hostname) || "";
    return h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0";
  }

  function devProxyCandidates() {
    var h = (global.location && global.location.hostname) || "localhost";
    return [
      "http://" + h + ":8000",
      "http://localhost:8000",
    ].filter(function (u, i, a) { return a.indexOf(u) === i; });
  }

  async function tryAutoConfigureForDev() {
    try {
      if (!isDevHost()) return;
      if (get()) return; // respect existing user/admin config
      var cands = devProxyCandidates();
      for (var i = 0; i < cands.length; i += 1) {
        var base = cands[i];
        try {
          var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
          var timer = global.setTimeout(function () { if (ctrl) ctrl.abort(); }, 1500);
          var res = await global.fetch(base + "/health", {
            method: "GET",
            cache: "no-store",
            signal: ctrl ? ctrl.signal : undefined,
          });
          global.clearTimeout(timer);
          if (res && res.ok) {
            save(defaultConfig({ proxyBaseUrl: base, enabled: true }));
            try {
              document.dispatchEvent(new CustomEvent("levelup:llm-config-ready", { detail: { proxyBaseUrl: base } }));
            } catch (_) {}
            return;
          }
        } catch (_) {
          // try next candidate
        }
      }
    } catch (_) {
      // swallow — best-effort dev convenience only
    }
  }

  global.LevelupLlmConfig = {
    STORAGE_KEY: STORAGE_KEY,
    get: get,
    save: save,
    defaultConfig: defaultConfig,
    normalizeProxyBaseUrl: normalizeProxyBaseUrl,
    isProxyReady: isProxyReady,
    isQuizExplainEnabled: isQuizExplainEnabled,
    getClientConfig: getClientConfig,
    getContentVersion: getContentVersion,
    tryAutoConfigureForDev: tryAutoConfigureForDev,
  };

  // Fire-and-forget dev auto-detect. If it succeeds, subsequent isQuizExplainEnabled()
  // calls will start returning true. Any UI that binds to `levelup:llm-config-ready`
  // can refresh itself when this completes.
  tryAutoConfigureForDev();
})(window);
