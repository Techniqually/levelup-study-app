
function showExplain(title, body, then, note, llmWhyPayload) {
    if (window.LevelupLlmQuizWhy && typeof window.LevelupLlmQuizWhy.prepareExplainModal === "function") {
      window.LevelupLlmQuizWhy.prepareExplainModal(null);
    }
    const root = document.getElementById("modal-root");
    const panelExplain = document.getElementById("panel-explain");
    const panelShop = document.getElementById("panel-shop");
    if (panelShop) panelShop.hidden = true;
    document.getElementById("explain-title").textContent = title;
    const explainBody = document.getElementById("explain-body");
    explainBody.innerHTML = `${renderMiniMarkdown(body)}${
      note ? `<span class="explain-note">${escapeHtml(note)}</span>` : ""
    }`;
    renderMathWhenReady(explainBody, 0);
    if (window.LevelupLlmQuizWhy && typeof window.LevelupLlmQuizWhy.prepareExplainModal === "function") {
      window.LevelupLlmQuizWhy.prepareExplainModal(llmWhyPayload || null);
    }
    panelExplain.hidden = false;
    root.hidden = false;
    root.setAttribute("aria-hidden", "false");
    const ok = document.getElementById("btn-explain-ok");
    const once = () => {
      ok.removeEventListener("click", once);
      if (window.LevelupLlmQuizWhy && typeof window.LevelupLlmQuizWhy.prepareExplainModal === "function") {
        window.LevelupLlmQuizWhy.prepareExplainModal(null);
      }
      panelExplain.hidden = true;
      closeModalRoot(root);
      then();
    };
    ok.addEventListener("click", once);
  }

  function closeModalRoot(root) {
    if (!root) return;
    const active = document.activeElement;
    if (active && root.contains(active) && typeof active.blur === "function") {
      active.blur();
    }
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
  }

