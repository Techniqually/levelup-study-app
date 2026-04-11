
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
