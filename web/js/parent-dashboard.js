(function () {
  var authGate     = document.getElementById("auth-gate");
  var dashboard    = document.getElementById("dashboard");
  var statusEl     = document.getElementById("status");
  var studentCards = document.getElementById("student-cards");
  var parentAvatar = document.getElementById("parent-avatar");
  var parentName   = document.getElementById("parent-name");
  var btnSignout   = document.getElementById("btn-signout");
  var btnRefresh   = document.getElementById("btn-refresh");
  var btnGoogle    = document.getElementById("btn-google-signin");
  var authError    = document.getElementById("auth-error");
  var summaryModal = document.getElementById("study-summary-modal");
  var summaryBody  = document.getElementById("study-summary-body");
  var summaryFoot  = document.getElementById("study-summary-foot");
  var summaryClose = document.getElementById("study-summary-close");

  /** Most-recent RPC student rows; used by summary modal. */
  var lastStudents = [];

  // ── Helpers ───────────────────────────────────────────────────────────────

  function fmt(ts) {
    if (!ts) return "-";
    var d = new Date(ts);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
  }

  function fmtDate(ts) {
    if (!ts) return "-";
    var d = new Date(ts);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function jsonArr(x) {
    if (Array.isArray(x)) return x;
    if (!x) return [];
    try {
      var p = typeof x === "string" ? JSON.parse(x) : x;
      return Array.isArray(p) ? p : [];
    } catch (_) { return []; }
  }

  function topicList(topics, key) {
    var arr = jsonArr(topics);
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (t) {
      return "<span class='chip'>T" + esc(t.topic_id) + " · " + Number(t[key] || 0) + "%</span>";
    }).join("");
  }

  function recentCouponList(rows) {
    var arr = jsonArr(rows);
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (r) {
      var label   = esc(r.reward_label || r.reward_id || "reward");
      var code    = esc(r.coupon_code  || "-");
      var date    = fmt(r.purchased_at);
      var claimed = r.claimed_at ? ("Claimed " + fmt(r.claimed_at)) : "Active";
      return "<span class='chip'>" + label + " · " + Number(r.xp_cost || 0) + " XP · " + date + " · " + esc(claimed) + " · code " + code + "</span>";
    }).join("");
  }

  function entitlementBadge(s) {
    var ents = jsonArr(s.entitlements);
    if (!ents.length) return "<span class='chip locked'>No subscription</span>";
    var expiry = s.access_to;
    if (expiry && new Date(expiry).getTime() < Date.now()) {
      return "<span class='chip locked'>Expired " + fmtDate(expiry) + "</span>";
    }
    // Entitlements are now subject slugs from public.subject_entitlements
    // (e.g. ["chemistry","physics","geography"]). All 3 → friendlier label.
    var label = ents.length >= 3 ? "All subjects" : ents
      .map(function (s) { return String(s || "").charAt(0).toUpperCase() + String(s || "").slice(1); })
      .join(", ");
    var exStr = expiry ? " · expires " + fmtDate(expiry) : " · no expiry";
    return "<span class='chip ok'>" + esc(label) + esc(exStr) + "</span>";
  }

  // ── Study summary modal ───────────────────────────────────────────────────

  function formatSummary(s) {
    var parts = [];
    parts.push("<p><strong>" + esc(s.display_name || "Student") + "</strong></p>");
    parts.push("<p class='hint-text'>Last activity: " + fmt(s.last_activity) + "</p>");
    parts.push("<h3>Subscription</h3><p>" + entitlementBadge(s) + "</p>");
    parts.push("<h3>Overview</h3><ul>");
    parts.push("<li>XP balance: " + Number(s.xp_balance || 0) + "</li>");
    parts.push("<li>XP events (lifetime): " + Number(s.xp_events || 0) + "</li>");
    parts.push("<li>Topics studied: " + Number(s.studied_topics || 0) + "</li>");
    parts.push("<li>Shop purchases: " + Number(s.purchases || 0) + "</li>");
    parts.push("<li>Last 7 days: +" + Number(s.xp_last_7d || 0) + " XP</li>");
    parts.push("</ul>");
    parts.push("<h3>Strong topics (mastery ≥ 80)</h3>");
    parts.push("<p>" + topicList(s.strong_topics, "mastery") + "</p>");
    parts.push("<h3>Weak topics (mastery &lt; 55, seen &gt; 0)</h3>");
    parts.push("<p>" + topicList(s.weak_topics, "mastery") + "</p>");
    parts.push("<h3>Recent shop coupons</h3>");
    var coupons = jsonArr(s.recent_coupons);
    if (!coupons.length) {
      parts.push("<p class='hint-text'>None yet.</p>");
    } else {
      parts.push("<ul>");
      coupons.slice(0, 12).forEach(function (r) {
        var claimed = r.claimed_at ? " · claimed " + fmt(r.claimed_at) : " · active";
        parts.push(
          "<li>" + esc(r.reward_label || r.reward_id || "reward") +
          " — " + Number(r.xp_cost || 0) + " XP · " + fmt(r.purchased_at) +
          esc(claimed) + " · code " + esc(r.coupon_code || "-") + "</li>"
        );
      });
      parts.push("</ul>");
    }
    return parts.join("");
  }

  function openSummary(userId) {
    if (!summaryModal || !summaryBody) return;
    var s = lastStudents.find(function (row) { return String(row.user_id || "") === String(userId); });
    if (!s) return;
    summaryBody.innerHTML = formatSummary(s);
    if (summaryFoot) {
      summaryFoot.textContent = "Data from parent_get_students_overview(). " +
        "Full per-question report is in the student's Settings → Parent study report.";
    }
    summaryModal.hidden = false;
  }

  function closeSummary() { if (summaryModal) summaryModal.hidden = true; }

  if (summaryClose) summaryClose.onclick = closeSummary;
  if (summaryModal) {
    summaryModal.addEventListener("click", function (e) {
      if (e.target === summaryModal) closeSummary();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && summaryModal && !summaryModal.hidden) closeSummary();
  });

  // ── Student card rendering ────────────────────────────────────────────────

  function renderActivityTable(s) {
    return (
      "<table class='activity-table'>" +
        "<thead><tr><th></th><th>Today</th><th>This week</th><th>This month</th></tr></thead>" +
        "<tbody>" +
          "<tr><th scope='row'>XP earned</th>" +
            "<td>+" + Number(s.xp_today || 0) + "</td>" +
            "<td>+" + Number(s.xp_last_7d || 0) + "</td>" +
            "<td>+" + Number(s.xp_last_30d || 0) + "</td></tr>" +
          "<tr><th scope='row'>Activity events</th>" +
            "<td>" + Number(s.events_today || 0) + "</td>" +
            "<td>" + Number(s.events_7d || 0) + "</td>" +
            "<td>" + Number(s.events_30d || 0) + "</td></tr>" +
          "<tr><th scope='row'>Topics touched</th>" +
            "<td>" + Number(s.touched_today || 0) + "</td>" +
            "<td>" + Number(s.touched_7d || 0) + "</td>" +
            "<td>" + Number(s.touched_30d || 0) + "</td></tr>" +
        "</tbody>" +
      "</table>"
    );
  }

  function renderRewardsEditor(s) {
    var rewards = jsonArr(s.rewards);
    var rows = rewards.map(function (r) {
      return (
        "<li class='reward-row' data-id='" + esc(r.id) + "'>" +
          "<div class='reward-main'>" +
            "<strong>" + esc(r.label) + "</strong>" +
            (r.description ? " <span class='hint-text'>" + esc(r.description) + "</span>" : "") +
          "</div>" +
          "<div class='reward-meta'>" +
            "<span class='chip'>" + Number(r.xp_cost || 0) + " XP</span>" +
            (r.active ? "" : "<span class='chip locked'>Inactive</span>") +
          "</div>" +
          "<div class='reward-actions'>" +
            "<button type='button' class='btn-ghost js-reward-edit' data-id='" + esc(r.id) + "'>Edit</button>" +
            "<button type='button' class='btn-ghost danger js-reward-delete' data-id='" + esc(r.id) + "'>Remove</button>" +
          "</div>" +
        "</li>"
      );
    }).join("");
    return (
      "<div class='rewards-block'>" +
        "<h4>Rewards for " + esc(s.display_name || "this student") + "</h4>" +
        "<p class='hint-text'>Set rewards they can redeem with XP. You fulfil them in real life.</p>" +
        (rewards.length
          ? "<ul class='rewards-list'>" + rows + "</ul>"
          : "<p class='hint-text'>No rewards yet — add one below.</p>") +
        "<form class='reward-form' data-student='" + esc(s.user_id || "") + "' autocomplete='off'>" +
          "<input type='text' name='label' placeholder='Reward (e.g. 30 min screen time)' maxlength='120' required />" +
          "<input type='number' name='xp_cost' placeholder='XP cost' min='0' max='100000' required />" +
          "<input type='text' name='description' placeholder='Notes (optional)' maxlength='300' />" +
          "<button type='submit' class='btn-primary'>Add reward</button>" +
        "</form>" +
      "</div>"
    );
  }

  function renderStudentDetailBlocks(s) {
    return (
      "<button type='button' class='btn-summary btn-study-summary' data-uid='" + esc(s.user_id || "") + "'>Full study summary</button>" +
      "<div class='details'>" +
        "<div class='mini full'><h4>Activity</h4>" + renderActivityTable(s) + "</div>" +
        "<div class='mini'><h4>Subscription</h4><div class='chips'>" + entitlementBadge(s) + "</div></div>" +
        "<div class='mini'><h4>Strong topics</h4><div class='chips'>" + topicList(s.strong_topics, "mastery") + "</div></div>" +
        "<div class='mini'><h4>Weak topics</h4><div class='chips'>" + topicList(s.weak_topics, "mastery") + "</div></div>" +
        "<div class='mini'><h4>Recent coupons</h4><div class='chips'>" + recentCouponList(s.recent_coupons) + "</div></div>" +
        "<div class='mini full'>" + renderRewardsEditor(s) + "</div>" +
      "</div>"
    );
  }

  // ── Rewards CRUD ─────────────────────────────────────────────────────────
  async function callRpc(name, args) {
    if (!window.LevelupAuth) throw new Error("auth_not_ready");
    var sb = window.LevelupAuth.getClient();
    if (!sb) throw new Error("supabase_not_ready");
    var res = await sb.rpc(name, args || {});
    if (res.error) throw res.error;
    return res.data;
  }

  async function handleRewardSubmit(form) {
    var fd = new FormData(form);
    var studentId = form.getAttribute("data-student");
    var label = String(fd.get("label") || "").trim();
    var xp = parseInt(String(fd.get("xp_cost") || "0"), 10);
    var desc = String(fd.get("description") || "").trim() || null;
    var editId = form.dataset.editId || null;
    if (!studentId || !label || !(xp >= 0)) return;
    try {
      await callRpc("parent_upsert_student_reward", {
        p_student_user_id: studentId,
        p_label: label,
        p_xp_cost: xp,
        p_description: desc,
        p_id: editId,
        p_active: true,
        p_sort_order: 0,
      });
      delete form.dataset.editId;
      form.reset();
      var submit = form.querySelector("button[type=submit]");
      if (submit) submit.textContent = "Add reward";
      await loadData();
    } catch (e) {
      alert("Failed: " + ((e && e.message) || String(e)));
    }
  }

  async function handleRewardDelete(id) {
    if (!id) return;
    if (!confirm("Remove this reward?")) return;
    try {
      await callRpc("parent_delete_student_reward", { p_id: id });
      await loadData();
    } catch (e) {
      alert("Failed: " + ((e && e.message) || String(e)));
    }
  }

  function handleRewardEdit(id) {
    var row = document.querySelector(".reward-row[data-id='" + id + "']");
    if (!row) return;
    var label = row.querySelector(".reward-main strong").textContent;
    var xpChip = row.querySelector(".reward-meta .chip");
    var xp = parseInt((xpChip ? xpChip.textContent : "0").replace(/[^0-9]/g, ""), 10) || 0;
    var descEl = row.querySelector(".reward-main .hint-text");
    var desc = descEl ? descEl.textContent : "";
    var form = row.closest(".rewards-block").querySelector(".reward-form");
    if (!form) return;
    form.dataset.editId = id;
    form.label.value = label;
    form.xp_cost.value = String(xp);
    form.description.value = desc;
    var submit = form.querySelector("button[type=submit]");
    if (submit) submit.textContent = "Save changes";
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderStudents(students) {
    if (!studentCards) return;
    if (!students.length) {
      studentCards.innerHTML = "<p class='hint-text'>No linked students yet. " +
        "Ask an admin to link a student to your account via the admin panel.</p>";
      return;
    }
    studentCards.innerHTML = students.map(function (s) {
      var initial = (s.display_name || "?").charAt(0).toUpperCase();
      var avatarHtml = s.avatar_url
        ? "<img src='" + esc(s.avatar_url) + "' alt='' />"
        : initial;
      return (
        "<section class='student-card'>" +
        "<button type='button' class='student-toggle' aria-expanded='false'>" +
          "<div class='student-head'>" +
            "<div><div class='name-row'>" +
              "<span class='student-avatar'>" + avatarHtml + "</span>" +
              "<h3>" + esc(s.display_name || "Student") + "</h3>" +
            "</div>" +
            "<p class='student-meta'>Last activity: " + fmt(s.last_activity) + "</p></div>" +
            "<div>" +
              "<span class='divider-dot'>&bull;</span>" +
              "<span class='hint-text' style='font-size:.8rem;'>" + fmt(s.last_activity) + "</span>" +
            "</div>" +
          "</div>" +
          "<div class='student-summary'>" +
            "<span class='chip'>XP " + Number(s.xp_balance || 0) + "</span>" +
            "<span class='chip'>Events " + Number(s.xp_events || 0) + "</span>" +
            "<span class='chip'>Topics " + Number(s.studied_topics || 0) + "</span>" +
            "<span class='chip'>Purchases " + Number(s.purchases || 0) + "</span>" +
            entitlementBadge(s) +
            "<span class='student-expand'>Tap to expand</span>" +
          "</div>" +
        "</button>" +
        "<div class='student-details' hidden>" +
          "<div class='stat-grid'>" +
            "<span class='chip'>XP " + Number(s.xp_balance || 0) + "</span>" +
            "<span class='chip'>Events " + Number(s.xp_events || 0) + "</span>" +
            "<span class='chip'>Topics " + Number(s.studied_topics || 0) + "</span>" +
            "<span class='chip'>Purchases " + Number(s.purchases || 0) + "</span>" +
          "</div>" +
          renderStudentDetailBlocks(s) +
        "</div>" +
        "</section>"
      );
    }).join("");

    // Study summary buttons
    studentCards.querySelectorAll(".btn-study-summary").forEach(function (btn) {
      btn.addEventListener("click", function (evt) {
        evt.stopPropagation();
        openSummary(btn.getAttribute("data-uid"));
      });
    });

    // Rewards: add / edit / delete (delegated per-card so form submits don't bubble to toggle)
    studentCards.querySelectorAll(".reward-form").forEach(function (form) {
      form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        handleRewardSubmit(form);
      });
      form.addEventListener("click", function (evt) { evt.stopPropagation(); });
    });
    studentCards.querySelectorAll(".js-reward-delete").forEach(function (btn) {
      btn.addEventListener("click", function (evt) {
        evt.stopPropagation();
        handleRewardDelete(btn.getAttribute("data-id"));
      });
    });
    studentCards.querySelectorAll(".js-reward-edit").forEach(function (btn) {
      btn.addEventListener("click", function (evt) {
        evt.stopPropagation();
        handleRewardEdit(btn.getAttribute("data-id"));
      });
    });

    // Expand/collapse
    studentCards.querySelectorAll(".student-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var details = btn.nextElementSibling;
        if (!details) return;
        var nowHidden = !details.hidden;
        details.hidden = nowHidden;
        btn.setAttribute("aria-expanded", nowHidden ? "false" : "true");
        var expand = btn.querySelector(".student-expand");
        if (expand) expand.textContent = nowHidden ? "Tap to expand" : "Tap to collapse";
      });
    });
  }

  // ── Data loading ──────────────────────────────────────────────────────────

  async function loadData() {
    if (!window.LevelupAuth) { statusEl.textContent = "Auth not ready. Reload the page."; return; }
    var sb = window.LevelupAuth.getClient();
    if (!sb) { statusEl.textContent = "Supabase not configured."; return; }
    statusEl.textContent = "Loading…";
    try {
      var res = await sb.rpc("parent_get_students_overview");
      if (res.error) throw res.error;
      var data = res.data || {};
      if (!data.ok) {
        statusEl.textContent = "Error: " + (data.error || "unknown");
        return;
      }
      lastStudents = Array.isArray(data.students) ? data.students : [];
      renderStudents(lastStudents);
      statusEl.textContent = "Loaded " + lastStudents.length + " student(s). " +
        "Generated at " + fmt(data.generated_at) + ".";
    } catch (e) {
      statusEl.textContent = "Error: " + ((e && e.message) || String(e));
    }
  }

  // ── Auth state management ─────────────────────────────────────────────────

  function showDashboard(user) {
    if (authGate) authGate.hidden = true;
    if (dashboard) dashboard.hidden = false;
    var meta = user.user_metadata || {};
    var name = String(meta.full_name || meta.name || "").trim() ||
               String(user.email || "").split("@")[0] || "Parent";
    var avatar = String(meta.avatar_url || meta.picture || "");
    if (parentName) parentName.textContent = name;
    if (parentAvatar) parentAvatar.textContent = name.charAt(0).toUpperCase();
    if (window.LevelupShell && typeof window.LevelupShell.setProfile === "function") {
      window.LevelupShell.setProfile(name, user.email || "", avatar);
    }
    loadData();
  }

  function showAuthGate() {
    if (authGate) authGate.hidden = false;
    if (dashboard) dashboard.hidden = true;
    if (window.LevelupShell && typeof window.LevelupShell.clearProfile === "function") {
      window.LevelupShell.clearProfile();
    }
  }

  // ── Auth wiring ───────────────────────────────────────────────────────────

  async function init() {
    if (!window.LevelupAuth) { showAuthGate(); return; }

    // Server-validate the session so stale/ghost tokens show the sign-in gate
    var user = null;
    try {
      user = window.LevelupAuth.getValidatedUser
        ? await window.LevelupAuth.getValidatedUser()
        : null;
    } catch (_) {}

    if (user) {
      showDashboard(user);
    } else {
      showAuthGate();
    }

    // Listen for auth changes
    window.LevelupAuth.onAuthStateChange(function (sess) {
      if (sess && sess.user) {
        showDashboard(sess.user);
      } else {
        showAuthGate();
      }
    });
  }

  if (btnGoogle) {
    btnGoogle.addEventListener("click", function () {
      if (!window.LevelupAuth) return;
      if (authError) authError.hidden = true;
      var redirectTo = window.LevelupPath && typeof window.LevelupPath.pageHref === "function"
        ? window.LevelupPath.pageHref("parent.html")
        : window.location.href;
      window.LevelupAuth.signInWithGoogle(redirectTo).catch(function (e) {
        if (authError) {
          authError.textContent = "Sign-in error: " + ((e && e.message) || String(e));
          authError.hidden = false;
        }
      });
    });
  }

  if (btnSignout) {
    btnSignout.addEventListener("click", function () {
      if (!window.LevelupAuth) return;
      window.LevelupAuth.signOut().then(function () {
        window.location.href = "index.html";
      });
    });
  }

  if (btnRefresh) btnRefresh.addEventListener("click", loadData);

  // Start after LevelupAuth is ready
  if (window.LevelupAuth) {
    init();
  } else {
    document.addEventListener("levelup:auth-ready", init);
    // Fallback
    window.addEventListener("load", function () {
      if (window.LevelupAuth && !authGate.hidden && !dashboard.hidden) init();
    });
  }
})();
