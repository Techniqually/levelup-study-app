
function getTopicMeta(topicId) {
    return manifest.find((m) => String(m.id) === String(topicId)) || null;
  }

  function topicIndex(id) {
    return manifest.findIndex((t) => t.id === id);
  }
