/**
 * Quiz “Why?” — calls LLM proxy, uses client cache, renders in explain modal or under confidence row.
 */
(function (global) {
  function esc(s) {
    return typeof escapeHtml === "function" ? escapeHtml(s) : String(s);
  }

  /**
   * @param {object} q
   * @param {number} chosenIndex
   * @param {{ subjectId?: string, subjectTitle?: string, topicTitle?: string, level?: string }} [meta]
   */
  function buildRequestBody(q, chosenIndex, meta) {
    meta = meta || {};
    var opts = Array.isArray(q.options) ? q.options.map(String) : [];
    var body = {
      question: String(q.question || ""),
      options: opts,
      correct_index: Number(q.correctIndex),
      chosen_index: Number(chosenIndex),
      canonical_hint: q.explanation ? String(q.explanation).slice(0, 2000) : null,
      subject_id: meta.subjectId ? String(meta.subjectId).slice(0, 64) : null,
      subject_title: meta.subjectTitle ? String(meta.subjectTitle).slice(0, 200) : null,
      topic_title: meta.topicTitle ? String(meta.topicTitle).slice(0, 300) : null,
      level: meta.level ? String(meta.level).slice(0, 80) : null,
    };
    return body;
  }

  /**
   * @param {boolean} answerWasCorrect — drives headings; same JSON is cached for both outcomes.
   */
  function renderParsedInto(el, parsed, answerWasCorrect) {
    if (!el) return;
    var parts = [];
    if (parsed.wrong_choice_explained) {
      var hWrong = answerWasCorrect
        ? "Why this answer works"
        : "Why your answer is wrong";
      parts.push(
        "<p><strong>" +
          esc(hWrong) +
          "</strong> — " +
          esc(String(parsed.wrong_choice_explained)) +
          "</p>"
      );
    }
    if (parsed.correct_logic) {
      var hLogic = answerWasCorrect ? "Key ideas to remember" : "Correct reasoning";
      parts.push(
        "<p><strong>" + esc(hLogic) + "</strong> — " + esc(String(parsed.correct_logic)) + "</p>"
      );
    }
    if (parsed.examiners_phrase) {
      parts.push(
        "<p class='explain-llm-phrase'><strong>Exam-style wording</strong> — " +
          esc(String(parsed.examiners_phrase)) +
          "</p>"
      );
    }
    if (parsed.try_again_question) {
      var hCheck = answerWasCorrect ? "Stretch question" : "Check yourself";
      parts.push(
        "<p><strong>" + esc(hCheck) + "</strong> — " + esc(String(parsed.try_again_question)) + "</p>"
      );
    }
    if (!parts.length) {
      parts.push("<p class='hint'>No structured fields returned; see raw text below if shown.</p>");
    }
    el.innerHTML = parts.join("");
  }

  function renderApiPayloadInto(el, data, answerWasCorrect) {
    if (!el || !data) return;
    var ac = !!answerWasCorrect;
    if (data.parsed && typeof data.parsed === "object") {
      renderParsedInto(el, data.parsed, ac);
      return;
    }
    if (data.parse_error && data.raw_content) {
      el.innerHTML =
        "<p class='hint'>Model did not return valid JSON.</p><pre class='explain-llm-raw'>" +
        esc(String(data.raw_content)) +
        "</pre>";
      return;
    }
    if (data.raw_content) {
      el.innerHTML = "<pre class='explain-llm-raw'>" + esc(String(data.raw_content)) + "</pre>";
      return;
    }
    el.textContent = "Empty response.";
  }

  function runFetch(q, topicId, chosenIndex, meta, onResult) {
    var cfg = global.LevelupLlmConfig.getClientConfig();
    var fullCfg = global.LevelupLlmConfig.get();
    if (!cfg || !global.LevelupLlmConfig.isQuizExplainEnabled()) {
      onResult({ ok: false, message: "LLM is not configured." });
      return;
    }
    meta = meta || {};
    var key = global.LevelupLlmQuizCache.makeQuizKey(
      q,
      topicId,
      q.correctIndex,
      chosenIndex,
      global.LevelupLlmConfig.getContentVersion(),
      meta.subjectId
    );
    var answerWasCorrect = Number(q.correctIndex) === Number(chosenIndex);
    var cached = global.LevelupLlmQuizCache.get(fullCfg, key);
    if (cached) {
      onResult({
        ok: true,
        data: cached,
        fromCache: true,
        answerWasCorrect: answerWasCorrect,
      });
      return;
    }
    var body = buildRequestBody(q, chosenIndex, meta);
    global.LevelupLlmClient.quizExplain(cfg, body).then(function (res) {
      if (res.ok && res.data) {
        global.LevelupLlmQuizCache.set(fullCfg, key, res.data);
      }
      onResult(
        Object.assign(
          { fromCache: false, answerWasCorrect: answerWasCorrect },
          res,
          {
            ok: res.ok,
            data: res.data,
            message: res.message,
          }
        )
      );
    });
  }

  /**
   * @param {HTMLElement | null} wrap
   * @param {HTMLElement | null} btn
   * @param {HTMLElement | null} out
   */
  function resetExplainSlot(wrap, btn, out) {
    if (btn) {
      btn.onclick = null;
      btn.disabled = false;
      btn.textContent = "Why? (AI tutor)";
    }
    if (out) {
      out.hidden = true;
      out.innerHTML = "";
    }
    if (wrap) wrap.hidden = true;
  }

  function metaFromPayload(payload) {
    if (!payload) return {};
    return {
      subjectId: payload.subjectId,
      subjectTitle: payload.subjectTitle,
      topicTitle: payload.topicTitle,
      level: payload.level || "O-Level",
    };
  }

  /**
   * Called from showExplain when wrong/timeout feedback is shown.
   * @param {{ q: object, topicId: string, chosenIndex: number, subjectId?: string, subjectTitle?: string, topicTitle?: string, level?: string } | null} payload
   */
  function prepareExplainModal(payload) {
    var wrap = document.getElementById("explain-llm-wrap");
    var btn = document.getElementById("btn-explain-llm-why");
    var out = document.getElementById("explain-llm-body");
    resetExplainSlot(wrap, btn, out);
    if (!wrap || !btn || !out) return;
    if (
      !payload ||
      !global.LevelupLlmConfig ||
      !global.LevelupLlmConfig.isQuizExplainEnabled()
    ) {
      return;
    }
    wrap.hidden = false;
    btn.onclick = function () {
      btn.disabled = true;
      out.hidden = false;
      out.innerHTML = "<p class='hint'>Loading…</p>";
      runFetch(payload.q, payload.topicId, payload.chosenIndex, metaFromPayload(payload), function (res) {
        btn.disabled = false;
        if (!res.ok) {
          out.innerHTML =
            "<p class='explain-llm-err'>" +
            esc(res.message || "Something went wrong.") +
            "</p>";
          return;
        }
        out.innerHTML = "";
        if (res.fromCache) {
          var pc = document.createElement("p");
          pc.className = "hint explain-llm-cache";
          pc.textContent = "From cache";
          out.appendChild(pc);
        }
        var innerBox = document.createElement("div");
        out.appendChild(innerBox);
        renderApiPayloadInto(innerBox, res.data, !!res.answerWasCorrect);
      });
    };
  }

  /**
   * After a correct answer, optional “Why?” under confidence strip.
   * @param {object} q
   * @param {object} t — topic record (title, id)
   * @param {number} chosenIndex
   */
  function attachBelowConfidence(q, t, chosenIndex) {
    var topicId = t && t.id != null ? String(t.id) : "";
    var host = document.getElementById("quiz-confidence");
    if (!host || !global.LevelupLlmConfig || !global.LevelupLlmConfig.isQuizExplainEnabled()) return;
    var old = host.querySelector(".quiz-llm-why-row");
    if (old) old.remove();
    var row = document.createElement("div");
    row.className = "quiz-llm-why-row";
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn quiz-llm-why-btn";
    b.textContent = "Why? (AI tutor)";
    var out = document.createElement("div");
    out.className = "explain-llm-body quiz-llm-why-out";
    out.hidden = true;
    row.appendChild(b);
    row.appendChild(out);
    host.appendChild(row);
    var meta = {
      subjectId: typeof SUBJECT_ID !== "undefined" ? SUBJECT_ID : global.SUBJECT_ID,
      subjectTitle: typeof SUBJECT_TITLE !== "undefined" ? SUBJECT_TITLE : global.SUBJECT_TITLE,
      topicTitle: t && t.title ? String(t.title) : "",
      level: "O-Level",
    };
    b.onclick = function () {
      b.disabled = true;
      out.hidden = false;
      out.innerHTML = "<p class='hint'>Loading…</p>";
      runFetch(q, topicId, chosenIndex, meta, function (res) {
        b.disabled = false;
        if (!res.ok) {
          out.innerHTML =
            "<p class='explain-llm-err'>" + esc(res.message || "Something went wrong.") + "</p>";
          return;
        }
        out.innerHTML = "";
        if (res.fromCache) {
          var p2 = document.createElement("p");
          p2.className = "hint explain-llm-cache";
          p2.textContent = "From cache";
          out.appendChild(p2);
        }
        var box2 = document.createElement("div");
        out.appendChild(box2);
        renderApiPayloadInto(box2, res.data, !!res.answerWasCorrect);
      });
    };
  }

  global.LevelupLlmQuizWhy = {
    prepareExplainModal: prepareExplainModal,
    attachBelowConfidence: attachBelowConfidence,
    _resetExplainSlotForTests: resetExplainSlot,
  };
})(window);
