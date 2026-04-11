(function () {
  var SUPABASE_SKIP_KEY = "SUPABASE_SETUP_SKIPPED_V1";
  var STUDENT_ID_KEY = "LEVELUP_STUDENT_ID";
  var STUDENT_NAME_KEY = "LEVELUP_STUDENT_NAME";
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";

  function setupSupabaseKeysPrompt(force) {
    return new Promise(function (resolve) {
      var existingUrl = localStorage.getItem("SUPABASE_URL") || "";
      var existingAnon = localStorage.getItem("SUPABASE_ANON_KEY") || "";
      if (!force && existingUrl && existingAnon) {
        resolve(true);
        return;
      }
      var shouldAsk =
        force ||
        window.location.search.includes("setupSupabase=1") ||
        localStorage.getItem(SUPABASE_SKIP_KEY) !== "1";
      if (!shouldAsk) {
        resolve(false);
        return;
      }
      if (!window.LevelupSetupForms) {
        console.warn("LevelupSetupForms not loaded");
        resolve(false);
        return;
      }
      window.LevelupSetupForms
        .openSupabaseSetup({
          force: !!force,
          existingUrl: existingUrl,
          existingAnon: existingAnon,
        })
        .then(function (r) {
          if (r.action === "skip" && !force) {
            localStorage.setItem(SUPABASE_SKIP_KEY, "1");
          }
          if (r.action === "save") {
            resolve(true);
            return;
          }
          var u = (localStorage.getItem("SUPABASE_URL") || "").trim();
          var k = (localStorage.getItem("SUPABASE_ANON_KEY") || "").trim();
          resolve(!!(u && k));
        });
    });
  }

  function setupStudentProfilePrompt(force) {
    return new Promise(function (resolve) {
      var existingId = (localStorage.getItem(STUDENT_ID_KEY) || "").trim();
      var existingName = (localStorage.getItem(STUDENT_NAME_KEY) || "").trim();
      if (!force && existingId && existingName) {
        resolve(true);
        return;
      }
      var shouldAsk = force || window.location.search.includes("setupStudent=1");
      if (!shouldAsk && (existingId || existingName)) {
        resolve(false);
        return;
      }
      if (!window.LevelupSetupForms) {
        resolve(false);
        return;
      }
      window.LevelupSetupForms.openStudentSetup({ existingId: existingId, existingName: existingName }).then(
        function (r) {
          if (r.action === "save" && r.studentId && r.name) {
            localStorage.setItem(STUDENT_ID_KEY, r.studentId);
            localStorage.setItem(STUDENT_NAME_KEY, r.name);
            resolve(true);
            return;
          }
          var ok =
            !!(localStorage.getItem(STUDENT_ID_KEY) || "").trim() &&
            !!(localStorage.getItem(STUDENT_NAME_KEY) || "").trim();
          resolve(ok);
        }
      );
    });
  }

  function refreshBanner() {
    var hasSupabase = !!(
      (localStorage.getItem("SUPABASE_URL") || "").trim() &&
      (localStorage.getItem("SUPABASE_ANON_KEY") || "").trim()
    );
    var hasStudent = !!(
      (localStorage.getItem(STUDENT_ID_KEY) || "").trim() &&
      (localStorage.getItem(STUDENT_NAME_KEY) || "").trim()
    );
    var idEl = document.getElementById("hub-identity");
    if (idEl) {
      var nm = (localStorage.getItem(STUDENT_NAME_KEY) || "").trim();
      var sid = (localStorage.getItem(STUDENT_ID_KEY) || "").trim();
      if (nm || sid) {
        idEl.textContent = "Signed in as " + (nm || "Student") + (sid ? " · " + sid : "");
        idEl.hidden = false;
      } else {
        idEl.textContent = "";
        idEl.hidden = true;
      }
    }
    var banner = document.getElementById("setup-banner");
    var msg = document.getElementById("setup-msg");
    if (!banner || !msg) return;
    if (hasSupabase && hasStudent) {
      banner.classList.remove("show");
      return;
    }
    var missing = [];
    if (!hasSupabase) missing.push("Supabase");
    if (!hasStudent) missing.push("student profile");
    msg.textContent = "Before picking subjects, finish setup: " + missing.join(" + ") + ".";
    banner.classList.add("show");
  }

  window.configureSupabaseKeys = function () {
    setupSupabaseKeysPrompt(true).then(function () {
      refreshBanner();
    });
  };
  window.configureStudentProfile = function () {
    setupStudentProfilePrompt(true).then(function () {
      refreshBanner();
    });
  };

  document.getElementById("btn-setup-supabase").onclick = window.configureSupabaseKeys;
  document.getElementById("btn-setup-student").onclick = window.configureStudentProfile;

  document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
    card.addEventListener("click", function () {
      var subject = card.getAttribute("data-subject");
      if (subject) localStorage.setItem(LAST_SUBJECT_KEY, subject);
    });
  });

  setupSupabaseKeysPrompt(false).then(function (hasSupabaseNow) {
    return setupStudentProfilePrompt(false).then(function (hasStudentNow) {
      if (hasSupabaseNow && !hasStudentNow) {
        return setupStudentProfilePrompt(true);
      }
    });
  }).then(refreshBanner);
})();
