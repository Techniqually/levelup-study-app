
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
        addXp(xp, {
          topicId: t.id,
          theme: t.theme,
          tab: "game",
          activityType: "game_tf",
          sourceId: `tf:${t.id}`,
          reason: "game_true_false_complete",
        });
        area.innerHTML = `<div class="game-win"><h3>Round done</h3><p>${correct}/${pool.length} correct · +${xp} XP</p></div>`;
        return;
      }
      const item = pool[i];
      area.innerHTML = `
        <p class="tf-progress">${i + 1} / ${pool.length}</p>
        <div class="tf-statement" id="tf-statement"></div>
        <div class="tf-row">
          <button type="button" class="btn primary tf-pick" data-v="true">True</button>
          <button type="button" class="btn tf-pick" data-v="false">False</button>
        </div>
        <div class="tf-feedback" id="tf-feedback" hidden></div>
        <button type="button" class="btn" id="tf-next" hidden>Next</button>`;
      const stEl = document.getElementById("tf-statement");
      stEl.innerHTML = renderMiniMarkdown(item.statement || "");
      renderMathWhenReady(stEl, 0);
      const fb = document.getElementById("tf-feedback");
      const next = document.getElementById("tf-next");
      area.querySelectorAll(".tf-pick").forEach((btn) => {
        btn.onclick = () => {
          const ans = btn.dataset.v === "true";
          const ok = ans === item.correct;
          if (ok) correct++;
          fb.hidden = false;
          fb.className = "tf-feedback " + (ok ? "tf-ok" : "tf-bad");
          fb.innerHTML = (ok ? "✓ " : "✗ ") + renderMiniMarkdown(item.explain || "");
          renderMathWhenReady(fb, 0);
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
    const isAdjacent = (a, b, cols) => {
      const ar = Math.floor(a / cols);
      const ac = a % cols;
      const br = Math.floor(b / cols);
      const bc = b % cols;
      return (ar === br && Math.abs(ac - bc) === 1) || (ac === bc && Math.abs(ar - br) === 1);
    };

    const adjacentPairCount = (arr, cols) => {
      const posById = {};
      arr.forEach((tile, idx) => {
        posById[tile.id] = idx;
      });
      let count = 0;
      const seen = new Set();
      arr.forEach((tile) => {
        const a = tile.id;
        const b = tile.match;
        const key = a < b ? `${a}|${b}` : `${b}|${a}`;
        if (seen.has(key)) return;
        seen.add(key);
        if (isAdjacent(posById[a], posById[b], cols)) count++;
      });
      return count;
    };

    // Optimize the shuffled layout to avoid adjacent answer pairs.
    // We score against both mobile (2 cols) and wider (3 cols) grid modes.
    let arranged = shuffle(tiles);
    let best = arranged;
    let bestScore = adjacentPairCount(best, 2) + adjacentPairCount(best, 3);
    for (let tries = 0; tries < 200 && bestScore > 0; tries++) {
      const cand = shuffle(tiles);
      const score = adjacentPairCount(cand, 2) + adjacentPairCount(cand, 3);
      if (score < bestScore) {
        best = cand;
        bestScore = score;
      }
      if (score === 0) {
        best = cand;
        bestScore = 0;
        break;
      }
    }
    arranged = best;
    let sel = null;
    let matched = 0;
    // Total-elapsed timer. Starts on first user interaction (to avoid punishing
    // a user who just opened the tab), stops when all pairs are matched. We
    // keep the timer purely cosmetic/motivational for now — no XP penalty.
    area.innerHTML = `
      <div class="match-header">
        <p class="flash-progress" id="match-status">Match the pairs</p>
        <div class="match-timer" id="match-timer" aria-live="polite">0:00</div>
      </div>
      <div class="match-grid" id="match-grid"></div>`;
    const grid = document.getElementById("match-grid");
    const timerEl = document.getElementById("match-timer");
    let startedAt = 0;
    let tickId = null;
    function fmtMMSS(ms) {
      const s = Math.max(0, Math.floor(ms / 1000));
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return m + ":" + (sec < 10 ? "0" : "") + sec;
    }
    function startTimer() {
      if (startedAt) return;
      startedAt = Date.now();
      tickId = setInterval(() => {
        timerEl.textContent = fmtMMSS(Date.now() - startedAt);
      }, 250);
    }
    function stopTimer() {
      if (tickId) { clearInterval(tickId); tickId = null; }
    }
    arranged.forEach((tile) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "match-tile";
      // Allow KaTeX on match tiles too (flashcard fronts/backs often carry
      // inline math like $F=ma$ for physics). We truncate rendered HTML via
      // CSS instead of substring so math doesn't get split mid-expression.
      btn.innerHTML = renderMiniMarkdown(String(tile.text || ""));
      renderMathWhenReady(btn, 0);
      btn.dataset.id = tile.id;
      btn.dataset.match = tile.match;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("matched") || btn.disabled) return;
        startTimer();
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
          if (matched === arranged.length) {
            stopTimer();
            const elapsedMs = startedAt ? Date.now() - startedAt : 0;
            addXp(25, {
              topicId: t.id,
              theme: t.theme,
              tab: "game",
              activityType: "game_match",
              sourceId: `match:${t.id}`,
              reason: "game_match_complete",
            });
            document.getElementById("match-status").textContent =
              `Cleared in ${fmtMMSS(elapsedMs)} · +25 XP`;
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
        el.innerHTML = renderMiniMarkdown(String(text || ""));
        renderMathWhenReady(el, 0);
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
        addXp(40, {
          topicId: t.id,
          theme: t.theme,
          tab: "game",
          activityType: "game_sequence",
          sourceId: `sequence:${t.id}`,
          reason: "game_sequence_complete",
        });
        area.innerHTML =
          '<div class="game-win"><h3>Perfect order</h3><p>+40 XP</p></div>';
      } else {
        alert(
          "Not yet — compare with Notes. Correct order matches the syllabus sequence."
        );
      }
    };
  }
