(function () {
    window.__registerTopic({

        id: "12",
        theme: "Section V: Electricity and Magnetism",
        title: "Electric Charge and Current of Electricity",
        cheatBlocks: [
          { title: "Charge + current", points: [
            "Charge Q measured in coulombs (C).",
            "Current \(I = Q/t\\) (A). Conventional current flows + to −; electrons flow − to +.",
            "Potential difference (p.d.) is energy transferred per unit charge: \(V = W/Q\\)."
          ]},
          { title: "EMF, p.d., resistance", points: [
            "EMF: energy supplied per unit charge by source (open-circuit).",
            "p.d. across component: energy used per unit charge.",
            "Resistance \(R = V/I\\) (Ω). Ohmic conductor: V proportional to I (straight line through origin)."
          ]},
          { title: "I–V characteristics (qualitative)", points: [
            "Ohmic resistor: straight line V–I at constant temperature.",
            "Filament lamp: curve (resistance increases as it heats).",
            "Diode: conducts one direction; steep rise after threshold."
          ]},
        ],
        flashcards: [
          { front: "Current equation", back: "I = Q/t" },
          { front: "p.d. equation", back: "V = W/Q" },
          { front: "Resistance equation", back: "R = V/I" },
          { front: "Unit of charge", back: "C" },
          { front: "Unit of p.d.", back: "V" },
          { front: "Unit of resistance", back: "Ω" },
          { front: "Conventional current direction", back: "+ to −" },
          { front: "Electron flow direction", back: "− to +" },
          { front: "Ohmic conductor", back: "V ∝ I at constant temperature" },
          { front: "Filament lamp I–V", back: "curve due to heating" },
          { front: "Diode conducts…", back: "mainly one direction" },
          { front: "EMF meaning", back: "energy supplied per unit charge" },
        ],
        quiz: [
          {id:"physics-T12-001", question: "Current is…", options: ["energy/time", "charge/time", "force/area", "mass/volume"], correctIndex: 1, explanation: "I=Q/t." },
          {id:"physics-T12-002", question: "Unit of charge", options: ["A", "C", "V", "Ω"], correctIndex: 1, explanation: "Coulomb." },
          {id:"physics-T12-003", question: "If 6 C passes in 3 s, current is…", options: ["0.5 A", "2 A", "3 A", "18 A"], correctIndex: 1, explanation: "I=6/3=2 A." },
          {id:"physics-T12-004", question: "Potential difference is…", options: ["W/Q", "Q/W", "V/I", "I/V"], correctIndex: 0, explanation: "V=W/Q." },
          {id:"physics-T12-005", question: "Resistance is…", options: ["I/V", "V/I", "VI", "V+I"], correctIndex: 1, explanation: "R=V/I." },
          {id:"physics-T12-006", question: "An ohmic resistor has V–I graph…", options: ["curved", "straight through origin", "horizontal", "vertical"], correctIndex: 1, explanation: "V proportional to I." },
          {id:"physics-T12-007", question: "Conventional current flows…", options: ["− to +", "+ to −", "no direction", "both"], correctIndex: 1, explanation: "By convention + to −." },
          {id:"physics-T12-008", question: "EMF is energy…", options: ["used per charge", "supplied per charge", "stored per mass", "lost per time"], correctIndex: 1, explanation: "Supplied by source." },
          {id:"physics-T12-009", question: "If V=12 V and I=3 A, R=?", options: ["4 Ω", "9 Ω", "36 Ω", "0.25 Ω"], correctIndex: 0, explanation: "R=12/3=4 Ω." },
          {id:"physics-T12-010", question: "Which device shows non-ohmic behaviour?", options: ["fixed resistor", "filament lamp", "metal wire at constant temp", "all ohmic"], correctIndex: 1, explanation: "Lamp heats → R changes." },
          {id:"physics-T12-011", question: "Energy transferred W equals…", options: ["VQ", "VI", "IR", "QV/t"], correctIndex: 0, explanation: "W=VQ." },
          {id:"physics-T12-012", question: "If p.d. is 5 V and charge is 2 C, energy is…", options: ["2.5 J", "10 J", "7 J", "0.4 J"], correctIndex: 1, explanation: "W=VQ=10 J." },
          {id:"physics-T12-013", question: "A diode in reverse bias…", options: ["conducts strongly", "blocks current", "has zero resistance", "glows"], correctIndex: 1, explanation: "Blocks." },
          {id:"physics-T12-014", question: "A filament lamp’s resistance at higher current is…", options: ["smaller", "larger", "same", "zero"], correctIndex: 1, explanation: "Heating increases resistance." },
          {id:"physics-T12-015", question: "I–V graph of ohmic conductor at constant temp is…", options: ["straight", "parabola", "circle", "random"], correctIndex: 0, explanation: "Straight line." },
          {id:"physics-T12-016", question: "If charge doubles for same time, current…", options: ["halves", "doubles", "same", "zero"], correctIndex: 1, explanation: "I=Q/t." },
          {id:"physics-T12-017", question: "9600 C passes a point in 20 min. The average current is…", options: ["2 A", "8 A", "12 A", "480 A"], correctIndex: 1, explanation: "20 min = 1200 s ⇒ I = 9600/1200 = 8 A." },
          {id:"physics-T12-018", question: "A resistor obeys Ohm’s law at constant temperature. If voltage doubles, current…", options: ["halves", "doubles", "is unchanged", "becomes zero"], correctIndex: 1, explanation: "I = V/R with constant R ⇒ I ∝ V." },
          {id:"physics-T12-019", question: "Energy transferred when p.d. V moves charge Q is…", options: ["Q/V", "V/Q", "VQ", "V+Q"], correctIndex: 2, explanation: "W = VQ." },
          {id:"physics-T12-020", question: "At 6.0 V, 0.25 C passes a component. Energy transferred is…", options: ["0.042 J", "1.5 J", "24 J", "150 J"], correctIndex: 1, explanation: "W = VQ = 6.0×0.25 = 1.5 J." },
          {id:"physics-T12-021", question: "Conventional current direction in an external circuit from a battery is…", options: ["negative to positive", "positive to negative", "random", "perpendicular to the wires"], correctIndex: 1, explanation: "By convention: + terminal toward − terminal through the circuit." },
          {id:"physics-T12-022", question: "Electron drift direction in that same external wire is…", options: ["the same as conventional current", "opposite to conventional current", "always zero", "parallel to the magnetic field only"], correctIndex: 1, explanation: "Electrons carry negative charge, so drift is opposite to conventional I." },
          {id:"physics-T12-023", question: "A filament lamp’s I–V curve bends mainly because…", options: ["the lamp is non-ohmic as temperature rises", "frequency changes", "charge is not conserved", "voltage is undefined"], correctIndex: 0, explanation: "Heating changes resistance; not a straight V–I line." },
          {id:"physics-T12-024", question: "Across an ideal diode in forward conduction, current is…", options: ["always zero", "typically large compared with reverse for the same |V|", "always infinite", "always negative"], correctIndex: 1, explanation: "Forward bias allows conduction; reverse blocks (basic model)." },
          {id:"physics-T12-025", question: "EMF of a source is best described as…", options: ["thermal energy per second", "energy supplied per unit charge by the source", "current per unit voltage", "resistance of the source only"], correctIndex: 1, explanation: "EMF is energy per coulomb supplied (when open-circuit, conceptually)." },
          {id:"physics-T12-026", question: "If R = 8 Ω and I = 0.50 A, the p.d. across the resistor is…", options: ["0.0625 V", "4.0 V", "8.5 V", "16 V"], correctIndex: 1, explanation: "V = IR = 8×0.5 = 4.0 V." },
        ],
        trueFalse: [
          { statement: "Current is measured in volts.", correct: false, explain: "Current is in amperes." },
          { statement: "V = W/Q.", correct: true, explain: "Definition of p.d." },
          { statement: "R = V/I.", correct: true, explain: "Ohm’s law definition." },
          { statement: "Ohmic conductor has constant resistance.", correct: true, explain: "At constant temperature." },
          { statement: "Electrons flow in same direction as conventional current.", correct: false, explain: "Opposite." },
          { statement: "EMF is energy supplied per unit charge.", correct: true, explain: "Definition." },
          { statement: "A filament lamp is ohmic.", correct: false, explain: "Resistance changes with temperature." },
          { statement: "1 C passing per second is 1 A.", correct: true, explain: "I=Q/t." },
          { statement: "A diode conducts equally in both directions.", correct: false, explain: "Mostly one direction." },
          { statement: "W = VQ.", correct: true, explain: "Energy transferred." },
        ],
      
    });
})();