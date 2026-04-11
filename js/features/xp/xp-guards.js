
function summarizeRecentStudyEvidence(windowMs) {
    const cutoff = Date.now() - (windowMs || PURCHASE_EVIDENCE_WINDOW_MS);
    const grouped = {};
    (state.xpLedger || []).forEach((entry) => {
      if (!entry || entry.deltaXp <= 0 || entry.ts < cutoff) return;
      const key = `${entry.subjectId || SUBJECT_ID}|${entry.topicId || "general"}|${
        entry.activityType || "study"
      }`;
      if (!grouped[key]) {
        grouped[key] = {
          subjectId: entry.subjectId || SUBJECT_ID,
          topicId: entry.topicId || null,
          theme: entry.theme || "",
          activityType: entry.activityType || "study",
          totalXp: 0,
          count: 0,
        };
      }
      grouped[key].totalXp += entry.deltaXp;
      grouped[key].count += 1;
    });
    return Object.values(grouped)
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, 10);
  }

  function getXpRateLimit(activityType) {
    if (!ENABLE_ACTIVITY_XP_CAP) return null;
    if (XP_RATE_LIMITS[activityType]) return XP_RATE_LIMITS[activityType];
    if (String(activityType || "").startsWith("game_")) return XP_RATE_LIMITS.game_tf;
    return null;
  }

  function sumRecentXpBy(predicate, windowMs) {
    const cutoff = Date.now() - windowMs;
    return (state.xpLedger || []).reduce((sum, entry) => {
      if (!entry || entry.ts < cutoff || entry.deltaXp <= 0) return sum;
      if (!predicate(entry)) return sum;
      return sum + entry.deltaXp;
    }, 0);
  }

  function getRecentXpEntriesByActivity(activityType, windowMs) {
    const cutoff = Date.now() - windowMs;
    return (state.xpLedger || [])
      .filter(
        (entry) =>
          entry &&
          entry.deltaXp > 0 &&
          entry.ts >= cutoff &&
          String(entry.activityType || "") === String(activityType || "")
      )
      .sort((a, b) => a.ts - b.ts);
  }

  function getRecentTopicQuizXp(topicId, windowMs) {
    const cutoff = Date.now() - windowMs;
    return (state.xpLedger || []).reduce((sum, entry) => {
      if (!entry || entry.deltaXp <= 0 || entry.ts < cutoff) return sum;
      if (String(entry.topicId || "") !== String(topicId || "")) return sum;
      if (!String(entry.activityType || "").startsWith("quiz")) return sum;
      return sum + Number(entry.deltaXp || 0);
    }, 0);
  }

  function isTopicXpLocked(topicId) {
    if (topicId == null) return false;
    return isCooldownActive(touchTopicStats(topicId).xpLockUntil || 0);
  }

  function ensureTopicFarmLock(topicId) {
    if (topicId == null) return false;
    const tStats = touchTopicStats(topicId);
    if (isCooldownActive(tStats.xpLockUntil || 0)) return true;
    const recentQuizXp = getRecentTopicQuizXp(topicId, TOPIC_FARM_LOCK_WINDOW_MS);
    if (recentQuizXp >= TOPIC_FARM_LOCK_TRIGGER_XP) {
      tStats.xpLockUntil = Date.now() + TOPIC_FARM_LOCK_MS;
      saveState();
      return true;
    }
    return false;
  }

  
  function getActivityLabel(activityType) {
    const a = String(activityType || "");
    if (a.startsWith("quiz_review")) return "Quiz (review)";
    if (a.startsWith("quiz")) return "Quiz";
    if (a.startsWith("flash")) return "Flashcards";
    if (a.startsWith("game_")) return "Games";
    return "Study";
  }

  function topicLockMessage(topicId) {
    const tStats = touchTopicStats(topicId);
    const remainingMs = Math.max(0, Number(tStats.xpLockUntil || 0) - Date.now());
    return `XP for this chapter is paused for ${formatMsShort(
      remainingMs
    )} because this chapter was repeated too much in a short time. Try another chapter for full XP.`;
  }

  function showXpPauseHint(activityType, waitMs) {
    const msg = `XP pause for ${getActivityLabel(activityType)}: try again in ${formatMsShort(waitMs)}.`;
    const status = document.getElementById("sync-status");
    if (status) status.textContent = msg;
    const xpPill = document.getElementById("stat-xp");
    if (xpPill) xpPill.title = msg;
  }

  function getRecentActivityCoverage(windowMs) {
    const cutoff = Date.now() - windowMs;
    const seen = { quiz: false, flash: false, game: false };
    let distinctTopics = new Set();
    (state.xpLedger || []).forEach((entry) => {
      if (!entry || entry.deltaXp <= 0 || entry.ts < cutoff) return;
      const a = String(entry.activityType || "");
      if (a.startsWith("quiz")) seen.quiz = true;
      else if (a.startsWith("flash")) seen.flash = true;
      else if (a.startsWith("game_")) seen.game = true;
      if (entry.topicId) distinctTopics.add(String(entry.topicId));
    });
    return { ...seen, topicCount: distinctTopics.size };
  }
