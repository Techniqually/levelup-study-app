// ─── app.js ─ Bootstrap ──────────────────────────────────────────────────────
//
// All feature functions are defined by the scripts loaded BEFORE this one
// (see js/shell/subject-script-chain.js for the exact load order).
//
// This file only:
//   1. Assigns runtime globals (declared in js/core/app-runtime.js)
//   2. Validates the manifest
//   3. Wires DOM event listeners
//   4. Fires the first render
//   5. Initialises the progressStore / Supabase connection

/* eslint-disable no-var */

// ─── 1. Identity ─────────────────────────────────────────────────────────────
SUBJECT_ID    = window.SUBJECT_ID    || "chemistry";
SUBJECT_TITLE = window.SUBJECT_TITLE || "O-Level Chemistry";
STUDENT_ID    = window.LEVELUP_STUDENT_ID   || localStorage.getItem("LEVELUP_STUDENT_ID")   || ("local-" + SUBJECT_ID);
STUDENT_NAME  = window.LEVELUP_STUDENT_NAME || localStorage.getItem("LEVELUP_STUDENT_NAME") || "Student";
STORAGE_KEY   = "levelup_" + SUBJECT_ID + "_v1";
APP_VERSION   = window.APP_VERSION || "dev";

// ─── 2. Manifest guard ───────────────────────────────────────────────────────
manifest = window.TOPICS_MANIFEST;
if (!manifest || !manifest.length) {
  document.getElementById("main").innerHTML =
    "<p class='empty-state'>Missing topics-manifest.js</p>";
} else {

  // ─── 3. Theme index ────────────────────────────────────────────────────────
  var _idx = buildThemeIndex(manifest);
  _idx.themeOrder.forEach(function (k) { themeOrder.push(k); });
  Object.assign(themesByKey, _idx.themesByKey);

  // ─── 4. Core runtime ───────────────────────────────────────────────────────
  main          = document.getElementById("main");
  dock          = document.getElementById("dock");
  state         = loadState();
  progressStore = window.ProgressStore || null;
  route         = { view: "home", topicId: null, tab: "cheat" };

  // ─── 5. DOM event listeners ────────────────────────────────────────────────

  function refreshLlmProxyStatusLine() {
    var el = document.getElementById("llm-proxy-status");
    if (!el || !window.LevelupLlmConfig) return;
    if (window.LevelupLlmConfig.isQuizExplainEnabled()) {
      var u = window.LevelupLlmConfig.getClientConfig();
      el.textContent =
        "LLM: quiz “Why?” on · " + (u && u.proxyBaseUrl ? u.proxyBaseUrl : "");
      return;
    }
    var c = window.LevelupLlmConfig.get();
    if (!c) {
      el.textContent = "LLM: not configured.";
      return;
    }
    if (c.enabled && !window.LevelupLlmConfig.isProxyReady()) {
      el.textContent = "LLM: enabled — add proxy URL and app token.";
      return;
    }
    if (c.enabled && c.features && c.features.quizExplain === false) {
      el.textContent = "LLM: proxy OK; quiz “Why?” is disabled.";
      return;
    }
    if (c.enabled) {
      el.textContent = "LLM: enabled (finish URL + token for quiz “Why?”).";
      return;
    }
    el.textContent = "LLM: off.";
  }

  document.getElementById("btn-home").onclick = function () {
    if (window.SUBJECT_ID) { window.location.href = "hub.html"; return; }
    route = { view: "home" };
    renderHome();
  };

  document.getElementById("btn-shop").onclick = function () { openShop(); };

  var _shopRefreshBtn = document.getElementById("btn-shop-refresh");
  if (_shopRefreshBtn) {
    _shopRefreshBtn.onclick = async function () {
      if (!(progressStore && progressStore.hasClient())) return;
      if (shopInFlight) return;
      shopInFlight = true;
      var _ss = document.getElementById("shop-sync-status");
      if (_ss) _ss.textContent = "Refreshing from server...";
      var _snap = await progressStore.fetchShopSnapshot();
      if (applyShopSnapshot(_snap)) saveState();
      shopInFlight = false;
      openShop(false);
    };
  }

  document.getElementById("btn-close-shop").onclick = function () {
    var _root = document.getElementById("modal-root");
    document.getElementById("panel-shop").hidden = true;
    closeModalRoot(_root);
    if (route.view === "home") renderHome();
  };

  var _exportBtn = document.getElementById("btn-export-progress");
  if (_exportBtn) _exportBtn.onclick = function () { handleExportProgress(); };
  var _importBtn = document.getElementById("btn-import-progress");
  if (_importBtn) _importBtn.onclick = function () { handleImportProgress(); };
  var _reportBtn = document.getElementById("btn-open-report");
  if (_reportBtn) _reportBtn.onclick = function () { openReport(); };

  document.getElementById("btn-settings").onclick = function () {
    var _pExplain  = document.getElementById("panel-explain");
    var _pShop     = document.getElementById("panel-shop");
    var _pReport   = document.getElementById("panel-report");
    if (!_pExplain.hidden) return;
    var _root = document.getElementById("modal-root");
    if (_pShop)   _pShop.hidden   = true;
    if (_pReport) _pReport.hidden = true;
    document.getElementById("opt-unlock-all").checked = state.unlockAll;
    document.getElementById("opt-challenge").checked  = state.challengeMode;
    refreshLlmProxyStatusLine();
    document.getElementById("panel-settings").hidden = false;
    _root.hidden = false;
    _root.setAttribute("aria-hidden", "false");
  };

  var _llmSetupBtn = document.getElementById("btn-llm-proxy-setup");
  if (_llmSetupBtn && window.LevelupLlmSetupForms) {
    _llmSetupBtn.onclick = function () {
      window.LevelupLlmSetupForms.openLlmProxySetup().then(function () {
        refreshLlmProxyStatusLine();
      });
    };
  }

  var _configPackBtn = document.getElementById("btn-config-package-setup");
  if (_configPackBtn && window.LevelupSetupForms && typeof window.LevelupSetupForms.openConfigPackageSetup === "function") {
    _configPackBtn.onclick = function () {
      window.LevelupSetupForms.openConfigPackageSetup().then(function (r) {
        if (r && r.action === "save") {
          window.alert("Setup package applied. Reloading to use updated profile/sync config.");
          window.location.reload();
          return;
        }
        refreshLlmProxyStatusLine();
      });
    };
  }

  document.getElementById("btn-close-settings").onclick = function () {
    state.unlockAll     = document.getElementById("opt-unlock-all").checked;
    state.challengeMode = document.getElementById("opt-challenge").checked;
    saveState();
    var _root = document.getElementById("modal-root");
    document.getElementById("panel-settings").hidden = true;
    closeModalRoot(_root);
    if (route.view === "home") renderHome();
  };

  var _closeReportBtn = document.getElementById("btn-close-report");
  if (_closeReportBtn) {
    _closeReportBtn.onclick = function () {
      var _root = document.getElementById("modal-root");
      document.getElementById("panel-report").hidden = true;
      closeModalRoot(_root);
      if (route.view === "home") renderHome();
    };
  }

  dock.querySelectorAll("button").forEach(function (b) {
    b.addEventListener("click", function () {
      route.tab = b.dataset.tab;
      renderTopic();
    });
  });

  // ─── 6. First paint ────────────────────────────────────────────────────────
  updateTopbar();
  renderHome();

  // ─── 7. Supabase / progressStore ───────────────────────────────────────────
  if (progressStore) {
    progressStore.init({ subjectId: SUBJECT_ID, storageKey: STORAGE_KEY });
    progressStore.ensureReady().then(function (result) {
      var _syncStatus = document.getElementById("sync-status");
      if (_syncStatus) {
        _syncStatus.textContent = (result && result.ok)
          ? ("Supabase connected (" + (result.context.studentName || "Student") + " \xB7 " + (result.context.studentId || "") + ").")
          : ("Supabase not connected: " + ((result && result.error) || progressStore.getLastError() || "unknown error"));
      }
      progressStore.fetchBootstrapState().then(function (remoteBootstrap) {
        var _pulled = mergeRemoteBootstrap(remoteBootstrap);
        if (_pulled && route.view === "home") renderHome();
      });
      progressStore.reconcileLocalPurchases(state.purchaseLedger || []).then(function () {
        progressStore.fetchShopSnapshot().then(function (snapshot) {
          var _pulled = applyShopSnapshot(snapshot);
          if (_pulled) {
            saveState();
            if (!document.getElementById("panel-shop").hidden) openShop();
          }
        });
      });
      progressStore.migrateFromLocalState(portableState()).then(function () {
        progressStore.scheduleSnapshot(portableState());
        progressStore.scheduleTopicStats(state.topicStats || {});
      });
    });
  }

} // end manifest guard
