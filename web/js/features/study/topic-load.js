
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

      if (!window.LevelupAuth || typeof window.LevelupAuth.getClient !== "function") {
        reject(new Error("storage_client_missing"));
        return;
      }
      const sb = window.LevelupAuth.getClient();
      if (!sb || !sb.storage || !sb.storage.from) {
        reject(new Error("storage_client_unavailable"));
        return;
      }
      const match = String(meta.file || "").match(/^data\/subjects\/(.+)$/);
      const storagePath = match ? match[1] : "";
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
          attachAndWait(blobUrl, true);
        })
        .catch((e) => {
          reject(e instanceof Error ? e : new Error(String(e)));
        });
    });
    return loadScriptPromises[key];
  }
