
function touchTopicStats(topicId) {
    const key = String(topicId);
    state.topicStats = state.topicStats || {};
    state.topicStats[key] = {
      mastery: 0,
      lastStudiedAt: 0,
      lastQuizAt: 0,
      masteredUntil: 0,
      xpLockUntil: 0,
      errorFreeRounds: 0,
      totalQuestionsSeen: 0,
      totalWrong: 0,
      rounds: 0,
      reviewRounds: 0,
      ...(state.topicStats[key] || {}),
    };
    return state.topicStats[key];
  }
