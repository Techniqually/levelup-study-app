(function () {
  const SUBJECT_ID = window.SUBJECT_ID || "chemistry";
  const SUBJECT_TITLE = window.SUBJECT_TITLE || "O-Level Chemistry";
  const STORAGE_KEY = "levelup_" + SUBJECT_ID + "_v1";
  const APP_VERSION = window.APP_VERSION || "dev";
  const QUESTION_MS = 26000;
  const PASS_PCT = 70;
  const EARLY_WRONG_SEC = 3;
  const HEALTH_START = 3;
  const COMBO_AT = 3;
  const COMBO_MULT = 1.5;

  const manifest = window.TOPICS_MANIFEST;
  if (!manifest || !manifest.length) {
    document.getElementById("main").innerHTML =
      "<p class='empty-state'>Missing topics-manifest.js</p>";
    return;
  }

  const QUIZ_PER_ROUND = 20;
  const BOSS_QUESTION_MS_MULT = 0.8;
  const BOSS_XP = 800;
  const THEME_TOPIC_IDS = {
    "1": ["1", "2", "3", "4", "5"],
    "2": ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],
    "3": ["17", "18", "19"],
  };
  const THEME_NAMES = { "1": "Matter", "2": "Chemical Reactions", "3": "Sustainable World" };
  const loadScriptPromises = {};

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
  const main = document.getElementById("main");
  const dock = document.getElementById("dock");
  let state = loadState();
  let route = { view: "home", topicId: null, tab: "cheat" };
  let quizSession = null;
  let flashSession = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultState(), ...JSON.parse(raw) };
    } catch (_) {}
    return defaultState();
  }

  function defaultState() {
    return {
      xp: 0,
      lastStudyDate: null,
      streak: 0,
      unlockAll: true,
      challengeMode: false,
      topicScores: {},
      topicBest: {},
      flashKnown: {},
      coupons: [],
      themeBossBeaten: {},
    };
  }

  function portableState() {
    return {
      version: 1,
      xp: state.xp,
      lastStudyDate: state.lastStudyDate,
      streak: state.streak,
      unlockAll: state.unlockAll,
      challengeMode: state.challengeMode,
      topicScores: state.topicScores,
      topicBest: state.topicBest,
      flashKnown: state.flashKnown,
      coupons: state.coupons,
      themeBossBeaten: state.themeBossBeaten,
    };
  }

  function applyPortableState(payload) {
    if (!payload || typeof payload !== "object") return;
    state.xp = payload.xp ?? state.xp;
    state.lastStudyDate = payload.lastStudyDate ?? state.lastStudyDate;
    state.streak = payload.streak ?? state.streak;
    state.unlockAll = payload.unlockAll ?? state.unlockAll;
    state.challengeMode = payload.challengeMode ?? state.challengeMode;
    state.topicScores = payload.topicScores || state.topicScores;
    state.topicBest = payload.topicBest || state.topicBest;
    state.flashKnown = payload.flashKnown || state.flashKnown;
    state.coupons = payload.coupons || state.coupons;
    state.themeBossBeaten = payload.themeBossBeaten || state.themeBossBeaten;
    saveState();
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateTopbar();
  }

  function bumpStreak() {
    const today = new Date().toDateString();
    if (state.lastStudyDate === today) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    if (state.lastStudyDate === y.toDateString()) state.streak += 1;
    else state.streak = 1;
    state.lastStudyDate = today;
    saveState();
  }

  function updateTopbar() {
    document.getElementById("stat-xp").textContent = `${state.xp} XP`;
    const s = state.streak || 0;
    document.getElementById("stat-streak").textContent =
      `🔥 ${s} day${s === 1 ? "" : "s"}`;
    const bossEl = document.getElementById("stat-boss");
    const bossCount = Object.keys(state.themeBossBeaten || {}).filter(Boolean).length;
    if (bossEl) {
      bossEl.hidden = bossCount === 0;
      bossEl.textContent = bossCount ? `🏆 ${bossCount}` : "";
      bossEl.title = bossCount ? "Theme boss" + (bossCount > 1 ? "es" : "") + " beaten" : "";
    }
  }

  function topicIndex(id) {
    return manifest.findIndex((t) => t.id === id);
  }

  function isUnlocked(topicId) {
    const i = topicIndex(topicId);
    if (i < 0) return false;
    if (state.unlockAll) return true;
    if (i === 0) return true;
    const need = state.challengeMode ? 80 : PASS_PCT;
    const prev = manifest[i - 1].id;
    return (state.topicBest[prev] || 0) >= need;
  }

  function isBossUnlocked(themeId) {
    const ids = THEME_TOPIC_IDS[themeId];
    if (!ids) return false;
    return ids.every((id) => isUnlocked(id));
  }

  function renderHome() {
    bumpStreak();
    dock.hidden = true;
    const parts = [];
    let currentTheme = "";
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
      parts.push(
        `<button type="button" class="topic-card ${
          unlocked ? "unlocked" : ""
        }" data-topic="${escapeHtml(t.id)}" ${
          unlocked ? "" : "disabled"
        } title="${unlocked ? "" : "Locked — raise previous topic to 70% or enable Unlock all in settings"}">
          <span class="num">T${t.id}</span>
          <span class="title">${escapeHtml(t.title)}</span>
          ${badge}
        </button>`
      );
      const next = manifest[topicIndex(t.id) + 1];
      if (!next || next.theme !== currentTheme) parts.push("</div></div>");
    });
    const bossParts = [];
    [ "1", "2", "3" ].forEach((themeId) => {
      const beaten = state.themeBossBeaten && state.themeBossBeaten[themeId];
      const unlocked = isBossUnlocked(themeId);
      if (!unlocked && !beaten) return;
      const name = THEME_NAMES[themeId] || "Theme " + themeId;
      bossParts.push(
        `<button type="button" class="topic-card boss-card ${beaten ? "boss-beaten" : ""}" data-boss="${themeId}" ${beaten ? "disabled" : ""}>
          <span class="num">BOSS</span>
          <span class="title">${escapeHtml(name)}</span>
          <span class="badge">${beaten ? "🏆 Beaten" : "1 HP · fast timer · big XP"}</span>
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

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderMiniMarkdown(md) {
    if (md == null) return "";
    const raw = String(md);
    const safe = escapeHtml(raw);

    const inline = (s) =>
      s
        // Avoid breaking math like `$v=gt` by our `*italic*` / `**bold**` transforms.
        // We only apply inline markdown to non-math segments.
        .split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g)
        .map((seg) => {
          if (!seg) return seg;
          if (seg[0] === "$") return seg; // preserve math delimiters for KaTeX
          return seg
            // inline code
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            // bold
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            // italic (best-effort; avoids affecting strong because ** already handled)
            .replace(/\*([^*]+)\*/g, "<em>$1</em>");
        })
        .join("");

    const lines = safe.split(/\r?\n/);
    const parts = [];
    let inUl = false;

    for (const ln of lines) {
      const t = ln.trim();
      if (!t) {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push("<br/>");
        continue;
      }

      if (t === "***") {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<hr class="mini-divider" />`);
        continue;
      }

      const m = ln.match(/^\s*[-*]\s+(.*)$/);
      if (m) {
        if (!inUl) {
          parts.push("<ul class='mini-md'>");
          inUl = true;
        }
        parts.push(`<li>${inline(m[1])}</li>`);
      } else {
        if (inUl) {
          parts.push("</ul>");
          inUl = false;
        }
        parts.push(`<div>${inline(ln)}</div>`);
      }
    }

    if (inUl) parts.push("</ul>");
    return parts.join("");
  }

  function goTopic(id, tab) {
    route = { view: "topic", topicId: id, tab: tab || "cheat" };
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
    dock.hidden = false;
    dock.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === route.tab);
    });

    let body = "";
    if (route.tab === "cheat") body = renderCheat(t);
    else if (route.tab === "visual") body = renderVisuals(t);
    else if (route.tab === "flash") body = renderFlashPanel(t);
    else if (route.tab === "quiz") body = renderQuizPanel(t);
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

    // Typeset `$...$` / `$$...$$` using KaTeX (loaded by `subject.html`).
    // Retry briefly in case KaTeX auto-render hasn't finished loading yet.
    (function tryRenderMath(el, attempt) {
      if (
        typeof window.renderMathInElement === "function" &&
        el &&
        el.querySelector
      ) {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
        return;
      }
      if (attempt >= 20) return;
      setTimeout(() => tryRenderMath(el, attempt + 1), 50);
    })(document.getElementById("topic-panels") || main, 0);
  }

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
        <div class="flash-area"><div class="flash-card" id="flash-card"><div class="flash-face flash-front" id="flash-front"></div><div class="flash-face flash-back" id="flash-back"></div></div></div>
        <div class="flash-actions">
          <button type="button" class="btn danger-outline" id="flash-review">Need review</button>
          <button type="button" class="btn primary" id="flash-got">Got it ✓</button>
        </div>
      </div>`;
  }

  function renderQuizPanel(t) {
    return `
      <div class="panel active" data-panel="quiz">
        <div id="quiz-start-wrap">
          <p class="game-intro">Bank: ${t.quiz.length} MCQs · each round: ${Math.min(QUIZ_PER_ROUND, t.quiz.length)} random · timer · early wrong = health loss · 3 streak = combo.</p>
          <button type="button" class="btn primary" id="quiz-start">Start quiz</button>
        </div>
        <div id="quiz-play" hidden></div>
      </div>`;
  }

  function renderGamePanel(t) {
    const hasSeq = t.orderGame && t.orderGame.length;
    const hasTF = t.trueFalse && t.trueFalse.length >= 6;
    return `
      <div class="panel active" data-panel="game">
        <p class="game-intro">Match, order steps, or true/false drill.</p>
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
    if (route.tab === "game") bindGames(t);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startFlash(t) {
    const pool = shuffle(t.flashcards);
    const review = [];
    let idx = 0;
    const front = document.getElementById("flash-front");
    const back = document.getElementById("flash-back");
    const card = document.getElementById("flash-card");
    const prog = document.getElementById("flash-count");

    function show() {
      if (idx >= pool.length) {
        if (review.length) {
          pool.splice(0, pool.length, ...shuffle(review));
          review.length = 0;
          idx = 0;
        } else {
          front.textContent = "Deck cleared — open another tab or redo.";
          back.textContent = "Nice.";
          card.classList.remove("flipped");
          prog.textContent = "Done";
          return;
        }
      }
      const c = pool[idx];
      front.textContent = c.front;
      back.textContent = c.back;
      card.classList.remove("flipped");
      prog.textContent = `${idx + 1} / ${pool.length}`;
    }

    card.onclick = () => card.classList.toggle("flipped");
    document.getElementById("flash-got").onclick = () => {
      idx++;
      show();
    };
    document.getElementById("flash-review").onclick = () => {
      review.push(pool[idx]);
      idx++;
      show();
    };
    show();
  }

  function bindQuiz(t) {
    const start = document.getElementById("quiz-start");
    const wrap = document.getElementById("quiz-start-wrap");
    const play = document.getElementById("quiz-play");
    start.onclick = () => {
      wrap.hidden = true;
      play.hidden = false;
      runQuiz(t, play);
    };
  }

  function showExplain(title, body, then) {
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelSettings = document.getElementById("panel-settings");
    const panelShop = document.getElementById("panel-shop");
    panelSettings.hidden = true;
    if (panelShop) panelShop.hidden = true;
    document.getElementById("explain-title").textContent = title;
    document.getElementById("explain-body").textContent = body;
    panelExplain.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    const ok = document.getElementById("btn-explain-ok");
    const once = () => {
      ok.removeEventListener("click", once);
      panelExplain.hidden = true;
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      then();
    };
    ok.addEventListener("click", once);
  }

  function runQuiz(t, container, opts) {
    opts = opts || {};
    const isBoss = !!opts.boss;
    const healthMax = isBoss ? 1 : HEALTH_START;
    const questionMs = isBoss ? Math.round(QUESTION_MS * BOSS_QUESTION_MS_MULT) : QUESTION_MS;
    const pool = shuffle(t.quiz.map((q, i) => ({ ...q, _i: i })));
    const n = Math.min(QUIZ_PER_ROUND, pool.length);
    const qs = pool.slice(0, n);
    let qi = 0;
    let score = 0;
    let combo = 0;
    let health = healthMax;
    let timerId = null;
    let qStart = 0;

    function renderQ() {
      if (qi >= qs.length) {
        const pct = Math.round((score / (qs.length * 100)) * 100);
        const capped = Math.min(100, pct);
        if (!isBoss && t.id) {
          state.topicScores[t.id] = (state.topicScores[t.id] || 0) + 1;
          if ((state.topicBest[t.id] || 0) < capped)
            state.topicBest[t.id] = capped;
          state.xp += Math.round(capped * 2 + combo * 5);
        } else if (isBoss && opts.themeId) {
          state.themeBossBeaten = state.themeBossBeaten || {};
          state.themeBossBeaten[opts.themeId] = true;
          state.xp += BOSS_XP;
        }
        saveState();
        const bossMsg = isBoss ? `<p class="boss-reward">🏆 +${BOSS_XP} XP · Theme badge unlocked!</p>` : "";
        container.innerHTML = `
          <div class="game-win">
            <h3>${isBoss ? "Boss defeated!" : "Round complete"}</h3>
            <p>Score: ${score} · ~${capped}%${!isBoss && t.id ? " · Best saved: " + state.topicBest[t.id] + "%" : ""}</p>
            ${bossMsg}
            <button type="button" class="btn primary" id="quiz-again">${isBoss ? "Back to topics" : "Again"}</button>
          </div>`;
        document.getElementById("quiz-again").onclick = () => {
          container.innerHTML = "";
          if (isBoss) {
            route = { view: "home" };
            renderHome();
          } else {
            runQuiz(t, container);
          }
        };
        return;
      }

      const q = qs[qi];
      const opts = q.options.map((o, i) => ({ o, i }));
      shuffle(opts);
      container.innerHTML = `
        <div class="quiz-meta">
          <div class="timer-bar-wrap"><div class="timer-bar" id="q-timer"></div></div>
          <span class="combo" id="q-combo">${combo >= COMBO_AT ? "🔥 COMBO x" + COMBO_MULT : ""}</span>
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
        <div class="quiz-q">${escapeHtml(q.question)}</div>
        <div class="quiz-options" id="q-opts"></div>
        <div class="quiz-score-line">Points this round: ${score}</div>
      `;
      const bar = document.getElementById("q-timer");
      bar.style.transition = "none";
      bar.style.width = "100%";
      void bar.offsetWidth;
      bar.style.transition = `width ${questionMs}ms linear`;
      bar.style.width = "0%";
      qStart = Date.now();
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => finish(false, true), questionMs);

      const optEl = document.getElementById("q-opts");
      opts.forEach(({ o, i }) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "quiz-opt";
        b.textContent = o;
        b.dataset.idx = String(i);
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
      const opts = document.querySelectorAll(".quiz-opt");
      opts.forEach((b) => (b.disabled = true));
      if (timeout) {
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
        showExplain("Time's up", q.explanation, () => {
          combo = 0;
          qi++;
          renderQ();
        });
        return;
      }
      if (correct) {
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
        setTimeout(() => {
          qi++;
          renderQ();
        }, 450);
      } else {
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
          showExplain("Not quite", q.explanation, next);
        }
      }
    }

    renderQ();
  }

  function bindGames(t) {
    document.getElementById("game-match").onclick = () =>
      runMatchGame(t, document.getElementById("game-area"));
    const seqBtn = document.getElementById("game-seq");
    if (seqBtn)
      seqBtn.onclick = () =>
        runSequenceGame(t, document.getElementById("game-area"));
    const tfBtn = document.getElementById("game-tf");
    if (tfBtn)
      tfBtn.onclick = () =>
        runTrueFalseGame(t, document.getElementById("game-area"));
  }

  function runTrueFalseGame(t, area) {
    const pool = shuffle(t.trueFalse.slice()).slice(0, 10);
    let i = 0;
    let correct = 0;
    function show() {
      if (i >= pool.length) {
        const xp = correct * 3 + (correct === pool.length ? 15 : 0);
        state.xp += xp;
        saveState();
        area.innerHTML = `<div class="game-win"><h3>Round done</h3><p>${correct}/${pool.length} correct · +${xp} XP</p></div>`;
        return;
      }
      const item = pool[i];
      area.innerHTML = `
        <p class="tf-progress">${i + 1} / ${pool.length}</p>
        <p class="tf-statement">${escapeHtml(item.statement)}</p>
        <div class="tf-row">
          <button type="button" class="btn primary tf-pick" data-v="true">True</button>
          <button type="button" class="btn tf-pick" data-v="false">False</button>
        </div>
        <p class="tf-feedback" id="tf-feedback" hidden></p>
        <button type="button" class="btn" id="tf-next" hidden>Next</button>`;
      const fb = document.getElementById("tf-feedback");
      const next = document.getElementById("tf-next");
      area.querySelectorAll(".tf-pick").forEach((btn) => {
        btn.onclick = () => {
          const ans = btn.dataset.v === "true";
          const ok = ans === item.correct;
          if (ok) correct++;
          fb.hidden = false;
          fb.className = "tf-feedback " + (ok ? "tf-ok" : "tf-bad");
          fb.textContent = (ok ? "✓ " : "✗ ") + item.explain;
          area.querySelectorAll(".tf-pick").forEach((b) => (b.disabled = true));
          next.hidden = false;
        };
      });
      next.onclick = () => {
        i++;
        show();
      };
    }
    show();
  }

  function runMatchGame(t, area) {
    const cards = shuffle(t.flashcards).slice(0, 8);
    if (cards.length < 4) {
      area.innerHTML = "<p class='empty-state'>Need more flashcards.</p>";
      return;
    }
    const pairs = cards.slice(0, 8);
    const tiles = [];
    pairs.forEach((c, i) => {
      tiles.push({ id: `f${i}`, text: c.front, match: `b${i}` });
      tiles.push({ id: `b${i}`, text: c.back, match: `f${i}` });
    });
    shuffle(tiles);
    let sel = null;
    let matched = 0;
    area.innerHTML =
      '<div class="match-grid" id="match-grid"></div><p class="flash-progress" id="match-status"></p>';
    const grid = document.getElementById("match-grid");
    tiles.forEach((tile) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-tile";
      btn.textContent = tile.text.length > 60 ? tile.text.slice(0, 57) + "…" : tile.text;
      btn.dataset.id = tile.id;
      btn.dataset.match = tile.match;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("matched") || btn.disabled) return;
        if (!sel) {
          sel = btn;
          btn.classList.add("selected");
          return;
        }
        if (sel === btn) {
          sel.classList.remove("selected");
          sel = null;
          return;
        }
        if (sel.dataset.match === btn.dataset.id) {
          sel.classList.add("matched");
          btn.classList.add("matched");
          sel.classList.remove("selected");
          sel = null;
          matched += 2;
          if (matched === tiles.length) {
            state.xp += 25;
            saveState();
            document.getElementById("match-status").textContent =
              "Cleared! +25 XP";
          }
        } else {
          btn.classList.add("wrong-flash");
          sel.classList.add("wrong-flash");
          const s = sel;
          setTimeout(() => {
            btn.classList.remove("wrong-flash");
            s.classList.remove("selected", "wrong-flash");
          }, 400);
          sel = null;
        }
      });
      grid.appendChild(btn);
    });
  }

  function runSequenceGame(t, area) {
    let order = shuffle(t.orderGame.slice());
    area.innerHTML = `
      <p class="game-intro">Drag to reorder (tap two items to swap on mobile).</p>
      <div class="sequence-game" id="seq-list"></div>
      <button type="button" class="btn primary" id="seq-check">Check order</button>`;
    const list = document.getElementById("seq-list");

    function renderList() {
      list.innerHTML = "";
      list._tap = null;
      order.forEach((text, idx) => {
        const el = document.createElement("div");
        el.className = "seq-item";
        el.textContent = text;
        el.draggable = true;
        el.dataset.idx = idx;
        el.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", String(idx));
          list.classList.add("dragging");
        });
        el.addEventListener("dragend", () =>
          list.classList.remove("dragging")
        );
        el.addEventListener("dragover", (e) => e.preventDefault());
        el.addEventListener("drop", (e) => {
          e.preventDefault();
          const from = Number(e.dataTransfer.getData("text/plain"));
          const to = idx;
          const o = order.slice();
          const [x] = o.splice(from, 1);
          o.splice(to, 0, x);
          order = o;
          renderList();
        });
        el.addEventListener("click", () => {
          if (list._tap == null) {
            list._tap = idx;
            el.style.outline = "2px solid var(--accent)";
            return;
          }
          const a = list._tap;
          list._tap = null;
          list.querySelectorAll(".seq-item").forEach((x) => (x.style.outline = ""));
          if (a === idx) return;
          const o = order.slice();
          [o[a], o[idx]] = [o[idx], o[a]];
          order = o;
          renderList();
        });
        list.appendChild(el);
      });
    }
    renderList();
    document.getElementById("seq-check").onclick = () => {
      const ok = order.every((text, i) => text === t.orderGame[i]);
      if (ok) {
        state.xp += 40;
        saveState();
        area.innerHTML =
          '<div class="game-win"><h3>Perfect order</h3><p>+40 XP</p></div>';
      } else {
        alert(
          "Not yet — compare with Notes. Correct order matches the syllabus sequence."
        );
      }
    };
  }

  function startBossBattle(themeId) {
    const name = THEME_NAMES[themeId] || "Theme " + themeId;
    const ids = THEME_TOPIC_IDS[themeId];
    if (!ids || state.themeBossBeaten && state.themeBossBeaten[themeId]) return;
    main.innerHTML = `
      <div class="boss-intro">
        <h1>Boss: ${escapeHtml(name)}</h1>
        <p>1 HP · 20% faster timer · questions from all topics in this theme.</p>
        <p>Win to earn <strong>${BOSS_XP} XP</strong> and a permanent badge.</p>
        <button type="button" class="btn primary" id="boss-start">Start battle</button>
        <button type="button" class="btn" id="boss-cancel">Cancel</button>
      </div>
      <div id="boss-quiz-container" hidden></div>`;
    document.getElementById("boss-cancel").onclick = () => {
      route = { view: "home" };
      renderHome();
    };
    document.getElementById("boss-start").onclick = () => {
      document.querySelector(".boss-intro").hidden = true;
      const container = document.getElementById("boss-quiz-container");
      container.hidden = false;
      container.innerHTML = "<p class='empty-state'>Loading theme topics…</p>";
      Promise.all(ids.map((id) => loadTopicScript(id)))
        .then((topics) => {
          const allQuiz = topics.flatMap((t) => (t.quiz || []).map((q) => ({ ...q })));
          const synthetic = { id: "boss" + themeId, quiz: allQuiz };
          runQuiz(synthetic, container, { boss: true, themeId });
        })
        .catch(() => {
          container.innerHTML = "<p class='empty-state'>Failed to load topics.</p><button type='button' class='btn primary' id='boss-back'>Back</button>";
          document.getElementById("boss-back").onclick = () => renderHome();
        });
    };
  }

  function openShop() {
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelSettings = document.getElementById("panel-settings");
    if (!panelExplain.hidden) return;
    panelSettings.hidden = true;
    panelExplain.hidden = true;
    const panelShop = document.getElementById("panel-shop");
    panelShop.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    const rewards = window.SHOP_REWARDS || [];
    const list = document.getElementById("shop-rewards-list");
    list.innerHTML = rewards
      .map(
        (r) => `
        <div class="shop-item">
          <span class="shop-label">${escapeHtml(r.label)}</span>
          <span class="shop-xp">${r.xp} XP</span>
          <button type="button" class="btn primary shop-buy" data-id="${escapeHtml(r.id)}" data-xp="${r.xp}" data-label="${escapeHtml(r.label)}" ${state.xp < r.xp ? "disabled" : ""}>Buy</button>
        </div>`
      )
      .join("");
    list.querySelectorAll(".shop-buy").forEach((btn) => {
      btn.onclick = () => {
        const xp = Number(btn.dataset.xp);
        const label = btn.dataset.label;
        const id = btn.dataset.id;
        if (state.xp < xp) return;
        state.xp -= xp;
        state.coupons = state.coupons || [];
        state.coupons.push({ id, label, xp, date: new Date().toISOString().slice(0, 10) });
        saveState();
        openShop();
      };
    });
    const coupons = state.coupons || [];
    const couponsList = document.getElementById("shop-coupons-list");
    couponsList.innerHTML =
      coupons.length === 0
        ? "<p class='hint'>No coupons yet. Earn XP and buy a reward!</p>"
        : coupons
            .map(
              (c, i) =>
                `<div class="coupon-card">
                  <strong>${escapeHtml(c.label)}</strong>
                  <span class="coupon-xp">${c.xp} XP</span>
                  <span class="coupon-date">${c.date}</span>
                  <p class="coupon-hint">Show this to your parent to claim.</p>
                </div>`
            )
            .join("");
  }

  document.getElementById("btn-home").onclick = () => {
    // If we're running inside a subject shell (chemistry/physics), clicking the logo should
    // return to the subject picker (root index.html). If not, behave like "home".
    const isSubjectShell = !!window.SUBJECT_ID;
    if (isSubjectShell) {
      const to = window.SUBJECT_ID === "physics" ? "../index.html" : "index.html";
      window.location.href = to;
      return;
    }
    route = { view: "home" };
    renderHome();
  };

  document.getElementById("btn-shop").onclick = () => openShop();

  document.getElementById("btn-close-shop").onclick = () => {
    const root = document.getElementById("modal-root");
    document.getElementById("panel-shop").hidden = true;
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    if (route.view === "home") renderHome();
  };

  function bufToB64(buf) {
    let binary = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function b64ToBuf(b64) {
    const binary = atob(b64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  async function encryptPayload(password, json) {
    if (!window.crypto || !crypto.subtle) {
      // Fallback: base64 JSON, clearly tagged as plain
      return "v1-plain:" + bufToB64(new TextEncoder().encode(json));
    }
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(json)
    );
    return `v1:${bufToB64(salt.buffer)}:${bufToB64(iv.buffer)}:${bufToB64(cipher)}`;
  }

  async function decryptPayload(password, code) {
    if (code.startsWith("v1-plain:")) {
      const b64 = code.slice("v1-plain:".length);
      const buf = b64ToBuf(b64);
      return new TextDecoder().decode(buf);
    }
    const parts = code.split(":");
    if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Bad format");
    const salt = new Uint8Array(b64ToBuf(parts[1]));
    const iv = new Uint8Array(b64ToBuf(parts[2]));
    const data = b64ToBuf(parts[3]);
    if (!window.crypto || !crypto.subtle) throw new Error("Crypto not supported");
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    return new TextDecoder().decode(plainBuf);
  }

  async function handleExportProgress() {
    const pwd = document.getElementById("export-password").value.trim();
    const out = document.getElementById("export-output");
    const status = document.getElementById("sync-status");
    if (!pwd) {
      status.textContent = "Set a password first.";
      return;
    }
    try {
      const json = JSON.stringify(portableState());
      const code = await encryptPayload(pwd, json);
      out.value = code;
      status.textContent = "Exported. Copy the code and keep the password safe.";
    } catch (e) {
      status.textContent = "Export failed: " + e.message;
    }
  }

  async function handleImportProgress() {
    const pwd = document.getElementById("import-password").value.trim();
    const input = document.getElementById("import-input").value.trim();
    const status = document.getElementById("sync-status");
    if (!pwd || !input) {
      status.textContent = "Paste a code and enter the same password used for export.";
      return;
    }
    try {
      const json = await decryptPayload(pwd, input);
      const payload = JSON.parse(json);
      applyPortableState(payload);
      status.textContent = "Import OK. Progress updated.";
      updateTopbar();
      if (route.view === "home") renderHome();
    } catch (e) {
      status.textContent = "Import failed (wrong password or corrupted code).";
    }
  }

  const exportBtn = document.getElementById("btn-export-progress");
  if (exportBtn) exportBtn.onclick = () => { handleExportProgress(); };
  const importBtn = document.getElementById("btn-import-progress");
  if (importBtn) importBtn.onclick = () => { handleImportProgress(); };

  document.getElementById("btn-settings").onclick = () => {
    const panelExplain = document.getElementById("panel-explain");
    const panelShop = document.getElementById("panel-shop");
    if (!panelExplain.hidden) return;
    const root = document.getElementById("modal-root");
    if (panelShop) panelShop.hidden = true;
    document.getElementById("opt-unlock-all").checked = state.unlockAll;
    document.getElementById("opt-challenge").checked = state.challengeMode;
    document.getElementById("panel-settings").hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
  };

  document.getElementById("btn-close-settings").onclick = () => {
    state.unlockAll = document.getElementById("opt-unlock-all").checked;
    state.challengeMode = document.getElementById("opt-challenge").checked;
    saveState();
    const root = document.getElementById("modal-root");
    document.getElementById("panel-settings").hidden = true;
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    if (route.view === "home") renderHome();
  };

  dock.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      route.tab = b.dataset.tab;
      renderTopic();
    });
  });

  updateTopbar();
  renderHome();
})();
