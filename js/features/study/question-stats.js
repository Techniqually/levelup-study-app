
function touchQuestionStats(topicId, questionKey) {
    state.questionStats = state.questionStats || {};
    state.questionStats[topicId] = state.questionStats[topicId] || {};
    state.questionStats[topicId][questionKey] = {
      seen: 0,
      correct: 0,
      wrongs: 0,
      streak: 0,
      recentCorrectRun: 0,
      mastery: 0,
      masteredUntil: 0,
      lastSeenAt: 0,
      lastAskedAt: 0,
      lastCorrectAt: 0,
      lastWrongAt: 0,
      lastResult: null,
      ...(state.questionStats[topicId][questionKey] || {}),
    };
    return state.questionStats[topicId][questionKey];
  }

  function readQuestionStats(q, fallbackTopicId) {
    const topicId = getQuestionTopicId(q, fallbackTopicId);
    const questionKey = getQuestionKey(q, fallbackTopicId);
    const stats =
      (state.questionStats &&
        state.questionStats[topicId] &&
        state.questionStats[topicId][questionKey]) || {
        seen: 0,
        correct: 0,
        wrongs: 0,
        streak: 0,
        recentCorrectRun: 0,
        mastery: 0,
        masteredUntil: 0,
        lastSeenAt: 0,
        lastAskedAt: 0,
        lastCorrectAt: 0,
        lastWrongAt: 0,
        lastResult: null,
      };
    return { topicId, questionKey, stats };
  }

  function getQuestionBucket(stats) {
    if (!stats || stats.seen === 0) return "new";
    if (isCooldownActive(stats.masteredUntil)) return "mastered";
    if (
      stats.lastResult === "wrong" ||
      stats.lastResult === "timeout" ||
      stats.mastery < 40
    ) {
      return "weak";
    }
    if (stats.mastery >= 85 && stats.streak >= 3) return "mastered";
    if (stats.mastery >= 60) return "strong";
    return "improving";
  }

  function getQuestionPriority(stats) {
    let score = 50;
    if (!stats || stats.seen === 0) score += 60;
    score += Math.max(0, 60 - (stats ? stats.mastery : 0));
    if (stats && isCooldownActive(stats.masteredUntil)) score -= 100;
    if (stats && stats.lastResult === "wrong") score += 30;
    if (stats && stats.lastResult === "timeout") score += 35;
    if (stats && stats.lastSeenAt) {
      const staleMs = Date.now() - stats.lastSeenAt;
      if (staleMs > 1000 * 60 * 60 * 24 * 3) score += 10;
    }
    if (stats && stats.mastery >= 85 && stats.streak >= 3) score -= 35;
    return score;
  }


  function recordQuestionOutcome(q, fallbackTopicId, outcome, elapsedSec) {
    const topicId = getQuestionTopicId(q, fallbackTopicId);
    const questionKey = q.__questionKey || getQuestionKey(q, fallbackTopicId);
    const stats = touchQuestionStats(topicId, questionKey);
    const topic = touchTopicStats(topicId);
    stats.seen += 1;
    stats.lastSeenAt = Date.now();
    stats.lastAskedAt = Date.now();
    stats.lastResult = outcome;
    topic.lastStudiedAt = Date.now();
    topic.lastQuizAt = Date.now();
    topic.totalQuestionsSeen += 1;
    if (outcome === "correct") {
      stats.correct += 1;
      stats.streak += 1;
      stats.recentCorrectRun += 1;
      stats.lastCorrectAt = Date.now();
      let gain = 10 + Math.min(10, stats.streak * 2);
      if (elapsedSec <= QUESTION_MS / 1000 / 2) gain += 6;
      stats.mastery = Math.min(100, stats.mastery + gain);
      if (stats.mastery >= 85 && stats.recentCorrectRun >= 3) {
        stats.masteredUntil = Date.now() + QUESTION_MASTERY_COOLDOWN_MS;
      }
    } else if (outcome === "wrong") {
      stats.wrongs += 1;
      stats.streak = 0;
      stats.recentCorrectRun = 0;
      stats.masteredUntil = 0;
      stats.lastWrongAt = Date.now();
      stats.mastery = Math.max(0, stats.mastery - 18);
      topic.totalWrong += 1;
    } else if (outcome === "timeout") {
      stats.wrongs += 1;
      stats.streak = 0;
      stats.recentCorrectRun = 0;
      stats.masteredUntil = 0;
      stats.lastWrongAt = Date.now();
      stats.mastery = Math.max(0, stats.mastery - 24);
      topic.totalWrong += 1;
    }
    saveState();
  }

  function getQuestionConfidenceMeta(q, fallbackTopicId) {
    const info = readQuestionStats(q, fallbackTopicId);
    const stats = info.stats || {};
    const mastery = Math.max(0, Math.min(100, Math.round(stats.mastery || 0)));
    const bucket = getQuestionBucket(stats);
    let label = "Building";
    let reason = "Keep seeing this a little more until the pattern is stable.";
    let tone = "building";

    if (bucket === "new") {
      label = "New";
      tone = "new";
      reason = "This is still new, so it will come back a few times to build memory.";
    } else if (bucket === "weak") {
      label = "Needs practice";
      tone = "weak";
      if (stats.lastResult === "timeout") {
        reason = "This one is shown more often because time ran out recently.";
      } else {
        reason = "This one is shown more often because it was missed recently.";
      }
    } else if (bucket === "strong") {
      label = "Strong";
      tone = "strong";
      reason = "You usually get this right, so it should appear less often now.";
    } else if (bucket === "mastered") {
      label = "Mastered";
      tone = "mastered";
      reason = isCooldownActive(stats.masteredUntil)
        ? `Cooling down until ${formatShortDate(stats.masteredUntil)} because it has been answered correctly several times in a row.`
        : "This should appear only occasionally now for spaced review.";
    }

    return { mastery, label, reason, tone };
  }

