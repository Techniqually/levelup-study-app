
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

