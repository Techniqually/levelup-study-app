(function () {
  window.__registerTopic({
    id: "5",
    theme: "Theme 1: Matter – Structures & Properties",
    title: "Chemical Bonding and Structure",
    cheatBlocks: [
        {
            "title": "Ionic",
            "points": [
                "Metal + non-metal → **electron transfer** → ions.",
                "**Giant ionic lattice** — high mp, brittle, insulators solid; conduct molten/aqueous."
            ]
        },
        {
            "title": "Covalent",
            "points": [
                "Share pairs; **simple molecular** (low mp, often insoluble in water) vs **giant covalent** (diamond, graphite, SiO₂).",
                "**Intermolecular forces** weak between molecules in simple covalent."
            ]
        },
        {
            "title": "Metallic",
            "points": [
                "**Sea of delocalised electrons** + fixed cations.",
                "Conduct heat/electricity, malleable."
            ]
        }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/matter-05-Bonding.jpg", caption: "Ionic, covalent and metallic bonding" },
      { svg: "<svg viewBox=\"0 0 280 110\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"280\" height=\"110\" fill=\"#1c222d\"/><text x=\"8\" y=\"18\" fill=\"#5eead4\" font-size=\"10\">IONIC</text><text x=\"10\" y=\"48\" fill=\"#a78bfa\" font-size=\"22\">Na⁺</text><text x=\"120\" y=\"48\" fill=\"#fb923c\" font-size=\"22\">Cl⁻</text><line x1=\"55\" y1=\"42\" x2=\"105\" y2=\"42\" stroke=\"#666\" stroke-width=\"2\"/><text x=\"8\" y=\"88\" fill=\"#5eead4\" font-size=\"10\">COVALENT</text><circle cx=\"200\" cy=\"82\" r=\"12\" fill=\"none\" stroke=\"#4ade80\" stroke-width=\"2\"/><circle cx=\"235\" cy=\"82\" r=\"12\" fill=\"none\" stroke=\"#4ade80\" stroke-width=\"2\"/><line x1=\"212\" y1=\"82\" x2=\"223\" y2=\"82\" stroke=\"#4ade80\" stroke-width=\"3\"/></svg>", caption: "Ionic vs covalent (simplified)" }
    ],
    flashcards: [
        {
            "front": "Why molten NaCl conducts?",
            "back": "Ions mobile."
        },
        {
            "front": "Diamond hardness?",
            "back": "Each C tetrahedral; giant covalent."
        },
        {
            "front": "Graphite conducts along layers?",
            "back": "Delocalised π electrons between planes."
        },
        {
            "front": "Metallic bond?",
            "back": "Cations in electron sea."
        },
        {
            "front": "CO₂ bp low?",
            "back": "Simple molecular; weak IM forces."
        },
        {
            "front": "SiO₂ mp very high?",
            "back": "Giant covalent network."
        },
        {
            "front": "Dative covalent bond?",
            "back": "Both electrons from one atom (e.g. NH₄⁺)."
        },
        {
            "front": "Polar covalent bond?",
            "back": "Unequal sharing — ΔEN."
        },
        {
            "front": "Hydrogen bonding?",
            "back": "Strong IM force; F,O,N with H."
        },
        {
            "front": "Ionic crystal brittle?",
            "back": "Ion layers slip → same charges align → repel."
        },
        {
            "front": "Alloys harder than pure metal?",
            "back": "Different size atoms disrupt layers."
        },
        {
            "front": "Fullerene?",
            "back": "Molecular carbon cages (e.g. C₆₀)."
        },
        {
            "front": "Graphene?",
            "back": "Single layer graphite; strong 2D."
        },
        {
            "front": "Van der Waals?",
            "back": "Weak forces all molecules; stronger for larger surface."
        }
    ],
    quiz: [
    {question:"Which conducts when solid:",options:["NaCl crystal","Diamond","Copper","Sulfur powder"],correctIndex:2,explanation:"Mobile electrons in metal."},
    {question:"Ionic compound in solid state:",options:["Conducts electricity","Ions fixed — no conduction","Always gas","Magnetic always"],correctIndex:1,explanation:"Lattice locked."},
    {question:"Covalent bond is:",options:["Transfer","Shared pair","Sea of electrons","Ion pair only"],correctIndex:1,explanation:"Non-metal + non-metal often."},
    {question:"Simple molecular iodine:",options:["Very high mp","Low mp — weak IM forces","Metallic","Ionic lattice"],correctIndex:1,explanation:"I₂ molecules."},
    {question:"Graphite lubricant because:",options:["Ionic layers","Weak forces between layers slide","Gas","Dissolves in water"],correctIndex:1,explanation:"Sheets slip."},
    {question:"Electronegativity across period:",options:["Decreases","Increases","Constant","Zero"],correctIndex:1,explanation:"Attraction for bonding e⁻."},
    {question:"Polar molecule example:",options:["Cl₂","HCl","N₂","O₂"],correctIndex:1,explanation:"ΔEN."},
    {question:"NH₄⁺ has:",options:["Only ionic bonds","Dative covalent to H⁺","Metallic bond","No bonds"],correctIndex:1,explanation:"Coordinate bond."},
    {question:"MgO vs NaCl melting point:",options:["MgO lower","MgO higher (stronger ionic attraction)","Same","Cannot compare"],correctIndex:1,explanation:"2+ and 2− vs 1+1−."},
    {question:"Hydrogen bond in ice:",options:["Makes denser","Open structure — ice floats","No H bonds","Only covalent"],correctIndex:1,explanation:"Expanded lattice."},
    {question:"Metallic bonding strength affects:",options:["Only colour","Melting point","Nothing","Only gas"],correctIndex:1,explanation:"Stronger bond → higher mp."},
    {question:"SiO₂ structure:",options:["Simple molecular","Giant covalent","Metallic","Ionic only"],correctIndex:1,explanation:"Network solid."},
    {question:"Which has highest bp at 1 atm:",options:["CH₄","H₂O","Ne","H₂"],correctIndex:1,explanation:"Hydrogen bonding."},
    {question:"Double bond:",options:["Two shared pairs","One pair","Three pairs","No electrons"],correctIndex:0,explanation:"e.g. O₂, CO₂."},
    {question:"Coordinate bond in CO (concept):",options:["Both e⁻ from O only","Both from C","One from each always","Ionic"],correctIndex:0,explanation:"Lone pair from O to C (A-level)."},
    {question:"Van der Waals increase with:",options:["Smaller surface","More electrons / larger molecule","Higher charge only","Ionic character"],correctIndex:1,explanation:"Polarisability."},
    {question:"Alloy brass is:",options:["Pure Cu","Cu + Zn","Fe + C","Na + Cl"],correctIndex:1,explanation:"Brass composition."},
    {question:"Why metals malleable:",options:["Layers slide without breaking metallic bond","Ionic shatter","Gas","Only gold"],correctIndex:0,explanation:"Sea rearranges."},
    {question:"C60 is:",options:["Giant covalent only","Molecular","Ionic","Metal"],correctIndex:1,explanation:"Discrete molecules."},
    {question:"Bond in NaCl crystal:",options:["Covalent network","Ionic","Metallic","Hydrogen"],correctIndex:1,explanation:"Electrostatic."},
    {question:"Dipole-dipole vs H-bond:",options:["Always same","H-bond stronger involving H-F,O,N","Dipole always stronger","Neither exists"],correctIndex:1,explanation:"H-bond special case."},
    {question:"Electronegativity difference large →:",options:["Non-polar covalent","Ionic character high","No bond","Only metal"],correctIndex:1,explanation:"Threshold ~1.7 rule of thumb."},
    {question:"Graphite electrode use:",options:["Insulator","Conductor along plane","Only liquid","Never"],correctIndex:1,explanation:"Electrons along layers."},
    {question:"Boiling HCl vs HF:",options:["HCl higher","HF higher (H-bonds)","Same","Neither boils"],correctIndex:1,explanation:"HF associates."},
    {question:"Ceramic (ionic giant) property:",options:["Ductile","Brittle","Liquid at 25°C","Conducts always"],correctIndex:1,explanation:"Shatters."},
    {question:"Metallic lustre due to:",options:["Photon absorption/re-emission by electron sea","Ion colour only","Gas","Water"],correctIndex:0,explanation:"Delocalised e⁻."},
    {question:"Intermolecular forces in liquid Br₂:",options:["Covalent bonds break","Weak IM forces between Br₂ molecules","Ionic","None"],correctIndex:1,explanation:"Molecular liquid."}
    ],
    trueFalse: [
    {statement:"Diamond and graphite are both pure carbon but different structures.",correct:true,explain:"Allotropes."},
    {statement:"All covalent substances have low melting points.",correct:false,explain:"Giant covalent exceptions."},
    {statement:"Ionic compounds dissolve in water by ion-dipole interaction.",correct:true,explain:"Hydration of ions."},
    {statement:"Metals conduct electricity because ions move through the lattice.",correct:false,explain:"Electrons move."},
    {statement:"Hydrogen bonding is a type of covalent bond within a water molecule.",correct:false,explain:"Within molecule covalent; between molecules H-bond."},
    {statement:"NaCl vapour contains NaCl molecules.",correct:false,explain:"Vapour often ion pairs/molecules at high T — O-level: lattice breaks to ions in solution/melt."},
    {statement:"Greater charge density on ion tends to strengthen ionic attraction.",correct:true,explain:"Favour smaller highly charged ions."},
    {statement:"Graphite has only sp³ hybridised carbons.",correct:false,explain:"sp² in layers."},
    {statement:"London dispersion forces exist between all atoms/molecules.",correct:true,explain:"Instantaneous dipoles."},
    {statement:"Triple bond stronger than single bond.",correct:true,explain:"More shared electrons."},
    {statement:"Salt bridge in cell is ionic conduction.",correct:true,explain:"Completes circuit."},
    {statement:"Metallic radius increases down group.",correct:true,explain:"Extra electron shell."}
    ],
    });
})();
