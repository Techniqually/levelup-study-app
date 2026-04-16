
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

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  
  function formatMsShort(ms) {
    const n = Math.max(0, Number(ms || 0));
    const mins = Math.ceil(n / 60000);
    if (mins < 1) return "<1 min";
    return `${mins} min`;
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