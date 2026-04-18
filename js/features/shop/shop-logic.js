
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

