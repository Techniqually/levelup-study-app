/**
 * Keep Render/FastAPI warm while user is actively using the app.
 * Strategy:
 * - ping /health when tab becomes visible/focused
 * - periodic ping only while visible (default 9 min)
 * - lightweight debounce to avoid burst requests
 */
(function (global) {
  var INTERVAL_MS = 9 * 60 * 1000;
  var MIN_GAP_MS = 75 * 1000;
  var TIMEOUT_MS = 5000;
  var timerId = 0;
  var started = false;
  var inFlight = false;
  var lastPingAt = 0;

  function now() {
    return Date.now();
  }

  function getCfg() {
    if (!global.LevelupLlmConfig) return null;
    if (!global.LevelupLlmConfig.isProxyReady()) return null;
    return global.LevelupLlmConfig.getClientConfig();
  }

  function canPing() {
    return !document.hidden && !!getCfg();
  }

  function healthUrl(cfg) {
    return String(cfg.proxyBaseUrl || "").replace(/\/+$/, "") + "/health";
  }

  function clearSchedule() {
    if (timerId) {
      global.clearInterval(timerId);
      timerId = 0;
    }
  }

  function schedule() {
    clearSchedule();
    if (!canPing()) return;
    timerId = global.setInterval(function () {
      ping("interval", false);
    }, INTERVAL_MS);
  }

  function ping(reason, force) {
    var cfg = getCfg();
    if (!cfg) return Promise.resolve(false);
    if (document.hidden) return Promise.resolve(false);
    if (inFlight) return Promise.resolve(false);
    if (!force && now() - lastPingAt < MIN_GAP_MS) return Promise.resolve(false);

    inFlight = true;
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timeoutId = global.setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, TIMEOUT_MS);
    var url = healthUrl(cfg);

    return global
      .fetch(url, {
        method: "GET",
        cache: "no-store",
        signal: ctrl ? ctrl.signal : undefined,
      })
      .then(function () {
        return true;
      })
      .catch(function () {
        return false;
      })
      .finally(function () {
        global.clearTimeout(timeoutId);
        inFlight = false;
        lastPingAt = now();
      });
  }

  function onVisibility() {
    if (document.hidden) {
      clearSchedule();
      return;
    }
    ping("visible", true);
    schedule();
  }

  function onFocus() {
    ping("focus", false);
    schedule();
  }

  function onOnline() {
    ping("online", true);
    schedule();
  }

  function start() {
    if (started) return;
    started = true;
    document.addEventListener("visibilitychange", onVisibility);
    global.addEventListener("focus", onFocus);
    global.addEventListener("online", onOnline);
    if (!document.hidden) {
      ping("start", true);
      schedule();
    }
  }

  function stop() {
    if (!started) return;
    started = false;
    clearSchedule();
    document.removeEventListener("visibilitychange", onVisibility);
    global.removeEventListener("focus", onFocus);
    global.removeEventListener("online", onOnline);
  }

  global.LevelupLlmKeepalive = {
    start: start,
    stop: stop,
    poke: function (reason, force) {
      return ping(reason || "manual", !!force);
    },
  };

  // Auto-start; no-op if LLM config is absent/disabled.
  start();
})(window);

