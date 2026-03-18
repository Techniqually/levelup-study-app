(function () {
  window.__registerTopic({
    id: "2",
    theme: "Theme 1: Matter – Structures & Properties",
    title: "Methods of Purification and Analysis",
    cheatBlocks: [
        {
            "title": "Separation",
            "points": [
                "**Filtration** — residue + filtrate.",
                "**Crystallisation** — saturate, cool slowly, filter crystals.",
                "**Distillation** — volatile vs non-volatile; **fractional** for close boiling points.",
                "**Chromatography** — partition between mobile and stationary phase."
            ]
        },
        {
            "title": "Rf",
            "points": [
                "Rf = distance spot ÷ distance solvent front (both from baseline).",
                "0 ≤ Rf ≤ 1; same conditions → same Rf for same substance.",
                "Pencil baseline; don't use ink."
            ]
        },
        {
            "title": "Solubility rules (context)",
            "points": [
                "Many nitrates soluble; group 1 salts often soluble.",
                "AgCl, BaSO₄, CaCO₃ common insoluble examples in tests."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/matter-02-purification.jpg", caption: "Distillation and chromatography" } ],
    flashcards: [
        {
            "front": "Rf formula?",
            "back": "spot distance / solvent front distance."
        },
        {
            "front": "Fractional distillation use?",
            "back": "Separate miscible liquids with close bp."
        },
        {
            "front": "Why pencil on chromatography paper?",
            "back": "Ink would run and smear."
        },
        {
            "front": "Filtrate?",
            "back": "Liquid passing through filter paper."
        },
        {
            "front": "Residue?",
            "back": "Solid left on filter paper."
        },
        {
            "front": "Slow evaporation for crystals?",
            "back": "Larger, purer crystals form."
        },
        {
            "front": "Stationary phase in paper chromatography?",
            "back": "Water adsorbed on paper fibres."
        },
        {
            "front": "Mobile phase?",
            "back": "Solvent moving up the paper."
        },
        {
            "front": "Simple distillation best for?",
            "back": "Separating volatile liquid from dissolved solid."
        },
        {
            "front": "Immiscible liquids?",
            "back": "Separate in funnel; tap off layers."
        },
        {
            "front": "Sublimation example?",
            "back": "Iodine or dry ice — solid to vapour."
        },
        {
            "front": "Decantation?",
            "back": "Pour off liquid leaving sediment."
        },
        {
            "front": "Centrifugation?",
            "back": "Denser particles pack at bottom."
        },
        {
            "front": "Why anti-bumping granules?",
            "back": "Even boiling in distillation."
        }
    ],
    quiz: [
    {question:"Rf is calculated as:",options:["Front ÷ spot","Spot ÷ front","Mass ÷ volume","Time ÷ distance"],correctIndex:1,explanation:"Spot over solvent front."},
    {question:"Two liquids bp 82°C and 78°C best separated by:",options:["Simple distillation only","Fractional distillation","Filtration","Magnet"],correctIndex:1,explanation:"Close bp need fractionating column."},
    {question:"Pure salt from rock salt + water:",options:["Filter only","Dissolve, filter sand, evaporate","Distil water only","Burn"],correctIndex:1,explanation:"NaCl soluble; insoluble grit filtered."},
    {question:"Chromatography separates by:",options:["Boiling point only","Different affinity for phases","Colour only","Density of beaker"],correctIndex:1,explanation:"Partition."},
    {question:"Baseline in pencil because:",options:["Pencil cheaper","Ink dissolves and interferes","Exam rule","Pencil darker"],correctIndex:1,explanation:"Soluble ink runs."},
    {question:"Higher Rf means:",options:["Less soluble in mobile phase","More time in mobile phase / travels further","Heavier atom","Always ionic"],correctIndex:1,explanation:"Moves farther with solvent."},
    {question:"BaCl₂ test for sulfate gives:",options:["Gas","White BaSO₄ ppt","Blue solution","Silver mirror"],correctIndex:1,explanation:"Insoluble sulfate."},
    {question:"Distillation flask should not be:",options:["Round bottom","Filled completely","Heated with condenser","Clamped"],correctIndex:1,explanation:"Needs head space — bumping."},
    {question:"Cooling condenser water flow:",options:["Bottom in top out","Top in bottom out","No water","Either"],correctIndex:0,explanation:"Counter-current cooling efficient."},
    {question:"Crystallisation from hot saturated solution on cooling:",options:["Gas forms","Crystals form as solubility drops","Liquid boils","Paper chars"],correctIndex:1,explanation:"Less soluble when cold."},
    {question:"Which is NOT a purification method:",options:["Filtration","Photosynthesis","Distillation","Chromatography"],correctIndex:1,explanation:"Photosynthesis is synthesis."},
    {question:"Solvent front must:",options:["Stay below spotted baseline","Never move","Be above baseline","Touch top first"],correctIndex:2,explanation:"Solvent rises from baseline."},
    {question:"Mixed ink spots → several spots after run means:",options:["Single pure compound","Several components","Error only","Paper wet"],correctIndex:1,explanation:"Separated dyes."},
    {question:"Volatile from non-volatile:",options:["Chromatography only","Simple distillation","Only filtration","Only titration"],correctIndex:1,explanation:"Vapour condenses."},
    {question:"Immiscible oil + water:",options:["One phase","Separate layers","Always dissolve","Same density"],correctIndex:1,explanation:"Use separating funnel."},
    {question:"Anti-bumping granules:",options:["Increase bp","Smooth boiling","Absorb product","Colour indicator"],correctIndex:1,explanation:"Nucleation sites."},
    {question:"If Rf = 0.4 and front 10 cm, spot distance:",options:["25 cm","4 cm","2.5 cm","0.04 cm"],correctIndex:1,explanation:"0.4×10=4 cm."},
    {question:"Ethanol + water (wide bp gap) could use:",options:["Either simple or fractional","Only chromatography","Only electrolysis","Decantation"],correctIndex:0,explanation:"Simple may suffice; fractional finer."},
    {question:"Dry product after filtration:",options:["Leave wet","Desiccator or oven low T","Burn","Add water"],correctIndex:1,explanation:"Remove surface water."},
    {question:"Paper chromatography is:",options:["Always ascending","Only gas phase","Partition between stationary water and solvent","Electrophoresis"],correctIndex:2,explanation:"Classic explanation."},
    {question:"Which pair is separated by sublimation in lab context:",options:["NaCl + sand","Iodine + sand","Oil + water","Cu + Fe"],correctIndex:1,explanation:"Iodine sublimes."},
    {question:"Tailing spot in chromatography may mean:",options:["Too concentrated spot","Perfect technique","No solvent","Rf = 1 always"],correctIndex:0,explanation:"Overload smears."},
    {question:"Recrystallisation purifies by:",options:["Different solubility of impurities","Burning impurities","Magnet","Sound"],correctIndex:0,explanation:"Impurity stays in solution or filters out."},
    {question:"Gas chromatography mobile phase is:",options:["Paper","Inert gas","Only water","Mercury"],correctIndex:1,explanation:"Carrier gas."},
    {question:"Thin layer chromatography stationary phase:",options:["Glass rod","Silica on plate","Only filter paper","Ice"],correctIndex:1,explanation:"TLC plate."},
    {question:"Azeotrope (e.g. some ethanol-water) means:",options:["Easy 100% separation by one distillation","Constant boiling mixture — limit of simple separation","No liquid","Only solid"],correctIndex:1,explanation:"Fractional still may be needed."}
    ],
    trueFalse: [
    {statement:"Rf can be greater than 1.",correct:false,explain:"By definition ratio ≤ 1."},
    {statement:"Same compound always has same Rf if solvent and temperature unchanged.",correct:true,explain:"Characteristic under fixed conditions."},
    {statement:"You should spot with a thick blob for best results.",correct:false,explain:"Small concentrated spot — less tailing."},
    {statement:"Distillation separates miscible liquids by density.",correct:false,explain:"By volatility / boiling point."},
    {statement:"Filtration separates an insoluble solid from a liquid.",correct:true,explain:"Classic use."},
    {statement:"All nitrates are insoluble.",correct:false,explain:"Most nitrates are soluble."},
    {statement:"Water in condenser jacket should flow opposite to vapour direction.",correct:true,explain:"Efficient cooling."},
    {statement:"Chromatography paper should touch the very bottom of the solvent in the tank.",correct:false,explain:"Baseline above liquid level."},
    {statement:"Fractionating column has more surface for repeated evaporation-condensation.",correct:true,explain:"Theoretical plates."},
    {statement:"Centrifugation speeds up settling of fine precipitates.",correct:true,explain:"Artificial 'gravity'."},
    {statement:"Simple distillation gives pure azeotropic ethanol-water in one step easily.",correct:false,explain:"Often ~96% ethanol azeotrope."},
    {statement:"Sublimation is solid to gas without liquid.",correct:true,explain:"Definition."}
    ],
    orderGame: ["Draw pencil baseline","Spot sample","Add solvent below baseline","Seal tank","Run until near top","Dry and locate spots"],
    orderTitle: "Paper chromatography",
    });
})();
