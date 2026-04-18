/**
 * Bootstrap: fetch Supabase config from API, save to localStorage, then
 * dispatch 'levelup:config-ready' so downstream scripts can initialize.
 *
 * API_BASE_URL is the ONLY thing hardcoded (via api-config.js).
 */
(function () {
  var FALLBACK_API_BASE = "http://localhost:8081";

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

  function runBootstrap(apiBase) {
    var cached = localStorage.getItem("SUPABASE_URL");
    if (cached) {
      // Already have config — use immediately, refresh in background
      window.SUPABASE_URL      = cached;
      window.SUPABASE_ANON_KEY = localStorage.getItem("SUPABASE_ANON_KEY") || "";
      document.dispatchEvent(new CustomEvent('levelup:config-ready'));
      // Background refresh (picks up URL changes on redeploy)
      fetch(apiBase + "/config")
        .then(function(r){ return r.json(); })
        .then(function(cfg) {
          localStorage.setItem("SUPABASE_URL",      cfg.supabaseUrl);
          localStorage.setItem("SUPABASE_ANON_KEY", cfg.supabaseAnonKey);
        })
        .catch(function(){});
      return;
    }

    // First visit — must fetch before proceeding
    // TIP for local dev without the API: open the browser console and run:
    //   localStorage.setItem('SUPABASE_URL', 'http://localhost:54321');
    //   localStorage.setItem('SUPABASE_ANON_KEY', '<your-local-anon-key>');
    // then reload. The API is only needed to bootstrap the config on first visit.
    fetch(apiBase + "/config")
      .then(function(r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(initFromConfig)
      .catch(function(e) {
        console.warn(
          "[LevelUp] Could not load Supabase config from API (" + apiBase + "/config): " + e +
          "\nFor local dev, set SUPABASE_URL and SUPABASE_ANON_KEY in localStorage to bypass the API."
        );
        document.dispatchEvent(new CustomEvent('levelup:config-error', {
          detail: { message: String(e) }
        }));
      });
  }

  if (window.LEVELUP_API_BASE) {
    runBootstrap(window.LEVELUP_API_BASE);
    return;
  }

  document.addEventListener("levelup:api-config-ready", function() {
    runBootstrap(window.LEVELUP_API_BASE || FALLBACK_API_BASE);
  }, { once: true });
})();
