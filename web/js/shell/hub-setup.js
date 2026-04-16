(function () {
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";
  var state = {
    isSignedIn: false,
    chemistryEntitled: false,
    displayName: "",
    email: "",
  };

  function hasSupabaseKeys() {
    return !!(
      String(localStorage.getItem("SUPABASE_URL") || "").trim() &&
      String(localStorage.getItem("SUPABASE_ANON_KEY") || "").trim()
    );
  }

  function refreshHubIdentity() {
    var idEl = document.getElementById("hub-identity");
    if (!idEl) return;
    if (!state.isSignedIn) {
      idEl.hidden = true;
      idEl.textContent = "";
      return;
    }
    var who = state.displayName || state.email || "Authenticated user";
    var chem = state.chemistryEntitled ? "chemistry unlocked" : "chemistry locked";
    idEl.hidden = false;
    idEl.textContent = "Signed in as " + who + " · " + chem;
  }

  function refreshBanner() {
    var banner = document.getElementById("setup-banner");
    var msg = document.getElementById("setup-msg");
    var setupBtn = document.getElementById("btn-setup-package");
    var offlineBtn = document.getElementById("btn-offline-defaults");
    if (!banner || !msg || !setupBtn || !offlineBtn) return;
    offlineBtn.hidden = true;
    offlineBtn.disabled = true;
    setupBtn.classList.add("primary");

    if (!hasSupabaseKeys()) {
      msg.textContent =
        "Supabase URL and anon key are missing. Open Setup package, fill those keys, then sign in.";
      setupBtn.textContent = "Setup package";
      setupBtn.onclick = function () {
        if (!window.LevelupSetupForms || !window.LevelupSetupForms.openConfigPackageSetup) return;
        window.LevelupSetupForms.openConfigPackageSetup().then(function (r) {
          if (r && r.action === "save") window.location.reload();
        });
      };
      banner.classList.add("show");
      return;
    }

    if (!state.isSignedIn) {
      msg.textContent = "Sign in to unlock subjects and call secured API endpoints.";
      setupBtn.textContent = "Sign in";
      setupBtn.onclick = function () {
        if (!window.LevelupAuthUI || !window.LevelupAuthUI.openAuthModal) return;
        window.LevelupAuthUI.openAuthModal({ redirectTo: window.location.href });
      };
      banner.classList.add("show");
      return;
    }

    if (!state.chemistryEntitled) {
      msg.textContent =
        "Signed in, but chemistry is still locked. Complete Stripe checkout to get olevel_chem entitlement.";
      setupBtn.textContent = "Sign out";
      setupBtn.onclick = function () {
        window.LevelupAuth.signOut().then(function () {
          window.location.reload();
        });
      };
      banner.classList.add("show");
      return;
    }

    msg.textContent = "Ready. Monetized subject access is active.";
    setupBtn.textContent = "Sign out";
    setupBtn.onclick = function () {
      window.LevelupAuth.signOut().then(function () {
        window.location.reload();
      });
    };
    banner.classList.add("show");
  }

  function updateSubjectCardsAccess() {
    document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
      var sid = String(card.getAttribute("data-subject") || "").toLowerCase();
      var allowed = state.isSignedIn && (sid !== "chemistry" || state.chemistryEntitled);
      if (allowed) {
        card.classList.remove("subject-access-locked");
        card.removeAttribute("aria-disabled");
      } else {
        card.classList.add("subject-access-locked");
        card.setAttribute("aria-disabled", "true");
      }
    });
  }

  function refreshUi() {
    refreshHubIdentity();
    refreshBanner();
    updateSubjectCardsAccess();
  }

  async function syncStateFromSession() {
    if (!window.LevelupAuth || typeof window.LevelupAuth.getSession !== "function") {
      refreshUi();
      return;
    }
    var session = await window.LevelupAuth.getSession();
    state.isSignedIn = !!(session && session.user);
    if (!state.isSignedIn) {
      state.displayName = "";
      state.email = "";
      state.chemistryEntitled = false;
      refreshUi();
      return;
    }
    var user = session.user || {};
    state.displayName = String((user.user_metadata && user.user_metadata.full_name) || "").trim();
    state.email = String(user.email || "").trim();
    state.chemistryEntitled = await window.LevelupAuth.isSubjectEntitled("chemistry");
    refreshUi();
  }

  window.configureConfigPackage = function () {
    if (!window.LevelupSetupForms || typeof window.LevelupSetupForms.openConfigPackageSetup !== "function") {
      return;
    }
    window.LevelupSetupForms.openConfigPackageSetup().then(function (r) {
      if (r && r.action === "save") window.location.reload();
    });
  };
  window.configureSupabaseKeys = window.configureConfigPackage;
  window.configureStudentProfile = window.configureConfigPackage;

  document.querySelectorAll("a.card[data-subject]").forEach(function (card) {
    card.addEventListener(
      "click",
      function (e) {
        var sid = String(card.getAttribute("data-subject") || "").toLowerCase();
        var allowed = state.isSignedIn && (sid !== "chemistry" || state.chemistryEntitled);
        if (!allowed) {
          e.preventDefault();
          if (!state.isSignedIn && window.LevelupAuthUI && window.LevelupAuthUI.openAuthModal) {
            window.LevelupAuthUI.openAuthModal({ redirectTo: window.location.href });
          }
          return;
        }
        if (sid) localStorage.setItem(LAST_SUBJECT_KEY, sid);
      },
      true
    );
  });

  if (window.LevelupAuth && typeof window.LevelupAuth.onAuthStateChange === "function") {
    window.LevelupAuth.onAuthStateChange(function () {
      syncStateFromSession();
    });
  }

  syncStateFromSession();
})();
