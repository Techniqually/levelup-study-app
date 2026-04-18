(function () {
  var SOURCE_APP = "levelup";

  function getClient() {
    // Reuse auth-client's shared Supabase instance (carries the auth session).
    if (window.LevelupAuth && typeof window.LevelupAuth.getClient === "function") {
      return window.LevelupAuth.getClient();
    }
    // Fallback: create own client from localStorage config.
    if (!(window.supabase && typeof window.supabase.createClient === "function")) return null;
    var url  = String(window.SUPABASE_URL  || localStorage.getItem("SUPABASE_URL")  || "").trim();
    var anon = String(window.SUPABASE_ANON_KEY || localStorage.getItem("SUPABASE_ANON_KEY") || "").trim();
    if (!url || !anon) return null;
    return window.supabase.createClient(url, anon);
  }

  function isEnabled() { return !!getClient(); }

  async function getCurrentUserId() {
    var sb = getClient();
    if (!sb) return null;
    var res = await sb.auth.getUser();
    return (res && res.data && res.data.user && res.data.user.id) || null;
  }

  /** Lightweight context — just confirms we are authenticated. */
  async function ensureContext() {
    var uid = await getCurrentUserId();
    if (!uid) return null;
    return { userId: uid };
  }

  async function testConnection() {
    try {
      var sb = getClient();
      if (!sb) return { ok: false, error: "supabase_not_configured" };
      var c = await ensureContext();
      if (!c) return { ok: false, error: "unauthenticated" };
      return { ok: true, context: c };
    } catch (e) {
      return { ok: false, error: (e && e.message) || String(e) };
    }
  }

  async function insertXpEntry(entry) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };
    var row = {
      user_id:  uid,
      delta:    Number(entry.deltaXp || 0),
      reason:   String(entry.reason || "manual"),
      subject_id: entry.subjectId || null,
      meta: {
        ts:           Number(entry.ts || Date.now()),
        topicId:      entry.topicId      || null,
        theme:        entry.theme        || "",
        tab:          entry.tab          || null,
        activityType: entry.activityType || "study",
        sourceId:     entry.sourceId     || null,
      },
      client_event_id:
        entry.clientEventId ||
        ("xp-" + (entry.ts || Date.now()) + "-" + (entry.topicId || "g") + "-" +
         (entry.reason || "manual") + "-" + (entry.deltaXp || 0)),
      created_at: new Date(Number(entry.ts || Date.now())).toISOString(),
    };
    // Plain insert: PostgREST upsert(..., onConflict: "user_id,client_event_id") returns
    // 400 against our *partial* unique index (uq_xp_ledger_client_event … where
    // client_event_id is not null) — Postgres cannot use that as an ON CONFLICT
    // arbiter. Treat unique violations as success (idempotent replay).
    var res = await sb.from("study_xp_ledger").insert(row);
    if (!res.error) return { ok: true };
    if (isLedgerDuplicateError(res.error)) return { ok: true, duplicate: true };
    throw res.error;
  }

  function isLedgerDuplicateError(err) {
    if (!err) return false;
    var c = String(err.code || "");
    if (c === "23505") return true;
    var st = String(err.statusCode || err.status || "");
    if (st === "409") return true;
    var m = (String(err.message || "") + " " + String(err.details || "")).toLowerCase();
    return m.indexOf("duplicate") !== -1 || m.indexOf("unique") !== -1 || m.indexOf("already exists") !== -1;
  }

  async function upsertTopicStats(subjectId, topicStats) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };
    var rows = Object.keys(topicStats || {}).map(function (topicId) {
      var stats = topicStats[topicId];
      return {
        user_id:       uid,
        subject_id:    String(subjectId || ""),
        topic_id:      String(topicId),
        seen:          Number(stats.totalQuestionsSeen || 0),
        correct:       Math.max(0, Number(stats.totalQuestionsSeen || 0) - Number(stats.totalWrong || 0)),
        mastery:       Math.round(Number(stats.mastery || 0)),
        streak:        Number(stats.errorFreeRounds || 0),
        last_result:   null,
        mastered_until: Number(stats.masteredUntil || 0)
          ? new Date(Number(stats.masteredUntil)).toISOString()
          : null,
        updated_at:    new Date().toISOString(),
      };
    });
    if (!rows.length) return { ok: true };
    var res = await sb.from("study_topic_stats")
      .upsert(rows, { onConflict: "user_id,subject_id,topic_id" });
    if (res.error) throw res.error;
    return { ok: true };
  }

  async function insertPurchase(purchase) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };
    var row = {
      user_id:           uid,
      reward_id:         String(purchase.couponId || purchase.id || ""),
      reward_label:      String(purchase.label || ""),
      xp_cost:           Math.abs(Number(purchase.xpSpent || purchase.xp || 0)),
      coupon_code:       purchase.couponCode || null,
      client_purchase_id: purchase.clientPurchaseId || purchase.id || null,
      purchased_at:      new Date(Number(purchase.ts || Date.now())).toISOString(),
    };
    var res = await sb.from("study_reward_purchases")
      .upsert(row, { onConflict: "user_id,client_purchase_id", ignoreDuplicates: true });
    if (res.error) throw res.error;
    return { ok: true };
  }

  async function getDailyCounts() {
    var sb = getClient();
    if (!sb) return null;
    var uid = await getCurrentUserId();
    if (!uid) return null;
    var today = new Date().toISOString().slice(0, 10);
    var res = await sb.from("study_daily_counters")
      .select("reward_id, count")
      .eq("user_id", uid)
      .eq("day", today);
    if (res.error) return null;
    var counts = {};
    (res.data || []).forEach(function (row) {
      counts[String(row.reward_id)] = Number(row.count || 0);
    });
    return { ok: true, counts: counts };
  }

  async function getShopSnapshot() {
    var sb = getClient();
    if (!sb) return null;
    var uid = await getCurrentUserId();
    if (!uid) return null;
    var today = new Date().toISOString().slice(0, 10);
    var results = await Promise.all([
      sb.from("study_xp_ledger").select("delta").eq("user_id", uid),
      sb.from("study_reward_purchases")
        .select("reward_id,reward_label,xp_cost,coupon_code,client_purchase_id,purchased_at,claimed_at")
        .eq("user_id", uid)
        .order("purchased_at", { ascending: false })
        .limit(50),
      sb.from("study_daily_counters")
        .select("reward_id,count")
        .eq("user_id", uid)
        .eq("day", today),
      // Parent-configured rewards catalog for this student (RLS: own + active).
      sb.from("student_rewards")
        .select("id,label,description,xp_cost,sort_order")
        .eq("student_user_id", uid)
        .eq("active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);
    if (results[0].error || results[1].error) return null;
    var xpBalance = (results[0].data || []).reduce(function (s, r) { return s + Number(r.delta || 0); }, 0);
    var dailyCounts = {};
    (results[2].data || []).forEach(function (row) {
      dailyCounts[String(row.reward_id)] = Number(row.count || 0);
    });
    var parentRewards = (results[3] && !results[3].error && Array.isArray(results[3].data))
      ? results[3].data
      : [];
    return {
      ok:              true,
      xp_balance:      xpBalance,
      coupons_recent:  results[1].data || [],
      daily_counts:    dailyCounts,
      parent_rewards:  parentRewards,
    };
  }

  async function logStateSnapshot(payload) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };
    var compact = {
      xp:            Number(payload.xp || 0),
      streak:        Number(payload.streak || 0),
      topicCount:    Object.keys(payload.topicStats || {}).length,
      ledgerCount:   Array.isArray(payload.xpLedger)      ? payload.xpLedger.length      : 0,
      purchaseCount: Array.isArray(payload.purchaseLedger) ? payload.purchaseLedger.length : 0,
      dailyChallenge: payload.dailyChallenge || null,
      ts: Date.now(),
    };
    var res = await sb.from("event_log").insert({
      user_id:    uid,
      source_app: SOURCE_APP,
      event_type: "state_snapshot",
      event_data: compact,
    });
    if (res.error) throw res.error;
    return { ok: true };
  }

  async function logStudyReportDigest(payload) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };
    var p   = payload || {};
    var max = typeof REPORT_DIGEST_TEXT_MAX_CHARS === "number" ? REPORT_DIGEST_TEXT_MAX_CHARS : 6000;
    var text = String(p.text || "").slice(0, max);
    var res = await sb.from("event_log").insert({
      user_id:    uid,
      source_app: SOURCE_APP,
      event_type: "study_report_digest",
      event_data: {
        subject_id:    String(p.subjectId    || ""),
        subject_title: String(p.subjectTitle || ""),
        generated_at:  String(p.generatedAt  || new Date().toISOString()),
        fp:            String(p.fp           || ""),
        reason:        String(p.reason       || ""),
        text:          text,
        text_length:   text.length,
      },
    });
    if (res.error) throw res.error;
    return { ok: true };
  }

  async function purchaseReward(params) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };

    var today    = new Date().toISOString().slice(0, 10);
    var rewardId = String(params.id);
    var dailyMax = Math.max(1, Number(params.dailyMax || 1));

    // Check daily limit
    var dailyRes = await sb.from("study_daily_counters")
      .select("count")
      .eq("user_id", uid)
      .eq("day", today)
      .eq("reward_id", rewardId)
      .maybeSingle();
    var currentCount = (dailyRes.data && Number(dailyRes.data.count)) || 0;
    if (currentCount >= dailyMax) {
      return { ok: false, error: "daily_limit_reached" };
    }

    // Generate coupon code and insert purchase
    var couponCode = "LU-" + Math.random().toString(36).toUpperCase().slice(2, 10);
    var clientPurchaseId = "purch-" + Date.now() + "-" + rewardId;
    var purchRes = await sb.from("study_reward_purchases").insert({
      user_id:           uid,
      reward_id:         rewardId,
      reward_label:      String(params.label),
      xp_cost:           Math.abs(Number(params.xp)),
      coupon_code:       couponCode,
      client_purchase_id: clientPurchaseId,
      purchased_at:      new Date().toISOString(),
    });
    if (purchRes.error) throw purchRes.error;

    // Update daily counter
    await sb.from("study_daily_counters").upsert({
      user_id:    uid,
      day:        today,
      reward_id:  rewardId,
      count:      currentCount + 1,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,day,reward_id" });

    return { ok: true, coupon_code: couponCode, client_purchase_id: clientPurchaseId };
  }

  async function fetchReportData(subjectId) {
    var sb = getClient();
    if (!sb) return null;
    var uid = await getCurrentUserId();
    if (!uid) return null;
    var results = await Promise.all([
      sb.from("study_xp_ledger")
        .select("delta,reason,meta,subject_id,created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(500),
      sb.from("study_reward_purchases")
        .select("reward_id,reward_label,xp_cost,coupon_code,purchased_at")
        .eq("user_id", uid)
        .order("purchased_at", { ascending: false })
        .limit(200),
      sb.from("study_topic_stats")
        .select("subject_id,topic_id,mastery,seen,correct,streak,updated_at")
        .eq("user_id", uid)
        .eq("subject_id", String(subjectId))
        .order("updated_at", { ascending: false }),
      sb.from("study_question_misses")
        .select("subject_id,topic_id,question_key,miss_count,last_missed_at")
        .eq("user_id", uid)
        .eq("subject_id", String(subjectId))
        .order("miss_count", { ascending: false })
        .limit(100),
    ]);
    if (results[0].error || results[1].error || results[2].error || results[3].error) {
      throw results[0].error || results[1].error || results[2].error || results[3].error;
    }
    return {
      xpLedger:   results[0].data || [],
      purchases:  results[1].data || [],
      topicStats: results[2].data || [],
      misses:     results[3].data || [],
      source: "supabase",
    };
  }

  // ── user_subject_state: full local-state sync ────────────────────────────

  async function syncSubjectState(subjectId, clientState) {
    var sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    var uid = await getCurrentUserId();
    if (!uid) return { ok: false, reason: "unauthenticated" };
    var res = await sb.from("user_subject_state").upsert({
      user_id:      uid,
      subject_id:   String(subjectId),
      client_state: clientState,
      updated_at:   new Date().toISOString(),
    }, { onConflict: "user_id,subject_id" });
    if (res.error) throw res.error;
    return { ok: true };
  }

  async function fetchSubjectState(subjectId) {
    var sb = getClient();
    if (!sb) return null;
    var uid = await getCurrentUserId();
    if (!uid) return null;
    var res = await sb.from("user_subject_state")
      .select("client_state,updated_at")
      .eq("user_id", uid)
      .eq("subject_id", String(subjectId))
      .maybeSingle();
    if (res.error || !res.data) return null;
    return { clientState: res.data.client_state, updatedAt: res.data.updated_at };
  }

  window.LevelupSupabase = {
    isEnabled:            isEnabled,
    ensureContext:        ensureContext,
    getCurrentUserId:     getCurrentUserId,
    insertXpEntry:        insertXpEntry,
    upsertTopicStats:     upsertTopicStats,
    insertPurchase:       insertPurchase,
    getDailyCounts:       getDailyCounts,
    getShopSnapshot:      getShopSnapshot,
    logStateSnapshot:     logStateSnapshot,
    logStudyReportDigest: logStudyReportDigest,
    purchaseReward:       purchaseReward,
    fetchReportData:      fetchReportData,
    syncSubjectState:     syncSubjectState,
    fetchSubjectState:    fetchSubjectState,
    testConnection:       testConnection,
  };
})();
