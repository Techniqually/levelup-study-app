(function () {
  var params = new URLSearchParams(window.location.search);
  var KNOWN_SUBJECTS = ["chemistry", "physics", "geography"];
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";
  var STUDENT_ID_KEY = "LEVELUP_STUDENT_ID";
  var STUDENT_NAME_KEY = "LEVELUP_STUDENT_NAME";

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
  window.SUBJECT_PREVIEW_MODE = params.get("preview") === "1";

  window.__LEVELUP_SUBJECT_SETUP = Promise.resolve()
    .then(function () {
      if (!window.LevelupAuth || typeof window.LevelupAuth.getValidatedUser !== "function") {
        throw new Error("auth_client_missing");
      }
      // Server-validate the session so stale/ghost tokens redirect to landing
      return window.LevelupAuth.getValidatedUser();
    })
    .then(function (user) {
      if (!user) {
        window.location.replace("index.html");
        throw new Error("redirected_needs_auth");
      }

      window.LEVELUP_STUDENT_ID = user.id;
      var meta = user.user_metadata || {};
      var displayName =
        String(meta.full_name || meta.name || "").trim() ||
        String(user.email || "").split("@")[0] ||
        "Student";
      window.LEVELUP_STUDENT_NAME = displayName;
      try { localStorage.setItem(STUDENT_ID_KEY, user.id); } catch (_e0) {}
      try { localStorage.setItem(STUDENT_NAME_KEY, displayName); } catch (_e1) {}
      if (window.LevelupShell && typeof window.LevelupShell.setProfile === "function") {
        window.LevelupShell.setProfile(
          displayName,
          String(user.email || ""),
          String(meta.avatar_url || meta.picture || "")
        );
      }

      return window.LevelupAuth.isSubjectEntitled(subjectId).then(function (ok) {
        // Reconcile preview flag with actual entitlement — in place, no navigation.
        // Doing a full redirect here was causing loops when browsers cached a 301
        // from an earlier `serve` config that stripped query strings.
        try {
          var url = new URL(window.location.href);
          if (!ok) {
            window.SUBJECT_PREVIEW_MODE = true;
            url.searchParams.set("preview", "1");
          } else {
            window.SUBJECT_PREVIEW_MODE = false;
            url.searchParams.delete("preview");
          }
          url.searchParams.set("subject", subjectId);
          if (window.history && window.history.replaceState) {
            window.history.replaceState({}, document.title, url.toString());
          }
        } catch (_) {
          // fallback: just flip the flag
          window.SUBJECT_PREVIEW_MODE = !ok;
        }
      });
    });
})();
