// ─── Mutable runtime globals ─────────────────────────────────────────────────
// Declared here (as var = global) before any feature script loads.
// All values are assigned by js/app.js at boot time.
// Feature scripts close over these names and read/write the current value.

/* eslint-disable no-var */

// Subject identity (set by app.js from window.* written by subject-config.js)
var SUBJECT_ID;
var SUBJECT_TITLE;
var STUDENT_ID;
var STUDENT_NAME;
var STORAGE_KEY;
var APP_VERSION;

// Topics manifest and theme indexes (populated by app.js)
var manifest;
var themeOrder   = [];
var themesByKey  = {};

// Core app state (assigned by app.js once loadState() runs)
var state;
var route;

// Singleton services
var progressStore;

// UI state
var shopInFlight = false;
var timeTracker  = { topicId: null, tab: null, startedAt: 0 };
var loadScriptPromises = {};
var quizSession  = null;
var flashSession = null;

// DOM nodes assigned by app.js after DOM is ready
var main;
var dock;

// Topic registry: populated by topic scripts loaded from storage objects.
// Initialize here so topic-load.js can safely read it before any topic loads.
window.__topicRegistry = window.__topicRegistry || {};
