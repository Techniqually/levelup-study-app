/** Topic content lives under data/subjects/chemistry/theme*-* */
window.__topicRegistry = window.__topicRegistry || {};
window.__registerTopic = function (topic) {
  window.__topicRegistry[topic.id] = topic;
};

window.TOPICS_MANIFEST = [
  { id: "1", theme: "Theme 1: Matter – Structures & Properties", title: "Experimental Design", file: "data/subjects/chemistry/theme1-matter/topic-01.js", free: true },
  { id: "2", theme: "Theme 1: Matter – Structures & Properties", title: "Methods of Purification and Analysis", file: "data/subjects/chemistry/theme1-matter/topic-02.js" },
  { id: "3", theme: "Theme 1: Matter – Structures & Properties", title: "Kinetic Particle Theory", file: "data/subjects/chemistry/theme1-matter/topic-03.js" },
  { id: "4", theme: "Theme 1: Matter – Structures & Properties", title: "Atomic Structure", file: "data/subjects/chemistry/theme1-matter/topic-04.js" },
  { id: "5", theme: "Theme 1: Matter – Structures & Properties", title: "Chemical Bonding and Structure", file: "data/subjects/chemistry/theme1-matter/topic-05.js" },
  { id: "6", theme: "Theme 2: Chemical Reactions", title: "Chemical Calculations", file: "data/subjects/chemistry/theme2-reactions/topic-06.js" },
  { id: "7", theme: "Theme 2: Chemical Reactions", title: "Acids and Bases", file: "data/subjects/chemistry/theme2-reactions/topic-07.js" },
  { id: "8", theme: "Theme 2: Chemical Reactions", title: "Salts", file: "data/subjects/chemistry/theme2-reactions/topic-08.js" },
  { id: "9", theme: "Theme 2: Chemical Reactions", title: "Ammonia", file: "data/subjects/chemistry/theme2-reactions/topic-09.js" },
  { id: "10", theme: "Theme 2: Chemical Reactions", title: "Qualitative Analysis", file: "data/subjects/chemistry/theme2-reactions/topic-10.js" },
  { id: "11", theme: "Theme 2: Chemical Reactions", title: "Redox Chemistry", file: "data/subjects/chemistry/theme2-reactions/topic-11.js" },
  { id: "12", theme: "Theme 2: Chemical Reactions", title: "Electrochemistry", file: "data/subjects/chemistry/theme2-reactions/topic-12.js" },
  { id: "13", theme: "Theme 2: Chemical Reactions", title: "Patterns in the Periodic Table", file: "data/subjects/chemistry/theme2-reactions/topic-13.js" },
  { id: "14", theme: "Theme 2: Chemical Reactions", title: "Reactivity Series of Metals", file: "data/subjects/chemistry/theme2-reactions/topic-14.js" },
  { id: "15", theme: "Theme 2: Chemical Reactions", title: "Chemical Energetics", file: "data/subjects/chemistry/theme2-reactions/topic-15.js" },
  { id: "16", theme: "Theme 2: Chemical Reactions", title: "Rate of Reactions", file: "data/subjects/chemistry/theme2-reactions/topic-16.js" },
  { id: "17", theme: "Theme 3: Chemistry in a Sustainable World", title: "Alkanes, Alkenes, Alcohols, Acids, Esters", file: "data/subjects/chemistry/theme3-sustainable/topic-17.js" },
  { id: "18", theme: "Theme 3: Chemistry in a Sustainable World", title: "Polymers", file: "data/subjects/chemistry/theme3-sustainable/topic-18.js" },
  { id: "19", theme: "Theme 3: Chemistry in a Sustainable World", title: "Maintaining Air Quality", file: "data/subjects/chemistry/theme3-sustainable/topic-19.js" },
];
