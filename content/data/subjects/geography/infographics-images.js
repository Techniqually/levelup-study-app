(function () {
  // Storage-native key; runtime signs this into a Supabase URL.
  const img = (filename) => "geography/images/" + filename;

  const imagesByTopic = {
    "1.1": [
      {
        image: img("everyday-1-1-thinking-geographically.png"),
        caption: "Thinking Geographically",
        infoKey: "everyday-1-1-thinking-geographically.png",
      },
    ],
    "1.2": [
      {
        image: img("everyday-1-2-sustainable-development.png"),
        caption: "Sustainable Development",
        infoKey: "everyday-1-2-sustainable-development.png",
      },
    ],
    "1.3": [
      {
        image: img("everyday-1-3-geographical-methods.png"),
        caption: "Geographical Methods & Fieldwork",
        infoKey: "everyday-1-3-geographical-methods.png",
      },
    ],
    "2.1": [
      {
        image: img("tourism-2-1-tourism-activity.png"),
        caption: "Tourism Activity",
        infoKey: "tourism-2-1-tourism-activity.png",
      },
    ],
    "2.2": [
      {
        image: img("tourism-2-2-tourism-development.png"),
        caption: "Tourism Development & Economic Impacts",
        infoKey: "tourism-2-2-tourism-development.png",
      },
      {
        image: img("tourism-2-2-multiplier-leakage.png"),
        caption: "Multiplier Effect & Economic Leakage",
        infoKey: "tourism-2-2-multiplier-leakage.png",
      },
    ],
    "2.3": [
      {
        image: img("tourism-2-3-sustainable-tourism.png"),
        caption: "Sustainable Tourism Development",
        infoKey: "tourism-2-3-sustainable-tourism.png",
      },
    ],
    "3.1": [
      {
        image: img("climate-3-1-weather-climate.png"),
        caption: "Weather, Climate & Singapore's Equatorial Climate",
        infoKey: "climate-3-1-weather-climate.png",
      },
    ],
    "3.2": [
      {
        image: img("climate-3-2-greenhouse-effect.png"),
        caption: "Greenhouse Effect & Enhanced Greenhouse Effect",
        infoKey: "climate-3-2-greenhouse-effect.png",
      },
      {
        image: img("climate-3-2-climate-change-impacts.png"),
        caption: "Evidence & Impacts of Climate Change",
        infoKey: "climate-3-2-climate-change-impacts.png",
      },
    ],
    "3.3": [
      {
        image: img("climate-3-3-climate-action.png"),
        caption: "Climate Action: Mitigation & Adaptation",
        infoKey: "climate-3-3-climate-action.png",
      },
    ],
    "4.1": [
      {
        image: img("tectonics-4-1-plate-boundaries.png"),
        caption: "Tectonic Plate Boundaries",
        infoKey: "tectonics-4-1-plate-boundaries.png",
      },
      {
        image: img("tectonics-4-1-plate-movement.png"),
        caption: "Plate Movement & Convection Currents",
        infoKey: "tectonics-4-1-plate-movement.png",
      },
    ],
    "4.2": [
      {
        image: img("tectonics-4-2-earthquakes.png"),
        caption: "Earthquakes: Causes & Seismic Waves",
        infoKey: "tectonics-4-2-earthquakes.png",
      },
      {
        image: img("tectonics-4-2-volcanoes.png"),
        caption: "Volcanoes: Structure & Types of Eruption",
        infoKey: "tectonics-4-2-volcanoes.png",
      },
    ],
    "4.3": [
      {
        image: img("tectonics-4-3-disaster-risk.png"),
        caption: "Disaster Risk Management",
        infoKey: "tectonics-4-3-disaster-risk.png",
      },
    ],
    "5.1": [
      {
        image: img("singapore-5-1-small-island.png"),
        caption: "Singapore: Small Island City-State",
        infoKey: "singapore-5-1-small-island.png",
      },
    ],
    "5.2": [
      {
        image: img("singapore-5-2-challenges.png"),
        caption: "Singapore: Challenges & Opportunities",
        infoKey: "singapore-5-2-challenges.png",
      },
    ],
    "5.3": [
      {
        image: img("singapore-5-3-water-management.png"),
        caption: "Singapore's Water Management",
        infoKey: "singapore-5-3-water-management.png",
      },
      {
        image: img("singapore-5-3-green-resilience.png"),
        caption: "Sustainable & Resilient Singapore",
        infoKey: "singapore-5-3-green-resilience.png",
      },
    ],
  };

  window.SUBJECT_INFOS_BY_TOPIC = window.SUBJECT_INFOS_BY_TOPIC || {};
  window.SUBJECT_INFOS_BY_TOPIC = imagesByTopic;
})();
