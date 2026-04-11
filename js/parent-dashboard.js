(function () {
  var status       = document.getElementById("status");
  var studentCards = document.getElementById("student-cards");
  var btnSetup     = document.getElementById("btn-setup-keys");
  var btnRefresh   = document.getElementById("btn-refresh");
  var projectCode  = document.getElementById("project-code");
  var parentCode   = document.getElementById("parent-code");
  var rememberCode = document.getElementById("remember-code");
  var summaryModal = document.getElementById("study-summary-modal");
  var summaryBody  = document.getElementById("study-summary-body");
  var summaryFoot  = document.getElementById("study-summary-foot");
  var summaryClose = document.getElementById("study-summary-close");
  /** Last successful `study_parent_student_overview_token` student rows (for summary modal). */
  var lastStudents = [];

  var TOKEN_KEY     = "PARENT_DASH_TOKEN_V1";
  var TOKEN_EXP_KEY = "PARENT_DASH_TOKEN_EXP_V1";

  function saveToken(token) {
    var exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXP_KEY, String(exp));
  }

  function loadToken() {
    var token = (localStorage.getItem(TOKEN_KEY) || "").trim();
    var exp   = Number(localStorage.getItem(TOKEN_EXP_KEY) || 0);
    if (!token || !exp || Date.now() > exp) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXP_KEY);
      return "";
    }
    return token;
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
  }

  async function sha256Hex(input) {
    var enc    = new TextEncoder().encode(input);
    var digest = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(digest)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  function getKeys() {
    return {
      url: (localStorage.getItem("SUPABASE_URL")      || "").trim(),
      key: (localStorage.getItem("SUPABASE_ANON_KEY") || "").trim(),
    };
  }

  function setupKeys() {
    var k = getKeys();
    var u = prompt("Supabase Project URL:", k.url || "https://xxxx.supabase.co");
    if (!u) return;
    var a = prompt("Supabase anon/public key:", k.key || "");
    if (!a) return;
    localStorage.setItem("SUPABASE_URL", u.trim());
    localStorage.setItem("SUPABASE_ANON_KEY", a.trim());
    status.textContent = "Keys saved.";
  }

  function fmt(ts) {
    if (!ts) return "-";
    var d = new Date(ts);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function topicList(topics, key) {
    var arr = Array.isArray(topics) ? topics : [];
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (t) {
      return "<span class='chip'>T" + esc(t.topic_id) + " · " + Number(t[key] || 0) + "%</span>";
    }).join("");
  }

  function subjectList(subjects) {
    var arr = Array.isArray(subjects) ? subjects : [];
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (s) {
      var id     = esc((s && s.subject_id) || "general");
      var xp     = Number((s && s.xp)     || 0);
      var events = Number((s && s.events) || 0);
      return "<span class='chip'>" + id + " · XP " + xp + " · events " + events + "</span>";
    }).join("");
  }

  function recentCouponList(rows) {
    var arr = Array.isArray(rows) ? rows : [];
    if (!arr.length) return "<span class='chip'>none</span>";
    return arr.slice(0, 8).map(function (r) {
      var label   = esc(r.reward_label || r.reward_id || "reward");
      var code    = esc(r.coupon_code  || "-");
      var date    = fmt(r.purchased_at);
      var claimed = r.claimed_at ? ("Claimed " + fmt(r.claimed_at)) : "Active";
      return "<span class='chip'>" + label + " · " + Number(r.xp_cost || 0) + " XP · " + date + " · " + esc(claimed) + " · code " + code + "</span>";
    }).join("");
  }

  function jsonArr(x) {
    if (Array.isArray(x)) return x;
    if (x == null) return [];
    try {
      var p = typeof x === "string" ? JSON.parse(x) : x;
      return Array.isArray(p) ? p : [];
    } catch (_) {
      return [];
    }
  }

  /** Readable summary from the same RPC payload as the dashboard (no new backend). */
  function formatStudentStudySummary(s) {
    var areasAll = jsonArr(s.areas_overall).map(function (a) { return esc(String(a)); }).filter(Boolean);
    var areasWk  = jsonArr(s.areas_week).map(function (a) { return esc(String(a)); }).filter(Boolean);
    var subs     = jsonArr(s.subject_stats);
    var coupons  = jsonArr(s.recent_coupons);
    var parts    = [];
    parts.push("<p><strong>" + esc(s.student_name || "Student") + "</strong> · ID <code>" + esc(s.student_id || "-") + "</code></p>");
    parts.push("<p class='hint'>Last activity: " + fmt(s.last_activity) + "</p>");
    parts.push("<h3>Overview</h3><ul>");
    parts.push("<li>XP balance: " + Number(s.xp_balance || 0) + "</li>");
    parts.push("<li>Positive XP events (lifetime): " + Number(s.xp_events || 0) + "</li>");
    parts.push(
      "<li>Topics with stats: " +
        Number(s.studied_topics || 0) +
        " · Chapters with activity: " +
        Number(s.chapters_covered || 0) +
        "</li>"
    );
    parts.push("<li>Shop purchases: " + Number(s.purchases || 0) + "</li>");
    parts.push(
      "<li>Last 7 days: +" +
        Number(s.xp_last_7d || 0) +
        " XP · " +
        Number(s.xp_events_last_7d || 0) +
        " positive events</li>"
    );
    parts.push("</ul>");
    if (subs.length) {
      parts.push("<h3>By subject</h3><ul>");
      subs.forEach(function (row) {
        parts.push(
          "<li><strong>" +
            esc(String((row && row.subject_id) || "general")) +
            "</strong> — " +
            Number((row && row.xp) || 0) +
            " XP · " +
            Number((row && row.events) || 0) +
            " events (7d: +" +
            Number((row && row.xp_last_7d) || 0) +
            " XP / " +
            Number((row && row.events_last_7d) || 0) +
            " ev)</li>"
        );
      });
      parts.push("</ul>");
    }
    if (areasAll.length) {
      parts.push("<h3>Themes touched (overall)</h3><p>" + areasAll.join(", ") + "</p>");
    }
    if (areasWk.length) {
      parts.push("<h3>Themes touched (last 7 days)</h3><p>" + areasWk.join(", ") + "</p>");
    }
    parts.push("<h3>Strong topics (mastery ≥ 80)</h3>");
    parts.push("<p>" + topicList(s.strong_topics, "mastery") + "</p>");
    parts.push("<h3>Weak topics (mastery &lt; 55, seen &gt; 0)</h3>");
    parts.push("<p>" + topicList(s.weak_topics, "mastery") + "</p>");
    parts.push("<h3>Recent shop coupons</h3>");
    if (!coupons.length) {
      parts.push("<p class='hint'>None in the last fetch window.</p>");
    } else {
      parts.push("<ul>");
      coupons.slice(0, 12).forEach(function (r) {
        var claimed = r.claimed_at ? " · claimed " + fmt(r.claimed_at) : " · active";
        parts.push(
          "<li>" +
            esc(r.reward_label || r.reward_id || "reward") +
            " — " +
            Number(r.xp_cost || 0) +
            " XP · " +
            fmt(r.purchased_at) +
            esc(claimed) +
            " · code " +
            esc(r.coupon_code || "-") +
            "</li>"
        );
      });
      parts.push("</ul>");
    }
    return parts.join("");
  }

  function openStudySummary(studentId) {
    if (!summaryModal || !summaryBody) return;
    var sid = String(studentId || "").trim();
    var s   = lastStudents.find(function (row) {
      return String((row && row.student_id) || "").trim() === sid;
    });
    if (!s) return;
    summaryBody.innerHTML = formatStudentStudySummary(s);
    if (summaryFoot) {
      summaryFoot.textContent =
        "This summary uses the same synced data as the cards above. " +
        "The full study report (per subject, study time by tab, question misses, anomaly hints) " +
        "opens in the LevelUp app on the student’s device: Settings → Parent study report.";
    }
    summaryModal.hidden = false;
  }

  function closeStudySummary() {
    if (summaryModal) summaryModal.hidden = true;
  }

  if (summaryClose) summaryClose.onclick = closeStudySummary;
  if (summaryModal) {
    summaryModal.addEventListener("click", function (e) {
      if (e.target === summaryModal) closeStudySummary();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && summaryModal && !summaryModal.hidden) closeStudySummary();
  });

  function studentDetailBlocks(s) {
    return (
      "<button type='button' class='btn-summary btn-study-summary' data-student-id='" +
      esc(s.student_id || "") +
      "'>Study summary</button>" +
      "<div class='actions-row'>" +
      "<div class='menu-wrap'>" +
        "<button type='button' class='menu-btn student-menu-toggle' aria-haspopup='true' aria-expanded='false' title='More actions'>\u22EE</button>" +
        "<div class='menu-panel' hidden>" +
          "<button type='button' class='rename-student' data-student-id='" + esc(s.student_id || "") + "' data-student-name='" + esc(s.student_name || s.student_id || "") + "'>Rename</button>" +
          "<button type='button' class='delete-student btn-danger' data-student-id='" + esc(s.student_id || "") + "' data-student-name='" + esc(s.student_name || s.student_id || "") + "'>Delete student data</button>" +
        "</div>" +
      "</div>" +
    "</div>" +
    "<div class='details'>" +
      "<div class='mini'><h4>Last 7 days</h4><div class='chips'><span class='chip'>XP " + Number(s.xp_last_7d || 0) + "</span><span class='chip'>Events " + Number(s.xp_events_last_7d || 0) + "</span></div></div>" +
      "<div class='mini'><h4>Areas studied (overall)</h4><div class='chips'>" + (Array.isArray(s.areas_overall) && s.areas_overall.length ? s.areas_overall.map(function (a) { return "<span class='chip'>" + esc(a) + "</span>"; }).join("") : "<span class='chip'>none</span>") + "</div></div>" +
      "<div class='mini'><h4>Areas studied (last week)</h4><div class='chips'>" + (Array.isArray(s.areas_week) && s.areas_week.length ? s.areas_week.map(function (a) { return "<span class='chip'>" + esc(a) + "</span>"; }).join("") : "<span class='chip'>none</span>") + "</div></div>" +
      "<div class='mini'><h4>Strong topics</h4><div class='chips'>" + topicList(s.strong_topics, "mastery") + "</div></div>" +
      "<div class='mini'><h4>Weak topics</h4><div class='chips'>"   + topicList(s.weak_topics,   "mastery") + "</div></div>" +
      "<div class='mini'><h4>Subjects</h4><div class='chips'>"      + subjectList(s.subject_stats)         + "</div></div>" +
      "<div class='mini'><h4>Recent coupons (verification)</h4><div class='chips'>" + recentCouponList(s.recent_coupons) + "</div></div>" +
    "</div>"
    );
  }

  async function loadData() {
    var keys = getKeys();
    if (!keys.url || !keys.key) {
      status.textContent = "Missing Supabase keys. Click Supabase keys first.";
      return;
    }
    var token = loadToken();
    var pin   = (parentCode.value || "").trim();
    if (!token && !pin) { status.textContent = "Enter parent access code."; return; }
    if (!token && pin) token = await sha256Hex(pin);
    status.textContent = "Loading...";
    try {
      var sb = window.supabase.createClient(keys.url, keys.key);
      var res = await sb.rpc("study_parent_student_overview_token", {
        p_project_code: (projectCode.value || "study-app").trim(),
        p_parent_token: token,
      });
      if (res.error) throw res.error;
      var data = res.data;
      if (!data || !data.ok) {
        status.textContent = "Failed: " + ((data && data.error) || "unknown");
        if (data && data.error && String(data.error).includes("token")) clearToken();
        return;
      }
      if (rememberCode.checked && token) saveToken(token);
      if (!rememberCode.checked) clearToken();
      var students = Array.isArray(data.students) ? data.students : [];
      lastStudents = students;
      if (!students.length) {
        lastStudents = [];
        if (studentCards) studentCards.innerHTML = "<p class='hint'>No student rows yet.</p>";
        status.textContent = "Loaded. No students found yet.";
        return;
      }
      if (studentCards) {
        studentCards.innerHTML = students.map(function (s) {
          return "<section class='student-card'>" +
            "<button type='button' class='student-toggle' aria-expanded='false'>" +
            "<div class='student-head'>" +
              "<div><div class='name-row'><span class='student-avatar'>\uD83D\uDC64</span><h3>" + esc(s.student_name || "Student") + "</h3></div>" +
              "<p class='hint student-meta'>ID: " + esc(s.student_id || "-") + "</p></div>" +
              "<div class='hint'><span class='divider-dot'>\u2022</span> Last activity: " + fmt(s.last_activity) + "</div>" +
            "</div>" +
            "<div class='student-summary'>" +
              "<span class='chip'>XP " + Number(s.xp_balance || 0) + "</span>" +
              "<span class='chip'>Events " + Number(s.xp_events || 0) + "</span>" +
              "<span class='chip'>Topics " + Number(s.chapters_covered || s.studied_topics || 0) + "</span>" +
              "<span class='chip'>Purchases " + Number(s.purchases || 0) + "</span>" +
              "<span class='student-expand'>Tap to expand</span>" +
            "</div></button>" +
            "<div class='student-details' hidden><div class='stat-grid'>" +
              "<span class='chip'>XP " + Number(s.xp_balance || 0) + "</span>" +
              "<span class='chip'>Events " + Number(s.xp_events || 0) + "</span>" +
              "<span class='chip'>Topics " + Number(s.chapters_covered || s.studied_topics || 0) + "</span>" +
              "<span class='chip'>Purchases " + Number(s.purchases || 0) + "</span>" +
            "</div>" + studentDetailBlocks(s) + "</div></section>";
        }).join("");

        studentCards.querySelectorAll(".btn-study-summary").forEach(function (btn) {
          btn.addEventListener("click", function (evt) {
            evt.stopPropagation();
            openStudySummary(btn.getAttribute("data-student-id"));
          });
        });

        studentCards.querySelectorAll(".student-toggle").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var details    = btn.nextElementSibling;
            if (!details) return;
            var nextHidden = !details.hidden;
            details.hidden = nextHidden;
            btn.setAttribute("aria-expanded", nextHidden ? "false" : "true");
            var expand = btn.querySelector(".student-expand");
            if (expand) expand.textContent = nextHidden ? "Tap to expand" : "Tap to collapse";
          });
        });

        studentCards.querySelectorAll(".student-menu-toggle").forEach(function (btn) {
          btn.addEventListener("click", function (evt) {
            evt.stopPropagation();
            var wrap  = btn.closest(".menu-wrap");
            var panel = wrap ? wrap.querySelector(".menu-panel") : null;
            if (!panel) return;
            var willOpen = panel.hidden;
            studentCards.querySelectorAll(".menu-panel").forEach(function (p) { p.hidden = true; });
            studentCards.querySelectorAll(".student-menu-toggle").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
            panel.hidden = !willOpen;
            btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
          });
        });

        studentCards.querySelectorAll(".menu-panel").forEach(function (panel) {
          panel.addEventListener("click", function (evt) { evt.stopPropagation(); });
        });

        studentCards.querySelectorAll(".rename-student").forEach(function (btn) {
          btn.addEventListener("click", async function (evt) {
            evt.stopPropagation();
            var studentId   = (btn.dataset.studentId   || "").trim();
            var currentName = (btn.dataset.studentName || "").trim();
            if (!studentId) return;
            var pp = btn.closest(".menu-panel");
            if (pp) pp.hidden = true;
            var nextName = prompt("New display name:", currentName);
            if (!nextName || !nextName.trim()) return;
            var tok = loadToken();
            var p   = (parentCode.value || "").trim();
            if (!tok && p) tok = await sha256Hex(p);
            if (!tok) { status.textContent = "Enter parent access code first."; return; }
            try {
              status.textContent = "Renaming " + studentId + "...";
              var sb2  = window.supabase.createClient(getKeys().url, getKeys().key);
              var res2 = await sb2.rpc("study_parent_update_student_name_token", {
                p_project_code:    (projectCode.value || "study-app").trim(),
                p_parent_token:    tok,
                p_student_id:      studentId,
                p_new_display_name: nextName.trim(),
              });
              if (res2.error) throw res2.error;
              if (!res2.data || !res2.data.ok) { status.textContent = "Rename failed: " + ((res2.data && res2.data.error) || "unknown"); return; }
              status.textContent = "Renamed " + studentId + " to \"" + ((res2.data && res2.data.student_name) || nextName.trim()) + "\".";
              await loadData();
            } catch (e) { status.textContent = "Rename error: " + (e && e.message ? e.message : String(e)); }
          });
        });

        studentCards.querySelectorAll(".delete-student").forEach(function (btn) {
          btn.addEventListener("click", async function (evt) {
            evt.stopPropagation();
            var pp        = btn.closest(".menu-panel");
            if (pp) pp.hidden = true;
            var studentId   = (btn.dataset.studentId   || "").trim();
            var studentName = (btn.dataset.studentName || studentId).trim();
            if (!studentId) return;
            var confirmName = prompt("DELETE IS PERMANENT.\nType this exact current student name to confirm:\n\n" + studentName);
            if (confirmName == null) return;
            var tok = loadToken();
            var p   = (parentCode.value || "").trim();
            if (!tok && p) tok = await sha256Hex(p);
            if (!tok) { status.textContent = "Enter parent access code first."; return; }
            try {
              status.textContent = "Deleting " + studentId + "...";
              var sb3  = window.supabase.createClient(getKeys().url, getKeys().key);
              var res3 = await sb3.rpc("study_parent_delete_student_token", {
                p_project_code: (projectCode.value || "study-app").trim(),
                p_parent_token: tok,
                p_student_id:   studentId,
                p_confirm_name: String(confirmName),
                p_delete_profile: true,
              });
              if (res3.error) throw res3.error;
              if (!res3.data || !res3.data.ok) { status.textContent = "Delete failed: " + ((res3.data && res3.data.error) || "unknown"); return; }
              status.textContent = "Deleted " + studentId + ".";
              await loadData();
            } catch (e) { status.textContent = "Delete error: " + (e && e.message ? e.message : String(e)); }
          });
        });

        if (!window.__parentMenuDocBound) {
          window.__parentMenuDocBound = true;
          document.addEventListener("click", function () {
            studentCards.querySelectorAll(".menu-panel").forEach(function (p) { p.hidden = true; });
            studentCards.querySelectorAll(".student-menu-toggle").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
          });
        }
      }
      status.textContent = "Loaded " + students.length + " student(s). Generated at " + fmt(data.generated_at) + ".";
    } catch (e) {
      status.textContent = "Error: " + (e && e.message ? e.message : String(e));
    }
  }

  btnSetup.onclick   = setupKeys;
  btnRefresh.onclick = loadData;

  var initialToken = loadToken();
  if (initialToken) {
    rememberCode.checked = true;
    loadData();
  } else {
    setTimeout(function () {
      if ((parentCode.value || "").trim()) loadData();
    }, 150);
  }
})();
