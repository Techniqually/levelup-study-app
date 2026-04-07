(function () {
    window.__registerTopic({

        id: "14",
        theme: "Section V: Electricity and Magnetism",
        title: "Practical Electricity",
        cheatBlocks: [
          { title: "Power, energy, cost", points: [
            "Power \(P = VI\\) (also \(P = I^2R\\), \(P = V^2/R\\)).",
            "Electrical energy \(E = Pt\\). kWh: 1 kWh = 3.6×10⁶ J.",
            "Cost = energy (kWh) × tariff."
          ]},
          { title: "Mains electricity basics", points: [
            "Mains supply: AC at fixed frequency (context), high voltage for efficiency.",
            "Live wire at high potential, neutral near 0 V, earth safety wire connected to casing.",
            "Fuse in live wire: melts if current too high."
          ]},
          { title: "Safety", points: [
            "Dangers: electric shock, overheating, fire.",
            "Use correct fuse rating; avoid overloading sockets; intact insulation.",
            "Earthing + double insulation reduce risk."
          ]},
        ],
        flashcards: [
          { front: "Electrical power", back: "P = VI" },
          { front: "Electrical energy", back: "E = Pt" },
          { front: "1 kWh in J", back: "3.6×10⁶ J" },
          { front: "Fuse function", back: "melts to break circuit when current too high" },
          { front: "Live wire", back: "high potential difference relative to earth" },
          { front: "Neutral wire", back: "near 0 V return path" },
          { front: "Earth wire", back: "safety; connects casing to earth" },
          { front: "Overloading causes…", back: "overheating/fire risk" },
          { front: "Double insulation means…", back: "no earth wire needed; plastic casing" },
          { front: "Power in resistor", back: "P=I²R" },
          { front: "Why transmit at high voltage", back: "lower current for same power → less I²R loss" },
          { front: "kWh meaning", back: "energy used by 1 kW device for 1 hour" },
        ],
        quiz: [
          {id:"physics-T14-001", question: "Electrical power equals…", options: ["VI", "V/I", "I/V", "F/A"], correctIndex: 0, explanation: "P=VI." },
          {id:"physics-T14-002", question: "Energy used by 2 kW heater for 3 h is…", options: ["6 kWh", "1.5 kWh", "5 kWh", "0.67 kWh"], correctIndex: 0, explanation: "2×3=6 kWh." },
          {id:"physics-T14-003", question: "1 kWh equals…", options: ["3600 J", "3.6×10⁶ J", "3.6×10³ J", "3.6×10⁸ J"], correctIndex: 1, explanation: "1000 W×3600 s." },
          {id:"physics-T14-004", question: "Fuse is placed in the…", options: ["neutral", "live", "earth", "all"], correctIndex: 1, explanation: "So it cuts off dangerous live supply." },
          {id:"physics-T14-005", question: "Earth wire is connected to…", options: ["metal casing", "live terminal", "neutral terminal", "plastic cover"], correctIndex: 0, explanation: "Safety to ground." },
          {id:"physics-T14-006", question: "Overloading a socket causes…", options: ["lower current", "overheating", "cooling", "no change"], correctIndex: 1, explanation: "Excess current heats wires." },
          {id:"physics-T14-007", question: "A device with double insulation usually has… wires", options: ["2", "3", "4", "1"], correctIndex: 0, explanation: "Live + neutral only." },
          {id:"physics-T14-008", question: "High voltage transmission reduces power loss because current is…", options: ["higher", "lower", "same", "zero"], correctIndex: 1, explanation: "For fixed power, I=P/V." },
          {id:"physics-T14-009", question: "Power loss in wires is mainly…", options: ["IV", "I²R", "V²R", "Q/t"], correctIndex: 1, explanation: "Heating loss." },
          {id:"physics-T14-010", question: "If tariff is $0.30/kWh, cost of 6 kWh is…", options: ["$0.18", "$1.80", "$18", "$0.60"], correctIndex: 1, explanation: "6×0.30=1.80." },
          {id:"physics-T14-011", question: "Neutral wire is at…", options: ["high potential", "near 0 V", "always 240 V", "unknown"], correctIndex: 1, explanation: "Near earth potential." },
          {id:"physics-T14-012", question: "Earth wire prevents shock by…", options: ["increasing current", "providing low-resistance path to ground", "increasing voltage", "stopping fuse"], correctIndex: 1, explanation: "Large fault current blows fuse." },
          {id:"physics-T14-013", question: "A fuse works because it…", options: ["is a thick wire", "melts when current too high", "blocks voltage", "increases resistance always"], correctIndex: 1, explanation: "Heating melts fuse element." },
          {id:"physics-T14-014", question: "Energy formula", options: ["E=Pt", "E=V/I", "E=F/A", "E=ma"], correctIndex: 0, explanation: "E=Pt." },
          {id:"physics-T14-015", question: "If V doubles for same power, current…", options: ["doubles", "halves", "same", "quadruples"], correctIndex: 1, explanation: "I=P/V." },
          {id:"physics-T14-016", question: "Main danger of damaged insulation", options: ["lower cost", "electric shock", "better conduction", "higher efficiency"], correctIndex: 1, explanation: "Exposed live parts." },
          {id:"physics-T14-017", question: "A 1500 W kettle runs for 20 minutes. Energy used is…", options: ["0.5 kWh", "1.0 kWh", "30 kWh", "500 kWh"], correctIndex: 0, explanation: "20 min = 1/3 h ⇒ E = 1.5 kW×(1/3) h = 0.5 kWh." },
          {id:"physics-T14-018", question: "At $0.25 per kWh, that 0.5 kWh costs…", options: ["$0.125", "$0.25", "$0.50", "$2.50"], correctIndex: 0, explanation: "Cost = 0.5×0.25 = $0.125." },
          {id:"physics-T14-019", question: "3.6 MJ equals how many kWh?", options: ["0.1 kWh", "1 kWh", "10 kWh", "3600 kWh"], correctIndex: 1, explanation: "1 kWh = 3.6×10⁶ J ⇒ 3.6 MJ = 1 kWh." },
          {id:"physics-T14-020", question: "For the same power delivered, increasing transmission voltage is used mainly to…", options: ["increase line current", "decrease line current for lower I²R losses", "make AC into DC", "remove the need for a fuse"], correctIndex: 1, explanation: "P = VI ⇒ higher V lowers I for same P, reducing resistive heating in lines." },
          {id:"physics-T14-021", question: "A fault connects a metal casing to live. With earthing, the large fault current…", options: ["is impossible", "helps blow the fuse/RCD quickly", "charges the appliance safely", "decreases resistance of people"], correctIndex: 1, explanation: "Low-resistance earth path increases fault current to operate protection." },
          {id:"physics-T14-022", question: "Class II (double-insulated) appliances typically rely on…", options: ["earth wire only", "plastic insulation/enclosure design", "water cooling", "higher fuse current"], correctIndex: 1, explanation: "Two layers of protection; no reliance on earth in basic design." },
          {id:"physics-T14-023", question: "Overloading a multi-socket extension mainly risks…", options: ["too low a current", "overheating from excessive total current", "zero voltage", "perfect safety"], correctIndex: 1, explanation: "Too many high-power devices can exceed safe cable current." },
          {id:"physics-T14-024", question: "Power loss in a distribution line of resistance r carrying current I is…", options: ["Ir", "I²r", "V²r", "I/r"], correctIndex: 1, explanation: "Heating loss P = I²R for the line." },
          {id:"physics-T14-025", question: "A 100 W lamp left on for 10 h uses energy…", options: ["0.1 kWh", "1 kWh", "10 kWh", "1000 kWh"], correctIndex: 1, explanation: "E = Pt = 0.1 kW×10 h = 1 kWh." },
          {id:"physics-T14-026", question: "Which is a unit of electrical energy (billable)?", options: ["kW", "A", "kWh", "Ω"], correctIndex: 2, explanation: "kWh is energy; kW is power." },
        ],
        trueFalse: [
          { statement: "Fuse is put in live wire.", correct: true, explain: "Cuts off live supply on fault." },
          { statement: "Earth wire carries current during normal operation.", correct: false, explain: "It carries current only during faults." },
          { statement: "1 kWh is a unit of power.", correct: false, explain: "It’s a unit of energy." },
          { statement: "Power loss in wires is proportional to I².", correct: true, explain: "P_loss=I²R." },
          { statement: "Overloading sockets can cause fires.", correct: true, explain: "Heating of wires." },
          { statement: "Double-insulated devices require an earth wire.", correct: false, explain: "They typically do not." },
          { statement: "High-voltage transmission reduces current.", correct: true, explain: "For fixed power." },
          { statement: "Neutral wire is always live.", correct: false, explain: "Neutral is near 0 V but can be dangerous if wiring faulty." },
          { statement: "A fuse has very low melting point wire.", correct: true, explain: "So it melts under excess current." },
          { statement: "E = Pt.", correct: true, explain: "Energy = power × time." },
        ],
      
    });
})();