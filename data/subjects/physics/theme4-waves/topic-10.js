(function () {
    window.__registerTopic({

        id: "10",
        theme: "Section IV: Waves",
        title: "Electromagnetic Spectrum",
        cheatBlocks: [
          { title: "EM wave properties", points: [
            "All EM waves are **transverse** and travel at speed \(c\\approx 3.0\\times 10^8\\,\\text{m/s}\\) in vacuum.",
            "Do not require a medium; carry energy.",
            "Wave equation still holds: \(c = f\\lambda\\) (in vacuum)."
          ]},
          { title: "Spectrum order", points: [
            "Radio → Microwave → Infrared → Visible → Ultraviolet → X-ray → Gamma.",
            "Higher frequency → higher energy; shorter wavelength.",
            "Visible: red (longer λ) to violet (shorter λ)."
          ]},
          { title: "Uses + effects", points: [
            "Microwaves: cooking/communication; IR: heaters/remote controls/thermal imaging.",
            "UV: sterilisation/fluorescence; X-rays: imaging; gamma: cancer treatment/sterilisation.",
            "**Ionising**: UV, X, gamma (can damage cells/DNA)."
          ]},
        ],
        flashcards: [
          { front: "Speed of EM in vacuum", back: "3.0×10⁸ m/s" },
          { front: "Spectrum order (low f → high f)", back: "radio, micro, IR, visible, UV, X, gamma" },
          { front: "Visible order", back: "red → violet (increasing f)" },
          { front: "Microwave use", back: "cooking; communications" },
          { front: "IR use", back: "heaters; remote; thermal imaging" },
          { front: "UV use", back: "sterilising; fluorescent lamps" },
          { front: "X-ray use", back: "medical imaging" },
          { front: "Gamma use", back: "radiotherapy; sterilisation" },
          { front: "Ionising radiation", back: "UV (higher), X-ray, gamma" },
          { front: "Non-ionising examples", back: "radio, microwaves, IR, visible" },
          { front: "c=fλ", back: "wave equation for EM in vacuum" },
          { front: "Higher f means…", back: "shorter λ; higher energy" },
        ],
        quiz: [
          {id:"physics-T10-001", question: "All EM waves travel in vacuum at…", options: ["340 m/s", "3×10⁸ m/s", "9.8 m/s²", "depends on colour"], correctIndex: 1, explanation: "Speed of light c." },
          {id:"physics-T10-002", question: "Correct spectrum order (low f to high f)", options: ["gamma→radio", "radio→gamma", "IR→radio→UV", "visible→radio→X"], correctIndex: 1, explanation: "Radio to gamma." },
          {id:"physics-T10-003", question: "Which is ionising?", options: ["radio", "microwave", "infrared", "X-ray"], correctIndex: 3, explanation: "X-rays ionise." },
          {id:"physics-T10-004", question: "Microwaves are used for…", options: ["bone imaging", "cooking/communication", "detecting fractures only", "sterilising water"], correctIndex: 1, explanation: "Cooking and telecoms." },
          {id:"physics-T10-005", question: "Infrared is associated with…", options: ["heating", "ionisation", "nuclear decay", "sound"], correctIndex: 0, explanation: "IR is heat radiation." },
          {id:"physics-T10-006", question: "Visible light has wavelengths roughly…", options: ["10⁻³ m", "10⁻⁶ m", "10⁻¹² m", "1 m"], correctIndex: 1, explanation: "Hundreds of nm (~10⁻⁷ m) to ~10⁻⁶ m order." },
          {id:"physics-T10-007", question: "Higher frequency means wavelength is…", options: ["longer", "shorter", "same", "zero"], correctIndex: 1, explanation: "λ=c/f." },
          {id:"physics-T10-008", question: "Gamma rays are used for…", options: ["remote controls", "radiotherapy", "hearing aids", "sonar"], correctIndex: 1, explanation: "Cancer treatment." },
          {id:"physics-T10-009", question: "UV can be used for…", options: ["sterilisation", "underwater communication", "cooking", "measuring pressure"], correctIndex: 0, explanation: "Kills microbes." },
          {id:"physics-T10-010", question: "Which does NOT require a medium?", options: ["sound", "water waves", "EM waves", "seismic P waves"], correctIndex: 2, explanation: "EM travels in vacuum." },
          {id:"physics-T10-011", question: "c = fλ is valid for…", options: ["only sound", "only EM in vacuum", "all waves in any medium always", "only water waves"], correctIndex: 1, explanation: "In vacuum, EM speed is c." },
          {id:"physics-T10-012", question: "Red light compared to violet has…", options: ["higher f", "lower f", "same f", "higher energy"], correctIndex: 1, explanation: "Red lower frequency." },
          {id:"physics-T10-013", question: "Ionising radiation risk is mainly…", options: ["heating only", "DNA/cell damage", "sound damage", "magnetic damage"], correctIndex: 1, explanation: "Ionisation damages DNA." },
          {id:"physics-T10-014", question: "X-rays are useful because they…", options: ["reflect strongly from skin", "penetrate soft tissue more than bone", "travel slower in vacuum", "are longitudinal"], correctIndex: 1, explanation: "Differential absorption." },
          {id:"physics-T10-015", question: "Radio waves have…", options: ["shortest λ", "longest λ", "ionising", "highest f"], correctIndex: 1, explanation: "Longest wavelength." },
          {id:"physics-T10-016", question: "EM waves are…", options: ["longitudinal", "transverse", "both", "neither"], correctIndex: 1, explanation: "Transverse." },
          {id:"physics-T10-017", question: "In vacuum, if frequency doubles, wavelength…", options: ["doubles", "halves", "is unchanged", "becomes infinite"], correctIndex: 1, explanation: "c = fλ with constant c ⇒ λ halves when f doubles." },
          {id:"physics-T10-018", question: "Which has the highest photon energy per quantum (typical syllabus ranking)?", options: ["microwave", "visible", "ultraviolet", "gamma"], correctIndex: 3, explanation: "Higher f → higher energy; gamma is highest f among these." },
          {id:"physics-T10-019", question: "Medical X-ray imaging relies on X-rays being…", options: ["reflected strongly by skin", "absorbed differently by different tissues", "sound-like", "longitudinal"], correctIndex: 1, explanation: "Contrast comes from different absorption/penetration." },
          {id:"physics-T10-020", question: "Typical radio waves have wavelength compared with visible light that is…", options: ["much shorter", "much longer", "always equal", "zero"], correctIndex: 1, explanation: "Radio is low f → long λ; visible is much shorter λ." },
          {id:"physics-T10-021", question: "Two different EM waves in vacuum share the same…", options: ["frequency always", "wavelength always", "speed c", "colour always"], correctIndex: 2, explanation: "All EM waves travel at c in vacuum (syllabus value)." },
          {id:"physics-T10-022", question: "Sunburn and skin damage from excessive exposure are most associated with…", options: ["radio waves", "microwaves", "high-energy ultraviolet", "sound"], correctIndex: 2, explanation: "UV (especially higher-energy UV) is ionising/damaging to skin." },
          {id:"physics-T10-023", question: "A TV remote often uses… to send signals.", options: ["gamma rays", "infrared", "X-rays", "ultrasound"], correctIndex: 1, explanation: "Common remotes use IR LEDs." },
          {id:"physics-T10-024", question: "Sterilising equipment with penetrating radiation in hospitals often uses…", options: ["alpha particles", "beta particles", "gamma rays", "radio waves"], correctIndex: 2, explanation: "Gamma is highly penetrating and used for sterilisation (with precautions)." },
          {id:"physics-T10-025", question: "Moving from infrared → visible → ultraviolet in the spectrum, frequency…", options: ["decreases", "stays the same", "increases", "becomes zero"], correctIndex: 2, explanation: "That direction is toward higher f (shorter λ)." },
        ],
        trueFalse: [
          { statement: "EM waves are transverse.", correct: true, explain: "Fields oscillate perpendicular to travel." },
          { statement: "All EM waves have the same speed in vacuum.", correct: true, explain: "All travel at c." },
          { statement: "Microwaves are ionising.", correct: false, explain: "They are non-ionising; mainly heating." },
          { statement: "Gamma rays have higher frequency than X-rays.", correct: true, explain: "Generally higher energy." },
          { statement: "Visible light requires a medium to travel.", correct: false, explain: "Light travels in vacuum." },
          { statement: "UV, X-ray and gamma can damage cells.", correct: true, explain: "Ionising effects." },
          { statement: "Radio waves have shorter wavelength than gamma rays.", correct: false, explain: "Radio has much longer wavelength." },
          { statement: "Red light has higher frequency than blue.", correct: false, explain: "Red is lower frequency." },
          { statement: "Infrared is used in remote controls.", correct: true, explain: "IR LEDs send signals." },
          { statement: "EM waves carry energy.", correct: true, explain: "Energy transfer via radiation." },
        ],
      
    });
})();