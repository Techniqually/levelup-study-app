function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return normalizeState({ ...defaultState(), ...JSON.parse(raw) });
    } catch (_) {}
    return normalizeState(defaultState());
  }


  function saveState() {
    state = normalizeState(state);
    state.lastSavedAt = Date.now();
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

  // Phase 8: Supabase is the source of truth. When we fetch a fresh
  // `user_subject_state.client_state` row on boot we REPLACE the in-memory
  // state with the remote payload (instead of the old merge-max logic) and
  // then write the merged result back to localStorage as a cache.
  //
  // Remote rows that are *older* than the local cache are ignored — this keeps
  // recently-earned XP intact if the user went offline and the debounced
  // snapshot hasn't been flushed yet.
  function replaceWithRemoteSubjectState(remoteRow) {
    if (!remoteRow || !remoteRow.clientState) return false;
    var remote = remoteRow.clientState;
    if (!remote || typeof remote !== "object") return false;
    var remoteTs = Date.parse(remoteRow.updatedAt || "") || 0;
    var localTs  = Number(state && state.lastSavedAt) || 0;
    if (localTs && remoteTs && localTs > remoteTs + 2000) return false;
    applyPortableState(remote);
    return true;
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

