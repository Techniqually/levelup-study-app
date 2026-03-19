window.__topicRegistry = window.__topicRegistry || {};
window.__registerTopic = function (topic) {
  window.__topicRegistry[topic.id] = topic;
};

window.TOPICS_MANIFEST = [
  // Section I: Measurement
  { id: "1", theme: "Section I: Measurement", title: "Physical Quantities, Units and Measurement", file: "data/subjects/physics/theme1-measurement/topic01.js" },

  // Section II: Newtonian Mechanics
  { id: "2", theme: "Section II: Newtonian Mechanics", title: "Kinematics", file: "data/subjects/physics/theme2-mechanics/topic-02.js" },
  { id: "3A", theme: "Section II: Newtonian Mechanics", title: "Force and Pressure I", file: "data/subjects/physics/theme2-mechanics/topic-03a.js" },
  { id: "3B", theme: "Section II: Newtonian Mechanics", title: "Force and Pressure II", file: "data/subjects/physics/theme2-mechanics/topic-03b.js" },
  { id: "4", theme: "Section II: Newtonian Mechanics", title: "Dynamics", file: "data/subjects/physics/theme2-mechanics/topic-04.js" },
  { id: "5", theme: "Section II: Newtonian Mechanics", title: "Turning Effects of Forces", file: "data/subjects/physics/theme2-mechanics/topic-05.js" },
  { id: "6", theme: "Section II: Newtonian Mechanics", title: "Energy", file: "data/subjects/physics/theme2-mechanics/topic-06.js" },

  // Section III: Thermal Physics
  { id: "7A", theme: "Section III: Thermal Physics", title: "Kinetic Particle Model of Matter I", file: "data/subjects/physics/theme3-thermal/topic-07a.js" },
  { id: "7B", theme: "Section III: Thermal Physics", title: "Kinetic Particle Model of Matter II", file: "data/subjects/physics/theme3-thermal/topic-07b.js" },
  { id: "8", theme: "Section III: Thermal Physics", title: "Thermal Processes", file: "data/subjects/physics/theme3-thermal/topic-08.js" },

  // Section IV: Waves
  { id: "9A", theme: "Section IV: Waves", title: "General Properties of Waves I", file: "data/subjects/physics/theme4-waves/topic-09a.js" },
  { id: "9B", theme: "Section IV: Waves", title: "General Properties of Waves II (Sound)", file: "data/subjects/physics/theme4-waves/topic-09b.js" },
  { id: "10", theme: "Section IV: Waves", title: "Electromagnetic Spectrum", file: "data/subjects/physics/theme4-waves/topic-10.js" },
  { id: "11A", theme: "Section IV: Waves", title: "Light I (Reflection)", file: "data/subjects/physics/theme4-waves/topic-11a.js" },
  { id: "11B", theme: "Section IV: Waves", title: "Light II (Refraction)", file: "data/subjects/physics/theme4-waves/topic-11b.js" },
  { id: "11C", theme: "Section IV: Waves", title: "Light III (Thin Converging Lenses)", file: "data/subjects/physics/theme4-waves/topic-11c.js" },

  // Section V: Electricity and Magnetism
  { id: "12", theme: "Section V: Electricity and Magnetism", title: "Electric Charge and Current of Electricity", file: "data/subjects/physics/theme5-electricitymagnetism/topic-12.js" },
  { id: "13", theme: "Section V: Electricity and Magnetism", title: "D.C. Circuits", file: "data/subjects/physics/theme5-electricitymagnetism/topic-13.js" },
  { id: "14", theme: "Section V: Electricity and Magnetism", title: "Practical Electricity", file: "data/subjects/physics/theme5-electricitymagnetism/topic-14.js" },
  { id: "15", theme: "Section V: Electricity and Magnetism", title: "Magnetism and Electromagnetism", file: "data/subjects/physics/theme5-electricitymagnetism/topic-15.js" },

  // Section VI: Radioactivity
  { id: "16", theme: "Section VI: Radioactivity", title: "Radioactivity", file: "data/subjects/physics/theme6-radioactivity/topic-16.js" },
];

