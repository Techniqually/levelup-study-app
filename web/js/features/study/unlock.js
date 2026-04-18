
function isUnlocked(topicId) {
    const i = topicIndex(topicId);
    if (i < 0) return false;
    // Topics are always unlocked inside a subject the user is entitled to;
    // the entitlement gate lives at `subject-config.js` (not here).
    return true;
  }

  function isBossUnlocked(themeKey) {
    const ids = themesByKey[themeKey];
    if (!ids || !ids.length) return false;
    return ids.every((id) => isUnlocked(id));
  }