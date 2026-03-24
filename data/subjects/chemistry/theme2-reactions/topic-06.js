(function () {
  window.__registerTopic({
    id: "6",
    theme: "Theme 2: Chemical Reactions",
    title: "Chemical Calculations",
    cheatBlocks: [
        {
            "title": "Moles",
            "points": [
                "n = mass/Mr; Mr from periodic table.",
                "Avogadro 6.02×10²³ particles per mole.",
                "Gas: n = V/24 dm³ at r.t.p. (syllabus).",
                "Solution: n = C×V (V in dm³)."
            ]
        },
        {
            "title": "Stoichiometry",
            "points": [
                "Balance equation → mole ratio.",
                "Limiting reactant stops reaction.",
                "% yield = actual/theoretical ×100.",
                "Empirical vs molecular formula."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-01-calculations.jpg", caption: "Mole triangle and concentration" } ],
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
            "front": "Titre?",
            "back": "Volume of solution in titration to endpoint."
        },
        {
            "front": "Concordant titres?",
            "back": "Within 0.1–0.2 cm³."
        },
        {
            "front": "Back titration idea?",
            "back": "Add excess then titrate remainder."
        },
        {
            "front": "Atom economy?",
            "back": "(mass desired / mass all products)×100."
        },
        {
            "front": "Mole fraction (adv)?",
            "back": "nᵢ/n_total."
        },
        {
            "front": "Standard solution?",
            "back": "Known concentration."
        },
        {
            "front": "Dilution C₁V₁=C₂V₂?",
            "back": "Same moles before/after dilution."
        },
        {
            "front": "Relative formula mass CaCO₃?",
            "back": "40+12+48=100."
        }
    ],
    quiz: [
    {question:"Mr H₂SO₄ (H1,S32,O16):",options:["82","88","98","108"],correctIndex:2,explanation:"2+32+64."},
    {question:"Moles in 9 g water:",options:["0.25","0.5","1","2"],correctIndex:1,explanation:"9/18=0.5."},
    {question:"Volume 0.25 mol gas at r.t.p.:",options:["6 dm³","12 dm³","24 dm³","4 dm³"],correctIndex:0,explanation:"0.25×24=6."},
    {question:"Moles in 100 cm³ of 2 mol/dm³ HCl:",options:["0.2","0.02","2","0.5"],correctIndex:0,explanation:"0.1×2=0.2."},
    {question:"Mass of 0.5 mol NaOH (Mr 40):",options:["10 g","20 g","40 g","80 g"],correctIndex:1,explanation:"0.5×40."},
    {question:"Empirical formula CH₂O molecular 180:",options:["CH₂O","C₆H₁₂O₆","C₂H₄O₂","C₃H₆O₃"],correctIndex:1,explanation:"Factor 6."},
    {question:"%O in CO₂ by mass:",options:["~27%","~44%","~73%","~50%"],correctIndex:2,explanation:"32/44."},
    {question:"Limiting: 2H₂+O₂→2H₂O; 3 mol H₂, 2 mol O₂:",options:["H₂ limiting","O₂ limiting","Neither","Both"],correctIndex:0,explanation:"Need 1.5 mol O₂ for 3H₂."},
    {question:"Theoretical mass CaCO₃ from 0.1 mol:",options:["5 g","10 g","100 g","1 g"],correctIndex:1,explanation:"0.1×100."},
    {question:"Dilute 50 cm³ 2M to 500 cm³ final:",options:["0.1 M","0.2 M","2 M","0.02 M"],correctIndex:1,explanation:"C₂=0.1×2/1."},
    {question:"Atoms in 1 mol CO₂:",options:["3×6.02×10²³","6.02×10²³","2×6.02×10²³","1"],correctIndex:0,explanation:"3 atoms per molecule."},
    {question:"Mass same moles N₂ vs O₂:",options:["N₂ heavier","O₂ heavier","Same","Cannot"],correctIndex:1,explanation:"Mr 32>28."},
    {question:"Stoichiometry Fe₂O₃+3CO→2Fe+3CO₂: 80 g Fe₂O₃ (Mr160):",options:["1 mol Fe₂O₃","0.5 mol","2 mol","0.25 mol"],correctIndex:0,explanation:"80/160."},
    {question:"Fe produced from 0.5 mol Fe₂O₃:",options:["28 g","56 g","112 g","84 g"],correctIndex:1,explanation:"1 mol Fe per 0.5 mol oxide → 56g."},
    {question:"Actually 50g Fe, theoretical 56g, % yield:",options:["~89%","100%","50%","112%"],correctIndex:0,explanation:"50/56."},
    {question:"Concentration mol/dm³ definition:",options:["mol per litre","g per litre","mol per cm³ only","pH"],correctIndex:0,explanation:"mol dm⁻³."},
    {question:"Number of molecules in 44 g CO₂:",options:["6.02×10²³","2×6.02×10²³","0.5×6.02×10²³","3×6.02×10²³"],correctIndex:0,explanation:"1 mol."},
    {question:"Hydrated CuSO₄·5H₂O anhydrous part Mr:",options:["160","250","90","18"],correctIndex:0,explanation:"CuSO₄."},
    {question:"Titration: 25 cm³ 0.1M acid neutralised by 0.1M alkali volume:",options:["25 cm³ (mono-mono)","50 cm³","12.5 cm³","100 cm³"],correctIndex:0,explanation:"1:1 mole if monoprotic."},
    {question:"Excess reagent after reaction:",options:["Gone","Left over","Catalyst","Product"],correctIndex:1,explanation:"Not fully consumed."},
    {question:"Mole ratio N₂+3H₂→2NH₃ for 4 mol NH₃ needs N₂:",options:["1","2","3","4"],correctIndex:1,explanation:"2 mol N₂."},
    {question:"ppm to very dilute (concept):",options:["parts per million","pressure","only solid","mole only"],correctIndex:0,explanation:"Trace concentration."},
    {question:"Back titration used when:",options:["Direct titration impossible","Always faster","No indicator","Only gas"],correctIndex:0,explanation:"Slow direct reaction."},
    {question:"Atom economy high means:",options:["More waste","More desired in product mass","No reaction","Low yield"],correctIndex:1,explanation:"Green metric."},
    {question:"Volume 2 mol gas r.t.p.:",options:["12 dm³","24 dm³","48 dm³","6 dm³"],correctIndex:2,explanation:"2×24."},
    {question:"0.01 mol electron charge (Faraday context qual):",options:["Proportional to moles at electrode","Fixed 1 C","Zero","Only gas"],correctIndex:0,explanation:"Q=nF."},
    {question:"What mass of CaCO₃ (Mr = 100) is in 0.020 mol?",options:["0.20 g","2.0 g","20 g","200 g"],correctIndex:1,explanation:"mass = n × Mr = 0.02 × 100 = 2.0 g."},
    {question:"How many moles of H₂SO₄ are in 250 cm³ of 0.40 mol/dm³ solution?",options:["0.10","0.16","0.25","1.0"],correctIndex:0,explanation:"n = C×V = 0.40 × 0.250 = 0.10 mol."},
    {question:"Combustion of C₃H₈ + 5O₂ → 3CO₂ + 4H₂O: moles of O₂ needed per mole of C₃H₈?",options:["3","4","5","8"],correctIndex:2,explanation:"Balanced equation shows 5 mol O₂ per 1 mol propane."},
    {question:"A student titrates 20.0 cm³ of 0.25 M acid with 0.50 M alkali (1:1). What titre is expected?",options:["10.0 cm³","20.0 cm³","25.0 cm³","40.0 cm³"],correctIndex:0,explanation:"Moles of acid = 0.020×0.25 = 0.005; V_alkali = 0.005/0.50 = 0.010 dm³ = 10 cm³."},
    {question:"Which is the empirical formula of C₆H₁₂O₆?",options:["CHO","CH₂O","C₂H₄O₂","C₆H₁₂O₆"],correctIndex:1,explanation:"Divide by 6 → simplest ratio CH₂O."},
    {question:"Diluting 100 cm³ of 1.0 M NaCl to 500 cm³ total gives:",options:["0.10 M","0.20 M","0.50 M","1.0 M"],correctIndex:1,explanation:"C₂ = C₁V₁/V₂ = 1.0×100/500 = 0.20 M."},
    {question:"% by mass of hydrogen in H₂O (H=1, O=16) is about:",options:["5.6%","11%","20%","89%"],correctIndex:1,explanation:"2/18 × 100 ≈ 11%."},
    {question:"If a reaction has theoretical yield 8.0 g but actual 6.0 g, % yield is:",options:["133%","75%","48%","25%"],correctIndex:1,explanation:"6/8 × 100 = 75%."},
    {question:"Which contains the greatest number of atoms: 1 mol of H₂O or 1 mol of CO₂?",options:["H₂O","CO₂","Same","Cannot compare"],correctIndex:2,explanation:"Both have 3 atoms per molecule, so 1 mol of each has the same number of atoms."},
    {question:"For N₂ + 3H₂ → 2NH₃, what is the maximum moles of NH₃ from 3 mol N₂ and 9 mol H₂?",options:["4 mol","6 mol","9 mol","18 mol"],correctIndex:1,explanation:"N₂ is limiting (needs 9 mol H₂ for 3 mol N₂); produces 6 mol NH₃."}
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
