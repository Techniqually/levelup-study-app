/**
 * Load API base URL from config file (git-ignored per environment).
 * Falls back to localhost:8081 if config file is missing.
 */
(function() {
  var apiBase = "http://localhost:8081"; // fallback if config missing

  fetch("config/api.json")
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(cfg) {
      if (cfg && cfg.apiBase) apiBase = cfg.apiBase;
      window.LEVELUP_API_BASE = apiBase;
      document.dispatchEvent(new CustomEvent("levelup:api-config-ready"));
    })
    .catch(function() {
      window.LEVELUP_API_BASE = apiBase;
      document.dispatchEvent(new CustomEvent("levelup:api-config-ready"));
    });
})();
