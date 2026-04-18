
function stopAndAwardTime() {
    if (!timeTracker.topicId || !timeTracker.tab || !timeTracker.startedAt) return;
    const topicId = timeTracker.topicId;
    const tab = timeTracker.tab;
    const elapsedMs = Date.now() - timeTracker.startedAt;
    timeTracker = { topicId: null, tab: null, startedAt: 0 };

    if (!elapsedMs || elapsedMs < 1000) return;

    state.studyTimeMsByTopicTab[topicId] =
      state.studyTimeMsByTopicTab[topicId] || {};
    state.studyTimeMsByTopicTab[topicId][tab] =
      (state.studyTimeMsByTopicTab[topicId][tab] || 0) + elapsedMs;
    touchTopicStats(topicId).lastStudiedAt = Date.now();

    const rule = TIME_XP[tab];
    if (!rule || rule.msPerXp <= 0 || rule.capXp <= 0) {
      saveState();
      return;
    }

    const rawXp = Math.floor(elapsedMs / rule.msPerXp);
    if (rawXp <= 0) return;

    state.timeXpEarnedByTopicTab[topicId] =
      state.timeXpEarnedByTopicTab[topicId] || {};
    const earned = state.timeXpEarnedByTopicTab[topicId][tab] || 0;
    const remaining = Math.max(0, rule.capXp - earned);
    const earnedXp = Math.min(rawXp, remaining);

    if (earnedXp > 0) {
      state.timeXpEarnedByTopicTab[topicId][tab] = earned + earnedXp;
      addXp(earnedXp, {
        topicId,
        tab,
        activityType: `time_${tab}`,
        sourceId: `time:${topicId}:${tab}`,
        reason: `time_${tab}`,
      });
      return;
    }
    saveState();
  }

  function startTime(topicId, tab) {
    if (!topicId || !tab) return;
    timeTracker.topicId = topicId;
    timeTracker.tab = tab;
    timeTracker.startedAt = Date.now();
  }
