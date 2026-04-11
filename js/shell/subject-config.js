(function () {
  var params = new URLSearchParams(window.location.search);
  var KNOWN_SUBJECTS = ["chemistry", "physics", "geography"];
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";
  var STUDENT_ID_KEY = "LEVELUP_STUDENT_ID";
  var STUDENT_NAME_KEY = "LEVELUP_STUDENT_NAME";
  var SUPABASE_SKIP_KEY = "SUPABASE_SETUP_SKIPPED_V1";

  function normalizeSubject(value) {
    var n = (value || "").trim().toLowerCase();
    return KNOWN_SUBJECTS.indexOf(n) !== -1 ? n : "";
  }

  function detectSubjectFromPathname() {
    var parts = window.location.pathname
      .split("/")
      .filter(Boolean)
      .map(function (p) {
        return p.toLowerCase();
      });
    for (var i = parts.length - 1; i >= 0; i -= 1) {
      var found = normalizeSubject(parts[i]);
      if (found) return found;
    }
    return "";
  }

  var fromQuery = normalizeSubject(params.get("subject"));
  var fromHash = normalizeSubject(window.location.hash.replace(/^#/, ""));
  var fromPath = detectSubjectFromPathname();
  var fromStorage = normalizeSubject(localStorage.getItem(LAST_SUBJECT_KEY));
  var subjectId = fromQuery || fromHash || fromPath || fromStorage || "chemistry";
  localStorage.setItem(LAST_SUBJECT_KEY, subjectId);

  var titles = {
    chemistry: "O-Level Chemistry",
    physics: "O-Level Physics",
    geography: "O-Level Geography",
  };
  window.SUBJECT_ID = subjectId;
  window.SUBJECT_TITLE = titles[subjectId] || subjectId;
  window.APP_VERSION = window.APP_VERSION || "dev";
  window.SUPABASE_PROJECT_CODE = window.SUPABASE_PROJECT_CODE || "study-app";

  function applyWindowFromStorage() {
    window.LEVELUP_STUDENT_ID =
      window.LEVELUP_STUDENT_ID || localStorage.getItem(STUDENT_ID_KEY) || "";
    window.LEVELUP_STUDENT_NAME =
      window.LEVELUP_STUDENT_NAME || localStorage.getItem(STUDENT_NAME_KEY) || "";
    window.SUPABASE_URL = window.SUPABASE_URL || localStorage.getItem("SUPABASE_URL") || "";
    window.SUPABASE_ANON_KEY =
      window.SUPABASE_ANON_KEY || localStorage.getItem("SUPABASE_ANON_KEY") || "";
  }

  function setupSupabaseKeysPrompt(force) {
    return new Promise(function (resolve) {
      var existingUrl = localStorage.getItem("SUPABASE_URL") || "";
      var existingAnon = localStorage.getItem("SUPABASE_ANON_KEY") || "";
      if (!force && existingUrl && existingAnon) {
        resolve({ saved: false });
        return;
      }
      var shouldAsk =
        force ||
        window.location.search.includes("setupSupabase=1") ||
        localStorage.getItem(SUPABASE_SKIP_KEY) !== "1";
      if (!shouldAsk) {
        resolve({ saved: false });
        return;
      }
      if (!window.LevelupSetupForms) {
        console.warn("LevelupSetupForms not loaded (add setup-forms.js before subject-config.js)");
        resolve({ saved: false });
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
          resolve({ saved: r.action === "save" });
        });
    });
  }

  function setupStudentProfilePrompt(force) {
    return new Promise(function (resolve) {
      var existingId = (localStorage.getItem(STUDENT_ID_KEY) || "").trim();
      var existingName = (localStorage.getItem(STUDENT_NAME_KEY) || "").trim();
      if (!force && existingId && existingName) {
        resolve();
        return;
      }
      var shouldAsk = force || window.location.search.includes("setupStudent=1");
      if (!shouldAsk && (existingId || existingName)) {
        resolve();
        return;
      }
      if (!window.LevelupSetupForms) {
        console.warn("LevelupSetupForms not loaded");
        resolve();
        return;
      }
      window.LevelupSetupForms.openStudentSetup({ existingId: existingId, existingName: existingName }).then(
        function (r) {
          if (r.action === "save" && r.studentId && r.name) {
            localStorage.setItem(STUDENT_ID_KEY, r.studentId);
            localStorage.setItem(STUDENT_NAME_KEY, r.name);
          }
          resolve();
        }
      );
    });
  }

  window.configureSupabaseKeys = function () {
    setupSupabaseKeysPrompt(true).then(function (r) {
      if (r.saved) {
        window.alert("Supabase config saved. Reloading…");
        window.location.reload();
        return;
      }
      applyWindowFromStorage();
    });
  };
  window.configureStudentProfile = function () {
    setupStudentProfilePrompt(true).then(function () {
      applyWindowFromStorage();
    });
  };

  window.__LEVELUP_SUBJECT_SETUP = setupSupabaseKeysPrompt(false)
    .then(function (r) {
      if (r.saved) {
        window.alert("Supabase config saved. Reloading…");
        window.location.reload();
        return new Promise(function () {});
      }
      return setupStudentProfilePrompt(false);
    })
    .then(function () {
      applyWindowFromStorage();
    })
    .catch(function () {
      applyWindowFromStorage();
    });
})();
