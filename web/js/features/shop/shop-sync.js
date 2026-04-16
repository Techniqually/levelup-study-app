
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

