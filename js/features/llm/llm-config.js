/**
 * LLM proxy config in localStorage (LEVELUP_LLM_CONFIG_JSON).
 * See docs/llm-integration-plan.md — browser holds only proxyBaseUrl + appToken.
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
    var tok = String(c.appToken || "").trim();
    return !!url && !!tok;
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
      appToken: String(c.appToken || "").trim(),
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
      appToken: String(o.appToken || "").trim(),
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
  };
})(window);
