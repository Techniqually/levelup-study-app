
function startBossBattle(themeKey) {
    const name = themeKey;
    const ids = themesByKey[themeKey];
    if (
      !ids ||
      state.themeBossBeaten &&
        state.themeBossBeaten[themeKey]
    )
      return;
    main.innerHTML = `
      <div class="boss-intro">
        <h1>Boss: ${escapeHtml(name)}</h1>
        <p><strong>Rules:</strong> 1 HP only · timer is 20% faster · strict timeout (no overtime answers) · mixed questions from all topics in this theme.</p>
        <p id="boss-count" class="hint">Loading question count…</p>
        <p>Win to earn <strong>${BOSS_XP} XP</strong> and a permanent badge.</p>
        <button type="button" class="btn primary" id="boss-start" disabled>Start battle</button>
        <button type="button" class="btn" id="boss-cancel">Cancel</button>
      </div>
      <div id="boss-quiz-container" hidden></div>`;
    document.getElementById("boss-cancel").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    const countEl = document.getElementById("boss-count");
    const startBtn = document.getElementById("boss-start");
    let preparedQuiz = [];
    Promise.all(ids.map((id) => loadTopicScript(id)))
      .then((topics) => {
        const allQuiz = topics.flatMap((topic) =>
          getTopicQuizBank(topic).map((q) => ({ ...q }))
        );
        const themeExtra = getThemeExtraQuiz(themeKey).map((q) => ({ ...q }));
        allQuiz.push(...themeExtra);
        preparedQuiz = allQuiz;
        if (countEl) {
          countEl.textContent = `Question bank: ${allQuiz.length} total (each boss run uses ${Math.min(
            QUIZ_PER_ROUND,
            allQuiz.length
          )} adaptive questions).`;
        }
        if (startBtn) startBtn.disabled = allQuiz.length === 0;
      })
      .catch(() => {
        if (countEl) countEl.textContent = "Failed to load question count. Please retry.";
      });

    document.getElementById("boss-start").onclick = () => {
      document.querySelector(".boss-intro").hidden = true;
      const container = document.getElementById("boss-quiz-container");
      container.hidden = false;
      if (!preparedQuiz.length) {
        container.innerHTML =
          "<p class='empty-state'>No boss questions available for this theme yet.</p><button type='button' class='btn primary' id='boss-back'>Back</button>";
        document.getElementById("boss-back").onclick = () => renderHome();
        return;
      }
      const synthetic = { id: "boss:" + themeKey, quiz: preparedQuiz };
      runQuiz(synthetic, container, { boss: true, themeId: themeKey });
    };
  }
