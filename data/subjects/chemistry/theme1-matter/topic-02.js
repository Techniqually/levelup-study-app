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
        },
        {
            "title": "Gas collection & purity",
            "points": [
                "**Over water** — for gases sparingly soluble in water; not for very soluble gases (e.g. NH₃, HCl).",
                "**Upward/downward delivery** — gas density vs air (not the only factor; use safety data).",
                "**Purity tests** — sharp melting point or fixed boiling point for a pure substance under fixed pressure.",
                "**Dry gases** — pass through a suitable drying agent (e.g. anhydrous CaCl₂) if the gas is compatible."
            ]
        }
    ,
    {
        "title": "Choosing the Right Technique",
        "points": [
            "**Filtration** — insoluble solid + liquid mixture.",
            "**Crystallisation** — dissolved solid from solution (evaporate → cool → filter).",
            "**Simple distillation** — solvent from dissolved solute (large bp difference).",
            "**Fractional distillation** — two miscible liquids with close boiling points (e.g. crude oil).",
            "**Chromatography** — identify/separate dissolved substances by $R_f$ value.",
            "**Solvent extraction** — substance more soluble in organic solvent than water."
        ]
    }],
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
    ,
    { "front": "When to use fractional not simple distillation?", "back": "When two **miscible liquids have close boiling points** (e.g. ethanol/water, crude oil fractions)." },
    { "front": "Crystallisation steps?", "back": "1. Dissolve. 2. Heat to concentrate. 3. Cool slowly. 4. Filter crystals. 5. Dry (oven or desiccator)." },
    { "front": "If $R_f$ of two spots are the same as the reference?", "back": "The substances are likely **the same compound** (same interaction with solvent/stationary phase)." },
    { "front": "Why Rf ≤ 1 always?", "back": "Substance can never travel *further* than the solvent front that carries it." }],
    quiz: [
    {id:"chem-T2-001",question:"Rf is calculated as:",options:["Front ÷ spot","Spot ÷ front","Mass ÷ volume","Time ÷ distance"],correctIndex:1,explanation:"Spot over solvent front."},
    {id:"chem-T2-002",question:"Two liquids bp 82°C and 78°C best separated by:",options:["Simple distillation only","Fractional distillation","Filtration","Magnet"],correctIndex:1,explanation:"Close bp need fractionating column."},
    {id:"chem-T2-003",question:"Pure salt from rock salt + water:",options:["Filter only","Dissolve, filter sand, evaporate","Distil water only","Burn"],correctIndex:1,explanation:"NaCl soluble; insoluble grit filtered."},
    {id:"chem-T2-004",question:"Chromatography separates by:",options:["Boiling point only","Different affinity for phases","Colour only","Density of beaker"],correctIndex:1,explanation:"Partition."},
    {id:"chem-T2-005",question:"Baseline in pencil because:",options:["Pencil cheaper","Ink dissolves and interferes","Exam rule","Pencil darker"],correctIndex:1,explanation:"Soluble ink runs."},
    {id:"chem-T2-006",question:"Higher Rf means:",options:["Less soluble in mobile phase","More time in mobile phase / travels further","Heavier atom","Always ionic"],correctIndex:1,explanation:"Moves farther with solvent."},
    {id:"chem-T2-007",question:"BaCl₂ test for sulfate gives:",options:["Gas","White BaSO₄ ppt","Blue solution","Silver mirror"],correctIndex:1,explanation:"Insoluble sulfate."},
    {id:"chem-T2-008",question:"Distillation flask should not be:",options:["Round bottom","Filled completely","Heated with condenser","Clamped"],correctIndex:1,explanation:"Needs head space — bumping."},
    {id:"chem-T2-009",question:"Cooling condenser water flow:",options:["Bottom in top out","Top in bottom out","No water","Either"],correctIndex:0,explanation:"Counter-current cooling efficient."},
    {id:"chem-T2-010",question:"Crystallisation from hot saturated solution on cooling:",options:["Gas forms","Crystals form as solubility drops","Liquid boils","Paper chars"],correctIndex:1,explanation:"Less soluble when cold."},
    {id:"chem-T2-011",question:"Which is NOT a purification method:",options:["Filtration","Photosynthesis","Distillation","Chromatography"],correctIndex:1,explanation:"Photosynthesis is synthesis."},
    {id:"chem-T2-012",question:"Solvent front must:",options:["Stay below spotted baseline","Never move","Be above baseline","Touch top first"],correctIndex:2,explanation:"Solvent rises from baseline."},
    {id:"chem-T2-013",question:"Mixed ink spots → several spots after run means:",options:["Single pure compound","Several components","Error only","Paper wet"],correctIndex:1,explanation:"Separated dyes."},
    {id:"chem-T2-014",question:"Volatile from non-volatile:",options:["Chromatography only","Simple distillation","Only filtration","Only titration"],correctIndex:1,explanation:"Vapour condenses."},
    {id:"chem-T2-015",question:"Immiscible oil + water:",options:["One phase","Separate layers","Always dissolve","Same density"],correctIndex:1,explanation:"Use separating funnel."},
    {id:"chem-T2-016",question:"Anti-bumping granules:",options:["Increase bp","Smooth boiling","Absorb product","Colour indicator"],correctIndex:1,explanation:"Nucleation sites."},
    {id:"chem-T2-017",question:"If Rf = 0.4 and front 10 cm, spot distance:",options:["25 cm","4 cm","2.5 cm","0.04 cm"],correctIndex:1,explanation:"0.4×10=4 cm."},
    {id:"chem-T2-018",question:"Ethanol + water (wide bp gap) could use:",options:["Either simple or fractional","Only chromatography","Only electrolysis","Decantation"],correctIndex:0,explanation:"Simple may suffice; fractional finer."},
    {id:"chem-T2-019",question:"Dry product after filtration:",options:["Leave wet","Desiccator or oven low T","Burn","Add water"],correctIndex:1,explanation:"Remove surface water."},
    {id:"chem-T2-020",question:"Paper chromatography is:",options:["Always ascending","Only gas phase","Partition between stationary water and solvent","Electrophoresis"],correctIndex:2,explanation:"Classic explanation."},
    {id:"chem-T2-021",question:"Which pair is separated by sublimation in lab context:",options:["NaCl + sand","Iodine + sand","Oil + water","Cu + Fe"],correctIndex:1,explanation:"Iodine sublimes."},
    {id:"chem-T2-022",question:"Tailing spot in chromatography may mean:",options:["Too concentrated spot","Perfect technique","No solvent","Rf = 1 always"],correctIndex:0,explanation:"Overload smears."},
    {id:"chem-T2-023",question:"Recrystallisation purifies by:",options:["Different solubility of impurities","Burning impurities","Magnet","Sound"],correctIndex:0,explanation:"Impurity stays in solution or filters out."},
    {id:"chem-T2-024",question:"Gas chromatography mobile phase is:",options:["Paper","Inert gas","Only water","Mercury"],correctIndex:1,explanation:"Carrier gas."},
    {id:"chem-T2-025",question:"Thin layer chromatography stationary phase:",options:["Glass rod","Silica on plate","Only filter paper","Ice"],correctIndex:1,explanation:"TLC plate."},
    {id:"chem-T2-026",question:"A thermometer bulb in distillation should be placed:",options:["Fully inside liquid","At the still head near side-arm to read vapour temperature","Outside apparatus","Inside condenser water"],correctIndex:1,explanation:"It should measure vapour temperature entering the condenser."},
    {id:"chem-T2-027",question:"Two spots have the same Rf in the same solvent. What follows?",options:["They must be the same compound","They could be the same compound — confirm with another solvent","Rf identifies molar mass exactly","Rf is independent of temperature"],correctIndex:1,explanation:"Rf is suggestive; co-elution happens — a second solvent helps."},
    {id:"chem-T2-028",question:"Why keep the chromatography tank lid on during a run?",options:["To make the solvent evaporate faster","To keep vapour-saturated air and a stable solvent front","To heat the paper","To stop light reactions only"],correctIndex:1,explanation:"Saturated vapour improves reproducibility and reduces edge effects."},
    {id:"chem-T2-029",question:"In TLC, silica is often slightly acidic. Weak bases may:",options:["Always decompose","Show tailing if protonated strongly","Never move","Have Rf = 1 always"],correctIndex:1,explanation:"Strong adsorption/tailing can occur — technique and solvent matter."},
    {id:"chem-T2-030",question:"Simple distillation is least suitable when:",options:["Separating a volatile liquid from a dissolved solid","Boiling points of two liquids are very close","One component is non-volatile","You need only rough separation"],correctIndex:1,explanation:"Close-boiling mixtures need a fractionating column."},
    {id:"chem-T2-031",question:"Which error is reduced most by using a calibrated thermometer?",options:["Parallax when reading the meniscus","Systematic temperature offset","Random scatter between readings","Convection in the flask"],correctIndex:1,explanation:"Calibration fixes consistent reading bias."},
    {id:"chem-T2-032",question:"After hot filtration, a solution sometimes deposits crystals as it cools because:",options:["Water evaporates completely first","Solubility usually decreases on cooling","Crystals need light","Filtration increases solubility"],correctIndex:1,explanation:"Cooling drives supersaturated solutions toward equilibrium."},
    {id:"chem-T2-033",question:"To obtain pure water from seawater in school lab, use:",options:["Filtration only","Simple distillation","Chromatography","Magnetic separation"],correctIndex:1,explanation:"Water vaporises and condenses while dissolved salts remain."},
    {id:"chem-T2-034",question:"Why should the chromatography baseline be above the solvent level?",options:["To keep paper dry forever","So the sample spots do not dissolve directly into the solvent pool","To increase Rf values","To prevent evaporation"],correctIndex:1,explanation:"Spots must travel with solvent front, not dissolve at start."},
    {id:"chem-T2-035",question:"If two components have identical boiling points, fractional distillation:",options:["Always gives pure components in one cut","Cannot separate by boiling point alone","Always forms an azeotrope","Requires filtration"],correctIndex:1,explanation:"No bp difference means no vapour enrichment by distillation."},
    {id:"chem-T2-036",question:"Green solvent choice in chromatography might prioritise:",options:["Maximum toxicity","Low toxicity and lower environmental impact","Only the brightest colour","Highest boiling point always"],correctIndex:1,explanation:"Safety and waste matter in practical chemistry."},
    {id:"chem-T2-201",question:"Collecting ammonia gas by displacement of water is usually unsuitable mainly because:",options:["Ammonia is denser than air","Ammonia is highly soluble in water","Ammonia does not react","Water freezes"],correctIndex:1,explanation:"Very soluble gases dissolve extensively in the water collection system."},
    {id:"chem-T2-202",question:"A solid sample is suspected impure. A quick test that strongly suggests purity is:",options:["It looks white","A sharp, narrow melting range close to literature value","It dissolves in water","It has a smell"],correctIndex:1,explanation:"Pure solids typically melt sharply; impurities broaden the range."},
    {id:"chem-T2-203",question:"Mixed melting point of a sample with known pure compound is depressed if:",options:["The sample is the same pure compound","The sample contains an impurity","The heating is slow","The sample is dry"],correctIndex:1,explanation:"Impurities lower and broaden melting point."},
    {id:"chem-T2-204",question:"Suction filtration (Büchner) is used mainly to:",options:["Increase boiling point","Separate filtrate faster and dry solids more effectively than gravity filtration","Measure Rf","Remove all ions from water"],correctIndex:1,explanation:"Faster filtration and better solid recovery for many precipitates."},
    {id:"chem-T2-205",question:"Washing a filtered precipitate with cold distilled water aims to:",options:["Dissolve the product completely","Remove soluble impurities while minimising product loss","Increase crystal size","Change colour only"],correctIndex:1,explanation:"Cold wash reduces solubility loss of product."},
    {id:"chem-T2-206",question:"Percentage yield compares:",options:["Moles of catalyst to product","Actual mass obtained to theoretical maximum from stoichiometry","Volume of solvent to mass","Rf before and after"],correctIndex:1,explanation:"Yield = (actual / theoretical) × 100%."},
    {id:"chem-T2-207",question:"Percentage purity of a sample compares:",options:["Mass of pure desired substance to total sample mass","Volume of solvent to solute","Time to temperature","Rf to 1"],correctIndex:0,explanation:"Purity is about mass fraction of the desired component."},
    {id:"chem-T2-208",question:"Concentrated sulfuric acid is a poor drying agent for ammonia gas because:",options:["Ammonia is not basic","They react to form a salt","Ammonia is too light","Sulfuric acid is not hygroscopic"],correctIndex:1,explanation:"Acid-base neutralisation consumes the gas rather than simply drying it."},
    {id:"chem-T2-209",question:"In a separating funnel, the lower layer is:",options:["Always water","The denser liquid","Always organic","Always aqueous"],correctIndex:1,explanation:"Density determines which layer is lower."},
    {id:"chem-T2-301",question:"Which method is used to separate insoluble sand from water?",options:["Distillation","Filtration","Chromatography","Cracking"],correctIndex:1,explanation:"Filtration separates insoluble solid from liquid."},
    {id:"chem-T2-302",question:"Fractional distillation is best for separating:",options:["Insoluble solid from liquid","Two miscible liquids with different boiling points","A coloured dye from paper","Magnetic and non-magnetic solids"],correctIndex:1,explanation:"Fractionating column improves separation of liquids by boiling point."},
    {id:"chem-T2-303",question:"A chromatogram showing one single spot for a sample most likely means:",options:["The sample is a mixture","The sample may be pure under these conditions","The solvent was wrong","Rf must be 1"],correctIndex:1,explanation:"One spot suggests one component, though confirmation with another solvent is good practice."},
    {id:"chem-T2-304",question:"In paper chromatography, Rf is:",options:["distance solvent front / distance spot","distance spot / distance solvent front","mass of solute / volume of solvent","time / distance"],correctIndex:1,explanation:"Rf uses spot distance divided by solvent front distance from baseline."},
    {id:"chem-T2-305",question:"Crystallisation is commonly used to:",options:["Separate two gases","Obtain a pure soluble solid from solution","Separate magnetic solids","Measure concentration directly"],correctIndex:1,explanation:"A hot saturated solution on cooling gives crystals."},
    {id:"chem-T2-306",question:"To separate chilli flakes (insoluble solid) from table salt (soluble), the best method is:",options:["Distillation","Filtration — flakes stay on filter paper; salt solution passes through","Chromatography","Evaporation only"],correctIndex:1,explanation:"Insoluble + soluble mixture → dissolve in water, then filter. The solid is trapped; the salt is in the filtrate."},
    {id:"chem-T2-307",question:"Simple distillation is used instead of fractional distillation when:",options:["The two liquids have very close boiling points","You want to separate a dissolved solid from its solvent","The liquids must be separated into many fractions","You need Rf values"],correctIndex:1,explanation:"Simple distillation works well for solvent from solute. Fractional distillation is needed for liquids with close boiling points."},
    {id:"chem-T2-308",question:"In paper chromatography, which substance is identified as pure (single component)?",options:["One that produces multiple spots","One that produces exactly one spot at a unique Rf value","One that stays on the start line","One that reaches the solvent front first"],correctIndex:1,explanation:"A pure substance gives one spot. Multiple spots indicate a mixture."},
    {id:"chem-T2-309",question:"Capsaicin (chilli compound) dissolves better in oil than in water. To extract it from chilli, a student could use:",options:["Filtration with water","Solvent extraction with a non-polar/organic solvent","Fractional distillation","Electrolysis"],correctIndex:1,explanation:"Like dissolves like: capsaicin (non-polar) dissolves into non-polar solvents (oil) preferentially. Solvent extraction applies."},
    {id:"chem-T2-310",question:"To obtain pure salt crystals from a salt solution, which sequence is correct?",options:["Filter → distil → cool","Evaporate solution to concentrate → allow to cool → filter off crystals → dry","Electrolyse → heat → filter","Chromatograph → distil"],correctIndex:1,explanation:"Crystallisation: heat to evaporate water (not to dryness to avoid decomposition) → cool → crystals form → filter and dry."}
    ],
    extendedQuestions: [
      {
        id: "chem-T2-E01",
        commandWord: "Explain",
        marks: 4,
        syllabusNote: "5070 separation techniques — distillation; fractionating column.",
        prompt: "A mixture consists of two **miscible liquids** whose boiling points differ by only **6 °C**.\n\nExplain why **fractional distillation** is more suitable than **simple distillation** for separating them in the school laboratory.",
        rubric: [
          "States that boiling points are **close** / similar volatility.",
          "**Fractionating column** (or packing) provides **large surface area** for repeated **evaporation–condensation** cycles (or **reflux** / theoretical plates idea in words).",
          "**Vapour enrichment** — each cycle increases difference in composition between the two liquids in the vapour.",
          "Simple distillation **does not** give enough **separation** / one pass is insufficient when bp are close — contrast stated."
        ],
        modelAnswer: "When boiling points are **close**, a single **simple distillation** gives vapour that is still a **mixture** of both liquids, so you cannot collect **pure** fractions easily.\n**Fractional distillation** uses a **fractionating column** packed with glass beads (or similar). Rising vapour **condenses** and **re-evaporates** many times; the component with the **lower boiling point** tends to stay richer in the vapour moving up, while the higher-bp liquid returns down. This **concentrates** the separation so you can collect **fractions** of higher purity."
      },
      {
        id: "chem-T2-E02",
        commandWord: "Describe",
        marks: 5,
        syllabusNote: "Paper chromatography; $R_f$ definition (syllabus practical).",
        prompt: "You are given **chromatography paper**, a **pencil**, **two dye solutions (A and B)**, a **reference dye**, a **suitable solvent**, and a **tank with a lid**.\n\nDescribe how you would carry out **paper chromatography** to compare A and B with the reference, and how you would measure the **$R_f$ value** of each spot.",
        rubric: [
          "Draw **baseline in pencil** (not ink) and keep baseline **above** solvent level when placing paper in tank.",
          "Spot small amounts of **A, B and reference** on the baseline; label in pencil.",
          "Add solvent below baseline, **seal lid**, allow solvent to run until near top; remove and **mark solvent front** (pencil).",
          "**Dry** (optional mention), locate spots.",
          "$R_f$ = **distance moved by spot** (centre) ÷ **distance moved by solvent front**, both measured from baseline — **same units**."
        ],
        modelAnswer: "1) Rule a faint **pencil baseline** near the bottom; do **not** use ink (it would run).\n2) Spot **tiny** drops of A, B and reference on the baseline and label lightly in pencil.\n3) Pour solvent into the tank to **below** the baseline, stand the paper so only the paper tip touches solvent, **cover** the tank.\n4) When the front is near the top, remove paper, **mark the solvent front** in pencil, let it dry.\n5) Measure distance from baseline to **centre of each spot** ($d_s$) and baseline to solvent front ($d_f$). Calculate $R_f = d_s / d_f$ (no units)."
      },
      {
        id: "chem-T2-E03",
        commandWord: "Explain",
        marks: 3,
        syllabusNote: "Measurement — precision of glassware; titration context.",
        prompt: "In a **titration**, a student measures **25.0 cm³** of aqueous sodium hydroxide into a conical flask using a **measuring cylinder** instead of a **pipette**.\n\nExplain **one** way this choice could affect the **reliability** of the titre volume obtained from the burette.",
        rubric: [
          "Measuring cylinder has **lower precision** / larger **percentage uncertainty** than a **volumetric pipette** (25.0 cm³).",
          "Random variation in the **end-point volume** is larger because the **initial moles of alkali** are less reproducible — **reliability** suffers.",
          "Alternative valid: **parallax** / **meniscus** errors worse with wide cylinder — still links to inconsistent titre."
        ],
        modelAnswer: "A **measuring cylinder** is only read to about **±1 cm³** (or coarse increments), whereas a **pipette** delivers **25.0 cm³** with much smaller uncertainty. The **amount of NaOH** in the flask therefore varies more between repeats, so the **burette titre** needed to neutralise it **fluctuates** more — results are **less reliable** (greater scatter) even if you read the burette carefully."
      },
      {
        id: "chem-T2-E04",
        commandWord: "State",
        marks: 2,
        syllabusNote: "Chromatography practical setup.",
        prompt: "In paper chromatography, the **baseline** (where samples are spotted) must be drawn **above** the level of the solvent in the developing tank when the paper is first placed in.\n\nState **two** reasons why this is important.",
        rubric: [
          "Spots would **dissolve into the bulk solvent** / smear at the start (not carried by ascending solvent as intended).",
          "**$R_f$** / separation would be meaningless or spots would not **move properly** / **no true run**."
        ],
        modelAnswer: "1) If the baseline were **below** the solvent surface, the samples would **wash off** into the solvent pool instead of **travelling with the solvent front**.\n2) You would **not get a proper chromatogram** — spots may smear and **$R_f$** cannot be measured fairly."
      }
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
