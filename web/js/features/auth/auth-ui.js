(function (global) {
  var STYLE_ID = "levelup-auth-overlay-style";

  var GOOGLE_G_SVG =
    "<svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true' focusable='false' style='flex:0 0 20px'>" +
    "<path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>" +
    "<path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>" +
    "<path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'/>" +
    "<path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>" +
    "</svg>";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = document.createElement("style");
    css.id = STYLE_ID;
    css.textContent =
      "#levelup-auth-overlay{position:fixed;inset:0;z-index:99999;background:rgba(5,7,22,.82);" +
      "display:flex;align-items:center;justify-content:center;padding:16px;" +
      "font-family:Outfit,system-ui,sans-serif;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}" +
      "#levelup-auth-overlay .lu-panel{width:min(420px,100%);background:linear-gradient(160deg,#141829 0%,#0b0e1c 100%);" +
      "border:1px solid #272f40;border-radius:18px;padding:28px 26px 22px;color:#e8ecf4;" +
      "box-shadow:0 24px 48px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05);position:relative;overflow:hidden}" +
      "#levelup-auth-overlay .lu-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;" +
      "background:linear-gradient(90deg,#5eead4,#a78bfa,transparent)}" +
      "#levelup-auth-overlay .lu-brand{display:flex;align-items:center;gap:8px;margin-bottom:14px;color:#5eead4;" +
      "font-weight:800;font-size:1rem;letter-spacing:-.3px}" +
      "#levelup-auth-overlay .lu-brand svg{color:#5eead4}" +
      "#levelup-auth-overlay h2{margin:0 0 6px;font-size:1.35rem;font-weight:700;color:#f8fafc;letter-spacing:-.2px}" +
      "#levelup-auth-overlay p.lu-lead{margin:0 0 22px;font-size:.92rem;color:#94a3b8;line-height:1.5}" +
      "#levelup-auth-overlay .lu-google-btn{width:100%;display:inline-flex;align-items:center;justify-content:center;" +
      "gap:12px;padding:12px 16px;background:#fff;color:#1f2328;border:1px solid #d6dae0;border-radius:12px;" +
      "font:inherit;font-size:.95rem;font-weight:600;cursor:pointer;transition:background .15s,box-shadow .15s,transform .1s;" +
      "box-shadow:0 1px 2px rgba(0,0,0,.08)}" +
      "#levelup-auth-overlay .lu-google-btn:hover{background:#f8fafc;box-shadow:0 4px 12px rgba(0,0,0,.18)}" +
      "#levelup-auth-overlay .lu-google-btn:active{transform:translateY(1px)}" +
      "#levelup-auth-overlay .lu-google-btn[disabled]{opacity:.55;cursor:progress}" +
      "#levelup-auth-overlay .lu-fine{margin:14px 0 0;font-size:.76rem;color:#6b7594;text-align:center;line-height:1.55}" +
      "#levelup-auth-overlay .lu-fine a{color:#8b95a8;text-decoration:underline}" +
      "#levelup-auth-overlay .lu-actions{display:flex;justify-content:center;margin-top:16px}" +
      "#levelup-auth-overlay .lu-cancel{background:transparent;border:none;color:#6b7594;font:inherit;font-size:.82rem;" +
      "cursor:pointer;padding:6px 10px;border-radius:8px}" +
      "#levelup-auth-overlay .lu-cancel:hover{color:#e8ecf4;background:rgba(255,255,255,.04)}" +
      "#levelup-auth-overlay .lu-err{margin:0 0 12px;padding:10px 12px;background:rgba(239,68,68,.08);" +
      "border:1px solid rgba(239,68,68,.3);border-radius:10px;color:#fca5a5;font-size:.84rem;line-height:1.4}";
    document.head.appendChild(css);
  }

  function closeOverlay(root) {
    if (root && root.parentNode) root.parentNode.removeChild(root);
    document.removeEventListener("keydown", onEscKey, true);
  }

  var activeResolver = null;
  function onEscKey(e) {
    if (e.key === "Escape" && activeResolver) {
      activeResolver({ action: "cancel" });
    }
  }

  function openAuthModal(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      injectStyles();
      var overlay = document.createElement("div");
      overlay.id = "levelup-auth-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-labelledby", "lu-auth-heading");
      overlay.innerHTML =
        "<div class='lu-panel'>" +
        "<div class='lu-brand'>" +
        "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'>" +
        "<path d='m12 19-7-7 7-7'/><path d='m19 19-7-7 7-7'/></svg>" +
        "LevelUp!" +
        "</div>" +
        "<h2 id='lu-auth-heading'>Sign in to continue</h2>" +
        "<p class='lu-lead'>New here? Signing in with Google automatically creates your account — no separate signup needed.</p>" +
        "<div id='lu-auth-err' class='lu-err' hidden></div>" +
        "<button type='button' id='lu-auth-google' class='lu-google-btn'>" +
        GOOGLE_G_SVG +
        "<span id='lu-auth-google-label'>Continue with Google</span>" +
        "</button>" +
        "<p class='lu-fine'>By continuing you agree to the Terms of Service and Privacy Policy.</p>" +
        "<div class='lu-actions'><button type='button' class='lu-cancel' id='lu-auth-cancel'>Cancel</button></div>" +
        "</div>";

      function done(result) {
        activeResolver = null;
        closeOverlay(overlay);
        resolve(result || { action: "cancel" });
      }

      function setErr(msg) {
        var err = overlay.querySelector("#lu-auth-err");
        err.textContent = msg || "";
        err.hidden = !msg;
      }

      activeResolver = done;
      document.addEventListener("keydown", onEscKey, true);

      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) done({ action: "cancel" });
      });

      overlay.querySelector("#lu-auth-cancel").onclick = function () {
        done({ action: "cancel" });
      };

      overlay.querySelector("#lu-auth-google").onclick = async function () {
        var btn = overlay.querySelector("#lu-auth-google");
        var lbl = overlay.querySelector("#lu-auth-google-label");
        btn.disabled = true;
        if (lbl) lbl.textContent = "Redirecting to Google…";
        setErr("");
        try {
          await global.LevelupAuth.signInWithGoogle(opts.redirectTo || global.location.href);
          done({ action: "oauth" });
        } catch (e) {
          btn.disabled = false;
          if (lbl) lbl.textContent = "Continue with Google";
          setErr((e && e.message) || "Google sign-in failed. Please try again.");
        }
      };

      document.body.appendChild(overlay);
    });
  }

  global.LevelupAuthUI = {
    openAuthModal: openAuthModal,
  };
})(window);
