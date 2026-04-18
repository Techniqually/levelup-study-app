/**
 * Settings modal for LLM proxy URL (LEVELUP_LLM_CONFIG_JSON).
 */
(function (global) {
  var STYLE_ID = "levelup-llm-setup-style";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = document.createElement("style");
    css.id = STYLE_ID;
    css.textContent =
      "#levelup-llm-overlay{position:fixed;inset:0;z-index:99999;background:rgba(5,7,22,.88);" +
      "display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,sans-serif}" +
      "#levelup-llm-overlay .lu-panel{width:min(440px,100%);background:#141820;border:1px solid #2a3344;" +
      "border-radius:14px;padding:20px 20px 16px;color:#e8ecf4;box-shadow:0 24px 48px rgba(0,0,0,.45)}" +
      "#levelup-llm-overlay h2{margin:0 0 8px;font-size:1.15rem;font-weight:700;color:#5eead4}" +
      "#levelup-llm-overlay p.lu-lead{margin:0 0 16px;font-size:.88rem;color:#8b95a8;line-height:1.45}" +
      "#levelup-llm-overlay label{display:block;font-size:.78rem;color:#8b95a8;margin-bottom:4px}" +
      "#levelup-llm-overlay input[type=text],#levelup-llm-overlay input[type=url],#levelup-llm-overlay input[type=password]{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;" +
      "border:1px solid #2a3344;background:#0c0e12;color:#e8ecf4;font-size:.9rem;margin-bottom:12px}" +
      "#levelup-llm-overlay input:focus{outline:2px solid rgba(94,234,212,.35);border-color:#5eead4}" +
      "#levelup-llm-overlay .lu-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}" +
      "#levelup-llm-overlay .lu-row input{width:auto;margin:0}" +
      "#levelup-llm-overlay .lu-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:8px}" +
      "#levelup-llm-overlay button{font:inherit;cursor:pointer;border-radius:10px;padding:9px 14px;border:1px solid #2a3344;" +
      "background:#1c222d;color:#e8ecf4}" +
      "#levelup-llm-overlay button.lu-primary{border-color:#5eead4;color:#5eead4;background:#0f172a}" +
      "#levelup-llm-overlay button.lu-ghost{background:transparent;color:#8b95a8}" +
      "#levelup-llm-overlay .lu-err{color:#f87171;font-size:.82rem;margin:-4px 0 8px}";
    document.head.appendChild(css);
  }

  function closeOverlay(root) {
    if (root && root.parentNode) root.parentNode.removeChild(root);
  }

  /**
   * @returns {Promise<{ action: 'save'|'cancel' }>}
   */
  function openLlmProxySetup() {
    return new Promise(function (resolve) {
      injectStyles();
      var existing = global.LevelupLlmConfig && global.LevelupLlmConfig.get();
      var dc = global.LevelupLlmConfig.defaultConfig(existing || {});

      var overlay = document.createElement("div");
      overlay.id = "levelup-llm-overlay";

      function done(action) {
        closeOverlay(overlay);
        resolve({ action: action });
      }

      var url0 = String(dc.proxyBaseUrl || "").replace(/"/g, "&quot;");
      var en = dc.enabled !== false ? " checked" : "";
      var qz = !(dc.features && dc.features.quizExplain === false) ? " checked" : "";

      overlay.innerHTML =
        "<div class='lu-panel'>" +
        "<h2>LLM proxy (optional)</h2>" +
        "<p class='lu-lead'>Your OpenAI (or compatible) API key stays on the server only. " +
        "Paste the proxy base URL. Bearer auth uses your Supabase session automatically.</p>" +
        "<form class='lu-form'>" +
        "<div class='lu-row'><input type='checkbox' id='lu-llm-en' name='enabled'" +
        en +
        " /><label for='lu-llm-en' style='margin:0'>Enable LLM features</label></div>" +
        "<div class='lu-row'><input type='checkbox' id='lu-llm-quiz' name='quiz'" +
        qz +
        " /><label for='lu-llm-quiz' style='margin:0'>Quiz “Why?” (AI explanations)</label></div>" +
        "<label for='lu-llm-url'>Proxy base URL</label>" +
        "<input id='lu-llm-url' name='url' type='url' autocomplete='off' placeholder='http://127.0.0.1:8080' value='" +
        url0 +
        "' />" +
        "<div class='lu-err' id='lu-llm-err' hidden></div>" +
        "<div class='lu-actions'>" +
        "<button type='button' class='lu-ghost' data-act='cancel'>Cancel</button>" +
        "<button type='submit' class='lu-primary'>Save</button>" +
        "</div></form></div>";

      overlay.querySelector("[data-act='cancel']").onclick = function () {
        done("cancel");
      };
      overlay.querySelector("form").onsubmit = function (e) {
        e.preventDefault();
        var errEl = overlay.querySelector("#lu-llm-err");
        var enabled = overlay.querySelector("#lu-llm-en").checked;
        var quizEx = overlay.querySelector("#lu-llm-quiz").checked;
        var url = (overlay.querySelector("#lu-llm-url").value || "").trim();
        if (enabled) {
          if (!url || url.indexOf("http") !== 0) {
            errEl.textContent = "Proxy URL must start with http:// or https://";
            errEl.hidden = false;
            return;
          }
        }
        var next = global.LevelupLlmConfig.defaultConfig({
          enabled: enabled,
          proxyBaseUrl: url,
          features: { quizExplain: quizEx },
          cache: (existing && existing.cache) || {},
        });
        global.LevelupLlmConfig.save(next);
        if (global.LevelupLlmKeepalive && typeof global.LevelupLlmKeepalive.start === "function") {
          global.LevelupLlmKeepalive.start();
        }
        if (global.LevelupLlmKeepalive && typeof global.LevelupLlmKeepalive.poke === "function") {
          global.LevelupLlmKeepalive.poke("settings_save", true);
        }
        done("save");
      };

      document.body.appendChild(overlay);
    });
  }

  global.LevelupLlmSetupForms = {
    openLlmProxySetup: openLlmProxySetup,
  };
})(window);
