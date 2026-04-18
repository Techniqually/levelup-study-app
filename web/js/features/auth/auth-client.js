(function (global) {
  var client = null;
  var entitlementsCache = null;
  var cachedForUserId = "";

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

  // Returns structured entitlement rows: { country_code, class_code, subject_slug, access_to }.
  // Cached in entitlementsCache (per-user). Source: my_subject_entitlements() RPC.
  async function fetchEntitlements(forceRefresh) {
    var sb = getClient();
    if (!sb) return [];
    var session = await getSession();
    var uid = session && session.user && session.user.id ? String(session.user.id) : "";
    if (!uid) return [];
    if (!forceRefresh && entitlementsCache && cachedForUserId === uid) return entitlementsCache.slice();
    var q = await sb.rpc("my_subject_entitlements");
    if (q.error || !Array.isArray(q.data)) {
      entitlementsCache = [];
      cachedForUserId = uid;
      return [];
    }
    var now = Date.now();
    entitlementsCache = q.data
      .filter(function (r) {
        if (!r || !r.subject_slug) return false;
        if (r.access_to && new Date(r.access_to).getTime() < now) return false;
        return true;
      })
      .map(function (r) {
        return {
          country_code: String(r.country_code || ""),
          class_code: String(r.class_code || ""),
          subject_slug: String(r.subject_slug || ""),
          access_to: r.access_to || null,
        };
      });
    cachedForUserId = uid;
    return entitlementsCache.slice();
  }

  async function isSubjectEntitled(subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    if (!sid) return false;
    var ents = await fetchEntitlements(false);
    for (var i = 0; i < ents.length; i++) {
      if (ents[i].subject_slug === sid) return true;
    }
    return false;
  }

  async function requireSession() {
    var session = await getSession();
    if (!session || !session.user) return null;
    return session;
  }

  /**
   * Server-validated user fetch. Unlike getSession() which returns a locally
   * cached token, getUser() makes a network round-trip to Supabase and returns
   * null (+ auto-signs-out) if the token is stale/revoked/user-deleted.
   * Use this on protected page load to detect ghost sessions.
   */
  async function getValidatedUser() {
    var sb = getClient();
    if (!sb) return null;
    var res = await sb.auth.getUser();
    if (res.error || !res.data || !res.data.user) {
      // Stale or invalid session — clear it so the user sees the sign-in screen
      try { await sb.auth.signOut(); } catch (_) {}
      entitlementsCache = null;
      cachedForUserId = "";
      return null;
    }
    return res.data.user;
  }

  global.LevelupAuth = {
    getClient: getClient,
    getSession: getSession,
    getAccessToken: getAccessToken,
    getValidatedUser: getValidatedUser,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    onAuthStateChange: onAuthStateChange,
    fetchEntitlements: fetchEntitlements,
    isSubjectEntitled: isSubjectEntitled,
    requireSession: requireSession,
  };
})(window);
