(function () {
  /** Minimum typed characters before "Show model answer" is enabled. */
  var EXTENDED_MIN_CHARS_FOR_MODEL_DEFAULT = 40;

  var WRITTEN_STOP = (function () {
    var s =
      "the a an and or but if to of in on for as at by from with into onto over per via we us it is am are was were be been being has have had do does did will would could should may might must can cannot not no yes so than then that this these those there they them their one two any all each few more most other such only just also very what which who whom whose when where why how about above after again against along among around before below beneath beside between beyond during except inside near off out outside through under until unto upon within without";
    var o = {};
    s.split(/\s+/).forEach(function (w) {
      o[w] = 1;
    });
    return o;
  })();

  function extendedList(t) {
    var local = t && Array.isArray(t.extendedQuestions) ? t.extendedQuestions : [];
    var byTopic = window.SUBJECT_WRITTEN_QUESTIONS_BY_TOPIC || {};
    var extra = byTopic[String((t && t.id) || "")] || [];
    if (!local.length) return Array.isArray(extra) ? extra.slice() : [];
    if (!Array.isArray(extra) || !extra.length) return local;
    var seen = {};
    var merged = [];
    local.concat(extra).forEach(function (item) {
      if (!item || typeof item !== "object") return;
      var id = String(item.id || "");
      if (id && seen[id]) return;
      if (id) seen[id] = 1;
      merged.push(item);
    });
    return merged;
  }

  function stepStorageKey(topicId) {
    return "levelup_written_i_" + String(SUBJECT_ID || "sub") + "_" + String(topicId || "");
  }

  function getWrittenClaimDay(topicId, qid) {
    var tid = String(topicId || "");
    var q = String(qid || "");
    if (!state.writtenClaims || !state.writtenClaims[tid]) return "";
    return String(state.writtenClaims[tid][q] || "");
  }

  function claimedWrittenToday(topicId, qid) {
    return getWrittenClaimDay(topicId, qid) === todayKey();
  }

  function markWrittenClaimed(topicId, qid) {
    state.writtenClaims = state.writtenClaims || {};
    var tid = String(topicId || "");
    state.writtenClaims[tid] = state.writtenClaims[tid] || {};
    state.writtenClaims[tid][String(qid || "")] = todayKey();
    saveState();
  }

  function writtenXpForQuestion(q) {
    var marks = Number((q && q.marks) || 0);
    if (isNaN(marks) || marks < 0) marks = 0;
    var bonus = Math.min(WRITTEN_XP_MARK_CAP, Math.round(marks * WRITTEN_XP_PER_MARK));
    return WRITTEN_XP_BASE + bonus;
  }

  function maxSameCharRun(s) {
    var t = String(s || "").replace(/\s/g, "");
    if (!t.length) return 0;
    var best = 1;
    var run = 1;
    for (var i = 1; i < t.length; i++) {
      if (t.charAt(i) === t.charAt(i - 1)) {
        run++;
        if (run > best) best = run;
      } else {
        run = 1;
      }
    }
    return best;
  }

  function tokenizeWords(text) {
    return String(text || "")
      .trim()
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter(Boolean);
  }

  /**
   * Heuristic quality gate for XP (not syllabus marking).
   * @returns {{ ok: boolean, code: string, detail?: string }}
   */
  function evaluateWrittenQuality(text, dwellMs) {
    var t = String(text || "").trim();
    if (t.length < WRITTEN_CLAIM_MIN_CHARS) {
      return { ok: false, code: "short", detail: "Need at least " + WRITTEN_CLAIM_MIN_CHARS + " characters." };
    }
    var words = t.split(/\s+/).filter(Boolean);
    if (words.length < WRITTEN_CLAIM_MIN_WORDS) {
      return { ok: false, code: "few_words", detail: "Need at least " + WRITTEN_CLAIM_MIN_WORDS + " words." };
    }
    if (Number(dwellMs || 0) < WRITTEN_CLAIM_MIN_DWELL_MS) {
      return {
        ok: false,
        code: "dwell",
        detail: "Spend at least " + Math.ceil(WRITTEN_CLAIM_MIN_DWELL_MS / 1000) + "s drafting (from first keystroke).",
      };
    }
    if (maxSameCharRun(t) > WRITTEN_CLAIM_MAX_CHAR_RUN) {
      return { ok: false, code: "repeat_run", detail: "Too many repeated characters in a row." };
    }
    var toks = tokenizeWords(t);
    if (toks.length < WRITTEN_CLAIM_MIN_WORDS) {
      return { ok: false, code: "tokens", detail: "Add more real words." };
    }
    var uniq = {};
    toks.forEach(function (w) {
      uniq[w] = 1;
    });
    var ucount = Object.keys(uniq).length;
    if (ucount < WRITTEN_CLAIM_MIN_UNIQUE) {
      return { ok: false, code: "unique", detail: "Use more varied vocabulary (" + ucount + " unique words)." };
    }
    var div = ucount / toks.length;
    if (div < WRITTEN_CLAIM_MIN_DIVERSITY) {
      return { ok: false, code: "diversity", detail: "Too many repeats — expand with different terms." };
    }
    var longContent = 0;
    toks.forEach(function (w) {
      if (w.length >= 5 && !WRITTEN_STOP[w]) longContent++;
    });
    if (longContent < WRITTEN_CLAIM_MIN_LONG_WORDS) {
      return {
        ok: false,
        code: "content_words",
        detail: "Include more specific terms (longer non‑filler words).",
      };
    }
    return { ok: true, code: "ok" };
  }

  function renderRubricInner(q) {
    const rubric = q.rubric;
    if (!Array.isArray(rubric) || !rubric.length) return "";
    const items = rubric
      .map(function (line) {
        return "<li>" + renderMiniMarkdown(String(line || "")) + "</li>";
      })
      .join("");
    return (
      '<div class="extended-q-rubric">' +
      '<h4 class="extended-q-subhd">Mark scheme / key points</h4>' +
      '<ul class="extended-rubric-list mini-md">' +
      items +
      "</ul></div>"
    );
  }

  function renderOneCard(q, idx, topicId) {
    const safeId = String(q.id || "ext-" + topicId + "-" + idx).replace(/[^a-zA-Z0-9_-]/g, "_");
    const tid = String(topicId).replace(/[^a-zA-Z0-9_-]/g, "_");
    const rubricId = "extended-rubric-" + tid + "-" + idx;
    const modelId = "extended-model-" + tid + "-" + idx;
    const promptHtml = renderMiniMarkdown(q.prompt || "");
    const modelHtml = renderMiniMarkdown(q.modelAnswer || "");
    const rubricInner = renderRubricInner(q);
    const hasRubric = rubricInner.length > 0;
    const cmd = escapeHtml(q.commandWord || "Answer");
    const marks = q.marks != null && q.marks !== "" ? Number(q.marks) : null;
    const marksBadge =
      marks != null && !isNaN(marks)
        ? '<span class="extended-q-marks">' + escapeHtml(String(marks)) + " mark" + (marks === 1 ? "" : "s") + "</span>"
        : "";
    const syllabusNote = q.syllabusNote
      ? '<p class="extended-q-syllabus hint">' + escapeHtml(String(q.syllabusNote)) + "</p>"
      : "";
    const minModel =
      q.minCharsForModel != null && Number(q.minCharsForModel) > 0
        ? Number(q.minCharsForModel)
        : EXTENDED_MIN_CHARS_FOR_MODEL_DEFAULT;

    const rubricBtn = hasRubric
      ? '<button type="button" class="btn extended-q-rubric-btn" aria-expanded="false" data-rubric-target="' +
        escapeHtml(rubricId) +
        '">Show mark scheme</button>'
      : "";

    return (
      '<article class="extended-q-card" data-extended-q="' +
      escapeHtml(safeId) +
      '" data-has-rubric="' +
      (hasRubric ? "1" : "0") +
      '">' +
      '<header class="extended-q-card-head">' +
      '<span class="extended-q-command">' +
      cmd +
      "</span>" +
      marksBadge +
      "</header>" +
      '<div class="extended-q-prompt">' +
      promptHtml +
      "</div>" +
      syllabusNote +
      '<label class="extended-q-label" for="extended-ta-' +
      escapeHtml(safeId) +
      '">Your answer</label>' +
      '<textarea id="extended-ta-' +
      escapeHtml(safeId) +
      '" class="extended-q-textarea" rows="8" spellcheck="true" data-min-model="' +
      String(minModel) +
      '" placeholder="Draft here first. Paste/drop blocked. Then mark scheme → model answer. XP uses quality checks, not length alone."></textarea>' +
      '<p class="extended-q-gate-hint hint" aria-live="polite"></p>' +
      '<div class="extended-q-actions">' +
      rubricBtn +
      '<button type="button" class="btn extended-q-model-btn" disabled aria-expanded="false" data-model-target="' +
      escapeHtml(modelId) +
      '">Show model answer</button>' +
      "</div>" +
      (hasRubric
        ? '<div id="' +
          escapeHtml(rubricId) +
          '" class="extended-q-rubric-wrap" hidden>' +
          rubricInner +
          "</div>"
        : "") +
      '<div id="' +
      escapeHtml(modelId) +
      '" class="extended-q-model-wrap" hidden>' +
      '<div class="extended-q-model"><h4 class="extended-q-subhd">Model answer (outline)</h4>' +
      '<div class="extended-q-model-body">' +
      modelHtml +
      "</div></div></div></article>"
    );
  }

  function renderClaimFooter(xpAmt) {
    return (
      '<div class="written-claim-panel">' +
      '<p class="written-claim-msg hint" id="written-claim-msg"></p>' +
      '<button type="button" class="btn primary" id="written-claim-btn" disabled>' +
      "Claim +" +
      escapeHtml(String(xpAmt)) +
      " XP</button>" +
      '<p class="hint written-claim-terms">Once per question per day · requires mark scheme + model viewed · ' +
      "time-on-task and word variety checks (not real marking).</p>" +
      "</div>"
    );
  }

  function attachAntiPaste(ta) {
    function blockPasteLike(e) {
      if (e.type === "paste") {
        e.preventDefault();
        return;
      }
      if (e.type === "beforeinput") {
        var it = e.inputType || "";
        if (it === "insertFromPaste" || it === "insertFromDrop") {
          e.preventDefault();
        }
      }
    }
    ta.addEventListener("paste", blockPasteLike);
    ta.addEventListener("beforeinput", blockPasteLike);
    ta.addEventListener("drop", function (e) {
      e.preventDefault();
    });
  }

  function syncModelButton(card) {
    const ta = card.querySelector(".extended-q-textarea");
    const modBtn = card.querySelector(".extended-q-model-btn");
    const gateHint = card.querySelector(".extended-q-gate-hint");
    const hasRubric = card.getAttribute("data-has-rubric") === "1";
    const rubViewed = card.getAttribute("data-ext-rubric-viewed") === "1";
    const minC = ta ? Number(ta.getAttribute("data-min-model") || EXTENDED_MIN_CHARS_FOR_MODEL_DEFAULT) : EXTENDED_MIN_CHARS_FOR_MODEL_DEFAULT;
    const n = ta && ta.value ? ta.value.trim().length : 0;
    const ok = n >= minC && (!hasRubric || rubViewed);
    if (modBtn) modBtn.disabled = !ok;
    if (!gateHint) return;
    if (ok) {
      gateHint.textContent = "";
      return;
    }
    if (hasRubric && !rubViewed) {
      gateHint.textContent =
        n >= minC
          ? "You've typed enough — click Show mark scheme once to unlock the model answer."
          : "Open the mark scheme and type at least " + minC + " characters to unlock the model answer.";
      return;
    }
    if (n < minC) {
      gateHint.textContent =
        "Type at least " + minC + " characters to unlock the model answer (" + n + " so far).";
    }
  }

  function wireOneCard(card, t, q, idx, onAnyChange) {
    const ta = card.querySelector(".extended-q-textarea");
    const rubBtn = card.querySelector(".extended-q-rubric-btn");
    const modBtn = card.querySelector(".extended-q-model-btn");
    const rubWrap = rubBtn ? document.getElementById(rubBtn.getAttribute("data-rubric-target") || "") : null;
    const modWrap = modBtn ? document.getElementById(modBtn.getAttribute("data-model-target") || "") : null;

    if (ta) {
      attachAntiPaste(ta);
      ta.addEventListener("input", function () {
        syncModelButton(card);
        if (typeof onAnyChange === "function") onAnyChange();
      });
    }

    if (rubBtn && rubWrap) {
      rubBtn.addEventListener("click", function () {
        rubWrap.hidden = !rubWrap.hidden;
        if (!rubWrap.hidden) {
          card.setAttribute("data-ext-rubric-viewed", "1");
        }
        rubBtn.setAttribute("aria-expanded", String(!rubWrap.hidden));
        rubBtn.textContent = rubWrap.hidden ? "Show mark scheme" : "Hide mark scheme";
        if (!rubWrap.hidden && typeof renderMathWhenReady === "function") {
          renderMathWhenReady(rubWrap, 0);
        }
        syncModelButton(card);
        if (typeof onAnyChange === "function") onAnyChange();
      });
    }

    if (modBtn && modWrap) {
      modBtn.addEventListener("click", function () {
        if (modBtn.disabled) return;
        modWrap.hidden = !modWrap.hidden;
        if (!modWrap.hidden) {
          card.setAttribute("data-ext-model-viewed", "1");
        }
        modBtn.setAttribute("aria-expanded", String(!modWrap.hidden));
        modBtn.textContent = modWrap.hidden ? "Show model answer" : "Hide model answer";
        if (!modWrap.hidden && typeof renderMathWhenReady === "function") {
          renderMathWhenReady(modWrap, 0);
        }
        if (typeof onAnyChange === "function") onAnyChange();
      });
    }

    syncModelButton(card);
  }

  window.LevelupExtendedQuiz = {
    /** @deprecated Quiz tab no longer embeds written block; use Written tab. */
    renderPanelHtml: function () {
      return "";
    },

    bind: function () {},

    hasQuestionsForTopic: function (t) {
      return extendedList(t).length > 0;
    },

    renderWrittenShell: function (t) {
      var list = extendedList(t);
      if (!list.length) {
        return '<div class="panel active" data-panel="written"><p class="empty-state">No written questions for this topic.</p></div>';
      }
      return (
        '<div class="panel active" data-panel="written">' +
        '<div class="written-head">' +
        '<h2 class="written-title">Written (Paper 2)</h2>' +
        '<p class="written-lede hint">One question at a time. Use <strong>Next</strong> to move on. XP is optional: claim only after you open mark scheme + model and your draft passes automated quality checks (not marking).</p>' +
        '<p class="written-progress">Question <span id="written-step-num">1</span> / <span id="written-step-total">' +
        String(list.length) +
        "</span></p></div>" +
        '<div id="written-step-root"></div>' +
        '<div class="written-nav">' +
        '<button type="button" class="btn" id="written-prev" disabled>← Previous</button>' +
        '<button type="button" class="btn primary" id="written-next">Next →</button>' +
        "</div></div>"
      );
    },

    /** Same markup as bindWritten mounts into #written-step-root (tests / tooling). */
    renderWrittenQuestionHtml: function (q, index, topicId) {
      return renderOneCard(q, Number(index) || 0, String(topicId || "topic"));
    },

    bindWritten: function (t) {
      var panel = document.querySelector('[data-panel="written"]');
      if (!panel || !extendedList(t).length) return;

      var list = extendedList(t);
      var sk = stepStorageKey(t.id);
      var mount = document.getElementById("written-step-root");
      var prev = document.getElementById("written-prev");
      var next = document.getElementById("written-next");
      var numEl = document.getElementById("written-step-num");
      var totEl = document.getElementById("written-step-total");
      if (!mount || !prev || !next) return;

      function readStep() {
        var s = sessionStorage.getItem(sk);
        var i = parseInt(s, 10);
        if (isNaN(i) || i < 0) i = 0;
        if (i >= list.length) i = list.length - 1;
        return i;
      }

      function setStepUi(i) {
        if (numEl) numEl.textContent = String(i + 1);
        if (totEl) totEl.textContent = String(list.length);
        prev.disabled = i <= 0;
        next.disabled = i >= list.length - 1;
      }

      function syncClaimUi(card, q, stepIndex) {
        var msg = document.getElementById("written-claim-msg");
        var btn = document.getElementById("written-claim-btn");
        if (!msg || !btn) return;

        var qid = String((q && q.id) != null ? q.id : "q" + stepIndex);
        if (typeof isTopicXpLocked === "function" && isTopicXpLocked(t.id)) {
          btn.disabled = true;
          msg.textContent = typeof topicLockMessage === "function" ? topicLockMessage(t.id) : "XP paused for this chapter.";
          return;
        }
        if (claimedWrittenToday(t.id, qid)) {
          btn.disabled = true;
          msg.textContent = "Already claimed XP for this question today.";
          return;
        }

        var hasRubric = card.getAttribute("data-has-rubric") === "1";
        var rubOk = !hasRubric || card.getAttribute("data-ext-rubric-viewed") === "1";
        var modOk = card.getAttribute("data-ext-model-viewed") === "1";
        if (!rubOk || !modOk) {
          btn.disabled = true;
          msg.textContent = "Open mark scheme and model answer, then meet the quality bar to claim.";
          return;
        }

        var ta = card.querySelector(".extended-q-textarea");
        var dwellMs = 0;
        if (ta && ta.dataset.dwellStart) {
          dwellMs = Date.now() - Number(ta.dataset.dwellStart || 0);
        }
        var res = evaluateWrittenQuality(ta ? ta.value : "", dwellMs);
        if (!res.ok) {
          btn.disabled = true;
          msg.textContent = res.detail || "Keep improving your draft.";
          return;
        }
        btn.disabled = false;
        msg.textContent = "Ready to claim — your draft passes quick checks.";
      }

      function mountAt(i) {
        sessionStorage.setItem(sk, String(i));
        var q = list[i];
        var xp = writtenXpForQuestion(q);
        mount.innerHTML = renderOneCard(q, i, t.id) + renderClaimFooter(xp);
        setStepUi(i);

        var card = mount.querySelector(".extended-q-card");
        if (!card) return;

        var ta = card.querySelector(".extended-q-textarea");
        if (ta) {
          delete ta.dataset.dwellStart;
          var markDwell = function () {
            if (!ta.dataset.dwellStart && ta.value.length) {
              ta.dataset.dwellStart = String(Date.now());
            }
          };
          ta.addEventListener("keydown", markDwell);
          ta.addEventListener("input", markDwell);
        }

        wireOneCard(card, t, q, i, function () {
          syncClaimUi(card, q, i);
        });

        var claimBtn = document.getElementById("written-claim-btn");
        if (claimBtn) {
          claimBtn.onclick = function () {
            if (claimBtn.disabled) return;
            var qid = String(q.id || "q" + i);
            var ta2 = card.querySelector(".extended-q-textarea");
            var dwellMs2 = 0;
            if (ta2 && ta2.dataset.dwellStart) {
              dwellMs2 = Date.now() - Number(ta2.dataset.dwellStart || 0);
            }
            var res2 = evaluateWrittenQuality(ta2 ? ta2.value : "", dwellMs2);
            if (!res2.ok) return;
            var hasRubric2 = card.getAttribute("data-has-rubric") === "1";
            if (hasRubric2 && card.getAttribute("data-ext-rubric-viewed") !== "1") return;
            if (card.getAttribute("data-ext-model-viewed") !== "1") return;
            if (claimedWrittenToday(t.id, qid)) return;
            if (typeof isTopicXpLocked === "function" && isTopicXpLocked(t.id)) return;

            var delta = writtenXpForQuestion(q);
            var xp0 = Number(state.xp || 0);
            addXp(delta, {
              topicId: t.id,
              theme: t.theme || "",
              tab: "written",
              activityType: "written_practice",
              sourceId: "written:" + String(t.id) + ":" + qid + ":" + todayKey(),
              reason: "written_question_claim",
            });
            var gained = Number(state.xp || 0) - xp0;
            if (gained > 0) {
              markWrittenClaimed(t.id, qid);
              claimBtn.disabled = true;
              var msg2 = document.getElementById("written-claim-msg");
              if (msg2) msg2.textContent = "Claimed +" + gained + " XP for today.";
            } else {
              var msg3 = document.getElementById("written-claim-msg");
              if (msg3) {
                msg3.textContent =
                  "No XP credited (rate cap or chapter pause). You can try again later; progress on this answer is unchanged.";
              }
            }
          };
        }

        syncClaimUi(card, q, i);
      }

      prev.onclick = function () {
        var i = readStep();
        if (i <= 0) return;
        mountAt(i - 1);
      };
      next.onclick = function () {
        var i = readStep();
        if (i >= list.length - 1) return;
        mountAt(i + 1);
      };

      mountAt(readStep());
    },

    qualifyWrittenOnlyHeuristic: function (text, dwellMs) {
      return evaluateWrittenQuality(String(text || ""), Number(dwellMs || 0)).ok;
    },
  };
})();
