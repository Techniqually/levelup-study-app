function defaultState() {
    return {
      schemaVersion: STATE_VERSION,
      xp: 0,
      lastStudyDate: null,
      streak: 0,
      streakRewardDate: "",
      topicScores: {},
      topicBest: {},
      flashKnown: {},
      coupons: [],
      themeBossBeaten: {},
      studyTimeMsByTopicTab: {},
      timeXpEarnedByTopicTab: {},
      xpLedger: [],
      purchaseLedger: [],
      questionStats: {},
      topicStats: {},
      syncShape: {
        schema: "study-audit-v1",
        studentId: STUDENT_ID,
        studentName: STUDENT_NAME,
      },
      serverDailyCounts: {},
      serverCouponsToday: [],
      shopCouponsLoaded: false,
      shopLastSyncAt: 0,
      dailyChallenge: {
        date: "",
        answered: 0,
        reviewRounds: 0,
        weakTopics: {},
        completed: false,
        bonusAwarded: false,
      },
      writtenClaims: {},
    };
  }

  function normalizeState(s) {
    const next = { ...defaultState(), ...(s || {}) };
    next.schemaVersion = STATE_VERSION;
    next.xp = Number(next.xp || 0);
    next.streak = Number(next.streak || 0);
    next.streakRewardDate = String(next.streakRewardDate || "");
    next.studyTimeMsByTopicTab = next.studyTimeMsByTopicTab || {};
    next.timeXpEarnedByTopicTab = next.timeXpEarnedByTopicTab || {};
    next.questionStats = next.questionStats || {};
    next.topicStats = next.topicStats || {};
    next.xpLedger = Array.isArray(next.xpLedger) ? next.xpLedger : [];
    next.purchaseLedger = Array.isArray(next.purchaseLedger)
      ? next.purchaseLedger
      : [];
    next.syncShape = next.syncShape || {
      schema: "study-audit-v1",
      studentId: STUDENT_ID,
      studentName: STUDENT_NAME,
    };
    next.serverDailyCounts = next.serverDailyCounts || {};
    next.serverCouponsToday = Array.isArray(next.serverCouponsToday)
      ? next.serverCouponsToday
      : [];
    next.shopCouponsLoaded = !!next.shopCouponsLoaded;
    next.shopLastSyncAt = Number(next.shopLastSyncAt || 0);
    next.dailyChallenge = {
      ...defaultState().dailyChallenge,
      ...(next.dailyChallenge || {}),
      weakTopics: (next.dailyChallenge && next.dailyChallenge.weakTopics) || {},
    };
    next.writtenClaims =
      next.writtenClaims && typeof next.writtenClaims === "object" ? next.writtenClaims : {};
    return next;
  }
