/**
 * Bootstrap: fetch Supabase config from API, save to localStorage, then
 * dispatch 'levelup:config-ready' so downstream scripts can initialize.
 *
 * API_BASE_URL is the ONLY thing hardcoded (via api-config.js).
 */
(function () {
  var API_BASE = window.LEVELUP_API_BASE || "http://localhost:8080";

  function initFromConfig(cfg) {
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      document.dispatchEvent(new CustomEvent('levelup:config-error', {
        detail: { message: 'Config endpoint returned invalid data' }
      }));
      return;
    }
    localStorage.setItem("SUPABASE_URL",      cfg.supabaseUrl);
    localStorage.setItem("SUPABASE_ANON_KEY", cfg.supabaseAnonKey);
    window.SUPABASE_URL      = cfg.supabaseUrl;
    window.SUPABASE_ANON_KEY = cfg.supabaseAnonKey;
    document.dispatchEvent(new CustomEvent('levelup:config-ready'));
  }

  var cached = localStorage.getItem("SUPABASE_URL");
  if (cached) {
    // Already have config — use immediately, refresh in background
    window.SUPABASE_URL      = cached;
    window.SUPABASE_ANON_KEY = localStorage.getItem("SUPABASE_ANON_KEY") || "";
    document.dispatchEvent(new CustomEvent('levelup:config-ready'));
    // Background refresh (picks up URL changes on redeploy)
    fetch(API_BASE + "/config")
      .then(function(r){ return r.json(); })
      .then(function(cfg) {
        localStorage.setItem("SUPABASE_URL",      cfg.supabaseUrl);
        localStorage.setItem("SUPABASE_ANON_KEY", cfg.supabaseAnonKey);
      })
      .catch(function(){});
    return;
  }

  // First visit — must fetch before proceeding
  fetch(API_BASE + "/config")
    .then(function(r) { return r.json(); })
    .then(initFromConfig)
    .catch(function(e) {
      document.dispatchEvent(new CustomEvent('levelup:config-error', {
        detail: { message: String(e) }
      }));
    });
})();
