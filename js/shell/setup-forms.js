/**
 * First-run / settings UI for Supabase URL+anon key and student id+name.
 * Used by subject-config.js and hub-setup.js. No dependencies.
 */
(function (global) {
  var STYLE_ID = "levelup-setup-forms-style";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = document.createElement("style");
    css.id = STYLE_ID;
    css.textContent =
      "#levelup-setup-overlay{position:fixed;inset:0;z-index:99999;background:rgba(5,7,22,.88);" +
      "display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,sans-serif}" +
      "#levelup-setup-overlay .lu-panel{width:min(420px,100%);background:#141820;border:1px solid #2a3344;" +
      "border-radius:14px;padding:20px 20px 16px;color:#e8ecf4;box-shadow:0 24px 48px rgba(0,0,0,.45)}" +
      "#levelup-setup-overlay h2{margin:0 0 8px;font-size:1.15rem;font-weight:700;color:#5eead4}" +
      "#levelup-setup-overlay p.lu-lead{margin:0 0 16px;font-size:.88rem;color:#8b95a8;line-height:1.45}" +
      "#levelup-setup-overlay label{display:block;font-size:.78rem;color:#8b95a8;margin-bottom:4px}" +
      "#levelup-setup-overlay input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;" +
      "border:1px solid #2a3344;background:#0c0e12;color:#e8ecf4;font-size:.9rem;margin-bottom:12px}" +
      "#levelup-setup-overlay input:focus{outline:2px solid rgba(94,234,212,.35);border-color:#5eead4}" +
      "#levelup-setup-overlay .lu-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:8px}" +
      "#levelup-setup-overlay button{font:inherit;cursor:pointer;border-radius:10px;padding:9px 14px;border:1px solid #2a3344;" +
      "background:#1c222d;color:#e8ecf4}" +
      "#levelup-setup-overlay button.lu-primary{border-color:#5eead4;color:#5eead4;background:#0f172a}" +
      "#levelup-setup-overlay button.lu-ghost{background:transparent;color:#8b95a8}" +
      "#levelup-setup-overlay .lu-err{color:#f87171;font-size:.82rem;margin:-4px 0 8px}";
    document.head.appendChild(css);
  }

  function closeOverlay(root) {
    if (root && root.parentNode) root.parentNode.removeChild(root);
  }

  /**
   * @param {object} opts
   * @param {boolean} [opts.force] — from Settings: skip intro, no "local only" skip
   * @param {string} [opts.existingUrl]
   * @param {string} [opts.existingAnon]
   * @returns {Promise<{ action: 'save'|'skip'|'cancel' }>}
   */
  function openSupabaseSetup(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      injectStyles();
      var overlay = document.createElement("div");
      overlay.id = "levelup-setup-overlay";

      function done(action) {
        closeOverlay(overlay);
        resolve({ action: action });
      }

      function showIntro() {
        overlay.innerHTML =
          "<div class='lu-panel'>" +
          "<h2>Connect Supabase?</h2>" +
          "<p class='lu-lead'>Optional cloud sync for XP, shop purchases, and parent reports. " +
          "You can skip and use the app fully offline on this device.</p>" +
          "<div class='lu-actions'>" +
          "<button type='button' class='lu-ghost' data-act='skip'>Use local only</button>" +
          "<button type='button' class='lu-primary' data-act='form'>Enter project details</button>" +
          "</div></div>";
        overlay.querySelector("[data-act='skip']").onclick = function () {
          done("skip");
        };
        overlay.querySelector("[data-act='form']").onclick = function () {
          showForm();
        };
      }

      function showForm() {
        var url0 = (opts.existingUrl || "").replace(/"/g, "&quot;");
        var anon0 = (opts.existingAnon || "").replace(/"/g, "&quot;");
        overlay.innerHTML =
          "<div class='lu-panel'>" +
          "<h2>Supabase project</h2>" +
          "<p class='lu-lead'>From the Supabase dashboard: Project Settings → API. Paste the project URL and the <code>anon</code> public key.</p>" +
          "<form class='lu-form'>" +
          "<label for='lu-sb-url'>Project URL</label>" +
          "<input id='lu-sb-url' name='url' type='url' autocomplete='off' placeholder='https://xxxx.supabase.co' value='" +
          url0 +
          "' />" +
          "<label for='lu-sb-anon'>Anon (public) key</label>" +
          "<input id='lu-sb-anon' name='anon' type='password' autocomplete='off' placeholder='eyJhbGciOiJIUzI1NiIsInR5cCI6…' value='" +
          anon0 +
          "' />" +
          "<div class='lu-err' id='lu-sb-err' hidden></div>" +
          "<div class='lu-actions'>" +
          (!opts.force ? "<button type='button' class='lu-ghost' data-act='back'>Back</button>" : "") +
          "<button type='button' class='lu-ghost' data-act='cancel'>Cancel</button>" +
          "<button type='submit' class='lu-primary'>Save</button>" +
          "</div></form></div>";
        var errEl = overlay.querySelector("#lu-sb-err");
        var backBtn = overlay.querySelector("[data-act='back']");
        if (backBtn) {
          backBtn.onclick = function () {
            showIntro();
          };
        }
        overlay.querySelector("[data-act='cancel']").onclick = function () {
          done("cancel");
        };
        overlay.querySelector("form").onsubmit = function (e) {
          e.preventDefault();
          var url = (overlay.querySelector("#lu-sb-url").value || "").trim();
          var anon = (overlay.querySelector("#lu-sb-anon").value || "").trim();
          if (!url || !anon) {
            errEl.textContent = "URL and anon key are required.";
            errEl.hidden = false;
            return;
          }
          if (url.indexOf("http") !== 0) {
            errEl.textContent = "URL should start with https://";
            errEl.hidden = false;
            return;
          }
          localStorage.setItem("SUPABASE_URL", url);
          localStorage.setItem("SUPABASE_ANON_KEY", anon);
          localStorage.removeItem("SUPABASE_SETUP_SKIPPED_V1");
          done("save");
        };
      }

      if (opts.force) {
        showForm();
      } else {
        showIntro();
      }

      document.body.appendChild(overlay);
    });
  }

  /**
   * @param {object} opts
   * @param {string} [opts.existingId]
   * @param {string} [opts.existingName]
   * @returns {Promise<{ action: 'save'|'cancel', studentId?: string, name?: string }>}
   */
  function openStudentSetup(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      injectStyles();
      var overlay = document.createElement("div");
      overlay.id = "levelup-setup-overlay";
      var name0 = (opts.existingName || "").replace(/"/g, "&quot;");
      var id0 = (opts.existingId || "").replace(/"/g, "&quot;");

      function done(result) {
        closeOverlay(overlay);
        resolve(result || { action: "cancel" });
      }

      overlay.innerHTML =
        "<div class='lu-panel'>" +
        "<h2>Student profile</h2>" +
        "<p class='lu-lead'>Used in parent reports and when syncing to Supabase. Pick a stable short ID (e.g. carol-1).</p>" +
        "<form>" +
        "<label for='lu-st-name'>Display name</label>" +
        "<input id='lu-st-name' name='name' autocomplete='name' placeholder='Carol' value='" +
        name0 +
        "' />" +
        "<label for='lu-st-id'>Student ID</label>" +
        "<input id='lu-st-id' name='studentId' autocomplete='username' placeholder='carol-1' value='" +
        id0 +
        "' />" +
        "<div class='lu-err' id='lu-st-err' hidden></div>" +
        "<div class='lu-actions'>" +
        "<button type='button' class='lu-ghost' data-act='cancel'>Cancel</button>" +
        "<button type='submit' class='lu-primary'>Save</button>" +
        "</div></form></div>";

      overlay.querySelector("[data-act='cancel']").onclick = function () {
        done({ action: "cancel" });
      };
      overlay.querySelector("form").onsubmit = function (e) {
        e.preventDefault();
        var errEl = overlay.querySelector("#lu-st-err");
        var name = (overlay.querySelector("#lu-st-name").value || "").trim();
        var studentId = (overlay.querySelector("#lu-st-id").value || "").trim();
        if (!name) {
          errEl.textContent = "Display name is required.";
          errEl.hidden = false;
          return;
        }
        if (!studentId) {
          var seed = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 24);
          studentId = seed || "student";
        }
        done({ action: "save", name: name, studentId: studentId });
      };

      document.body.appendChild(overlay);
      var nameInput = overlay.querySelector("#lu-st-name");
      var idInput = overlay.querySelector("#lu-st-id");
      nameInput.focus();
      nameInput.addEventListener("blur", function () {
        if (idInput.value.replace(/\s/g, "")) return;
        var n = (nameInput.value || "").trim();
        if (!n) return;
        var seed = n
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 24);
        if (seed) idInput.placeholder = seed;
      });
    });
  }

  global.LevelupSetupForms = {
    openSupabaseSetup: openSupabaseSetup,
    openStudentSetup: openStudentSetup,
  };
})(window);
