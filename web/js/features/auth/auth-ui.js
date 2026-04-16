(function (global) {
  var STYLE_ID = "levelup-auth-overlay-style";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = document.createElement("style");
    css.id = STYLE_ID;
    css.textContent =
      "#levelup-auth-overlay{position:fixed;inset:0;z-index:99999;background:rgba(5,7,22,.88);" +
      "display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,sans-serif}" +
      "#levelup-auth-overlay .lu-panel{width:min(420px,100%);background:#141820;border:1px solid #2a3344;" +
      "border-radius:14px;padding:20px 20px 16px;color:#e8ecf4;box-shadow:0 24px 48px rgba(0,0,0,.45)}" +
      "#levelup-auth-overlay h2{margin:0 0 8px;font-size:1.15rem;font-weight:700;color:#5eead4}" +
      "#levelup-auth-overlay p.lu-lead{margin:0 0 16px;font-size:.88rem;color:#8b95a8;line-height:1.45}" +
      "#levelup-auth-overlay label{display:block;font-size:.78rem;color:#8b95a8;margin-bottom:4px}" +
      "#levelup-auth-overlay input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;" +
      "border:1px solid #2a3344;background:#0c0e12;color:#e8ecf4;font-size:.9rem;margin-bottom:12px}" +
      "#levelup-auth-overlay .lu-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:8px}" +
      "#levelup-auth-overlay button{font:inherit;cursor:pointer;border-radius:10px;padding:9px 14px;border:1px solid #2a3344;" +
      "background:#1c222d;color:#e8ecf4}" +
      "#levelup-auth-overlay button.lu-primary{border-color:#5eead4;color:#5eead4;background:#0f172a}" +
      "#levelup-auth-overlay .lu-err{color:#f87171;font-size:.82rem;margin:-4px 0 8px}";
    document.head.appendChild(css);
  }

  function closeOverlay(root) {
    if (root && root.parentNode) root.parentNode.removeChild(root);
  }

  function openAuthModal(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      injectStyles();
      var overlay = document.createElement("div");
      overlay.id = "levelup-auth-overlay";
      overlay.innerHTML =
        "<div class='lu-panel'>" +
        "<h2>Welcome to LevelUp!</h2>" +
        "<p class='lu-lead'>Sign in with your Google account to access your subjects and track your progress.</p>" +
        "<div id='lu-auth-err' class='lu-err' hidden></div>" +
        "<div class='lu-actions'>" +
        "<button type='button' id='lu-auth-cancel'>Cancel</button>" +
        "<button type='button' id='lu-auth-google' class='lu-primary'>Continue with Google</button>" +
        "</div></div>";

      function done(result) {
        closeOverlay(overlay);
        resolve(result || { action: "cancel" });
      }

      function setErr(msg) {
        var err = overlay.querySelector("#lu-auth-err");
        err.textContent = msg || "";
        err.hidden = !msg;
      }

      overlay.querySelector("#lu-auth-cancel").onclick = function () {
        done({ action: "cancel" });
      };

      overlay.querySelector("#lu-auth-google").onclick = async function () {
        try {
          await global.LevelupAuth.signInWithGoogle(opts.redirectTo || global.location.href);
          done({ action: "oauth" });
        } catch (e) {
          setErr((e && e.message) || "Google sign in failed.");
        }
      };

      document.body.appendChild(overlay);
    });
  }

  global.LevelupAuthUI = {
    openAuthModal: openAuthModal,
  };
})(window);
