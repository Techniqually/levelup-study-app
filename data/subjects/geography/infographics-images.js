(function () {
  // Build absolute URLs so the shell can live anywhere (root vs /geography/).
  const img = (filename) =>
    new URL(
      "data/subjects/geography/images/" + filename,
      window.location.href
    ).toString();

  const imagesByTopic = {
    "1.1": [
      {
        image: img("everyday-1-1-thinking-geographically.jpg"),
        caption: "Thinking Geographically",
        infoKey: "everyday-1-1-thinking-geographically.jpg",
      },
    ],
    "1.2": [
      {
        image: img("everyday-1-2-sustainable-development.jpg"),
        caption: "Sustainable Development",
        infoKey: "everyday-1-2-sustainable-development.jpg",
      },
    ],
    "1.3": [
      {
        image: img("everyday-1-3-geographical-methods.jpg"),
        caption: "Geographical Methods & Fieldwork",
        infoKey: "everyday-1-3-geographical-methods.jpg",
      },
    ],
    "2.1": [
      {
        image: img("tourism-2-1-tourism-activity.jpg"),
        caption: "Tourism Activity",
        infoKey: "tourism-2-1-tourism-activity.jpg",
      },
    ],
    "2.2": [
      {
        image: img("tourism-2-2-tourism-development.jpg"),
        caption: "Tourism Development & Economic Impacts",
        infoKey: "tourism-2-2-tourism-development.jpg",
      },
      {
        image: img("tourism-2-2-multiplier-leakage.jpg"),
        caption: "Multiplier Effect & Economic Leakage",
        infoKey: "tourism-2-2-multiplier-leakage.jpg",
      },
    ],
    "2.3": [
      {
        image: img("tourism-2-3-sustainable-tourism.jpg"),
        caption: "Sustainable Tourism Development",
        infoKey: "tourism-2-3-sustainable-tourism.jpg",
      },
    ],
    "3.1": [
      {
        image: img("climate-3-1-weather-climate.jpg"),
        caption: "Weather, Climate & Singapore's Equatorial Climate",
        infoKey: "climate-3-1-weather-climate.jpg",
      },
    ],
    "3.2": [
      {
        image: img("climate-3-2-greenhouse-effect.jpg"),
        caption: "Greenhouse Effect & Enhanced Greenhouse Effect",
        infoKey: "climate-3-2-greenhouse-effect.jpg",
      },
      {
        image: img("climate-3-2-climate-change-impacts.jpg"),
        caption: "Evidence & Impacts of Climate Change",
        infoKey: "climate-3-2-climate-change-impacts.jpg",
      },
    ],
    "3.3": [
      {
        image: img("climate-3-3-climate-action.jpg"),
        caption: "Climate Action: Mitigation & Adaptation",
        infoKey: "climate-3-3-climate-action.jpg",
      },
    ],
    "4.1": [
      {
        image: img("tectonics-4-1-plate-boundaries.jpg"),
        caption: "Tectonic Plate Boundaries",
        infoKey: "tectonics-4-1-plate-boundaries.jpg",
      },
      {
        image: img("tectonics-4-1-plate-movement.jpg"),
        caption: "Plate Movement & Convection Currents",
        infoKey: "tectonics-4-1-plate-movement.jpg",
      },
    ],
    "4.2": [
      {
        image: img("tectonics-4-2-earthquakes.jpg"),
        caption: "Earthquakes: Causes & Seismic Waves",
        infoKey: "tectonics-4-2-earthquakes.jpg",
      },
      {
        image: img("tectonics-4-2-volcanoes.jpg"),
        caption: "Volcanoes: Structure & Types of Eruption",
        infoKey: "tectonics-4-2-volcanoes.jpg",
      },
    ],
    "4.3": [
      {
        image: img("tectonics-4-3-disaster-risk.jpg"),
        caption: "Disaster Risk Management",
        infoKey: "tectonics-4-3-disaster-risk.jpg",
      },
    ],
    "5.1": [
      {
        image: img("singapore-5-1-small-island.jpg"),
        caption: "Singapore: Small Island City-State",
        infoKey: "singapore-5-1-small-island.jpg",
      },
    ],
    "5.2": [
      {
        image: img("singapore-5-2-challenges.jpg"),
        caption: "Singapore: Challenges & Opportunities",
        infoKey: "singapore-5-2-challenges.jpg",
      },
    ],
    "5.3": [
      {
        image: img("singapore-5-3-water-management.jpg"),
        caption: "Singapore's Water Management",
        infoKey: "singapore-5-3-water-management.jpg",
      },
      {
        image: img("singapore-5-3-green-resilience.jpg"),
        caption: "Sustainable & Resilient Singapore",
        infoKey: "singapore-5-3-green-resilience.jpg",
      },
    ],
  };

  window.SUBJECT_INFOS_BY_TOPIC = window.SUBJECT_INFOS_BY_TOPIC || {};
  window.SUBJECT_INFOS_BY_TOPIC = imagesByTopic;
})();
