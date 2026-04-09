(function () {
  const SUBJECT_ID = window.SUBJECT_ID || "chemistry";
  const SUBJECT_TITLE = window.SUBJECT_TITLE || "O-Level Chemistry";
  const STUDENT_ID =
    window.LEVELUP_STUDENT_ID || localStorage.getItem("LEVELUP_STUDENT_ID") || `local-${SUBJECT_ID}`;
  const STUDENT_NAME =
    window.LEVELUP_STUDENT_NAME || localStorage.getItem("LEVELUP_STUDENT_NAME") || "Student";
  const STORAGE_KEY = "levelup_" + SUBJECT_ID + "_v1";
  const APP_VERSION = window.APP_VERSION || "dev";
  const QUESTION_MS = 26000;
  const PASS_PCT = 70;
  const EARLY_WRONG_SEC = 3;
  const HEALTH_START = 3;
  const COMBO_AT = 3;
  const COMBO_MULT = 1.5;

  const manifest = window.TOPICS_MANIFEST;
  if (!manifest || !manifest.length) {
    document.getElementById("main").innerHTML =
      "<p class='empty-state'>Missing topics-manifest.js</p>";
    return;
  }

  const QUIZ_PER_ROUND = 20;
  const BOSS_QUESTION_MS_MULT = 0.8;
  const BOSS_XP = 500;
  const STREAK_DAILY_XP_BASE = 4;
  const STATE_VERSION = 2;
  const XP_POLICY = window.LEVELUP_XP_POLICY || {};
  const TOPIC_FARM_LOCK_POLICY = XP_POLICY.topicFarmLock || {};
  const QUESTION_MASTERY_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 5;
  const TOPIC_MASTERY_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 5;
  const TOPIC_FARM_LOCK_WINDOW_MS = Number(TOPIC_FARM_LOCK_POLICY.windowMs || 1000 * 60 * 60);
  const TOPIC_FARM_LOCK_TRIGGER_XP = Number(TOPIC_FARM_LOCK_POLICY.triggerXp || 140);
  const TOPIC_FARM_LOCK_MS = Number(TOPIC_FARM_LOCK_POLICY.lockMs || 1000 * 60 * 30);
  const PURCHASE_EVIDENCE_WINDOW_MS = 1000 * 60 * 60 * 24 * 7;
  const PURCHASE_REPEAT_COOLDOWN_MS = 1000 * 60 * 60 * 24;
  const DEFAULT_REWARD_DAILY_MAX = 1;
  const XP_RATE_LIMITS = {
    flash: { windowMs: 1000 * 60 * 5, maxXp: 40 },
    game_match: { windowMs: 1000 * 60 * 5, maxXp: 40 },
    game_sequence: { windowMs: 1000 * 60 * 5, maxXp: 40 },
    game_tf: { windowMs: 1000 * 60 * 5, maxXp: 40 },
    quiz: { windowMs: 1000 * 60 * 5, maxXp: 80 },
    quiz_review: { windowMs: 1000 * 60 * 5, maxXp: 60 },
  };
  const ENABLE_ACTIVITY_XP_CAP = !!XP_POLICY.enableActivityXpCap;
  const loadScriptPromises = {};

  // Boss themes are derived from each topic's `theme` field in the manifest.
  // This makes boss battles generic across subjects (Chemistry, Physics, etc.).
  const themeOrder = [];
  const themesByKey = {};
  (function buildThemes() {
    const seen = new Set();
    manifest.forEach((t) => {
      const key = t && t.theme ? String(t.theme) : "";
      if (!key) return;
      if (!seen.has(key)) {
        seen.add(key);
        themeOrder.push(key);
      }
      if (!themesByKey[key]) themesByKey[key] = [];
      themesByKey[key].push(t.id);
    });
  })();

  function loadTopicScript(id) {
    if (window.__topicRegistry[id]) {
      return Promise.resolve(window.__topicRegistry[id]);
    }
    const meta = manifest.find((m) => m.id === id);
    if (!meta) return Promise.reject(new Error("unknown topic"));
    const key = meta.file;
    if (loadScriptPromises[key]) {
      return loadScriptPromises[key];
    }
    loadScriptPromises[key] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      const sep = meta.file.includes("?") ? "&" : "?";
      s.src = meta.file + sep + "v=" + encodeURIComponent(APP_VERSION);
      s.async = true;
      s.onload = () => {
        const t = window.__topicRegistry[id];
        if (t) resolve(t);
        else reject(new Error("register failed"));
      };
      s.onerror = () => reject(new Error("load " + key));
      document.head.appendChild(s);
    });
    return loadScriptPromises[key];
  }
  const main = document.getElementById("main");
  const dock = document.getElementById("dock");
  let state = loadState();
  const progressStore = window.ProgressStore || null;
  let route = { view: "home", topicId: null, tab: "cheat" };
  let quizSession = null;
  let flashSession = null;
  let shopInFlight = false;
  let timeTracker = { topicId: null, tab: null, startedAt: 0 };

  // Small time-based XP to make Flashcards + Visuals contribute too.
  // Quiz + games keep their existing scoring (only correctness-based XP).
  const TIME_XP = {
    cheat: { msPerXp: 0, capXp: 0 },
    visual: { msPerXp: 60000, capXp: 10 }, // 1 XP per minute (capped per topic+tab)
    flash: { msPerXp: 45000, capXp: 15 }, // ~1 XP per 45s (capped per topic+tab)
    quiz: { msPerXp: 0, capXp: 0 },
    game: { msPerXp: 0, capXp: 0 },
  };
  const DAILY_CHALLENGE = {
    answered: 10,
    reviewRounds: 1,
    weakTopics: 1,
    bonusXp: 60,
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return normalizeState({ ...defaultState(), ...JSON.parse(raw) });
    } catch (_) {}
    return normalizeState(defaultState());
  }

  function defaultState() {
    return {
      schemaVersion: STATE_VERSION,
      xp: 0,
      lastStudyDate: null,
      streak: 0,
      streakRewardDate: "",
      unlockAll: true,
      challengeMode: false,
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
    return next;
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

  function saveState() {
    state = normalizeState(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (progressStore && progressStore.hasClient()) {
      progressStore.scheduleSnapshot(portableState());
      progressStore.scheduleTopicStats(state.topicStats || {});
    }
    updateTopbar();
  }

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

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

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

  function isCooldownActive(untilTs) {
    return Number(untilTs || 0) > Date.now();
  }

  function formatShortDate(ts) {
    if (!ts) return "";
    try {
      return new Date(ts).toISOString().slice(0, 10);
    } catch (_) {
      return "";
    }
  }

  function getTopicMeta(topicId) {
    return manifest.find((m) => String(m.id) === String(topicId)) || null;
  }

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

  function formatMsShort(ms) {
    const n = Math.max(0, Number(ms || 0));
    const mins = Math.ceil(n / 60000);
    if (mins < 1) return "<1 min";
    return `${mins} min`;
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

  function formatDurationCountdown(ms) {
    const totalSec = Math.max(0, Math.ceil(Number(ms || 0) / 1000));
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    if (mins <= 0) return `${secs}s`;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}h ${remMins}m`;
  }

  function getServerPurchaseErrorMessage(reason, payload) {
    const r = String(reason || "").toLowerCase();
    if (r.includes("daily_limit_reached")) {
      return "Daily reward limit reached for this item. Try again tomorrow.";
    }
    if (r.includes("insufficient_xp")) {
      const serverBalance = payload && Number(payload.balance);
      const cost = payload && Number(payload.cost);
      if (Number.isFinite(serverBalance) && Number.isFinite(cost)) {
        return `Server XP balance is ${serverBalance}, reward costs ${cost}. Please wait a moment for sync and try again.`;
      }
      return "Server says XP is insufficient for this reward. Please wait a moment for sync and try again.";
    }
    if (r.includes("invalid_daily_max")) {
      return "Reward configuration issue. Please refresh and try again.";
    }
    if (r.includes("student_id_required")) {
      return "Student profile is missing. Please set Student profile and try again.";
    }
    return "Purchase blocked by server rules. Keep studying and try again.";
  }

  function getSuggestedNextTopics(currentTopicId, limit) {
    const currentMeta = getTopicMeta(currentTopicId);
    const unlocked = manifest.filter(
      (m) => String(m.id) !== String(currentTopicId) && isUnlocked(m.id)
    );
    const prioritized = unlocked.sort((a, b) => {
      const aStats = touchTopicStats(a.id);
      const bStats = touchTopicStats(b.id);
      const aMastery = Number(aStats.mastery || 0);
      const bMastery = Number(bStats.mastery || 0);
      const aSeen = Number(aStats.totalQuestionsSeen || 0);
      const bSeen = Number(bStats.totalQuestionsSeen || 0);
      const aTheme = currentMeta && a.theme === currentMeta.theme ? 1 : 0;
      const bTheme = currentMeta && b.theme === currentMeta.theme ? 1 : 0;
      return (
        aTheme - bTheme ||
        aMastery - bMastery ||
        aSeen - bSeen ||
        String(a.id).localeCompare(String(b.id))
      );
    });
    return prioritized.slice(0, Math.max(1, Number(limit || 3)));
  }

  function showXpPauseHint(activityType, waitMs) {
    const msg = `XP pause for ${getActivityLabel(activityType)}: try again in ${formatMsShort(waitMs)}.`;
    const status = document.getElementById("sync-status");
    if (status) status.textContent = msg;
    const xpPill = document.getElementById("stat-xp");
    if (xpPill) xpPill.title = msg;
  }

  function getRepeatAttemptMultiplier(meta) {
    if (!meta || meta.topicId == null) return 1;
    const activity = String((meta && meta.activityType) || "");
    if (!activity.startsWith("quiz")) return 1;
    const topicId = String(meta.topicId);
    const recentTopicXp = sumRecentXpBy(
      (entry) =>
        String(entry.topicId || "") === topicId &&
        String(entry.activityType || "").startsWith("quiz"),
      1000 * 60 * 60
    );
    if (recentTopicXp >= 120) return 0.2;
    if (recentTopicXp >= 60) return 0.5;
    return 1;
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

  function canPurchaseReward() {
    const cov = getRecentActivityCoverage(1000 * 60 * 60 * 24);
    const ok = cov.quiz && (cov.flash || cov.game) && cov.topicCount >= 2;
    return { ok, cov };
  }

  function getTodayIsoDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function getRewardDailyMax(reward) {
    const raw = reward && reward.dailyMax;
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0) return Math.floor(n);
    return DEFAULT_REWARD_DAILY_MAX;
  }

  function getRewardPurchasesOnDate(couponId, isoDate) {
    const day = String(isoDate || getTodayIsoDate());
    const localCount = (state.purchaseLedger || []).filter(
      (p) =>
        String(p.couponId || "") === String(couponId) &&
        String((p.date || "").slice(0, 10)) === day
    ).length;
    const cache = state.serverDailyCounts || {};
    const serverCount = Number(
      (cache[String(couponId)] && cache[String(couponId)][day]) || 0
    );
    return Math.max(localCount, serverCount);
  }

  function applyServerDailyCounts(result) {
    if (!result || !result.ok) return false;
    const today = getTodayIsoDate();
    if (String(result.date || "").slice(0, 10) !== today) return false;
    const counts = Array.isArray(result.counts) ? result.counts : [];
    let changed = false;
    counts.forEach(({ reward_id, count }) => {
      const serverCount = Number(count || 0);
      if (!serverCount) return;
      state.serverDailyCounts = state.serverDailyCounts || {};
      const existing = Number(
        (state.serverDailyCounts[reward_id] && state.serverDailyCounts[reward_id][today]) || 0
      );
      if (serverCount > existing) {
        state.serverDailyCounts[reward_id] = state.serverDailyCounts[reward_id] || {};
        state.serverDailyCounts[reward_id][today] = serverCount;
        changed = true;
      }
    });
    return changed;
  }

  function applyShopSnapshot(snapshot) {
    if (!snapshot || !snapshot.ok) return false;
    const today = getTodayIsoDate();
    let changed = false;
    if (applyServerDailyCounts(snapshot)) changed = true;
    const fromServer = Array.isArray(snapshot.coupons_today)
      ? snapshot.coupons_today
      : [];
    const normalizedTodayCoupons = fromServer
      .map((c) => ({
        id: c.reward_id || "",
        label: c.reward_label || "",
        xp: Number(c.xp_cost || 0),
        date: String((c.purchased_at || "").slice(0, 10)),
        purchaseId: c.client_purchase_id || c.purchase_id || "",
        couponCode: c.coupon_code || "",
        purchasedAt: c.purchased_at || "",
        claimedAt: c.claimed_at || null,
      }))
      .filter((c) => c.date === today);
    const prev = JSON.stringify(state.serverCouponsToday || []);
    const next = JSON.stringify(normalizedTodayCoupons);
    if (prev !== next) {
      state.serverCouponsToday = normalizedTodayCoupons;
      changed = true;
    }
    if (!state.shopCouponsLoaded) {
      state.shopCouponsLoaded = true;
      changed = true;
    }
    if (Number.isFinite(Number(snapshot.xp_balance))) {
      const serverXp = Number(snapshot.xp_balance);
      if (serverXp !== Number(state.xp || 0)) {
        state.xp = serverXp;
        changed = true;
      }
    }
    state.shopLastSyncAt = Date.now();
    return changed;
  }

  function getShopCouponsForDisplay() {
    const today = getTodayIsoDate();
    if (state.shopCouponsLoaded) {
      return state.serverCouponsToday.slice();
    }
    return (state.coupons || []).filter(
      (c) => String((c.date || "").slice(0, 10)) === today
    );
  }

  function formatCouponDateTime(dateStr, isoTs) {
    const d = isoTs ? new Date(isoTs) : new Date(`${dateStr}T00:00:00Z`);
    if (!d || Number.isNaN(d.getTime())) return escapeHtml(String(dateStr || ""));
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mi = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss} UTC`;
  }

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

  function recordPurchaseEntry(purchaseMeta) {
    const date = getTodayIsoDate();
    const balanceBefore = state.xp;
    const studyEvidenceWindow = summarizeRecentStudyEvidence(
      PURCHASE_EVIDENCE_WINDOW_MS
    );
    return {
      id: `purchase-${Date.now()}`,
      ts: Date.now(),
      date,
      couponId: purchaseMeta.id,
      label: purchaseMeta.label,
      xpSpent: purchaseMeta.xp,
      balanceBefore,
      balanceAfter: balanceBefore - purchaseMeta.xp,
      subjectId: SUBJECT_ID,
      studyEvidenceWindow,
    };
  }

  function getPurchaseCooldownRemainingMs(couponId) {
    if (!couponId) return 0;
    const last = (state.purchaseLedger || [])
      .filter((p) => String(p.couponId || "") === String(couponId))
      .sort((a, b) => b.ts - a.ts)[0];
    if (!last) return 0;
    return Math.max(0, Number(last.ts || 0) + PURCHASE_REPEAT_COOLDOWN_MS - Date.now());
  }

  function getPurchaseEffectiveCooldownMs(couponId, dailyMax, todayCount) {
    const max = Math.max(1, Number(dailyMax || DEFAULT_REWARD_DAILY_MAX));
    const count = Math.max(0, Number(todayCount || 0));
    // Do not block repeat purchases when daily allowance is still available.
    // Daily max is the primary limiter for kid-facing rewards.
    if (count < max) return 0;
    return getPurchaseCooldownRemainingMs(couponId);
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

  function normalizeQuestionText(s) {
    return String(s || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 180);
  }

  function getQuestionTopicId(q, fallbackTopicId) {
    return String((q && (q.__topicId || q.topicId)) || fallbackTopicId || "unknown");
  }

  function getQuestionKey(q, fallbackTopicId) {
    if (q && q.id != null) return String(q.id);
    return `${getQuestionTopicId(q, fallbackTopicId)}::${normalizeQuestionText(
      q && q.question
    )}`;
  }

  function touchQuestionStats(topicId, questionKey) {
    state.questionStats = state.questionStats || {};
    state.questionStats[topicId] = state.questionStats[topicId] || {};
    state.questionStats[topicId][questionKey] = {
      seen: 0,
      correct: 0,
      wrongs: 0,
      streak: 0,
      recentCorrectRun: 0,
      mastery: 0,
      masteredUntil: 0,
      lastSeenAt: 0,
      lastAskedAt: 0,
      lastCorrectAt: 0,
      lastWrongAt: 0,
      lastResult: null,
      ...(state.questionStats[topicId][questionKey] || {}),
    };
    return state.questionStats[topicId][questionKey];
  }

  function readQuestionStats(q, fallbackTopicId) {
    const topicId = getQuestionTopicId(q, fallbackTopicId);
    const questionKey = getQuestionKey(q, fallbackTopicId);
    const stats =
      (state.questionStats &&
        state.questionStats[topicId] &&
        state.questionStats[topicId][questionKey]) || {
        seen: 0,
        correct: 0,
        wrongs: 0,
        streak: 0,
        recentCorrectRun: 0,
        mastery: 0,
        masteredUntil: 0,
        lastSeenAt: 0,
        lastAskedAt: 0,
        lastCorrectAt: 0,
        lastWrongAt: 0,
        lastResult: null,
      };
    return { topicId, questionKey, stats };
  }

  function getQuestionBucket(stats) {
    if (!stats || stats.seen === 0) return "new";
    if (isCooldownActive(stats.masteredUntil)) return "mastered";
    if (
      stats.lastResult === "wrong" ||
      stats.lastResult === "timeout" ||
      stats.mastery < 40
    ) {
      return "weak";
    }
    if (stats.mastery >= 85 && stats.streak >= 3) return "mastered";
    if (stats.mastery >= 60) return "strong";
    return "improving";
  }

  function getQuestionPriority(stats) {
    let score = 50;
    if (!stats || stats.seen === 0) score += 60;
    score += Math.max(0, 60 - (stats ? stats.mastery : 0));
    if (stats && isCooldownActive(stats.masteredUntil)) score -= 100;
    if (stats && stats.lastResult === "wrong") score += 30;
    if (stats && stats.lastResult === "timeout") score += 35;
    if (stats && stats.lastSeenAt) {
      const staleMs = Date.now() - stats.lastSeenAt;
      if (staleMs > 1000 * 60 * 60 * 24 * 3) score += 10;
    }
    if (stats && stats.mastery >= 85 && stats.streak >= 3) score -= 35;
    return score;
  }

  function annotateQuizBank(bank, fallbackTopicId) {
    return bank.map((q, i) => {
      const enriched = { ...q, __topicId: q.__topicId || fallbackTopicId, _i: i };
      const info = readQuestionStats(enriched, fallbackTopicId);
      return {
        q: enriched,
        topicId: info.topicId,
        questionKey: info.questionKey,
        stats: info.stats,
        bucket: getQuestionBucket(info.stats),
        priority: getQuestionPriority(info.stats),
      };
    });
  }

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

  function bumpStreak() {
    const today = new Date().toDateString();
    if (state.lastStudyDate === today) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    if (state.lastStudyDate === y.toDateString()) state.streak += 1;
    else state.streak = 1;
    state.lastStudyDate = today;
    if (state.streakRewardDate !== today) {
      state.streakRewardDate = today;
      const bonus = STREAK_DAILY_XP_BASE + Math.min(6, Math.max(0, state.streak - 1));
      addXp(bonus, {
        tab: route.tab || "cheat",
        activityType: "daily_streak",
        sourceId: `streak:${today}`,
        reason: "daily_streak_bonus",
      });
      const status = document.getElementById("sync-status");
      if (status) {
        status.textContent = `Streak bonus +${bonus} XP awarded (day ${state.streak}).`;
      }
      return;
    }
    saveState();
  }

  function updateTopbar() {
    document.getElementById("stat-xp").textContent = `${state.xp} XP`;
    const s = state.streak || 0;
    document.getElementById("stat-streak").textContent =
      `🔥 ${s} day${s === 1 ? "" : "s"}`;
    const bossEl = document.getElementById("stat-boss");
    const bossCount = Object.keys(state.themeBossBeaten || {}).filter(Boolean).length;
    if (bossEl) {
      bossEl.hidden = bossCount === 0;
      bossEl.textContent = bossCount ? `🏆 ${bossCount}` : "";
      bossEl.title = bossCount ? "Theme boss" + (bossCount > 1 ? "es" : "") + " beaten" : "";
    }
  }

  function topicIndex(id) {
    return manifest.findIndex((t) => t.id === id);
  }

  function isUnlocked(topicId) {
    const i = topicIndex(topicId);
    if (i < 0) return false;
    if (state.unlockAll) return true;
    if (i === 0) return true;
    const need = state.challengeMode ? 80 : PASS_PCT;
    const prev = manifest[i - 1].id;
    return (state.topicBest[prev] || 0) >= need;
  }

  function isBossUnlocked(themeKey) {
    const ids = themesByKey[themeKey];
    if (!ids || !ids.length) return false;
    return ids.every((id) => isUnlocked(id));
  }

  function renderHome() {
    bumpStreak();
    stopAndAwardTime();
    dock.hidden = true;
    const parts = [];
    let currentTheme = "";
    const daily = getDailyChallengeSummary();
    const dailyBanner = `
      <div class="daily-card">
        <div class="daily-title">Daily challenge${daily.bonusAwarded ? ` · +${DAILY_CHALLENGE.bonusXp} XP claimed` : ""}</div>
        <div class="daily-progress">
          <span class="quiz-chip">Quiz ${Math.min(daily.answered, DAILY_CHALLENGE.answered)}/${DAILY_CHALLENGE.answered}</span>
          <span class="quiz-chip">Review ${Math.min(daily.reviewRounds, DAILY_CHALLENGE.reviewRounds)}/${DAILY_CHALLENGE.reviewRounds}</span>
          <span class="quiz-chip">Weak topic ${Math.min(daily.weakTopics, DAILY_CHALLENGE.weakTopics)}/${DAILY_CHALLENGE.weakTopics}</span>
          <span class="quiz-chip ${daily.completed ? "mastered" : ""}">${daily.completed ? "Completed" : "In progress"}</span>
        </div>
      </div>`;
    manifest.forEach((t) => {
      if (t.theme !== currentTheme) {
        currentTheme = t.theme;
        parts.push(
          `<div class="theme-block"><div class="theme-label">${escapeHtml(
            currentTheme
          )}</div><div class="topic-grid">`
        );
      }
      const unlocked = isUnlocked(t.id);
      const best = state.topicBest[t.id];
      const badge =
        best != null
          ? `<span class="badge done">${best}% best</span>`
          : `<span class="badge">Study</span>`;
      const mastery = getStoredTopicMastery(t.id);
      const masteryBadge = `<span class="badge mastery">${escapeHtml(
        mastery.label
      )}</span>`;
      const reviewBadge = mastery.weakCount
        ? `<span class="badge review">${mastery.weakCount} weak</span>`
        : "";
      const cooldownBadge = isCooldownActive(mastery.masteredUntil)
        ? `<span class="badge cooldown">Ready ${escapeHtml(
            formatShortDate(mastery.masteredUntil)
          )}</span>`
        : "";
      parts.push(
        `<button type="button" class="topic-card ${
          unlocked ? "unlocked" : ""
        }" data-topic="${escapeHtml(t.id)}" ${
          unlocked ? "" : "disabled"
        } title="${unlocked ? "" : "Locked — raise previous topic to 70% or enable Unlock all in settings"}">
          <span class="num">T${t.id}</span>
          <span class="title">${escapeHtml(t.title)}</span>
          <span class="badge-row">${badge}${masteryBadge}${reviewBadge}${cooldownBadge}</span>
        </button>`
      );
      const next = manifest[topicIndex(t.id) + 1];
      if (!next || next.theme !== currentTheme) parts.push("</div></div>");
    });
    const bossParts = [];
    themeOrder.forEach((themeKey) => {
      const beaten = state.themeBossBeaten && state.themeBossBeaten[themeKey];
      const unlocked = isBossUnlocked(themeKey);
      if (!unlocked && !beaten) return;
      const name = themeKey;
      bossParts.push(
        `<button type="button" class="topic-card boss-card ${
          beaten ? "boss-beaten" : ""
        }" data-boss="${escapeHtml(themeKey)}" ${
          beaten ? "disabled" : ""
        }>
          <span class="num">BOSS</span>
          <span class="title">${escapeHtml(name)}</span>
          <span class="badge">${
            beaten ? "🏆 Beaten" : "1 HP · fast timer · big XP"
          }</span>
        </button>`
      );
    });
    if (bossParts.length) {
      parts.push(
        '<div class="theme-block"><div class="theme-label">Boss battles</div><div class="topic-grid">' +
        bossParts.join("") +
        "</div></div>"
      );
    }
    main.innerHTML = `
      <h1 class="dash-title">${escapeHtml(SUBJECT_TITLE)}</h1>
      <p class="dash-sub">Topics · Shop (spend XP on rewards) · Boss battles when a full theme is unlocked.</p>
      ${dailyBanner}
      ${parts.join("")}
    `;
    main.querySelectorAll(".topic-card[data-topic]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        goTopic(btn.dataset.topic, "cheat");
      });
    });
    main.querySelectorAll(".topic-card[data-boss]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        startBossBattle(btn.dataset.boss);
      });
    });
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderMiniMarkdown(md) {
    if (md == null) return "";
    const raw = String(md);
    const safe = escapeHtml(raw);

    const inline = (s) =>
      s
        // Avoid breaking math like `$v=gt` by our `*italic*` / `**bold**` transforms.
        // We only apply inline markdown to non-math segments.
        .split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
        .map((seg) => {
          if (!seg) return seg;
          if (seg[0] === "$") return seg; // preserve math delimiters for KaTeX
          return seg
            // inline code
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            // bold
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            // italic (best-effort; avoids affecting strong because ** already handled)
            .replace(/\*([^*]+)\*/g, "<em>$1</em>");
        })
        .join("");

    const lines = safe.split(/\r?\n/);
    const parts = [];
    let inUl = false;

    for (const ln of lines) {
      const t = ln.trim();
      if (!t) {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push("<br/>");
        continue;
      }

      if (t === "***") {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<hr class="mini-divider" />`);
        continue;
      }

      const m = ln.match(/^\s*[-*]\s+(.*)$/);
      if (m) {
        if (!inUl) {
          parts.push("<ul class='mini-md'>");
          inUl = true;
        }
        parts.push(`<li>${inline(m[1])}</li>`);
      } else {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<div>${inline(ln)}</div>`);
      }
    }

    if (inUl) parts.push("</ul>");
    return parts.join("");
  }

  function renderMathWhenReady(el, attempt) {
    const tryNum = Number(attempt || 0);
    if (typeof window.renderMathInElement === "function" && el && el.querySelector) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
      return;
    }
    if (tryNum >= 20) return;
    setTimeout(() => renderMathWhenReady(el, tryNum + 1), 50);
  }

  function goTopic(id, tab) {
    stopAndAwardTime();
    route = { view: "topic", topicId: id, tab: tab || "cheat" };
    main.innerHTML =
      '<p class="empty-state">Loading topic…</p>';
    dock.hidden = true;
    loadTopicScript(id)
      .then((t) => {
        route.topicData = t;
        dock.hidden = false;
        renderTopic();
      })
      .catch(() => {
        main.innerHTML =
          '<p class="empty-state">Failed to load topic script. Use a local server (e.g. <code>npx serve .</code>) if the browser blocks <code>file://</code> scripts.</p><button type="button" class="btn primary" id="reload-home">Home</button>';
        document.getElementById("reload-home").onclick = () => {
          route = { view: "home" };
          renderHome();
        };
      });
  }

  function renderTopic() {
    const t =
      route.topicData || window.__topicRegistry[route.topicId];
    if (!t || t.id !== route.topicId) {
      if (route.view === "topic" && route.topicId) {
        loadTopicScript(route.topicId).then((loaded) => {
          route.topicData = loaded;
          renderTopic();
        });
        main.innerHTML = '<p class="empty-state">Loading…</p>';
      } else renderHome();
      return;
    }
    // Topic is ready; finalize previous timing segment (if any).
    stopAndAwardTime();
    dock.hidden = false;
    dock.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === route.tab);
    });

    let body = "";
    if (route.tab === "cheat") body = renderCheat(t);
    else if (route.tab === "visual") body = renderVisuals(t);
    else if (route.tab === "flash") body = renderFlashPanel(t);
    else if (route.tab === "quiz") body = renderQuizPanel(t);
    else if (route.tab === "game") body = renderGamePanel(t);

    const idx = topicIndex(t.id);
    const prev = idx > 0 ? manifest[idx - 1] : null;
    const next = idx >= 0 && idx < manifest.length - 1 ? manifest[idx + 1] : null;
    const prevDisabled = !prev;
    const nextDisabled = !next || !isUnlocked(next.id);

    main.innerHTML = `
      <div class="topic-header">
        <button type="button" class="back" id="topic-back">← All topics</button>
        <div class="topic-title-row">
          <h1>Topic ${t.id}: ${escapeHtml(t.title)}</h1>
          <div class="topic-nav">
            <button type="button" class="btn btn-small" id="topic-prev" ${prevDisabled ? "disabled" : ""}>← Prev</button>
            <span class="btn-small">Topics</span>
            <button type="button" class="btn btn-small primary" id="topic-next" ${nextDisabled ? "disabled" : ""}>Next →</button>
          </div>
        </div>
      </div>
      <div id="topic-panels">${body}</div>
    `;
    document.getElementById("topic-back").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    const prevBtn = document.getElementById("topic-prev");
    const nextBtn = document.getElementById("topic-next");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (!prev) return;
        goTopic(prev.id, route.tab);
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (!next || !isUnlocked(next.id)) return;
        goTopic(next.id, route.tab);
      };
    }
    bindPanelHandlers(t);

    startTime(t.id, route.tab);

    // Typeset `$...$` / `$$...$$` using KaTeX (loaded by `subject.html`).
    renderMathWhenReady(document.getElementById("topic-panels") || main, 0);
  }

  function formatCheatPoint(p) {
    const esc = escapeHtml(p);
    return esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function renderCheat(t) {
    return t.cheatBlocks
      .map(
        (b) => `
      <div class="cheat-slide">
        <h3>${escapeHtml(b.title)}</h3>
        <ul>${b.points.map((p) => `<li>${formatCheatPoint(p)}</li>`).join("")}</ul>
      </div>`
      )
      .join("");
  }

  function renderVisuals(t) {
    let infs = t.infographics;
    if ((!infs || !infs.length) && window.SUBJECT_INFOS_BY_TOPIC) {
      infs = window.SUBJECT_INFOS_BY_TOPIC[String(t.id)];
    }

    if (!infs || !infs.length) {
      return `<p class="empty-state">No extra diagram for this topic — check Notes for embedded ideas.</p>`;
    }

    const infoByTopicAll = window.INFO_MD_BY_TOPIC_AND_FILE || {};
    const infoByFile = infoByTopicAll[String(t.id)] || {};

    return infs
      .map((inf) => {
        const infoKey =
          inf.infoKey ||
          (inf.image
            ? inf.image.split("/").pop().split("?")[0]
            : null);
        const infoMd =
          inf.infoMarkdown ||
          (infoKey ? infoByFile[String(infoKey)] : "") ||
          "";
        const media = inf.image
          ? `<img src="${escapeHtml(inf.image)}" alt="" class="infographic-img" loading="lazy"/>`
          : (inf.svg || "");
        return `
      <div class="infographic-wrap">
        ${media}
        <div class="infographic-caption">${escapeHtml(inf.caption || t.title || "")}</div>
        ${
          infoMd
            ? `<div class="infographic-info">
                <div class="infographic-file">${escapeHtml(infoKey || "")}</div>
                ${renderMiniMarkdown(infoMd)}
               </div>`
            : ""
        }
      </div>`;
      })
      .join("");
  }

  function renderFlashPanel(t) {
    const cards = t.flashcards.slice();
    return `
      <div class="panel active" data-panel="flash">
        <p class="flash-progress" id="flash-progress">Tap card to flip · <span id="flash-count"></span></p>
        <div class="flash-area"><div class="flash-card" id="flash-card"><div class="flash-face flash-front" id="flash-front"></div><div class="flash-face flash-back" id="flash-back"></div></div></div>
        <div class="flash-actions">
          <button type="button" class="btn danger-outline" id="flash-review">Need review</button>
          <button type="button" class="btn primary" id="flash-got">Got it ✓</button>
        </div>
      </div>`;
  }

  function renderQuizPanel(t) {
    const insight = getTopicQuizInsights(t);
    const daily = getDailyChallengeSummary();
    const topicCooling = isCooldownActive(insight.topicMasteredUntil);
    return `
      <div class="panel active" data-panel="quiz">
        <div id="quiz-start-wrap">
          <p class="game-intro">Bank: ${insight.total} MCQs · each round: ${Math.min(QUIZ_PER_ROUND, insight.total)} adaptive · timer · early wrong = health loss · 3 streak = combo.</p>
          <div class="quiz-insights">
            <span class="quiz-chip">${escapeHtml(insight.label)}</span>
            <span class="quiz-chip">Weak ${insight.weakCount}</span>
            <span class="quiz-chip">New ${insight.unseenCount}</span>
            <span class="quiz-chip">Mastered ${insight.masteredCount}</span>
            <span class="quiz-chip">Cooling ${insight.coolingCount}</span>
            <span class="quiz-chip">Fresh ${insight.freshEligible}</span>
            ${
              isCooldownActive(insight.topicXpLockUntil)
                ? `<span class="quiz-chip" title="${escapeHtml(
                    topicLockMessage(t.id)
                  )}">XP paused ${escapeHtml(formatMsShort(insight.topicXpLockUntil - Date.now()))}</span>`
                : ""
            }
          </div>
          <div class="quiz-start-actions">
            <button type="button" class="btn primary" id="quiz-start" ${topicCooling ? "disabled" : ""}>${topicCooling ? "Adaptive quiz cooling down" : "Start adaptive quiz"}</button>
            <button type="button" class="btn" id="quiz-review" ${insight.total ? "" : "disabled"}>${insight.weakCount ? `Review weak questions (${insight.weakCount})` : "Review topic"}</button>
          </div>
          <p class="quiz-note">${
            topicCooling
              ? `Mastered recently — adaptive quiz returns on ${escapeHtml(
                  formatShortDate(insight.topicMasteredUntil)
                )} (${escapeHtml(formatDurationCountdown(insight.topicMasteredUntil - Date.now()))} left). Review mode still works.`
              : isCooldownActive(insight.topicXpLockUntil)
                ? `XP pause active for this chapter (${escapeHtml(
                    formatDurationCountdown(insight.topicXpLockUntil - Date.now())
                  )} left). You can study Notes/Cards, or switch chapter for quiz XP.`
              : insight.total >= 10 && (insight.unseenCount <= 2 || insight.freshEligible <= 3 || insight.exhaustedShare >= 0.7)
                ? `Most questions here are now repeated. For better learning, try another chapter after this round.`
              : `Daily: ${Math.min(daily.answered, DAILY_CHALLENGE.answered)}/${DAILY_CHALLENGE.answered} answered · ${Math.min(daily.reviewRounds, DAILY_CHALLENGE.reviewRounds)}/${DAILY_CHALLENGE.reviewRounds} review rounds · ${Math.min(daily.weakTopics, DAILY_CHALLENGE.weakTopics)}/${DAILY_CHALLENGE.weakTopics} weak topic.`
          }</p>
        </div>
        <div id="quiz-play" hidden></div>
      </div>`;
  }

  function renderGamePanel(t) {
    const hasSeq = t.orderGame && t.orderGame.length;
    const hasTF = t.trueFalse && t.trueFalse.length >= 6;
    const tfCount = hasTF ? Math.min(10, (t.trueFalse || []).length) : 0;
    const matchCount = Math.min(8, (t.flashcards || []).length);
    const seqCount = hasSeq ? (t.orderGame || []).length : 0;
    return `
      <div class="panel active" data-panel="game">
        <p class="game-intro">Game rules upfront:</p>
        <ul class="game-intro">
          <li><strong>Matching pairs</strong>: ${matchCount} cards, clear all pairs to earn XP.</li>
          ${hasSeq ? `<li><strong>Order game</strong>: arrange ${seqCount} steps correctly, then check.</li>` : ""}
          ${hasTF ? `<li><strong>True / False</strong>: ${tfCount} statements, XP based on correct count.</li>` : ""}
        </ul>
        <button type="button" class="btn primary" id="game-match">Matching pairs</button>
        ${
          hasSeq
            ? `<button type="button" class="btn" id="game-seq" style="margin-top:10px;width:100%">Order: ${escapeHtml(
                t.orderTitle || "sequence"
              )}</button>`
            : ""
        }
        ${
          hasTF
            ? `<button type="button" class="btn" id="game-tf" style="margin-top:10px;width:100%">True / False (10)</button>`
            : ""
        }
        <div id="game-area" style="margin-top:16px"></div>
      </div>`;
  }

  function bindPanelHandlers(t) {
    if (route.tab === "flash") startFlash(t);
    if (route.tab === "quiz") bindQuiz(t);
    if (route.tab === "game") bindGames(t);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startFlash(t) {
    const pool = shuffle(t.flashcards);
    const review = [];
    let idx = 0;
    let flashCompleted = false;
    let hadReviewRound = false;
    let actionLock = false;
    const MIN_FLASH_TOTAL_MS = 3500;
    const MIN_FLASH_FRONT_MS = 1500;
    const MIN_FLASH_BACK_MS = 1200;
    const deckSize = pool.length;
    let cardShownAt = 0;
    let sawBackForCard = false;
    let firstBackShownAt = 0;
    let backVisibleSince = 0;
    let backReadAccumMs = 0;
    const validatedCards = typeof WeakSet !== "undefined" ? new WeakSet() : null;
    let validatedCount = 0;
    const front = document.getElementById("flash-front");
    const back = document.getElementById("flash-back");
    const card = document.getElementById("flash-card");
    const prog = document.getElementById("flash-count");
    const progLabel = document.getElementById("flash-progress");

    function getReadState(nowTs) {
      const now = nowTs || Date.now();
      const elapsed = Math.max(0, now - cardShownAt);
      const backLive = backVisibleSince ? now - backVisibleSince : 0;
      const backReadMs = backReadAccumMs + backLive;
      const frontReadMs = firstBackShownAt
        ? Math.max(0, firstBackShownAt - cardShownAt)
        : Math.max(0, elapsed - backReadMs);
      const validRead =
        sawBackForCard &&
        elapsed >= MIN_FLASH_TOTAL_MS &&
        frontReadMs >= MIN_FLASH_FRONT_MS &&
        backReadMs >= MIN_FLASH_BACK_MS;
      return { elapsed, frontReadMs, backReadMs, validRead };
    }

    function show() {
      if (idx >= pool.length) {
        if (review.length) {
          pool.splice(0, pool.length, ...shuffle(review));
          review.length = 0;
          idx = 0;
        } else {
          flashCompleted = true;
          const baseBonus = hadReviewRound ? 18 : 10;
          const ratio = deckSize > 0 ? validatedCount / deckSize : 0;
          const bonus = Math.floor(baseBonus * ratio);
          if (bonus > 0) {
            addXp(bonus, {
              topicId: t.id,
              theme: t.theme,
              tab: "flash",
              activityType: "flash",
              sourceId: `flash:${t.id}:deck`,
              reason: "flash_deck_complete",
            });
          } else {
            saveState();
          }
          front.innerHTML = renderMiniMarkdown("Deck cleared — open another tab or redo.");
          back.innerHTML = renderMiniMarkdown("Nice.");
          renderMathWhenReady(front, 0);
          renderMathWhenReady(back, 0);
          card.classList.remove("flipped");
          prog.textContent = "Done";
          return;
        }
      }
      const c = pool[idx];
      front.innerHTML = renderMiniMarkdown(c.front || "");
      back.innerHTML = renderMiniMarkdown(c.back || "");
      renderMathWhenReady(front, 0);
      renderMathWhenReady(back, 0);
      card.classList.remove("flipped");
      prog.textContent = `${idx + 1} / ${pool.length}`;
      cardShownAt = Date.now();
      sawBackForCard = false;
      firstBackShownAt = 0;
      backVisibleSince = 0;
      backReadAccumMs = 0;
      if (progLabel) {
        progLabel.textContent =
          "Read both sides for XP: 1.5s front + 1.2s back (3.5s total)";
      }
    }

    card.onclick = () => {
      const now = Date.now();
      const wasBack = card.classList.contains("flipped");
      card.classList.toggle("flipped");
      sawBackForCard = card.classList.contains("flipped") || sawBackForCard;
      if (!wasBack) {
        if (!firstBackShownAt) firstBackShownAt = now;
        backVisibleSince = now;
      } else if (backVisibleSince) {
        backReadAccumMs += now - backVisibleSince;
        backVisibleSince = 0;
      }
    };
    document.getElementById("flash-got").onclick = () => {
      if (flashCompleted || actionLock) return;
      actionLock = true;
      const currentCard = pool[idx];
      const readState = getReadState(Date.now());
      idx++;
      if (readState.validRead) {
        const already = validatedCards ? validatedCards.has(currentCard) : false;
        if (!already) {
          addXp(2, {
            topicId: t.id,
            theme: t.theme,
            tab: "flash",
            activityType: "flash",
            sourceId: `${t.id}::${normalizeQuestionText(currentCard.front)}`,
            reason: "flash_got_it",
          });
          if (validatedCards) validatedCards.add(currentCard);
          validatedCount++;
        }
      } else if (progLabel) {
        progLabel.textContent =
          "Too fast for XP on this card. XP only counts after real read time on both sides.";
      }
      actionLock = false;
      show();
    };
    document.getElementById("flash-review").onclick = () => {
      if (flashCompleted || actionLock) return;
      actionLock = true;
      const currentCard = pool[idx];
      const readState = getReadState(Date.now());
      review.push(pool[idx]);
      idx++;
      hadReviewRound = true;
      if (readState.validRead) {
        const already = validatedCards ? validatedCards.has(currentCard) : false;
        if (!already) {
          addXp(1, {
            topicId: t.id,
            theme: t.theme,
            tab: "flash",
            activityType: "flash",
            sourceId: `${t.id}::${normalizeQuestionText(currentCard.front)}`,
            reason: "flash_review_marked",
          });
          if (validatedCards) validatedCards.add(currentCard);
          validatedCount++;
        }
      } else if (progLabel) {
        progLabel.textContent =
          "Too fast for XP on this card. XP only counts after real read time on both sides.";
      }
      actionLock = false;
      show();
    };
    show();
  }

  function bindQuiz(t) {
    const start = document.getElementById("quiz-start");
    const review = document.getElementById("quiz-review");
    const wrap = document.getElementById("quiz-start-wrap");
    const play = document.getElementById("quiz-play");
    const insight = getTopicQuizInsights(t);
    const suggested = getSuggestedNextTopics(t.id, 3);
    const suggestionText = suggested.length
      ? suggested.map((m) => `T${m.id} ${m.title}`).join(", ")
      : "another chapter";
    const exhaustionMessage =
      "You have mostly repeated questions in this chapter now. " +
      "For better learning and fair XP, try: " +
      suggestionText +
      ".";
    const shouldNudgeChapterSwitch =
      insight.total >= 10 &&
      !isCooldownActive(insight.topicMasteredUntil) &&
      (insight.unseenCount <= 2 || insight.freshEligible <= 3 || insight.exhaustedShare >= 0.7);
    start.onclick = () => {
      if (isCooldownActive(insight.topicMasteredUntil)) return;
      if (isTopicXpLocked(t.id)) {
        showExplain(
          "Chapter XP pause",
          topicLockMessage(t.id),
          () => {
            route = { view: "home" };
            renderHome();
          },
          "Pick another chapter from Home."
        );
        return;
      }
      if (shouldNudgeChapterSwitch) {
        showExplain(
          "Chapter mostly completed",
          exhaustionMessage,
          () => {
            if (insight.weakCount > 0) markDailyWeakTopic(t.id);
            wrap.hidden = true;
            play.hidden = false;
            runQuiz(t, play);
          },
          "You can still continue here, but switching chapters is recommended."
        );
        return;
      }
      if (insight.weakCount > 0) markDailyWeakTopic(t.id);
      wrap.hidden = true;
      play.hidden = false;
      runQuiz(t, play);
    };
    if (review) {
      review.onclick = () => {
        if (isTopicXpLocked(t.id)) {
          showExplain(
            "Chapter XP pause",
            topicLockMessage(t.id),
            () => {
              route = { view: "home" };
              renderHome();
            },
            "You can still study Notes/Cards, but quiz XP here is paused."
          );
          return;
        }
        if (shouldNudgeChapterSwitch && insight.weakCount <= 2) {
          showExplain(
            "Review is getting repetitive",
            exhaustionMessage,
            () => {
              if (insight.weakCount > 0) markDailyWeakTopic(t.id);
              wrap.hidden = true;
              play.hidden = false;
              runQuiz(t, play, { review: true });
            },
            "You can still continue if you want."
          );
          return;
        }
        if (insight.weakCount > 0) markDailyWeakTopic(t.id);
        wrap.hidden = true;
        play.hidden = false;
        runQuiz(t, play, { review: true });
      };
    }
  }

  function showExplain(title, body, then, note) {
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelSettings = document.getElementById("panel-settings");
    const panelShop = document.getElementById("panel-shop");
    panelSettings.hidden = true;
    if (panelShop) panelShop.hidden = true;
    document.getElementById("explain-title").textContent = title;
    const explainBody = document.getElementById("explain-body");
    explainBody.innerHTML = `${renderMiniMarkdown(body)}${
      note ? `<span class="explain-note">${escapeHtml(note)}</span>` : ""
    }`;
    renderMathWhenReady(explainBody, 0);
    panelExplain.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    const ok = document.getElementById("btn-explain-ok");
    const once = () => {
      ok.removeEventListener("click", once);
      panelExplain.hidden = true;
      closeModalRoot(root);
      then();
    };
    ok.addEventListener("click", once);
  }

  function closeModalRoot(root) {
    if (!root) return;
    const active = document.activeElement;
    if (active && root.contains(active) && typeof active.blur === "function") {
      active.blur();
    }
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
  }

  function getTopicQuizBank(t) {
    const base = Array.isArray(t.quiz) ? t.quiz : [];
    const byTopic = window.EXTRA_QUIZ_BY_TOPIC || {};
    const extra = Array.isArray(byTopic[String(t.id)]) ? byTopic[String(t.id)] : [];
    return base.concat(extra).map((q) => ({ ...q, __topicId: q.__topicId || t.id }));
  }

  function getThemeExtraQuiz(themeKey) {
    const byTheme = window.EXTRA_THEME_QUIZ || {};
    if (Array.isArray(byTheme[themeKey])) return byTheme[themeKey];
    const norm = String(themeKey || "").trim().toLowerCase();
    const hitKey = Object.keys(byTheme).find(
      (k) => String(k).trim().toLowerCase() === norm
    );
    return hitKey && Array.isArray(byTheme[hitKey]) ? byTheme[hitKey] : [];
  }

  function getTopicQuizInsights(t) {
    const annotated = annotateQuizBank(getTopicQuizBank(t), t.id);
    const topicStats = touchTopicStats(t.id);
    const weakCount = annotated.filter((item) => item.bucket === "weak").length;
    const unseenCount = annotated.filter((item) => item.bucket === "new").length;
    const masteredCount = annotated.filter(
      (item) => item.bucket === "mastered"
    ).length;
    const coolingCount = annotated.filter((item) =>
      isCooldownActive(item.stats.masteredUntil)
    ).length;
    const avgMastery = annotated.length
      ? annotated.reduce(
          (sum, item) => sum + (item.stats.mastery || 0),
          0
        ) / annotated.length
      : 0;
    const freshEligible = annotated.filter(
      (item) =>
        item.bucket === "new" ||
        item.bucket === "weak" ||
        item.bucket === "improving"
    ).length;
    const exhaustedShare = annotated.length
      ? (annotated.length - freshEligible) / annotated.length
      : 0;
    let label = "New";
    if (annotated.some((item) => item.stats.seen > 0)) {
      label = "Improving";
      if (avgMastery >= 85) label = "Mastered";
      else if (avgMastery >= 60) label = "Strong";
    }
    return {
      total: annotated.length,
      weakCount,
      unseenCount,
      masteredCount,
      coolingCount,
      avgMastery,
      freshEligible,
      exhaustedShare,
      label,
      topicMasteredUntil: topicStats.masteredUntil || 0,
      topicXpLockUntil: topicStats.xpLockUntil || 0,
    };
  }

  function pickAdaptiveQuestions(t, opts) {
    opts = opts || {};
    const annotated = annotateQuizBank(getTopicQuizBank(t), t.id);
    const topicStats = touchTopicStats(t.id);
    if (!opts.review && isCooldownActive(topicStats.masteredUntil)) {
      return [];
    }
    const eligible = opts.review
      ? annotated
      : annotated.filter((item) => !isCooldownActive(item.stats.masteredUntil));
    const n = Math.min(QUIZ_PER_ROUND, eligible.length);
    const rank = (items) =>
      items
        .map((item) => ({ ...item, _rand: Math.random() }))
        .sort((a, b) => b.priority - a.priority || a._rand - b._rand);
    const weak = rank(eligible.filter((item) => item.bucket === "weak"));
    const fresh = rank(eligible.filter((item) => item.bucket === "new"));
    const normal = rank(
      eligible.filter(
        (item) => item.bucket === "improving" || item.bucket === "strong"
      )
    );
    const mastered = rank(
      eligible.filter((item) => item.bucket === "mastered")
    );

    if (opts.review) {
      const reviewPool = weak.length
        ? weak
        : normal.length
          ? normal
          : rank(annotated);
      return reviewPool.slice(0, Math.min(n, reviewPool.length)).map((item) => ({
        ...item.q,
        __questionKey: item.questionKey,
      }));
    }

    const selected = [];
    const used = new Set();
    const takeFrom = (items, count) => {
      for (const item of items) {
        if (selected.length >= n || count <= 0) break;
        if (used.has(item.questionKey)) continue;
        used.add(item.questionKey);
        selected.push({ ...item.q, __questionKey: item.questionKey });
        count--;
      }
    };

    takeFrom(weak, Math.min(6, weak.length));
    takeFrom(fresh, Math.min(5, fresh.length));
    takeFrom(normal, Math.max(0, n - selected.length - Math.min(2, mastered.length)));
    takeFrom(mastered, Math.min(2, mastered.length));
    takeFrom(rank(eligible), n - selected.length);

    return selected;
  }

  function recordQuestionOutcome(q, fallbackTopicId, outcome, elapsedSec) {
    const topicId = getQuestionTopicId(q, fallbackTopicId);
    const questionKey = q.__questionKey || getQuestionKey(q, fallbackTopicId);
    const stats = touchQuestionStats(topicId, questionKey);
    const topic = touchTopicStats(topicId);
    stats.seen += 1;
    stats.lastSeenAt = Date.now();
    stats.lastAskedAt = Date.now();
    stats.lastResult = outcome;
    topic.lastStudiedAt = Date.now();
    topic.lastQuizAt = Date.now();
    topic.totalQuestionsSeen += 1;
    if (outcome === "correct") {
      stats.correct += 1;
      stats.streak += 1;
      stats.recentCorrectRun += 1;
      stats.lastCorrectAt = Date.now();
      let gain = 10 + Math.min(10, stats.streak * 2);
      if (elapsedSec <= QUESTION_MS / 1000 / 2) gain += 6;
      stats.mastery = Math.min(100, stats.mastery + gain);
      if (stats.mastery >= 85 && stats.recentCorrectRun >= 3) {
        stats.masteredUntil = Date.now() + QUESTION_MASTERY_COOLDOWN_MS;
      }
    } else if (outcome === "wrong") {
      stats.wrongs += 1;
      stats.streak = 0;
      stats.recentCorrectRun = 0;
      stats.masteredUntil = 0;
      stats.lastWrongAt = Date.now();
      stats.mastery = Math.max(0, stats.mastery - 18);
      topic.totalWrong += 1;
    } else if (outcome === "timeout") {
      stats.wrongs += 1;
      stats.streak = 0;
      stats.recentCorrectRun = 0;
      stats.masteredUntil = 0;
      stats.lastWrongAt = Date.now();
      stats.mastery = Math.max(0, stats.mastery - 24);
      topic.totalWrong += 1;
    }
    saveState();
  }

  function getQuestionConfidenceMeta(q, fallbackTopicId) {
    const info = readQuestionStats(q, fallbackTopicId);
    const stats = info.stats || {};
    const mastery = Math.max(0, Math.min(100, Math.round(stats.mastery || 0)));
    const bucket = getQuestionBucket(stats);
    let label = "Building";
    let reason = "Keep seeing this a little more until the pattern is stable.";
    let tone = "building";

    if (bucket === "new") {
      label = "New";
      tone = "new";
      reason = "This is still new, so it will come back a few times to build memory.";
    } else if (bucket === "weak") {
      label = "Needs practice";
      tone = "weak";
      if (stats.lastResult === "timeout") {
        reason = "This one is shown more often because time ran out recently.";
      } else {
        reason = "This one is shown more often because it was missed recently.";
      }
    } else if (bucket === "strong") {
      label = "Strong";
      tone = "strong";
      reason = "You usually get this right, so it should appear less often now.";
    } else if (bucket === "mastered") {
      label = "Mastered";
      tone = "mastered";
      reason = isCooldownActive(stats.masteredUntil)
        ? `Cooling down until ${formatShortDate(stats.masteredUntil)} because it has been answered correctly several times in a row.`
        : "This should appear only occasionally now for spaced review.";
    }

    return { mastery, label, reason, tone };
  }

  function renderQuestionConfidenceHtml(q, fallbackTopicId) {
    const meta = getQuestionConfidenceMeta(q, fallbackTopicId);
    return `
      <div class="question-confidence ${meta.tone}">
        <div class="question-confidence-head">
          <span class="question-confidence-label">${escapeHtml(meta.label)}</span>
          <span class="question-confidence-pct">${meta.mastery}%</span>
        </div>
        <div class="question-confidence-bar"><div class="question-confidence-fill" style="width:${meta.mastery}%"></div></div>
        <div class="question-confidence-reason">${escapeHtml(meta.reason)}</div>
      </div>`;
  }

  function getQuestionXpMeta(bucket, opts) {
    opts = opts || {};
    const isReview = !!opts.review;
    const cooled = !!opts.cooled;
    if (cooled) {
      return {
        delta: 1,
        reason: isReview
          ? "quiz_correct_mastered_review_reduced"
          : "quiz_correct_mastered_reduced",
      };
    }
    if (bucket === "new") return { delta: 10, reason: "quiz_correct_new" };
    if (bucket === "weak") {
      return {
        delta: isReview ? 12 : 11,
        reason: isReview
          ? "quiz_correct_weak_review"
          : "quiz_correct_weak_recovered",
      };
    }
    if (bucket === "improving") {
      return { delta: isReview ? 5 : 7, reason: "quiz_correct_improving" };
    }
    if (bucket === "strong") {
      return {
        delta: isReview ? 3 : 4,
        reason: isReview ? "quiz_correct_strong_review" : "quiz_correct_strong",
      };
    }
    return { delta: isReview ? 2 : 2, reason: "quiz_correct_mastered_reduced" };
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

  function runQuiz(t, container, opts) {
    opts = opts || {};
    const isBoss = !!opts.boss;
    const isReview = !!opts.review;
    if (!isBoss && isTopicXpLocked(t.id)) {
      container.innerHTML = `<div class="game-win"><h3>Chapter XP paused</h3><p>${escapeHtml(
        topicLockMessage(t.id)
      )}</p></div>`;
      return;
    }
    const healthMax = isBoss ? 1 : HEALTH_START;
    const questionMs = isBoss ? Math.round(QUESTION_MS * BOSS_QUESTION_MS_MULT) : QUESTION_MS;
    const topicStats = !isBoss && t.id ? touchTopicStats(t.id) : null;
    const qs = pickAdaptiveQuestions(t, opts);
    if (!qs.length) {
      container.innerHTML = `<div class="game-win"><h3>No questions ready</h3><p>${
        isReview
          ? "You do not have enough weak questions yet. Try a normal quiz first."
          : topicStats && isCooldownActive(topicStats.masteredUntil)
            ? `Adaptive quiz is cooling down until ${formatShortDate(
                topicStats.masteredUntil
              )}. Use review mode if you still want a quick check.`
            : "This topic does not have a quiz bank yet."
      }</p></div>`;
      return;
    }
    let qi = 0;
    let score = 0;
    let combo = 0;
    let health = healthMax;
    let timerId = null;
    let qStart = 0;
    let wrongCount = 0;
    let timedOutCurrent = false;

    function renderQ() {
      if (qi >= qs.length) {
        const pct = Math.round((score / (qs.length * 100)) * 100);
        const capped = Math.min(100, pct);
        if (!isBoss && !isReview && t.id) {
          state.topicScores[t.id] = (state.topicScores[t.id] || 0) + 1;
          if ((state.topicBest[t.id] || 0) < capped)
            state.topicBest[t.id] = capped;
          addXp(Math.max(12, Math.round(capped * 0.8 + combo * 3)), {
            topicId: t.id,
            theme: t.theme,
            tab: "quiz",
            activityType: "quiz",
            sourceId: `round:${t.id}:${Date.now()}`,
            reason: "quiz_round_complete",
          });
        } else if (isReview && t.id) {
          addXp(Math.max(8, Math.round(capped * 0.45 + combo * 2)), {
            topicId: t.id,
            theme: t.theme,
            tab: "quiz",
            activityType: "quiz_review",
            sourceId: `review:${t.id}:${Date.now()}`,
            reason: "review_round_complete",
          });
          if (qs.length) markDailyReviewRound();
        } else if (isBoss && opts.themeId) {
          state.themeBossBeaten = state.themeBossBeaten || {};
          state.themeBossBeaten[opts.themeId] = true;
          addXp(BOSS_XP, {
            theme: opts.themeId,
            tab: "quiz",
            activityType: "boss",
            sourceId: `boss:${opts.themeId}`,
            reason: "boss_win",
          });
        }
        if (!isBoss && t.id) {
          recordTopicRoundResult(t, {
            review: isReview,
            wrongCount,
            totalQuestions: qs.length,
            pct: capped,
          });
        } else {
          saveState();
        }
        const bossMsg = isBoss ? `<p class="boss-reward">🏆 +${BOSS_XP} XP · Theme badge unlocked!</p>` : "";
        container.innerHTML = `
          <div class="game-win">
            <h3>${isBoss ? "Boss defeated!" : isReview ? "Review complete" : "Round complete"}</h3>
            <p>Score: ${score} · ~${capped}%${!isBoss && !isReview && t.id ? " · Best saved: " + state.topicBest[t.id] + "%" : ""}</p>
            ${bossMsg}
            <button type="button" class="btn primary" id="quiz-again">${isBoss ? "Back to topics" : "Again"}</button>
          </div>`;
        document.getElementById("quiz-again").onclick = () => {
          container.innerHTML = "";
          if (isBoss) {
            route = { view: "home" };
            renderHome();
          } else if (isReview) {
            runQuiz(t, container, { review: true });
          } else {
            runQuiz(t, container);
          }
        };
        return;
      }

      const q = qs[qi];
      const optionItems = shuffle(q.options.map((o, i) => ({ o, i })));
      container.innerHTML = `
        <div class="quiz-meta">
          <div class="timer-bar-wrap"><div class="timer-bar" id="q-timer"></div></div>
          <span class="combo" id="q-combo">${isReview ? "Review mode" : combo >= COMBO_AT ? "🔥 COMBO x" + COMBO_MULT : ""}</span>
          <div class="health-bar" id="q-health">${Array(healthMax)
            .fill(0)
            .map(
              (_, h) =>
                `<span class="health-dot ${
                  h >= health ? "lost" : ""
                }"></span>`
            )
            .join("")}</div>
        </div>
        <div class="quiz-q" id="quiz-question"></div>
        <div class="quiz-options" id="q-opts"></div>
        <div class="quiz-score-line">Points this round: ${score}</div>
        <div id="quiz-confidence"></div>
      `;
      const qEl = document.getElementById("quiz-question");
      if (qEl) {
        qEl.innerHTML = renderMiniMarkdown(q.question || "");
        renderMathWhenReady(qEl, 0);
      }
      const bar = document.getElementById("q-timer");
      bar.style.transition = "none";
      bar.style.width = "100%";
      void bar.offsetWidth;
      bar.style.transition = `width ${questionMs}ms linear`;
      bar.style.width = "0%";
      qStart = Date.now();
      timedOutCurrent = false;
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Boss keeps strict timeout. Normal/review quiz allows overtime answer with reduced XP.
        if (isBoss) {
          finish(false, true);
          return;
        }
        timedOutCurrent = true;
        if (bar) bar.style.width = "0%";
        const confidence = document.getElementById("quiz-confidence");
        if (confidence) {
          confidence.innerHTML =
            "<div class='question-confidence weak'><div class='question-confidence-reason'>Time is up for bonus speed XP, but you can still answer this question. Overtime correct answers give reduced XP.</div></div>";
        }
      }, questionMs);

      const optEl = document.getElementById("q-opts");
      optionItems.forEach(({ o, i }) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "quiz-opt";
        b.innerHTML = renderMiniMarkdown(o);
        b.dataset.idx = String(i);
        renderMathWhenReady(b, 0);
        b.onclick = () => {
          if (b.disabled) return;
          finish(i === q.correctIndex, false, b);
        };
        optEl.appendChild(b);
      });
    }

    function finish(correct, timeout, clickedBtn) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      const q = qs[qi];
      const elapsed = (Date.now() - qStart) / 1000;
      const preInfo = readQuestionStats(q, t.id);
      const preBucket = getQuestionBucket(preInfo.stats);
      const wasCooled = isCooldownActive(preInfo.stats.masteredUntil);
      const opts = document.querySelectorAll(".quiz-opt");
      opts.forEach((b) => (b.disabled = true));
      if (timeout) {
        wrongCount++;
        recordQuestionOutcome(q, t.id, "timeout", elapsed);
        const confidenceMeta = getQuestionConfidenceMeta(q, t.id);
        if (isBoss) {
          health = Math.max(0, health - 1);
          if (health === 0) {
            container.innerHTML = `
              <div class="game-win" style="border-color: var(--danger);">
                <h3>Boss wins this time</h3>
                <p>Time's up. Review and try again!</p>
                <button type="button" class="btn primary" id="quiz-boss-retry2">Back to topics</button>
              </div>`;
            document.getElementById("quiz-boss-retry2").onclick = () => {
              route = { view: "home" };
              renderHome();
            };
            return;
          }
        }
        showExplain("Time's up", q.explanation, () => {
          combo = 0;
          qi++;
          renderQ();
        }, `${confidenceMeta.label} · ${confidenceMeta.reason}`);
        return;
      }
      markDailyAnswered(1);
      if (correct) {
        recordQuestionOutcome(q, t.id, "correct", elapsed);
        if (!isBoss) {
          const reward = getQuestionXpMeta(preBucket, {
            review: isReview,
            cooled: wasCooled,
          });
          const fastGuess = elapsed < 1.2;
          let xpMultiplier = fastGuess ? 0.4 : 1;
          let reason = fastGuess ? `${reward.reason}_very_fast` : reward.reason;
          if (timedOutCurrent) {
            xpMultiplier *= 0.5;
            reason += "_overtime";
          }
          addXp(reward.delta, {
            topicId: getQuestionTopicId(q, t.id),
            theme: t.theme,
            tab: "quiz",
            activityType: isReview ? "quiz_review" : "quiz",
            sourceId: q.__questionKey || getQuestionKey(q, t.id),
            reason,
            xpMultiplier,
          });
        }
        combo++;
        let pts = 100;
        const timeLeft = Math.max(0, 1 - elapsed / (QUESTION_MS / 1000));
        pts = Math.round(60 + 40 * timeLeft);
        if (combo >= COMBO_AT) pts = Math.round(pts * COMBO_MULT);
        score += pts;
        opts.forEach((b) => {
          if (Number(b.dataset.idx) === q.correctIndex)
            b.classList.add("correct");
        });
        const confidence = document.getElementById("quiz-confidence");
        if (confidence) {
          confidence.innerHTML = renderQuestionConfidenceHtml(q, t.id);
        }
        setTimeout(() => {
          qi++;
          renderQ();
        }, 900);
      } else {
        wrongCount++;
        recordQuestionOutcome(q, t.id, "wrong", elapsed);
        const confidenceMeta = getQuestionConfidenceMeta(q, t.id);
        if (elapsed < EARLY_WRONG_SEC || isBoss) {
          health = Math.max(0, health - 1);
        }
        combo = 0;
        if (clickedBtn) clickedBtn.classList.add("wrong");
        opts.forEach((b) => {
          if (Number(b.dataset.idx) === q.correctIndex)
            b.classList.add("correct");
        });
        const next = () => {
          qi++;
          renderQ();
        };
        if (isBoss && health === 0) {
          container.innerHTML = `
            <div class="game-win" style="border-color: var(--danger);">
              <h3>Boss wins this time</h3>
              <p>Out of health. Review the topic and try again!</p>
              <button type="button" class="btn primary" id="quiz-boss-retry">Back to topics</button>
            </div>`;
          document.getElementById("quiz-boss-retry").onclick = () => {
            route = { view: "home" };
            renderHome();
          };
        } else {
          showExplain(
            "Not quite",
            q.explanation,
            next,
            `${confidenceMeta.label} · ${confidenceMeta.reason} · No XP for wrong answer${timedOutCurrent ? " (answered after time)" : ""}, but this question will show up again for practice.`
          );
        }
      }
    }

    renderQ();
  }

  function bindGames(t) {
    document.getElementById("game-match").onclick = () =>
      runMatchGame(t, document.getElementById("game-area"));
    const seqBtn = document.getElementById("game-seq");
    if (seqBtn)
      seqBtn.onclick = () =>
        runSequenceGame(t, document.getElementById("game-area"));
    const tfBtn = document.getElementById("game-tf");
    if (tfBtn)
      tfBtn.onclick = () =>
        runTrueFalseGame(t, document.getElementById("game-area"));
  }

  function runTrueFalseGame(t, area) {
    const pool = shuffle(t.trueFalse.slice()).slice(0, 10);
    let i = 0;
    let correct = 0;
    function show() {
      if (i >= pool.length) {
        const xp = correct * 3 + (correct === pool.length ? 15 : 0);
        addXp(xp, {
          topicId: t.id,
          theme: t.theme,
          tab: "game",
          activityType: "game_tf",
          sourceId: `tf:${t.id}`,
          reason: "game_true_false_complete",
        });
        area.innerHTML = `<div class="game-win"><h3>Round done</h3><p>${correct}/${pool.length} correct · +${xp} XP</p></div>`;
        return;
      }
      const item = pool[i];
      area.innerHTML = `
        <p class="tf-progress">${i + 1} / ${pool.length}</p>
        <p class="tf-statement">${escapeHtml(item.statement)}</p>
        <div class="tf-row">
          <button type="button" class="btn primary tf-pick" data-v="true">True</button>
          <button type="button" class="btn tf-pick" data-v="false">False</button>
        </div>
        <p class="tf-feedback" id="tf-feedback" hidden></p>
        <button type="button" class="btn" id="tf-next" hidden>Next</button>`;
      const fb = document.getElementById("tf-feedback");
      const next = document.getElementById("tf-next");
      area.querySelectorAll(".tf-pick").forEach((btn) => {
        btn.onclick = () => {
          const ans = btn.dataset.v === "true";
          const ok = ans === item.correct;
          if (ok) correct++;
          fb.hidden = false;
          fb.className = "tf-feedback " + (ok ? "tf-ok" : "tf-bad");
          fb.textContent = (ok ? "✓ " : "✗ ") + item.explain;
          area.querySelectorAll(".tf-pick").forEach((b) => (b.disabled = true));
          next.hidden = false;
        };
      });
      next.onclick = () => {
        i++;
        show();
      };
    }
    show();
  }

  function runMatchGame(t, area) {
    const cards = shuffle(t.flashcards).slice(0, 8);
    if (cards.length < 4) {
      area.innerHTML = "<p class='empty-state'>Need more flashcards.</p>";
      return;
    }
    const pairs = cards.slice(0, 8);
    const tiles = [];
    pairs.forEach((c, i) => {
      tiles.push({ id: `f${i}`, text: c.front, match: `b${i}` });
      tiles.push({ id: `b${i}`, text: c.back, match: `f${i}` });
    });
    const isAdjacent = (a, b, cols) => {
      const ar = Math.floor(a / cols);
      const ac = a % cols;
      const br = Math.floor(b / cols);
      const bc = b % cols;
      return (ar === br && Math.abs(ac - bc) === 1) || (ac === bc && Math.abs(ar - br) === 1);
    };

    const adjacentPairCount = (arr, cols) => {
      const posById = {};
      arr.forEach((tile, idx) => {
        posById[tile.id] = idx;
      });
      let count = 0;
      const seen = new Set();
      arr.forEach((tile) => {
        const a = tile.id;
        const b = tile.match;
        const key = a < b ? `${a}|${b}` : `${b}|${a}`;
        if (seen.has(key)) return;
        seen.add(key);
        if (isAdjacent(posById[a], posById[b], cols)) count++;
      });
      return count;
    };

    // Optimize the shuffled layout to avoid adjacent answer pairs.
    // We score against both mobile (2 cols) and wider (3 cols) grid modes.
    let arranged = shuffle(tiles);
    let best = arranged;
    let bestScore = adjacentPairCount(best, 2) + adjacentPairCount(best, 3);
    for (let tries = 0; tries < 200 && bestScore > 0; tries++) {
      const cand = shuffle(tiles);
      const score = adjacentPairCount(cand, 2) + adjacentPairCount(cand, 3);
      if (score < bestScore) {
        best = cand;
        bestScore = score;
      }
      if (score === 0) {
        best = cand;
        bestScore = 0;
        break;
      }
    }
    arranged = best;
    let sel = null;
    let matched = 0;
    area.innerHTML =
      '<div class="match-grid" id="match-grid"></div><p class="flash-progress" id="match-status"></p>';
    const grid = document.getElementById("match-grid");
    arranged.forEach((tile) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-tile";
      btn.textContent = tile.text.length > 60 ? tile.text.slice(0, 57) + "…" : tile.text;
      btn.dataset.id = tile.id;
      btn.dataset.match = tile.match;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("matched") || btn.disabled) return;
        if (!sel) {
          sel = btn;
          btn.classList.add("selected");
          return;
        }
        if (sel === btn) {
          sel.classList.remove("selected");
          sel = null;
          return;
        }
        if (sel.dataset.match === btn.dataset.id) {
          sel.classList.add("matched");
          btn.classList.add("matched");
          sel.classList.remove("selected");
          sel = null;
          matched += 2;
          if (matched === arranged.length) {
            addXp(25, {
              topicId: t.id,
              theme: t.theme,
              tab: "game",
              activityType: "game_match",
              sourceId: `match:${t.id}`,
              reason: "game_match_complete",
            });
            document.getElementById("match-status").textContent =
              "Cleared! +25 XP";
          }
        } else {
          btn.classList.add("wrong-flash");
          sel.classList.add("wrong-flash");
          const s = sel;
          setTimeout(() => {
            btn.classList.remove("wrong-flash");
            s.classList.remove("selected", "wrong-flash");
          }, 400);
          sel = null;
        }
      });
      grid.appendChild(btn);
    });
  }

  function runSequenceGame(t, area) {
    let order = shuffle(t.orderGame.slice());
    area.innerHTML = `
      <p class="game-intro">Drag to reorder (tap two items to swap on mobile).</p>
      <div class="sequence-game" id="seq-list"></div>
      <button type="button" class="btn primary" id="seq-check">Check order</button>`;
    const list = document.getElementById("seq-list");

    function renderList() {
      list.innerHTML = "";
      list._tap = null;
      order.forEach((text, idx) => {
        const el = document.createElement("div");
        el.className = "seq-item";
        el.textContent = text;
        el.draggable = true;
        el.dataset.idx = idx;
        el.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", String(idx));
          list.classList.add("dragging");
        });
        el.addEventListener("dragend", () =>
          list.classList.remove("dragging")
        );
        el.addEventListener("dragover", (e) => e.preventDefault());
        el.addEventListener("drop", (e) => {
          e.preventDefault();
          const from = Number(e.dataTransfer.getData("text/plain"));
          const to = idx;
          const o = order.slice();
          const [x] = o.splice(from, 1);
          o.splice(to, 0, x);
          order = o;
          renderList();
        });
        el.addEventListener("click", () => {
          if (list._tap == null) {
            list._tap = idx;
            el.style.outline = "2px solid var(--accent)";
            return;
          }
          const a = list._tap;
          list._tap = null;
          list.querySelectorAll(".seq-item").forEach((x) => (x.style.outline = ""));
          if (a === idx) return;
          const o = order.slice();
          [o[a], o[idx]] = [o[idx], o[a]];
          order = o;
          renderList();
        });
        list.appendChild(el);
      });
    }
    renderList();
    document.getElementById("seq-check").onclick = () => {
      const ok = order.every((text, i) => text === t.orderGame[i]);
      if (ok) {
        addXp(40, {
          topicId: t.id,
          theme: t.theme,
          tab: "game",
          activityType: "game_sequence",
          sourceId: `sequence:${t.id}`,
          reason: "game_sequence_complete",
        });
        area.innerHTML =
          '<div class="game-win"><h3>Perfect order</h3><p>+40 XP</p></div>';
      } else {
        alert(
          "Not yet — compare with Notes. Correct order matches the syllabus sequence."
        );
      }
    };
  }

  function startBossBattle(themeKey) {
    const name = themeKey;
    const ids = themesByKey[themeKey];
    if (
      !ids ||
      state.themeBossBeaten &&
        state.themeBossBeaten[themeKey]
    )
      return;
    main.innerHTML = `
      <div class="boss-intro">
        <h1>Boss: ${escapeHtml(name)}</h1>
        <p><strong>Rules:</strong> 1 HP only · timer is 20% faster · strict timeout (no overtime answers) · mixed questions from all topics in this theme.</p>
        <p id="boss-count" class="hint">Loading question count…</p>
        <p>Win to earn <strong>${BOSS_XP} XP</strong> and a permanent badge.</p>
        <button type="button" class="btn primary" id="boss-start" disabled>Start battle</button>
        <button type="button" class="btn" id="boss-cancel">Cancel</button>
      </div>
      <div id="boss-quiz-container" hidden></div>`;
    document.getElementById("boss-cancel").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    const countEl = document.getElementById("boss-count");
    const startBtn = document.getElementById("boss-start");
    let preparedQuiz = [];
    Promise.all(ids.map((id) => loadTopicScript(id)))
      .then((topics) => {
        const allQuiz = topics.flatMap((topic) =>
          getTopicQuizBank(topic).map((q) => ({ ...q }))
        );
        const themeExtra = getThemeExtraQuiz(themeKey).map((q) => ({ ...q }));
        allQuiz.push(...themeExtra);
        preparedQuiz = allQuiz;
        if (countEl) {
          countEl.textContent = `Question bank: ${allQuiz.length} total (each boss run uses ${Math.min(
            QUIZ_PER_ROUND,
            allQuiz.length
          )} adaptive questions).`;
        }
        if (startBtn) startBtn.disabled = allQuiz.length === 0;
      })
      .catch(() => {
        if (countEl) countEl.textContent = "Failed to load question count. Please retry.";
      });

    document.getElementById("boss-start").onclick = () => {
      document.querySelector(".boss-intro").hidden = true;
      const container = document.getElementById("boss-quiz-container");
      container.hidden = false;
      if (!preparedQuiz.length) {
        container.innerHTML =
          "<p class='empty-state'>No boss questions available for this theme yet.</p><button type='button' class='btn primary' id='boss-back'>Back</button>";
        document.getElementById("boss-back").onclick = () => renderHome();
        return;
      }
      const synthetic = { id: "boss:" + themeKey, quiz: preparedQuiz };
      runQuiz(synthetic, container, { boss: true, themeId: themeKey });
    };
  }

  function formatMinutes(ms) {
    const mins = Math.round((ms || 0) / 60000);
    return `${mins} min`;
  }

  function buildStudyReport() {
    const xpByTopic = {};
    const recentXp = (state.xpLedger || [])
      .slice()
      .sort((a, b) => b.ts - a.ts);
    recentXp.forEach((entry) => {
      if (!entry || entry.deltaXp <= 0) return;
      const topicId = entry.topicId || "general";
      const topicMeta = topicId === "general" ? null : getTopicMeta(topicId);
      const label = topicMeta ? `T${topicId} ${topicMeta.title}` : "General";
      if (!xpByTopic[label]) {
        xpByTopic[label] = { label, totalXp: 0, byActivity: {} };
      }
      xpByTopic[label].totalXp += entry.deltaXp;
      const activity = entry.activityType || "study";
      xpByTopic[label].byActivity[activity] =
        (xpByTopic[label].byActivity[activity] || 0) + entry.deltaXp;
    });
    const xpTopicRows = Object.values(xpByTopic)
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, 10);

    const missRows = [];
    Object.keys(state.questionStats || {}).forEach((topicId) => {
      const topicMeta = getTopicMeta(topicId);
      Object.entries(state.questionStats[topicId] || {}).forEach(([key, stats]) => {
        if (!stats || !stats.wrongs) return;
        missRows.push({
          topicId,
          topicTitle: topicMeta ? topicMeta.title : topicId,
          questionKey: key,
          wrongs: stats.wrongs || 0,
          mastery: Math.round(stats.mastery || 0),
        });
      });
    });
    missRows.sort((a, b) => b.wrongs - a.wrongs || a.mastery - b.mastery);

    const topicRows = Object.keys(state.topicStats || {})
      .map((topicId) => {
        const stats = touchTopicStats(topicId);
        const meta = getTopicMeta(topicId);
        return {
          topicId,
          title: meta ? meta.title : topicId,
          mastery: Math.round(stats.mastery || 0),
          lastStudiedAt: stats.lastStudiedAt || 0,
          masteredUntil: stats.masteredUntil || 0,
          errorFreeRounds: stats.errorFreeRounds || 0,
          totalWrong: stats.totalWrong || 0,
        };
      })
      .sort(
        (a, b) =>
          Number(isCooldownActive(b.masteredUntil)) -
            Number(isCooldownActive(a.masteredUntil)) ||
          b.mastery - a.mastery
      );

    const studyTimeRows = Object.keys(state.studyTimeMsByTopicTab || {})
      .map((topicId) => {
        const perTab = state.studyTimeMsByTopicTab[topicId] || {};
        const totalMs = Object.values(perTab).reduce((sum, v) => sum + (v || 0), 0);
        const meta = getTopicMeta(topicId);
        return {
          topicId,
          title: meta ? meta.title : topicId,
          totalMs,
          perTab,
        };
      })
      .sort((a, b) => b.totalMs - a.totalMs)
      .slice(0, 10);

    const purchases = (state.purchaseLedger || [])
      .slice()
      .sort((a, b) => b.ts - a.ts);

    const anomalyFlags = [];
    const last24hXp = sumRecentXpBy(() => true, 1000 * 60 * 60 * 24);
    const last24hQuizXp = sumRecentXpBy(
      (entry) => String(entry.activityType || "").startsWith("quiz"),
      1000 * 60 * 60 * 24
    );
    const masteredAnswered = Object.values(state.questionStats || {}).reduce(
      (sum, byQ) =>
        sum +
        Object.values(byQ || {}).filter(
          (s) => (s && s.recentCorrectRun >= 3 && (s.mastery || 0) >= 85) || isCooldownActive(s.masteredUntil)
        ).length,
      0
    );
    if (last24hXp >= 220 && last24hQuizXp < 50) {
      anomalyFlags.push("High XP but low quiz contribution in last 24h.");
    }
    if (masteredAnswered >= 25) {
      anomalyFlags.push("Many mastered questions repeated recently; possible farming loop.");
    }
    const fastGuessCount = (state.xpLedger || []).filter(
      (e) =>
        e &&
        e.deltaXp > 0 &&
        e.ts >= Date.now() - 1000 * 60 * 60 * 24 &&
        String(e.reason || "").includes("_very_fast")
    ).length;
    if (fastGuessCount >= 15) {
      anomalyFlags.push("Many very-fast quiz answers in last 24h; XP was auto-reduced.");
    }
    const dominantTopic = reportDominantTopicFromLedger();
    if (dominantTopic && dominantTopic.share >= 0.75 && dominantTopic.totalXp >= 120) {
      anomalyFlags.push(
        `XP highly concentrated in one topic (${dominantTopic.topicLabel}, ${Math.round(
          dominantTopic.share * 100
        )}%).`
      );
    }

    const passThreshold = state.challengeMode ? 80 : PASS_PCT;
    const lockedTopics = manifest
      .filter((m) => !isUnlocked(m.id))
      .map((m) => {
        const i = topicIndex(m.id);
        const prev = i > 0 ? manifest[i - 1] : null;
        const prevBest = prev ? Number(state.topicBest[prev.id] || 0) : 0;
        return {
          id: m.id,
          title: m.title,
          blockedByTopicId: prev ? prev.id : null,
          blockedByTopicTitle: prev ? prev.title : "",
          blockedByBest: prevBest,
          needed: passThreshold,
        };
      });
    const xpPausedTopics = manifest
      .map((m) => {
        const stats = touchTopicStats(m.id);
        const until = Number(stats.xpLockUntil || 0);
        if (!isCooldownActive(until)) return null;
        return {
          id: m.id,
          title: m.title,
          xpLockUntil: until,
        };
      })
      .filter(Boolean);
    const lockDiagnostics = {
      unlockAll: !!state.unlockAll,
      challengeMode: !!state.challengeMode,
      passThreshold,
      lockedTopics,
      xpPausedTopics,
    };

    return {
      generatedAt: new Date().toISOString(),
      subjectId: SUBJECT_ID,
      xpBalance: state.xp || 0,
      ledgerCount: (state.xpLedger || []).length,
      purchaseCount: purchases.length,
      xpTopicRows,
      missRows: missRows.slice(0, 12),
      topicRows,
      studyTimeRows,
      purchases,
      recentXp: recentXp.slice(0, 20),
      anomalyFlags,
      dailyChallenge: getDailyChallengeSummary(),
      syncSnapshot: buildSyncSnapshot(),
      lockDiagnostics,
    };
  }

  function reportDominantTopicFromLedger() {
    const recent = (state.xpLedger || []).filter(
      (e) => e && e.deltaXp > 0 && e.ts >= Date.now() - 1000 * 60 * 60 * 24
    );
    const totals = {};
    let totalXp = 0;
    recent.forEach((entry) => {
      const key = String(entry.topicId || "general");
      totals[key] = (totals[key] || 0) + entry.deltaXp;
      totalXp += entry.deltaXp;
    });
    if (!totalXp) return null;
    const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
    if (!top) return null;
    const meta = top[0] === "general" ? null : getTopicMeta(top[0]);
    return {
      topicId: top[0],
      topicLabel: meta ? `T${top[0]} ${meta.title}` : "General",
      totalXp: top[1],
      share: top[1] / totalXp,
    };
  }

  function renderStudyReportHtml(report) {
    const xpList = report.xpTopicRows.length
      ? `<ol class="report-list">${report.xpTopicRows
          .map(
            (row) =>
              `<li><strong>${escapeHtml(row.label)}</strong> · ${row.totalXp} XP · ${escapeHtml(
                Object.entries(row.byActivity)
                  .map(([k, v]) => `${k} ${v}`)
                  .join(" · ")
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No XP entries yet.</p>";

    const missList = report.missRows.length
      ? `<ol class="report-list">${report.missRows
          .map(
            (row) =>
              `<li><strong>T${escapeHtml(row.topicId)} ${escapeHtml(
                row.topicTitle
              )}</strong> · wrong ${row.wrongs} · mastery ${row.mastery}% · ${escapeHtml(
                row.questionKey.split("::").slice(1).join("::") || row.questionKey
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No repeated misses yet.</p>";

    const topicList = report.topicRows.length
      ? `<ol class="report-list">${report.topicRows
          .map(
            (row) =>
              `<li><strong>T${escapeHtml(row.topicId)} ${escapeHtml(
                row.title
              )}</strong> · mastery ${row.mastery}% · wrong ${row.totalWrong} · ${
                isCooldownActive(row.masteredUntil)
                  ? `cooling until ${escapeHtml(formatShortDate(row.masteredUntil))}`
                  : `last studied ${escapeHtml(
                      formatShortDate(row.lastStudiedAt) || "n/a"
                    )}`
              }</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No topic stats yet.</p>";

    const timeList = report.studyTimeRows.length
      ? `<ol class="report-list">${report.studyTimeRows
          .map(
            (row) =>
              `<li><strong>T${escapeHtml(row.topicId)} ${escapeHtml(
                row.title
              )}</strong> · ${formatMinutes(row.totalMs)} · ${escapeHtml(
                Object.entries(row.perTab)
                  .map(([tab, ms]) => `${tab} ${formatMinutes(ms)}`)
                  .join(" · ")
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No tracked study time yet.</p>";

    const purchaseList = report.purchases.length
      ? `<ol class="report-list">${report.purchases
          .map(
            (purchase) =>
              `<li><strong>${escapeHtml(purchase.label)}</strong> · spent ${
                purchase.xpSpent
              } XP · balance ${purchase.balanceBefore} → ${
                purchase.balanceAfter
              } · evidence ${escapeHtml(
                ((purchase.studyEvidenceWindow || []).slice(0, 3) || [])
                  .map((item) =>
                    `${item.topicId ? "T" + item.topicId : "general"} ${
                      item.activityType
                    } ${item.totalXp} XP`
                  )
                  .join(" | ") || "none"
              )}</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No purchases yet.</p>";

    const recentList = report.recentXp.length
      ? `<ol class="report-list">${report.recentXp
          .map(
            (entry) =>
              `<li>${escapeHtml(formatShortDate(entry.ts))} · ${
                entry.deltaXp > 0 ? "+" : ""
              }${entry.deltaXp} XP · ${escapeHtml(entry.reason || entry.activityType || "study")} · ${
                entry.topicId ? "T" + escapeHtml(entry.topicId) : "general"
              }</li>`
          )
          .join("")}</ol>`
      : "<p class='hint'>No recent activity yet.</p>";
    const anomalyList = report.anomalyFlags && report.anomalyFlags.length
      ? `<ul class="report-list">${report.anomalyFlags
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`
      : "<p class='hint'>No anomaly flags detected.</p>";
    const lockInfo = report.lockDiagnostics || {};
    const lockedTopicList = lockInfo.lockedTopics && lockInfo.lockedTopics.length
      ? `<ul class="report-list">${lockInfo.lockedTopics
          .map(
            (row) =>
              `<li>T${escapeHtml(row.id)} ${escapeHtml(row.title)} · blocked by T${escapeHtml(
                row.blockedByTopicId || "-"
              )} (${escapeHtml(row.blockedByTopicTitle || "n/a")}) best ${row.blockedByBest}% / need ${
                row.needed
              }%</li>`
          )
          .join("")}</ul>`
      : "<p class='hint'>No chapter locks right now.</p>";
    const xpPauseList = lockInfo.xpPausedTopics && lockInfo.xpPausedTopics.length
      ? `<ul class="report-list">${lockInfo.xpPausedTopics
          .map(
            (row) =>
              `<li>T${escapeHtml(row.id)} ${escapeHtml(row.title)} · XP paused until ${escapeHtml(
                formatShortDate(row.xpLockUntil)
              )}</li>`
          )
          .join("")}</ul>`
      : "<p class='hint'>No XP-paused chapters right now.</p>";

    return `
      <div class="report-grid">
        <div class="report-card">
          <h3>Overview</h3>
          <div class="report-statline">
            <span class="report-chip">XP balance ${report.xpBalance}</span>
            <span class="report-chip">XP events ${report.ledgerCount}</span>
            <span class="report-chip">Purchases ${report.purchaseCount}</span>
            <span class="report-chip">Daily quiz ${report.dailyChallenge.answered}/${DAILY_CHALLENGE.answered}</span>
          </div>
        </div>
        <div class="report-card">
          <h3>XP By Topic And Activity</h3>
          ${xpList}
        </div>
        <div class="report-card">
          <h3>Most Missed Questions</h3>
          ${missList}
        </div>
        <div class="report-card">
          <h3>Mastery And Cooldowns</h3>
          ${topicList}
        </div>
        <div class="report-card">
          <h3>Study Time</h3>
          ${timeList}
        </div>
        <div class="report-card">
          <h3>Purchases And Evidence</h3>
          ${purchaseList}
        </div>
        <div class="report-card">
          <h3>Recent Activity</h3>
          ${recentList}
        </div>
        <div class="report-card">
          <h3>Anomaly Flags</h3>
          ${anomalyList}
        </div>
        <div class="report-card">
          <h3>Lock Diagnostics</h3>
          <p class="hint">Unlock all: <strong>${lockInfo.unlockAll ? "ON" : "OFF"}</strong> · Challenge mode: <strong>${
            lockInfo.challengeMode ? "ON" : "OFF"
          }</strong> · Pass threshold: <strong>${lockInfo.passThreshold || PASS_PCT}%</strong></p>
          <h4>Locked chapters</h4>
          ${lockedTopicList}
          <h4>XP-paused chapters</h4>
          ${xpPauseList}
        </div>
      </div>`;
  }

  function buildStudyReportText(report) {
    const lines = [
      `Study report for ${SUBJECT_TITLE}`,
      `Generated: ${report.generatedAt}`,
      `XP balance: ${report.xpBalance}`,
      `XP events: ${report.ledgerCount}`,
      `Purchases: ${report.purchaseCount}`,
      "",
      "Top XP sources:",
    ];
    report.xpTopicRows.forEach((row) => {
      lines.push(`- ${row.label}: ${row.totalXp} XP`);
    });
    lines.push("", "Most missed questions:");
    report.missRows.forEach((row) => {
      lines.push(
        `- T${row.topicId} ${row.topicTitle}: wrong ${row.wrongs}, mastery ${row.mastery}%`
      );
    });
    lines.push("", "Topic cooldowns:");
    report.topicRows
      .filter((row) => isCooldownActive(row.masteredUntil))
      .forEach((row) => {
        lines.push(
          `- T${row.topicId} ${row.title}: cooling until ${formatShortDate(
            row.masteredUntil
          )}`
        );
      });
    lines.push("", "Purchases:");
    report.purchases.forEach((purchase) => {
      lines.push(
        `- ${purchase.label}: spent ${purchase.xpSpent} XP, balance ${purchase.balanceBefore} -> ${purchase.balanceAfter}`
      );
    });
    lines.push("", "Anomaly flags:");
    if (report.anomalyFlags && report.anomalyFlags.length) {
      report.anomalyFlags.forEach((flag) => lines.push(`- ${flag}`));
    } else {
      lines.push("- none");
    }
    lines.push("", "Lock diagnostics:");
    lines.push(`- unlockAll: ${report.lockDiagnostics && report.lockDiagnostics.unlockAll ? "on" : "off"}`);
    lines.push(`- challengeMode: ${report.lockDiagnostics && report.lockDiagnostics.challengeMode ? "on" : "off"}`);
    lines.push(
      `- passThreshold: ${
        (report.lockDiagnostics && report.lockDiagnostics.passThreshold) || PASS_PCT
      }%`
    );
    const locked = (report.lockDiagnostics && report.lockDiagnostics.lockedTopics) || [];
    if (locked.length) {
      locked.forEach((row) => {
        lines.push(
          `- locked T${row.id} ${row.title}: blocked by T${row.blockedByTopicId} (${row.blockedByTopicTitle}) best ${row.blockedByBest}% / need ${row.needed}%`
        );
      });
    } else {
      lines.push("- locked chapters: none");
    }
    const paused = (report.lockDiagnostics && report.lockDiagnostics.xpPausedTopics) || [];
    if (paused.length) {
      paused.forEach((row) => {
        lines.push(
          `- XP paused T${row.id} ${row.title} until ${formatShortDate(row.xpLockUntil)}`
        );
      });
    } else {
      lines.push("- XP-paused chapters: none");
    }
    return lines.join("\n");
  }

  async function openReport() {
    const root = document.getElementById("modal-root");
    document.getElementById("panel-settings").hidden = true;
    document.getElementById("panel-shop").hidden = true;
    document.getElementById("panel-explain").hidden = true;
    const panel = document.getElementById("panel-report");
    let report = buildStudyReport();
    if (progressStore && progressStore.hasClient()) {
      const merged = await progressStore.fetchReportWithFallback(
        report,
        (topicId) => getTopicMeta(topicId)
      );
      if (merged && merged.report) report = merged.report;
    }
    document.getElementById("report-body").innerHTML = renderStudyReportHtml(report);
    document.getElementById("report-export-output").value = "";
    panel.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");

    document.getElementById("btn-report-text").onclick = async () => {
      let latest = buildStudyReport();
      if (progressStore && progressStore.hasClient()) {
        const merged = await progressStore.fetchReportWithFallback(
          latest,
          (topicId) => getTopicMeta(topicId)
        );
        if (merged && merged.report) latest = merged.report;
      }
      document.getElementById("report-export-output").value =
        buildStudyReportText(latest);
    };
    document.getElementById("btn-report-json").onclick = async () => {
      let latest = buildStudyReport();
      if (progressStore && progressStore.hasClient()) {
        const merged = await progressStore.fetchReportWithFallback(
          latest,
          (topicId) => getTopicMeta(topicId)
        );
        if (merged && merged.report) latest = merged.report;
      }
      document.getElementById("report-export-output").value = JSON.stringify(
        latest,
        null,
        2
      );
    };
  }

  function openShop(triggerServerSync) {
    const shouldSync = triggerServerSync !== false;
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelSettings = document.getElementById("panel-settings");
    const panelReport = document.getElementById("panel-report");
    if (!panelExplain.hidden) return;
    panelSettings.hidden = true;
    if (panelReport) panelReport.hidden = true;
    panelExplain.hidden = true;
    const panelShop = document.getElementById("panel-shop");
    panelShop.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");

    const syncStatus = document.getElementById("shop-sync-status");
    const refreshBtn = document.getElementById("btn-shop-refresh");
    if (refreshBtn) refreshBtn.disabled = shopInFlight;
    if (syncStatus) {
      syncStatus.textContent = state.shopLastSyncAt
        ? `Synced ${new Date(state.shopLastSyncAt).toLocaleTimeString()}.`
        : "Not synced yet.";
    }

    const rewards = window.SHOP_REWARDS || [];
    const purchaseGate = canPurchaseReward();
    const list = document.getElementById("shop-rewards-list");
    list.innerHTML = rewards
      .map((r) => {
        const dailyMax = getRewardDailyMax(r);
        const todayCount = getRewardPurchasesOnDate(r.id, getTodayIsoDate());
        const dailyRemaining = Math.max(0, dailyMax - todayCount);
        const cooldownMs = getPurchaseEffectiveCooldownMs(r.id, dailyMax, todayCount);
        const cooldownHrs = Math.ceil(cooldownMs / (1000 * 60 * 60));
        const disabled = state.xp < r.xp || cooldownMs > 0 || !purchaseGate.ok || shopInFlight;
        const disabledByDailyMax = dailyRemaining <= 0;
        const reallyDisabled = disabled || disabledByDailyMax;
        const title =
          cooldownMs > 0
            ? `Cooldown active (${cooldownHrs}h left)`
            : disabledByDailyMax
              ? `Daily max reached (${dailyMax}/day)`
              : !purchaseGate.ok
                ? "Need mixed study in last 24h (quiz + flash/game across 2 topics)"
                : state.xp < r.xp
                  ? "Not enough XP"
                  : shopInFlight
                    ? "Syncing..."
                    : "Buy";
        return `
      <div class="shop-item">
        <span class="shop-label">${escapeHtml(r.label)}</span>
        <span class="shop-xp">${r.xp} XP · ${dailyRemaining}/${dailyMax} left today</span>
        <button type="button" class="btn primary shop-buy" title="${escapeHtml(title)}" data-id="${escapeHtml(r.id)}" data-xp="${r.xp}" data-label="${escapeHtml(r.label)}" data-daily-max="${dailyMax}" ${reallyDisabled ? "disabled" : ""}>${
          cooldownMs > 0
            ? `Cooldown ${cooldownHrs}h`
            : disabledByDailyMax
              ? "Daily max reached"
              : shopInFlight
                ? "Syncing..."
                : "Buy"
        }</button>
      </div>`;
      })
      .join("");

    if (!purchaseGate.ok) {
      const gateNote = document.createElement("p");
      gateNote.className = "hint";
      gateNote.textContent =
        `Purchase gate: last 24h needs quiz + flash/game and 2 topics (now: quiz ${
          purchaseGate.cov.quiz ? "yes" : "no"
        }, flash ${purchaseGate.cov.flash ? "yes" : "no"}, game ${
          purchaseGate.cov.game ? "yes" : "no"
        }, topics ${purchaseGate.cov.topicCount}).`;
      list.prepend(gateNote);
    }

    list.querySelectorAll(".shop-buy").forEach((btn) => {
      btn.onclick = async () => {
        const xp = Number(btn.dataset.xp);
        const label = btn.dataset.label;
        const id = btn.dataset.id;
        const dailyMax = Number(btn.dataset.dailyMax || DEFAULT_REWARD_DAILY_MAX);
        if (!(progressStore && progressStore.hasClient())) {
          alert("Internet connection required to buy rewards.");
          return;
        }
        if (shopInFlight) return;
        shopInFlight = true;
        if (syncStatus) syncStatus.textContent = "Syncing balance and limits...";
        openShop();
        let snapshot = await progressStore.fetchShopSnapshot();
        if (applyShopSnapshot(snapshot)) saveState();
        const todayCount = getRewardPurchasesOnDate(id, getTodayIsoDate());
        const effectiveCooldownMs = getPurchaseEffectiveCooldownMs(id, dailyMax, todayCount);
        if (state.xp < xp || effectiveCooldownMs > 0 || !canPurchaseReward().ok || todayCount >= dailyMax) {
          shopInFlight = false;
          openShop();
          return;
        }
        let rpcCouponCode = null;
        let rpcResult = await progressStore.purchaseRewardServer({
          id,
          label,
          xp,
          dailyMax,
        });
        if (
          rpcResult &&
          !rpcResult.ok &&
          String(rpcResult.error || "").toLowerCase().includes("insufficient_xp") &&
          state.xp >= xp
        ) {
          const serverBalance = Number(rpcResult.balance);
          const localBalance = Number(state.xp || 0);
          if (
            Number.isFinite(serverBalance) &&
            Number.isFinite(localBalance) &&
            localBalance > serverBalance
          ) {
            const gap = Math.max(0, localBalance - serverBalance);
            if (gap > 0) {
              await progressStore.syncXpEntry({
                ts: Date.now(),
                subjectId: SUBJECT_ID,
                topicId: "general",
                theme: "",
                tab: "quiz",
                activityType: "sync_reconcile",
                sourceId: `reconcile:${Date.now()}`,
                reason: "sync_reconcile",
                deltaXp: gap,
                clientEventId: `reconcile-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              });
            }
          } else {
            await progressStore.migrateFromLocalState(portableState(), {
              force: true,
            });
          }
          rpcResult = await progressStore.purchaseRewardServer({
            id,
            label,
            xp,
            dailyMax,
          });
        }
        if (!rpcResult || !rpcResult.ok) {
          const reason = (rpcResult && rpcResult.error) || "purchase_blocked";
          if (String(reason).toLowerCase().includes("daily_limit_reached")) {
            snapshot = await progressStore.fetchShopSnapshot();
            if (applyShopSnapshot(snapshot)) saveState();
            shopInFlight = false;
            openShop();
            return;
          }
          shopInFlight = false;
          alert(getServerPurchaseErrorMessage(reason, rpcResult));
          openShop();
          return;
        }
        rpcCouponCode = rpcResult.coupon_code || null;
        const purchase = recordPurchaseEntry({ id, label, xp });
        spendXp(xp, {
          activityType: "purchase",
          sourceId: id,
          reason: "reward_purchase",
        });
        state.purchaseLedger.push(purchase);
        state.coupons = state.coupons || [];
        state.coupons.push({
          id,
          label,
          xp,
          date: new Date().toISOString().slice(0, 10),
          purchasedAt: new Date().toISOString(),
          purchaseId: purchase.id,
          couponCode: rpcCouponCode,
        });
        snapshot = await progressStore.fetchShopSnapshot();
        if (applyShopSnapshot(snapshot)) {
          saveState();
        } else {
          saveState();
        }
        shopInFlight = false;
        openShop();
      };
    });

    const coupons = getShopCouponsForDisplay();
    const couponsList = document.getElementById("shop-coupons-list");
    const couponHeading = document.getElementById("shop-coupons-heading");
    if (couponHeading) {
      couponHeading.textContent = coupons.length
        ? `My coupons today (${coupons.length})`
        : "My coupons today";
    }
    couponsList.innerHTML =
      coupons.length === 0
        ? "<p class='hint'>No coupons today yet. Earn XP and buy a reward!</p>"
        : `<div class="coupon-grid">${coupons
            .map(
              (c, i) =>
                `<div class="coupon-card">
                  <span class="coupon-num">#${i + 1}</span>
                  <strong>${escapeHtml(c.label)}</strong>
                  <span class="coupon-xp">${Number(c.xp || 0)} XP</span>
                  <span class="coupon-date">${escapeHtml(formatCouponDateTime(c.date, c.purchasedAt))}</span>
                  <p class="coupon-hint">Show this to your parent to claim.</p>
                </div>`
            )
            .join("")}</div>`;

    if (progressStore && progressStore.hasClient() && !shopInFlight && shouldSync) {
      shopInFlight = true;
      if (syncStatus) syncStatus.textContent = "Syncing with server...";
      Promise.resolve()
        .then(() => progressStore.fetchShopSnapshot())
        .then((snapshot) => {
          const panel = document.getElementById("panel-shop");
          if (!panel || panel.hidden) return;
          if (applyShopSnapshot(snapshot)) saveState();
        })
        .finally(() => {
          shopInFlight = false;
          const panel = document.getElementById("panel-shop");
          if (!panel || panel.hidden) return;
          openShop(false);
        });
    }
  }

  document.getElementById("btn-home").onclick = () => {
    // If we're running inside a subject shell (chemistry/physics), clicking the logo should
    // return to the subject picker (root index.html). If not, behave like "home".
    const isSubjectShell = !!window.SUBJECT_ID;
    if (isSubjectShell) {
      window.location.href = "index.html";
      return;
    }
    route = { view: "home" };
    renderHome();
  };

  document.getElementById("btn-shop").onclick = () => openShop();
  const shopRefreshBtn = document.getElementById("btn-shop-refresh");
  if (shopRefreshBtn) {
    shopRefreshBtn.onclick = async () => {
      if (!(progressStore && progressStore.hasClient())) return;
      if (shopInFlight) return;
      shopInFlight = true;
      const syncStatus = document.getElementById("shop-sync-status");
      if (syncStatus) syncStatus.textContent = "Refreshing from server...";
      const snapshot = await progressStore.fetchShopSnapshot();
      if (applyShopSnapshot(snapshot)) saveState();
      shopInFlight = false;
      openShop(false);
    };
  }

  document.getElementById("btn-close-shop").onclick = () => {
    const root = document.getElementById("modal-root");
    document.getElementById("panel-shop").hidden = true;
    closeModalRoot(root);
    if (route.view === "home") renderHome();
  };

  function bufToB64(buf) {
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function b64ToBuf(b64) {
    const binary = atob(b64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  async function encryptPayload(password, json) {
    if (!window.crypto || !crypto.subtle) {
      // Fallback: base64 JSON, clearly tagged as plain
      return "v1-plain:" + bufToB64(new TextEncoder().encode(json));
    }
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(json)
    );
    return `v1:${bufToB64(salt.buffer)}:${bufToB64(iv.buffer)}:${bufToB64(cipher)}`;
  }

  async function decryptPayload(password, code) {
    if (code.startsWith("v1-plain:")) {
      const b64 = code.slice("v1-plain:".length);
      const buf = b64ToBuf(b64);
      return new TextDecoder().decode(buf);
    }
    const parts = code.split(":");
    if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Bad format");
    const salt = new Uint8Array(b64ToBuf(parts[1]));
    const iv = new Uint8Array(b64ToBuf(parts[2]));
    const data = b64ToBuf(parts[3]);
    if (!window.crypto || !crypto.subtle) throw new Error("Crypto not supported");
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    return new TextDecoder().decode(plainBuf);
  }

  async function handleExportProgress() {
    const pwd = document.getElementById("export-password").value.trim();
    const out = document.getElementById("export-output");
    const status = document.getElementById("sync-status");
    if (!pwd) {
      status.textContent = "Set a password first.";
      return;
    }
    try {
      const json = JSON.stringify(portableState());
      const code = await encryptPayload(pwd, json);
      out.value = code;
      status.textContent = "Exported. Copy the code and keep the password safe.";
    } catch (e) {
      status.textContent = "Export failed: " + e.message;
    }
  }

  async function handleImportProgress() {
    const pwd = document.getElementById("import-password").value.trim();
    const input = document.getElementById("import-input").value.trim();
    const status = document.getElementById("sync-status");
    if (!pwd || !input) {
      status.textContent = "Paste a code and enter the same password used for export.";
      return;
    }
    try {
      const json = await decryptPayload(pwd, input);
      const payload = JSON.parse(json);
      applyPortableState(payload);
      status.textContent = "Import OK. Progress updated.";
      updateTopbar();
      if (route.view === "home") renderHome();
    } catch (e) {
      status.textContent = "Import failed (wrong password or corrupted code).";
    }
  }

  const exportBtn = document.getElementById("btn-export-progress");
  if (exportBtn) exportBtn.onclick = () => { handleExportProgress(); };
  const importBtn = document.getElementById("btn-import-progress");
  if (importBtn) importBtn.onclick = () => { handleImportProgress(); };
  const reportBtn = document.getElementById("btn-open-report");
  if (reportBtn) reportBtn.onclick = () => { openReport(); };

  document.getElementById("btn-settings").onclick = () => {
    const panelExplain = document.getElementById("panel-explain");
    const panelShop = document.getElementById("panel-shop");
    const panelReport = document.getElementById("panel-report");
    if (!panelExplain.hidden) return;
    const root = document.getElementById("modal-root");
    if (panelShop) panelShop.hidden = true;
    if (panelReport) panelReport.hidden = true;
    document.getElementById("opt-unlock-all").checked = state.unlockAll;
    document.getElementById("opt-challenge").checked = state.challengeMode;
    document.getElementById("panel-settings").hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
  };

  document.getElementById("btn-close-settings").onclick = () => {
    state.unlockAll = document.getElementById("opt-unlock-all").checked;
    state.challengeMode = document.getElementById("opt-challenge").checked;
    saveState();
    const root = document.getElementById("modal-root");
    document.getElementById("panel-settings").hidden = true;
    closeModalRoot(root);
    if (route.view === "home") renderHome();
  };

  const closeReportBtn = document.getElementById("btn-close-report");
  if (closeReportBtn) {
    closeReportBtn.onclick = () => {
      const root = document.getElementById("modal-root");
      document.getElementById("panel-report").hidden = true;
      closeModalRoot(root);
      if (route.view === "home") renderHome();
    };
  }

  dock.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      route.tab = b.dataset.tab;
      renderTopic();
    });
  });

  updateTopbar();
  renderHome();

  if (progressStore) {
    progressStore.init({ subjectId: SUBJECT_ID, storageKey: STORAGE_KEY });
    progressStore.ensureReady().then((result) => {
      const syncStatus = document.getElementById("sync-status");
      if (syncStatus) {
        if (result && result.ok) {
          syncStatus.textContent = `Supabase connected (${result.context.studentName || "Student"} · ${result.context.studentId || ""}).`;
        } else {
          syncStatus.textContent = `Supabase not connected: ${(result && result.error) || progressStore.getLastError() || "unknown error"}`;
        }
      }
      progressStore.fetchBootstrapState().then((remoteBootstrap) => {
        const pulled = mergeRemoteBootstrap(remoteBootstrap);
        if (pulled && route.view === "home") renderHome();
      });
      progressStore.reconcileLocalPurchases(state.purchaseLedger || []).then(() => {
        progressStore.fetchShopSnapshot().then((snapshot) => {
          const pulled = applyShopSnapshot(snapshot);
          if (pulled) {
            saveState();
            if (!document.getElementById("panel-shop").hidden) openShop();
          }
        });
      });
      progressStore.migrateFromLocalState(portableState()).then(() => {
        progressStore.scheduleSnapshot(portableState());
        progressStore.scheduleTopicStats(state.topicStats || {});
      });
    });
  }
})();
