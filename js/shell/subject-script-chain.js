(function () {
  var v = encodeURIComponent(window.APP_VERSION || "dev");
  var subjectId = window.SUBJECT_ID || "chemistry";

  function mkV(src) {
    return src + (src.includes("?") ? "&" : "?") + "v=" + v;
  }

  // Synchronous probe — avoids console 404 noise for optional files (same ?v= as chain loads).
  function tryExists(src) {
    if (!src) return false;
    if (window.location.protocol === "file:") return true;
    var probe = /^https?:\/\//i.test(src) ? src : mkV(src);
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", probe, false);
      xhr.send(null);
      return xhr.status >= 200 && xhr.status < 300;
    } catch (_) {
      return false;
    }
  }

  var scripts = [
    // ── Subject data (must come before app-runtime / app-constants) ──────────
    "data/subjects/" + subjectId + "/topics-manifest.js",
  ];

  var maybeInfographics = "data/subjects/" + subjectId + "/infographics-images.js";
  if (tryExists(maybeInfographics)) scripts.push(maybeInfographics);

  var maybeExtraQuiz = "data/subjects/" + subjectId + "/extra-quiz.js";
  if (tryExists(maybeExtraQuiz)) scripts.push(maybeExtraQuiz);

  scripts.push(
    "js/infographics-info-loader.js",
    "data/shop-rewards.js",

    // ── Supabase CDN + wrappers ───────────────────────────────────────────────
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
    "js/supabase-client.js",
    "js/progress-store.js",

    // ── Shared constants + mutable runtime globals ───────────────────────────
    "js/core/app-constants.js",
    "js/core/app-runtime.js",

    // ── Pure utilities ────────────────────────────────────────────────────────
    "js/utils/array.js",
    "js/utils/format.js",
    "js/utils/text.js",
    "js/utils/crypto-transfer.js",
    "js/utils/quiz-keys.js",

    // ── Core state ────────────────────────────────────────────────────────────
    "js/core/state-schema.js",
    "js/core/state-persistence.js",
    "js/core/transfer-ui.js",

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
    "js/features/study/quiz-engine.js",
    "js/features/study/games.js",
    "js/features/study/boss.js",

    // ── Theme index (uses manifest, must be after app-runtime but before app.js)
    "js/features/study/themes-index.js",

    // ── UI layer ─────────────────────────────────────────────────────────────
    "js/ui/topbar.js",
    "js/ui/modals.js",
    "js/ui/topic-panels.js",
    "js/ui/render-home-topic.js",
    "js/ui/report.js",

    // ── Bootstrap (must be last) ──────────────────────────────────────────────
    "js/app.js"
  );

  function runChain() {
    scripts.forEach(function (src) {
      var s = document.createElement("script");
      s.src = mkV(src);
      s.async = false;
      document.body.appendChild(s);
    });
  }

  var boot = window.__LEVELUP_SUBJECT_SETUP;
  if (boot && typeof boot.then === "function") {
    boot.then(runChain).catch(runChain);
  } else {
    runChain();
  }
})();

