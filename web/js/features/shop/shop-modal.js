
function openShop(triggerServerSync) {
    const shouldSync = triggerServerSync !== false;
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelShop = document.getElementById("panel-shop");
    if (!root || !panelShop) return;
    if (panelExplain && !panelExplain.hidden) return;
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
    const xpAvail = Math.max(0, Math.floor(Number(state.xp) || 0));
    const summaryEl = document.getElementById("shop-summary");
    const list = document.getElementById("shop-rewards-list");
    const isParentCatalog =
      rewards.length > 0 &&
      rewards.every((r) => String(r.id || "").indexOf("student-reward:") === 0);

    function shopBuyButtonLabel(opts) {
      const o = opts || {};
      if (o.shopInFlight) return "Syncing…";
      if (o.cooldownMs > 0) return `Wait ${o.cooldownHrs}h`;
      if (o.disabledByDailyMax) return "Daily limit";
      if (!o.purchaseGateOk) return "Study first";
      if (o.xpAvail < o.cost) return `Need ${o.cost - o.xpAvail} XP`;
      return "Buy";
    }

    function shopBuyButtonTitle(opts) {
      const o = opts || {};
      if (o.shopInFlight) return "Syncing with server…";
      if (o.cooldownMs > 0) return `Cooldown active — about ${o.cooldownHrs}h remaining`;
      if (o.disabledByDailyMax) return `Daily max reached for this reward (${o.dailyMax} per day)`;
      if (!o.purchaseGateOk)
        return "Complete a quiz, flash or mini-game, and study at least two topics in the last 24 hours";
      if (o.xpAvail < o.cost) return `You have ${o.xpAvail} XP; this reward costs ${o.cost} XP`;
      return "Buy this reward";
    }

    if (summaryEl) {
      const catalogBadge = isParentCatalog
        ? '<span class="shop-xp-hero__badge">Parent-set rewards</span>'
        : '<span class="shop-xp-hero__badge is-muted">Default catalog</span>';
      const metaLine = isParentCatalog
        ? "Rewards chosen by your parent. XP is pooled across every subject."
        : "XP you earn in any subject adds to this same balance.";
      const cov = purchaseGate.cov || {};
      const chip = function (done, label) {
        return `<li class="${done ? "is-done" : "is-todo"}">${done ? "✓ " : ""}${escapeHtml(label)}</li>`;
      };
      const gateHtml = purchaseGate.ok
        ? '<div class="shop-gate shop-gate--ok" role="status">Purchase gate cleared — you can buy when you have enough XP.</div>'
        : `<div class="shop-gate shop-gate--locked" role="status">
          <div class="shop-gate__title">Study a bit more to unlock purchases</div>
          <p class="shop-gate__lead">Within the last 24 hours: finish a quiz session, do flashcards or a mini-game, and open at least two different topics.</p>
          <ul class="shop-gate__chips">
            ${chip(!!cov.quiz, "Quiz")}
            ${chip(!!(cov.flash || cov.game), "Flash or mini-game")}
            ${chip(Number(cov.topicCount || 0) >= 2, "Two topics (" + String(Math.min(Number(cov.topicCount || 0), 99)) + "/2)")}
          </ul>
        </div>`;
      summaryEl.innerHTML = `
        <div class="shop-xp-hero">
          <span class="shop-xp-hero__label">Available balance</span>
          <div class="shop-xp-hero__value">${xpAvail.toLocaleString()}<span class="shop-xp-hero__unit">XP</span></div>
          ${catalogBadge}
          <p class="shop-xp-hero__meta">${escapeHtml(metaLine)}</p>
        </div>
        ${gateHtml}`;
    }

    list.innerHTML =
      rewards.length === 0
        ? "<p class=\"hint\">No rewards in this catalog yet.</p>"
        : rewards
            .map((r) => {
              const cost = Math.max(0, Math.floor(Number(r.xp) || 0));
              const dailyMax = getRewardDailyMax(r);
              const todayCount = getRewardPurchasesOnDate(r.id, getTodayIsoDate());
              const dailyRemaining = Math.max(0, dailyMax - todayCount);
              const cooldownMs = getPurchaseEffectiveCooldownMs(r.id, dailyMax, todayCount);
              const cooldownHrs = Math.max(1, Math.ceil(cooldownMs / (1000 * 60 * 60)));
              const disabledByDailyMax = dailyRemaining <= 0;
              const afford = xpAvail >= cost;
              const disabled =
                !afford ||
                cooldownMs > 0 ||
                !purchaseGate.ok ||
                shopInFlight ||
                disabledByDailyMax;
              const reallyDisabled = disabled;
              const labelOpts = {
                shopInFlight,
                cooldownMs,
                cooldownHrs,
                disabledByDailyMax,
                purchaseGateOk: purchaseGate.ok,
                xpAvail,
                cost,
              };
              const btnLabel = shopBuyButtonLabel(labelOpts);
              const btnTitle = shopBuyButtonTitle(
                Object.assign({ dailyMax }, labelOpts)
              );
              const desc = r.description
                ? `<div class="shop-card__desc">${escapeHtml(r.description)}</div>`
                : "";
              const capLine =
                dailyMax >= 99
                  ? ""
                  : `<span class="shop-card__cap">${dailyRemaining}/${dailyMax} left today</span>`;
              return `
      <div class="shop-card">
        <div class="shop-card__body">
          <div class="shop-card__title">${escapeHtml(r.label)}</div>
          ${desc}
        </div>
        <div class="shop-card__price">${cost.toLocaleString()} XP${capLine}</div>
        <div class="shop-card__action">
          <button type="button" class="btn primary shop-buy" title="${escapeHtml(btnTitle)}" data-id="${escapeHtml(
                r.id
              )}" data-xp="${cost}" data-label="${escapeHtml(r.label)}" data-daily-max="${dailyMax}" ${
                reallyDisabled ? "disabled" : ""
              }>${escapeHtml(btnLabel)}</button>
        </div>
      </div>`;
            })
            .join("");

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
        const bal = Math.max(0, Math.floor(Number(state.xp) || 0));
        if (bal < xp || effectiveCooldownMs > 0 || !canPurchaseReward().ok || todayCount >= dailyMax) {
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
          bal >= xp
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

// Expose to the global header (app-shell.js). The header's "Shop" button calls
// window.LevelupShop.open() — on subject pages we open the modal in-place; on
// hub.html the global handler falls back to navigating to a default subject.
window.LevelupShop = window.LevelupShop || {};
window.LevelupShop.open = function () { openShop(true); };
