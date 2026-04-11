/**
 * HTTP client for LevelUp FastAPI LLM proxy (Bearer app token only).
 */
(function (global) {
  /**
   * @param {{ proxyBaseUrl: string, appToken: string }} cfg
   * @param {{ question: string, options: string[], correct_index: number, chosen_index: number, canonical_hint?: string|null }} body
   * @param {{ timeoutMs?: number }} [opt]
   * @returns {Promise<{ ok: boolean, code?: string, message?: string, data?: object, detail?: object }>}
   */
  function quizExplain(cfg, body, opt) {
    opt = opt || {};
    if (!cfg || !cfg.proxyBaseUrl || !cfg.appToken) {
      return Promise.resolve({
        ok: false,
        code: "no_config",
        message: "LLM proxy is not configured.",
      });
    }
    var url = cfg.proxyBaseUrl.replace(/\/+$/, "") + "/llm/quiz-explain";
    var ctrl = new AbortController();
    var ms = typeof opt.timeoutMs === "number" ? opt.timeoutMs : 65000;
    var tid = global.setTimeout(function () {
      ctrl.abort();
    }, ms);

    return global
      .fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cfg.appToken,
        },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      })
      .then(function (res) {
        global.clearTimeout(tid);
        return res.text().then(function (text) {
          var data = null;
          if (text) {
            try {
              data = JSON.parse(text);
            } catch (e) {
              /* ignore */
            }
          }
          if (res.status === 401) {
            return {
              ok: false,
              code: "unauthorized",
              message:
                "The app token was rejected (401). Check Settings → LLM proxy: it must match APP_TOKEN on your server.",
              detail: data,
            };
          }
          if (res.status === 429) {
            var dm429 = data && data.detail;
            var msg429 =
              "Too many requests (429). Try again in a moment.";
            if (dm429 && typeof dm429 === "object" && dm429.message) {
              msg429 = String(dm429.message);
            } else if (typeof dm429 === "string") {
              msg429 = dm429;
            }
            if (dm429 && typeof dm429 === "object" && dm429.retry_after) {
              msg429 += " (retry after: " + String(dm429.retry_after) + ")";
            }
            return {
              ok: false,
              code: "rate_limit",
              message: msg429,
              detail: data,
            };
          }
          if (!res.ok) {
            var detailMsg = data && data.detail;
            if (typeof detailMsg === "string") {
              /* ok */
            } else if (Array.isArray(detailMsg) && detailMsg[0] && detailMsg[0].msg) {
              detailMsg = detailMsg.map(function (x) {
                return x.msg;
              }).join("; ");
            } else {
              detailMsg = text || res.statusText;
            }
            return {
              ok: false,
              code: "http_" + res.status,
              message: detailMsg || "Request failed.",
              detail: data,
            };
          }
          return { ok: true, data: data };
        });
      })
      .catch(function (e) {
        global.clearTimeout(tid);
        if (e && e.name === "AbortError") {
          return { ok: false, code: "timeout", message: "Request timed out." };
        }
        return {
          ok: false,
          code: "network",
          message: (e && e.message) || "Network error.",
        };
      });
  }

  global.LevelupLlmClient = {
    quizExplain: quizExplain,
  };
})(window);
