
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
      s.src = meta.file + sep + "v=" + encodeURIComponent(APP_VERSION);
      s.async = true;
      s.onload = () => {
        const t = window.__topicRegistry[id];
        if (t) resolve(t);
        else reject(new Error("register failed"));
      };
      s.onerror = () => reject(new Error("load " + key));
      document.head.appendChild(s);
    });
    return loadScriptPromises[key];
  }
