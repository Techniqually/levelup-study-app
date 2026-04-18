
function renderHome() {
    bumpStreak();
    stopAndAwardTime();
    window.dispatchEvent(new CustomEvent("levelup:route-changed", { detail: { view: "home" } }));
    dock.hidden = true;
    const parts = [];
    let currentTheme = "";
    const daily = getDailyChallengeSummary();
    const dailyBanner = `
      <div class="daily-card">
        <div class="daily-title">Daily challenge${daily.bonusAwarded ? ` · +${DAILY_CHALLENGE.bonusXp} XP claimed` : ""}</div>
        <div class="daily-progress">
          <span class="quiz-chip">Quiz ${Math.min(daily.answered, DAILY_CHALLENGE.answered)}/${DAILY_CHALLENGE.answered}</span>
          <span class="quiz-chip">Review ${Math.min(daily.reviewRounds, DAILY_CHALLENGE.reviewRounds)}/${DAILY_CHALLENGE.reviewRounds}</span>
          <span class="quiz-chip">Weak topic ${Math.min(daily.weakTopics, DAILY_CHALLENGE.weakTopics)}/${DAILY_CHALLENGE.weakTopics}</span>
          <span class="quiz-chip ${daily.completed ? "mastered" : ""}">${daily.completed ? "Completed" : "In progress"}</span>
        </div>
      </div>`;
    manifest.forEach((t) => {
      if (t.theme !== currentTheme) {
        currentTheme = t.theme;
        parts.push(
          `<div class="theme-block"><div class="theme-label">${escapeHtml(
            currentTheme
          )}</div><div class="topic-grid">`
        );
      }
      const unlocked = isUnlocked(t.id);
      const best = state.topicBest[t.id];
      const badge =
        best != null
          ? `<span class="badge done">${best}% best</span>`
          : `<span class="badge">Study</span>`;
      const mastery = getStoredTopicMastery(t.id);
      const masteryBadge = `<span class="badge mastery">${escapeHtml(
        mastery.label
      )}</span>`;
      const reviewBadge = mastery.weakCount
        ? `<span class="badge review">${mastery.weakCount} weak</span>`
        : "";
      const cooldownBadge = isCooldownActive(mastery.masteredUntil)
        ? `<span class="badge cooldown">Ready ${escapeHtml(
            formatShortDate(mastery.masteredUntil)
          )}</span>`
        : "";
      parts.push(
        `<button type="button" class="topic-card ${
          unlocked ? "unlocked" : ""
        }" data-topic="${escapeHtml(t.id)}" ${
          unlocked ? "" : "disabled"
        } title="${unlocked ? "" : "Locked — raise previous topic to 70% or enable Unlock all in settings"}">
          <span class="num">T${t.id}</span>
          <span class="title">${escapeHtml(t.title)}</span>
          <span class="badge-row">${badge}${masteryBadge}${reviewBadge}${cooldownBadge}</span>
        </button>`
      );
      const next = manifest[topicIndex(t.id) + 1];
      if (!next || next.theme !== currentTheme) parts.push("</div></div>");
    });
    const bossParts = [];
    themeOrder.forEach((themeKey) => {
      const beaten = state.themeBossBeaten && state.themeBossBeaten[themeKey];
      const unlocked = isBossUnlocked(themeKey);
      if (!unlocked && !beaten) return;
      const name = themeKey;
      bossParts.push(
        `<button type="button" class="topic-card boss-card ${
          beaten ? "boss-beaten" : ""
        }" data-boss="${escapeHtml(themeKey)}" ${
          beaten ? "disabled" : ""
        }>
          <span class="num">BOSS</span>
          <span class="title">${escapeHtml(name)}</span>
          <span class="badge">${
            beaten ? "🏆 Beaten" : "1 HP · fast timer · big XP"
          }</span>
        </button>`
      );
    });
    if (bossParts.length) {
      parts.push(
        '<div class="theme-block"><div class="theme-label">Boss battles</div><div class="topic-grid">' +
        bossParts.join("") +
        "</div></div>"
      );
    }
    main.innerHTML = `
      <h1 class="dash-title">${escapeHtml(SUBJECT_TITLE)}</h1>
      <p class="dash-sub">Topics · Shop (spend XP on rewards) · Boss battles when a full theme is unlocked.</p>
      ${dailyBanner}
      ${parts.join("")}
    `;
    main.querySelectorAll(".topic-card[data-topic]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        goTopic(btn.dataset.topic, "cheat");
      });
    });
    main.querySelectorAll(".topic-card[data-boss]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        startBossBattle(btn.dataset.boss);
      });
    });
  }

  function goTopic(id, tab) {
    stopAndAwardTime();
    route = { view: "topic", topicId: id, tab: tab || "cheat" };
    window.dispatchEvent(new CustomEvent("levelup:route-changed", { detail: { view: "topic", topicId: id, tab: tab || "cheat" } }));
    main.innerHTML =
      '<p class="empty-state">Loading topic…</p>';
    dock.hidden = true;
    loadTopicScript(id)
      .then((t) => {
        route.topicData = t;
        dock.hidden = false;
        renderTopic();
      })
      .catch(() => {
        main.innerHTML =
          '<p class="empty-state">Failed to load topic script. Use a local server (e.g. <code>npx serve .</code>) if the browser blocks <code>file://</code> scripts.</p><button type="button" class="btn primary" id="reload-home">Home</button>';
        document.getElementById("reload-home").onclick = () => {
          route = { view: "home" };
          renderHome();
        };
      });
  }

  function renderTopic() {
    const t =
      route.topicData || window.__topicRegistry[route.topicId];
    if (!t || t.id !== route.topicId) {
      if (route.view === "topic" && route.topicId) {
        loadTopicScript(route.topicId).then((loaded) => {
          route.topicData = loaded;
          renderTopic();
        });
        main.innerHTML = '<p class="empty-state">Loading…</p>';
      } else renderHome();
      return;
    }
    // Topic is ready; finalize previous timing segment (if any).
    stopAndAwardTime();
    dock.hidden = false;
    const hasWritten =
      typeof LevelupExtendedQuiz !== "undefined" &&
      LevelupExtendedQuiz &&
      typeof LevelupExtendedQuiz.hasQuestionsForTopic === "function"
        ? LevelupExtendedQuiz.hasQuestionsForTopic(t)
        : Array.isArray(t.extendedQuestions) && t.extendedQuestions.length > 0;
    if (route.tab === "written" && !hasWritten) {
      route.tab = "cheat";
    }
    dock.querySelectorAll("button[data-tab]").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === route.tab);
      if (b.dataset.tab === "written") {
        b.hidden = !hasWritten;
        b.disabled = !hasWritten;
      }
    });

    let body = "";
    if (route.tab === "cheat") body = renderCheat(t);
    else if (route.tab === "visual") body = renderVisuals(t);
    else if (route.tab === "flash") body = renderFlashPanel(t);
    else if (route.tab === "quiz") body = renderQuizPanel(t);
    else if (route.tab === "written") body = renderWrittenPanel(t);
    else if (route.tab === "game") body = renderGamePanel(t);

    const idx = topicIndex(t.id);
    const prev = idx > 0 ? manifest[idx - 1] : null;
    const next = idx >= 0 && idx < manifest.length - 1 ? manifest[idx + 1] : null;
    const prevDisabled = !prev;
    const nextDisabled = !next || !isUnlocked(next.id);

    main.innerHTML = `
      <div class="topic-header">
        <button type="button" class="back" id="topic-back">← All topics</button>
        <div class="topic-title-row">
          <h1>Topic ${t.id}: ${escapeHtml(t.title)}</h1>
          <div class="topic-nav">
            <button type="button" class="btn btn-small" id="topic-prev" ${prevDisabled ? "disabled" : ""}>← Prev</button>
            <span class="btn-small">Topics</span>
            <button type="button" class="btn btn-small primary" id="topic-next" ${nextDisabled ? "disabled" : ""}>Next →</button>
          </div>
        </div>
      </div>
      <div id="topic-panels">${body}</div>
    `;
    document.getElementById("topic-back").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    const prevBtn = document.getElementById("topic-prev");
    const nextBtn = document.getElementById("topic-next");
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (!prev) return;
        goTopic(prev.id, route.tab);
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (!next || !isUnlocked(next.id)) return;
        goTopic(next.id, route.tab);
      };
    }
    bindPanelHandlers(t);

    startTime(t.id, route.tab);

    // Typeset `$...$`, `$$...$$`, `\(...\)`, `\[...\]` via KaTeX (subject.html).
    renderMathWhenReady(document.getElementById("topic-panels") || main, 0);

    // Tab / topic body swaps leave the scroll position mid-panel; snap back to
    // the topic chrome so Notes ↔ Quiz etc. always start from the top.
    requestAnimationFrame(function () {
      try {
        var hdr = document.querySelector(".topic-header");
        if (hdr) {
          var headerH = 0;
          try {
            var cssH = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
            headerH = parseFloat(cssH) || 0;
          } catch (_e0) {}
          var dock = document.getElementById("dock");
          var dockH = dock && !dock.hidden ? dock.getBoundingClientRect().height : 0;
          var top = window.scrollY + hdr.getBoundingClientRect().top - headerH - dockH - 8;
          window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
        } else {
          window.scrollTo(0, 0);
        }
      } catch (_e) {}
    });
  }
