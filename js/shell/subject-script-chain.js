(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var subjectId = window.SUBJECT_ID || "chemistry";

  function mkV(src) {
    return src + (src.includes("?") ? "&" : "?") + "v=" + v;
  }

  var scripts = [
    // Subject data and shop data are loaded from private storage before this chain.
    "js/infographics-info-loader.js",

    // ── Supabase CDN + wrappers ───────────────────────────────────────────────
    "js/supabase-client.js",
    "js/progress-store.js",

    // ── Shared constants + mutable runtime globals ───────────────────────────
    "js/core/app-constants.js",
    "js/core/app-runtime.js",

    // ── Pure utilities ────────────────────────────────────────────────────────
    "js/utils/array.js",
    "js/utils/format.js",
    "js/utils/text.js",
    "js/utils/quiz-keys.js",

    // ── Core state ────────────────────────────────────────────────────────────
    "js/core/state-schema.js",
    "js/core/state-persistence.js",

    // ── Study: foundational topic helpers ────────────────────────────────────
    "js/features/study/topic-stats.js",
    "js/features/study/topic-meta.js",

    // ── XP system (depends on topic-stats, format) ───────────────────────────
    "js/features/xp/xp-guards.js",
    "js/features/xp/xp-ledger.js",
    "js/features/xp/streak.js",
    "js/features/xp/time-xp.js",

    // ── Daily challenge (depends on xp-ledger) ────────────────────────────────
    "js/features/daily/daily-challenge.js",

    // ── Shop (depends on xp-guards, state) ───────────────────────────────────
    "js/features/shop/shop-logic.js",
    "js/features/shop/shop-sync.js",
    "js/features/shop/shop-ui-helpers.js",
    "js/features/shop/shop-modal.js",

    // ── Study: unlock / navigation / topic loading ────────────────────────────
    "js/features/study/unlock.js",
    "js/features/study/next-topics.js",
    "js/features/study/topic-load.js",

    // ── Study: mastery + question stats ──────────────────────────────────────
    "js/features/study/topic-mastery.js",
    "js/features/study/question-stats.js",

    // ── Study: quiz bank + scoring + engine + games + boss ───────────────────
    "js/features/study/quiz-bank.js",
    "js/features/study/quiz-scoring.js",
    "js/features/study/quiz-ui-bits.js",
    "js/features/study/quiz-extended.js",
    "js/features/study/quiz-engine.js",
    "js/features/study/games.js",
    "js/features/study/boss.js",

    // ── Theme index (uses manifest, must be after app-runtime but before app.js)
    "js/features/study/themes-index.js",

    // ── UI layer ─────────────────────────────────────────────────────────────
    "js/ui/topbar.js",
    "js/ui/modals.js",
    "js/features/llm/llm-config.js",
    "js/features/llm/llm-keepalive.js",
    "js/features/llm/llm-cache.js",
    "js/features/llm/llm-client.js",
    "js/features/llm/llm-setup-forms.js",
    "js/features/llm/llm-quiz-why.js",
    "js/ui/topic-panels.js",
    "js/ui/render-home-topic.js",
    "js/ui/report.js",

    // ── Bootstrap (must be last) ──────────────────────────────────────────────
    "js/app.js",
  ];

  function appendScripts(list) {
    list.forEach(function (src) {
      var s = document.createElement("script");
      s.src = mkV(src);
      s.async = false;
      document.body.appendChild(s);
    });
  }

  function renderFatalLoadError(reason) {
    var safe = String(reason || "storage_bootstrap_failed");
    document.body.innerHTML =
      '<main style="max-width:720px;margin:48px auto;padding:24px;font-family:system-ui,sans-serif;">' +
      "<h1>Content load failed</h1>" +
      "<p>This subject now requires study data in Supabase Storage.</p>" +
      "<p><code>" +
      safe.replace(/[<>&]/g, "") +
      "</code></p>" +
      "</main>";
  }

  function runChain() {
    if (!window.LevelupRemoteManifest || typeof window.LevelupRemoteManifest.loadSubjectBootstrap !== "function") {
      renderFatalLoadError("remote_manifest_loader_missing");
      return;
    }
    window.LevelupRemoteManifest
      .loadSubjectBootstrap(subjectId)
      .then(function (res) {
        if (!res || !res.ok) {
          renderFatalLoadError((res && res.reason) || "storage_bootstrap_failed");
          return;
        }
        appendScripts(scripts);
      })
      .catch(function (err) {
        renderFatalLoadError((err && err.message) || "storage_bootstrap_failed");
      });
  }

  var boot = window.__LEVELUP_SUBJECT_SETUP;
  if (boot && typeof boot.then === "function") {
    boot
      .then(runChain)
      .catch(function (err) {
        var msg = String((err && err.message) || "subject_bootstrap_failed");
        // If config redirected to landing, page is already navigating — don't render.
        if (/redirected|needs_auth/i.test(msg)) return;
        renderFatalLoadError(msg);
      });
  } else {
    runChain();
  }
})();

