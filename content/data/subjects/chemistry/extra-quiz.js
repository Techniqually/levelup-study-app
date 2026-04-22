(function () {
  window.EXTRA_QUIZ_BY_TOPIC = window.EXTRA_QUIZ_BY_TOPIC || {};
  window.EXTRA_THEME_QUIZ = window.EXTRA_THEME_QUIZ || {};

  const extraThemeQuiz = {
    "Theme 1: Matter – Structures & Properties": [
      { id:"chem-T1-A01", question: "An isotope has the same number of which particle as another isotope of the same element?", options: ["Neutrons", "Nucleons", "Protons", "Electrons only in ions"], correctIndex: 2, explanation: "Isotopes are atoms of the same element, so they keep the same proton number." },
      { id:"chem-T1-A02", question: "Which statement best explains why graphite conducts electricity?", options: ["It has ionic bonds", "It has delocalized electrons between layers", "Its layers are neutral so ions can move", "It contains metal impurities"], correctIndex: 1, explanation: "Each carbon in graphite contributes one electron that can move along layers." },
      { id:"chem-T1-A03", question: "A pure substance boils over a narrow temperature range because it has:", options: ["Molecules with equal masses", "Only one kind of particle", "No intermolecular forces", "A low melting point"], correctIndex: 1, explanation: "A pure substance has a fixed composition and characteristic phase-change temperatures." },      
      { id:"chem-T1-A04", question: "Which electronic configuration corresponds to a Group 17 element in Period 3?", options: ["2,8,7", "2,7", "2,8,8,1", "2,8,6"], correctIndex: 0, explanation: "Group 17 has 7 valence electrons, and Period 3 has three occupied shells." },
      { id:"chem-T1-A05", question: "Why is giant ionic structure usually brittle?", options: ["Ions are soft", "Layers of ions slide and like charges repel", "Cations evaporate first", "Anions melt at room temperature"], correctIndex: 1, explanation: "When layers shift, like-charged ions align and repel strongly, causing fracture." },
      { id:"chem-T1-A06", question: "A sample of gas diffuses faster at higher temperature mainly because:", options: ["Particles become lighter", "Particles move with higher average kinetic energy", "Gas becomes ionic", "Volume must decrease"], correctIndex: 1, explanation: "Higher temperature increases average kinetic energy, raising molecular speed." },
      { id:"chem-T1-A07", question: "Which test gives the best evidence that a liquid is pure?", options: ["It is colorless", "It has one sharp boiling point", "It dissolves in water", "It smells neutral"], correctIndex: 1, explanation: "Purity is indicated by a fixed boiling point under the same pressure." },
      { id:"chem-T1-A08", question: "Covalent compounds generally have low melting points because:", options: ["Molecules are always nonpolar", "Strong bonds inside molecules but weak forces between molecules", "They contain free ions", "Their atoms are very small"], correctIndex: 1, explanation: "Intermolecular forces are weaker than ionic or giant covalent lattices." },
      { id:"chem-T1-A09", question: "Which property most strongly suggests metallic bonding?", options: ["Conducts when molten only", "Malleable and conducts as solid", "Brittle with high solubility", "Forms acidic oxide with water"], correctIndex: 1, explanation: "Delocalized electrons explain both electrical conduction and malleability." },
    ],
    "Theme 2: Chemical Reactions": [
      { id:"chem-T2-A02", question: "What is the limiting reagent in stoichiometry?", options: ["The reactant with highest molar mass", "The reactant present in excess", "The reactant used up first", "The product with least mass"], correctIndex: 2, explanation: "The limiting reagent is consumed first and limits product amount." },
      { id:"chem-T2-A03", question: "Which observation is most direct evidence of a redox reaction?", options: ["Temperature decreases", "Colorless solution turns cloudy", "Oxidation number changes", "A gas dissolves"], correctIndex: 2, explanation: "Redox is defined by oxidation state changes (electron transfer)." },
      { id:"chem-T2-A04", question: "Increasing concentration speeds a reaction mainly because:", options: ["Particles have less energy", "More frequent effective collisions", "Activation energy is doubled", "Catalyst is formed"], correctIndex: 1, explanation: "Higher concentration raises collision frequency and successful collisions per second." },
      { id:"chem-T2-A05", question: "Which salt is insoluble in water?", options: ["Sodium nitrate", "Potassium sulfate", "Silver chloride", "Ammonium carbonate"], correctIndex: 2, explanation: "Most chlorides are soluble except AgCl and PbCl2 (partly)." },
      { id:"chem-T2-A06", question: "A strong acid differs from a weak acid mainly in:", options: ["Concentration only", "Extent of ionization in water", "pH is always below 1", "Presence of oxygen"], correctIndex: 1, explanation: "Strength refers to degree of dissociation, not concentration." },
      { id:"chem-T2-A07", question: "Which statement about catalysts is correct?", options: ["They increase reaction yield permanently", "They lower activation energy pathway", "They shift equilibrium to products only", "They are always metals"], correctIndex: 1, explanation: "Catalysts offer an alternative pathway with lower activation energy." },
      { id:"chem-T2-A08", question: "In blast furnace reduction, iron(III) oxide is reduced mainly by:", options: ["Hydrogen", "Carbon monoxide", "Calcium oxide", "Steam"], correctIndex: 1, explanation: "CO produced from coke reduces Fe2O3 to iron." },
      { id:"chem-T2-A09", question: "Which ion gives a white precipitate with acidified barium nitrate?", options: ["Chloride", "Nitrate", "Sulfate", "Carbonate"], correctIndex: 2, explanation: "Sulfate forms insoluble barium sulfate in this confirmatory test." },
    ],
    "Theme 3: Chemistry in a Sustainable World": [
      { id:"chem-T3-A01", question: "An ester is formed by reaction between:", options: ["Alcohol and alkene", "Carboxylic acid and alcohol", "Alkane and oxygen", "Acid and base only"], correctIndex: 1, explanation: "Esterification combines carboxylic acid and alcohol (often with acid catalyst)." },
      { id:"chem-T3-A02", question: "Why are alkenes more reactive than alkanes?", options: ["They are heavier", "They contain a C=C double bond", "They are all cyclic", "They dissolve less in water"], correctIndex: 1, explanation: "The pi bond in C=C is more reactive and undergoes addition reactions." },
      { id:"chem-T3-A03", question: "A key advantage of biodegradable polymers is:", options: ["They always have higher strength", "They reduce long-term plastic persistence", "They are always cheaper", "They cannot burn"], correctIndex: 1, explanation: "Biodegradable polymers help reduce persistent waste accumulation." },
      { id:"chem-T3-A04", question: "In complete combustion of ethanol, products are:", options: ["CO and H2", "CO2 and H2O", "C and H2O", "CO2 and O2"], correctIndex: 1, explanation: "Complete combustion of alcohols forms carbon dioxide and water." },
      { id:"chem-T3-A05", question: "Which strategy best supports circular economy in polymers?", options: ["Single-use mixed plastics", "Design for reuse and easier recycling", "Landfill all plastics", "Increase virgin monomer use"], correctIndex: 1, explanation: "Designing products for reuse and material recovery reduces waste and resource use." },
    ],
  };

  window.EXTRA_THEME_QUIZ = { ...window.EXTRA_THEME_QUIZ, ...extraThemeQuiz };
})();

