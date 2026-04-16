
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
        // Server RPC already deducts XP in study_xp_ledger. Do NOT spendXp/recordXp here
        // or the same -xp is applied twice on the server (negative balance bug).
        const purchase = recordPurchaseEntry({ id, label, xp });
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
