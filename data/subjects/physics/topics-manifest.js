window.__topicRegistry = window.__topicRegistry || {};
window.__registerTopic = function (topic) {
  window.__topicRegistry[topic.id] = topic;
};

window.TOPICS_MANIFEST = [
  {
    id: "p1",
    theme: "Theme 1: Measurement & Kinematics",
    title: "Kinematics (demo only)",
    file: "../data/subjects/physics/topic-01.js",
  },
];

