
function formatMinutes(ms) {
    const mins = Math.round((ms || 0) / 60000);
    return `${mins} min`;
  }


  function buildStudyReport() {
    const xpByTopic = {};
    const recentXp = (state.xpLedger || [])
      .slice()
      .sort((a, b) => b.ts - a.ts);
    recentXp.forEach((entry) => {
      if (!entry || entry.deltaXp <= 0) return;
      const topicId = entry.topicId || "general";
      const topicMeta = topicId === "general" ? null : getTopicMeta(topicId);
      const label = topicMeta ? `T${topicId} ${topicMeta.title}` : "General";
      if (!xpByTopic[label]) {
        xpByTopic[label] = { label, totalXp: 0, byActivity: {} };
      }
      xpByTopic[label].totalXp += entry.deltaXp;
      const activity = entry.activityType || "study";
      xpByTopic[label].byActivity[activity] =
        (xpByTopic[label].byActivity[activity] || 0) + entry.deltaXp;
    });
    const xpTopicRows = Object.values(xpByTopic)
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, 10);

    const missRows = [];
    Object.keys(state.questionStats || {}).forEach((topicId) => {
      const topicMeta = getTopicMeta(topicId);
      Object.entries(state.questionStats[topicId] || {}).forEach(([key, stats]) => {
        if (!stats || !stats.wrongs) return;
        missRows.push({
          topicId,
          topicTitle: topicMeta ? topicMeta.title : topicId,
          questionKey: key,
          wrongs: stats.wrongs || 0,
          mastery: Math.round(stats.mastery || 0),
        });
      });
    });
    missRows.sort((a, b) => b.wrongs - a.wrongs || a.mastery - b.mastery);

    const topicRows = Object.keys(state.topicStats || {})
      .map((topicId) => {
        const stats = touchTopicStats(topicId);
        const meta = getTopicMeta(topicId);
        return {
          topicId,
          title: meta ? meta.title : topicId,
          mastery: Math.round(stats.mastery || 0),
          lastStudiedAt: stats.lastStudiedAt || 0,
          masteredUntil: stats.masteredUntil || 0,
          errorFreeRounds: stats.errorFreeRounds || 0,
          totalWrong: stats.totalWrong || 0,
        };
      })
      .sort(
        (a, b) =>
          Number(isCooldownActive(b.masteredUntil)) -
            Number(isCooldownActive(a.masteredUntil)) ||
          b.mastery - a.mastery
      );

    const studyTimeRows = Object.keys(state.studyTimeMsByTopicTab || {})
      .map((topicId) => {
        const perTab = state.studyTimeMsByTopicTab[topicId] || {};
        const totalMs = Object.values(perTab).reduce((sum, v) => sum + (v || 0), 0);
        const meta = getTopicMeta(topicId);
        return {
          topicId,
          title: meta ? meta.title : topicId,
          totalMs,
          perTab,
        };
      })
      .sort((a, b) => b.totalMs - a.totalMs)
      .slice(0, 10);

    const purchases = (state.purchaseLedger || [])
      .slice()
      .sort((a, b) => b.ts - a.ts);

    const anomalyFlags = [];
    const last24hXp = sumRecentXpBy(() => true, 1000 * 60 * 60 * 24);
    const last24hQuizXp = sumRecentXpBy(
      (entry) => String(entry.activityType || "").startsWith("quiz"),
      1000 * 60 * 60 * 24
    );
    const masteredAnswered = Object.values(state.questionStats || {}).reduce(
      (sum, byQ) =>
        sum +
        Object.values(byQ || {}).filter(
          (s) => (s && s.recentCorrectRun >= 3 && (s.mastery || 0) >= 85) || isCooldownActive(s.masteredUntil)
        ).length,
      0
    );
    if (last24hXp >= 220 && last24hQuizXp < 50) {
      anomalyFlags.push("High XP but low quiz contribution in last 24h.");
    }
    if (masteredAnswered >= 25) {
      anomalyFlags.push("Many mastered questions repeated recently; possible farming loop.");
    }
    const fastGuessCount = (state.xpLedger || []).filter(
      (e) =>
        e &&
        e.deltaXp > 0 &&
        e.ts >= Date.now() - 1000 * 60 * 60 * 24 &&
        String(e.reason || "").includes("_very_fast")
    ).length;
    if (fastGuessCount >= 15) {
      anomalyFlags.push("Many very-fast quiz answers in last 24h; XP was auto-reduced.");
    }
    const dominantTopic = reportDominantTopicFromLedger();
    if (dominantTopic && dominantTopic.share >= 0.75 && dominantTopic.totalXp >= 120) {
      anomalyFlags.push(
        `XP highly concentrated in one topic (${dominantTopic.topicLabel}, ${Math.round(
          dominantTopic.share * 100
        )}%).`
      );
    }

    const passThreshold = PASS_PCT;
    // Topics in-subject are always unlocked now (entitlement gate lives on the
    // subject page, not here). This list is intentionally empty but kept in
    // the report payload for backwards-compatibility with any exporters.
    const lockedTopics = [];
    const xpPausedTopics = manifest
      .map((m) => {
        const stats = touchTopicStats(m.id);
        const until = Number(stats.xpLockUntil || 0);
        if (!isCooldownActive(until)) return null;
        return {
          id: m.id,
          title: m.title,
          xpLockUntil: until,
        };
      })
      .filter(Boolean);
    const lockDiagnostics = {
      passThreshold,
      lockedTopics,
      xpPausedTopics,
    };

    return {
      generatedAt: new Date().toISOString(),
      subjectId: SUBJECT_ID,
      xpBalance: state.xp || 0,
      ledgerCount: (state.xpLedger || []).length,
      purchaseCount: purchases.length,
      xpTopicRows,
      missRows: missRows.slice(0, 12),
      topicRows,
      studyTimeRows,
      purchases,
      recentXp: recentXp.slice(0, 20),
      anomalyFlags,
      dailyChallenge: getDailyChallengeSummary(),
      syncSnapshot: buildSyncSnapshot(),
      lockDiagnostics,
    };
  }

  function reportDominantTopicFromLedger() {
    const recent = (state.xpLedger || []).filter(
      (e) => e && e.deltaXp > 0 && e.ts >= Date.now() - 1000 * 60 * 60 * 24
    );
    const totals = {};
    let totalXp = 0;
    recent.forEach((entry) => {
      const key = String(entry.topicId || "general");
      totals[key] = (totals[key] || 0) + entry.deltaXp;
      totalXp += entry.deltaXp;
    });
    if (!totalXp) return null;
    const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
    if (!top) return null;
    const meta = top[0] === "general" ? null : getTopicMeta(top[0]);
    return {
      topicId: top[0],
      topicLabel: meta ? `T${top[0]} ${meta.title}` : "General",
      totalXp: top[1],
      share: top[1] / totalXp,
    };
  }

  function renderStudyReportHtml(report) {
    const xpList = report.xpTopicRows.length
      ? `<ol class="report-list">${report.xpTopicRows
          .map(
            (row) =>
              `<li><strong>${escapeHtml(row.label)}</strong> · ${row.totalXp} XP · ${escapeHtml(
                Object.entries(row.byActivity)
                  .map(([k, v]) => `${k} ${v}`)
                  .join(" · ")
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No XP entries yet.</p>";

    const missList = report.missRows.length
      ? `<ol class="report-list">${report.missRows
          .map(
            (row) =>
              `<li><strong>T${escapeHtml(row.topicId)} ${escapeHtml(
                row.topicTitle
              )}</strong> · wrong ${row.wrongs} · mastery ${row.mastery}% · ${escapeHtml(
                row.questionKey.split("::").slice(1).join("::") || row.questionKey
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No repeated misses yet.</p>";

    const topicList = report.topicRows.length
      ? `<ol class="report-list">${report.topicRows
          .map(
            (row) =>
              `<li><strong>T${escapeHtml(row.topicId)} ${escapeHtml(
                row.title
              )}</strong> · mastery ${row.mastery}% · wrong ${row.totalWrong} · ${
                isCooldownActive(row.masteredUntil)
                  ? `cooling until ${escapeHtml(formatShortDate(row.masteredUntil))}`
                  : `last studied ${escapeHtml(
                      formatShortDate(row.lastStudiedAt) || "n/a"
                    )}`
              }</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No topic stats yet.</p>";

    const timeList = report.studyTimeRows.length
      ? `<ol class="report-list">${report.studyTimeRows
          .map(
            (row) =>
              `<li><strong>T${escapeHtml(row.topicId)} ${escapeHtml(
                row.title
              )}</strong> · ${formatMinutes(row.totalMs)} · ${escapeHtml(
                Object.entries(row.perTab)
                  .map(([tab, ms]) => `${tab} ${formatMinutes(ms)}`)
                  .join(" · ")
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No tracked study time yet.</p>";

    const purchaseList = report.purchases.length
      ? `<ol class="report-list">${report.purchases
          .map(
            (purchase) =>
              `<li><strong>${escapeHtml(purchase.label)}</strong> · spent ${
                purchase.xpSpent
              } XP · balance ${purchase.balanceBefore} → ${
                purchase.balanceAfter
              } · evidence ${escapeHtml(
                ((purchase.studyEvidenceWindow || []).slice(0, 3) || [])
                  .map((item) =>
                    `${item.topicId ? "T" + item.topicId : "general"} ${
                      item.activityType
                    } ${item.totalXp} XP`
                  )
                  .join(" | ") || "none"
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No purchases yet.</p>";

    const recentList = report.recentXp.length
      ? `<ol class="report-list">${report.recentXp
          .map(
            (entry) =>
              `<li>${escapeHtml(formatShortDate(entry.ts))} · ${
                entry.deltaXp > 0 ? "+" : ""
              }${entry.deltaXp} XP · ${escapeHtml(entry.reason || entry.activityType || "study")} · ${
                entry.topicId ? "T" + escapeHtml(entry.topicId) : "general"
              }</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No recent activity yet.</p>";
    const anomalyList = report.anomalyFlags && report.anomalyFlags.length
      ? `<ul class="report-list">${report.anomalyFlags
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`
      : "<p class='hint'>No anomaly flags detected.</p>";
    const lockInfo = report.lockDiagnostics || {};
    const xpPauseList = lockInfo.xpPausedTopics && lockInfo.xpPausedTopics.length
      ? `<ul class="report-list">${lockInfo.xpPausedTopics
          .map(
            (row) =>
              `<li>T${escapeHtml(row.id)} ${escapeHtml(row.title)} · XP paused until ${escapeHtml(
                formatShortDate(row.xpLockUntil)
              )}</li>`
          )
          .join("")}</ul>`
      : "<p class='hint'>No XP-paused chapters right now.</p>";

    return `
      <div class="report-grid">
        <div class="report-card">
          <h3>Overview</h3>
          <div class="report-statline">
            <span class="report-chip">XP balance ${report.xpBalance}</span>
            <span class="report-chip">XP events ${report.ledgerCount}</span>
            <span class="report-chip">Purchases ${report.purchaseCount}</span>
            <span class="report-chip">Daily quiz ${report.dailyChallenge.answered}/${DAILY_CHALLENGE.answered}</span>
          </div>
        </div>
        <div class="report-card">
          <h3>XP By Topic And Activity</h3>
          ${xpList}
        </div>
        <div class="report-card">
          <h3>Most Missed Questions</h3>
          ${missList}
        </div>
        <div class="report-card">
          <h3>Mastery And Cooldowns</h3>
          ${topicList}
        </div>
        <div class="report-card">
          <h3>Study Time</h3>
          ${timeList}
        </div>
        <div class="report-card">
          <h3>Purchases And Evidence</h3>
          ${purchaseList}
        </div>
        <div class="report-card">
          <h3>Recent Activity</h3>
          ${recentList}
        </div>
        <div class="report-card">
          <h3>Anomaly Flags</h3>
          ${anomalyList}
        </div>
        <div class="report-card">
          <h3>Lock Diagnostics</h3>
          <p class="hint">Pass threshold: <strong>${lockInfo.passThreshold || PASS_PCT}%</strong></p>
          <h4>XP-paused chapters</h4>
          ${xpPauseList}
        </div>
      </div>`;
  }

  function buildStudyReportText(report) {
    const lines = [
      `Study report for ${SUBJECT_TITLE}`,
      `Generated: ${report.generatedAt}`,
      `XP balance: ${report.xpBalance}`,
      `XP events: ${report.ledgerCount}`,
      `Purchases: ${report.purchaseCount}`,
      "",
      "Top XP sources:",
    ];
    report.xpTopicRows.forEach((row) => {
      lines.push(`- ${row.label}: ${row.totalXp} XP`);
    });
    lines.push("", "Most missed questions:");
    report.missRows.forEach((row) => {
      lines.push(
        `- T${row.topicId} ${row.topicTitle}: wrong ${row.wrongs}, mastery ${row.mastery}%`
      );
    });
    lines.push("", "Topic cooldowns:");
    report.topicRows
      .filter((row) => isCooldownActive(row.masteredUntil))
      .forEach((row) => {
        lines.push(
          `- T${row.topicId} ${row.title}: cooling until ${formatShortDate(
            row.masteredUntil
          )}`
        );
      });
    lines.push("", "Purchases:");
    report.purchases.forEach((purchase) => {
      lines.push(
        `- ${purchase.label}: spent ${purchase.xpSpent} XP, balance ${purchase.balanceBefore} -> ${purchase.balanceAfter}`
      );
    });
    lines.push("", "Anomaly flags:");
    if (report.anomalyFlags && report.anomalyFlags.length) {
      report.anomalyFlags.forEach((flag) => lines.push(`- ${flag}`));
    } else {
      lines.push("- none");
    }
    lines.push("", "Lock diagnostics:");
    lines.push(
      `- passThreshold: ${
        (report.lockDiagnostics && report.lockDiagnostics.passThreshold) || PASS_PCT
      }%`
    );
    const paused = (report.lockDiagnostics && report.lockDiagnostics.xpPausedTopics) || [];
    if (paused.length) {
      paused.forEach((row) => {
        lines.push(
          `- XP paused T${row.id} ${row.title} until ${formatShortDate(row.xpLockUntil)}`
        );
      });
    } else {
      lines.push("- XP-paused chapters: none");
    }
    return lines.join("\n");
  }

  async function openReport() {
    const root = document.getElementById("modal-root");
    const panel = document.getElementById("panel-report");
    if (!root || !panel) {
      // Subject-page report modal removed; redirect to the global profile page
      // where the redesigned report lives (phase 7).
      window.location.href = "profile.html#report";
      return;
    }
    var pShop = document.getElementById("panel-shop");
    if (pShop) pShop.hidden = true;
    var pExp = document.getElementById("panel-explain");
    if (pExp) pExp.hidden = true;
    let report = buildStudyReport();
    if (progressStore && progressStore.hasClient()) {
      const merged = await progressStore.fetchReportWithFallback(
        report,
        (topicId) => getTopicMeta(topicId)
      );
      if (merged && merged.report) report = merged.report;
    }
    document.getElementById("report-body").innerHTML = renderStudyReportHtml(report);
    document.getElementById("report-export-output").value = "";
    panel.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");

    document.getElementById("btn-report-text").onclick = async () => {
      let latest = buildStudyReport();
      if (progressStore && progressStore.hasClient()) {
        const merged = await progressStore.fetchReportWithFallback(
          latest,
          (topicId) => getTopicMeta(topicId)
        );
        if (merged && merged.report) latest = merged.report;
      }
      document.getElementById("report-export-output").value =
        buildStudyReportText(latest);
    };
    document.getElementById("btn-report-json").onclick = async () => {
      let latest = buildStudyReport();
      if (progressStore && progressStore.hasClient()) {
        const merged = await progressStore.fetchReportWithFallback(
          latest,
          (topicId) => getTopicMeta(topicId)
        );
        if (merged && merged.report) latest = merged.report;
      }
      document.getElementById("report-export-output").value = JSON.stringify(
        latest,
        null,
        2
      );
    };
  }
