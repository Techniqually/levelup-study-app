(function () {
  // Storage-native key; runtime signs this into a Supabase URL.
  const img = (filename) => "chemistry/images/" + filename;

  const imagesByTopic = {
    "1": [
      {
        image: img("matter-01-experimental-design.jpg"),
        caption: "Experimental Design",
        infoKey: "matter-01-experimental-design.jpg",
      },
    ],
    "2": [
      {
        image: img("matter-02-purification.jpg"),
        caption: "Methods of Purification and Analysis",
        infoKey: "matter-02-purification.jpg",
      },
    ],
    "3": [
      {
        image: img("matter-03-kinetic-theory.jpg"),
        caption: "Kinetic Particle Theory",
        infoKey: "matter-03-kinetic-theory.jpg",
      },
    ],
    "4": [
      {
        image: img("matter-04-atomic-structure.jpg"),
        caption: "Atomic Structure",
        infoKey: "matter-04-atomic-structure.jpg",
      },
    ],
    "5": [
      {
        image: img("matter-05-Bonding.jpg"),
        caption: "Chemical Bonding and Structure",
        infoKey: "matter-05-Bonding.jpg",
      },
    ],
    "6": [
      {
        image: img("reactions-01-calculations.jpg"),
        caption: "Chemical Calculations",
        infoKey: "reactions-01-calculations.jpg",
      },
    ],
    "7": [
      {
        image: img("reactions-02-acids-bases.jpg"),
        caption: "Acids and Bases",
        infoKey: "reactions-02-acids-bases.jpg",
      },
    ],
    "8": [
      {
        image: img("reactions-03-salts.jpg"),
        caption: "Salts",
        infoKey: "reactions-03-salts.jpg",
      },
    ],
    "9": [
      {
        image: img("reactions-04-ammonia.jpg"),
        caption: "Ammonia",
        infoKey: "reactions-04-ammonia.jpg",
      },
    ],
    "10": [
      {
        image: img("reactions-05-qualitative-analysis.jpg"),
        caption: "Qualitative Analysis",
        infoKey: "reactions-05-qualitative-analysis.jpg",
      },
    ],
    "11": [
      {
        image: img("reactions-06-redox.jpg"),
        caption: "Redox Chemistry",
        infoKey: "reactions-06-redox.jpg",
      },
    ],
    "12": [
      {
        image: img("reactions-07-electrochemistry.jpg"),
        caption: "Electrochemistry",
        infoKey: "reactions-07-electrochemistry.jpg",
      },
    ],
    "13": [
      {
        image: img("reactions-08-periodic-table.jpg"),
        caption: "Periodic Table",
        infoKey: "reactions-08-periodic-table.jpg",
      },
    ],
    "14": [
      {
        image: img("reactions-09-reactivity-series.jpg"),
        caption: "Reactivity Series",
        infoKey: "reactions-09-reactivity-series.jpg",
      },
    ],
    "15": [
      {
        image: img("reactions-10-energetics.jpg"),
        caption: "Energetics",
        infoKey: "reactions-10-energetics.jpg",
      },
    ],
    "16": [
      {
        image: img("reactions-11-rates.jpg"),
        caption: "Rate of Reactions",
        infoKey: "reactions-11-rates.jpg",
      },
    ],
    "17": [
      {
        image: img("sustainable-01-organic.jpg"),
        caption: "Organic Chemistry",
        infoKey: "sustainable-01-organic.jpg",
      },
    ],
    "18": [
      {
        image: img("sustainable-02-polymers.jpg"),
        caption: "Polymers",
        infoKey: "sustainable-02-polymers.jpg",
      },
    ],
    "19": [
      {
        image: img("sustainable-03-air-qualityjpg.jpg"),
        caption: "Air Quality",
        infoKey: "sustainable-03-air-qualityjpg.jpg",
      },
    ],

  };

  window.SUBJECT_INFOS_BY_TOPIC = window.SUBJECT_INFOS_BY_TOPIC || {};
  window.SUBJECT_INFOS_BY_TOPIC = imagesByTopic;
})();

