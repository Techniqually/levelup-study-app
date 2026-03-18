(function () {
  window.__registerTopic({
    id: "p1",
    theme: "Theme 1: Measurement & Kinematics",
    title: "Kinematics (demo)",
    cheatBlocks: [
      {
        title: "Basic quantities",
        points: [
          "**Distance** — how far travelled (scalar).",
          "**Displacement** — straight-line change in position (vector).",
          "**Speed** = distance / time; **velocity** = displacement / time.",
          "**Acceleration** = change in velocity / time.",
        ],
      },
      {
        title: "Graphs",
        points: [
          "Gradient of **distance–time** graph = speed.",
          "Gradient of **velocity–time** graph = acceleration.",
          "Area under velocity–time graph = displacement.",
        ],
      },
    ],
    infographics: [],
    flashcards: [
      { front: "Average speed formula?", back: "total distance / total time" },
      { front: "Velocity vs speed?", back: "velocity has direction (vector)" },
      { front: "Acceleration units?", back: "m/s²" },
      { front: "v–t graph gradient?", back: "acceleration" },
      { front: "Area under v–t graph?", back: "displacement" },
      { front: "Uniform speed?", back: "constant speed (straight line on d–t)" },
      { front: "Rest on d–t graph looks like?", back: "horizontal line" },
      { front: "Instantaneous speed?", back: "speed at a point (tangent gradient)" },
      { front: "Scalar example?", back: "mass, distance, speed" },
      { front: "Vector example?", back: "displacement, velocity, force" },
    ],
    quiz: [
      {
        question: "Runner covers 100 m in 12.5 s. Average speed?",
        options: ["8.0 m/s", "12.5 m/s", "100 m/s", "0.125 m/s"],
        correctIndex: 0,
        explanation: "100 / 12.5 = 8.0 m/s.",
      },
      {
        question: "Car changes velocity from 10 m/s to 18 m/s in 4.0 s. Acceleration?",
        options: ["2.0 m/s²", "2.5 m/s²", "4.5 m/s²", "7.0 m/s²"],
        correctIndex: 0,
        explanation: "(18−10)/4 = 8/4 = 2.0 m/s².",
      },
      {
        question: "Quantity that must have direction:",
        options: ["speed", "distance", "mass", "velocity"],
        correctIndex: 3,
        explanation: "Velocity is vector.",
      },
      {
        question: "Constant speed on distance–time graph looks like:",
        options: ["horizontal", "curved", "straight sloping line", "vertical"],
        correctIndex: 2,
        explanation: "Uniform gradient.",
      },
    ],
    trueFalse: [
      {
        statement: "Speed can never be zero.",
        correct: false,
        explain: "At rest speed = 0.",
      },
      {
        statement: "Velocity includes direction.",
        correct: true,
        explain: "Vector quantity.",
      },
      {
        statement: "Area under v–t graph is displacement.",
        correct: true,
        explain: "Definition.",
      },
    ],
  });
})();

