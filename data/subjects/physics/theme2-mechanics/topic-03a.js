(function () {
    window.__registerTopic({
        id: "3A",
        theme: "Section II: Newtonian Mechanics",
        title: "Force and Pressure I",
        cheatBlocks: [
          {
            title: "Forces (types + diagrams)",
            points: [
              "Common forces: **weight** (mg), **normal reaction**, **tension**, **friction**, **air resistance/drag**, **upthrust**.",
              "Represent forces using a **free-body diagram**: forces as arrows acting on the object.",
              "Resultant force = vector sum of all forces.",
              "Balanced forces → resultant 0 (rest or constant velocity)."
            ],
          },
          {
            title: "Mass, weight, gravitational field",
            points: [
              "Mass m measures inertia; SI unit kg; constant (for syllabus contexts).",
              "Weight W is gravitational force: **W = mg**.",
              "Gravitational field strength g = weight per unit mass; N/kg = m/s².",
              "Near Earth: \(g\\approx 9.8\\,\\text{N/kg}\\)."
            ],
          },
          {
            title: "Density",
            points: [
              "Density \(\\rho = m/V\\).",
              "Units: kg/m³ (or g/cm³). \(1\\,\\text{g/cm}^3 = 1000\\,\\text{kg/m}^3\\).",
              "Floating: average density of object < density of fluid.",
              "Use displacement method for irregular solids (measuring cylinder / overflow can)."
            ],
          },
          {
            title: "Upthrust (buoyancy) basics",
            points: [
              "Upthrust = upward force by fluid on object; due to pressure difference with depth.",
              "If floating: upthrust = weight of object.",
              "If in equilibrium in fluid: upthrust + tension = weight (if suspended)."
            ],
          },
        ],
        flashcards: [
          { front: "Weight formula", back: "W = mg" },
          { front: "Unit of g", back: "N/kg (equivalently m/s²)" },
          { front: "Mass vs weight", back: "Mass kg; weight N; weight depends on g." },
          { front: "Resultant force = 0 implies…", back: "rest or constant velocity (no acceleration)" },
          { front: "Density formula", back: "ρ = m/V" },
          { front: "Convert 2.7 g/cm³ to kg/m³", back: "2.7×1000 = 2700 kg/m³" },
          { front: "Free-body diagram", back: "diagram showing all forces acting on an object." },
          { front: "Friction direction", back: "Opposes relative motion (or tendency) between surfaces." },
          { front: "Normal reaction acts…", back: "Perpendicular to contact surface." },
          { front: "Tension acts…", back: "Along the string/rope." },
          { front: "Drag increases with…", back: "speed (and area, fluid density)." },
          { front: "Floating condition (density)", back: "ρ_object < ρ_fluid (average)." },
        ],
        quiz: [
          { question: "Which is measured in newtons?", options: ["mass", "weight", "density", "time"], correctIndex: 1, explanation: "Weight is a force." },
          { question: "g has units…", options: ["kg", "N", "N/kg", "J"], correctIndex: 2, explanation: "N/kg." },
          { question: "An object of mass 2 kg has weight (g=10 N/kg)…", options: ["2 N", "5 N", "20 N", "200 N"], correctIndex: 2, explanation: "W=mg=2×10=20 N." },
          { question: "Density is…", options: ["mV", "m/V", "V/m", "m+V"], correctIndex: 1, explanation: "ρ=m/V." },
          { question: "If forces are balanced, acceleration is…", options: ["maximum", "zero", "negative", "infinite"], correctIndex: 1, explanation: "Resultant force 0 → a=0." },
          { question: "Upthrust exists because…", options: ["mass changes", "pressure increases with depth", "gravity is zero", "density is constant"], correctIndex: 1, explanation: "Greater pressure lower down gives net upward force." },
          { question: "A block floats higher in seawater than freshwater because seawater has…", options: ["lower density", "higher density", "no upthrust", "lower g"], correctIndex: 1, explanation: "Higher density → more upthrust per volume displaced." },
          { question: "Which is NOT a force?", options: ["friction", "tension", "speed", "weight"], correctIndex: 2, explanation: "Speed is not a force." },
          { question: "1 g/cm³ equals…", options: ["1 kg/m³", "10 kg/m³", "100 kg/m³", "1000 kg/m³"], correctIndex: 3, explanation: "Multiply by 1000." },
          { question: "Normal reaction is…", options: ["parallel to surface", "perpendicular to surface", "always upward", "always mg"], correctIndex: 1, explanation: "Perpendicular to contact." },
          { question: "If an object sinks, its average density is…", options: ["less than fluid", "equal to fluid", "greater than fluid", "unrelated"], correctIndex: 2, explanation: "Denser than fluid." },
          { question: "Mass is best described as…", options: ["gravitational force", "amount of matter / inertia", "pressure", "energy"], correctIndex: 1, explanation: "Mass measures inertia." },
          { question: "An object moving at constant velocity has resultant force…", options: ["non-zero", "zero", "equal to mg", "equal to friction"], correctIndex: 1, explanation: "Newton 1st law." },
          { question: "Friction acts…", options: ["in direction of motion", "opposite motion/tendency", "perpendicular to surface", "always zero"], correctIndex: 1, explanation: "Opposes motion/tendency." },
          { question: "A stone is suspended in water by a spring. Compared to in air, the spring reading is…", options: ["greater", "smaller", "same", "zero"], correctIndex: 1, explanation: "Upthrust reduces apparent weight." },
          { question: "Unit of density", options: ["kg", "kg/m²", "kg/m³", "N/m²"], correctIndex: 2, explanation: "kg/m³." },
          { question: "A 400 cm³ rock (fully submerged) displaces water. Volume of displaced water is…", options: ["400 cm³", "400 kg", "0.4 cm³", "4 m³"], correctIndex: 0, explanation: "Displaced volume equals submerged volume of object." },
          { question: "An object weighs 30 N on Earth (g=10 N/kg). Its mass is…", options: ["300 kg", "3 kg", "30 kg", "0.3 kg"], correctIndex: 1, explanation: "m = W/g = 30/10 = 3 kg." },
          { question: "Ice floats on water mainly because…", options: ["ice is hotter", "ice is less dense than water", "ice has no weight in water", "water exerts no upthrust"], correctIndex: 1, explanation: "Average density of ice < density of water → upthrust balances weight when part-submerged." },
          { question: "A block floats in mercury but sinks in water. This shows…", options: ["ρ_block > ρ_water and ρ_block < ρ_mercury", "ρ_block > ρ_mercury", "ρ_block < ρ_water", "ρ_block = ρ_water"], correctIndex: 0, explanation: "Sinks in water → denser than water; floats in mercury → less dense than mercury." },
          { question: "In a vacuum, a feather and hammer fall with the same…", options: ["weight always", "acceleration (no air resistance)", "terminal velocity", "drag force"], correctIndex: 1, explanation: "Without air, both have a=g." },
          { question: "Density 2.5 g/cm³ in kg/m³ is…", options: ["250", "2500", "0.0025", "25"], correctIndex: 1, explanation: "Multiply by 1000: 2.5×1000 = 2500 kg/m³." },
          { question: "A ship floats in seawater. If it enters a river (less dense), to displace the same weight it must…", options: ["float higher", "displace a larger volume of water", "sink completely", "reduce mass"], correctIndex: 1, explanation: "Upthrust = weight of displaced fluid; lower ρ means larger V displaced." },
          { question: "Tension in a vertical rope lifting a 5 kg crate upwards at constant speed (g=10) is about…", options: ["0 N", "2 N", "50 N", "100 N"], correctIndex: 2, explanation: "Constant velocity → resultant 0 → T = mg = 50 N." },
          { question: "Which statement about mass and weight is correct?", options: ["They are the same quantity", "Weight is measured in kg", "Mass is the same on the Moon; weight changes", "Weight does not depend on g"], correctIndex: 2, explanation: "Mass is invariant; W=mg depends on g." },
          { question: "Upthrust on a fully submerged object depends on…", options: ["only the object’s mass", "density of fluid and volume of fluid displaced", "depth only", "colour of the fluid"], correctIndex: 1, explanation: "Archimedes: displaced fluid weight ~ ρVg (syllabus level)." },
        ],
        trueFalse: [
          { statement: "Mass depends on gravitational field strength.", correct: false, explain: "Weight depends on g; mass is constant in syllabus contexts." },
          { statement: "Weight is a vector.", correct: true, explain: "Force has direction (toward Earth)." },
          { statement: "Balanced forces mean the object must be at rest.", correct: false, explain: "It can move at constant velocity." },
          { statement: "g = 9.8 N/kg is equivalent to 9.8 m/s².", correct: true, explain: "Same dimensions." },
          { statement: "An object floats when its density is greater than the fluid.", correct: false, explain: "It floats if average density is less." },
          { statement: "Upthrust is caused by higher pressure on the bottom than the top.", correct: true, explain: "Pressure increases with depth." },
          { statement: "Normal reaction always equals weight.", correct: false, explain: "Only in special cases (horizontal surface, no other vertical forces)." },
          { statement: "Friction can act even if the object is not moving.", correct: true, explain: "Static friction prevents motion." },
          { statement: "Density is the same as weight.", correct: false, explain: "Different quantities." },
          { statement: "A free-body diagram includes forces acting on the object only.", correct: true, explain: "Not forces exerted by the object on others." },
        ],
        orderTitle: "Measure density of irregular solid",
        orderGame: [
          "Measure the mass m using a balance.",
          "Partly fill a measuring cylinder with water; record initial volume V₁.",
          "Lower the object fully into water (no air bubbles); record final volume V₂.",
          "Compute volume of object: V = V₂ − V₁.",
          "Compute density: ρ = m/V with consistent units."
        ],
    });
})();