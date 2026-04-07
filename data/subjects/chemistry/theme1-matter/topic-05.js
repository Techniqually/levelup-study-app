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
        },
        {
            "title": "Elements, compounds, mixtures",
            "points": [
                "**Element** — one type of atom (e.g. O₂ is still element oxygen).",
                "**Compound** — fixed composition by chemical bonding (e.g. H₂O).",
                "**Mixture** — variable composition; can often be separated physically (filtration, distillation)."
            ]
        }
    ,
    {
        "title": "Structure → Properties Summary",
        "points": [
            "**Giant ionic** (NaCl, MgO): high mp/bp; brittle; conducts when molten/dissolved (not solid).",
            "**Giant covalent** (diamond, SiO₂): very high mp; hard; non-conductor (except graphite).",
            "**Simple molecular** (CO₂, CH₄, H₂O): low mp/bp; non-conductor; volatile.",
            "**Giant metallic** (Fe, Al): high mp; malleable/ductile; good conductor (free electrons).",
            "Alloys harder: different-sized atoms **distort lattice** → layers can't slide."
        ]
    }],
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
    ,
    { "front": "Why NaCl conducts when molten but not solid?", "back": "Solid: ions **fixed** in lattice. Molten/dissolved: ions **free to move** → carry charge." },
    { "front": "Why diamond is hard?", "back": "Every C covalently bonded to **4 others** in a rigid 3D lattice — no free layers to slide." },
    { "front": "Why CO₂ is a gas at room T?", "back": "**Simple molecular**: only weak London (van der Waals) forces between molecules — easily overcome at low T." },
    { "front": "Why alloys are harder than pure metals?", "back": "**Different-sized atoms** disrupt the regular lattice → layers cannot slide easily → increased hardness." },
    { "front": "Graphite conducts electricity because?", "back": "Each C bonds to **3 others** → 1 **delocalised electron** per C moves along layers." }],
    quiz: [
    {id:"chem-T5-001",question:"Which conducts when solid:",options:["NaCl crystal","Diamond","Copper","Sulfur powder"],correctIndex:2,explanation:"Mobile electrons in metal."},
    {id:"chem-T5-002",question:"Ionic compound in solid state:",options:["Conducts electricity","Ions fixed — no conduction","Always gas","Magnetic always"],correctIndex:1,explanation:"Lattice locked."},
    {id:"chem-T5-003",question:"Covalent bond is:",options:["Transfer","Shared pair","Sea of electrons","Ion pair only"],correctIndex:1,explanation:"Non-metal + non-metal often."},
    {id:"chem-T5-004",question:"Simple molecular iodine:",options:["Very high mp","Low mp — weak IM forces","Metallic","Ionic lattice"],correctIndex:1,explanation:"I₂ molecules."},
    {id:"chem-T5-005",question:"Graphite lubricant because:",options:["Ionic layers","Weak forces between layers slide","Gas","Dissolves in water"],correctIndex:1,explanation:"Sheets slip."},
    {id:"chem-T5-006",question:"Electronegativity across period:",options:["Decreases","Increases","Constant","Zero"],correctIndex:1,explanation:"Attraction for bonding e⁻."},
    {id:"chem-T5-007",question:"Polar molecule example:",options:["Cl₂","HCl","N₂","O₂"],correctIndex:1,explanation:"ΔEN."},
    {id:"chem-T5-008",question:"NH₄⁺ has:",options:["Only ionic bonds","Dative covalent to H⁺","Metallic bond","No bonds"],correctIndex:1,explanation:"Coordinate bond."},
    {id:"chem-T5-009",question:"MgO vs NaCl melting point:",options:["MgO lower","MgO higher (stronger ionic attraction)","Same","Cannot compare"],correctIndex:1,explanation:"2+ and 2− vs 1+1−."},
    {id:"chem-T5-010",question:"Hydrogen bond in ice:",options:["Makes denser","Open structure — ice floats","No H bonds","Only covalent"],correctIndex:1,explanation:"Expanded lattice."},
    {id:"chem-T5-011",question:"Metallic bonding strength affects:",options:["Only colour","Melting point","Nothing","Only gas"],correctIndex:1,explanation:"Stronger bond → higher mp."},
    {id:"chem-T5-012",question:"SiO₂ structure:",options:["Simple molecular","Giant covalent","Metallic","Ionic only"],correctIndex:1,explanation:"Network solid."},
    {id:"chem-T5-013",question:"Which has highest bp at 1 atm:",options:["CH₄","H₂O","Ne","H₂"],correctIndex:1,explanation:"Hydrogen bonding."},
    {id:"chem-T5-014",question:"Double bond:",options:["Two shared pairs","One pair","Three pairs","No electrons"],correctIndex:0,explanation:"e.g. O₂, CO₂."},
    {id:"chem-T5-015",question:"Which compound has ionic bonding?",options:["H₂O","NaCl","CO₂","CH₄"],correctIndex:1,explanation:"Ionic bonding forms between metal and non-metal ions."},
    {id:"chem-T5-016",question:"Van der Waals increase with:",options:["Smaller surface","More electrons / larger molecule","Higher charge only","Ionic character"],correctIndex:1,explanation:"Polarisability."},
    {id:"chem-T5-017",question:"Alloy brass is:",options:["Pure Cu","Cu + Zn","Fe + C","Na + Cl"],correctIndex:1,explanation:"Brass composition."},
    {id:"chem-T5-018",question:"Why metals malleable:",options:["Layers slide without breaking metallic bond","Ionic shatter","Gas","Only gold"],correctIndex:0,explanation:"Sea rearranges."},
    {id:"chem-T5-019",question:"C60 is:",options:["Giant covalent only","Molecular","Ionic","Metal"],correctIndex:1,explanation:"Discrete molecules."},
    {id:"chem-T5-020",question:"Bond in NaCl crystal:",options:["Covalent network","Ionic","Metallic","Hydrogen"],correctIndex:1,explanation:"Electrostatic."},
    {id:"chem-T5-021",question:"Dipole-dipole vs H-bond:",options:["Always same","H-bond stronger involving H-F,O,N","Dipole always stronger","Neither exists"],correctIndex:1,explanation:"H-bond special case."},
    {id:"chem-T5-022",question:"Electronegativity difference large →:",options:["Non-polar covalent","Ionic character high","No bond","Only metal"],correctIndex:1,explanation:"Threshold ~1.7 rule of thumb."},
    {id:"chem-T5-023",question:"Graphite electrode use:",options:["Insulator","Conductor along plane","Only liquid","Never"],correctIndex:1,explanation:"Electrons along layers."},
    {id:"chem-T5-024",question:"Boiling HCl vs HF:",options:["HCl higher","HF higher (H-bonds)","Same","Neither boils"],correctIndex:1,explanation:"HF associates."},
    {id:"chem-T5-025",question:"Ceramic (ionic giant) property:",options:["Ductile","Brittle","Liquid at 25°C","Conducts always"],correctIndex:1,explanation:"Shatters."},
    {id:"chem-T5-026",question:"Metallic lustre due to:",options:["Photon absorption/re-emission by electron sea","Ion colour only","Gas","Water"],correctIndex:0,explanation:"Delocalised e⁻."},
    {id:"chem-T5-027",question:"Intermolecular forces in liquid Br₂:",options:["Covalent bonds break","Weak IM forces between Br₂ molecules","Ionic","None"],correctIndex:1,explanation:"Molecular liquid."},
    {id:"chem-T5-028",question:"Which has the higher boiling point: CH₄ or SiH₄?",options:["CH₄","SiH₄","They must be equal","Neither boils"],correctIndex:1,explanation:"Larger electron cloud → stronger London dispersion forces."},
    {id:"chem-T5-029",question:"Solid NaCl does not conduct electricity because:",options:["It contains no ions","Ions are fixed and cannot move","Electrons swim freely","It is metallic"],correctIndex:1,explanation:"Charge carriers must be mobile."},
    {id:"chem-T5-030",question:"In diamond, each carbon atom forms:",options:["1 covalent bond","2 covalent bonds","3 covalent bonds","4 covalent bonds"],correctIndex:3,explanation:"Diamond is a giant covalent structure with each C bonded to four others."},
    {id:"chem-T5-031",question:"Why is MgO’s lattice stronger than NaCl’s (qualitative)?",options:["MgO is molecular","Higher ion charges (2+ and 2−) strengthen electrostatic attraction","NaCl has covalent character only","MgO has metallic bonding"],correctIndex:1,explanation:"Lattice energy scales strongly with ion charge."},
    {id:"chem-T5-032",question:"Hydrogen fluoride can boil higher than HCl mainly because:",options:["HF is non-polar","HF can hydrogen-bond; HCl cannot","HCl is always ionic","HF has lower Mr"],correctIndex:1,explanation:"Strong intermolecular hydrogen bonding in HF."},
    {id:"chem-T5-033",question:"Metals are ductile largely because:",options:["Ionic layers repel permanently","Layers of ions can slip while the electron sea maintains bonding","Covalent bonds break permanently","They are gases"],correctIndex:1,explanation:"Non-directional metallic bonding allows deformation."},
    {id:"chem-T5-034",question:"Which is a giant covalent structure at room temperature?",options:["I₂","SiO₂","CO₂","H₂O"],correctIndex:1,explanation:"Quartz is a continuous network solid."},
    {id:"chem-T5-035",question:"A ‘polar molecule’ must have:",options:["Only ionic bonds","An overall dipole from bond polarity and shape","Equal sharing in all bonds","No lone pairs"],correctIndex:1,explanation:"Vector sum of bond dipoles can be non-zero (e.g. H₂O)."},
    {id:"chem-T5-036",question:"When NaCl dissolves in water, the main driving factor is:",options:["Covalent bond formation between Na and Cl","Ion–dipole interactions and hydration stabilising separated ions","NaCl becomes metallic","Water oxidises Na⁺"],correctIndex:1,explanation:"Hydration stabilises ions in solution."},
    {id:"chem-T5-037",question:"Graphite conducts electricity but diamond does not mainly because:",options:["Diamond has fewer carbons","Graphite has delocalised π electrons between layers","Diamond is ionic","Graphite is a gas"],correctIndex:1,explanation:"Mobile electrons exist in graphite’s layered structure."},
    {id:"chem-T5-201",question:"A sample of air is best described as:",options:["A compound","An element","A mixture","A single molecule"],correctIndex:2,explanation:"Variable composition of gases."},
    {id:"chem-T5-202",question:"Which statement about a pure molecular substance (e.g. dry ice, CO₂) is most accurate?",options:["It must be a single atom","It consists of CO₂ molecules with covalent bonds; weak forces between molecules","It has a giant ionic lattice","It cannot sublime"],correctIndex:1,explanation:"Simple molecular — strong covalent bonds within molecules."},
    {id:"chem-T5-203",question:"Covalent character in a bond increases when:",options:["Electronegativity difference is very large","Electronegativity difference is very small","Ions are very large","Temperature is always 0 K"],correctIndex:1,explanation:"Very polar bonds approach ionic; small ΔEN → more covalent character."},
    {id:"chem-T5-204",question:"Compared to a single bond between the same atoms, a double bond is typically:",options:["Longer and weaker","Shorter and stronger","Same length and strength","Only found in ionic solids"],correctIndex:1,explanation:"More shared electron density pulls nuclei closer."},
    {id:"chem-T5-205",question:"Carbon nanotubes are structurally related to:",options:["Diamond only","Graphite layers rolled into cylinders","NaCl lattice","Liquid water"],correctIndex:1,explanation:"sp² carbon networks with exceptional strength along the tube."},
    {id:"chem-T5-206",question:"Molten CaCl₂ conducts electricity because:",options:["Electrons move in a sea","Mobile Ca²⁺ and Cl⁻ ions","It is a metal","Covalent bonds break into electrons"],correctIndex:1,explanation:"Ionic liquids conduct via ion motion."},
    {id:"chem-T5-207",question:"Which is NOT a property typical of simple molecular iodine (I₂) solid?",options:["Low melting point","Weak forces between molecules","I₂ molecules in the crystal","Very high electrical conductivity as solid"],correctIndex:3,explanation:"No mobile charge carriers in solid molecular iodine."},
    {id:"chem-T5-208",question:"A polar bond may still give a non-polar molecule if:",options:["The molecule is always linear","The bond dipoles cancel by symmetry (e.g. CO₂)","The molecule is ionic","Hydrogen bonding is absent"],correctIndex:1,explanation:"Shape matters for overall dipole."},
    {id:"chem-T5-209",question:"The main reason ionic crystals are often soluble in water is:",options:["Ionic bonds are weak","Hydration energy can overcome lattice energy","Water always oxidises the cation","Ions are gases"],correctIndex:1,explanation:"Solubility depends on balance of lattice energy vs hydration."},
    {id:"chem-T5-301",question:"A substance with high melting point, soluble in water, and conducting when molten is most likely:",options:["Simple covalent","Ionic","Metallic only","A gas"],correctIndex:1,explanation:"These are typical ionic compound properties."},
    {id:"chem-T5-302",question:"Why are alloys usually harder than pure metals?",options:["They contain ionic bonds","Different-sized atoms disrupt layer sliding","They have no electrons","They are all compounds"],correctIndex:1,explanation:"Distorted layers do not slide as easily."},
    {id:"chem-T5-303",question:"Methane has a very low boiling point mainly because:",options:["It has ionic bonding","Strong hydrogen bonding between molecules","Only weak intermolecular forces between small molecules","It has metallic bonding"],correctIndex:2,explanation:"Methane is simple molecular with weak intermolecular forces."},
    {id:"chem-T5-304",question:"Which statement about ionic compounds is correct?",options:["They conduct electricity as solids because ions can move","They conduct when molten because ions are free to move","They are always gases","They are insoluble in water in all cases"],correctIndex:1,explanation:"Molten ionic compounds conduct due to mobile ions."},
    {id:"chem-T5-305",question:"Why do metals conduct electricity well?",options:["Metal ions move through the solid","They contain mobile delocalised electrons","They are covalent molecules","They dissolve to form ions first"],correctIndex:1,explanation:"Delocalised electrons can move through the metal lattice."},
    {id:"chem-T5-306",question:"Giant ionic lattice (e.g. NaCl) has a high melting point because:",options:["Covalent bonds are very strong","Strong electrostatic attractions act in all directions between millions of oppositely charged ions — needs a lot of energy to break","It has many electrons","Ionic compounds are always gases"],correctIndex:1,explanation:"Melting requires overcoming the 3D lattice of strong ion–ion attractions. The high coordination number multiplies the energy needed."},
    {id:"chem-T5-307",question:"Diamond has an extremely high melting point because:",options:["It is made of carbon atoms with metallic bonding","Every carbon is covalently bonded to 4 others in a giant 3D network — many strong covalent bonds must all be broken","It has ionic bonds","It is a simple molecular solid"],correctIndex:1,explanation:"Giant covalent network: no molecules — the whole crystal is one enormous covalent structure. Very hard and high-melting."},
    {id:"chem-T5-308",question:"Carbon dioxide CO₂ has a very low boiling point (−78°C) because:",options:["It has ionic bonds","It is a simple molecular substance — only weak intermolecular (van der Waals) forces between CO₂ molecules need to be overcome","It has giant covalent structure","All non-metals have high mp"],correctIndex:1,explanation:"Simple molecular: molecules held by weak London forces → easy to separate → low boiling point."},
    {id:"chem-T5-309",question:"Alloys are harder than the pure metals they are made from because:",options:["Alloys are ionic","Foreign atoms of different size distort the regular metal lattice, making it harder for layers to slide over each other","Alloys have more electrons","Alloys are non-metals"],correctIndex:1,explanation:"In a pure metal, layers slip easily. Different-sized atoms lock layers → harder, stronger."},
    {id:"chem-T5-310",question:"Which correctly compares electrical conductivity of NaCl (sodium chloride)?",options:["Conducts in all states","Conducts when molten or in solution (ions free to move) but NOT when solid (ions fixed in lattice)","Never conducts","Always solid — never conducts"],correctIndex:1,explanation:"Ionic compound: ions fixed in solid lattice → no conduction. In liquid/solution → ions mobile → conducts."}
    ],
    trueFalse: [
    {statement:"Diamond and graphite are both pure carbon but different structures.",correct:true,explain:"Allotropes."},
    {statement:"All covalent substances have low melting points.",correct:false,explain:"Giant covalent exceptions."},
    {statement:"Ionic compounds dissolve in water by ion-dipole interaction.",correct:true,explain:"Hydration of ions."},
    {statement:"Metals conduct electricity because ions move through the lattice.",correct:false,explain:"Electrons move."},
    {statement:"Hydrogen bonding is a type of covalent bond within a water molecule.",correct:false,explain:"Within molecule covalent; between molecules H-bond."},
    {statement:"NaCl vapour contains NaCl molecules.",correct:false,explain:"Vapour often ion pairs/molecules at high T — O-level: lattice breaks to ions in solution/melt."},
    {statement:"Greater charge density on ion tends to strengthen ionic attraction.",correct:true,explain:"Favour smaller highly charged ions."},
    {statement:"Graphite conducts electricity because it has delocalised electrons.",correct:true,explain:"These electrons can move along the layers."},
    {statement:"London dispersion forces exist between all atoms/molecules.",correct:true,explain:"Instantaneous dipoles."},
    {statement:"Triple bond stronger than single bond.",correct:true,explain:"More shared electrons."},
    {statement:"Salt bridge in cell is ionic conduction.",correct:true,explain:"Completes circuit."},
    {statement:"Metallic radius increases down group.",correct:true,explain:"Extra electron shell."}
    ],
    });
})();
