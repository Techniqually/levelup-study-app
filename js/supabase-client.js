(function () {
  const PROJECT_CODE = window.SUPABASE_PROJECT_CODE || "study-app";
  const DEVICE_KEY = "levelup_device_id_v1";
  const SOURCE_APP = "study-app";
  let client = null;
  let ctx = null;

  function getDeviceId() {
    let id = "";
    try {
      id = localStorage.getItem(DEVICE_KEY) || "";
      if (!id) {
        if (window.crypto && crypto.randomUUID) id = crypto.randomUUID();
        else id = "dev-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(DEVICE_KEY, id);
      }
    } catch (_) {
      id = "ephemeral-" + Date.now();
    }
    return id;
  }

  function canInit() {
    return !!(
      window.supabase &&
      typeof window.supabase.createClient === "function" &&
      window.SUPABASE_URL &&
      window.SUPABASE_ANON_KEY
    );
  }

  function getStudentId() {
    return (
      window.LEVELUP_STUDENT_ID ||
      localStorage.getItem("LEVELUP_STUDENT_ID") ||
      ("student-" + getDeviceId().slice(0, 8))
    );
  }

  function getStudentName() {
    return (
      window.LEVELUP_STUDENT_NAME ||
      localStorage.getItem("LEVELUP_STUDENT_NAME") ||
      "Student"
    );
  }

  function getClient() {
    if (client || !canInit()) return client;
    client = window.supabase.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            "x-device-id": getDeviceId(),
            "x-student-id": getStudentId(),
          },
        },
      }
    );
    return client;
  }

  async function ensureContext() {
    if (ctx) return ctx;
    const sb = getClient();
    if (!sb) return null;
    const deviceId = getDeviceId();
    const studentId = getStudentId();
    const studentName = getStudentName();
    let { data: project, error: pErr } = await sb
      .from("projects")
      .select("id,code")
      .eq("code", PROJECT_CODE)
      .maybeSingle();
    if (pErr) throw pErr;
    if (!project) {
      const ins = await sb
        .from("projects")
        .insert({ code: PROJECT_CODE, name: "Study App" })
        .select("id,code")
        .single();
      if (ins.error) throw ins.error;
      project = ins.data;
    }
    let up = await sb
      .from("profiles")
      .upsert(
        {
          project_id: project.id,
          student_id: studentId,
          device_id: deviceId,
          display_name: studentName,
          meta: {
            studentId,
            subjectHint: window.SUBJECT_ID || null,
            lastDeviceId: deviceId,
          },
        },
        { onConflict: "project_id,student_id", ignoreDuplicates: false }
      )
      .select("id,project_id,device_id,student_id,display_name,meta")
      .single();
    if (up.error) {
      up = await sb
        .from("profiles")
        .upsert(
          {
            project_id: project.id,
            student_id: studentId,
            device_id: deviceId,
            display_name: studentName,
            meta: {
              studentId,
              subjectHint: window.SUBJECT_ID || null,
              lastDeviceId: deviceId,
            },
          },
          { onConflict: "project_id,device_id", ignoreDuplicates: false }
        )
        .select("id,project_id,device_id,display_name,meta")
        .single();
      if (up.error) throw up.error;
    }
    ctx = {
      projectId: project.id,
      profileId: up.data.id,
      deviceId,
      projectCode: PROJECT_CODE,
      studentId:
        up.data.student_id ||
        (up.data.meta && up.data.meta.studentId ? up.data.meta.studentId : studentId),
      studentName: up.data.display_name || studentName,
    };
    return ctx;
  }

  async function testConnection() {
    try {
      const sb = getClient();
      if (!sb) return { ok: false, error: "supabase_not_configured" };
      const c = await ensureContext();
      if (!c) return { ok: false, error: "context_unavailable" };
      return { ok: true, context: c };
    } catch (e) {
      return { ok: false, error: (e && e.message) || String(e) };
    }
  }

  async function insertXpEntry(entry) {
    const sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    const c = await ensureContext();
    if (!c) return { ok: false, reason: "no_context" };
    const row = {
      project_id: c.projectId,
      profile_id: c.profileId,
      delta: Number(entry.deltaXp || 0),
      reason: String(entry.reason || "manual"),
      meta: {
        ts: Number(entry.ts || Date.now()),
        subjectId: entry.subjectId || null,
        topicId: entry.topicId || null,
        theme: entry.theme || "",
        tab: entry.tab || null,
        activityType: entry.activityType || "study",
        sourceId: entry.sourceId || null,
        studentId: c.studentId,
        studentName: c.studentName,
      },
      client_event_id:
        entry.clientEventId ||
        `xp-${entry.ts || Date.now()}-${entry.topicId || "g"}-${entry.reason || "manual"}-${entry.deltaXp || 0}`,
      created_at: new Date(Number(entry.ts || Date.now())).toISOString(),
    };
    const { error } = await sb
      .from("study_xp_ledger")
      .upsert(row, { onConflict: "project_id,profile_id,client_event_id", ignoreDuplicates: true });
    if (error) throw error;
    return { ok: true };
  }

  async function upsertTopicStats(subjectId, topicStats) {
    const sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    const c = await ensureContext();
    if (!c) return { ok: false, reason: "no_context" };
    const rows = Object.entries(topicStats || {}).map(([topicId, stats]) => ({
      project_id: c.projectId,
      profile_id: c.profileId,
      subject_id: String(subjectId || ""),
      topic_id: String(topicId),
      seen: Number(stats.totalQuestionsSeen || 0),
      correct: Math.max(0, Number(stats.totalQuestionsSeen || 0) - Number(stats.totalWrong || 0)),
      mastery: Math.round(Number(stats.mastery || 0)),
      streak: Number(stats.errorFreeRounds || 0),
      last_result: null,
      mastered_until: Number(stats.masteredUntil || 0)
        ? new Date(Number(stats.masteredUntil)).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    }));
    if (!rows.length) return { ok: true };
    const { error } = await sb
      .from("study_topic_stats")
      .upsert(rows, { onConflict: "project_id,profile_id,subject_id,topic_id" });
    if (error) throw error;
    return { ok: true };
  }

  async function insertPurchase(purchase) {
    const sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    const c = await ensureContext();
    if (!c) return { ok: false, reason: "no_context" };
    const row = {
      project_id: c.projectId,
      profile_id: c.profileId,
      reward_id: String(purchase.couponId || purchase.id || ""),
      reward_label: String(purchase.label || ""),
      xp_cost: Math.abs(Number(purchase.xpSpent || purchase.xp || 0)),
      coupon_code: purchase.couponCode || null,
      client_purchase_id: purchase.clientPurchaseId || purchase.id || null,
      purchased_at: new Date(Number(purchase.ts || Date.now())).toISOString(),
    };
    const { error } = await sb
      .from("study_reward_purchases")
      .upsert(row, { onConflict: "project_id,profile_id,client_purchase_id", ignoreDuplicates: true });
    if (error) throw error;
    return { ok: true };
  }

  async function getDailyCounts() {
    const sb = getClient();
    if (!sb) return null;
    const c = await ensureContext();
    if (!c) return null;
    const res = await sb.rpc("study_get_daily_counts", {
      p_project_code: c.projectCode,
      p_student_id: c.studentId,
      p_device_id: c.deviceId,
    });
    if (res.error) return null;
    return res.data || null;
  }

  async function getShopSnapshot() {
    const sb = getClient();
    if (!sb) return null;
    const c = await ensureContext();
    if (!c) return null;
    const res = await sb.rpc("study_get_shop_snapshot", {
      p_project_code: c.projectCode,
      p_student_id: c.studentId,
      p_device_id: c.deviceId,
    });
    if (res.error) return null;
    return res.data || null;
  }

  async function logStateSnapshot(payload) {
    const sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    const c = await ensureContext();
    if (!c) return { ok: false, reason: "no_context" };
    const compact = {
      xp: Number(payload.xp || 0),
      streak: Number(payload.streak || 0),
      topicCount: Object.keys(payload.topicStats || {}).length,
      ledgerCount: Array.isArray(payload.xpLedger) ? payload.xpLedger.length : 0,
      purchaseCount: Array.isArray(payload.purchaseLedger) ? payload.purchaseLedger.length : 0,
      dailyChallenge: payload.dailyChallenge || null,
      ts: Date.now(),
    };
    const { error } = await sb.from("event_log").insert({
      project_id: c.projectId,
      profile_id: c.profileId,
      source_app: SOURCE_APP,
      event_type: "state_snapshot",
      event_data: compact,
    });
    if (error) throw error;
    return { ok: true };
  }

  async function purchaseReward(params) {
    const sb = getClient();
    if (!sb) return { ok: false, reason: "disabled" };
    const c = await ensureContext();
    if (!c) return { ok: false, reason: "no_context" };
    let res = await sb.rpc("study_purchase_reward_v2", {
      p_project_code: c.projectCode,
      p_student_id: c.studentId,
      p_student_name: c.studentName || "",
      p_device_id: c.deviceId,
      p_reward_id: String(params.id),
      p_reward_label: String(params.label),
      p_xp_cost: Number(params.xp),
      p_daily_max: Math.max(1, Number(params.dailyMax || 1)),
    });
    if (res.error) {
      res = await sb.rpc("study_purchase_reward", {
        p_project_code: c.projectCode,
        p_device_id: c.deviceId,
        p_reward_id: String(params.id),
        p_reward_label: String(params.label),
        p_xp_cost: Number(params.xp),
        p_daily_max: Math.max(1, Number(params.dailyMax || 1)),
      });
      if (res.error) throw res.error;
    }
    return res.data || { ok: false, error: "unknown" };
  }

  async function fetchReportData(subjectId) {
    const sb = getClient();
    if (!sb) return null;
    const c = await ensureContext();
    if (!c) return null;
    const [xpRes, purchaseRes, topicRes, missRes] = await Promise.all([
      sb
        .from("study_xp_ledger")
        .select("delta, reason, meta, created_at")
        .eq("project_id", c.projectId)
        .eq("profile_id", c.profileId)
        .order("created_at", { ascending: false })
        .limit(500),
      sb
        .from("study_reward_purchases")
        .select("reward_id, reward_label, xp_cost, coupon_code, purchased_at")
        .eq("project_id", c.projectId)
        .eq("profile_id", c.profileId)
        .order("purchased_at", { ascending: false })
        .limit(200),
      sb
        .from("study_topic_stats")
        .select("subject_id, topic_id, mastery, seen, correct, streak, updated_at")
        .eq("project_id", c.projectId)
        .eq("profile_id", c.profileId)
        .eq("subject_id", String(subjectId))
        .order("updated_at", { ascending: false }),
      sb
        .from("study_question_misses")
        .select("subject_id, topic_id, question_key, miss_count, last_missed_at")
        .eq("project_id", c.projectId)
        .eq("profile_id", c.profileId)
        .eq("subject_id", String(subjectId))
        .order("miss_count", { ascending: false })
        .limit(100),
    ]);
    if (xpRes.error || purchaseRes.error || topicRes.error || missRes.error) {
      throw xpRes.error || purchaseRes.error || topicRes.error || missRes.error;
    }
    return {
      xpLedger: xpRes.data || [],
      purchases: purchaseRes.data || [],
      topicStats: topicRes.data || [],
      misses: missRes.data || [],
      source: "supabase",
    };
  }

  window.LevelupSupabase = {
    isEnabled: () => !!getClient(),
    ensureContext,
    getDeviceId,
    insertXpEntry,
    upsertTopicStats,
    insertPurchase,
    getDailyCounts,
    getShopSnapshot,
    logStateSnapshot,
    purchaseReward,
    fetchReportData,
    testConnection,
  };
})();
