/** Parent-sponsored rewards — edit XP and labels to match your family deals */
window.LEVELUP_XP_POLICY = {
  // If true, per-activity rolling caps are used. Recommended false for kid-friendly flow.
  enableActivityXpCap: false,
  // Topic anti-farming lock: if quiz XP in this window exceeds triggerXp, pause that topic's quiz XP.
  topicFarmLock: {
    windowMs: 1000 * 60 * 60, // 1 hour
    triggerXp: 140,
    lockMs: 1000 * 60 * 60 * 0.5, // 0.5 hours
  },
};

window.SHOP_REWARDS = [
  { id: "screen-time", label: "Extra screen time 10 minutes", xp: 700, dailyMax: 6 },
  { id: "bubble", label: "Bubble tea", xp: 2500, dailyMax: 1 },
  { id: "friend-visit", label: "Friend visit", xp: 4000, dailyMax: 1 },
  { id: "allowance", label: "$5 allowance extra", xp: 5000, dailyMax: 1 },
];
