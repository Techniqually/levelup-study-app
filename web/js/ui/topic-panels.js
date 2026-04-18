
function formatCheatPoint(p) {
    const esc = escapeHtml(p);
    return esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function renderCheat(t) {
    return t.cheatBlocks
      .map(
        (b) => `
      <div class="cheat-slide">
        <h3>${escapeHtml(b.title)}</h3>
        <ul>${b.points.map((p) => `<li>${formatCheatPoint(p)}</li>`).join("")}</ul>
      </div>`
      )
      .join("");
  }

  function renderVisuals(t) {
    let infs = t.infographics;
    if ((!infs || !infs.length) && window.SUBJECT_INFOS_BY_TOPIC) {
      infs = window.SUBJECT_INFOS_BY_TOPIC[String(t.id)];
    }

    if (!infs || !infs.length) {
      return `<p class="empty-state">No extra diagram for this topic — check Notes for embedded ideas.</p>`;
    }

    const infoByTopicAll = window.INFO_MD_BY_TOPIC_AND_FILE || {};
    const infoByFile = infoByTopicAll[String(t.id)] || {};

    return infs
      .map((inf) => {
        const infoKey =
          inf.infoKey ||
          (inf.image
            ? inf.image.split("/").pop().split("?")[0]
            : null);
        const infoMd =
          inf.infoMarkdown ||
          (infoKey ? infoByFile[String(infoKey)] : "") ||
          "";
        const media = inf.image
          ? `<img src="${escapeHtml(inf.image)}" alt="" class="infographic-img" loading="lazy"/>`
          : (inf.svg || "");
        return `
      <div class="infographic-wrap">
        ${media}
        <div class="infographic-caption">${escapeHtml(inf.caption || t.title || "")}</div>
        ${
          infoMd
            ? `<div class="infographic-info">
                <div class="infographic-file">${escapeHtml(infoKey || "")}</div>
                ${renderMiniMarkdown(infoMd)}
               </div>`
            : ""
        }
      </div>`;
      })
      .join("");
  }

  function renderFlashPanel(t) {
    const cards = t.flashcards.slice();
    return `
      <div class="panel active" data-panel="flash">
        <p class="flash-progress" id="flash-progress">Tap card to flip · <span id="flash-count"></span></p>
        <div class="flash-read-meter" aria-hidden="true">
          <div class="flash-read-meter__track">
            <span class="flash-read-meter__fill" id="flash-read-fill"></span>
          </div>
        </div>
        <div class="flash-area"><div class="flash-card" id="flash-card"><div class="flash-face flash-front" id="flash-front"></div><div class="flash-face flash-back" id="flash-back"></div></div></div>
        <div class="flash-actions">
          <button type="button" class="btn danger-outline" id="flash-review">Need review</button>
          <button type="button" class="btn primary" id="flash-got">Got it ✓</button>
        </div>
      </div>`;
  }

  function renderQuizPanel(t) {
    const insight = getTopicQuizInsights(t);
    const daily = getDailyChallengeSummary();
    const topicCooling = isCooldownActive(insight.topicMasteredUntil);
    return `
      <div class="panel active" data-panel="quiz">
        <div id="quiz-start-wrap">
          <p class="game-intro">Bank: ${insight.total} MCQs · each round: ${Math.min(QUIZ_PER_ROUND, insight.total)} adaptive · timer · early wrong = health loss · 3 streak = combo.</p>
          <div class="quiz-insights">
            <span class="quiz-chip">${escapeHtml(insight.label)}</span>
            <span class="quiz-chip">Weak ${insight.weakCount}</span>
            <span class="quiz-chip">New ${insight.unseenCount}</span>
            <span class="quiz-chip">Mastered ${insight.masteredCount}</span>
            <span class="quiz-chip">Cooling ${insight.coolingCount}</span>
            <span class="quiz-chip">Fresh ${insight.freshEligible}</span>
            ${
              isCooldownActive(insight.topicXpLockUntil)
                ? `<span class="quiz-chip" title="${escapeHtml(
                    topicLockMessage(t.id)
                  )}">XP paused ${escapeHtml(formatMsShort(insight.topicXpLockUntil - Date.now()))}</span>`
                : ""
            }
          </div>
          <div class="quiz-start-actions">
            <button type="button" class="btn primary" id="quiz-start" ${topicCooling ? "disabled" : ""}>${topicCooling ? "Adaptive quiz cooling down" : "Start adaptive quiz"}</button>
            <button type="button" class="btn" id="quiz-review" ${insight.total ? "" : "disabled"}>${insight.weakCount ? `Review weak questions (${insight.weakCount})` : "Review topic"}</button>
          </div>
          <p class="quiz-note">${
            topicCooling
              ? `Mastered recently — adaptive quiz returns on ${escapeHtml(
                  formatShortDate(insight.topicMasteredUntil)
                )} (${escapeHtml(formatDurationCountdown(insight.topicMasteredUntil - Date.now()))} left). Review mode still works.`
              : isCooldownActive(insight.topicXpLockUntil)
                ? `XP pause active for this chapter (${escapeHtml(
                    formatDurationCountdown(insight.topicXpLockUntil - Date.now())
                  )} left). You can study Notes/Cards, or switch chapter for quiz XP.`
              : insight.total >= 10 && (insight.unseenCount <= 2 || insight.freshEligible <= 3 || insight.exhaustedShare >= 0.7)
                ? `Most questions here are now repeated. For better learning, try another chapter after this round.`
              : `Daily: ${Math.min(daily.answered, DAILY_CHALLENGE.answered)}/${DAILY_CHALLENGE.answered} answered · ${Math.min(daily.reviewRounds, DAILY_CHALLENGE.reviewRounds)}/${DAILY_CHALLENGE.reviewRounds} review rounds · ${Math.min(daily.weakTopics, DAILY_CHALLENGE.weakTopics)}/${DAILY_CHALLENGE.weakTopics} weak topic.`
          }</p>
        </div>
        <div id="quiz-play" hidden></div>
      </div>`;
  }

  function renderWrittenPanel(t) {
    const has =
      typeof LevelupExtendedQuiz !== "undefined" &&
      LevelupExtendedQuiz &&
      typeof LevelupExtendedQuiz.hasQuestionsForTopic === "function"
        ? LevelupExtendedQuiz.hasQuestionsForTopic(t)
        : Array.isArray(t.extendedQuestions) && t.extendedQuestions.length > 0;
    if (!has) {
      return `<div class="panel active" data-panel="written"><p class="empty-state">No Paper 2–style written prompts in this topic yet.</p></div>`;
    }
    if (typeof LevelupExtendedQuiz !== "undefined" && LevelupExtendedQuiz && LevelupExtendedQuiz.renderWrittenShell) {
      return LevelupExtendedQuiz.renderWrittenShell(t);
    }
    return `<div class="panel active" data-panel="written"><p class="empty-state">Written module failed to load.</p></div>`;
  }

  function renderGamePanel(t) {
    const hasSeq = t.orderGame && t.orderGame.length;
    const hasTF = t.trueFalse && t.trueFalse.length >= 6;
    const tfCount = hasTF ? Math.min(10, (t.trueFalse || []).length) : 0;
    const matchCount = Math.min(8, (t.flashcards || []).length);
    const seqCount = hasSeq ? (t.orderGame || []).length : 0;
    return `
      <div class="panel active" data-panel="game">
        <p class="game-intro">Game rules upfront:</p>
        <ul class="game-intro">
          <li><strong>Matching pairs</strong>: ${matchCount} cards, clear all pairs to earn XP.</li>
          ${hasSeq ? `<li><strong>Order game</strong>: arrange ${seqCount} steps correctly, then check.</li>` : ""}
          ${hasTF ? `<li><strong>True / False</strong>: ${tfCount} statements, XP based on correct count.</li>` : ""}
        </ul>
        <button type="button" class="btn primary" id="game-match">Matching pairs</button>
        ${
          hasSeq
            ? `<button type="button" class="btn" id="game-seq" style="margin-top:10px;width:100%">Order: ${escapeHtml(
                t.orderTitle || "sequence"
              )}</button>`
            : ""
        }
        ${
          hasTF
            ? `<button type="button" class="btn" id="game-tf" style="margin-top:10px;width:100%">True / False (10)</button>`
            : ""
        }
        <div id="game-area" style="margin-top:16px"></div>
      </div>`;
  }

  function bindPanelHandlers(t) {
    if (route.tab === "flash") startFlash(t);
    if (route.tab === "quiz") bindQuiz(t);
    if (route.tab === "written") {
      if (typeof LevelupExtendedQuiz !== "undefined" && LevelupExtendedQuiz && LevelupExtendedQuiz.bindWritten) {
        LevelupExtendedQuiz.bindWritten(t);
      }
    }
    if (route.tab === "game") bindGames(t);
  }

    

  function startFlash(t) {
    const pool = shuffle(t.flashcards);
    const review = [];
    let idx = 0;
    let flashCompleted = false;
    let hadReviewRound = false;
    let actionLock = false;
    const MIN_FLASH_TOTAL_MS = 3500;
    const MIN_FLASH_FRONT_MS = 1500;
    const MIN_FLASH_BACK_MS = 1200;
    const deckSize = pool.length;
    let cardShownAt = 0;
    let sawBackForCard = false;
    let firstBackShownAt = 0;
    let backVisibleSince = 0;
    let backReadAccumMs = 0;
    const validatedCards = typeof WeakSet !== "undefined" ? new WeakSet() : null;
    let validatedCount = 0;
    let flashMeterId = null;
    function clearFlashMeter() {
      if (flashMeterId) {
        clearInterval(flashMeterId);
        flashMeterId = null;
      }
    }
    function tickFlashReadMeter() {
      const fill = document.getElementById("flash-read-fill");
      if (!fill || flashCompleted) {
        clearFlashMeter();
        return;
      }
      const { elapsed } = getReadState(Date.now());
      const p = Math.max(0, Math.min(1, 1 - elapsed / MIN_FLASH_TOTAL_MS));
      fill.style.transform = "scaleX(" + p + ")";
    }
    const front = document.getElementById("flash-front");
    const back = document.getElementById("flash-back");
    const card = document.getElementById("flash-card");
    const prog = document.getElementById("flash-count");
    const progLabel = document.getElementById("flash-progress");

    function getReadState(nowTs) {
      const now = nowTs || Date.now();
      const elapsed = Math.max(0, now - cardShownAt);
      const backLive = backVisibleSince ? now - backVisibleSince : 0;
      const backReadMs = backReadAccumMs + backLive;
      const frontReadMs = firstBackShownAt
        ? Math.max(0, firstBackShownAt - cardShownAt)
        : Math.max(0, elapsed - backReadMs);
      const validRead =
        sawBackForCard &&
        elapsed >= MIN_FLASH_TOTAL_MS &&
        frontReadMs >= MIN_FLASH_FRONT_MS &&
        backReadMs >= MIN_FLASH_BACK_MS;
      return { elapsed, frontReadMs, backReadMs, validRead };
    }

    function show() {
      clearFlashMeter();
      if (idx >= pool.length) {
        if (review.length) {
          pool.splice(0, pool.length, ...shuffle(review));
          review.length = 0;
          idx = 0;
        } else {
          flashCompleted = true;
          clearFlashMeter();
          const baseBonus = hadReviewRound ? 18 : 10;
          const ratio = deckSize > 0 ? validatedCount / deckSize : 0;
          const bonus = Math.floor(baseBonus * ratio);
          if (bonus > 0) {
            addXp(bonus, {
              topicId: t.id,
              theme: t.theme,
              tab: "flash",
              activityType: "flash",
              sourceId: `flash:${t.id}:deck`,
              reason: "flash_deck_complete",
            });
          } else {
            saveState();
          }
          front.innerHTML = renderMiniMarkdown("Deck cleared — open another tab or redo.");
          back.innerHTML = renderMiniMarkdown("Nice.");
          renderMathWhenReady(front, 0);
          renderMathWhenReady(back, 0);
          card.classList.remove("flipped");
          prog.textContent = "Done";
          return;
        }
      }
      const c = pool[idx];
      front.innerHTML = renderMiniMarkdown(c.front || "");
      back.innerHTML = renderMiniMarkdown(c.back || "");
      renderMathWhenReady(front, 0);
      renderMathWhenReady(back, 0);
      card.classList.remove("flipped");
      prog.textContent = `${idx + 1} / ${pool.length}`;
      cardShownAt = Date.now();
      sawBackForCard = false;
      firstBackShownAt = 0;
      backVisibleSince = 0;
      backReadAccumMs = 0;
      if (progLabel) {
        progLabel.textContent =
          "Read both sides for XP: 1.5s front + 1.2s back (3.5s total)";
      }
      const fill = document.getElementById("flash-read-fill");
      if (fill) {
        fill.style.transform = "scaleX(1)";
        clearFlashMeter();
        flashMeterId = setInterval(tickFlashReadMeter, 100);
        tickFlashReadMeter();
      }
    }

    card.onclick = () => {
      const now = Date.now();
      const wasBack = card.classList.contains("flipped");
      card.classList.toggle("flipped");
      sawBackForCard = card.classList.contains("flipped") || sawBackForCard;
      if (!wasBack) {
        if (!firstBackShownAt) firstBackShownAt = now;
        backVisibleSince = now;
      } else if (backVisibleSince) {
        backReadAccumMs += now - backVisibleSince;
        backVisibleSince = 0;
      }
    };
    document.getElementById("flash-got").onclick = () => {
      if (flashCompleted || actionLock) return;
      actionLock = true;
      const currentCard = pool[idx];
      const readState = getReadState(Date.now());
      idx++;
      if (readState.validRead) {
        const already = validatedCards ? validatedCards.has(currentCard) : false;
        if (!already) {
          addXp(2, {
            topicId: t.id,
            theme: t.theme,
            tab: "flash",
            activityType: "flash",
            sourceId: `${t.id}::${normalizeQuestionText(currentCard.front)}`,
            reason: "flash_got_it",
          });
          if (validatedCards) validatedCards.add(currentCard);
          validatedCount++;
        }
      } else if (progLabel) {
        progLabel.textContent =
          "Too fast for XP on this card. XP only counts after real read time on both sides.";
      }
      actionLock = false;
      show();
    };
    document.getElementById("flash-review").onclick = () => {
      if (flashCompleted || actionLock) return;
      actionLock = true;
      const currentCard = pool[idx];
      const readState = getReadState(Date.now());
      review.push(pool[idx]);
      idx++;
      hadReviewRound = true;
      if (readState.validRead) {
        const already = validatedCards ? validatedCards.has(currentCard) : false;
        if (!already) {
          addXp(1, {
            topicId: t.id,
            theme: t.theme,
            tab: "flash",
            activityType: "flash",
            sourceId: `${t.id}::${normalizeQuestionText(currentCard.front)}`,
            reason: "flash_review_marked",
          });
          if (validatedCards) validatedCards.add(currentCard);
          validatedCount++;
        }
      } else if (progLabel) {
        progLabel.textContent =
          "Too fast for XP on this card. XP only counts after real read time on both sides.";
      }
      actionLock = false;
      show();
    };
    show();
  }
