(function () {
  window.__registerTopic({
    id: "6",
    theme: "Theme 2: Chemical Reactions",
    title: "Chemical Calculations",
    cheatBlocks: [
        {
            "title": "Moles",
            "points": [
                "$n = m / M_r$ — moles = mass ÷ molar mass.",
                "Avogadro 6.02×10²³ particles per mole.",
                "Gas at r.t.p.: $V = 24n$ dm³ (molar volume = 24 dm³ mol⁻¹).",
                "Solution: $n = C \times V$ (V in dm³; convert cm³ ÷ 1000)."
            ]
        },
        {
            "title": "Stoichiometry",
            "points": [
                "Balance equation → mole ratio.",
                "Limiting reactant stops reaction.",
                "$\% \text{ yield} = \dfrac{\text{actual}}{\text{theoretical}} \times 100$.",
                "Empirical vs molecular formula."
            ]
        }
    ,
    {
        "title": "Key Mole Formulas",
        "points": [
            "$n = \\dfrac{m}{M_r}$ — moles from mass (g) and molar mass",
            "$C = \\dfrac{n}{V}$ — concentration (mol dm⁻³); rearrange: $n = C \\times V$ (V in dm³)",
            "$V_{\\text{gas}} = 24n$ dm³ at r.t.p. (molar volume = 24 dm³ mol⁻¹)",
            "$N = n \\times N_A = n \\times 6.02 \\times 10^{23}$ — number of particles",
            "$\\%\\,\\text{yield} = \\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100$",
            "$\\%\\,\\text{purity} = \\dfrac{\\text{mass of pure substance}}{\\text{total mass of sample}} \\times 100$"
        ]
    },
    { 
        "title": "Deducing Formulae & Ionic Equations", 
        "points": [ 
            " **Valency 'Cross' Method**: Write valencies as subscripts and swap them to find the atomic ratio (e.g., Al has valency 3, O has valency 2 \u2192 $Al_2O_3$).",
            " **Ionic Equations**: Split aqueous ionic compounds into ions. Cancel out **spectator ions** (ions that appear unchanged on both sides). Keep solids, liquids, and gases intact." 
        ] 
    },
    {
        "title": "Concentration Units",
        "points": [
            "You can convert between concentration units using molar mass ($M_r$):",
            " **Concentration in g/dm³** = Concentration in mol/dm³ $\\times M_r$"
        ]
    }
    ],
    infographics: [ 
        { image: "data/subjects/chemistry/images/reactions-01-calculations.jpg", caption: "Mole triangle and concentration" },
        { image: "data/subjects/chemistry/images/topic-06-1-infographic.png", caption: "Chemical Calculations Infographic" },
        { image: "data/subjects/chemistry/images/topic-06-2-infographic.png", caption: "Moles and Stoichiometry Infographic" }
    ],
    flashcards: [
        {
            "front": "n from mass?",
            "back": "mass ÷ Mr"
        },
        {
            "front": "Concentration units mol/dm³",
            "back": "Molarity C."
        },
        {
            "front": "Molar gas volume r.t.p.",
            "back": "24 dm³/mol."
        },
        {
            "front": "Limiting reactant?",
            "back": "Used up first."
        },
        {
            "front": "Empirical formula?",
            "back": "Simplest ratio."
        },
        {
            "front": "Water of crystallisation?",
            "back": "H₂O in lattice (e.g. CuSO₄·5H₂O)."
        },        
        {
            "front": "Relative formula mass CaCO₃?",
            "back": "40+12+48=100."
        }
    ,
    { "front": "Moles from mass?", "back": "$n = \\dfrac{m}{M_r}$" },
    { "front": "Concentration formula?", "back": "$C = \\dfrac{n}{V}$ (V in dm³). Rearrange: $n = C \\times V$." },
    { "front": "Gas volume at r.t.p.?", "back": "$V = 24n$ dm³. (molar volume = 24 dm³ mol⁻¹ at r.t.p.)" },
    { "front": "Number of molecules in $n$ mol?", "back": "$N = n \\times 6.02 \\times 10^{23}$" },
    { "front": "% yield formula?", "back": "$\\% \\text{ yield} = \\dfrac{\\text{actual}}{\\text{theoretical}} \\times 100$" }],
    quiz: [
    {id:"chem-T6-001",question:"Mr H₂SO₄ (H1,S32,O16):",options:["82","88","98","108"],correctIndex:2,explanation:"2+32+64."},
    {id:"chem-T6-002",question:"Moles in 9 g water:",options:["0.25","0.5","1","2"],correctIndex:1,explanation:"9/18=0.5."},
    {id:"chem-T6-003",question:"Volume 0.25 mol gas at r.t.p.:",options:["6 dm³","12 dm³","24 dm³","4 dm³"],correctIndex:0,explanation:"0.25×24=6."},
    {id:"chem-T6-004",question:"Moles in 100 cm³ of 2 mol/dm³ HCl:",options:["0.2","0.02","2","0.5"],correctIndex:0,explanation:"0.1×2=0.2."},
    {id:"chem-T6-005",question:"Mass of 0.5 mol NaOH (Mr 40):",options:["10 g","20 g","40 g","80 g"],correctIndex:1,explanation:"0.5×40."},
    {id:"chem-T6-006",question:"Empirical formula CH₂O molecular 180:",options:["CH₂O","C₆H₁₂O₆","C₂H₄O₂","C₃H₆O₃"],correctIndex:1,explanation:"Factor 6."},
    {id:"chem-T6-007",question:"%O in CO₂ by mass:",options:["~27%","~44%","~73%","~50%"],correctIndex:2,explanation:"32/44."},
    {id:"chem-T6-008",question:"Limiting: 2H₂+O₂→2H₂O; 3 mol H₂, 2 mol O₂:",options:["H₂ limiting","O₂ limiting","Neither","Both"],correctIndex:0,explanation:"Need 1.5 mol O₂ for 3H₂."},
    {id:"chem-T6-009",question:"Theoretical mass CaCO₃ from 0.1 mol:",options:["5 g","10 g","100 g","1 g"],correctIndex:1,explanation:"0.1×100."},
    {id:"chem-T6-010",question:"Element $X$ is in Group 13 and element $Y$ is in Group 16. What is the chemical formula of the compound formed?",options:["$XY_2$","$X_2Y_3$","$X_3Y_2$","$X_2Y$"],correctIndex:1,explanation:"Group 13 elements have a valency of 3. Group 16 elements have a valency of 2. Crossing the valencies gives $X_2Y_3$."},
    {id:"chem-T6-011",question:"Atoms in 1 mol CO₂:",options:["3×6.02×10²³","6.02×10²³","2×6.02×10²³","1"],correctIndex:0,explanation:"3 atoms per molecule."},
    {id:"chem-T6-012",question:"Mass same moles N₂ vs O₂:",options:["N₂ heavier","O₂ heavier","Same","Cannot"],correctIndex:1,explanation:"Mr 32>28."},
    {id:"chem-T6-013",question:"Stoichiometry Fe₂O₃+3CO→2Fe+3CO₂: 80 g Fe₂O₃ (Mr160):",options:["1 mol Fe₂O₃","0.5 mol","2 mol","0.25 mol"],correctIndex:0,explanation:"80/160."},
    {id:"chem-T6-014",question:"Fe produced from 0.5 mol Fe₂O₃:",options:["28 g","56 g","112 g","84 g"],correctIndex:1,explanation:"1 mol Fe per 0.5 mol oxide → 56g."},
    {id:"chem-T6-015",question:"Actually 50g Fe, theoretical 56g, % yield:",options:["~89%","100%","50%","112%"],correctIndex:0,explanation:"50/56."},
    {id:"chem-T6-016",question:"Concentration mol/dm³ definition:",options:["mol per litre","g per litre","mol per cm³ only","pH"],correctIndex:0,explanation:"mol dm⁻³."},
    {id:"chem-T6-017",question:"Number of molecules in 44 g CO₂:",options:["6.02×10²³","2×6.02×10²³","0.5×6.02×10²³","3×6.02×10²³"],correctIndex:0,explanation:"1 mol."},
    {id:"chem-T6-018",question:"Hydrated CuSO₄·5H₂O anhydrous part Mr:",options:["160","250","90","18"],correctIndex:0,explanation:"CuSO₄."},
    {id:"chem-T6-019",question:"Titration: 25 cm³ 0.1M acid neutralised by 0.1M alkali volume:",options:["25 cm³ (mono-mono)","50 cm³","12.5 cm³","100 cm³"],correctIndex:0,explanation:"1:1 mole if monoprotic."},
    {id:"chem-T6-020",question:"Excess reagent after reaction:",options:["Gone","Left over","Catalyst","Product"],correctIndex:1,explanation:"Not fully consumed."},
    {id:"chem-T6-021",question:"Mole ratio N₂+3H₂→2NH₃ for 4 mol NH₃ needs N₂:",options:["1","2","3","4"],correctIndex:1,explanation:"2 mol N₂."},
    {id:"chem-T6-022",question:"A solution of potassium hydroxide ($KOH$) has a concentration of 14.0 g/dm³. What is its concentration in mol/dm³? (Ar: K=39, O=16, H=1)",options:["0.25 mol/dm³","0.50 mol/dm³","1.00 mol/dm³","4.00 mol/dm³"],correctIndex:0,explanation:"Mr of KOH = 39 + 16 + 1 = 56. Concentration in mol/dm³ = 14.0 ÷ 56 = 0.25 mol/dm³."},
    {id:"chem-T6-023",question:"Which of the following ions are spectator ions in the reaction between aqueous sodium hydroxide and dilute hydrochloric acid?",options:["$H^+$ and $OH^-$","$Na^+$ and $Cl^-$","$Na^+$ and $OH^-$","$H^+$ and $Cl^-$"],correctIndex:1,explanation:"The overall reaction is $NaOH(aq) + HCl(aq) \\rightarrow NaCl(aq) + H_2O(l)$. The $Na^+$ and $Cl^-$ ions remain aqueous and unchanged on both sides, so they are spectator ions."},
    {id:"chem-T6-024",question: "A compound is found to contain 40.0% carbon, 6.70% hydrogen, and 53.3% oxygen by mass. What is its empirical formula? (Ar: C=12, H=1, O=16)",options: ["CH₂O","C₂H₄O","CHO₂","C₆H₁₂O₆"],correctIndex: 0,explanation: "Divide % by Ar: C = 40/12 = 3.33; H = 6.70/1 = 6.70; O = 53.3/16 = 3.33. The simplest ratio is 1:2:1, so the empirical formula is CH₂O."},
    {id:"chem-T6-025",question:"Volume 2 mol gas r.t.p.:",options:["12 dm³","24 dm³","48 dm³","6 dm³"],correctIndex:2,explanation:"2×24."},
    {id:"chem-T6-026",question: "What volume of oxygen gas is required for the complete combustion of 400 cm³ of pentane gas (C₅H₁₂) at r.t.p.?\nEquation: C₅H₁₂(g) + 8O₂(g) ➔ 5CO₂(g) + 6H₂O(g)",options: ["400 cm³","2000 cm³","3200 cm³","4800 cm³"],correctIndex: 2,explanation: "According to Avogadro's law, the volume ratio of gases is equal to their mole ratio. 1 volume of pentane reacts with 8 volumes of oxygen. 400 cm³ × 8 = 3200 cm³."},
    {id:"chem-T6-027",question:"What mass of CaCO₃ (Mr = 100) is in 0.020 mol?",options:["0.20 g","2.0 g","20 g","200 g"],correctIndex:1,explanation:"mass = n × Mr = 0.02 × 100 = 2.0 g."},
    {id:"chem-T6-028",question:"How many moles of H₂SO₄ are in 250 cm³ of 0.40 mol/dm³ solution?",options:["0.10","0.16","0.25","1.0"],correctIndex:0,explanation:"n = C×V = 0.40 × 0.250 = 0.10 mol."},
    {id:"chem-T6-029",question:"Combustion of C₃H₈ + 5O₂ → 3CO₂ + 4H₂O: moles of O₂ needed per mole of C₃H₈?",options:["3","4","5","8"],correctIndex:2,explanation:"Balanced equation shows 5 mol O₂ per 1 mol propane."},
    {id:"chem-T6-030",question:"A student titrates 20.0 cm³ of 0.25 M acid with 0.50 M alkali (1:1). What titre is expected?",options:["10.0 cm³","20.0 cm³","25.0 cm³","40.0 cm³"],correctIndex:0,explanation:"Moles of acid = 0.020×0.25 = 0.005; V_alkali = 0.005/0.50 = 0.010 dm³ = 10 cm³."},
    {id:"chem-T6-031",question:"Which is the empirical formula of C₆H₁₂O₆?",options:["CHO","CH₂O","C₂H₄O₂","C₆H₁₂O₆"],correctIndex:1,explanation:"Divide by 6 → simplest ratio CH₂O."},
    {id:"chem-T6-032",question:"What is the limiting reactant in stoichiometry?",options:["The reactant with highest molar mass","The reactant present in excess","The reactant used up first","The product with least mass"],correctIndex:2,explanation:"The limiting reactant is completely consumed first and determines the maximum amount of product that can be formed."},
    {id:"chem-T6-033",question:"% by mass of hydrogen in H₂O (H=1, O=16) is about:",options:["5.6%","11%","20%","89%"],correctIndex:1,explanation:"2/18 × 100 ≈ 11%."},
    {id:"chem-T6-034",question:"If a reaction has theoretical yield 8.0 g but actual 6.0 g, % yield is:",options:["133%","75%","48%","25%"],correctIndex:1,explanation:"6/8 × 100 = 75%."},
    {id:"chem-T6-035",question:"Which contains the greatest number of atoms: 1 mol of H₂O or 1 mol of CO₂?",options:["H₂O","CO₂","Same","Cannot compare"],correctIndex:2,explanation:"Both have 3 atoms per molecule, so 1 mol of each has the same number of atoms."},
    {id:"chem-T6-036",question:"For N₂ + 3H₂ → 2NH₃, what is the maximum moles of NH₃ from 3 mol N₂ and 9 mol H₂?",options:["4 mol","6 mol","9 mol","18 mol"],correctIndex:1,explanation:"N₂ is limiting (needs 9 mol H₂ for 3 mol N₂); produces 6 mol NH₃."},
    {id:"chem-T6-201",question:"What is the empirical formula of a compound with 40% by mass Ca and 60% by mass Br (Ar Ca=40, Br=80)?",options:["CaBr","CaBr₂","Ca₂Br","CaBr₃"],correctIndex:1,explanation:"Assume 100 g: 1 mol Ca and 2 mol Br → CaBr₂."},
    {id:"chem-T6-202",question:"How many moles of CO₂ are produced when 0.5 mol of CaCO₃ fully decomposes? (CaCO₃ → CaO + CO₂)",options:["0.25","0.5","1.0","2.0"],correctIndex:1,explanation:"1:1 mole ratio of CO₂ to CaCO₃."},
    {id:"chem-T6-203",question:"A student mixes 0.3 mol Fe and 0.4 mol O₂ for 4Fe + 3O₂ → 2Fe₂O₃. The limiting reagent is:",options:["Fe","O₂","Neither","Both"],correctIndex:0,explanation:"Need 0.225 mol O₂ for 0.3 mol Fe; Fe runs out first."},
    {id:"chem-T6-204",question:"The concentration of a solution made by dissolving 4.9 g of H₂SO₄ (Mr=98) in water to make 250 cm³ of solution is:",options:["0.10 mol/dm³","0.20 mol/dm³","0.40 mol/dm³","2.0 mol/dm³"],correctIndex:1,explanation:"0.05 mol / 0.25 dm³ = 0.20 M."},
    {id:"chem-T6-205",question:"From the equation 2Na + Cl₂ → 2NaCl, the mass of chlorine molecules needed to react completely with 0.2 mol Na is:",options:["0.1 mol Cl₂","0.2 mol Cl₂","0.4 mol Cl₂","0.05 mol Cl₂"],correctIndex:0,explanation:"2 mol Na : 1 mol Cl₂ → 0.2 mol Na needs 0.1 mol Cl₂."},
    
    {id:"chem-T6-207",question:"When balancing C₂H₆ + O₂ → CO₂ + H₂O, the coefficient of O₂ in the simplest whole-number equation is:",options:["5","7","9","4"],correctIndex:1,explanation:"2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O."},
    
    {id:"chem-T6-209",question:"The number of moles of solute in 500 cm³ of 0.40 mol/dm³ solution is:",options:["0.10","0.20","0.40","0.80"],correctIndex:1,explanation:"n = C×V = 0.40 × 0.5 = 0.20 mol."},
    {id:"chem-T6-301",question:"In the ionic equation for AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq), the spectator ions are:",options:["Ag⁺ and Cl⁻","Na⁺ and NO₃⁻","Na⁺ and Cl⁻","Ag⁺ and NO₃⁻"],correctIndex:1,explanation:"Spectator ions appear on both sides unchanged; only Ag⁺ + Cl⁻ → AgCl(s) is the net ionic equation."},
    {id:"chem-T6-302",question:"A solution has a concentration of 7.3 g/dm³ of HCl (Mr = 36.5). What is the concentration in mol/dm³?",options:["0.10 mol/dm³","0.20 mol/dm³","0.36 mol/dm³","0.73 mol/dm³"],correctIndex:1,explanation:"Divide g/dm³ by Mr: 7.3 ÷ 36.5 = 0.20 mol/dm³."},
    {id:"chem-T6-303",question:"Which is the correct net ionic equation when magnesium reacts with dilute HCl?",options:["Mg(s) + 2Cl⁻(aq) → MgCl₂(s)","Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g)","Mg²⁺(aq) + 2Cl⁻(aq) → MgCl₂(s)","Mg(s) + HCl(aq) → MgCl₂(aq)"],correctIndex:1,explanation:"Remove spectator Cl⁻; net: Mg + 2H⁺ → Mg²⁺ + H₂."},
    {id:"chem-T6-304",question:"When balancing: _Fe(OH)₃ + _H₂SO₄ → Fe₂(SO₄)₃ + _H₂O, the coefficient of H₂O is:",options:["3","6","9","12"],correctIndex:1,explanation:"2Fe(OH)₃ + 3H₂SO₄ → Fe₂(SO₄)₃ + 6H₂O; balance Fe then S then H."},
    {id:"chem-T6-305",question:"State symbols in equations show:",options:["The mass of each substance","The physical state of each substance at reaction conditions","Whether the reaction is exothermic","The colour of each substance"],correctIndex:1,explanation:"(s)=solid, (l)=liquid, (g)=gas, (aq)=aqueous solution."},
    {id:"chem-T6-306",question:"A student uses $n = \\frac{m}{M_r}$ to find moles of NaCl (Mr = 58.5) in 11.7 g. The answer is:",options:["0.1 mol","0.2 mol","1.0 mol","2.0 mol"],correctIndex:1,explanation:"$n = 11.7 \\div 58.5 = 0.2$ mol."},
    {id:"chem-T6-307",question:"Using $C = \\frac{n}{V}$: 0.25 mol KOH dissolved in 500 cm³ water. Concentration in mol/dm³:",options:["0.125 mol/dm³","0.5 mol/dm³","1.0 mol/dm³","0.25 mol/dm³"],correctIndex:1,explanation:"$C = 0.25 \\div 0.5 = 0.5$ mol/dm³. (500 cm³ = 0.5 dm³)"},
    {id:"chem-T6-308",question:"Gas volume at r.t.p. (24 dm³/mol): 0.1 mol CO₂ occupies:",options:["0.24 dm³","2.4 dm³","24 dm³","240 dm³"],correctIndex:1,explanation:"$V = 0.1 \\times 24 = 2.4$ dm³."},
    {id:"chem-T6-309",question:"In the reaction Mg + 2HCl → MgCl₂ + H₂, if 0.3 mol HCl is used with excess Mg, the moles of H₂ produced is:",options:["0.3 mol","0.15 mol","0.6 mol","1.0 mol"],correctIndex:1,explanation:"Ratio HCl : H₂ = 2 : 1, so $0.3 \\div 2 = 0.15$ mol H₂."},
    {id:"chem-T6-310",question:"5.6 g of iron (Ar = 56) reacts completely with excess CuSO₄(aq). The moles of Cu displaced are:",options:["0.1 mol","0.2 mol","0.5 mol","1.0 mol"],correctIndex:0,explanation:"$n_{\\text{Fe}} = 5.6 \\div 56 = 0.1$ mol; Fe : Cu = 1 : 1."},
    {id:"chem-T6-311",question:"Percentage by mass of oxygen in CO₂ (Mr = 44) is:",options:["27%","36%","73%","50%"],correctIndex:1,explanation:"$\\frac{2 \\times 16}{44} \\times 100 = \\frac{32}{44} \\times 100 \\approx 72.7\\%$. Nearest answer: 73%. (Correct: ~72.7% → closest is 73%.)"},
    {id:"chem-T6-312",question:"Empirical formula of a compound with 40% C, 6.7% H, 53.3% O by mass (Ar: C=12, H=1, O=16):",options:["CH₂O","C₂H₄O₂","C₂H₂O","CH₄O"],correctIndex:0,explanation:"Mole ratio: C = 40/12 ≈ 3.33; H = 6.7; O = 53.3/16 ≈ 3.33. Ratio C:H:O = 1:2:1 → CH₂O."},
    {id:"chem-T6-313",question:"Percentage yield = $\\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100$. If 4.0 g Cu is obtained from a reaction where 5.0 g was theoretically possible, the percentage yield is:",options:["80%","60%","125%","40%"],correctIndex:0,explanation:"$\\frac{4.0}{5.0} \\times 100 = 80\\%$."},
    {id:"chem-T6-314",question:"The limiting reagent is:",options:["The reagent in smallest mass","The reagent that is completely consumed first and determines the maximum amount of product","The cheapest reagent","The reagent in the largest container"],correctIndex:1,explanation:"It limits the reaction — once it's used up, the reaction stops even if other reagents remain."}
    ],
    extendedQuestions: [
        {
            id: "chem-T6-E01",
            commandWord: "Calculate",
            marks: 6,
            syllabusNote: "Stoichiometry - Limiting reactants, volumes of gas, and % yield.",
            prompt: "A student adds 2.00 g of calcium carbonate ($CaCO_3$) powder to 50.0 cm³ of 0.500 mol/dm³ dilute hydrochloric acid ($HCl$).\n\nThe equation for the reaction is:\n$CaCO_3(s) + 2HCl(aq) \\rightarrow CaCl_2(aq) + CO_2(g) + H_2O(l)$\n\n(a) Determine the limiting reactant. Show all your working.\n(b) Calculate the theoretical volume of carbon dioxide gas produced at room temperature and pressure (r.t.p.).\n(c) In the actual experiment, only 240 cm³ of carbon dioxide was collected. Calculate the percentage yield.",
            rubric: [
                "Calculates moles of $CaCO_3$: $2.00 \\div 100 = 0.020$ mol.",
                "Calculates moles of $HCl$: $0.500 \\times (50.0 \\div 1000) = 0.025$ mol.",
                "Uses mole ratio (1:2). 0.020 mol $CaCO_3$ needs 0.040 mol $HCl$. Since only 0.025 mol $HCl$ is available, **$HCl$ is the limiting reactant**.",
                "Uses limiting reactant to find moles of $CO_2$: $0.025 \\div 2 = 0.0125$ mol $CO_2$.",
                "Calculates theoretical volume: $0.0125 \\times 24 = 0.300$ dm³ (or 300 cm³).",
                "Calculates percentage yield: $(240 \\div 300) \\times 100 = 80.0\\%$."
            ],
            modelAnswer: "(a) Molar mass of $CaCO_3 = 40 + 12 + (3 \\times 16) = 100$.\nMoles of $CaCO_3 = 2.00 \\div 100 = 0.020 \\text{ mol}$.\nMoles of $HCl = \\text{concentration} \\times \\text{volume} = 0.500 \\times \\frac{50.0}{1000} = 0.025 \\text{ mol}$.\nFrom the balanced equation, 1 mole of $CaCO_3$ reacts with 2 moles of $HCl$. Therefore, 0.020 mol of $CaCO_3$ would require $0.040 \\text{ mol}$ of $HCl$. Since only 0.025 mol of $HCl$ is present, **$HCl$ is the limiting reactant**.\n\n(b) From the equation, 2 moles of $HCl$ produce 1 mole of $CO_2$.\nMoles of $CO_2 = 0.025 \\div 2 = 0.0125 \\text{ mol}$.\nVolume of $CO_2 = 0.0125 \\times 24 \\text{ dm}^3 = 0.300 \\text{ dm}^3$ (or 300 cm³).\n\n(c) Percentage yield = $\\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\times 100 = \\frac{240}{300} \\times 100 = 80.0\\%$."
        },
        {
            id: "chem-T6-E02",
            commandWord: "Calculate",
            marks: 6,
            syllabusNote: "Stoichiometry - Back-calculating percentage purity from gas volumes.",
            prompt: "A 2.00 g sample of impure calcium carbonate (CaCO₃) was added to excess dilute hydrochloric acid. The reaction produced 360 cm³ of carbon dioxide gas at room temperature and pressure (r.t.p.).\n\nThe equation is: CaCO₃(s) + 2HCl(aq) ➔ CaCl₂(aq) + H₂O(l) + CO₂(g)\n\n(a) Calculate the number of moles of CO₂ gas produced.\n(b) Calculate the mass of pure calcium carbonate in the sample. (Ar: Ca=40, C=12, O=16)\n(c) Determine the percentage purity of the calcium carbonate sample.",
            rubric: [
                "(a) Moles of CO₂ = 360 ÷ 24000 = **0.015 mol**.",
                "(b) Mole ratio of CaCO₃ : CO₂ is 1:1, so moles of pure CaCO₃ = 0.015 mol.",
                "(b) Molar mass of CaCO₃ = 40 + 12 + 48 = 100 g/mol.",
                "(b) Mass of pure CaCO₃ = 0.015 × 100 = **1.50 g**.",
                "(c) Percentage purity = (Mass of pure substance ÷ Total mass) × 100",
                "(c) Percentage purity = (1.50 ÷ 2.00) × 100 = **75.0%**."
            ],
            modelAnswer: "(a) Volume of CO₂ = 360 cm³ = 0.360 dm³. Moles of CO₂ = 0.360 ÷ 24 = 0.015 mol.\n\n(b) From the equation, 1 mole of CaCO₃ produces 1 mole of CO₂. Therefore, 0.015 mol of pure CaCO₃ reacted. \nMolar mass of CaCO₃ = 40 + 12 + (3 × 16) = 100 g/mol.\nMass of pure CaCO₃ = 0.015 mol × 100 g/mol = 1.50 g.\n\n(c) Percentage purity = (Mass of pure CaCO₃ ÷ Mass of impure sample) × 100\nPercentage purity = (1.50 g ÷ 2.00 g) × 100 = 75.0%."
        },
        {
            id: "chem-T6-E03",
            commandWord: "Calculate",
            marks: 5,
            syllabusNote: "Stoichiometry - Water of crystallisation.",
            prompt: "A student heats 6.25 g of blue hydrated copper(II) sulfate ($CuSO_4\\cdot xH_2O$) in a crucible until it turns completely white. The mass of the white anhydrous copper(II) sulfate remaining is 4.00 g.\n\n(a) Calculate the mass of water lost during heating.\n(b) Calculate the number of moles of anhydrous copper(II) sulfate formed. (Ar: Cu=64, S=32, O=16)\n(c) Calculate the number of moles of water lost. (Ar: H=1, O=16)\n(d) Deduce the value of $x$ in the formula $CuSO_4\\cdot xH_2O$.",
            rubric: [
                "(a) Mass of water lost = 6.25 - 4.00 = **2.25 g**.",
                "(b) Molar mass of $CuSO_4$ = 64 + 32 + 64 = 160. Moles = 4.00 ÷ 160 = **0.025 mol**.",
                "(c) Molar mass of $H_2O$ = 18. Moles = 2.25 ÷ 18 = **0.125 mol**.",
                "(d) Ratio of $CuSO_4$ to $H_2O$ is 0.025 : 0.125. Dividing by smallest gives **1 : 5**, so **$x = 5$**."
            ],
            modelAnswer: "(a) Mass of water lost = Initial mass - Final mass = 6.25 g - 4.00 g = 2.25 g.\n\n(b) Molar mass of anhydrous $CuSO_4$ = 64 + 32 + (4 × 16) = 160 g/mol.\nMoles of $CuSO_4$ = 4.00 g ÷ 160 g/mol = 0.025 mol.\n\n(c) Molar mass of water ($H_2O$) = 18 g/mol.\nMoles of water = 2.25 g ÷ 18 g/mol = 0.125 mol.\n\n(d) To find $x$, we find the simplest mole ratio of $CuSO_4$ to $H_2O$ by dividing both by the smaller number of moles (0.025):\n$CuSO_4$ = 0.025 ÷ 0.025 = 1\n$H_2O$ = 0.125 ÷ 0.025 = 5\nTherefore, the formula is $CuSO_4\\cdot 5H_2O$, so $x = 5$."
        }
    ],
    trueFalse: [
    {statement:"One mole always occupies 24 dm³.",correct:false,explain:"Only ideal gas at r.t.p.; liquids/solids differ."},
    {statement:"Mr has units kg.",correct:false,explain:"Dimensionless relative mass."},
    {statement:"Balanced equation conserves atoms.",correct:true,explain:"Conservation of mass."},
    {statement:"Yield can exceed 100%.",correct:false,explain:"Usually error or wet product."},
    {statement:"Dilution increases concentration.",correct:false,explain:"Decreases."},
    {statement:"Avogadro's law: equal volumes of gases same moles at same T,P.",correct:true,explain:"Ideal gases."},
    {statement:"Water Mr = 18.",correct:true,explain:"H₂O."},
    {statement:"Empirical formula can equal molecular.",correct:true,explain:"e.g. H₂O."},
    {statement:"Titre must be read from bottom of meniscus.",correct:true,explain:"For colourless liquids."},
    {statement:"Primary standard must be stable and pure.",correct:true,explain:"Titration standard."},
    {statement:"Mole ratio from equation is for moles not grams directly.",correct:true,explain:"Convert via Mr."},
    {statement:"Concentration × volume gives moles only if V in dm³.",correct:true,explain:"Unit check."}
    ],
    });
})();
