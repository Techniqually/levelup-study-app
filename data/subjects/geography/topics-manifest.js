window.__topicRegistry = window.__topicRegistry || {};
window.__registerTopic = function (topic) {
  window.__topicRegistry[topic.id] = topic;
};

window.TOPICS_MANIFEST = [
  // Cluster 1: Geography in Everyday Life
  { id: "1.1", theme: "Cluster 1: Geography in Everyday Life", title: "Thinking Geographically", file: "data/subjects/geography/cluster1-everyday/topic-1-1.js" },
  { id: "1.2", theme: "Cluster 1: Geography in Everyday Life", title: "Sustainable Development", file: "data/subjects/geography/cluster1-everyday/topic-1-2.js" },
  { id: "1.3", theme: "Cluster 1: Geography in Everyday Life", title: "Geographical Methods", file: "data/subjects/geography/cluster1-everyday/topic-1-3.js" },

  // Cluster 2: Tourism
  { id: "2.1", theme: "Cluster 2: Tourism", title: "Tourism Activity", file: "data/subjects/geography/cluster2-tourism/topic-2-1.js" },
  { id: "2.2", theme: "Cluster 2: Tourism", title: "Tourism Development", file: "data/subjects/geography/cluster2-tourism/topic-2-2.js" },
  { id: "2.3", theme: "Cluster 2: Tourism", title: "Sustainable Tourism Development", file: "data/subjects/geography/cluster2-tourism/topic-2-3.js" },

  // Cluster 3: Climate
  { id: "3.1", theme: "Cluster 3: Climate", title: "Weather and Climate", file: "data/subjects/geography/cluster3-climate/topic-3-1.js" },
  { id: "3.2", theme: "Cluster 3: Climate", title: "Climate Change", file: "data/subjects/geography/cluster3-climate/topic-3-2.js" },
  { id: "3.3", theme: "Cluster 3: Climate", title: "Climate Action", file: "data/subjects/geography/cluster3-climate/topic-3-3.js" },

  // Cluster 4: Tectonics
  { id: "4.1", theme: "Cluster 4: Tectonics", title: "Plate Tectonics", file: "data/subjects/geography/cluster4-tectonics/topic-4-1.js" },
  { id: "4.2", theme: "Cluster 4: Tectonics", title: "Earthquakes and Volcanoes", file: "data/subjects/geography/cluster4-tectonics/topic-4-2.js" },
  { id: "4.3", theme: "Cluster 4: Tectonics", title: "Disaster Risk Management", file: "data/subjects/geography/cluster4-tectonics/topic-4-3.js" },

  // Cluster 5: Singapore
  { id: "5.1", theme: "Cluster 5: Singapore", title: "Small Island City-State", file: "data/subjects/geography/cluster5-singapore/topic-5-1.js" },
  { id: "5.2", theme: "Cluster 5: Singapore", title: "Challenges and Opportunities", file: "data/subjects/geography/cluster5-singapore/topic-5-2.js" },
  { id: "5.3", theme: "Cluster 5: Singapore", title: "Sustainable and Resilient Singapore", file: "data/subjects/geography/cluster5-singapore/topic-5-3.js" },
];
