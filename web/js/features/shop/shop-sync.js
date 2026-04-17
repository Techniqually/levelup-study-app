
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

    // Parent-configured per-student rewards override the default static catalog
    // (content/data/shop-rewards.js). When the parent has set any rewards, the
    // shop displays THOSE instead. No defaults mixed in, to keep the contract
    // between parent intent and student experience clean.
    const parentRewards = Array.isArray(snapshot.parent_rewards)
      ? snapshot.parent_rewards
      : [];
    if (parentRewards.length) {
      const mapped = parentRewards.map((r) => ({
        id: "student-reward:" + String(r.id),
        label: String(r.label || "Reward"),
        description: r.description ? String(r.description) : "",
        xp: Math.max(0, Number(r.xp_cost || 0)),
        // Parent-configured rewards default to effectively unlimited daily claims;
        // parents moderate via enabling/disabling rewards instead.
        dailyMax: 99,
      }));
      const prevCat = JSON.stringify(window.SHOP_REWARDS || []);
      const nextCat = JSON.stringify(mapped);
      if (prevCat !== nextCat) {
        window.SHOP_REWARDS = mapped;
        changed = true;
        try {
          document.dispatchEvent(new CustomEvent("levelup:shop-catalog-updated", {
            detail: { source: "parent", count: mapped.length },
          }));
        } catch (_) {}
      }
    }

    state.shopLastSyncAt = Date.now();
    return changed;
  }

