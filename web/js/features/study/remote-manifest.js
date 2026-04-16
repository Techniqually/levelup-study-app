(function (global) {
  var BUCKET = "study-materials";

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

  async function downloadText(path) {
    if (!canUseStorage()) throw new Error("storage_client_missing");
    var sb = global.LevelupAuth.getClient();
    var dl = await sb.storage.from(BUCKET).download(path);
    if (dl.error || !dl.data) {
      throw new Error("download_failed:" + path);
    }
    return dl.data.text();
  }

  async function loadScriptFromStorage(path) {
    if (!canUseStorage()) throw new Error("storage_client_missing");
    var sb = global.LevelupAuth.getClient();
    var dl = await sb.storage.from(BUCKET).download(path);
    if (dl.error || !dl.data) throw new Error("download_failed:" + path);
    var blobUrl = URL.createObjectURL(dl.data);
    await new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = blobUrl;
      s.async = false;
      s.onload = function () {
        URL.revokeObjectURL(blobUrl);
        resolve();
      };
      s.onerror = function () {
        URL.revokeObjectURL(blobUrl);
        reject(new Error("script_load_failed:" + path));
      };
      document.body.appendChild(s);
    });
  }

  async function loadSubjectBootstrap(subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    if (!sid) return { ok: false, reason: "subject_missing" };
    try {
      // Required payloads.
      await loadScriptFromStorage("shared/shop-rewards.js");
      var manifestText = await downloadText(sid + "/topics-manifest.json");
      var parsed = JSON.parse(manifestText);
      var list = normalizeManifest(parsed);
      if (!list || !list.length) return { ok: false, reason: "manifest_empty" };
      global.__topicRegistry = global.__topicRegistry || {};
      global.__registerTopic =
        global.__registerTopic ||
        function (topic) {
          if (!topic || topic.id == null) return;
          global.__topicRegistry[String(topic.id)] = topic;
        };
      global.TOPICS_MANIFEST = list;

      // Optional payloads.
      var optional = [
        sid + "/infographics-images.js",
        sid + "/extra-quiz.js",
        sid + "/extended-questions.js",
      ];
      for (var i = 0; i < optional.length; i += 1) {
        try {
          await loadScriptFromStorage(optional[i]);
        } catch (_) {
          // optional
        }
      }

      try {
        global.__LEVELUP_INFO_MD_TEXT = await downloadText(sid + "/infographics-info.md");
      } catch (_) {
        global.__LEVELUP_INFO_MD_TEXT = "";
      }
      return { ok: true, source: "storage", count: list.length };
    } catch (e) {
      return { ok: false, reason: (e && e.message) || "bootstrap_failed" };
    }
  }

  async function loadForSubject(subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    if (!sid) return { ok: false, reason: "subject_missing" };
    if (!canUseStorage()) return { ok: false, reason: "storage_client_missing" };
    var txt = await downloadText(sid + "/topics-manifest.json");
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
    loadSubjectBootstrap: loadSubjectBootstrap,
    loadScriptFromStorage: loadScriptFromStorage,
    loadForSubject: loadForSubject,
  };
})(window);
