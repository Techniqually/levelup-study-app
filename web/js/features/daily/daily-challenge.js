
function ensureDailyChallenge() {
    const today = todayKey();
    if (!state.dailyChallenge || state.dailyChallenge.date !== today) {
      state.dailyChallenge = {
        date: today,
        answered: 0,
        reviewRounds: 0,
        weakTopics: {},
        completed: false,
        bonusAwarded: false,
      };
    }
    return state.dailyChallenge;
  }

  function maybeCompleteDailyChallenge() {
    const daily = ensureDailyChallenge();
    const weakTopicCount = Object.keys(daily.weakTopics || {}).length;
    const ready =
      daily.answered >= DAILY_CHALLENGE.answered &&
      daily.reviewRounds >= DAILY_CHALLENGE.reviewRounds &&
      weakTopicCount >= DAILY_CHALLENGE.weakTopics;
    if (!ready) return false;
    daily.completed = true;
    if (!daily.bonusAwarded) {
      daily.bonusAwarded = true;
      addXp(DAILY_CHALLENGE.bonusXp, {
        tab: route.tab || "quiz",
        activityType: "daily",
        sourceId: `daily:${daily.date}`,
        reason: "daily_bonus",
      });
      return true;
    }
    return false;
  }

  function markDailyAnswered(count) {
    const daily = ensureDailyChallenge();
    daily.answered += count || 1;
    if (!maybeCompleteDailyChallenge()) saveState();
  }

  function markDailyReviewRound() {
    const daily = ensureDailyChallenge();
    daily.reviewRounds += 1;
    if (!maybeCompleteDailyChallenge()) saveState();
  }

  function markDailyWeakTopic(topicId) {
    if (!topicId) return;
    const daily = ensureDailyChallenge();
    daily.weakTopics[String(topicId)] = true;
    if (!maybeCompleteDailyChallenge()) saveState();
  }

  function getDailyChallengeSummary() {
    const daily = ensureDailyChallenge();
    return {
      answered: daily.answered || 0,
      reviewRounds: daily.reviewRounds || 0,
      weakTopics: Object.keys(daily.weakTopics || {}).length,
      completed: !!daily.completed,
      bonusAwarded: !!daily.bonusAwarded,
    };
  }
