function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return normalizeState({ ...defaultState(), ...JSON.parse(raw) });
    } catch (_) {}
    return normalizeState(defaultState());
  }


  function saveState() {
    state = normalizeState(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (progressStore && progressStore.hasClient()) {
      progressStore.scheduleSnapshot(portableState());
      progressStore.scheduleTopicStats(state.topicStats || {});
      if (progressStore.scheduleReportDigest) {
        progressStore.scheduleReportDigest("save");
      }
    }
    updateTopbar();
    window.dispatchEvent(new CustomEvent("levelup:state-saved", { detail: { xp: state.xp, streak: state.streak } }));
  }

  function portableState() {
    return {
      version: STATE_VERSION,
      xp: state.xp,
      lastStudyDate: state.lastStudyDate,
      streak: state.streak,
      streakRewardDate: state.streakRewardDate,
      unlockAll: state.unlockAll,
      challengeMode: state.challengeMode,
      topicScores: state.topicScores,
      topicBest: state.topicBest,
      flashKnown: state.flashKnown,
      coupons: state.coupons,
      themeBossBeaten: state.themeBossBeaten,
      studyTimeMsByTopicTab: state.studyTimeMsByTopicTab,
      timeXpEarnedByTopicTab: state.timeXpEarnedByTopicTab,
      xpLedger: state.xpLedger,
      purchaseLedger: state.purchaseLedger,
      questionStats: state.questionStats,
      topicStats: state.topicStats,
      syncShape: state.syncShape,
      dailyChallenge: state.dailyChallenge,
    };
  }

  function applyPortableState(payload) {
    if (!payload || typeof payload !== "object") return;
    state.xp = payload.xp ?? state.xp;
    state.lastStudyDate = payload.lastStudyDate ?? state.lastStudyDate;
    state.streak = payload.streak ?? state.streak;
    state.streakRewardDate = payload.streakRewardDate ?? state.streakRewardDate;
    state.unlockAll = payload.unlockAll ?? state.unlockAll;
    state.challengeMode = payload.challengeMode ?? state.challengeMode;
    state.topicScores = payload.topicScores || state.topicScores;
    state.topicBest = payload.topicBest || state.topicBest;
    state.flashKnown = payload.flashKnown || state.flashKnown;
    state.coupons = payload.coupons || state.coupons;
    state.themeBossBeaten = payload.themeBossBeaten || state.themeBossBeaten;
    state.studyTimeMsByTopicTab =
      payload.studyTimeMsByTopicTab || state.studyTimeMsByTopicTab;
    state.timeXpEarnedByTopicTab =
      payload.timeXpEarnedByTopicTab || state.timeXpEarnedByTopicTab;
    state.xpLedger = payload.xpLedger || state.xpLedger;
    state.purchaseLedger = payload.purchaseLedger || state.purchaseLedger;
    state.questionStats = payload.questionStats || state.questionStats;
    state.topicStats = payload.topicStats || state.topicStats;
    state.syncShape = payload.syncShape || state.syncShape;
    state.dailyChallenge = payload.dailyChallenge || state.dailyChallenge;
    state = normalizeState(state);
    saveState();
  }

  function mergeRemoteBootstrap(remote) {
    if (!remote || typeof remote !== "object") return false;
    let changed = false;
    const remoteXp = Number(remote.xp || 0);
    if (remoteXp > Number(state.xp || 0)) {
      state.xp = remoteXp;
      changed = true;
    }
    const remoteLedger = Array.isArray(remote.xpLedger) ? remote.xpLedger : [];
    if (remoteLedger.length > (state.xpLedger || []).length) {
      state.xpLedger = remoteLedger;
      changed = true;
    }
    const remoteTopicStats = remote.topicStats || {};
    if (remoteTopicStats && Object.keys(remoteTopicStats).length) {
      state.topicStats = { ...(state.topicStats || {}), ...remoteTopicStats };
      changed = true;
    }
    if (changed) {
      state = normalizeState(state);
      saveState();
    }
    return changed;
  }

