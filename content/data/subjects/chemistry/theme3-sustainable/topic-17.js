(function () {
  window.__registerTopic({
    id: "17",
    theme: "Theme 3: Chemistry in a Sustainable World",
    title: "Alkanes, Alkenes, Alcohols, Acids, Esters",
    cheatBlocks: [
        {
            "title": "Hydrocarbons",
            "points": [
                "**Alkane** CₙH₂ₙ₊₂ — single bonds; substitution with halogen (UV).",
                "**Alkene** CₙH₂ₙ — C=C; addition reactions; test: **bromine water** decolourises.",
                "**Cracking** — long alkanes → shorter alkanes + alkenes (catalyst/heat)."
            ]
        },
        {
            "title": "Oxygen compounds",
            "points": [
                "**Alcohol** — –OH; oxidised to **carboxylic acid** (acidified dichromate: orange→green).",
                "**Carboxylic acid** — –COOH; weak acid.",
                "**Ester** — acid + alcohol (conc H₂SO₄) → ester + water; fruity smell."
            ]
        },
        {
            "title": "Combustion",
            "points": [
                "Complete → CO₂ + H₂O; incomplete → CO/C + lower O₂.",
                "Alkenes more sooty than alkanes (higher C:H ratio)."
            ]
        },
        {
            "title": "Crude oil & cracking",
            "points": [
                "**Fractional distillation** separates crude by boiling point into refinery fractions (petrol, diesel, bitumen…).",
                "**Cracking** breaks long alkanes to shorter alkanes + alkenes (fuels + chemical feedstock)."
            ]
        }
    ,
    {
        "title": "Functional Groups & Key Tests",
        "points": [
            "**Alkene** (C=C): decolourises **bromine water** (orange → colourless).",
            "**Alcohol** (–OH): burns; acidified **K₂Cr₂O₇** (orange → green) on oxidation.",
            "**Carboxylic acid** (–COOH): fizzes with Na₂CO₃ → CO₂; weak acid (higher pH than HCl at same conc).",
            "**Ester** (–COO–): fruity smell; acid hydrolysis → carboxylic acid + alcohol.",
            "Fermentation: $C_6H_{12}O_6 \\xrightarrow{\\text{yeast}} 2C_2H_5OH + 2CO_2$ (warm, anaerobic)."
        ]
    }],
    infographics: [
      { image: "data/subjects/chemistry/images/sustainable-01-organic.jpg", caption: "Organic families + key tests (alkene bromine water, oxidation, esterification)" },
      { svg: "<svg viewBox=\"0 0 320 90\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"320\" height=\"90\" fill=\"#1c222d\"/><text x=\"8\" y=\"22\" fill=\"#a78bfa\" font-size=\"11\">Alkane C–C single</text><text x=\"8\" y=\"42\" fill=\"#fb923c\" font-size=\"11\">Alkene C=C · decolourises Br₂(aq)</text><text x=\"8\" y=\"62\" fill=\"#5eead4\" font-size=\"11\">Alcohol –OH · Acid –COOH · Ester + H₂O</text></svg>", caption: "Organic families (revision)" }
    ],
    flashcards: [
        {
            "front": "General formula alkene?",
            "back": "CₙH₂ₙ."
        },
        {
            "front": "Test for C=C?",
            "back": "Brown bromine water → colourless."
        },
        {
            "front": "Ethanol → ethanoic acid?",
            "back": "Oxidation."
        },
        {
            "front": "Esterification?",
            "back": "Acid + alcohol, conc H₂SO₄ catalyst."
        },
        {
            "front": "Major product complete combustion propane?",
            "back": "CO₂ + H₂O."
        },
        {
            "front": "Substitution vs addition?",
            "back": "Alkane + halogen substitution; alkene addition across double bond."
        },
        {
            "front": "Functional group aldehyde?",
            "back": "–CHO (if taught)."
        },
        {
            "front": "Why alkenes more reactive?",
            "back": "π bond weaker; electron-rich site."
        },
        {
            "front": "Dehydration of ethanol?",
            "back": "Conc H₂SO₄ → ethene + water."
        },
        {
            "front": "Carboxylic acid + carbonate?",
            "back": "Salt + CO₂ + H₂O."
        },
        {
            "front": "Naming C₄H₁₀ isomers?",
            "back": "Butane vs methylpropane."
        },
        {
            "front": "Display formula shows?",
            "back": "All bonds explicitly."
        },
        {
            "front": "PVC monomer?",
            "back": "Chloroethene."
        },
        {
            "front": "Natural gas main alkane?",
            "back": "Methane."
        }
    ,
    { "front": "General formula alkane?", "back": "$C_nH_{2n+2}$ — **saturated** (single bonds only)." },
    { "front": "General formula alkene?", "back": "$C_nH_{2n}$ — **unsaturated** (contains C=C)." },
    { "front": "Alcohol → acid oxidation agent?", "back": "**Acidified K₂Cr₂O₇** (orange → green) or acidified KMnO₄ (purple → colourless)." },
    { "front": "Fermentation equation?", "back": "$C_6H_{12}O_6 \\xrightarrow{\\text{yeast}} 2C_2H_5OH + 2CO_2$. Conditions: warm (~35°C), anaerobic (no O₂)." },
    { "front": "Esterification reagents?", "back": "Carboxylic acid + alcohol + **conc H₂SO₄** (catalyst). Product: ester + water." },
    { "front": "Why cracking of long alkanes?", "back": "Demand > supply for short-chain fuels. Cracking breaks C–C bonds to produce **shorter alkanes + alkenes** (also feedstock)." }],
    quiz: [
    {id:"chem-T17-001",question:"Which decolourises bromine water:",options:["Ethane","Ethene","Methane","Ethanoic acid"],correctIndex:1,explanation:"Addition to C=C."},
    {id:"chem-T17-002",question:"General formula alkane:",options:["CₙH₂ₙ","CₙH₂ₙ₊₂","CₙH₂ₙ₋₂","CₙHₙ"],correctIndex:1,explanation:"Saturated chain."},
    {id:"chem-T17-003",question:"Product of complete combustion of C₃H₈:",options:["CO only","CO₂ + H₂O","C + H₂O","NH₃"],correctIndex:1,explanation:"Hydrocarbon + O₂."},
    {id:"chem-T17-004",question:"Ester smell often:",options:["Rotten","Fruity","Sour only","None"],correctIndex:1,explanation:"Characteristic."},
    {id:"chem-T17-005",question:"Oxidation of ethanol with acidified K₂Cr₂O₇:",options:["Ethane","Ethanoic acid","Ethene","Ethyl ethanoate"],correctIndex:1,explanation:"–OH → –COOH."},
    {id:"chem-T17-006",question:"Cracking purpose:",options:["Join molecules","Break large molecules to useful smaller ones","Remove O₂","Make polymers only"],correctIndex:1,explanation:"Petroleum refining."},
    {id:"chem-T17-007",question:"Acid + alcohol → ester catalyst:",options:["NaOH","Conc H₂SO₄","Pt","Water"],correctIndex:1,explanation:"Dehydrating catalyst."},
    {id:"chem-T17-008",question:"Functional group –COOH:",options:["Alcohol","Aldehyde","Carboxylic acid","Ester"],correctIndex:2,explanation:"Carboxy."},
    {id:"chem-T17-009",question:"Test for –COOH with carbonate:",options:["No reaction","Fizzes CO₂","Blue ppt","Purple gas"],correctIndex:1,explanation:"Acid + carbonate."},
    {id:"chem-T17-010",question:"Addition of steam to ethene (industrial):",options:["Ethanol","Ethane","Ethanoic acid","Polyethene"],correctIndex:0,explanation:"Hydration."},
    {id:"chem-T17-011",question:"Poly(ethene) from:",options:["Ethane","Ethene","Ethanol","Ethyne"],correctIndex:1,explanation:"Addition polymer."},
    {id:"chem-T17-012",question:"Isomer of C₄H₁₀:",options:["Only one structure","Butane / methylpropane","Benzene","Water"],correctIndex:1,explanation:"Structural isomerism."},
    {id:"chem-T17-013",question:"Incomplete combustion major toxic product:",options:["CO₂","CO","N₂","O₃"],correctIndex:1,explanation:"Carbon monoxide."},
    {id:"chem-T17-014",question:"Alkene + steam → alcohol is:",options:["Substitution","Addition","Cracking","Neutralisation"],correctIndex:1,explanation:"Across double bond."},
    {id:"chem-T17-015",question:"Ethanoic acid is:",options:["Strong acid","Weak acid","Alkali","Salt"],correctIndex:1,explanation:"Partial ionisation."},
    {id:"chem-T17-016",question:"Acid hydrolysis of ester gives:",options:["Only polymer","Carboxylic acid + alcohol","Only water","Salt only"],correctIndex:1,explanation:"Reverse esterification."},
    {id:"chem-T17-017",question:"Alkenes often sootier flame than alkanes because:",options:["Lower C:H","Higher C:H ratio","No carbon","Only H burns"],correctIndex:1,explanation:"Less complete per C."},
    {id:"chem-T17-018",question:"Dehydration ethanol → ethene:",options:["Dilute H₂SO₄","Conc H₂SO₄ heat","NaOH","Br₂"],correctIndex:1,explanation:"Elimination."},
    {id:"chem-T17-019",question:"Saturated hydrocarbon:",options:["Ethene","Propane","Propyne","Benzene"],correctIndex:1,explanation:"Alkane saturated."},
    {id:"chem-T17-020",question:"Molecular formula ethanol:",options:["C₂H₄O","C₂H₆O","CH₄O","C₂H₄"],correctIndex:1,explanation:"C₂H₅OH."},
    {id:"chem-T17-021",question:"Ethanoic acid has:",options:["1 C","2 C in molecule","6 C ring","No O"],correctIndex:1,explanation:"CH₃COOH."},
    {id:"chem-T17-022",question:"Fermentation to ethanol needs:",options:["O₂ only","Yeast anaerobic","Cl₂","Light only"],correctIndex:1,explanation:"Enzymes."},
    {id:"chem-T17-023",question:"Shift equilibrium to ester:",options:["Add excess water","Remove water","Cool only","Add NaCl"],correctIndex:1,explanation:"Le Chatelier."},
    {id:"chem-T17-024",question:"Bromine + alkene product type:",options:["Dibromoalkane","Alkane only","Carboxylic acid","No reaction"],correctIndex:0,explanation:"Addition."},
    {id:"chem-T17-025",question:"Display ethene has:",options:["Single C–C","Double C=C","Triple bond","Ionic"],correctIndex:1,explanation:"Unsaturation."},
    {id:"chem-T17-026",question:"Bioethanol advantage:",options:["Renewable from biomass","Zero CO₂ lifecycle always","No land use","Only solid"],correctIndex:0,explanation:"Renewable argument."},
    {id:"chem-T17-027",question:"Cyclopentane (a cycloalkane) has molecular formula:",options:["C₅H₁₂","C₅H₁₀","C₅H₈","C₅H₁₀O"],correctIndex:1,explanation:"Saturated ring: CₙH₂ₙ (not CₙH₂ₙ₊₂ for an open chain)."},
    {id:"chem-T17-028",question:"Ethanol oxidised with acidified K₂Cr₂O₇ under reflux (product not distilled off) gives mainly:",options:["Ethanal","Ethanoic acid","Ethene","Ethane"],correctIndex:1,explanation:"Further oxidation under reflux to the carboxylic acid."},
    {id:"chem-T17-029",question:"Acid-catalysed hydrolysis of ethyl ethanoate gives:",options:["Ethane + ethanoic acid","Ethanol + ethanoic acid","Ethene + water","Ethanal only"],correctIndex:1,explanation:"Ester splits to carboxylic acid + alcohol."},
    {id:"chem-T17-030",question:"Propene + H₂ with a nickel catalyst gives:",options:["Propyne","Propane","Propanal","No reaction"],correctIndex:1,explanation:"Hydrogenation saturates the C=C."},
    {id:"chem-T17-031",question:"At the same concentration, which solution has the higher pH (weaker acid)?",options:["Hydrochloric acid","Ethanoic acid","They are identical","Sulfuric acid"],correctIndex:1,explanation:"Ethanoic acid is weak; strong acids have lower pH."},
    {id:"chem-T17-032",question:"In esterification, water forms from:",options:["Only the sulfuric acid","The acid’s –OH and the H from the alcohol’s –OH","Only O₂ from air","NaOH neutralisation"],correctIndex:1,explanation:"Condensation between –COOH and –OH (alcohol)."},
    {id:"chem-T17-033",question:"A main reason long-chain alkanes are cracked in refineries is to produce:",options:["Only heavier bitumen","Smaller alkanes and alkenes for fuels and feedstocks","Pure oxygen","Diamond"],correctIndex:1,explanation:"Break C–C bonds to useful shorter molecules."},
    {id:"chem-T17-034",question:"Why do alkenes decolourise bromine water under ordinary lab conditions more readily than alkanes?",options:["Alkanes are always ionic","The C=C π bond is an electron-rich addition site","Alkanes are lighter","Bromine cannot add to any carbon"],correctIndex:1,explanation:"Electrophilic addition across the double bond."},
    {id:"chem-T17-035",question:"Structural isomers with formula C₄H₁₀ include:",options:["Only n-butane","Butane and methylpropane","Butane and but-1-ene","Ethane and propane"],correctIndex:1,explanation:"Same molecular formula, different connectivity."},
    {id:"chem-T17-036",question:"Incomplete combustion of a hydrocarbon in limited air can produce:",options:["Only CO₂","CO and/or carbon (soot) among other products","Only H₂O","N₂ only"],correctIndex:1,explanation:"Insufficient O₂ favours CO and elemental carbon."},
    {id:"chem-T17-201",question:"Fractional distillation of crude oil separates fractions mainly by:",options:["Atomic number","Boiling point (volatility)","Electronegativity","Density of water"],correctIndex:1,explanation:"Different chain lengths → different boiling points."},
    {id:"chem-T17-202",question:"Compared with many catalytic routes, simple thermal cracking at very high temperature is often:",options:["More selective toward one alkene only","Less selective — broader mixture of fragments and alkenes","Impossible in industry","Only physical distillation"],correctIndex:1,explanation:"High-temperature scission is less controlled than zeolite-catalysed cracking (syllabus-level contrast)."},
    {id:"chem-T17-203",question:"But-1-ene and but-2-ene (both C₄H₈) are examples of:",options:["Structural isomers only","Positional isomerism among alkenes (same formula, different C=C position)","Functional group isomers with alkanes","Polymers"],correctIndex:1,explanation:"Same molecular formula; double-bond position differs."},
    {id:"chem-T17-204",question:"When propan-1-ol is oxidised with acidified dichromate under distillation (removing product as it forms), the organic product collected first is often:",options:["Propanoic acid","Propanal","Propane","Propanone"],correctIndex:1,explanation:"Distillation favours stopping at the aldehyde."},
    {id:"chem-T17-205",question:"Ethene reacts with steam (acid catalyst) to form ethanol. This is best classed as:",options:["Substitution","Electrophilic addition / hydration across C=C","Cracking","Neutralisation"],correctIndex:1,explanation:"π bond opens; –OH adds."},
    {id:"chem-T17-206",question:"A student tests an unknown with sodium carbonate: vigorous bubbling. This supports:",options:["Presence of an alcohol","Presence of a carboxylic acid (or strong acid)","Presence of an alkene","Presence of an ester only"],correctIndex:1,explanation:"Acid + carbonate → CO₂."},
    {id:"chem-T17-207",question:"Why does ethanoic acid have a lower electrical conductivity than HCl at the same concentration?",options:["Ethanoic acid is a strong acid","Ethanoic acid is weak — fewer ions per dm³","HCl has no ions","Ethanoic acid is a gas"],correctIndex:1,explanation:"Partial ionisation."},
    {id:"chem-T17-208",question:"The general formula for a non-cyclic alkane is:",options:["CₙH₂ₙ","CₙH₂ₙ₊₂","CₙH₂ₙ₋₂","CₙHₙO₂"],correctIndex:1,explanation:"Saturated acyclic alkanes."},
    {id:"chem-T17-209",question:"Methylpropane and butane both have formula C₄H₁₀. Their relationship is:",options:["Same empirical formula only","Structural isomers","Cis–trans isomers","Allotropes"],correctIndex:1,explanation:"Different connectivity — structural isomerism."},
    {id:"chem-T17-301",question:"Crude oil is separated into fractions using fractional distillation because the fractions have:",options:["Different densities only","Different boiling points — shorter hydrocarbon chains are more volatile","Different colours only","Different ionic charges"],correctIndex:1,explanation:"Shorter/lighter chains have weaker London forces → lower bp → come off the column first."},
    {id:"chem-T17-302",question:"Short-chain alkanes are in high demand as petrol while long-chain fractions are less so. Refineries crack long chains because:",options:["Long chains have more colour","Cracking produces shorter alkanes + alkenes to match fuel demand and chemical feedstocks","Cracking makes crude oil heavier","Only to remove sulfur"],correctIndex:1,explanation:"Demand > supply for shorter fractions; cracking matches supply to demand."},
    {id:"chem-T17-303",question:"Propane (C₃H₈) is a saturated hydrocarbon. 'Saturated' means:",options:["It contains only single C–C and C–H bonds (no C=C or C≡C)","It is dissolved in water","It is fully coloured","It cannot burn"],correctIndex:0,explanation:"Saturated = only sigma bonds; cannot undergo addition reactions."},
    {id:"chem-T17-304",question:"Alkenes burn with a sooty/smoky flame compared with alkanes of similar size because:",options:["Alkenes have lower carbon:hydrogen ratio","Alkenes have higher carbon:hydrogen ratio → less complete combustion → more carbon/soot","Alkenes are ionic","Alkenes do not burn"],correctIndex:1,explanation:"CₙH₂ₙ vs CₙH₂ₙ₊₂: alkenes are relatively carbon-rich → sootier combustion."},
    {id:"chem-T17-305",question:"Ethene reacts with bromine: CH₂=CH₂ + Br₂ → CH₂BrCH₂Br. This reaction is:",options:["Substitution","Electrophilic addition across the C=C double bond","Combustion","Esterification"],correctIndex:1,explanation:"Atoms add across the C=C (no atoms removed). The π bond breaks to form two new σ bonds."},
    {id:"chem-T17-306",question:"Bioethanol is claimed to be more sustainable than petrol because:",options:["It produces more energy per litre","It is produced from renewable crops — CO₂ released on combustion is partially offset by CO₂ absorbed during plant growth","It produces no CO₂","It contains no hydrogen"],correctIndex:1,explanation:"Short-cycle carbon: plants fix CO₂; burning releases it back. Net impact less than fossil fuel (though land use matters)."},
    {id:"chem-T17-307",question:"Fermentation of glucose: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. The conditions required are:",options:["High temperature (300°C) and Pt catalyst","Yeast (contains enzymes/zymase), warm temperature (~30–35°C), anaerobic (no O₂)","Concentrated H₂SO₄","Only UV light"],correctIndex:1,explanation:"Yeast enzymes ferment glucose at body-temperature conditions without oxygen."},
    {id:"chem-T17-308",question:"Ethanoic acid reacts with sodium carbonate to produce sodium ethanoate, water, and:",options:["Cl₂","H₂","CO₂ gas (effervescence)","O₂"],correctIndex:2,explanation:"Carboxylic acid + carbonate → salt + H₂O + CO₂. Test for –COOH group."},
    {id:"chem-T17-309",question:"The ester ethyl ethanoate is formed from:",options:["Ethane + acetic acid","Ethanol + ethanoic acid, with conc H₂SO₄ as catalyst","Ethene + ethanol","Ethanol + water"],correctIndex:1,explanation:"Esterification: alcohol + carboxylic acid ⇌ ester + water."},
    {id:"chem-T17-310",question:"Ethene (from cracking) can be hydrated industrially to form ethanol: $\\text{CH}_2{=}\\text{CH}_2 + \\text{H}_2\\text{O} \\to \\text{C}_2\\text{H}_5\\text{OH}$. This is preferred over fermentation for large-scale production because:",options:["It uses food crops","Continuous process, higher purity, lower cost at scale — though uses non-renewable ethene feedstock","It requires no energy","Fermentation is impossible"],correctIndex:1,explanation:"Industrial hydration is a continuous high-yield process, but relies on fossil-fuel derived ethene."}
    ],
    trueFalse: [
    {statement:"All alkenes have the same empirical formula CH₂.",correct:true,explain:"CₙH₂ₙ → CH₂."},
    {statement:"Alkanes undergo addition with bromine water readily.",correct:false,explain:"Substitution with Br₂ under UV; no decolourisation with bromine water like alkenes."},
    {statement:"Esters are formed in a condensation reaction with water eliminated.",correct:true,explain:"Esterification."},
    {statement:"Ethanol is oxidised to ethanal then ethanoic acid with strong oxidant in lab.",correct:true,explain:"Intermediate aldehyde if distilled off."},
    {statement:"Complete combustion always gives only CO₂.",correct:false,explain:"Also H₂O for hydrocarbons."},
    {statement:"PVC is an addition polymer of chloroethene.",correct:true,explain:"Vinyl chloride."},
    {statement:"Carboxylic acids turn blue litmus red.",correct:true,explain:"Acidic."},
    {statement:"Alkenes are unsaturated.",correct:true,explain:"Can add more atoms."},
    {statement:"Methane is tetrahedral.",correct:true,explain:"sp³ carbon."},
    {statement:"Ethanoic acid reacts with NaOH to form sodium ethanoate.",correct:true,explain:"Neutralisation."},
    {statement:"Hydrogenation of vegetable oils uses nickel catalyst.",correct:true,explain:"Hardening fats."},
    {statement:"Isomers have different molecular formulas.",correct:false,explain:"Same molecular formula, different structure."}
    ],
    });
})();
