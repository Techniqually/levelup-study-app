
async function hydrateTopicInfographicUrls(topic, subjectId) {
    if (!topic || !Array.isArray(topic.infographics) || !topic.infographics.length) return;
    var rm = window.LevelupRemoteManifest;
    if (!rm || typeof rm.signedImageUrl !== "function") return;
    var sid = String(subjectId || window.SUBJECT_ID || "").toLowerCase();
    if (!sid) return;
    var jobs = topic.infographics.map(async function (inf) {
      if (!inf || !inf.image) return;
      var raw = String(inf.image || "");
      if (!raw) return;
      if (/^https?:\/\//i.test(raw) && raw.indexOf("/storage/v1/object/sign/") >= 0) return;
      var signed = await rm.signedImageUrl(sid, raw);
      if (signed) inf.image = signed;
    });
    await Promise.all(jobs);
  }

function loadTopicScript(id) {
    if (window.__topicRegistry[id]) {
      const existing = window.__topicRegistry[id];
      return hydrateTopicInfographicUrls(existing, window.SUBJECT_ID)
        .then(() => existing)
        .catch(() => existing);
    }
    const meta = manifest.find((m) => m.id === id);
    if (!meta) return Promise.reject(new Error("unknown topic"));
    const key = meta.file;
    if (loadScriptPromises[key]) {
      return loadScriptPromises[key];
    }
    loadScriptPromises[key] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      function attachAndWait(src, revokeAfterLoad, subjectId) {
        s.src = src;
        s.async = true;
        s.onload = async () => {
          if (revokeAfterLoad) URL.revokeObjectURL(src);
          const t = window.__topicRegistry[id];
          if (t) {
            try {
              await hydrateTopicInfographicUrls(t, subjectId);
            } catch (_) {
              // best-effort, keep topic available even if signing fails
            }
            resolve(t);
          }
          else reject(new Error("register failed"));
        };
        s.onerror = () => {
          if (revokeAfterLoad) URL.revokeObjectURL(src);
          reject(new Error("load " + key));
        };
        document.head.appendChild(s);
      }

      if (!window.LevelupAuth || typeof window.LevelupAuth.getClient !== "function") {
        reject(new Error("storage_client_missing"));
        return;
      }
      const sb = window.LevelupAuth.getClient();
      if (!sb || !sb.storage || !sb.storage.from) {
        reject(new Error("storage_client_unavailable"));
        return;
      }
      const rawFile = String(meta.file || "");
      const legacyMatch = rawFile.match(/^data\/subjects\/(.+)$/);
      // Support both legacy manifest paths (`data/subjects/<subject>/...`) and
      // storage-native paths (`<subject>/...`) so content can migrate cleanly.
      const storagePath = legacyMatch
        ? legacyMatch[1]
        : (/^[a-z0-9_-]+\/.+$/i.test(rawFile) ? rawFile : "");
      if (!storagePath) {
        reject(new Error("invalid_manifest_file_path:" + String(meta.file || "")));
        return;
      }
      sb.storage
        .from("study-materials")
        .download(storagePath)
        .then(({ data, error }) => {
          if (error || !data) {
            reject(new Error("storage download failed for " + storagePath));
            return;
          }
          const blobUrl = URL.createObjectURL(data);
          var sidFromPath = storagePath.split("/")[0] || "";
          attachAndWait(blobUrl, true, sidFromPath);
        })
        .catch((e) => {
          reject(e instanceof Error ? e : new Error(String(e)));
        });
    });
    return loadScriptPromises[key];
  }
