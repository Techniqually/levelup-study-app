(function () {
    window.__registerTopic({

        id: "15",
        theme: "Section V: Electricity and Magnetism",
        title: "Magnetism and Electromagnetism",
        cheatBlocks: [
          { title: "Magnetic poles + fields", points: [
            "Like poles repel; unlike poles attract.",
            "Magnetic field lines go from N to S outside magnet; closer lines = stronger field.",
            "Magnetic materials: iron, steel, nickel, cobalt (ferromagnetic)."
          ]},
          { title: "Electromagnets", points: [
            "Current in a wire produces magnetic field (right-hand grip rule).",
            "Solenoid field is like a bar magnet; strength increases with current, turns per length, and soft iron core.",
            "Applications: relays, bells, motors (context)."
          ]},
          { title: "Force on current-carrying conductor", points: [
            "A current in magnetic field experiences force (motor effect).",
            "Direction by Fleming’s left-hand rule (Force, Field, Current).",
            "Increase force by increasing B, I, or length in field."
          ]},
        ],
        flashcards: [
          { front: "Like poles", back: "repel" },
          { front: "Unlike poles", back: "attract" },
          { front: "Field line direction outside", back: "N → S" },
          { front: "Stronger field shown by…", back: "closer field lines" },
          { front: "Right-hand grip rule", back: "thumb current, fingers field direction" },
          { front: "Solenoid field resembles…", back: "bar magnet" },
          { front: "Increase electromagnet strength", back: "increase current, more turns, soft iron core" },
          { front: "Motor effect", back: "force on conductor in magnetic field" },
          { front: "Fleming left-hand", back: "Field, Current, Force directions" },
          { front: "Magnetic material example", back: "iron/steel" },
          { front: "Soft iron core used because…", back: "magnetises/demagnetises easily" },
          { front: "Steel used for permanent magnets because…", back: "retains magnetism" },
        ],
        quiz: [
          { question: "Like poles…", options: ["attract", "repel", "do nothing", "merge"], correctIndex: 1, explanation: "Repel." },
          { question: "Field lines outside magnet go from…", options: ["S to N", "N to S", "east to west", "up to down"], correctIndex: 1, explanation: "N to S outside." },
          { question: "A current-carrying wire produces…", options: ["electric field only", "magnetic field", "no field", "gravity"], correctIndex: 1, explanation: "Magnetic field around wire." },
          { question: "Solenoid strength increases when…", options: ["current decreases", "turns decrease", "soft iron core added", "wire removed"], correctIndex: 2, explanation: "Core concentrates field." },
          { question: "Motor effect is…", options: ["current induced", "force on conductor in B-field", "reflection", "refraction"], correctIndex: 1, explanation: "Force on current in field." },
          { question: "Fleming’s left-hand rule is used to find…", options: ["current direction in generator", "force direction in motor", "voltage in resistor", "pressure"], correctIndex: 1, explanation: "Motor force." },
          { question: "To increase force on conductor, increase…", options: ["B only", "I only", "length in field", "all of these"], correctIndex: 3, explanation: "F proportional to BIL." },
          { question: "Soft iron is used for electromagnets because it…", options: ["is non-magnetic", "magnetises easily and loses magnetism easily", "is a good insulator", "is shiny"], correctIndex: 1, explanation: "Low retentivity." },
          { question: "A compass points…", options: ["towards electric field", "along magnetic field lines", "towards the sun", "random"], correctIndex: 1, explanation: "Aligns with field." },
          { question: "Field lines closer together mean…", options: ["weaker field", "stronger field", "no field", "higher voltage"], correctIndex: 1, explanation: "Stronger." },
          { question: "Permanent magnets are often made from…", options: ["soft iron", "steel", "plastic", "copper"], correctIndex: 1, explanation: "Steel retains magnetism." },
          { question: "A relay uses…", options: ["electromagnet", "mirror", "lens", "thermometer"], correctIndex: 0, explanation: "Electromagnet to switch circuit." },
          { question: "Right-hand grip rule: thumb indicates…", options: ["field", "current", "force", "voltage"], correctIndex: 1, explanation: "Thumb = current." },
          { question: "In a solenoid, field inside is…", options: ["uniform", "zero", "random", "always circular"], correctIndex: 0, explanation: "Approximately uniform inside." },
          { question: "Magnetic field is strongest at… of a bar magnet", options: ["centre", "poles", "anywhere", "nowhere"], correctIndex: 1, explanation: "Poles." },
          { question: "Which is magnetic?", options: ["aluminium", "iron", "glass", "paper"], correctIndex: 1, explanation: "Iron is ferromagnetic." },
          { question: "The motor-effect force on a straight conductor is zero when current is…", options: ["perpendicular to the magnetic field", "parallel to the magnetic field", "maximum", "always nonzero"], correctIndex: 1, explanation: "F ∝ sinθ; θ = 0° (parallel) gives no force (basic syllabus)." },
          { question: "Fleming’s left-hand rule aligns…", options: ["Field (First finger), Current (Second), Thrust/Force (Thumb)", "Voltage, Resistance, Current", "North, East, West", "Heat, Light, Sound"], correctIndex: 0, explanation: "Standard mnemonic: First = Field, seCond = Current, thuMb = Motion/force." },
          { question: "Doubling only the current in an electromagnet (same coil, core, temperature) typically…", options: ["weakens the core", "strengthens the magnetic field", "removes magnetism", "halves the field"], correctIndex: 1, explanation: "Field strength increases with current (more ampere-turns)." },
          { question: "If a bar magnet is broken in half, each piece…", options: ["has only a north pole", "has only a south pole", "still has both N and S poles", "becomes non-magnetic"], correctIndex: 2, explanation: "Magnetic poles always occur in pairs (dipoles)." },
          { question: "Copper is not strongly attracted by a bar magnet because it is…", options: ["always charged", "not ferromagnetic", "too dense", "an insulator"], correctIndex: 1, explanation: "Ferromagnetic materials (Fe, Ni, Co, some steels) respond strongly." },
          { question: "A relay allows a small current circuit to…", options: ["generate neutrons", "switch/control a separate higher-power circuit", "measure wavelength", "cool a motor"], correctIndex: 1, explanation: "Electromagnet pulls contacts to operate another circuit." },
          { question: "Compared with a permanent magnet of similar size, an electromagnet’s main advantage is…", options: ["it cannot be turned off", "field can be controlled by current", "it has no magnetic field", "it never attracts iron"], correctIndex: 1, explanation: "Switching/changing current changes magnetisation." },
          { question: "Closer, denser field lines around a pole indicate…", options: ["weaker field", "stronger field", "zero field", "electric field only"], correctIndex: 1, explanation: "Line density represents B-field strength." },
          { question: "Earth’s magnetic field makes a freely pivoted compass needle align approximately…", options: ["east–west", "along the local field direction (toward magnetic north/south)", "vertically only", "randomly"], correctIndex: 1, explanation: "Compass aligns tangent to field lines." },
          { question: "For a solenoid with fixed current and core, increasing the number of turns per unit length generally…", options: ["weakens the interior field", "strengthens the interior field", "cancels the field", "makes the field purely electric"], correctIndex: 1, explanation: "More turns increases ampere-turns, increasing B inside (basic model)." },
        ],
        trueFalse: [
          { statement: "Field lines never cross.", correct: true, explain: "Direction would be ambiguous." },
          { statement: "Like poles attract.", correct: false, explain: "They repel." },
          { statement: "Current produces magnetic field.", correct: true, explain: "Oersted’s discovery." },
          { statement: "Electromagnets can be switched off.", correct: true, explain: "Turn off current." },
          { statement: "Steel is better than soft iron for temporary electromagnets.", correct: false, explain: "Soft iron is better (low retentivity)." },
          { statement: "Fleming’s left-hand rule gives force direction.", correct: true, explain: "Motor rule." },
          { statement: "Increasing turns per length increases solenoid field.", correct: true, explain: "More ampere-turns." },
          { statement: "A compass aligns with electric field.", correct: false, explain: "It aligns with magnetic field." },
          { statement: "Adding a soft iron core increases electromagnet strength.", correct: true, explain: "Concentrates field." },
          { statement: "Magnetic field lines go from S to N outside magnet.", correct: false, explain: "N to S outside." },
        ],
      
    });
})();