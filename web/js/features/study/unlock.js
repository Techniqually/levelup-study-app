
function isUnlocked(topicId) {
    const i = topicIndex(topicId);
    if (i < 0) return false;
    if (state.unlockAll) return true;
    if (i === 0) return true;
    const need = state.challengeMode ? 80 : PASS_PCT;
    const prev = manifest[i - 1].id;
    return (state.topicBest[prev] || 0) >= need;
  }

  function isBossUnlocked(themeKey) {
    const ids = themesByKey[themeKey];
    if (!ids || !ids.length) return false;
    return ids.every((id) => isUnlocked(id));
  }