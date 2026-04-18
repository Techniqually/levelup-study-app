// ─── Shared constants ───────────────────────────────────────────────────────
// Loaded before ALL feature scripts. Declares var (global) so any script can
// read these names directly without dot-notation.

/* eslint-disable no-var */

// Quiz / gameplay
var QUESTION_MS              = 26000;
var PASS_PCT                 = 70;
var EARLY_WRONG_SEC          = 3;
var HEALTH_START             = 3;
var COMBO_AT                 = 3;
var COMBO_MULT               = 1.5;
var QUIZ_PER_ROUND           = 20;
var BOSS_QUESTION_MS_MULT    = 0.8;
var BOSS_XP                  = 500;
var STREAK_DAILY_XP_BASE     = 4;
var STATE_VERSION            = 2;

// Mastery / cooldowns
var QUESTION_MASTERY_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 5;
var TOPIC_MASTERY_COOLDOWN_MS    = 1000 * 60 * 60 * 24 * 5;

// Shop / purchase
var PURCHASE_EVIDENCE_WINDOW_MS  = 1000 * 60 * 60 * 24 * 7;
var PURCHASE_REPEAT_COOLDOWN_MS  = 1000 * 60 * 60 * 24;
var DEFAULT_REWARD_DAILY_MAX     = 1;

// XP rate limits per activity (window + max per window)
var XP_RATE_LIMITS = {
  flash:         { windowMs: 1000 * 60 * 5, maxXp: 40 },
  game_match:    { windowMs: 1000 * 60 * 5, maxXp: 40 },
  game_sequence: { windowMs: 1000 * 60 * 5, maxXp: 40 },
  game_tf:       { windowMs: 1000 * 60 * 5, maxXp: 40 },
  quiz:          { windowMs: 1000 * 60 * 5, maxXp: 80 },
  quiz_review:   { windowMs: 1000 * 60 * 5, maxXp: 60 },
  written_practice: { windowMs: 1000 * 60 * 60, maxXp: 48 },
};

// Time-based XP rules per tab
var TIME_XP = {
  cheat:  { msPerXp: 0,     capXp: 0  },
  visual: { msPerXp: 60000, capXp: 10 }, // 1 XP/min, capped
  flash:  { msPerXp: 45000, capXp: 15 }, // ~1 XP/45s, capped
  quiz:   { msPerXp: 0,     capXp: 0  },
  game:   { msPerXp: 0,     capXp: 0  },
  written: { msPerXp: 120000, capXp: 4 }, // light passive; main XP from quality-gated claim
};

// Written-tab XP claim (anti-gaming heuristics — not marking quality)
var WRITTEN_CLAIM_MIN_CHARS       = 56;
var WRITTEN_CLAIM_MIN_WORDS      = 14;
var WRITTEN_CLAIM_MIN_DWELL_MS   = 48000;
var WRITTEN_CLAIM_MIN_UNIQUE     = 9;
var WRITTEN_CLAIM_MIN_DIVERSITY  = 0.28;
var WRITTEN_CLAIM_MIN_LONG_WORDS = 6;
var WRITTEN_CLAIM_MAX_CHAR_RUN   = 14;
var WRITTEN_XP_BASE              = 4;
var WRITTEN_XP_PER_MARK          = 2;
var WRITTEN_XP_MARK_CAP          = 10;

// Daily challenge targets
var DAILY_CHALLENGE = {
  answered:     10,
  reviewRounds: 1,
  weakTopics:   1,
  bonusXp:      60,
};

// XP policy overrides from window (set by subject shell before this runs)
var _XP_POLICY              = window.LEVELUP_XP_POLICY || {};
var _TOPIC_FARM_LOCK_POLICY = _XP_POLICY.topicFarmLock || {};
var TOPIC_FARM_LOCK_WINDOW_MS    = Number(_TOPIC_FARM_LOCK_POLICY.windowMs  || 1000 * 60 * 60);
var TOPIC_FARM_LOCK_TRIGGER_XP   = Number(_TOPIC_FARM_LOCK_POLICY.triggerXp || 140);
var TOPIC_FARM_LOCK_MS           = Number(_TOPIC_FARM_LOCK_POLICY.lockMs    || 1000 * 60 * 30);
var ENABLE_ACTIVITY_XP_CAP       = !!_XP_POLICY.enableActivityXpCap;

// Parent-readable study report digest → event_log (see progress-store + supabase-client)
var REPORT_DIGEST_DEBOUNCE_MS         = 45000; // coalesce with saveState / activity
var REPORT_DIGEST_HIDDEN_DELAY_MS     = 2000;  // tab background: flush after short delay
var REPORT_DIGEST_MAX_UPLOADS_PER_DAY = 3;     // per subject + device (local calendar day)
var REPORT_DIGEST_TEXT_MAX_CHARS      = 6000;  // cap plain-text payload size
