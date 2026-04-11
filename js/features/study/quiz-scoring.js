
function getRepeatAttemptMultiplier(meta) {
    if (!meta || meta.topicId == null) return 1;
    const activity = String((meta && meta.activityType) || "");
    if (!activity.startsWith("quiz")) return 1;
    const topicId = String(meta.topicId);
    const recentTopicXp = sumRecentXpBy(
      (entry) =>
        String(entry.topicId || "") === topicId &&
        String(entry.activityType || "").startsWith("quiz"),
      1000 * 60 * 60
    );
    if (recentTopicXp >= 120) return 0.2;
    if (recentTopicXp >= 60) return 0.5;
    return 1;
  }
  
  function getQuestionXpMeta(bucket, opts) {
    opts = opts || {};
    const isReview = !!opts.review;
    const cooled = !!opts.cooled;
    if (cooled) {
      return {
        delta: 1,
        reason: isReview
          ? "quiz_correct_mastered_review_reduced"
          : "quiz_correct_mastered_reduced",
      };
    }
    if (bucket === "new") return { delta: 10, reason: "quiz_correct_new" };
    if (bucket === "weak") {
      return {
        delta: isReview ? 12 : 11,
        reason: isReview
          ? "quiz_correct_weak_review"
          : "quiz_correct_weak_recovered",
      };
    }
    if (bucket === "improving") {
      return { delta: isReview ? 5 : 7, reason: "quiz_correct_improving" };
    }
    if (bucket === "strong") {
      return {
        delta: isReview ? 3 : 4,
        reason: isReview ? "quiz_correct_strong_review" : "quiz_correct_strong",
      };
    }
    return { delta: isReview ? 2 : 2, reason: "quiz_correct_mastered_reduced" };
  }
