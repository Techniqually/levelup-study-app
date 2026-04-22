(function () {
  window.__registerTopic({
    id: "15",
    theme: "Theme 2: Chemical Reactions",
    title: "Chemical Energetics",
    cheatBlocks: [
        {
            "title": "Enthalpy",
            "points": [
                "Exothermic: ΔH negative — heat out.",
                "Endothermic: ΔH positive — heat in.",
                "Activation energy Ea — hill on profile."
            ]
        },
        {
            "title": "Bonds",
            "points": [
                "Breaking bonds endothermic; making bonds exothermic.",
                "$\Delta H \approx \sum E_{\text{broken}} - \sum E_{\text{formed}}$ (bond energy estimate)."
            ]
        },
        {
            "title": "Catalyst",
            "points": [
                "Lowers Ea; does not change ΔH.",
                "Speeds forward and reverse equally."
            ]
        }
    ,
    {
        "title": "Calorimetry & Energy Profiles",
        "points": [
            "Exothermic: products **lower** than reactants on diagram; $\\Delta H < 0$.",
            "Endothermic: products **higher** than reactants; $\\Delta H > 0$.",
            "Activation energy $E_a$ = peak height above reactants.",
            "Catalyst: **lowers $E_a$** (lower peak) but $\\Delta H$ and product/reactant levels unchanged.",
            "$\\Delta H \\approx \\sum E_{\\text{broken}} - \\sum E_{\\text{formed}}$ (bond energy method; endothermic step first)."
        ]
    },
    {
        "title": "Energy Profile Diagrams",
        "points": [
            " **Activation Energy ($E_a$)**: The minimum energy required to start a reaction. It is the height from the **reactants line to the top of the peak**.",
            " **Enthalpy Change ($\\Delta H$)**: The difference in energy between the products and reactants.",
            " **Exothermic**: Products are drawn **lower** than reactants. $\\Delta H$ is negative (downward arrow).",
            " **Endothermic**: Products are drawn **higher** than reactants. $\\Delta H$ is positive (upward arrow)."
        ]
    }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-10-energetics.jpg", caption: "Exothermic and endothermic profiles" } ],
    flashcards: [
        {
            "front": "Combustion ΔH?",
            "back": "Negative (exothermic)."
        },
        {
            "front": "Photosynthesis overall?",
            "back": "Endothermic."
        },
        {
            "front": "Neutralisation?",
            "back": "Exothermic."
        },
        {
            "front": "Thermal decomposition CaCO₃?",
            "back": "Endothermic."
        },
        {
            "front": "Bond breaking?",
            "back": "Endothermic."
        },
        {
            "front": "Haber forward exothermic?",
            "back": "Yes — low T favours NH₃ but rate trade-off."
        },
        {
            "front": "ΔH solution NH₄NO₃ in water?",
            "back": "Endothermic cold pack."
        },
        {
            "front": "Activation energy with catalyst?",
            "back": "Lower pathway."
        },
        {
            "front": "Enthalpy level diagram exo?",
            "back": "Products lower than reactants."
        },
        {
            "front": "Standard conditions?",
            "back": "298 K, 100 kPa, stated state."
        },
        {
            "front": "Combustion enthalpy?",
            "back": "Substance + O₂ → oxides."
        },
    
    { "front": "Exothermic: ΔH sign?", "back": "**Negative** (ΔH < 0). Heat released to surroundings → temperature of solution rises." },
    { "front": "Bond energy ΔH estimate?", "back": "$\\Delta H \\approx \\sum E_{\\text{broken}} - \\sum E_{\\text{formed}}$. Positive = endo; negative = exo." },
    
    { "front": "What does a catalyst do on an energy profile?", "back": "Lowers the activation energy peak — provides a **lower-energy alternative pathway**. ΔH unchanged." }],
    quiz: [
    {id:"chem-T15-001",question:"Exothermic:",options:["Products higher energy","Products lower energy than reactants","No energy change","Only light in"],correctIndex:1,explanation:"Heat released."},
    {id:"chem-T15-002",question:"Endothermic decomposition CaCO₃:",options:["Releases heat","Absorbs heat","No ΔH","Only physical"],correctIndex:1,explanation:"Needs strong heating."},
    {id:"chem-T15-003",question:"Catalyst effect on ΔH:",options:["Increases","Decreases","No change","Doubles"],correctIndex:2,explanation:"Only Ea."},
    {id:"chem-T15-004",question:"Bond forming:",options:["Endothermic","Exothermic","Zero","Only gas"],correctIndex:1,explanation:"Stability."},
    {id:"chem-T15-005",question:"Overall exothermic if:",options:["Bonds broken > formed energy","Bonds formed release more than break cost","Only catalyst","No bonds"],correctIndex:1,explanation:"Net downhill."},
    {id:"chem-T15-006",question:"Hand warmer iron oxidation:",options:["Endothermic","Exothermic","No reaction","Nuclear"],correctIndex:1,explanation:"Heat pack."},
    {id:"chem-T15-007",question:"Cold pack NH₄NO₃:",options:["Exothermic dissolving","Endothermic dissolving","No ΔH","Only gas"],correctIndex:1,explanation:"Absorbs heat."},
    {id:"chem-T15-008",question:"Ea is:",options:["Total ΔH","Barrier to reaction","Only product energy","Catalyst mass"],correctIndex:1,explanation:"Activation."},
    {id:"chem-T15-009",question: "Look at an energy profile diagram for an exothermic reaction. How is the enthalpy change ($\\Delta H$) represented?",options: ["An upward arrow from the reactants to the top of the peak.","A downward arrow from the top of the peak to the products.","A downward arrow from the reactants line to the products line.","An upward arrow from the products line to the reactants line."],correctIndex: 2,explanation: "In an exothermic reaction, the products have less energy than the reactants. The enthalpy change ($\\Delta H$) is the difference between them, represented by a downward arrow (negative value) from the reactants to the products."},
    {id:"chem-T15-010",question:"Combustion methane sign:",options:["Positive ΔH","Negative ΔH","Zero","Undefined"],correctIndex:1,explanation:"Exothermic."},
    {id:"chem-T15-011",question:"Neutralisation strong acid-base:",options:["Strongly endothermic","Exothermic ~57 kJ/mol per mol water context","No heat","Only gas"],correctIndex:1,explanation:"Typical."},
    {id:"chem-T15-012",question:"Graph exothermic profile:",options:["Peak below products","Products below reactants energy","Flat","No peak"],correctIndex:1,explanation:"Downhill net."},
    {id:"chem-T15-013",question:"Enzyme:",options:["Raises ΔH","Lowers Ea","Changes equilibrium only","Consumes product"],correctIndex:1,explanation:"Biocatalyst."},
    {id:"chem-T15-014",question:"Fuel higher enthalpy density:",options:["More energy per kg","Less energy","No combustion","Only solid"],correctIndex:0,explanation:"Useful fuel."},
    {id:"chem-T15-015",question: "Hydrogen reacts with chlorine: $H_2 + Cl_2 \\rightarrow 2HCl$. \nBond energies: H-H = 436 kJ/mol, Cl-Cl = 242 kJ/mol, H-Cl = 431 kJ/mol.\nWhat is the overall enthalpy change ($\\Delta H$) for this reaction?",options: ["+247 kJ/mol","−184 kJ/mol","−247 kJ/mol","+184 kJ/mol"],correctIndex: 1,explanation: "Energy to break bonds (endothermic) = 436 + 242 = 678 kJ. Energy released forming bonds = 2 × 431 = 862 kJ. $\\Delta H$ = Broken - Formed = 678 - 862 = -184 kJ/mol."},
    {id:"chem-T15-016",question:"Bond energy O=O high means:",options:["Hard to break","Easy to break","No O₂","Liquid only"],correctIndex:0,explanation:"Strong bond."},
    {id:"chem-T15-017",question:"Explosion highly exothermic fast:",options:["Slow release","Rapid exothermic gas expansion","Endothermic","Only light"],correctIndex:1,explanation:"TNT etc."},
    {id:"chem-T15-018",question:"Photosynthesis light energy:",options:["Stored in products endothermic overall","Released fully","No storage","Only heat out"],correctIndex:0,explanation:"ΔH>0 overall."},
    {id:"chem-T15-019",question:"Respiration glucose:",options:["Exothermic","Endothermic","No redox","Only physical"],correctIndex:0,explanation:"Energy release."},
    {id:"chem-T15-020",question:"Dissolving NaOH in water:",options:["Cold","Heats up","No change","Freezes"],correctIndex:1,explanation:"Exothermic solvation."},
    {id:"chem-T15-021",question:"Sublimation iodine ΔH:",options:["Negative always","Positive","Zero","Only liquid"],correctIndex:1,explanation:"Endothermic."},
    {id:"chem-T15-022",question:"Activation energy without catalyst higher:",options:["Slower reaction","Faster","Same rate always","No reaction ever"],correctIndex:0,explanation:"Fewer successful collisions."},
    
    {id:"chem-T15-024",question:"Combustion incomplete CO vs CO₂:",options:["CO releases more heat per C","CO₂ releases more complete combustion","Same","Neither exothermic"],correctIndex:1,explanation:"Complete more exothermic per C."},
    {id:"chem-T15-025",question:"Le Chatelier exothermic forward reaction low T:",options:["Favours products equilibrium","Favours reactants","No effect","Explodes"],correctIndex:0,explanation:"Heat as product."},
    
    {id:"chem-T15-027",question:"For an exothermic reaction, the enthalpy change ΔH is:",options:["Positive","Negative","Zero","Always +100 kJ"],correctIndex:1,explanation:"Products lower in enthalpy than reactants → heat released → ΔH < 0."},
    {id:"chem-T15-028",question:"Bond breaking is endothermic because:",options:["Energy is released when bonds break","Energy must be put in to overcome attractions","Bond breaking is always exothermic","Only ionic bonds break"],correctIndex:1,explanation:"Separating bonded atoms costs energy."},
    {id:"chem-T15-029",question:"A catalyst speeds a reaction by:",options:["Increasing ΔH of reaction","Providing a route with lower activation energy","Removing products completely","Shifting equilibrium to products only"],correctIndex:1,explanation:"More molecules have sufficient energy to react per collision."},
    
    
    {id:"chem-T15-032",question:"Which process is typically most endothermic overall?",options:["Combustion of methane","Photosynthesis","Neutralisation of strong acid–base","Freezing of water"],correctIndex:1,explanation:"Light energy stored in products — overall ΔH > 0."},
    {id:"chem-T15-033",question:"Using bond energies, ΔH ≈ Σ(bonds broken) − Σ(bonds made). Why minus bonds made?",options:["Making bonds releases energy (exothermic step)","Making bonds always costs energy","Bonds made are ignored","It should be plus"],correctIndex:0,explanation:"Forming bonds stabilises the system — releases energy."},
    
    {id:"chem-T15-035",question:"Strong exothermic combustion releases energy mainly as:",options:["Only sound","Heat and light","Only magnetic fields","Mass increase"],correctIndex:1,explanation:"Exothermic reactions transfer energy to surroundings."},
    {id:"chem-T15-036",question:"For a reversible reaction that is exothermic in the forward direction, lowering temperature typically shifts equilibrium:",options:["Toward products (forward)","Toward reactants (reverse)","Not at all","Only if ΔH is zero"],correctIndex:0,explanation:"Cooling favours the exothermic direction (Le Chatelier — heat treated as a product)."},
    
    
    {id:"chem-T15-203",question:"Bond energy data estimate ΔH by:",options:["Bonds made minus bonds broken","Bonds broken minus bonds made","Only catalyst mass","Only volume"],correctIndex:1,explanation:"ΔH ≈ Σ break − Σ make (sign convention)."},
    {id:"chem-T15-204",question:"Neutralisation of strong acid + strong base in dilute solution has ΔH about:",options:["+57 kJ per mol water","−57 kJ per mol water (exothermic)","0 kJ","+500 kJ"],correctIndex:1,explanation:"Standard exothermic neutralisation magnitude (context)."},
    {id:"chem-T15-205",question:"Photosynthesis stores energy mainly as:",options:["Heat only","Chemical potential energy in products","Kinetic energy of N₂","Electrical energy in lightning"],correctIndex:1,explanation:"Endothermic — light energy converted to chemical energy."},
    {id:"chem-T15-206",question:"When anhydrous CuSO₄ turns blue on adding water, the process is:",options:["Always endothermic","Often exothermic (hydration)","Never releases heat","Only physical with no energy change"],correctIndex:1,explanation:"Hydration can be noticeably exothermic."},
    {id:"chem-T15-207",question:"Activation energy is best described as:",options:["The overall ΔH of reaction","The minimum energy needed for a successful collision leading to product","The heat released at equilibrium","The energy of products only"],correctIndex:1,explanation:"Ea definition."},
    
    {id:"chem-T15-209",question:"Incomplete combustion of hydrocarbons can produce CO because:",options:["Oxygen is in excess always","Limited O₂ favours partial oxidation to CO","CO has lower bond energy than CO₂ always","Water cannot form"],correctIndex:1,explanation:"Fuel-rich / limited oxygen conditions."},
    {id:"chem-T15-301",question:"Dissolving solid NaOH pellets in water makes the water warm. This dissolving is:",options:["Endothermic","Exothermic — hydration of ions releases more energy than lattice energy absorbed","A physical change with no energy","Only fast, not thermochemical"],correctIndex:1,explanation:"Exothermic dissolution: $\\Delta H_{\\text{sol}} < 0$. Heat released to surroundings."},
    {id:"chem-T15-302",question:"Boiling water ($\\text{H}_2\\text{O}(l) \\to \\text{H}_2\\text{O}(g)$) is endothermic because:",options:["Energy is released when molecules separate","Energy must be absorbed to overcome hydrogen bonds and separate water molecules","Boiling produces CO₂","Water molecules are destroyed"],correctIndex:1,explanation:"Breaking intermolecular hydrogen bonds requires energy input → endothermic."},
    {id:"chem-T15-303",question:"Using bond energies: H–H = 436, Cl–Cl = 242, H–Cl = 431 kJ/mol. For H₂ + Cl₂ → 2HCl, $\\Delta H \\approx$:",options:["+678 kJ/mol","+862 kJ/mol","−184 kJ/mol","+184 kJ/mol"],correctIndex:2,explanation:"$\\Delta H \\approx (436+242) - 2 \\times 431 = 678 - 862 = -184$ kJ/mol. Exothermic."},
    {id:"chem-T15-304",question:"An energy profile shows a catalyst lowers the activation energy. The $\\Delta H$ of the reaction:",options:["Becomes less negative with catalyst","Stays exactly the same — catalyst only provides alternate lower-Ea pathway","Increases","Becomes zero"],correctIndex:1,explanation:"Catalyst speeds up by lowering Ea; reactant and product energy levels (hence $\\Delta H$) are unchanged."},
    {id:"chem-T15-305",question:"A cold pack contains NH₄NO₃ and water. When activated, it feels cold because:",options:["NH₄NO₃ combusts","Dissolving NH₄NO₃ is endothermic — heat absorbed from hand/surroundings","The pack contains ice","CO₂ is released"],correctIndex:1,explanation:"Endothermic dissolution: absorbs heat from surroundings → cooling effect."},
    {id:"chem-T15-306",question:"Condensation of steam into liquid water releases heat because:",options:["Bond breaking is exothermic","Forming intermolecular bonds (hydrogen bonds) releases energy","Condensation is always endothermic","Only ionic bonds release energy"],correctIndex:1,explanation:"Bond/interaction forming = exothermic. Condensation releases the same energy as boiling absorbed."},
    
    {id:"chem-T15-308",question:"Reaction profile: reactants at 200 kJ, peak at 280 kJ, products at 120 kJ. The activation energy Ea and $\\Delta H$ are:",options:["Ea = 80 kJ; $\\Delta H$ = −80 kJ","Ea = 80 kJ; $\\Delta H$ = −80 kJ","Ea = 80 kJ (280−200); $\\Delta H$ = −80 kJ (120−200)","Ea = 160 kJ; $\\Delta H$ = +80 kJ"],correctIndex:2,explanation:"$E_a = 280 - 200 = 80$ kJ; $\\Delta H = 120 - 200 = -80$ kJ (exothermic)."}
    ],
    extendedQuestions: [
        {
            id: "chem-T15-E01",
            commandWord: "Calculate",
            marks: 6,
            syllabusNote: "Chemical Energetics - Bond energy calculations for combustion.",
            prompt: "Methane burns in oxygen according to the equation: $CH_4(g) + 2O_2(g) \\rightarrow CO_2(g) + 2H_2O(g)$.\n\nThe bond energies are given below:\n- C-H: 410 kJ/mol\n- O=O: 496 kJ/mol\n- C=O: 805 kJ/mol\n- O-H: 460 kJ/mol\n\n(a) Calculate the total energy absorbed to break the bonds in the reactants.\n(b) Calculate the total energy released when the bonds in the products are formed.\n(c) Calculate the overall enthalpy change ($\\Delta H$) for the reaction and state whether it is exothermic or endothermic.",
            rubric: [
                "(a) Reactants contain **four C-H bonds** and **two O=O bonds**.",
                "(a) Energy absorbed = $(4 \\times 410) + (2 \\times 496) =$ **2632 kJ**.",
                "(b) Products contain **two C=O bonds** and **four O-H bonds** (since 2 $H_2O$ molecules).",
                "(b) Energy released = $(2 \\times 805) + (4 \\times 460) =$ **3450 kJ**.",
                "(c) $\\Delta H$ = Energy absorbed - Energy released = 2632 - 3450 = **-818 kJ/mol**.",
                "(c) States that the reaction is **exothermic** (because $\\Delta H$ is negative / more energy is released than absorbed)."
            ],
            modelAnswer: "(a) To break the reactant bonds, we must break four C-H bonds in methane and two O=O double bonds in the oxygen molecules.\nEnergy absorbed = $(4 \\times 410) + (2 \\times 496) = 1640 + 992 = 2632 \\text{ kJ}$.\n\n(b) To form the products, two C=O double bonds are formed in carbon dioxide, and four O-H single bonds are formed (since each of the two water molecules has two O-H bonds).\nEnergy released = $(2 \\times 805) + (4 \\times 460) = 1610 + 1840 = 3450 \\text{ kJ}$.\n\n(c) The overall enthalpy change is calculated by subtracting the energy released from the energy absorbed:\n$\\Delta H = 2632 - 3450 = -818 \\text{ kJ/mol}$.\nBecause the $\\Delta H$ value is negative (more energy is released forming bonds than was required to break them), the reaction is **exothermic**."
        },
        {
            id: "chem-T15-E02",
            commandWord: "Evaluate",
            marks: 4,
            syllabusNote: "Chemical Energetics - Catalysts and Energy Profiles.",
            prompt: "The decomposition of hydrogen peroxide into water and oxygen is a slow exothermic reaction. Adding a small amount of manganese(IV) oxide ($MnO_2$) acts as a catalyst, causing the reaction to occur rapidly.\n\n(a) Sketch an energy profile diagram for the uncatalysed exothermic reaction. Label the reactants, products, activation energy ($E_a$), and enthalpy change ($\\Delta H$).\n(b) On the same diagram, draw the energy pathway when the $MnO_2$ catalyst is added.\n(c) Using your diagram, explain exactly how the catalyst increases the speed of the reaction without changing the final temperature increase of the solution.",
            rubric: [
                "(a) Diagram shows the **products line lower than the reactants line**.",
                "(a) $E_a$ is an **upward arrow from the reactants line to the peak**, and $\\Delta H$ is a **downward arrow from the reactants to the products**.",
                "(b) The catalysed pathway shows a **new curve with a lower peak (lower $E_a$)**, but starting and ending at the exact same reactant and product levels.",
                "(c) Explains that the catalyst provides an **alternative pathway with a lower activation energy**, so a higher proportion of particles have enough energy to react upon collision. Because $\\Delta H$ (the difference between reactants and products) remains unchanged, the total heat released is identical."
            ],
            modelAnswer: "(a & b) *(Mental sketch)*: Draw a horizontal line for 'Reactants'. Draw a curve going up to a high peak, then sweeping down to a new horizontal line lower than the reactants, labelled 'Products'. Draw an upward arrow from the reactants line to the peak labelled '$E_a$ (uncatalysed)'. Draw a downward arrow between the reactant and product levels labelled '$\\Delta H$'. For part (b), draw a second dashed curve starting from the reactants, peaking at a *lower* height, and joining back to the exact same products line. Label this lower peak '$E_a$ (catalysed)'.\n\n(c) The $MnO_2$ catalyst provides an alternative reaction pathway that requires a lower activation energy. Because the energy barrier is lower, a much larger proportion of the colliding hydrogen peroxide molecules possess sufficient energy to react, significantly increasing the rate of reaction. However, the catalyst does not alter the energy levels of the reactants or the products. Since $\\Delta H$ remains identical, the total amount of heat energy released into the solution is exactly the same."
        }
    ],
    trueFalse: [
    {statement:"All spontaneous reactions are exothermic.",correct:false,explain:"Entropy can drive endothermic."},
    {statement:"Catalyst increases equilibrium yield of exothermic forward.",correct:false,explain:"Speed only."},
    {statement:"Breaking all bonds in methane is endothermic.",correct:true,explain:"Need energy input."},
    {statement:"Formation of water from H₂ and O₂ is highly exothermic.",correct:true,explain:"Explosive mix."},
    {statement:"ΔH depends on state of reactants (s,l,g,aq).",correct:true,explain:"State matters."},
    {statement:"Activation energy can be supplied by heat or light.",correct:true,explain:"Initiation."},
    {statement:"Bond energy is always positive magnitude for breaking.",correct:true,explain:"Endothermic process."},
    {statement:"An endothermic reaction feels cold to touch on flask.",correct:true,explain:"Absorbs heat from surroundings."},
    {statement:"N₂ + O₂ → NO is endothermic.",correct:true,explain:"Lightning fixation."},
    {statement:"Dissolving NH₄Cl is endothermic.",correct:true,explain:"Cold flask."},
    
    {statement:"Lattice enthalpy MgO very exothermic.",correct:true,explain:"Strong ionic attraction."}
    ],
    });
})();
