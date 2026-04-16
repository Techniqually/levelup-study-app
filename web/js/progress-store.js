(function () {
  const MIGRATION_SUFFIX = "supabase_migrated_v1";
  const SNAPSHOT_DEBOUNCE_MS = 8000;
  const TOPIC_SYNC_DEBOUNCE_MS = 6000;

  const state = {
    subjectId: "chemistry",
    storageKey: "",
    inited: false,
    snapshotTimer: null,
    topicTimer: null,
    digestTimer: null,
    digestHiddenTimer: null,
    lastError: "",
  };

  var digestInFlight = false;

  function hasClient() {
    return !!(window.LevelupSupabase && window.LevelupSupabase.isEnabled());
  }

  function init(opts) {
    state.subjectId = String((opts && opts.subjectId) || "chemistry");
    state.storageKey = String((opts && opts.storageKey) || "");
    state.inited = true;
    if (!hasClient()) return false;
    window.LevelupSupabase.ensureContext().catch((e) => {
      state.lastError = (e && e.message) || String(e || "ensure_context_failed");
    });
    if (!window.__levelupReportDigestVisBound) {
      window.__levelupReportDigestVisBound = true;
      document.addEventListener("visibilitychange", function () {
        if (!hasClient()) return;
        if (document.visibilityState !== "hidden") return;
        clearTimeout(state.digestHiddenTimer);
        var delay =
          typeof REPORT_DIGEST_HIDDEN_DELAY_MS === "number"
            ? REPORT_DIGEST_HIDDEN_DELAY_MS
            : 2000;
        state.digestHiddenTimer = setTimeout(function () {
          state.digestHiddenTimer = null;
          if (document.visibilityState !== "hidden") return;
          flushReportDigest("hidden");
        }, delay);
      });
    }
    return true;
  }

  function migrationKey() {
    return `${state.storageKey || "levelup"}_${MIGRATION_SUFFIX}`;
  }

  function safe(fn) {
    return Promise.resolve()
      .then(fn)
      .catch((e) => {
        state.lastError = (e && e.message) || String(e || "unknown_error");
        return null;
      });
  }

  async function ensureReady() {
    if (!hasClient()) return { ok: false, error: "supabase_not_configured" };
    const res = await window.LevelupSupabase.testConnection();
    if (!res.ok) state.lastError = res.error || "connection_failed";
    else state.lastError = "";
    return res;
  }

  function scheduleSnapshot(portableState) {
    if (!hasClient()) return;
    clearTimeout(state.snapshotTimer);
    state.snapshotTimer = setTimeout(() => {
      safe(() => window.LevelupSupabase.logStateSnapshot(portableState));
    }, SNAPSHOT_DEBOUNCE_MS);
  }

  function scheduleTopicStats(topicStats) {
    if (!hasClient()) return;
    clearTimeout(state.topicTimer);
    state.topicTimer = setTimeout(() => {
      safe(() => window.LevelupSupabase.upsertTopicStats(state.subjectId, topicStats || {}));
    }, TOPIC_SYNC_DEBOUNCE_MS);
  }

  function recordXp(entry) {
    if (!hasClient()) return;
    safe(() => window.LevelupSupabase.insertXpEntry(entry));
  }

  async function syncXpEntry(entry) {
    if (!hasClient()) return { ok: false, reason: "disabled" };
    const res = await safe(() => window.LevelupSupabase.insertXpEntry(entry));
    return res || { ok: false, reason: state.lastError || "sync_failed" };
  }

  function recordPurchase(purchase) {
    if (!hasClient()) return;
    safe(() => window.LevelupSupabase.insertPurchase(purchase));
  }

  async function purchaseRewardServer(params) {
    if (!hasClient()) return { ok: false, reason: "disabled" };
    return window.LevelupSupabase.purchaseReward(params);
  }

  async function fetchDailyCounts() {
    if (!hasClient()) return null;
    return safe(() => window.LevelupSupabase.getDailyCounts());
  }

  async function fetchShopSnapshot() {
    if (!hasClient()) return null;
    return safe(() => window.LevelupSupabase.getShopSnapshot());
  }

  async function reconcileLocalPurchases(localPurchases) {
    if (!hasClient()) return { ok: false, reason: "disabled" };
    const snapshot = await fetchShopSnapshot();
    const recent = Array.isArray(snapshot && snapshot.coupons_recent) ? snapshot.coupons_recent : [];
    // If server already has purchase history, do not backfill local purchases.
    // This avoids creating duplicate rows because purchase RPC already inserts server rows.
    if (recent.length > 0) return { ok: true, skipped: "server_has_history" };
    const existingIds = new Set(
      recent
        .map((row) => String(row && row.client_purchase_id ? row.client_purchase_id : ""))
        .filter(Boolean)
    );
    const rows = Array.isArray(localPurchases) ? localPurchases : [];
    for (const row of rows) {
      if (!row || !row.id || existingIds.has(String(row.id))) continue;
      await safe(() =>
        window.LevelupSupabase.insertPurchase({
          ...row,
          clientPurchaseId: row.id,
        })
      );
    }
    return { ok: true };
  }

  async function migrateFromLocalState(localState, opts) {
    if (!hasClient() || !state.inited || !state.storageKey) return { ok: false, reason: "disabled" };
    const force = !!(opts && opts.force);
    try {
      if (!force && localStorage.getItem(migrationKey()) === "1") return { ok: true, already: true };
    } catch (_) {}
    const s = localState || {};
    const xpRows = Array.isArray(s.xpLedger) ? s.xpLedger.slice(0, 1200) : [];
    const purchases = Array.isArray(s.purchaseLedger) ? s.purchaseLedger.slice(0, 400) : [];

    await safe(() => window.LevelupSupabase.upsertTopicStats(state.subjectId, s.topicStats || {}));
    await safe(() => window.LevelupSupabase.logStateSnapshot(s));

    for (let i = 0; i < xpRows.length; i += 100) {
      const chunk = xpRows.slice(i, i + 100);
      await Promise.all(chunk.map((entry) => safe(() => window.LevelupSupabase.insertXpEntry(entry))));
    }
    for (let i = 0; i < purchases.length; i += 50) {
      const chunk = purchases.slice(i, i + 50);
      await Promise.all(chunk.map((row) => safe(() => window.LevelupSupabase.insertPurchase(row))));
    }
    if (!force) {
      try {
        localStorage.setItem(migrationKey(), "1");
      } catch (_) {}
    }
    return { ok: true };
  }

  function topicLabel(topicId, resolver) {
    const meta = resolver ? resolver(topicId) : null;
    return meta ? `T${topicId} ${meta.title}` : `T${topicId}`;
  }

  async function fetchReportWithFallback(localReport, resolver) {
    if (!hasClient()) return { report: localReport, source: "local" };
    const remote = await safe(() => window.LevelupSupabase.fetchReportData(state.subjectId));
    if (!remote) return { report: localReport, source: "local" };

    const xpByTopic = {};
    (remote.xpLedger || []).forEach((row) => {
      const meta = row.meta || {};
      const delta = Number(row.delta || 0);
      if (delta <= 0) return;
      const topicId = String(meta.topicId || "general");
      const label = topicId === "general" ? "General" : topicLabel(topicId, resolver);
      if (!xpByTopic[label]) xpByTopic[label] = { label, totalXp: 0, byActivity: {} };
      xpByTopic[label].totalXp += delta;
      const act = String(meta.activityType || "study");
      xpByTopic[label].byActivity[act] = (xpByTopic[label].byActivity[act] || 0) + delta;
    });
    const xpTopicRows = Object.values(xpByTopic)
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, 10);

    const missRows = (remote.misses || []).slice(0, 12).map((row) => ({
      topicId: String(row.topic_id),
      topicTitle: (resolver && resolver(String(row.topic_id)) && resolver(String(row.topic_id)).title) || String(row.topic_id),
      questionKey: row.question_key,
      wrongs: Number(row.miss_count || 0),
      mastery: 0,
    }));

    const topicRows = (remote.topicStats || []).map((row) => ({
      topicId: String(row.topic_id),
      title: (resolver && resolver(String(row.topic_id)) && resolver(String(row.topic_id)).title) || String(row.topic_id),
      mastery: Number(row.mastery || 0),
      lastStudiedAt: Date.parse(row.updated_at || "") || 0,
      masteredUntil: 0,
      errorFreeRounds: Number(row.streak || 0),
      totalWrong: Math.max(0, Number(row.seen || 0) - Number(row.correct || 0)),
    }));

    const purchases = (remote.purchases || []).map((row) => ({
      label: row.reward_label,
      xpSpent: Number(row.xp_cost || 0),
      balanceBefore: 0,
      balanceAfter: 0,
      date: String((row.purchased_at || "").slice(0, 10)),
    }));

    const report = {
      ...localReport,
      generatedAt: new Date().toISOString(),
      xpTopicRows: xpTopicRows.length ? xpTopicRows : localReport.xpTopicRows,
      missRows: missRows.length ? missRows : localReport.missRows,
      topicRows: topicRows.length ? topicRows : localReport.topicRows,
      purchases: purchases.length ? purchases : localReport.purchases,
      ledgerCount: (remote.xpLedger || []).length || localReport.ledgerCount,
      purchaseCount: purchases.length || localReport.purchaseCount,
      syncSnapshot: {
        ...(localReport.syncSnapshot || {}),
        storage: "supabase+local",
      },
    };
    return { report, source: "supabase" };
  }

  function digestMetaKey() {
    return (state.storageKey || "levelup_unknown") + "_report_digest_v1";
  }

  function digestFingerprintFromPortable(ps) {
    if (!ps || typeof ps !== "object") return "";
    return [
      Number(ps.xp || 0),
      Array.isArray(ps.xpLedger) ? ps.xpLedger.length : 0,
      ps.topicStats ? Object.keys(ps.topicStats).length : 0,
      Array.isArray(ps.purchaseLedger) ? ps.purchaseLedger.length : 0,
    ].join("|");
  }

  function localCalendarDateKey() {
    var d = new Date();
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  async function tryUploadStudyReportDigest(reason) {
    if (!hasClient() || digestInFlight) return null;
    if (typeof window.LevelupSupabase.logStudyReportDigest !== "function") return null;
    if (typeof buildStudyReport !== "function" || typeof buildStudyReportText !== "function") return null;
    if (typeof portableState !== "function") return null;
    var ps = portableState();
    var fp = digestFingerprintFromPortable(ps);
    var today = localCalendarDateKey();
    var metaKey = digestMetaKey();
    var meta = {};
    try {
      meta = JSON.parse(localStorage.getItem(metaKey) || "{}") || {};
    } catch (_) {
      meta = {};
    }
    if (meta.date !== today) meta = { date: today, lastFp: "", uploads: 0 };
    if (meta.date === today && meta.lastFp === fp && meta.uploads >= 1) {
      return { ok: true, skipped: "same_fingerprint_today" };
    }
    var cap =
      typeof REPORT_DIGEST_MAX_UPLOADS_PER_DAY === "number"
        ? REPORT_DIGEST_MAX_UPLOADS_PER_DAY
        : 3;
    if (meta.date === today && Number(meta.uploads || 0) >= cap) {
      return { ok: true, skipped: "daily_upload_cap" };
    }

    digestInFlight = true;
    try {
      var report = buildStudyReport();
      var resolver =
        typeof getTopicMeta === "function"
          ? getTopicMeta
          : function () {
              return null;
            };
      var merged = await fetchReportWithFallback(report, resolver);
      var r = merged && merged.report ? merged.report : report;
      var fullText = buildStudyReportText(r);
      var max =
        typeof REPORT_DIGEST_TEXT_MAX_CHARS === "number"
          ? REPORT_DIGEST_TEXT_MAX_CHARS
          : 6000;
      var text = String(fullText || "").slice(0, max);
      var sid = typeof SUBJECT_ID !== "undefined" ? SUBJECT_ID : state.subjectId;
      var stitle = typeof SUBJECT_TITLE !== "undefined" ? SUBJECT_TITLE : "";
      var res = await window.LevelupSupabase.logStudyReportDigest({
        text: text,
        fp: fp,
        reason: String(reason || "unknown"),
        subjectId: sid,
        subjectTitle: stitle,
        generatedAt: new Date().toISOString(),
      });
      if (res && res.ok) {
        meta.date = today;
        meta.lastFp = fp;
        meta.uploads = Number(meta.uploads || 0) + 1;
        try {
          localStorage.setItem(metaKey, JSON.stringify(meta));
        } catch (_) {}
      }
      return res;
    } finally {
      digestInFlight = false;
    }
  }

  function scheduleReportDigest(reason) {
    if (!hasClient()) return;
    clearTimeout(state.digestTimer);
    var ms =
      typeof REPORT_DIGEST_DEBOUNCE_MS === "number" ? REPORT_DIGEST_DEBOUNCE_MS : 45000;
    state.digestTimer = setTimeout(function () {
      state.digestTimer = null;
      safe(function () {
        return tryUploadStudyReportDigest(reason || "debounced");
      });
    }, ms);
  }

  function flushReportDigest(reason) {
    if (!hasClient()) return;
    clearTimeout(state.digestTimer);
    state.digestTimer = null;
    safe(function () {
      return tryUploadStudyReportDigest(reason || "flush");
    });
  }

  async function fetchBootstrapState() {
    if (!hasClient()) return null;
    const remote = await safe(() => window.LevelupSupabase.fetchReportData(state.subjectId));
    if (!remote) return null;
    const xpLedger = (remote.xpLedger || []).map((row) => ({
      deltaXp: Number(row.delta || 0),
      reason: String(row.reason || ""),
      activityType: String((row.meta && row.meta.activityType) || "study"),
      topicId: row.meta && row.meta.topicId != null ? String(row.meta.topicId) : null,
      subjectId: row.meta && row.meta.subjectId != null ? String(row.meta.subjectId) : null,
      ts: Date.parse(row.created_at || "") || Date.now(),
    }));
    const xp = xpLedger.reduce((sum, e) => sum + Number(e.deltaXp || 0), 0);
    const topicStats = {};
    (remote.topicStats || []).forEach((row) => {
      const topicId = String(row.topic_id || "");
      if (!topicId) return;
      const seen = Number(row.seen || 0);
      const correct = Number(row.correct || 0);
      topicStats[topicId] = {
        mastery: Number(row.mastery || 0),
        totalQuestionsSeen: seen,
        totalWrong: Math.max(0, seen - correct),
        errorFreeRounds: Number(row.streak || 0),
        lastStudiedAt: Date.parse(row.updated_at || "") || 0,
        masteredUntil: row.mastered_until ? Date.parse(row.mastered_until) || 0 : 0,
      };
    });
    return {
      xp,
      xpLedger,
      topicStats,
      purchaseLedgerCount: (remote.purchases || []).length,
    };
  }

  window.ProgressStore = {
    init,
    hasClient,
    scheduleSnapshot,
    scheduleReportDigest,
    flushReportDigest,
    scheduleTopicStats,
    recordXp,
    syncXpEntry,
    recordPurchase,
    purchaseRewardServer,
    fetchDailyCounts,
    fetchShopSnapshot,
    reconcileLocalPurchases,
    migrateFromLocalState,
    fetchReportWithFallback,
    fetchBootstrapState,
    ensureReady,
    getLastError: () => state.lastError,
  };
})();
