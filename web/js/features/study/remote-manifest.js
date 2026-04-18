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

  // In preview mode (non-entitled), keep only topics marked `free:true` and rewrite
  // their file path to the `<subject>/free/<basename>` copy the sync tool uploaded.
  // Storage RLS only permits `<subject>/free/*` for non-entitled users.
  function applyPreviewView(list, subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    var out = [];
    for (var i = 0; i < list.length; i += 1) {
      var row = list[i];
      if (!row || !row.free) continue;
      var file = String(row.file || "");
      var base = file.split("/").pop();
      out.push(
        Object.assign({}, row, {
          // storage-native path (topic-load.js supports legacy + this format)
          file: sid + "/free/" + base,
        })
      );
    }
    return out;
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

  async function listSubjectRootFiles(subjectId) {
    if (!canUseStorage()) return null;
    var sb = global.LevelupAuth.getClient();
    try {
      var res = await sb.storage.from(BUCKET).list(String(subjectId || ""), {
        limit: 200,
        offset: 0,
      });
      if (res.error || !Array.isArray(res.data)) return null;
      var names = Object.create(null);
      for (var i = 0; i < res.data.length; i += 1) {
        var row = res.data[i];
        var n = row && row.name ? String(row.name) : "";
        if (n) names[n] = true;
      }
      return names;
    } catch (_) {
      return null;
    }
  }

  async function loadSubjectBootstrap(subjectId) {
    var sid = String(subjectId || "").toLowerCase();
    if (!sid) return { ok: false, reason: "subject_missing" };
    try {
      // Required payloads.
      await loadScriptFromStorage("shared/shop-rewards.js");
      var manifestText = await downloadText(sid + "/topics-manifest.json");
      var parsed = JSON.parse(manifestText);
      var fullList = normalizeManifest(parsed);
      if (!fullList || !fullList.length) return { ok: false, reason: "manifest_empty" };

      var isPreview = !!global.SUBJECT_PREVIEW_MODE;
      var list = isPreview ? applyPreviewView(fullList, sid) : fullList;
      if (!list.length) return { ok: false, reason: "no_free_topics" };

      global.__topicRegistry = global.__topicRegistry || {};
      global.__registerTopic =
        global.__registerTopic ||
        function (topic) {
          if (!topic || topic.id == null) return;
          global.__topicRegistry[String(topic.id)] = topic;
        };
      global.TOPICS_MANIFEST = list;
      global.__LEVELUP_FULL_TOPIC_COUNT = fullList.length;

      if (isPreview) {
        try { injectPreviewBanner(sid, list.length, fullList.length); } catch (_) {}
      }

      // Optional payloads. Skip the entitled-only ones in preview mode so we don't
      // spam the console with 403s (RLS denies them for non-entitled users).
      var optional = isPreview
        ? [
            // Needed for subjects whose topic files don't embed infographic arrays.
            sid + "/infographics-images.js",
          ]
        : [
            sid + "/infographics-images.js",
            sid + "/extra-quiz.js",
            sid + "/extended-questions.js",
          ];
      var rootFiles = await listSubjectRootFiles(sid);
      for (var i = 0; i < optional.length; i += 1) {
        var optPath = optional[i];
        if (rootFiles) {
          var optName = optPath.split("/").pop();
          if (!rootFiles[optName]) continue;
        }
        try {
          await loadScriptFromStorage(optPath);
        } catch (_) {
          // optional
        }
      }

      // Rewrite infographic image URLs to Supabase signed URLs so the <img src> can
      // actually fetch from the private study-materials bucket. Bundled
      // infographics-images.js files build URLs like
      //   `<origin>/data/subjects/<sid>/images/<file>`
      // which point at the web server (404). Convert to signed URLs with a 24h TTL.
      try {
        await rewriteInfographicUrls(sid);
      } catch (_) {
        // best-effort: leave originals if signing fails
      }

      try {
        global.__LEVELUP_INFO_MD_TEXT = await downloadText(sid + "/infographics-info.md");
      } catch (_) {
        global.__LEVELUP_INFO_MD_TEXT = "";
      }
      return { ok: true, source: "storage", count: list.length, preview: isPreview };
    } catch (e) {
      return { ok: false, reason: (e && e.message) || "bootstrap_failed" };
    }
  }

  // Convert a bundled `data/subjects/<sid>/images/<file>` URL (or bare filename) to
  // a signed Supabase Storage URL. Returns null on error.
  async function signedImageUrl(subjectId, originalOrFilename) {
    if (!canUseStorage()) return null;
    var sb = global.LevelupAuth.getClient();
    var raw = String(originalOrFilename || "");
    if (!raw) return null;
    // Strip to just `<subject>/images/<file>` (RLS-compatible storage path).
    var m = raw.match(/data\/subjects\/([^\/]+)\/((?:free\/)?images\/.+)$/i);
    var storagePath;
    if (m) {
      storagePath = m[1] + "/" + m[2].split("?")[0];
    } else if (/^[a-z0-9_-]+\/(?:free\/)?images\//i.test(raw)) {
      storagePath = raw.split("?")[0];
    } else {
      // Assume bare filename under current subject's images/ folder.
      storagePath = String(subjectId) + "/images/" + raw.split("/").pop().split("?")[0];
    }
    try {
      var res = await sb.storage.from(BUCKET).createSignedUrl(storagePath, 60 * 60 * 24); // 24h
      if (res.error || !res.data) return null;
      return res.data.signedUrl || res.data.signedURL || res.data.signed_url || null;
    } catch (_) {
      return null;
    }
  }

  async function rewriteInfographicUrls(subjectId) {
    var jobs = [];
    var seen = Object.create(null);

    function queueOne(inf) {
      if (!inf || !inf.image) return;
      var raw = String(inf.image || "");
      if (!raw) return;
      if (/^https?:\/\//i.test(raw) && raw.indexOf("/storage/v1/object/sign/") >= 0) {
        return; // already signed
      }
      var key = String(subjectId) + "::" + raw;
      if (seen[key]) return;
      seen[key] = true;
      jobs.push(
        signedImageUrl(subjectId, raw).then(function (url) {
          if (url) inf.image = url;
        })
      );
    }

    // Source 1: fallback images loaded by <subject>/infographics-images.js
    var byTopic = global.SUBJECT_INFOS_BY_TOPIC;
    if (byTopic && typeof byTopic === "object") {
      Object.keys(byTopic).forEach(function (tid) {
        var list = byTopic[tid];
        if (!Array.isArray(list)) return;
        list.forEach(queueOne);
      });
    }

    // Source 2: manifest-native infographics used directly by renderVisuals(t)
    var manifest = Array.isArray(global.TOPICS_MANIFEST) ? global.TOPICS_MANIFEST : [];
    manifest.forEach(function (topic) {
      if (!topic || !Array.isArray(topic.infographics)) return;
      topic.infographics.forEach(queueOne);
    });

    if (jobs.length) await Promise.all(jobs);
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

  function injectPreviewBanner(subjectId, freeCount, totalCount) {
    if (document.getElementById("preview-banner")) return;
    var pretty = subjectId.charAt(0).toUpperCase() + subjectId.slice(1);
    var bar = document.createElement("div");
    bar.id = "preview-banner";
    bar.setAttribute("role", "status");
    bar.innerHTML =
      '<div class="preview-banner__inner">' +
      '<div class="preview-banner__text">' +
      '<strong>Preview mode</strong> · ' + freeCount + ' of ' + totalCount + ' ' + pretty + ' topics unlocked.' +
      '</div>' +
      '<div class="preview-banner__actions">' +
      '<a class="preview-banner__cta" href="hub.html">Back to subjects</a>' +
      '<button type="button" class="preview-banner__btn" id="preview-upgrade">Unlock full syllabus</button>' +
      '</div>' +
      '</div>';
    var app = document.getElementById("app") || document.body;
    app.insertBefore(bar, app.firstChild);
    var btn = document.getElementById("preview-upgrade");
    if (btn) {
      btn.addEventListener("click", function () {
        // POC: no billing wired yet — show a lightweight prompt.
        var msg =
          "To unlock the full " +
          pretty +
          " syllabus, an admin needs to grant your account the subject entitlement.\n\n" +
          "Ping your onboarding contact with:\n• Email: " +
          String((global.LEVELUP_STUDENT_ID) || "(signed-in email)") +
          "\n• Subject: " + pretty;
        try { window.alert(msg); } catch (_) {}
      });
    }
  }

  global.LevelupRemoteManifest = {
    loadSubjectBootstrap: loadSubjectBootstrap,
    loadScriptFromStorage: loadScriptFromStorage,
    loadForSubject: loadForSubject,
    signedImageUrl: signedImageUrl,
  };
})(window);
