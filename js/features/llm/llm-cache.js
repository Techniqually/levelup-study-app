/**
 * Client-side LRU + TTL cache for quiz LLM explanations (localStorage).
 */
(function (global) {
  var STORE_KEY = "LEVELUP_LLM_QUIZ_CACHE_V1";

  function loadStore() {
    try {
      var raw = global.localStorage.getItem(STORE_KEY);
      if (!raw) return { v: 1, order: [], entries: {} };
      var o = JSON.parse(raw);
      if (!o || o.v !== 1 || !Array.isArray(o.order) || !o.entries || typeof o.entries !== "object") {
        return { v: 1, order: [], entries: {} };
      }
      return o;
    } catch (e) {
      return { v: 1, order: [], entries: {} };
    }
  }

  function saveStore(store) {
    global.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  /**
   * Stable key: question id or getQuestionKey + indices + app content version.
   */
  function makeQuizKey(q, topicId, correctIndex, chosenIndex, contentVersion, subjectId) {
    var id =
      q && q.id != null
        ? String(q.id)
        : typeof getQuestionKey === "function"
          ? getQuestionKey(q, topicId)
          : String(topicId || "x") + "::" + String((q && q.question) || "").slice(0, 120);
    var sub = subjectId ? "|sub:" + String(subjectId) : "";
    return (
      id +
      sub +
      "|c" +
      String(correctIndex) +
      "|s" +
      String(chosenIndex) +
      "|v" +
      String(contentVersion || "dev")
    );
  }

  function getMaxEntries(config) {
    var c = config && config.cache;
    if (c && typeof c.maxEntries === "number" && c.maxEntries > 0) return c.maxEntries;
    return 200;
  }

  function getTtlMs(config) {
    var c = config && config.cache;
    var days = c && typeof c.ttlDays === "number" && c.ttlDays > 0 ? c.ttlDays : 60;
    return days * 86400000;
  }

  function get(config, keyStr) {
    var store = loadStore();
    var ent = store.entries[keyStr];
    if (!ent || typeof ent.at !== "number") return null;
    if (Date.now() - ent.at > getTtlMs(config)) return null;
    return ent.payload;
  }

  function set(config, keyStr, payload) {
    var max = getMaxEntries(config);
    var store = loadStore();
    var order = store.order.filter(function (k) {
      return k !== keyStr;
    });
    order.push(keyStr);
    store.entries[keyStr] = { at: Date.now(), payload: payload };
    while (order.length > max) {
      var drop = order.shift();
      if (drop) delete store.entries[drop];
    }
    store.order = order;
    saveStore(store);
  }

  /** Test helper */
  function _clearForTests() {
    global.localStorage.removeItem(STORE_KEY);
  }

  global.LevelupLlmQuizCache = {
    makeQuizKey: makeQuizKey,
    get: get,
    set: set,
    _clearForTests: _clearForTests,
  };
})(window);
