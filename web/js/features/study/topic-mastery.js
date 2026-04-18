
function getStoredTopicMastery(topicId) {
    const items = Object.values(
      (state.questionStats && state.questionStats[String(topicId)]) || {}
    );
    const topicStats = touchTopicStats(topicId);
    if (!items.length) {
      return {
        label: isCooldownActive(topicStats.masteredUntil) ? "Cooling down" : "New",
        weakCount: 0,
        avgMastery: 0,
        masteredUntil: topicStats.masteredUntil || 0,
      };
    }
    const avgMastery =
      items.reduce((sum, item) => sum + (item.mastery || 0), 0) / items.length;
    const weakCount = items.filter(
      (item) =>
        item.lastResult === "wrong" ||
        item.lastResult === "timeout" ||
        (item.mastery || 0) < 40
    ).length;
    let label = "Improving";
    if (isCooldownActive(topicStats.masteredUntil)) label = "Cooling down";
    else if (avgMastery >= 85) label = "Mastered";
    else if (avgMastery >= 60) label = "Strong";
    return {
      label,
      weakCount,
      avgMastery,
      masteredUntil: topicStats.masteredUntil || 0,
    };
  }

  function recordTopicRoundResult(t, meta) {
    if (!t || !t.id) return;
    const topicStats = touchTopicStats(t.id);
    const insight = getTopicQuizInsights(t);
    topicStats.rounds += meta.review ? 0 : 1;
    topicStats.reviewRounds += meta.review ? 1 : 0;
    topicStats.lastStudiedAt = Date.now();
    topicStats.lastQuizAt = Date.now();
    topicStats.mastery = Math.max(
      0,
      Math.min(100, Math.round(insight.avgMastery || 0))
    );
    if (meta.review) {
      if (meta.wrongCount > 0) topicStats.masteredUntil = 0;
      saveState();
      return;
    }
    if (meta.wrongCount === 0 && meta.totalQuestions >= 10) {
      topicStats.errorFreeRounds += 1;
      if (topicStats.errorFreeRounds >= 2 && topicStats.mastery >= 85) {
        topicStats.masteredUntil = Date.now() + TOPIC_MASTERY_COOLDOWN_MS;
      }
    } else {
      topicStats.errorFreeRounds = 0;
      if (meta.wrongCount > 0) topicStats.masteredUntil = 0;
    }
    saveState();
  }
