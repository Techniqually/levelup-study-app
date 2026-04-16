
function addXp(deltaXp, meta) {
    if (!deltaXp) return;
    if (
      meta &&
      meta.topicId != null &&
      String(meta.activityType || "").startsWith("quiz") &&
      ensureTopicFarmLock(meta.topicId)
    ) {
      const status = document.getElementById("sync-status");
      if (status) status.textContent = topicLockMessage(meta.topicId);
      return;
    }
    if (meta && meta.topicId != null) {
      touchTopicStats(meta.topicId).lastStudiedAt = Date.now();
    }
    const entry = {
      clientEventId: `xp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: Date.now(),
      subjectId: SUBJECT_ID,
      topicId: meta && meta.topicId != null ? String(meta.topicId) : null,
      theme:
        (meta && meta.theme) ||
        ((meta && meta.topicId != null && getTopicMeta(meta.topicId)) || {})
          .theme ||
        "",
      tab: (meta && meta.tab) || route.tab || null,
      activityType: (meta && meta.activityType) || "study",
      sourceId: (meta && meta.sourceId) || null,
      deltaXp: 0,
      reason: (meta && meta.reason) || "manual",
    };
    let adjusted = deltaXp;
    const requestedMult =
      meta && typeof meta.xpMultiplier === "number"
        ? Math.max(0, meta.xpMultiplier)
        : 1;
    if (requestedMult !== 1 && adjusted > 0) {
      adjusted = Math.max(1, Math.round(adjusted * requestedMult));
    }
    const repeatMult = getRepeatAttemptMultiplier(meta);
    if (repeatMult < 1 && adjusted > 0) {
      adjusted = Math.max(1, Math.round(adjusted * repeatMult));
      entry.reason += "_repeat_reduced";
      const status = document.getElementById("sync-status");
      if (status) {
        status.textContent =
          "XP is slightly reduced for repeating the same chapter too much in a short time. Try another chapter for full XP.";
      }
    }
    const rateLimit = getXpRateLimit(entry.activityType);
    if (rateLimit && adjusted > 0) {
      const recentEntries = getRecentXpEntriesByActivity(
        entry.activityType,
        rateLimit.windowMs
      );
      const gainedRecently = recentEntries.reduce(
        (sum, item) => sum + Number(item.deltaXp || 0),
        0
      );
      const remaining = Math.max(0, rateLimit.maxXp - gainedRecently);
      adjusted = Math.min(adjusted, remaining);
      if (remaining === 0) entry.reason += "_cap_blocked";
      else if (adjusted < deltaXp) entry.reason += "_cap_reduced";
      if (remaining === 0) {
        const oldestTs = recentEntries.length ? Number(recentEntries[0].ts || 0) : Date.now();
        const waitMs = Math.max(0, oldestTs + rateLimit.windowMs - Date.now());
        showXpPauseHint(entry.activityType, waitMs);
      }
    }
    if (adjusted <= 0) return;
    entry.deltaXp = adjusted;
    state.xp += adjusted;
    state.xpLedger.push(entry);
    if (progressStore && progressStore.hasClient()) {
      progressStore.recordXp(entry);
    }
    saveState();
    window.dispatchEvent(new CustomEvent("levelup:xp-gained", { detail: { deltaXp: entry.deltaXp, entry: entry } }));
  }

  function spendXp(deltaXp, meta) {
    if (!deltaXp) return;
    const entry = {
      clientEventId: `xp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: Date.now(),
      subjectId: SUBJECT_ID,
      topicId: meta && meta.topicId != null ? String(meta.topicId) : null,
      theme: (meta && meta.theme) || "",
      tab: (meta && meta.tab) || route.tab || null,
      activityType: (meta && meta.activityType) || "purchase",
      sourceId: (meta && meta.sourceId) || null,
      deltaXp: -Math.abs(deltaXp),
      reason: (meta && meta.reason) || "purchase",
    };
    state.xp -= Math.abs(deltaXp);
    state.xpLedger.push(entry);
    if (progressStore && progressStore.hasClient()) {
      progressStore.recordXp(entry);
    }
    saveState();
  }

  function buildSyncSnapshot() {
    return {
      schema: "study-audit-v1",
      student: {
        id: state.syncShape.studentId,
        subjectId: SUBJECT_ID,
      },
      xpLedger: state.xpLedger || [],
      purchases: state.purchaseLedger || [],
      questionStats: state.questionStats || {},
      topicStats: state.topicStats || {},
      dailyChallenge: state.dailyChallenge || {},
    };
  }
