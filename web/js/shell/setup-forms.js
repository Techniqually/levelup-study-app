/**
 * Setup package UI and helpers (Base64/JSON: Supabase, LLM, student).
 * Parent dashboard codes stay on the parent page; `apply` still accepts legacy `parent` in pasted JSON.
 * Used by hub-setup.js, subject-config chain, parent dashboard. No dependencies.
 */
(function (global) {
  var STYLE_ID = "levelup-setup-forms-style";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = document.createElement("style");
    css.id = STYLE_ID;
    css.textContent =
      "#levelup-setup-overlay{position:fixed;inset:0;z-index:99999;background:rgba(5,7,22,.88);" +
      "display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,sans-serif}" +
      "#levelup-setup-overlay .lu-panel{width:min(420px,100%);background:#141820;border:1px solid #2a3344;" +
      "border-radius:14px;padding:20px 20px 16px;color:#e8ecf4;box-shadow:0 24px 48px rgba(0,0,0,.45)}" +
      "#levelup-setup-overlay h2{margin:0 0 8px;font-size:1.15rem;font-weight:700;color:#5eead4}" +
      "#levelup-setup-overlay p.lu-lead{margin:0 0 16px;font-size:.88rem;color:#8b95a8;line-height:1.45}" +
      "#levelup-setup-overlay label{display:block;font-size:.78rem;color:#8b95a8;margin-bottom:4px}" +
      "#levelup-setup-overlay input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;" +
      "border:1px solid #2a3344;background:#0c0e12;color:#e8ecf4;font-size:.9rem;margin-bottom:12px}" +
      "#levelup-setup-overlay input:focus{outline:2px solid rgba(94,234,212,.35);border-color:#5eead4}" +
      "#levelup-setup-overlay .lu-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:8px}" +
      "#levelup-setup-overlay button{font:inherit;cursor:pointer;border-radius:10px;padding:9px 14px;border:1px solid #2a3344;" +
      "background:#1c222d;color:#e8ecf4}" +
      "#levelup-setup-overlay button.lu-primary{border-color:#5eead4;color:#5eead4;background:#0f172a}" +
      "#levelup-setup-overlay button.lu-ghost{background:transparent;color:#8b95a8}" +
      "#levelup-setup-overlay .lu-err{color:#f87171;font-size:.82rem;margin:-4px 0 8px}";
    document.head.appendChild(css);
  }

  function closeOverlay(root) {
    if (root && root.parentNode) root.parentNode.removeChild(root);
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Unified config package (Base64 JSON) for easy parent/student setup
  // ────────────────────────────────────────────────────────────────────────────
  var CONFIG_PACKAGE_VERSION = 2;
  var PARENT_PROJECT_KEY = "LEVELUP_PARENT_PROJECT_CODE";
  var PARENT_CODE_KEY = "LEVELUP_PARENT_CODE";
  var PARENT_REMEMBER_KEY = "LEVELUP_PARENT_REMEMBER_CODE";
  var SUPABASE_SETUP_SKIPPED_KEY = "SUPABASE_SETUP_SKIPPED_V1";

  /**
   * Prefer localStorage; fall back to window/globals (subject: subject-config + app.js may set
   * STUDENT_ID / STUDENT_NAME without persisting when using built-in defaults).
   */
  function effectiveSupabaseUrl() {
    var v = (localStorage.getItem("SUPABASE_URL") || "").trim();
    if (v) return v;
    return String(global.SUPABASE_URL || "").trim();
  }

  function effectiveSupabaseAnon() {
    var v = (localStorage.getItem("SUPABASE_ANON_KEY") || "").trim();
    if (v) return v;
    return String(global.SUPABASE_ANON_KEY || "").trim();
  }

  function effectiveStudentId() {
    var v = (localStorage.getItem("LEVELUP_STUDENT_ID") || "").trim();
    if (v) return v;
    v = String(global.LEVELUP_STUDENT_ID || "").trim();
    if (v) return v;
    if (typeof global.STUDENT_ID !== "undefined" && global.STUDENT_ID != null) {
      return String(global.STUDENT_ID).trim();
    }
    return "";
  }

  function effectiveStudentName() {
    var v = (localStorage.getItem("LEVELUP_STUDENT_NAME") || "").trim();
    if (v) return v;
    v = String(global.LEVELUP_STUDENT_NAME || "").trim();
    if (v) return v;
    if (typeof global.STUDENT_NAME !== "undefined" && global.STUDENT_NAME != null) {
      return String(global.STUDENT_NAME).trim();
    }
    return "";
  }

  /** Same rule as hub: Supabase URL+anon OR explicit offline skip, plus student id and display name. */
  function isClientSetupComplete() {
    try {
      var url = effectiveSupabaseUrl();
      var anon = effectiveSupabaseAnon();
      var skipped = localStorage.getItem(SUPABASE_SETUP_SKIPPED_KEY) === "1";
      var syncOk = !!(url && anon) || skipped;
      var sid = effectiveStudentId();
      var sname = effectiveStudentName();
      return syncOk && !!sid && !!sname;
    } catch (_) {
      return false;
    }
  }

  /** Human-readable list of what still blocks subject access (hub / subject gate). */
  function describeClientSetupGaps() {
    var gaps = [];
    try {
      var url = effectiveSupabaseUrl();
      var anon = effectiveSupabaseAnon();
      var skipped = localStorage.getItem(SUPABASE_SETUP_SKIPPED_KEY) === "1";
      if (!((url && anon) || skipped)) {
        gaps.push("Supabase project URL + anon key (or tap Offline defaults to skip cloud)");
      }
      var sid = effectiveStudentId();
      var sname = effectiveStudentName();
      if (!sid || !sname) {
        gaps.push("student ID and display name (or Offline defaults)");
      }
    } catch (_) {}
    return gaps;
  }

  function toBase64Utf8(str) {
    try {
      return btoa(unescape(encodeURIComponent(String(str || ""))));
    } catch (_) {
      return "";
    }
  }

  function fromBase64Utf8(b64) {
    try {
      return decodeURIComponent(escape(atob(String(b64 || ""))));
    } catch (_) {
      return "";
    }
  }

  function toBase64Url(b64) {
    return String(b64 || "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  function fromBase64Url(s) {
    var n = String(s || "")
      .trim()
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    var pad = n.length % 4;
    if (pad) n += "====".slice(pad);
    return n;
  }

  function normalizeLlmPayload(raw) {
    var o = raw && typeof raw === "object" ? raw : {};
    if (global.LevelupLlmConfig && typeof global.LevelupLlmConfig.defaultConfig === "function") {
      return global.LevelupLlmConfig.defaultConfig(o);
    }
    return {
      v: 2,
      enabled: o.enabled !== false,
      mode: o.mode || "fastapi",
      proxyBaseUrl: String(o.proxyBaseUrl || "").trim().replace(/\/+$/g, ""),
      features: {
        quizExplain: !(o.features && o.features.quizExplain === false),
      },
      cache: {
        maxEntries:
          o.cache && typeof o.cache.maxEntries === "number" && o.cache.maxEntries > 0
            ? o.cache.maxEntries
            : 200,
        ttlDays:
          o.cache && typeof o.cache.ttlDays === "number" && o.cache.ttlDays > 0
            ? o.cache.ttlDays
            : 60,
      },
    };
  }

  function readCurrentConfigPayload() {
    var payload = {
      v: CONFIG_PACKAGE_VERSION,
    };
    var sbUrl = effectiveSupabaseUrl();
    var sbAnon = effectiveSupabaseAnon();
    var sid = effectiveStudentId();
    var sname = effectiveStudentName();
    if (sbUrl) payload.SUPABASE_URL = sbUrl;
    if (sbAnon) payload.SUPABASE_ANON_KEY = sbAnon;
    if (sid) payload.LEVELUP_STUDENT_ID = sid;
    if (sname) payload.LEVELUP_STUDENT_NAME = sname;

    var llmCfg = null;
    if (global.LevelupLlmConfig && typeof global.LevelupLlmConfig.get === "function") {
      llmCfg = global.LevelupLlmConfig.get();
    } else {
      try {
        llmCfg = JSON.parse(localStorage.getItem("LEVELUP_LLM_CONFIG_JSON") || "null");
      } catch (_) {
        llmCfg = null;
      }
    }
    if (llmCfg && typeof llmCfg === "object") payload.llm = llmCfg;

    return payload;
  }

  /**
   * Full package shape for editing: every known key is present; missing localStorage values are "" / defaults.
   */
  function readSetupPackageTemplatePayload() {
    var sbUrl = effectiveSupabaseUrl();
    var sbAnon = effectiveSupabaseAnon();
    var sid = effectiveStudentId();
    var sname = effectiveStudentName();

    var llmCfg = null;
    if (global.LevelupLlmConfig && typeof global.LevelupLlmConfig.get === "function") {
      llmCfg = global.LevelupLlmConfig.get();
    } else {
      try {
        llmCfg = JSON.parse(localStorage.getItem("LEVELUP_LLM_CONFIG_JSON") || "null");
      } catch (_) {
        llmCfg = null;
      }
    }
    var llmMerged = normalizeLlmPayload(llmCfg && typeof llmCfg === "object" ? llmCfg : {});

    return {
      v: CONFIG_PACKAGE_VERSION,
      SUPABASE_URL: sbUrl,
      SUPABASE_ANON_KEY: sbAnon,
      LEVELUP_STUDENT_ID: sid,
      LEVELUP_STUDENT_NAME: sname,
      llm: llmMerged,
    };
  }

  function encodeConfigPayload(payloadObj) {
    var json = JSON.stringify(payloadObj);
    return toBase64Url(toBase64Utf8(json));
  }

  function parseConfigPackage(input) {
    var raw = String(input || "").trim();
    if (!raw) return { ok: false, error: "Paste a package string or JSON first." };

    var obj = null;
    if (raw[0] === "{") {
      try {
        obj = JSON.parse(raw);
      } catch (_) {
        return { ok: false, error: "Invalid JSON." };
      }
    } else {
      var json = fromBase64Utf8(fromBase64Url(raw));
      if (!json) return { ok: false, error: "Invalid Base64 package string." };
      try {
        obj = JSON.parse(json);
      } catch (_) {
        return { ok: false, error: "Decoded package is not valid JSON." };
      }
    }
    if (!obj || typeof obj !== "object") {
      return { ok: false, error: "Package must decode to an object." };
    }
    return { ok: true, value: obj };
  }

  function applyConfigPayload(obj) {
    var applied = [];
    var o = obj && typeof obj === "object" ? obj : {};

    var sbUrl = String(o.SUPABASE_URL || "").trim();
    var sbAnon = String(o.SUPABASE_ANON_KEY || "").trim();
    if (sbUrl) {
      localStorage.setItem("SUPABASE_URL", sbUrl);
      applied.push("SUPABASE_URL");
    }
    if (sbAnon) {
      localStorage.setItem("SUPABASE_ANON_KEY", sbAnon);
      applied.push("SUPABASE_ANON_KEY");
    }

    var sid = String(o.LEVELUP_STUDENT_ID || "").trim();
    var sname = String(o.LEVELUP_STUDENT_NAME || "").trim();
    if (sid) {
      localStorage.setItem("LEVELUP_STUDENT_ID", sid);
      applied.push("LEVELUP_STUDENT_ID");
    }
    if (sname) {
      localStorage.setItem("LEVELUP_STUDENT_NAME", sname);
      applied.push("LEVELUP_STUDENT_NAME");
    }

    // Accept both llm and fastapi aliases for compatibility.
    var llmRaw = null;
    if (o.llm && typeof o.llm === "object") llmRaw = o.llm;
    if (!llmRaw && o.fastapi && typeof o.fastapi === "object") llmRaw = o.fastapi;
    if (llmRaw) {
      var normalizedLlm = normalizeLlmPayload(llmRaw);
      var proxyU = String(normalizedLlm.proxyBaseUrl || "").trim();
      var llmOff = normalizedLlm.enabled === false;
      // Avoid saving a hollow enabled:true stub from an unfilled template.
      if (llmOff || proxyU) {
        localStorage.setItem("LEVELUP_LLM_CONFIG_JSON", JSON.stringify(normalizedLlm));
        applied.push("LEVELUP_LLM_CONFIG_JSON");
      }
    }

    // Legacy: older packages included parent.*; parent UI still collects codes separately.
    var p = o.parent && typeof o.parent === "object" ? o.parent : null;
    if (p) {
      var pProject = String(p.projectCode || "").trim();
      var pCode = String(p.parentCode || "").trim();
      if (pProject) {
        localStorage.setItem(PARENT_PROJECT_KEY, pProject);
        applied.push(PARENT_PROJECT_KEY);
      }
      if (pCode) {
        localStorage.setItem(PARENT_CODE_KEY, pCode);
        applied.push(PARENT_CODE_KEY);
      }
      if (typeof p.rememberCode === "boolean") {
        localStorage.setItem(PARENT_REMEMBER_KEY, p.rememberCode ? "1" : "0");
        applied.push(PARENT_REMEMBER_KEY);
      }
    }

    if (sbUrl || sbAnon) {
      localStorage.removeItem(SUPABASE_SETUP_SKIPPED_KEY);
    }

    return applied;
  }

  /**
   * Small encode/decode/apply UI for setup package.
   * @returns {Promise<{ action: 'save'|'cancel', applied?: string[] }>}
   */
  function openConfigPackageSetup() {
    return new Promise(function (resolve) {
      injectStyles();
      var overlay = document.createElement("div");
      overlay.id = "levelup-setup-overlay";

      function done(result) {
        closeOverlay(overlay);
        resolve(result || { action: "cancel" });
      }

      overlay.innerHTML =
        "<div class='lu-panel' style='width:min(700px,100%)'>" +
        "<h2>Setup package (copy/paste)</h2>" +
        "<p class='lu-lead'>Use one Base64 package string for Supabase, optional LLM proxy, and optional student fields. Parent dashboard still uses project/parent codes on <code>parent.html</code>. This is convenience, not encryption. " +
        "<strong>Generate</strong> fills both fields from this browser. Edit the JSON, then <strong>Encode JSON → Base64</strong> to refresh the one-line package for the student (two-way). " +
        "<strong>Decode</strong> fills JSON from the string. <strong>Apply</strong> saves from either field and updates both when successful. " +
        "Subjects unlock only after Supabase (or offline skip) <em>and</em> student ID + name — or hub Offline defaults. " +
        "<code>llm</code> is stored only if proxy URL is set, or <code>\"enabled\": false</code>. " +
        "Legacy <code>parent</code> in JSON is still applied.</p>" +
        "<label for='lu-pkg-str'>Package string (Base64 URL-safe) or raw JSON</label>" +
        "<textarea id='lu-pkg-str' rows='4' style='width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid #2a3344;background:#0c0e12;color:#e8ecf4;font-size:.88rem;margin-bottom:8px;resize:vertical'></textarea>" +
        "<div class='lu-actions' style='justify-content:flex-start;margin:0 0 8px 0'>" +
        "<button type='button' id='lu-pkg-generate' class='lu-primary'>Generate from current settings</button>" +
        "<button type='button' id='lu-pkg-decode'>Decode → JSON</button>" +
        "<button type='button' id='lu-pkg-encode'>Encode JSON → Base64</button>" +
        "<button type='button' id='lu-pkg-apply'>Apply package</button>" +
        "</div>" +
        "<label for='lu-pkg-json'>Decoded JSON preview</label>" +
        "<textarea id='lu-pkg-json' rows='9' style='width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid #2a3344;background:#0c0e12;color:#e8ecf4;font-size:.86rem;margin-bottom:8px;resize:vertical'></textarea>" +
        "<div class='lu-err' id='lu-pkg-err' hidden></div>" +
        "<div class='lu-actions'>" +
        "<button type='button' class='lu-ghost' id='lu-pkg-cancel'>Close</button>" +
        "</div></div>";

      var strEl = overlay.querySelector("#lu-pkg-str");
      var jsonEl = overlay.querySelector("#lu-pkg-json");
      var errEl = overlay.querySelector("#lu-pkg-err");

      function setErr(msg) {
        errEl.textContent = msg || "";
        errEl.hidden = !msg;
      }

      function encodeJsonEditorToString() {
        var raw = (jsonEl.value || "").trim();
        if (!raw) {
          setErr("JSON preview is empty — paste or edit JSON first.");
          return;
        }
        var obj;
        try {
          obj = JSON.parse(raw);
        } catch (e) {
          setErr("Invalid JSON: " + ((e && e.message) || String(e)));
          return;
        }
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
          setErr("JSON must be a single object (not an array).");
          return;
        }
        strEl.value = encodeConfigPayload(obj);
        jsonEl.value = JSON.stringify(obj, null, 2);
        setErr("");
      }

      overlay.querySelector("#lu-pkg-generate").onclick = function () {
        var payload = readSetupPackageTemplatePayload();
        jsonEl.value = JSON.stringify(payload, null, 2);
        strEl.value = encodeConfigPayload(payload);
        setErr("");
      };

      overlay.querySelector("#lu-pkg-decode").onclick = function () {
        var parsed = parseConfigPackage(strEl.value || jsonEl.value || "");
        if (!parsed.ok) {
          setErr(parsed.error);
          return;
        }
        jsonEl.value = JSON.stringify(parsed.value, null, 2);
        strEl.value = encodeConfigPayload(parsed.value);
        setErr("");
      };

      overlay.querySelector("#lu-pkg-encode").onclick = function () {
        encodeJsonEditorToString();
      };

      overlay.querySelector("#lu-pkg-apply").onclick = function () {
        var parsed = parseConfigPackage(strEl.value || jsonEl.value || "");
        if (!parsed.ok) {
          setErr(parsed.error);
          return;
        }
        jsonEl.value = JSON.stringify(parsed.value, null, 2);
        strEl.value = encodeConfigPayload(parsed.value);
        var applied = applyConfigPayload(parsed.value);
        if (!applied.length) {
          setErr(
            "No keys applied. Add Supabase URL+anon and/or student fields, or llm with proxy URL (or enabled:false), or legacy parent fields."
          );
          return;
        }
        if (global.LevelupLlmKeepalive && typeof global.LevelupLlmKeepalive.start === "function") {
          global.LevelupLlmKeepalive.start();
        }
        if (global.LevelupLlmKeepalive && typeof global.LevelupLlmKeepalive.poke === "function") {
          global.LevelupLlmKeepalive.poke("config_package_apply", true);
        }
        done({ action: "save", applied: applied });
      };

      overlay.querySelector("#lu-pkg-cancel").onclick = function () {
        done({ action: "cancel" });
      };

      document.body.appendChild(overlay);
    });
  }

  global.LevelupSetupForms = {
    openConfigPackageSetup: openConfigPackageSetup,
    isClientSetupComplete: isClientSetupComplete,
    describeClientSetupGaps: describeClientSetupGaps,
    // Exposed for tests and non-UI utility use.
    encodeConfigPayload: encodeConfigPayload,
    parseConfigPackage: parseConfigPackage,
    applyConfigPayload: applyConfigPayload,
    readCurrentConfigPayload: readCurrentConfigPayload,
    readSetupPackageTemplatePayload: readSetupPackageTemplatePayload,
  };
})(window);
