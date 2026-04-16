(function (global) {
  var client = null;
  var entitlementsCache = null;
  var cachedForUserId = "";
  var ENTITLEMENT_MAP = {
    chemistry: "olevel_chem",
    physics: "olevel_phys",
    geography: "olevel_geo",
  };

  function getSupabaseUrl() {
    return (
      String(global.SUPABASE_URL || "").trim() ||
      String(localStorage.getItem("SUPABASE_URL") || "").trim()
    );
  }

  function getSupabaseAnonKey() {
    return (
      String(global.SUPABASE_ANON_KEY || "").trim() ||
      String(localStorage.getItem("SUPABASE_ANON_KEY") || "").trim()
    );
  }

  function getClient() {
    if (client) return client;
    if (!(global.supabase && typeof global.supabase.createClient === "function")) return null;
    var url = getSupabaseUrl();
    var anon = getSupabaseAnonKey();
    if (!url || !anon) return null;
    client = global.supabase.createClient(url, anon);
    return client;
  }

  async function getSession() {
    var sb = getClient();
    if (!sb) return null;
    var res = await sb.auth.getSession();
    return (res && res.data && res.data.session) || null;
  }

  async function getAccessToken() {
    var session = await getSession();
    return session && session.access_token ? String(session.access_token) : "";
  }

  // Password auth removed for commercial PoC (Google-only)

  async function signInWithGoogle(redirectTo) {
    var sb = getClient();
    if (!sb) throw new Error("Supabase client unavailable.");
    var res = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo || global.location.href },
    });
    if (res.error) throw res.error;
    return res.data;
  }

  async function signOut() {
    var sb = getClient();
    if (!sb) return;
    await sb.auth.signOut();
    entitlementsCache = null;
    cachedForUserId = "";
  }

  function onAuthStateChange(cb) {
    var sb = getClient();
    if (!sb || typeof cb !== "function") return function () {};
    var sub = sb.auth.onAuthStateChange(function (_event, session) {
      if (!session || !session.user) {
        entitlementsCache = null;
        cachedForUserId = "";
      }
      cb(session || null);
    });
    return function () {
      try {
        if (sub && sub.data && sub.data.subscription) sub.data.subscription.unsubscribe();
      } catch (_) {}
    };
  }

  async function fetchEntitlements(forceRefresh) {
    var sb = getClient();
    if (!sb) return [];
    var session = await getSession();
    var uid = session && session.user && session.user.id ? String(session.user.id) : "";
    if (!uid) return [];
    if (!forceRefresh && entitlementsCache && cachedForUserId === uid) return entitlementsCache.slice();
    var q = await sb
      .from("user_entitlements")
      .select("entitlements, access_to")
      .eq("user_id", uid)
      .maybeSingle();
    if (q.error || !q.data) {
      entitlementsCache = [];
      cachedForUserId = uid;
      return [];
    }
    var list = Array.isArray(q.data.entitlements) ? q.data.entitlements : [];
    if (q.data.access_to && new Date(q.data.access_to).getTime() < Date.now()) {
      list = []; // expired
    }
    entitlementsCache = list.map(function (x) {
      return String(x);
    });
    cachedForUserId = uid;
    return entitlementsCache.slice();
  }

  async function isSubjectEntitled(subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    if (!sid) return false;
    var needed = ENTITLEMENT_MAP[sid];
    if (!needed) return false;
    var ents = await fetchEntitlements(false);
    return ents.indexOf("olevel_all") !== -1 || ents.indexOf(needed) !== -1;
  }

  async function requireSession() {
    var session = await getSession();
    if (!session || !session.user) return null;
    return session;
  }

  global.LevelupAuth = {
    getClient: getClient,
    getSession: getSession,
    getAccessToken: getAccessToken,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    onAuthStateChange: onAuthStateChange,
    fetchEntitlements: fetchEntitlements,
    isSubjectEntitled: isSubjectEntitled,
    requireSession: requireSession,
  };
})(window);
