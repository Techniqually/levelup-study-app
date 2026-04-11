
function updateTopbar() {
    var userEl = document.getElementById("stat-user");
    if (userEl) {
      var disp =
        typeof STUDENT_NAME !== "undefined" && STUDENT_NAME
          ? String(STUDENT_NAME)
          : "Student";
      var sid = typeof STUDENT_ID !== "undefined" && STUDENT_ID ? String(STUDENT_ID) : "";
      userEl.textContent = disp.length > 20 ? disp.slice(0, 18) + "\u2026" : disp;
      userEl.title = sid ? disp + " · " + sid : disp;
      userEl.hidden = false;
    }
    var xpEl = document.getElementById("stat-xp");
    if (xpEl) xpEl.textContent = `${state.xp} XP`;
    var streakEl = document.getElementById("stat-streak");
    if (streakEl) {
      const s = state.streak || 0;
      streakEl.textContent = `🔥 ${s} day${s === 1 ? "" : "s"}`;
    }
    const bossEl = document.getElementById("stat-boss");
    const bossCount = Object.keys(state.themeBossBeaten || {}).filter(Boolean).length;
    if (bossEl) {
      bossEl.hidden = bossCount === 0;
      bossEl.textContent = bossCount ? `🏆 ${bossCount}` : "";
      bossEl.title = bossCount ? "Theme boss" + (bossCount > 1 ? "es" : "") + " beaten" : "";
    }
  }
