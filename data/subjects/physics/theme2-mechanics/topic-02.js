(function () {
    window.__registerTopic({
        id: "2",
        theme: "Section II: Newtonian Mechanics",
        title: "Kinematics",
        cheatBlocks: [
          {
            title: "Key definitions",
            points: [
              "Speed \(v = d/t\\) (scalar). Velocity \(v = s/t\\) (vector).",
              "Acceleration \(a = \\Delta v / \\Delta t\\). Deceleration = negative acceleration.",
              "Average speed = total distance / total time.",
              "Instantaneous speed/velocity = gradient of tangent on s–t graph."
            ],
          },
          {
            title: "Graphs",
            points: [
              "Distance–time: gradient = speed (always ≥0).",
              "Displacement–time: gradient = velocity (can be negative).",
              "Velocity–time: gradient = acceleration; area under curve = displacement.",
              "For uniform acceleration: straight-line v–t; area = trapezium."
            ],
          },
          {
            title: "Uniform acceleration equations",
            points: [
              "\(v = u + at\\)",
              "\(s = ut + \\tfrac12 at^2\\)",
              "\(v^2 = u^2 + 2as\\)",
              "Use only when a is constant."
            ],
          },
          {
            title: "Free fall (O-level model)",
            points: [
              "Near Earth surface, acceleration due to gravity \(g \\approx 9.8\\,\\text{m/s}^2\\) downward.",
              "Ignore air resistance for basic calculations.",
              "If thrown upwards: a = −g (taking up as positive).",
              "At highest point: instantaneous v = 0 but a still = −g."
            ],
          },
        ],
        flashcards: [
          { front: "Gradient of v–t graph?", back: "acceleration" },
          { front: "Area under v–t graph?", back: "displacement" },
          { front: "Equation: v-u-at?", back: "v = u + at" },
          { front: "Equation: s from u,a,t", back: "s = ut + ½at²" },
          { front: "Equation: v² relation", back: "v² = u² + 2as" },
          { front: "g value", back: "≈ 9.8 m/s² downward" },
          { front: "Instantaneous speed", back: "speed at a moment; gradient of tangent on s–t" },
          { front: "Average speed", back: "total distance / total time" },
          { front: "Displacement vs distance", back: "displacement vector shortest; distance path length" },
          { front: "At highest point of projectile", back: "v=0 but a = -g" },
          { front: "What does negative velocity mean?", back: "motion in opposite chosen direction" },
          { front: "What does negative acceleration mean?", back: "acceleration opposite chosen positive direction" },
        ],
        quiz: [
          {id:"physics-T2-001", question: "Gradient of displacement–time graph gives…", options: ["speed", "velocity", "acceleration", "distance"], correctIndex: 1, explanation: "Gradient = change in displacement / time = velocity." },
          {id:"physics-T2-002", question: "Area under velocity–time graph gives…", options: ["distance", "displacement", "acceleration", "force"], correctIndex: 1, explanation: "Area = displacement." },
          {id:"physics-T2-003", question: "A car accelerates from 2 to 10 m/s in 4 s. a = ?", options: ["2", "4", "8", "12"], correctIndex: 0, explanation: "(10-2)/4 = 2 m/s²." },
          {id:"physics-T2-004", question: "Uniform acceleration equation linking v,u,a,t", options: ["s=vt", "v=u+at", "v²=u²+at", "s=½vt²"], correctIndex: 1, explanation: "v=u+at." },
          {id:"physics-T2-005", question: "If v–t graph is horizontal, acceleration is…", options: ["maximum", "constant positive", "zero", "negative"], correctIndex: 2, explanation: "Gradient 0 → a=0." },
          {id:"physics-T2-006", question: "A body falls from rest for 2 s. Speed (ignore air resistance)", options: ["4.9", "9.8", "19.6", "39.2"], correctIndex: 2, explanation: "v=gt=9.8×2=19.6 m/s." },
          {id:"physics-T2-007", question: "Displacement after 2 s free fall from rest", options: ["9.8", "19.6", "4.9", "2.45"], correctIndex: 1, explanation: "s=½gt²=0.5×9.8×4=19.6 m." },
          {id:"physics-T2-008", question: "If speed is constant but direction changes, acceleration is…", options: ["zero", "non-zero", "infinite", "negative"], correctIndex: 1, explanation: "Velocity changes → acceleration." },
          {id:"physics-T2-009", question: "Average speed equals…", options: ["displacement/time", "distance/time", "velocity/time", "acceleration/time"], correctIndex: 1, explanation: "Distance divided by time." },
          {id:"physics-T2-010", question: "At the top of vertical throw, acceleration is…", options: ["0", "+g", "-g", "depends"], correctIndex: 2, explanation: "Gravity still acts downward." },
          {id:"physics-T2-011", question: "A v–t straight line sloping up means…", options: ["constant speed", "constant acceleration", "changing acceleration", "no motion"], correctIndex: 1, explanation: "Constant gradient means constant acceleration." },
          {id:"physics-T2-012", question: "If displacement is zero, distance must be…", options: ["zero", "non-zero", "negative", "cannot tell"], correctIndex: 3, explanation: "Could go out and return; displacement 0 but distance >0." },
          {id:"physics-T2-013", question: "Units of acceleration", options: ["m/s", "m/s²", "N", "kg"], correctIndex: 1, explanation: "m/s²." },
          {id:"physics-T2-014", question: "A cyclist decelerates from 8 to 2 m/s in 3 s. a = ?", options: ["-2", "-3", "+2", "+3"], correctIndex: 0, explanation: "(2-8)/3 = -2 m/s²." },
          {id:"physics-T2-015", question: "Using v²=u²+2as for free fall from rest, u=0, so v²=…", options: ["2gs", "gs", "g/s", "s/g"], correctIndex: 0, explanation: "v² = 2gs." },
          {id:"physics-T2-016", question: "Area under v–t curve includes sign, so it gives…", options: ["distance", "displacement", "speed", "acceleration"], correctIndex: 1, explanation: "Signed area = displacement." },
          {id:"physics-T2-017", question: "A particle has u = +6 m/s and a = −2 m/s². How long until v = 0?", options: ["2 s", "3 s", "4 s", "12 s"], correctIndex: 1, explanation: "v=u+at → 0=6−2t → t=3 s." },
          {id:"physics-T2-018", question: "From rest, uniform a = 4 m/s² for 5 s. Displacement is…", options: ["20 m", "50 m", "100 m", "10 m"], correctIndex: 1, explanation: "s=½at²=0.5×4×25=50 m." },
          {id:"physics-T2-019", question: "A train slows from 20 m/s to 8 m/s over 240 m. Using v²=u²+2as, a equals…", options: ["−0.6 m/s²", "−1.2 m/s²", "+0.6 m/s²", "−2.4 m/s²"], correctIndex: 0, explanation: "a=(v²−u²)/(2s)=(64−400)/480=−0.6 m/s²." },
          {id:"physics-T2-020", question: "On a displacement–time graph, a horizontal line means…", options: ["acceleration is zero", "velocity is zero", "speed is infinite", "object must be at x=0"], correctIndex: 1, explanation: "Gradient (velocity) is zero." },
          {id:"physics-T2-021", question: "From rest, uniform acceleration. Ratio of distance in the 1st second to distance in the 2nd second is…", options: ["1:2", "1:3", "1:4", "3:5"], correctIndex: 1, explanation: "s₁=½a; s₂(total in 2 s)−s₁=2a−½a=3a/2 → first-second : second-second = ½a : 3a/2 = 1:3." },
          {id:"physics-T2-022", question: "Average velocity over a closed loop (start = finish) is…", options: ["always zero", "always positive", "equal to average speed", "cannot be zero"], correctIndex: 0, explanation: "Displacement is zero, so average velocity = displacement/time = 0." },
          {id:"physics-T2-023", question: "For motion with constant acceleration, which is NOT always true?", options: ["v–t graph is straight line", "a–t graph is horizontal line", "s–t graph is straight line", "F=ma if mass constant"], correctIndex: 2, explanation: "s–t is parabolic for constant a (unless u=a=0)." },
          {id:"physics-T2-024", question: "A stone is thrown vertically up at 19.6 m/s (g=9.8). Time to return to the hand is…", options: ["2 s", "4 s", "1 s", "0.5 s"], correctIndex: 1, explanation: "Time up = v/g = 2 s; symmetric so total flight ≈ 4 s." },
          {id:"physics-T2-025", question: "Two bodies start from rest with accelerations 2 m/s² and 5 m/s². After the same time, their speeds are in the ratio…", options: ["2:5", "4:25", "5:2", "1:1"], correctIndex: 0, explanation: "v=at with same t → v ∝ a → 2:5." },
          {id:"physics-T2-026", question: "Area under an acceleration–time graph gives…", options: ["displacement", "change in velocity", "final velocity always", "kinetic energy"], correctIndex: 1, explanation: "∫a dt = Δv." },
        ],
        trueFalse: [
          { statement: "Acceleration is change of speed per unit time.", correct: false, explain: "Acceleration is change of velocity per unit time." },
          { statement: "The gradient of a v–t graph is acceleration.", correct: true, explain: "a=Δv/Δt." },
          { statement: "In free fall, speed increases by about 9.8 m/s each second.", correct: true, explain: "Ignoring air resistance." },
          { statement: "Distance can be negative.", correct: false, explain: "Distance is scalar path length ≥0." },
          { statement: "Displacement can be negative.", correct: true, explain: "Vector component can be negative depending on direction." },
          { statement: "A constant speed always means zero acceleration.", correct: false, explain: "If direction changes, acceleration exists." },
          { statement: "At the highest point of upward throw, velocity is zero.", correct: true, explain: "Instantaneous velocity is 0 there." },
          { statement: "At the highest point, acceleration is zero.", correct: false, explain: "Acceleration remains -g." },
          { statement: "Average speed equals total displacement / total time.", correct: false, explain: "Average speed uses distance." },
          { statement: "Area under a–t graph gives change in velocity.", correct: true, explain: "Integrate acceleration over time." },
        ],
        orderTitle: "Solve SUVAT quickly",
        orderGame: [
          "List known quantities (u, v, a, t, s) with sign convention.",
          "Choose a constant-acceleration equation that does not contain the unknown you don’t have.",
          "Substitute values with units and signs.",
          "Solve algebraically; check magnitude and sign make sense.",
          "State final answer with correct units and direction (if needed)."
        ],
    });
})();