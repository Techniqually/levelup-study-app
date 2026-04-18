
function annotateQuizBank(bank, fallbackTopicId) {
    return bank.map((q, i) => {
      const enriched = { ...q, __topicId: q.__topicId || fallbackTopicId, _i: i };
      const info = readQuestionStats(enriched, fallbackTopicId);
      return {
        q: enriched,
        topicId: info.topicId,
        questionKey: info.questionKey,
        stats: info.stats,
        bucket: getQuestionBucket(info.stats),
        priority: getQuestionPriority(info.stats),
      };
    });
  }


  function getTopicQuizBank(t) {
    const base = Array.isArray(t.quiz) ? t.quiz : [];
    const byTopic = window.EXTRA_QUIZ_BY_TOPIC || {};
    const extra = Array.isArray(byTopic[String(t.id)]) ? byTopic[String(t.id)] : [];
    return base.concat(extra).map((q) => ({ ...q, __topicId: q.__topicId || t.id }));
  }

  function getThemeExtraQuiz(themeKey) {
    const byTheme = window.EXTRA_THEME_QUIZ || {};
    if (Array.isArray(byTheme[themeKey])) return byTheme[themeKey];
    const norm = String(themeKey || "").trim().toLowerCase();
    const hitKey = Object.keys(byTheme).find(
      (k) => String(k).trim().toLowerCase() === norm
    );
    return hitKey && Array.isArray(byTheme[hitKey]) ? byTheme[hitKey] : [];
  }

  function getTopicQuizInsights(t) {
    const annotated = annotateQuizBank(getTopicQuizBank(t), t.id);
    const topicStats = touchTopicStats(t.id);
    const weakCount = annotated.filter((item) => item.bucket === "weak").length;
    const unseenCount = annotated.filter((item) => item.bucket === "new").length;
    const masteredCount = annotated.filter(
      (item) => item.bucket === "mastered"
    ).length;
    const coolingCount = annotated.filter((item) =>
      isCooldownActive(item.stats.masteredUntil)
    ).length;
    const avgMastery = annotated.length
      ? annotated.reduce(
          (sum, item) => sum + (item.stats.mastery || 0),
          0
        ) / annotated.length
      : 0;
    const freshEligible = annotated.filter(
      (item) =>
        item.bucket === "new" ||
        item.bucket === "weak" ||
        item.bucket === "improving"
    ).length;
    const exhaustedShare = annotated.length
      ? (annotated.length - freshEligible) / annotated.length
      : 0;
    let label = "New";
    if (annotated.some((item) => item.stats.seen > 0)) {
      label = "Improving";
      if (avgMastery >= 85) label = "Mastered";
      else if (avgMastery >= 60) label = "Strong";
    }
    return {
      total: annotated.length,
      weakCount,
      unseenCount,
      masteredCount,
      coolingCount,
      avgMastery,
      freshEligible,
      exhaustedShare,
      label,
      topicMasteredUntil: topicStats.masteredUntil || 0,
      topicXpLockUntil: topicStats.xpLockUntil || 0,
    };
  }

  function pickAdaptiveQuestions(t, opts) {
    opts = opts || {};
    const annotated = annotateQuizBank(getTopicQuizBank(t), t.id);
    const topicStats = touchTopicStats(t.id);
    if (!opts.review && isCooldownActive(topicStats.masteredUntil)) {
      return [];
    }
    const eligible = opts.review
      ? annotated
      : annotated.filter((item) => !isCooldownActive(item.stats.masteredUntil));
    const n = Math.min(QUIZ_PER_ROUND, eligible.length);
    const rank = (items) =>
      items
        .map((item) => ({ ...item, _rand: Math.random() }))
        .sort((a, b) => b.priority - a.priority || a._rand - b._rand);
    const weak = rank(eligible.filter((item) => item.bucket === "weak"));
    const fresh = rank(eligible.filter((item) => item.bucket === "new"));
    const normal = rank(
      eligible.filter(
        (item) => item.bucket === "improving" || item.bucket === "strong"
      )
    );
    const mastered = rank(
      eligible.filter((item) => item.bucket === "mastered")
    );

    if (opts.review) {
      const reviewPool = weak.length
        ? weak
        : normal.length
          ? normal
          : rank(annotated);
      return reviewPool.slice(0, Math.min(n, reviewPool.length)).map((item) => ({
        ...item.q,
        __questionKey: item.questionKey,
      }));
    }

    const selected = [];
    const used = new Set();
    const takeFrom = (items, count) => {
      for (const item of items) {
        if (selected.length >= n || count <= 0) break;
        if (used.has(item.questionKey)) continue;
        used.add(item.questionKey);
        selected.push({ ...item.q, __questionKey: item.questionKey });
        count--;
      }
    };

    takeFrom(weak, Math.min(6, weak.length));
    takeFrom(fresh, Math.min(5, fresh.length));
    takeFrom(normal, Math.max(0, n - selected.length - Math.min(2, mastered.length)));
    takeFrom(mastered, Math.min(2, mastered.length));
    takeFrom(rank(eligible), n - selected.length);

    return selected;
  }
