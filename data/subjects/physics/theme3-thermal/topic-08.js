(function () {
    window.__registerTopic({

        id: "8",
        theme: "Section III: Thermal Physics",
        title: "Thermal Processes",
        cheatBlocks: [
          { title: "Thermal equilibrium + temperature", points: [
            "Temperature is a measure of hotness; in equilibrium, bodies have same temperature.",
            "Heat flows from higher temperature to lower temperature until equilibrium.",
            "Thermometer needs **good thermal contact** and small heat capacity for fast response."
          ]},
          { title: "Conduction, convection, radiation", points: [
            "**Conduction** (solids): energy transfer by particle collisions and free electrons (metals).",
            "**Convection** (fluids): bulk motion due to density changes (warm fluid rises).",
            "**Radiation**: infrared EM waves; no medium needed; all objects emit IR."
          ]},
          { title: "Absorption/emission + applications", points: [
            "Dull black surfaces are good **absorbers/emitters** of IR; shiny surfaces are poor.",
            "Vacuum flask reduces conduction (vacuum), convection (vacuum), radiation (silvered surfaces).",
            "Insulation: trapped air (poor conductor), double glazing, reflective foil."
          ]},
        ],
        flashcards: [
          { front: "Thermal equilibrium", back: "No net heat flow; same temperature." },
          { front: "Conduction happens mainly in…", back: "solids (esp. metals via electrons)" },
          { front: "Convection happens in…", back: "liquids and gases (fluids)" },
          { front: "Radiation requires medium?", back: "No; travels through vacuum." },
          { front: "Good IR absorber", back: "dull black surface" },
          { front: "Good IR reflector", back: "shiny/silver surface" },
          { front: "Why warm air rises", back: "expands → density decreases → buoyant upthrust" },
          { front: "Vacuum flask: vacuum reduces…", back: "conduction + convection" },
          { front: "Double glazing reduces heat loss by…", back: "trapping air reduces conduction/convection" },
          { front: "Main radiation from hot objects", back: "infrared" },
          { front: "Metals good conductors because…", back: "free electrons transfer energy fast" },
          { front: "Convection current direction", back: "hot rises, cool sinks" },
        ],
        quiz: [
          {id:"physics-T8-001", question: "Heat flows from…", options: ["cold to hot", "hot to cold", "high density to low density", "low pressure to high"], correctIndex: 1, explanation: "Energy transfers down temperature gradient." },
          {id:"physics-T8-002", question: "Convection occurs in…", options: ["solids only", "fluids only", "vacuum only", "all states equally"], correctIndex: 1, explanation: "Convection needs fluid motion." },
          {id:"physics-T8-003", question: "Radiation can travel through…", options: ["vacuum", "solids only", "liquids only", "cannot travel"], correctIndex: 0, explanation: "EM waves travel in vacuum." },
          {id:"physics-T8-004", question: "Best IR absorber", options: ["shiny silver", "white glossy", "dull black", "transparent"], correctIndex: 2, explanation: "Black/dull absorbs well." },
          {id:"physics-T8-005", question: "Metals conduct by…", options: ["convection", "free electrons", "only radiation", "no mechanism"], correctIndex: 1, explanation: "Electrons carry energy." },
          {id:"physics-T8-006", question: "In a vacuum flask, vacuum reduces…", options: ["radiation", "conduction & convection", "only convection", "only conduction"], correctIndex: 1, explanation: "No particles → no conduction/convection." },
          {id:"physics-T8-007", question: "Silvered surfaces reduce…", options: ["conduction", "convection", "radiation", "density"], correctIndex: 2, explanation: "Reflect IR." },
          {id:"physics-T8-008", question: "Warm air rises because it becomes…", options: ["denser", "less dense", "more massive", "colder"], correctIndex: 1, explanation: "Expansion lowers density." },
          {id:"physics-T8-009", question: "A draught in a room is due to…", options: ["conduction", "convection currents", "radiation only", "evaporation"], correctIndex: 1, explanation: "Moving air from convection." },
          {id:"physics-T8-010", question: "Which reduces heat loss most by radiation?", options: ["vacuum", "thick glass", "shiny foil", "fan"], correctIndex: 2, explanation: "Reflects IR." },
          {id:"physics-T8-011", question: "Thermal equilibrium means…", options: ["same heat", "same temperature", "same mass", "same density"], correctIndex: 1, explanation: "No net heat flow." },
          {id:"physics-T8-012", question: "A good conductor is also a good…", options: ["IR emitter", "insulator", "convector only", "vacuum"], correctIndex: 0, explanation: "Often metallic surfaces emit/absorb depending on surface finish; but conduction is separate. (Exam usually: dull black best emitter.)" },
          {id:"physics-T8-013", question: "Dull black surfaces are good emitters because…", options: ["reflect IR", "absorb/emit IR effectively", "stop convection", "increase density"], correctIndex: 1, explanation: "High emissivity." },
          {id:"physics-T8-014", question: "Conduction in non-metals mainly by…", options: ["electron flow", "particle vibrations/collisions", "bulk motion", "photons only"], correctIndex: 1, explanation: "Lattice vibrations." },
          {id:"physics-T8-015", question: "Sea breeze forms because land…", options: ["heats faster", "heats slower", "is denser", "absorbs less"], correctIndex: 0, explanation: "Land warms air → rises → cooler sea air moves in." },
          {id:"physics-T8-016", question: "IR stands for…", options: ["internal resistance", "infrared", "ionic radiation", "inverse ratio"], correctIndex: 1, explanation: "Infrared." },
          {id:"physics-T8-017", question: "A metal spoon in hot soup feels hot mainly because heat travels along the spoon by…", options: ["convection in the metal", "conduction", "radiation only", "evaporation"], correctIndex: 1, explanation: "Solids: lattice/electron conduction." },
          {id:"physics-T8-018", question: "Putting a lid on a saucepan reduces heat loss mainly by limiting…", options: ["conduction through metal", "convection and evaporation of steam", "radiation from Earth", "sound"], correctIndex: 1, explanation: "Traps warm moist air; reduces convection out." },
          {id:"physics-T8-019", question: "The Sun’s heat reaches Earth through…", options: ["conduction through space", "convection in space", "radiation", "conduction in air only"], correctIndex: 2, explanation: "Vacuum: only radiation." },
          {id:"physics-T8-020", question: "A thermos flask’s silvered inner walls mainly reduce…", options: ["conduction across vacuum", "convection in vacuum", "radiation", "gravity"], correctIndex: 2, explanation: "Reflect IR to reduce radiative transfer." },
          {id:"physics-T8-021", question: "Foam insulation works well partly because trapped air…", options: ["conducts heat very well", "is a poor conductor / stops convection", "emits lots of IR", "is very dense"], correctIndex: 1, explanation: "Air pockets limit conduction/convection." },
          {id:"physics-T8-022", question: "Night-time land breeze (sea warmer than land) happens because…", options: ["water always has lower specific heat", "cool dense air over land sinks and sea air moves in", "radiation stops at night", "convection cannot occur"], correctIndex: 1, explanation: "Pressure/density-driven convection opposite to day sea breeze." },
          {id:"physics-T8-023", question: "A white car stays cooler in sun than a black one mainly because white paint…", options: ["conducts better", "reflects more visible/IR", "emits no radiation", "increases convection"], correctIndex: 1, explanation: "Lower absorption of incident solar radiation." },
          {id:"physics-T8-024", question: "Sitting near a campfire feels hot even when cold air blows past because…", options: ["conduction from smoke", "radiated IR from hot coals", "convection in solids", "latent heat of wood"], correctIndex: 1, explanation: "Line-of-sight IR radiation." },
          {id:"physics-T8-025", question: "Double glazing reduces U-value mainly by…", options: ["thickening glass only", "trapped air/gas gap reducing conduction and convection", "painting black", "increasing pressure"], correctIndex: 1, explanation: "Air layer is insulating." },
          {id:"physics-T8-026", question: "A vacuum in a flask stops conduction and convection because…", options: ["IR cannot pass", "there are no material particles to carry energy", "silver reflects sound", "heat capacity is infinite"], correctIndex: 1, explanation: "No medium for particle transfer." },
        ],
        trueFalse: [
          { statement: "Radiation requires particles to travel.", correct: false, explain: "EM radiation travels in vacuum." },
          { statement: "Convection cannot occur in solids.", correct: true, explain: "No bulk flow." },
          { statement: "Shiny surfaces are good emitters of IR.", correct: false, explain: "They are poor emitters; dull black is best." },
          { statement: "Thermal equilibrium means no net heat flow.", correct: true, explain: "Definition." },
          { statement: "Metals are good conductors due to free electrons.", correct: true, explain: "Electron conduction." },
          { statement: "Vacuum flask reduces convection by vacuum.", correct: true, explain: "No fluid to circulate." },
          { statement: "Warm fluid is denser than cool fluid.", correct: false, explain: "Warm fluid usually less dense." },
          { statement: "Radiation from a heater is mainly infrared.", correct: true, explain: "IR dominates." },
          { statement: "Conduction transfers heat by bulk movement.", correct: false, explain: "That’s convection." },
          { statement: "Black surfaces reflect IR strongly.", correct: false, explain: "Black absorbs strongly." },
        ],
      
    });
})();