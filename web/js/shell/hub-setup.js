(function () {
  var LAST_SUBJECT_KEY = "LEVELUP_LAST_SUBJECT";
  var LANDING_PAGE = "index.html";

  var state = {
    isSignedIn: false,
    entitlements: {},
    displayName: "",
    avatarUrl: "",
    email: "",
  };

  // When the URL contains an OAuth callback payload, supabase-js needs a tick to
  // process it. Don't redirect-to-landing during this grace period.
  function hasOAuthReturnPayload() {
    var hash = String(window.location.hash || "");
    if (hash.indexOf("access_token=") !== -1 || hash.indexOf("error=") !== -1) return true;
    var qs = new URLSearchParams(window.location.search || "");
    return qs.has("code") || qs.has("error") || qs.has("error_description");
  }

  var suppressAuthRedirectUntil = hasOAuthReturnPayload() ? Date.now() + 4000 : 0;

  function redirectToLanding() {
    if (Date.now() < suppressAuthRedirectUntil) return;
    window.location.replace(LANDING_PAGE);
  }

  // ── Topbar ──────────────────────────────────────────────────────────────────

  function refreshTopbar() {
    if (window.LevelupShell && typeof window.LevelupShell.setProfile === "function") {
      if (state.isSignedIn) {
        window.LevelupShell.setProfile(state.displayName, state.email, state.avatarUrl);
      } else {
        window.LevelupShell.clearProfile();
      }
    }
    var firstNameEl = document.getElementById("hub-welcome-name");
    if (firstNameEl && state.isSignedIn) {
      var first = (state.displayName || "").split(/\s+/)[0] || "";
      firstNameEl.textContent = first ? ", " + first : "";
    }
  }

  // ── Subject card access ──────────────────────────────────────────────────────

  function updateSubjectCardsAccess() {
    document.querySelectorAll(".s-card[data-subject], a.card[data-subject]").forEach(function (card) {
      var sid     = String(card.getAttribute("data-subject") || "").toLowerCase();
      var entitled = !!state.entitlements[sid];

      if (entitled) {
        card.classList.remove("is-locked", "subject-access-locked");
        card.classList.add("is-entitled");
        card.removeAttribute("aria-disabled");
      } else {
        card.classList.add("is-locked");
        card.classList.remove("is-entitled");
      }

      var cta = card.querySelector('[data-role="primary-cta"]');
      var statusEl = card.querySelector('[data-role="primary-state"]');
      if (cta) cta.textContent = entitled ? "Open →" : "Try free topic →";
      if (statusEl) statusEl.textContent = entitled ? "Full access" : "Preview mode";

      // Toggle the "Topic 1 free" badge / "Full access" badge inside the tag row.
      var freeBadge = card.querySelector('[data-role="free-badge"]');
      var fullBadge = card.querySelector('[data-role="full-badge"]');
      if (freeBadge) freeBadge.hidden = entitled;
      if (fullBadge) fullBadge.hidden = !entitled;

      // Hide the hero lock chip for entitled subjects.
      var lockChip = card.querySelector(".s-card__lock");
      if (lockChip) lockChip.style.display = entitled ? "none" : "";
    });

    updateHelpCard();
  }

  function updateHelpCard() {
    var helpCard = document.querySelector('[data-role="help-card"]');
    if (!helpCard) return;
    var title = helpCard.querySelector('[data-role="help-card-title"]');
    var body  = helpCard.querySelector('[data-role="help-card-body"]');
    var cta   = helpCard.querySelector('[data-role="help-card-primary"]');
    var ents  = state.entitlements || {};
    var all = ["chemistry","physics","geography"];
    var ownedCount = all.filter(function (s) { return !!ents[s]; }).length;
    var firstUnowned = all.find(function (s) { return !ents[s]; });

    if (ownedCount === all.length) {
      if (title) title.textContent = "You're all set. Keep the streak going!";
      if (body)  body.textContent  = "Full access to every subject. Jump back in and chip away at topics — XP, bosses and daily quests are yours.";
      if (cta) {
        cta.textContent = "Continue Chemistry";
        cta.href = "subject.html?subject=chemistry";
      }
    } else if (ownedCount > 0) {
      if (title) title.textContent = "Nice — keep going.";
      if (body)  body.textContent  = "You have full access to " + ownedCount + " subject" + (ownedCount === 1 ? "" : "s") + ". Try a free topic from the remaining subject" + (all.length - ownedCount === 1 ? "" : "s") + " whenever you want.";
      if (cta && firstUnowned) {
        cta.textContent = "Try " + firstUnowned.charAt(0).toUpperCase() + firstUnowned.slice(1) + " free topic";
        cta.href = "subject.html?subject=" + encodeURIComponent(firstUnowned);
      } else if (cta) {
        cta.textContent = "Continue Chemistry";
        cta.href = "subject.html?subject=chemistry";
      }
    } else {
      if (title) title.textContent = "New here? Start with Chemistry Topic 1.";
      if (body)  body.textContent  = "Every subject includes a free preview topic with full notes, flashcards, quiz and written practice — no credit card. Upgrade any subject individually when you're ready to unlock the full syllabus.";
      if (cta) {
        cta.textContent = "Open Chemistry free topic";
        cta.href = "subject.html?subject=chemistry";
      }
    }
  }

  // ── Card click guard ─────────────────────────────────────────────────────────

  function bindCardClicks() {
    document.querySelectorAll(".s-card[data-subject], a.card[data-subject]").forEach(function (card) {
      if (card.__boundClick) return;
      card.__boundClick = true;
      card.addEventListener("click", function (e) {
        var sid     = String(card.getAttribute("data-subject") || "").toLowerCase();
        var entitled = !!state.entitlements[sid];

        if (!entitled) {
          e.preventDefault();
          window.location.href = "subject.html?subject=" + encodeURIComponent(sid) + "&preview=1";
          return;
        }

        if (sid) localStorage.setItem(LAST_SUBJECT_KEY, sid);
      }, true);
    });
  }

  // ── Main auth + entitlement flow ─────────────────────────────────────────────

  async function syncStateFromSession() {
    if (!window.LevelupAuth || typeof window.LevelupAuth.getValidatedUser !== "function") {
      redirectToLanding();
      return;
    }

    var user;
    try {
      user = await window.LevelupAuth.getValidatedUser();
    } catch (e) {
      redirectToLanding();
      return;
    }

    if (!user) {
      redirectToLanding();
      return;
    }

    suppressAuthRedirectUntil = 0;

    if (hasOAuthReturnPayload() && window.history && window.history.replaceState) {
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (_) {}
    }

    state.isSignedIn = true;
    var meta = user.user_metadata || {};
    state.displayName =
      String(meta.full_name || meta.name || "").trim() ||
      String(user.email || "").split("@")[0] ||
      "Student";
    state.email = String(user.email || "");
    state.avatarUrl = String(meta.avatar_url || meta.picture || "");

    refreshTopbar();

    try {
      var results = await Promise.all([
        window.LevelupAuth.isSubjectEntitled("chemistry").catch(function () { return false; }),
        window.LevelupAuth.isSubjectEntitled("physics").catch(function () { return false; }),
        window.LevelupAuth.isSubjectEntitled("geography").catch(function () { return false; }),
      ]);
      state.entitlements = {
        chemistry: !!results[0],
        physics:   !!results[1],
        geography: !!results[2],
      };
    } catch (e) {
      state.entitlements = { chemistry: false, physics: false, geography: false };
    }

    updateSubjectCardsAccess();
  }

  // ── Auth state listener ─────────────────────────────────────────────────────

  function boot() {
    bindCardClicks();
    if (window.LevelupAuth && typeof window.LevelupAuth.onAuthStateChange === "function") {
      window.LevelupAuth.onAuthStateChange(function (session) {
        if (!session || !session.user) {
          redirectToLanding();
        } else {
          syncStateFromSession();
        }
      });
    }
    syncStateFromSession();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
