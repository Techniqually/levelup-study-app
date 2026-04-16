(function (global) {
  function canUseStorage() {
    return !!(
      global.LevelupAuth &&
      typeof global.LevelupAuth.getClient === "function" &&
      global.LevelupAuth.getClient()
    );
  }

  function normalizeManifest(raw) {
    if (Array.isArray(raw)) return raw;
    if (raw && Array.isArray(raw.topics)) return raw.topics;
    return null;
  }

  async function loadForSubject(subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    if (!sid) return { ok: false, reason: "subject_missing" };
    if (!canUseStorage()) return { ok: false, reason: "storage_client_missing" };
    var sb = global.LevelupAuth.getClient();
    var path = sid + "/topics-manifest.json";
    var dl = await sb.storage.from("study-materials").download(path);
    if (dl.error || !dl.data) {
      return { ok: false, reason: "download_failed", detail: dl.error || null };
    }
    var txt = await dl.data.text();
    var parsed = JSON.parse(txt);
    var list = normalizeManifest(parsed);
    if (!list || !list.length) {
      return { ok: false, reason: "manifest_empty" };
    }

    global.__topicRegistry = global.__topicRegistry || {};
    global.__registerTopic =
      global.__registerTopic ||
      function (topic) {
        if (!topic || topic.id == null) return;
        global.__topicRegistry[String(topic.id)] = topic;
      };
    global.TOPICS_MANIFEST = list;
    return { ok: true, source: "storage", count: list.length };
  }

  global.LevelupRemoteManifest = {
    loadForSubject: loadForSubject,
  };
})(window);
