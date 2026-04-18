function renderQuestionConfidenceHtml(q, fallbackTopicId) {
    const meta = getQuestionConfidenceMeta(q, fallbackTopicId);
    return `
      <div class="question-confidence ${meta.tone}">
        <div class="question-confidence-head">
          <span class="question-confidence-label">${escapeHtml(meta.label)}</span>
          <span class="question-confidence-pct">${meta.mastery}%</span>
        </div>
        <div class="question-confidence-bar"><div class="question-confidence-fill" style="width:${meta.mastery}%"></div></div>
        <div class="question-confidence-reason">${escapeHtml(meta.reason)}</div>
      </div>`;
  }
