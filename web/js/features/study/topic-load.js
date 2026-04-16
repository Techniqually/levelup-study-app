
function loadTopicScript(id) {
    if (window.__topicRegistry[id]) {
      return Promise.resolve(window.__topicRegistry[id]);
    }
    const meta = manifest.find((m) => m.id === id);
    if (!meta) return Promise.reject(new Error("unknown topic"));
    const key = meta.file;
    if (loadScriptPromises[key]) {
      return loadScriptPromises[key];
    }
    loadScriptPromises[key] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      const sep = meta.file.includes("?") ? "&" : "?";
      const localSrc = meta.file + sep + "v=" + encodeURIComponent(APP_VERSION);
      const useRemoteStorage =
        String(window.SUBJECT_ID || "").toLowerCase() === "chemistry" &&
        window.LevelupAuth &&
        typeof window.LevelupAuth.getClient === "function";

      function attachAndWait(src, revokeAfterLoad) {
        s.src = src;
        s.async = true;
        s.onload = () => {
          if (revokeAfterLoad) URL.revokeObjectURL(src);
          const t = window.__topicRegistry[id];
          if (t) resolve(t);
          else reject(new Error("register failed"));
        };
        s.onerror = () => {
          if (revokeAfterLoad) URL.revokeObjectURL(src);
          reject(new Error("load " + key));
        };
        document.head.appendChild(s);
      }

      if (!useRemoteStorage) {
        attachAndWait(localSrc, false);
        return;
      }

      const sb = window.LevelupAuth.getClient();
      if (!sb || !sb.storage || !sb.storage.from) {
        attachAndWait(localSrc, false);
        return;
      }
      const match = String(meta.file || "").match(/^data\/subjects\/(.+)$/);
      const storagePath = match ? match[1] : "";
      if (!storagePath) {
        attachAndWait(localSrc, false);
        return;
      }
      sb.storage
        .from("study-materials")
        .download(storagePath)
        .then(({ data, error }) => {
          if (error || !data) {
            // Localhost fallback keeps dev usable until storage assets are uploaded.
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
              attachAndWait(localSrc, false);
              return;
            }
            reject(new Error("storage download failed for " + storagePath));
            return;
          }
          const blobUrl = URL.createObjectURL(data);
          attachAndWait(blobUrl, true);
        })
        .catch((e) => {
          reject(e instanceof Error ? e : new Error(String(e)));
        });
    });
    return loadScriptPromises[key];
  }
