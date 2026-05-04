(function () {
  // Build absolute URLs so the shell can live anywhere (root vs /physics/).
  const img = (filename) =>
    new URL(
      "data/subjects/chemistry/images/" + filename,
      window.location.href
    ).toString();

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
      {
        image: img("topic-04-infographic.png"),
        caption: "Atomic Structure Infographic",
        infoKey: "topic-04-infographic.png",
      },
    ],
    "5": [
      {
        image: img("matter-05-Bonding.jpg"),
        caption: "Chemical Bonding and Structure",
        infoKey: "matter-05-Bonding.jpg",
      },
      {
        image: img("topic-05-1-infographic.png"),
        caption: "Chemical Bonding Infographic",
        infoKey: "topic-05-1-infographic.png",
      },
      {
        image: img("topic-05-2-infographic.png"),
        caption: "Structure and properties of materials",
        infoKey: "topic-05-2-infographic.png",
      }
    ],
    "6": [
      {
        image: img("reactions-01-calculations.jpg"),
        caption: "Chemical Calculations",
        infoKey: "reactions-01-calculations.jpg",
      },
      {
        image: img("topic-06-1-infographic.png"),
        caption: "Chemical Calculations Infographic",
        infoKey: "topic-06-1-infographic.png",
      },
      {
        image: img("topic-06-2-infographic.png"),
        caption: "Moles and Stoichiometry Infographic",
        infoKey: "topic-06-2-infographic.png",
      },
    ],
    "7": [
      {
        image: img("reactions-02-acids-bases.jpg"),
        caption: "Acids and Bases",
        infoKey: "reactions-02-acids-bases.jpg",
      },
      {
        image: img("topic-07-infographic.png"),
        caption: "Acids and Bases Infographic",
        infoKey: "topic-07-infographic.png",
      }
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
      {
        image: img("topic-10-infographic.png"),
        caption: "Qualitative Analysis Infographic",
        infoKey: "topic-10-infographic.png",
      }
    ],
    "11": [
      {
        image: img("reactions-06-redox.jpg"),
        caption: "Redox Chemistry",
        infoKey: "reactions-06-redox.jpg",
      },
      {
        image: img("topic-11-infographic.png"),
        caption: "Oxidation and Reduction Infographic",
        infoKey: "topic-11-infographic.png",
      }
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
      {
        image: img("chemistry-periodic-table-pic.png"),
        caption: "Periodic Table",
        infoKey: "chemistry-periodic-table-pic.png",
      },
      {
        image: img("topic-13-infographic.png"),
        caption: "Periodic Table Trends Infographic",
        infoKey: "topic-13-infographic.png",
      }
    ],
    "14": [
      {
        image: img("reactions-09-reactivity-series.jpg"),
        caption: "Reactivity Series",
        infoKey: "reactions-09-reactivity-series.jpg",
      },
      {
        image: img("topic-14-infographic.png"),
        caption: "Reactivity Series Infographic",
        infoKey: "topic-14-infographic.png",
      }
    ],
    "15": [
      {
        image: img("reactions-10-energetics.jpg"),
        caption: "Energetics",
        infoKey: "reactions-10-energetics.jpg",
      },
      {
        image: img("topic-15-infographic.png"),
        caption: "Energetics Infographic",
        infoKey: "topic-15-infographic.png",
      }
    ],
    "16": [
      {
        image: img("reactions-11-rates.jpg"),
        caption: "Rate of Reactions",
        infoKey: "reactions-11-rates.jpg",
      },
      {
        image: img("topic-16-infographic.png"),
        caption: "Rate of Reactions Infographic",
        infoKey: "topic-16-infographic.png",
      }
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

