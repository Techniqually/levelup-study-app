(function () {
    window.__registerTopic({

        id: "16",
        theme: "Section VI: Radioactivity",
        title: "Radioactivity",
        cheatBlocks: [
          { title: "Atomic structure recap", points: [
            "Atom: nucleus (protons + neutrons), electrons in shells.",
            "Proton number Z determines element; mass number A = p + n.",
            "Isotopes: same Z, different n; same chemical properties, different physical (mass)."
          ]},
          { title: "Types of radiation", points: [
            "Alpha (α): helium nucleus (2p+2n), +2 charge, very ionising, low penetration (stopped by paper).",
            "Beta (β): electron (β−) from nucleus, moderately ionising, medium penetration (stopped by thin aluminium).",
            "Gamma (γ): EM wave, weakly ionising, highly penetrating (needs thick lead/concrete)."
          ]},
          { title: "Decay + safety + uses", points: [
            "Radioactive decay is random; half-life: time for activity/count to halve.",
            "Safety: time, distance, shielding; avoid ingestion/inhalation; use tongs/lead.",
            "Uses: smoke detectors (α), thickness control (β), sterilisation and cancer treatment (γ) with control and precautions."
          ]},
        ],
        flashcards: [
          { front: "Mass number", back: "A = p + n" },
          { front: "Atomic number", back: "Z = number of protons" },
          { front: "Isotopes", back: "same protons, different neutrons" },
          { front: "Alpha nature", back: "helium nucleus (+2)" },
          { front: "Beta nature", back: "electron (β−)" },
          { front: "Gamma nature", back: "EM radiation" },
          { front: "Most ionising", back: "alpha" },
          { front: "Most penetrating", back: "gamma" },
          { front: "Stopped by paper", back: "alpha" },
          { front: "Stopped by thin aluminium", back: "beta" },
          { front: "Shield for gamma", back: "thick lead/concrete" },
          { front: "Half-life", back: "time for activity/count-rate to halve" },
        ],
        quiz: [
          {id:"physics-T16-001", question: "Atomic number is number of…", options: ["neutrons", "protons", "electrons always", "nucleons"], correctIndex: 1, explanation: "Z = protons." },
          {id:"physics-T16-002", question: "Mass number equals…", options: ["p+n", "p−n", "n−p", "p only"], correctIndex: 0, explanation: "A=p+n." },
          {id:"physics-T16-003", question: "Alpha particle is…", options: ["electron", "photon", "helium nucleus", "neutron"], correctIndex: 2, explanation: "2p+2n." },
          {id:"physics-T16-004", question: "Gamma radiation is…", options: ["particle", "EM wave", "ion", "atom"], correctIndex: 1, explanation: "Photon radiation." },
          {id:"physics-T16-005", question: "Most penetrating", options: ["alpha", "beta", "gamma", "all same"], correctIndex: 2, explanation: "Gamma." },
          {id:"physics-T16-006", question: "Most ionising", options: ["alpha", "beta", "gamma", "none"], correctIndex: 0, explanation: "Alpha." },
          {id:"physics-T16-007", question: "Alpha is stopped by…", options: ["paper", "thin aluminium", "thick lead", "vacuum only"], correctIndex: 0, explanation: "Paper/skin." },
          {id:"physics-T16-008", question: "Beta is stopped by…", options: ["paper", "thin aluminium", "air only", "glass always"], correctIndex: 1, explanation: "Aluminium." },
          {id:"physics-T16-009", question: "Half-life is time for… to halve", options: ["mass", "temperature", "activity/count-rate", "speed"], correctIndex: 2, explanation: "Activity halves." },
          {id:"physics-T16-010", question: "Safety principle NOT correct", options: ["increase time", "increase distance", "use shielding", "minimise time"], correctIndex: 0, explanation: "Minimise time near source." },
          {id:"physics-T16-011", question: "Isotopes have same…", options: ["neutrons", "mass number", "proton number", "all"], correctIndex: 2, explanation: "Same protons define element." },
          {id:"physics-T16-012", question: "Smoke detectors commonly use…", options: ["alpha", "beta", "gamma", "infrared"], correctIndex: 0, explanation: "Alpha source (e.g. Am-241) in some detectors." },
          {id:"physics-T16-013", question: "Thickness control uses…", options: ["alpha", "beta", "gamma", "microwaves"], correctIndex: 1, explanation: "Beta penetrates thin sheets; absorption depends on thickness." },
          {id:"physics-T16-014", question: "Sterilising medical equipment often uses…", options: ["alpha", "beta", "gamma", "sound"], correctIndex: 2, explanation: "Gamma." },
          {id:"physics-T16-015", question: "If count rate is 800 and half-life is 2 h, after 6 h it is…", options: ["400", "200", "100", "50"], correctIndex: 2, explanation: "6h=3 half-lives: 800→400→200→100." },
          {id:"physics-T16-016", question: "Ionising radiation danger is mainly…", options: ["DNA damage", "making things cold", "increasing mass", "creating sound"], correctIndex: 0, explanation: "Ionisation damages cells." },
          {id:"physics-T16-017", question: "After 3 half-lives, the undecayed fraction of nuclei is about…", options: ["1/2", "1/4", "1/8", "1/16"], correctIndex: 2, explanation: "Each half-life halves the remainder: (1/2)³ = 1/8." },
          {id:"physics-T16-018", question: "¹⁴C and ¹²C are isotopes of carbon. They have the same…", options: ["neutron number", "proton number", "mass number", "nuclear charge sign"], correctIndex: 1, explanation: "Isotopes share Z (protons); differ in neutron count." },
          {id:"physics-T16-019", question: "An α particle’s charge is best described as…", options: ["−1e", "0", "+1e", "+2e"], correctIndex: 3, explanation: "α is a helium nucleus: two protons ⇒ +2e." },
          {id:"physics-T16-020", question: "A β⁻ particle is essentially…", options: ["a helium nucleus", "a high-speed electron from the nucleus", "a neutral neutron alone", "visible light"], correctIndex: 1, explanation: "β⁻ emission involves an electron (plus antineutrino, usually not examined numerically)." },
          {id:"physics-T16-021", question: "Which radiation type is the least penetrating in materials (typical ranking)?", options: ["gamma", "beta", "alpha", "all equal"], correctIndex: 2, explanation: "α is stopped easily (paper/skin); penetration is lowest." },
          {id:"physics-T16-022", question: "Which is a reason radioactive decay is hard to predict for one nucleus?", options: ["it is non-random", "it is random", "it depends on the day of the week", "it needs sunlight"], correctIndex: 1, explanation: "Decay is probabilistic; exact moment for a given nucleus is random." },
          {id:"physics-T16-023", question: "Background radiation includes contributions from…", options: ["only classroom lights", "Earth materials, cosmic rays, and some natural radon (context)", "only beta rays from batteries", "only DC circuits"], correctIndex: 1, explanation: "Natural/environmental sources contribute everywhere (basic context)." },
          {id:"physics-T16-024", question: "For a given isotope, half-life is…", options: ["different for every atom of that isotope", "a constant characteristic of that isotope (usual syllabus model)", "equal to full decay time always", "zero"], correctIndex: 1, explanation: "Half-life is an isotope property (conditions assumed standard)." },
          {id:"physics-T16-025", question: "Industrial thickness monitoring of thin metal/foil often uses… because absorption depends strongly on thickness.", options: ["alpha", "beta", "gamma only", "sound in vacuum"], correctIndex: 1, explanation: "β is partially absorbed; transmitted intensity changes with thickness." },
          {id:"physics-T16-026", question: "Ingesting an α-emitter is especially hazardous mainly because…", options: ["α penetrates deep in tissue", "α is highly ionising but stopped inside tissue (high local dose)", "α has infinite range", "α is non-ionising"], correctIndex: 1, explanation: "Short range concentrates ionisation damage locally if taken inside." },
        ],
        trueFalse: [
          { statement: "Radioactive decay is random.", correct: true, explain: "Unpredictable for a single nucleus." },
          { statement: "Alpha is the most penetrating.", correct: false, explain: "Alpha is least penetrating." },
          { statement: "Gamma is an electromagnetic wave.", correct: true, explain: "Photon radiation." },
          { statement: "Beta particles have +2 charge.", correct: false, explain: "Beta (β−) is electron, -1." },
          { statement: "Half-life is constant for a given isotope.", correct: true, explain: "Independent of conditions (basic syllabus)." },
          { statement: "Distance reduces exposure by spreading out radiation.", correct: true, explain: "Intensity falls with distance." },
          { statement: "Paper can stop gamma rays.", correct: false, explain: "Need thick lead/concrete." },
          { statement: "Isotopes have different chemical properties.", correct: false, explain: "Chemical depends on protons/electrons; isotopes differ mainly in physical." },
          { statement: "Ionising radiation can damage living tissue.", correct: true, explain: "Ionisation harms cells/DNA." },
          { statement: "Increasing shielding increases safety.", correct: true, explain: "Reduces exposure." },
        ],
      
    });
})();