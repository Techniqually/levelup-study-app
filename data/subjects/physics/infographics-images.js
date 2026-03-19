(function () {
  // Build absolute URLs so the shell can live anywhere (root vs /physics/).
  const img = (filename) =>
    new URL(
      "data/subjects/physics/images/" + filename,
      window.location.href
    ).toString();

  const imagesByTopic = {
    "1": [
      {
        image: img("measurement-01-topic01.jpg"),
        caption: "Physical Quantities, Units and Measurement",
        infoKey: "measurement-01-topic01.jpg",
      },
    ],
    "2": [
      {
        image: img("mechanics-02-kinematics.jpg"),
        caption: "Kinematics",
        infoKey: "mechanics-02-kinematics.jpg",
      },
    ],
    "3A": [
      {
        image: img("mechanics-03a-force-pressure1.jpg"),
        caption: "Force and Pressure I",
        infoKey: "mechanics-03a-force-pressure1.jpg",
      },
    ],
    "3B": [
      {
        image: img("mechanics-03b-force-pressure2.jpg"),
        caption: "Force and Pressure II",
        infoKey: "mechanics-03b-force-pressure2.jpg",
      },
    ],
    "4": [
      {
        image: img("mechanics-04-dynamics.jpg"),
        caption: "Dynamics",
        infoKey: "mechanics-04-dynamics.jpg",
      },
    ],
    "5": [
      {
        image: img("mechanics-05-turning-effectjpg.jpg"),
        caption: "Turning Effects of Forces",
        infoKey: "mechanics-05-turning-effectjpg.jpg",
      },
    ],
    "6": [
      {
        image: img("mechanics-06-energy.jpg"),
        caption: "Energy",
        infoKey: "mechanics-06-energy.jpg",
      },
    ],
    "7A": [
      {
        image: img("thermal-07a-kinetic-particle-model.jpg"),
        caption: "Kinetic Particle Model of Matter I",
        infoKey: "thermal-07a-kinetic-particle-model.jpg",
      },
    ],
    "7B": [
      {
        image: img("thermal-07b-kinetic-particle-model2.jpg"),
        caption: "Kinetic Particle Model of Matter II",
        infoKey: "thermal-07b-kinetic-particle-model2.jpg",
      },
    ],
    "8": [
      {
        image: img("thermal-08-thermal-processes.jpg"),
        caption: "Thermal Processes",
        infoKey: "thermal-08-thermal-processes.jpg",
      },
    ],
    "9A": [
      {
        image: img("waves-09a-general-properties1.jpg"),
        caption: "General Properties of Waves I",
        infoKey: "waves-09a-general-properties1.jpg",
      },
    ],
    "9B": [
      {
        image: img("waves-09b-general-properties2.jpg"),
        caption: "General Properties of Waves II (Sound)",
        infoKey: "waves-09b-general-properties2.jpg",
      },
    ],
    "10": [
      {
        image: img("waves-10-electromagnetic-spectrum.jpg"),
        caption: "Electromagnetic Spectrum",
        infoKey: "waves-10-electromagnetic-spectrum.jpg",
      },
    ],
    "11A": [
      {
        image: img("waves-11a-reflection.jpg"),
        caption: "Light I (Reflection)",
        infoKey: "waves-11a-reflection.jpg",
      },
    ],
    "11B": [
      {
        image: img("waves-11b-refraction.jpg"),
        caption: "Light II (Refraction)",
        infoKey: "waves-11b-refraction.jpg",
      },
    ],
    "11C": [
      {
        image: img("waves-11c-converging-lenses.jpg"),
        caption: "Light III (Thin Converging Lenses)",
        infoKey: "waves-11c-converging-lenses.jpg",
      },
    ],
    "12": [
      {
        image: img("electricitymagnetism-12-charge-current.jpg"),
        caption: "Electric Charge and Current of Electricity",
        infoKey: "electricitymagnetism-12-charge-current.jpg",
      },
    ],
    "13": [
      {
        image: img("electricitymagnetism-13-dc-circuits.jpg"),
        caption: "D.C. Circuits",
        infoKey: "electricitymagnetism-13-dc-circuits.jpg",
      },
    ],
    "14": [
      {
        image: img("electricitymagnetism-14-practical-electricity.jpg"),
        caption: "Practical Electricity",
        infoKey: "electricitymagnetism-14-practical-electricity.jpg",
      },
    ],
    "15": [
      {
        image: img("electricitymagnetism-15-magnetism-electromagnetism.jpg"),
        caption: "Magnetism and Electromagnetism",
        infoKey: "electricitymagnetism-15-magnetism-electromagnetism.jpg",
      },
    ],
    "16": [
      {
        image: img("radioactivity-16-radioactivity.jpg"),
        caption: "Radioactivity",
        infoKey: "radioactivity-16-radioactivity.jpg",
      },
    ],
  };

  window.SUBJECT_INFOS_BY_TOPIC = window.SUBJECT_INFOS_BY_TOPIC || {};
  window.SUBJECT_INFOS_BY_TOPIC = imagesByTopic;
})();

