
function getSuggestedNextTopics(currentTopicId, limit) {
    const currentMeta = getTopicMeta(currentTopicId);
    const unlocked = manifest.filter(
      (m) => String(m.id) !== String(currentTopicId) && isUnlocked(m.id)
    );
    const prioritized = unlocked.sort((a, b) => {
      const aStats = touchTopicStats(a.id);
      const bStats = touchTopicStats(b.id);
      const aMastery = Number(aStats.mastery || 0);
      const bMastery = Number(bStats.mastery || 0);
      const aSeen = Number(aStats.totalQuestionsSeen || 0);
      const bSeen = Number(bStats.totalQuestionsSeen || 0);
      const aTheme = currentMeta && a.theme === currentMeta.theme ? 1 : 0;
      const bTheme = currentMeta && b.theme === currentMeta.theme ? 1 : 0;
      return (
        aTheme - bTheme ||
        aMastery - bMastery ||
        aSeen - bSeen ||
        String(a.id).localeCompare(String(b.id))
      );
    });
    return prioritized.slice(0, Math.max(1, Number(limit || 3)));
  }
