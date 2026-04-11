
function bindQuiz(t) {
    const start = document.getElementById("quiz-start");
    const review = document.getElementById("quiz-review");
    const wrap = document.getElementById("quiz-start-wrap");
    const play = document.getElementById("quiz-play");
    const insight = getTopicQuizInsights(t);
    const suggested = getSuggestedNextTopics(t.id, 3);
    const suggestionText = suggested.length
      ? suggested.map((m) => `T${m.id} ${m.title}`).join(", ")
      : "another chapter";
    const exhaustionMessage =
      "You have mostly repeated questions in this chapter now. " +
      "For better learning and fair XP, try: " +
      suggestionText +
      ".";
    const shouldNudgeChapterSwitch =
      insight.total >= 10 &&
      !isCooldownActive(insight.topicMasteredUntil) &&
      (insight.unseenCount <= 2 || insight.freshEligible <= 3 || insight.exhaustedShare >= 0.7);
    start.onclick = () => {
      if (isCooldownActive(insight.topicMasteredUntil)) return;
      if (isTopicXpLocked(t.id)) {
        showExplain(
          "Chapter XP pause",
          topicLockMessage(t.id),
          () => {
            route = { view: "home" };
            renderHome();
          },
          "Pick another chapter from Home."
        );
        return;
      }
      if (shouldNudgeChapterSwitch) {
        showExplain(
          "Chapter mostly completed",
          exhaustionMessage,
          () => {
            if (insight.weakCount > 0) markDailyWeakTopic(t.id);
            wrap.hidden = true;
            play.hidden = false;
            runQuiz(t, play);
          },
          "You can still continue here, but switching chapters is recommended."
        );
        return;
      }
      if (insight.weakCount > 0) markDailyWeakTopic(t.id);
      wrap.hidden = true;
      play.hidden = false;
      runQuiz(t, play);
    };
    if (review) {
      review.onclick = () => {
        if (isTopicXpLocked(t.id)) {
          showExplain(
            "Chapter XP pause",
            topicLockMessage(t.id),
            () => {
              route = { view: "home" };
              renderHome();
            },
            "You can still study Notes/Cards, but quiz XP here is paused."
          );
          return;
        }
        if (shouldNudgeChapterSwitch && insight.weakCount <= 2) {
          showExplain(
            "Review is getting repetitive",
            exhaustionMessage,
            () => {
              if (insight.weakCount > 0) markDailyWeakTopic(t.id);
              wrap.hidden = true;
              play.hidden = false;
              runQuiz(t, play, { review: true });
            },
            "You can still continue if you want."
          );
          return;
        }
        if (insight.weakCount > 0) markDailyWeakTopic(t.id);
        wrap.hidden = true;
        play.hidden = false;
        runQuiz(t, play, { review: true });
      };
    }
  }


  function runQuiz(t, container, opts) {
    opts = opts || {};
    const isBoss = !!opts.boss;
    const isReview = !!opts.review;
    if (!isBoss && isTopicXpLocked(t.id)) {
      container.innerHTML = `<div class="game-win"><h3>Chapter XP paused</h3><p>${escapeHtml(
        topicLockMessage(t.id)
      )}</p></div>`;
      return;
    }
    const healthMax = isBoss ? 1 : HEALTH_START;
    const questionMs = isBoss ? Math.round(QUESTION_MS * BOSS_QUESTION_MS_MULT) : QUESTION_MS;
    const topicStats = !isBoss && t.id ? touchTopicStats(t.id) : null;
    const qs = pickAdaptiveQuestions(t, opts);
    if (!qs.length) {
      container.innerHTML = `<div class="game-win"><h3>No questions ready</h3><p>${
        isReview
          ? "You do not have enough weak questions yet. Try a normal quiz first."
          : topicStats && isCooldownActive(topicStats.masteredUntil)
            ? `Adaptive quiz is cooling down until ${formatShortDate(
                topicStats.masteredUntil
              )}. Use review mode if you still want a quick check.`
            : "This topic does not have a quiz bank yet."
      }</p></div>`;
      return;
    }
    let qi = 0;
    let score = 0;
    let combo = 0;
    let health = healthMax;
    let timerId = null;
    let qStart = 0;
    let wrongCount = 0;
    let timedOutCurrent = false;

    function renderQ() {
      if (qi >= qs.length) {
        const pct = Math.round((score / (qs.length * 100)) * 100);
        const capped = Math.min(100, pct);
        if (!isBoss && !isReview && t.id) {
          state.topicScores[t.id] = (state.topicScores[t.id] || 0) + 1;
          if ((state.topicBest[t.id] || 0) < capped)
            state.topicBest[t.id] = capped;
          addXp(Math.max(12, Math.round(capped * 0.8 + combo * 3)), {
            topicId: t.id,
            theme: t.theme,
            tab: "quiz",
            activityType: "quiz",
            sourceId: `round:${t.id}:${Date.now()}`,
            reason: "quiz_round_complete",
          });
        } else if (isReview && t.id) {
          addXp(Math.max(8, Math.round(capped * 0.45 + combo * 2)), {
            topicId: t.id,
            theme: t.theme,
            tab: "quiz",
            activityType: "quiz_review",
            sourceId: `review:${t.id}:${Date.now()}`,
            reason: "review_round_complete",
          });
          if (qs.length) markDailyReviewRound();
        } else if (isBoss && opts.themeId) {
          state.themeBossBeaten = state.themeBossBeaten || {};
          state.themeBossBeaten[opts.themeId] = true;
          addXp(BOSS_XP, {
            theme: opts.themeId,
            tab: "quiz",
            activityType: "boss",
            sourceId: `boss:${opts.themeId}`,
            reason: "boss_win",
          });
        }
        if (!isBoss && t.id) {
          recordTopicRoundResult(t, {
            review: isReview,
            wrongCount,
            totalQuestions: qs.length,
            pct: capped,
          });
        } else {
          saveState();
        }
        const bossMsg = isBoss ? `<p class="boss-reward">🏆 +${BOSS_XP} XP · Theme badge unlocked!</p>` : "";
        container.innerHTML = `
          <div class="game-win">
            <h3>${isBoss ? "Boss defeated!" : isReview ? "Review complete" : "Round complete"}</h3>
            <p>Score: ${score} · ~${capped}%${!isBoss && !isReview && t.id ? " · Best saved: " + state.topicBest[t.id] + "%" : ""}</p>
            ${bossMsg}
            <button type="button" class="btn primary" id="quiz-again">${isBoss ? "Back to topics" : "Again"}</button>
          </div>`;
        document.getElementById("quiz-again").onclick = () => {
          container.innerHTML = "";
          if (isBoss) {
            route = { view: "home" };
            renderHome();
          } else if (isReview) {
            runQuiz(t, container, { review: true });
          } else {
            runQuiz(t, container);
          }
        };
        return;
      }

      const q = qs[qi];
      const optionItems = shuffle(q.options.map((o, i) => ({ o, i })));
      container.innerHTML = `
        <div class="quiz-meta">
          <div class="timer-bar-wrap"><div class="timer-bar" id="q-timer"></div></div>
          <span class="combo" id="q-combo">${isReview ? "Review mode" : combo >= COMBO_AT ? "🔥 COMBO x" + COMBO_MULT : ""}</span>
          <div class="health-bar" id="q-health">${Array(healthMax)
            .fill(0)
            .map(
              (_, h) =>
                `<span class="health-dot ${
                  h >= health ? "lost" : ""
                }"></span>`
            )
            .join("")}</div>
        </div>
        <div class="quiz-q" id="quiz-question"></div>
        <div class="quiz-options" id="q-opts"></div>
        <div class="quiz-score-line">Points this round: ${score}</div>
        <div id="quiz-confidence"></div>
      `;
      const qEl = document.getElementById("quiz-question");
      if (qEl) {
        qEl.innerHTML = renderMiniMarkdown(q.question || "");
        renderMathWhenReady(qEl, 0);
      }
      const bar = document.getElementById("q-timer");
      bar.style.transition = "none";
      bar.style.width = "100%";
      void bar.offsetWidth;
      bar.style.transition = `width ${questionMs}ms linear`;
      bar.style.width = "0%";
      qStart = Date.now();
      timedOutCurrent = false;
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Boss keeps strict timeout. Normal/review quiz allows overtime answer with reduced XP.
        if (isBoss) {
          finish(false, true);
          return;
        }
        timedOutCurrent = true;
        if (bar) bar.style.width = "0%";
        const confidence = document.getElementById("quiz-confidence");
        if (confidence) {
          confidence.innerHTML =
            "<div class='question-confidence weak'><div class='question-confidence-reason'>Time is up for bonus speed XP, but you can still answer this question. Overtime correct answers give reduced XP.</div></div>";
        }
      }, questionMs);

      const optEl = document.getElementById("q-opts");
      optionItems.forEach(({ o, i }) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "quiz-opt";
        b.innerHTML = renderMiniMarkdown(o);
        b.dataset.idx = String(i);
        renderMathWhenReady(b, 0);
        b.onclick = () => {
          if (b.disabled) return;
          finish(i === q.correctIndex, false, b);
        };
        optEl.appendChild(b);
      });
    }

    function finish(correct, timeout, clickedBtn) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      const q = qs[qi];
      const elapsed = (Date.now() - qStart) / 1000;
      const preInfo = readQuestionStats(q, t.id);
      const preBucket = getQuestionBucket(preInfo.stats);
      const wasCooled = isCooldownActive(preInfo.stats.masteredUntil);
      const opts = document.querySelectorAll(".quiz-opt");
      opts.forEach((b) => (b.disabled = true));
      if (timeout) {
        wrongCount++;
        recordQuestionOutcome(q, t.id, "timeout", elapsed);
        const confidenceMeta = getQuestionConfidenceMeta(q, t.id);
        if (isBoss) {
          health = Math.max(0, health - 1);
          if (health === 0) {
            container.innerHTML = `
              <div class="game-win" style="border-color: var(--danger);">
                <h3>Boss wins this time</h3>
                <p>Time's up. Review and try again!</p>
                <button type="button" class="btn primary" id="quiz-boss-retry2">Back to topics</button>
              </div>`;
            document.getElementById("quiz-boss-retry2").onclick = () => {
              route = { view: "home" };
              renderHome();
            };
            return;
          }
        }
        showExplain(
          "Time's up",
          q.explanation,
          () => {
            combo = 0;
            qi++;
            renderQ();
          },
          `${confidenceMeta.label} · ${confidenceMeta.reason}`,
          null
        );
        return;
      }
      markDailyAnswered(1);
      if (correct) {
        recordQuestionOutcome(q, t.id, "correct", elapsed);
        if (!isBoss) {
          const reward = getQuestionXpMeta(preBucket, {
            review: isReview,
            cooled: wasCooled,
          });
          const fastGuess = elapsed < 1.2;
          let xpMultiplier = fastGuess ? 0.4 : 1;
          let reason = fastGuess ? `${reward.reason}_very_fast` : reward.reason;
          if (timedOutCurrent) {
            xpMultiplier *= 0.5;
            reason += "_overtime";
          }
          addXp(reward.delta, {
            topicId: getQuestionTopicId(q, t.id),
            theme: t.theme,
            tab: "quiz",
            activityType: isReview ? "quiz_review" : "quiz",
            sourceId: q.__questionKey || getQuestionKey(q, t.id),
            reason,
            xpMultiplier,
          });
        }
        combo++;
        let pts = 100;
        const timeLeft = Math.max(0, 1 - elapsed / (QUESTION_MS / 1000));
        pts = Math.round(60 + 40 * timeLeft);
        if (combo >= COMBO_AT) pts = Math.round(pts * COMBO_MULT);
        score += pts;
        opts.forEach((b) => {
          if (Number(b.dataset.idx) === q.correctIndex)
            b.classList.add("correct");
        });
        const confidence = document.getElementById("quiz-confidence");
        if (confidence) {
          confidence.innerHTML = renderQuestionConfidenceHtml(q, t.id);
          if (window.LevelupLlmQuizWhy && typeof window.LevelupLlmQuizWhy.attachBelowConfidence === "function") {
            window.LevelupLlmQuizWhy.attachBelowConfidence(q, t, q.correctIndex);
          }
        }
        setTimeout(() => {
          qi++;
          renderQ();
        }, 900);
      } else {
        wrongCount++;
        recordQuestionOutcome(q, t.id, "wrong", elapsed);
        const confidenceMeta = getQuestionConfidenceMeta(q, t.id);
        if (elapsed < EARLY_WRONG_SEC || isBoss) {
          health = Math.max(0, health - 1);
        }
        combo = 0;
        if (clickedBtn) clickedBtn.classList.add("wrong");
        opts.forEach((b) => {
          if (Number(b.dataset.idx) === q.correctIndex)
            b.classList.add("correct");
        });
        const next = () => {
          qi++;
          renderQ();
        };
        if (isBoss && health === 0) {
          container.innerHTML = `
            <div class="game-win" style="border-color: var(--danger);">
              <h3>Boss wins this time</h3>
              <p>Out of health. Review the topic and try again!</p>
              <button type="button" class="btn primary" id="quiz-boss-retry">Back to topics</button>
            </div>`;
          document.getElementById("quiz-boss-retry").onclick = () => {
            route = { view: "home" };
            renderHome();
          };
        } else {
          showExplain(
            "Not quite",
            q.explanation,
            next,
            `${confidenceMeta.label} · ${confidenceMeta.reason} · No XP for wrong answer${timedOutCurrent ? " (answered after time)" : ""}, but this question will show up again for practice.`,
            clickedBtn
              ? {
                  q: q,
                  topicId: t.id,
                  chosenIndex: Number(clickedBtn.dataset.idx),
                  subjectId: typeof SUBJECT_ID !== "undefined" ? SUBJECT_ID : "",
                  subjectTitle: typeof SUBJECT_TITLE !== "undefined" ? SUBJECT_TITLE : "",
                  topicTitle: t.title || "",
                  level: "O-Level",
                }
              : null
          );
        }
      }
    }

    renderQ();
  }
