
  function normalizeQuestionText(s) {
    return String(s || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 180);
  }
  
  function getQuestionTopicId(q, fallbackTopicId) {
    return String((q && (q.__topicId || q.topicId)) || fallbackTopicId || "unknown");
  }

  function getQuestionKey(q, fallbackTopicId) {
    if (q && q.id != null) return String(q.id);
    return `${getQuestionTopicId(q, fallbackTopicId)}::${normalizeQuestionText(
      q && q.question
    )}`;
  }
