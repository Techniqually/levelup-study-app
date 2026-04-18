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
    markContinueCard();
    updatePerSubjectProgress(user).catch(function () {});
    renderTodayPlan(user).catch(function () {});
  }

  // ── Continue-card highlight ──────────────────────────────────────────────────

  function markContinueCard() {
    var last = "";
    try { last = String(localStorage.getItem("LEVELUP_LAST_SUBJECT") || "").toLowerCase(); } catch (_e) {}
    document.querySelectorAll(".s-card[data-subject]").forEach(function (card) {
      var sid = String(card.getAttribute("data-subject") || "").toLowerCase();
      var badge = card.querySelector('[data-role="continue-badge"]');
      var isContinue = last && sid === last && !!state.entitlements[sid];
      card.classList.toggle("is-continue", !!isContinue);
      if (badge) badge.hidden = !isContinue;
    });
  }

  // ── Per-subject mastery rings ────────────────────────────────────────────────

  async function updatePerSubjectProgress(user) {
    var sb = window.LevelupAuth && window.LevelupAuth.getClient && window.LevelupAuth.getClient();
    if (!sb || !user || !user.id) return;
    var q = await sb
      .from("study_topic_stats")
      .select("subject_id, mastery, seen")
      .eq("user_id", user.id);
    if (q.error || !Array.isArray(q.data)) return;
    var buckets = {};
    q.data.forEach(function (r) {
      var sid = String(r.subject_id || "").toLowerCase();
      if (!sid) return;
      if (!buckets[sid]) buckets[sid] = { sum: 0, n: 0 };
      if (Number(r.seen || 0) > 0) {
        buckets[sid].sum += Number(r.mastery || 0);
        buckets[sid].n += 1;
      }
    });
    document.querySelectorAll(".s-card[data-subject]").forEach(function (card) {
      var sid = String(card.getAttribute("data-subject") || "").toLowerCase();
      var ring = card.querySelector('[data-role="mastery-ring"]');
      var pctEl = card.querySelector('[data-role="mastery-pct"]');
      if (!ring || !pctEl) return;
      var b = buckets[sid];
      var pct = b && b.n ? Math.round(b.sum / b.n) : 0;
      ring.style.setProperty("--pct", String(pct));
      pctEl.textContent = pct + "%";
    });
  }

  // ── Today's plan ─────────────────────────────────────────────────────────────

  function todayIso() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }

  async function renderTodayPlan(user) {
    var host  = document.getElementById("hub-today");
    var list  = document.getElementById("hub-today-list");
    var hint  = document.getElementById("hub-today-hint");
    if (!host || !list) return;
    var sb = window.LevelupAuth && window.LevelupAuth.getClient && window.LevelupAuth.getClient();
    if (!sb || !user || !user.id) return;

    var ents  = state.entitlements || {};
    var items = [];

    // Pull today's XP ledger + the weakest owned topic in one round trip.
    try {
      var [xpToday, weakQ] = await Promise.all([
        sb.from("study_xp_ledger")
          .select("delta, subject_id, meta")
          .eq("user_id", user.id)
          .gte("created_at", todayIso()),
        sb.from("study_topic_stats")
          .select("subject_id, topic_id, mastery, seen")
          .eq("user_id", user.id)
          .gt("seen", 0)
          .order("mastery", { ascending: true })
          .limit(8),
      ]);

      var xpSumToday = 0;
      var subjectsTouchedToday = {};
      (xpToday && Array.isArray(xpToday.data) ? xpToday.data : []).forEach(function (r) {
        var d = Number(r.delta || 0);
        if (d <= 0) return;
        xpSumToday += d;
        if (r.subject_id) subjectsTouchedToday[String(r.subject_id).toLowerCase()] = true;
      });

      // Daily habit goal
      if (xpSumToday < 25) {
        items.push({
          href: firstEntitledSubjectHref() || "subject.html?subject=chemistry",
          title: "Earn 25 XP today",
          meta: xpSumToday + " / 25 XP so far",
        });
      } else {
        items.push({
          href: "profile.html#report",
          title: "Habit complete — " + xpSumToday.toLocaleString() + " XP today",
          meta: "Open your report",
        });
      }

      // Weakest topic in an owned subject
      var weak = (weakQ && Array.isArray(weakQ.data) ? weakQ.data : []).find(function (r) {
        var sid = String(r.subject_id || "").toLowerCase();
        return sid && ents[sid];
      });
      if (weak) {
        items.push({
          href: "subject.html?subject=" + encodeURIComponent(weak.subject_id) + "&topic=" + encodeURIComponent(weak.topic_id),
          title: "Revisit your weakest topic",
          meta: weak.subject_id + " · T" + weak.topic_id + " · " + Math.round(Number(weak.mastery || 0)) + "% mastery",
        });
      } else if (Object.keys(ents).some(function (k) { return ents[k]; })) {
        // Entitled but no weak data yet → start a fresh topic in the last/first subject
        var href = firstEntitledSubjectHref();
        if (href) items.push({ href: href, title: "Start a new chapter", meta: "No mastery data yet — pick any topic" });
      } else {
        items.push({ href: "subject.html?subject=chemistry&preview=1", title: "Try a free topic", meta: "Chemistry Topic 1 is always free" });
      }
    } catch (_e) {
      return;
    }

    if (!items.length) return;
    list.innerHTML = items.map(function (i) {
      return (
        '<li class="hub-today__item">' +
          '<a href="' + i.href + '">' +
            '<span class="dot"></span>' +
            '<span><strong>' + escapeHtml(i.title) + '</strong><br>' +
            '<span class="meta">' + escapeHtml(i.meta) + '</span></span>' +
          '</a>' +
          '<span class="meta" aria-hidden="true">→</span>' +
        '</li>'
      );
    }).join("");
    if (hint) hint.textContent = "Quick wins · personalised from your recent activity.";
    host.hidden = false;
  }

  function firstEntitledSubjectHref() {
    var last = "";
    try { last = String(localStorage.getItem("LEVELUP_LAST_SUBJECT") || "").toLowerCase(); } catch (_e) {}
    if (last && state.entitlements[last]) return "subject.html?subject=" + encodeURIComponent(last);
    var owned = Object.keys(state.entitlements || {}).filter(function (k) { return state.entitlements[k]; });
    if (owned.length) return "subject.html?subject=" + encodeURIComponent(owned[0]);
    return "";
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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
