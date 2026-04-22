(function () {
  window.__registerTopic({
    id: "7",
    theme: "Theme 2: Chemical Reactions",
    title: "Acids and Bases",
    cheatBlocks: [
        {
            "title": "Acids",
            "points": [
                "pH<7; H⁺ in water; litmus red.",
                "With reactive metal → H₂; carbonate → CO₂.",
                "Strong: HCl, H₂SO₄, HNO₃ fully ionised (dilute)."
            ]
        },
        {
            "title": "Bases",
            "points": [
                "Alkali: soluble base; pH>7; OH⁻.",
                "Neutralisation: acid+base→salt+H₂O.",
                "NH₄⁺ salt + alkali → NH₃ gas."
            ]
        }
    ,
    {
        "title": "Oxide Types",
        "points": [
            "**Acidic oxides** — non-metal oxides: CO₂, SO₂, SO₃, NO₂. React with bases/alkalis.",
            "**Basic oxides** — metal oxides: CuO, MgO, Na₂O. React with acids.",
            "**Amphoteric oxides** — react with *both* acids and alkalis: **Al₂O₃, ZnO**.",
            "**Neutral oxides** — react with neither: **CO, H₂O, NO**.",
            "Alkali = base soluble in water (NaOH, KOH, NH₃(aq))."
        ]
    },
    {
        "title": "Indicator Colours",
        "points": [
            " **Methyl orange**: Red (acid) to Yellow (alkali).",
            " **Screened methyl orange**: Violet (acid) to Green (alkali).",
            " **Litmus**: Red (acid) to Blue (alkali).",
            " **Thymolphthalein**: Colourless (acid) to Blue (alkali)."
        ]
    }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/reactions-02-acids-bases.jpg", caption: "pH scale and indicator colours" },
      { svg: "<svg viewBox=\"0 0 300 90\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"300\" height=\"90\" fill=\"#1c222d\"/><defs><linearGradient id=\"phg\" x1=\"0%\" x2=\"100%\"><stop offset=\"0%\" stop-color=\"#ef4444\"/><stop offset=\"50%\" stop-color=\"#eab308\"/><stop offset=\"100%\" stop-color=\"#3b82f6\"/></linearGradient></defs><rect x=\"20\" y=\"30\" width=\"260\" height=\"20\" rx=\"6\" fill=\"url(#phg)\"/><text x=\"22\" y=\"22\" fill=\"#8b95a8\" font-size=\"9\">acid 0</text><text x=\"135\" y=\"22\" fill=\"#8b95a8\" font-size=\"9\">7</text><text x=\"240\" y=\"22\" fill=\"#8b95a8\" font-size=\"9\">alkali 14</text></svg>", caption: "pH scale" }
    ],
    flashcards: [
        {
            "front": "Strong vs weak acid?",
            "back": "Strong fully ionises; weak partial."
        },
        {
            "front": "Alkali + NH₄Cl warmed?",
            "back": "NH₃ gas."
        },
        {
            "front": "Universal indicator neutral?",
            "back": "~Green pH7."
        },
        {
            "front": "Basic oxide + acid?",
            "back": "Salt + water."
        },
        {
            "front": "Amphoteric Al oxide?",
            "back": "Reacts acid and alkali."
        },
        {
            "front": "Indicator endpoint?",
            "back": "Colour change complete reaction."
        },
        {
            "front": "Sulfuric diprotic?",
            "back": "2 H⁺ per molecule (stepwise)."
        },
        {
            "front": "Ethanoic weak?",
            "back": "Partial dissociation."
        },
        {
            "front": "Corrosive warning?",
            "back": "Concentrated acids/alkalis."
        },
        {
            "front": "Farm lime?",
            "back": "Ca(OH)₂ neutralises acid soil."
        },
        {
            "front": "Antacid?",
            "back": "Weak base neutralises stomach acid."
        }
    ,
    { "front": "Amphoteric oxide examples?", "back": "**Al₂O₃** and **ZnO** — react with both acids AND alkalis." },
    { "front": "Neutral oxide examples?", "back": "**CO, NO, H₂O** — react with neither acids nor bases." },
    { "front": "What is an alkali?", "back": "A **base that is soluble in water**, producing OH⁻(aq). e.g. NaOH, Ca(OH)₂, NH₃(aq)." },
    { "front": "Acid rain gases?", "back": "**SO₂** (from sulfur in coal/oil) and **NOₓ** (from N₂ + O₂ at high T in engines)." }],
    quiz: [
    {id:"chem-T7-001",question:"pH of 0.1 M NaOH strong:",options:["~1","~7","~13","~0"],correctIndex:2,explanation:"High OH⁻."},
    {id:"chem-T7-002",question:"Mg + dil HCl:",options:["Cl₂","H₂","O₂","N₂"],correctIndex:1,explanation:"Metal+acid."},
    {id:"chem-T7-003",question:"Na₂CO₃ + HCl:",options:["No gas","CO₂","SO₂","H₂"],correctIndex:1,explanation:"Carbonate+acid."},
    {id:"chem-T7-004",question:"Which weak acid:",options:["HCl","CH₃COOH","H₂SO₄","HNO₃"],correctIndex:1,explanation:"Ethanoic."},
    {id:"chem-T7-005",question:"Neutralisation products acid+NaOH:",options:["Salt+CO₂","Salt+H₂O","Only water","Cl₂"],correctIndex:1,explanation:"Classic."},
    {id:"chem-T7-006",question:"NH₃ aqueous:",options:["Strong acid","Weak alkali","Strong alkali","Neutral"],correctIndex:1,explanation:"NH₄OH equilibrium."},
    {id:"chem-T7-007",question:"Indicator phenolphthalein acid:",options:["Pink","Colourless","Yellow","Blue"],correctIndex:1,explanation:"Colourless in acid."},
    {id:"chem-T7-008",question: "Solid X does not react with water, but it dissolves completely in both dilute hydrochloric acid and aqueous sodium hydroxide. How is X classified?",options: ["Acidic oxide","Basic oxide","Amphoteric oxide","Neutral oxide"],correctIndex: 2,explanation: "Amphoteric oxides (like Al₂O₃ and ZnO) have both acidic and basic properties, allowing them to react with and dissolve in both acids and alkalis."},
    {id:"chem-T7-009",question:"Metal oxide CuO + H₂SO₄:",options:["H₂","CuSO₄+H₂O","SO₂","No reaction"],correctIndex:1,explanation:"Basic oxide."},
    {id:"chem-T7-010",question:"Diluting acid safely:",options:["Water to acid","Acid to water","Both fast","No water"],correctIndex:1,explanation:"Exothermic."},
    {id:"chem-T7-011",question:"pH of pure water 25°C:",options:["0","7","14","1"],correctIndex:1,explanation:"Neutral."},
    {id:"chem-T7-012",question:"Excess stomach acid treated with:",options:["Strong NaOH drink","Mild antacid","Conc HCl","Sugar"],correctIndex:1,explanation:"Weak base."},
    {id:"chem-T7-013",question:"H⁺ concentration pH=2:",options:["0.01 M","0.1 M","1 M","0.001 M"],correctIndex:0,explanation:"10⁻²."},
    {id:"chem-T7-014",question:"Salt from HCl + KOH:",options:["KCl","K₂SO₄","KNO₃","K₂CO₃"],correctIndex:0,explanation:"Chloride."},
    {id:"chem-T7-015",question:"Not a base:",options:["NaOH","KOH","HCl","Ca(OH)₂"],correctIndex:2,explanation:"Acid."},
    {id:"chem-T7-016",question:"Alkali turns litmus:",options:["Red","Blue","No change","Green only"],correctIndex:1,explanation:"Base."},
    {id:"chem-T7-017",question:"A student adds a few drops of thymolphthalein to aqueous sodium hydroxide. What colour change is observed?",options:["Red to blue","Yellow to red","Colourless to blue","Violet to green"],correctIndex:2,explanation:"Thymolphthalein is colourless in acidic/neutral solutions and turns blue in alkaline solutions."},
    {id:"chem-T7-018",question:"A piece of lead is dropped into dilute sulfuric acid. Bubbles of hydrogen gas form briefly, then the reaction stops completely. Why?",options:["Lead is unreactive and below hydrogen in the reactivity series","An insoluble layer of lead(II) sulfate forms, coating the metal and preventing further reaction","The sulfuric acid evaporates","Lead neutralises the acid"],correctIndex:1,explanation:"Lead forms an insoluble layer of lead(II) sulfate ($PbSO_4$) which coats the metal surface, stopping the acid from reaching the unreacted metal underneath."},    
    {id:"chem-T7-019",question:"Acid rain pH:",options:[">7","<5.6 often","14","Always 7"],correctIndex:1,explanation:"Acidic deposition."},
    {id:"chem-T7-020",question:"Zn + CH₃COOH vs HCl same conc rate:",options:["Same","HCl faster (stronger)","Acetic faster","No Zn reaction"],correctIndex:1,explanation:"Higher [H⁺] in strong."},
    {id:"chem-T7-021",question:"Basic gas:",options:["HCl","NH₃","CO₂","SO₂"],correctIndex:1,explanation:"Ammonia."},
    {id:"chem-T7-022",question:"Titration strong acid-strong base endpoint pH:",options:["~7","~5","~9","~1"],correctIndex:0,explanation:"NaCl solution."},
    {id:"chem-T7-023",question:"Methyl orange in acid:",options:["Yellow","Red","Blue","Pink"],correctIndex:1,explanation:"Red acidic."},
    {id:"chem-T7-024",question:"Sulfuric acid formula:",options:["H₂SO₃","H₂SO₄","HSO₄","SO₂"],correctIndex:1,explanation:"Diprotic acid."},
    {id:"chem-T7-025",question:"Insoluble base + acid salt prep:",options:["Filter excess solid","Distil","Burn","Only titrate"],correctIndex:0,explanation:"Excess oxide/carbonate."},
    {id:"chem-T7-026",question:"Water acts as acid toward NH₃:",options:["Never","Donates H⁺ to NH₃","Only gas","Only solid"],correctIndex:1,explanation:"NH₄⁺ forms."},
    {id:"chem-T7-027",question:"A strong acid differs from a weak acid mainly in:",options:["Concentration only","Extent of ionisation in water","pH is always below 1","Presence of oxygen"],correctIndex:1,explanation:"Strength refers to the degree of dissociation (ionisation) in water, whereas concentration refers to how much solute is dissolved in a given volume."},
    {id:"chem-T7-028",question:"Which 0.1 M solution has the lowest pH?",options:["HCl","CH₃COOH","NH₃(aq)","NaCl(aq)"],correctIndex:0,explanation:"Strong acid is fully ionised → highest [H⁺]."},
    {id:"chem-T7-029",question:"Why is aqueous NH₄Cl slightly acidic?",options:["NH₄⁺ donates H⁺ to water (hydrolysis)","Cl⁻ is strongly acidic","NH₃ is a strong acid","Water has pH 0"],correctIndex:0,explanation:"The ammonium ion is the conjugate acid of a weak base."},
    {id:"chem-T7-030",question:"Adding water to a fixed amount of concentrated strong acid:",options:["Increases [H⁺]","Decreases [H⁺]","Does not change [H⁺]","Removes all H⁺"],correctIndex:1,explanation:"Dilution spreads the same moles of H⁺ over a larger volume."},
    {id:"chem-T7-031",question:"Which gas forms when a metal carbonate reacts with dilute acid?",options:["H₂","CO₂","Cl₂","NH₃"],correctIndex:1,explanation:"Carbonate + acid → salt + water + carbon dioxide."},
    {id:"chem-T7-032",question:"Methyl orange is a poor choice for weak acid–weak base titration because:",options:["It is always red","The endpoint is not sharp — pH jump is small","It only works in gas phase","It requires UV light"],correctIndex:1,explanation:"Indicators need a steep pH change at equivalence."},
    {id:"chem-T7-033",question:"Concentrated H₂SO₄ is a dehydrating agent because it:",options:["Adds water to esters","Strongly attracts water in many reactions","Is always pH 7","Contains OH⁻"],correctIndex:1,explanation:"It can remove water from species (e.g. sugar dehydration)."},
    
    
    {id:"chem-T7-036",question:"Why must nitric acid be handled in a fume cupboard when concentrated?",options:["It is non-toxic","It releases irritating acidic/oxidising fumes","It is odourless and inert","It is always a weak acid"],correctIndex:1,explanation:"Concentrated acids are corrosive and may release hazardous vapours."},
    {id:"chem-T7-201",question:"A basic oxide (e.g. CaO) is best described as:",options:["An oxide that reacts with acid to form salt and water only","An oxide that only reacts with bases","An oxide that does not react with water","An oxide that always dissolves to form pH 0"],correctIndex:0,explanation:"Basic oxides react with acids — typical textbook definition."},
    {id:"chem-T7-202",question:"An acidic oxide (e.g. SO₂) is best described as:",options:["An oxide that reacts with alkali to form a salt","An oxide that always reacts with metals to give H₂","An oxide that never dissolves in water","An oxide that always has pH 14"],correctIndex:0,explanation:"Acidic oxides react with bases/alkalis."},
    {id:"chem-T7-203",question:"Al₂O₃ is called amphoteric because it:",options:["Only reacts with acids","Only reacts with bases","Reacts with both acids and bases (under appropriate conditions)","Has no oxide character"],correctIndex:2,explanation:"Amphoteric = acid and base behaviour."},
    {id:"chem-T7-204",question:"Liming acidic soil with calcium carbonate works mainly because:",options:["CaCO₃ is a strong acid","CO₃²⁻ reacts to consume H⁺ and raise pH","It removes all nitrogen","It kills all plants"],correctIndex:1,explanation:"Neutralisation of soil acidity."},
    {id:"chem-T7-205",question:"The pH of a 0.01 mol/dm³ HCl(aq) solution is about:",options:["1","2","12","7"],correctIndex:1,explanation:"Strong acid fully ionised → [H⁺]=10⁻² → pH=2."},
    {id:"chem-T7-206",question:"Which statement about a 0.1 M CH₃COOH solution and 0.1 M HCl is most accurate?",options:["Both have the same pH","HCl has a lower pH (higher [H⁺])","CH₃COOH is always stronger","Strong acids always have pH 0"],correctIndex:1,explanation:"Strong acid fully ionised; weak acid partially ionised."},
    {id:"chem-T7-207",question:"When NH₃(g) dissolves in water, the solution is basic mainly because:",options:["NH₃ donates H⁺","NH₃ accepts H⁺ from water forming NH₄⁺ and OH⁻","NH₃ removes all OH⁻","Water becomes pH 0"],correctIndex:1,explanation:"Proton acceptor in water (Brønsted base)."},
    {id:"chem-T7-208",question:"A salt formed from a strong acid and a weak base (e.g. NH₄Cl) in aqueous solution is often:",options:["Strongly alkaline","Slightly acidic due to NH₄⁺ hydrolysis","Always pH 7","Strongly acidic like HCl"],correctIndex:1,explanation:"NH₄⁺ is acidic in water."},
    
    {id:"chem-T7-301",question:"Carbon monoxide (CO) is a neutral oxide. This means it:",options:["Reacts with both acids and alkalis","Does not react with acids or alkalis to form a salt","Dissolves in water to form a strong acid","Is the same as CO₂"],correctIndex:1,explanation:"Neutral oxides neither neutralise acids nor react with alkalis to form salts."},
    {id:"chem-T7-302",question:"When dilute H₂SO₄ is added to copper(II) carbonate powder, what gas is produced?",options:["H₂","SO₂","CO₂","O₂"],correctIndex:2,explanation:"Acid + carbonate → salt + water + carbon dioxide."},
    {id:"chem-T7-303",question:"Alkali + ammonium chloride solution, on warming, produces a gas that:",options:["Relights a glowing splint","Turns damp blue litmus red","Turns damp red litmus blue","Produces a white precipitate with water"],correctIndex:2,explanation:"NH₄⁺ + OH⁻ → NH₃(g) — ammonia turns damp red litmus blue."},
    {id:"chem-T7-304",question:"A student adds universal indicator to a solution and it turns orange. The pH is most likely:",options:["1–2","4–5","7","11–12"],correctIndex:1,explanation:"Orange on universal indicator indicates a mildly acidic solution around pH 4–5."},
    {id:"chem-T7-305",question:"What is the main difference between an alkali and a base?",options:["Alkalis have pH below 7","All alkalis are bases but not all bases are alkalis — alkalis are soluble in water","Bases react with metals to give H₂","Alkalis are always solids"],correctIndex:1,explanation:"A base that dissolves in water is called an alkali."},
    {id:"chem-T7-306",question:"SO₃ dissolves in water to form H₂SO₄. SO₃ is classified as:",options:["A neutral oxide","A basic oxide","An acidic oxide","An amphoteric oxide"],correctIndex:2,explanation:"Non-metal oxides that react with water/alkalis to form salts are acidic oxides."},
    {id:"chem-T7-307",question:"Acid rain has pH below 5.6 mainly because of dissolved:",options:["CO₂ only","SO₂ and NOₓ forming H₂SO₃/H₂SO₄ and HNO₃","N₂ only","O₂ only"],correctIndex:1,explanation:"Fossil fuel combustion releases S and N oxides that dissolve to form strong acid rain."},
    {id:"chem-T7-308",question:"CuO is a base but NOT an alkali because:",options:["It is an oxide of a metal","It does not dissolve in water to produce OH⁻(aq)","It produces H⁺ ions","It is a noble gas compound"],correctIndex:1,explanation:"Alkali: a base soluble in water. CuO is insoluble."},
    {id:"chem-T7-309",question:"Phosphoric acid H₃PO₄ reacts with NaOH to form Na₃PO₄. The mole ratio NaOH : H₃PO₄ is:",options:["1 : 1","2 : 1","3 : 1","1 : 3"],correctIndex:2,explanation:"H₃PO₄ is triprotic; 3 mol NaOH neutralise 1 mol H₃PO₄."},
    {id:"chem-T7-310",question:"Two acids of equal concentration: HCl (strong) and CH₃COOH (weak). Which has the higher pH?",options:["HCl — more [H⁺]","CH₃COOH — partially ionised so fewer [H⁺], higher pH","Same pH always","Depends on colour only"],correctIndex:1,explanation:"Weak acid is partially dissociated → lower [H⁺] → higher pH than same-conc strong acid."},
    {id:"chem-T7-311",question:"Al₂O₃ reacts with both HCl(aq) and NaOH(aq). This makes it:",options:["Acidic oxide","Neutral oxide","Basic oxide","Amphoteric oxide"],correctIndex:3,explanation:"Reacts with both acids and alkalis — amphoteric (Al³⁺ is borderline)."},
    {id:"chem-T7-312",question:"Which reaction represents an alkali dissolving in water correctly?",options:["NaOH(s) → Na⁺(aq) + OH⁻(aq)","HCl(aq) → H⁺(aq) + Cl⁻(aq)","CuO(s) + H₂O(l) → Cu(OH)₂(aq)","CO₂(g) + H₂O(l) → H₂CO₃(aq)"],correctIndex:0,explanation:"NaOH is soluble in water and releases OH⁻(aq) — the definition of an alkali."},
    {id:"chem-T7-313",question:"H₂SO₄ is called a diprotic acid because:",options:["It has two sulfur atoms","It can donate 2 moles of H⁺ per mole of acid in neutralisation","It reacts only twice","It has two oxygen atoms"],correctIndex:1,explanation:"Diprotic: H₂SO₄ → 2H⁺ + SO₄²⁻. So 1 mol H₂SO₄ neutralises 2 mol NaOH."},
    {id:"chem-T7-314",question:"A student adds excess zinc oxide to dilute sulfuric acid and filters. The filtrate contains:",options:["H₂SO₄ and ZnO","ZnSO₄ only (excess ZnO removed by filtration)","Only water","H₂SO₄ and ZnSO₄"],correctIndex:1,explanation:"Excess ZnO ensures all acid is neutralised. Filter removes unreacted ZnO. Pure ZnSO₄ solution remains."}
    ],
    extendedQuestions: [
        {
            id: "chem-T7-E01",
            commandWord: "Explain",
            marks: 5,
            syllabusNote: "Acids and Bases - Soil pH and fertilizer interactions.",
            prompt: "A farmer finds that his soil is too acidic for growing cabbages. To correct this, he adds slaked lime (calcium hydroxide) to the soil. A few days later, he adds a nitrogen-rich fertilizer containing ammonium nitrate ($NH_4NO_3$).\n\n(a) Explain how slaked lime helps to control soil acidity. Include an ionic equation in your answer.\n(b) Explain why adding ammonium nitrate shortly after adding slaked lime is a bad farming practice.",
            rubric: [
                "States that slaked lime is a **base/alkali** and neutralises the acids in the soil.",
                "Provides the ionic equation: **$H^+ (aq) + OH^- (aq) \\rightarrow H_2O(l)$**.",
                "States that calcium hydroxide reacts with ammonium nitrate to produce **ammonia gas**.",
                "Explains that ammonia gas **escapes into the atmosphere**.",
                "Concludes that the soil **loses its nitrogen content**, making the fertilizer ineffective."
            ],
            modelAnswer: "(a) Slaked lime is a base. It dissolves slightly in the soil moisture to release hydroxide ions ($OH^-$), which neutralise the excess hydrogen ions ($H^+$) from the acids in the soil, raising the pH. The ionic equation is: $H^+ (aq) + OH^- (aq) \\rightarrow H_2O(l)$.\n\n(b) Calcium hydroxide is an alkali that reacts with ammonium salts like ammonium nitrate. This reaction produces **ammonia gas** ($Ca(OH)_2 + 2NH_4NO_3 \\rightarrow Ca(NO_3)_2 + 2H_2O + 2NH_3$). Because ammonia is a gas, it escapes into the atmosphere. This causes the soil to **lose its nitrogen content**, rendering the expensive fertilizer useless for plant growth."
        },
        {
            id: "chem-T7-E02",
            commandWord: "Analyse",
            marks: 6,
            syllabusNote: "Acids and Bases - Interpreting a titration pH curve.",
            prompt: "In an experiment, 2.0 mol/dm³ of nitric acid (HNO₃) was added from a burette to a conical flask containing 25.0 cm³ of aqueous sodium hydroxide (NaOH) until excess acid was added. A pH sensor continuously recorded the pH, showing it started at pH 14, dropped sharply to pH 7 at 12.5 cm³ of acid added, and eventually flattened out at pH 1.\n\n(a) Write the balanced chemical equation and the net ionic equation for the neutralisation reaction taking place.\n(b) Explain the sharp drop in pH at exactly 12.5 cm³.\n(c) Use the data provided to calculate the concentration of the original sodium hydroxide solution in mol/dm³.",
            rubric: [
                "(a) Chemical: **NaOH(aq) + HNO₃(aq) ➔ NaNO₃(aq) + H₂O(l)**.",
                "(a) Ionic: **H⁺(aq) + OH⁻(aq) ➔ H₂O(l)**.",
                "(b) At 12.5 cm³, complete neutralisation occurs (the endpoint).",
                "(b) One extra drop of acid drastically increases the H⁺ concentration because there are no more OH⁻ ions left to neutralise it.",
                "(c) Moles of HNO₃ used = 2.0 × (12.5 ÷ 1000) = **0.025 mol**.",
                "(c) Moles of NaOH = 0.025 mol (1:1 ratio). Concentration of NaOH = 0.025 ÷ (25.0 ÷ 1000) = **1.0 mol/dm³**."
            ],
            modelAnswer: "(a) Chemical equation: NaOH(aq) + HNO₃(aq) ➔ NaNO₃(aq) + H₂O(l)\nNet ionic equation: H⁺(aq) + OH⁻(aq) ➔ H₂O(l)\n\n(b) At exactly 12.5 cm³, complete neutralisation has been achieved, meaning all the OH⁻ ions from the alkali have reacted with the H⁺ ions from the acid. Adding just one more drop of nitric acid introduces a large excess of free H⁺ ions into the neutral solution, causing the pH to drop sharply from 7 to a highly acidic value.\n\n(c) Number of moles of HNO₃ at neutralisation = Concentration × Volume = 2.0 mol/dm³ × 0.0125 dm³ = 0.025 mol.\nFrom the equation, 1 mole of HNO₃ neutralises 1 mole of NaOH, so there were 0.025 mol of NaOH in the flask.\nConcentration of NaOH = Moles ÷ Volume = 0.025 mol ÷ 0.0250 dm³ = 1.0 mol/dm³."
        }
    ],
    trueFalse: [
    {statement:"All alkalis are soluble.",correct:false,explain:"Alkali = soluble base; many bases insoluble."},
    {statement:"pH is log scale; pH 3 has 10× [H⁺] of pH4.",correct:true,explain:"Log₁₀."},
    {statement:"Neutralisation is only acid + metal.",correct:false,explain:"Acid + base/alkali/carbonate."},
    {statement:"Concentrated sulfuric is dehydrating agent.",correct:true,explain:"Removes water."},
    {statement:"NH₄⁺ is acidic in solution.",correct:true,explain:"Hydrolysis."},
    {statement:"Every salt solution is pH 7.",correct:false,explain:"Hydrolysis of ions."},
    {statement:"Indicators are weak acids/bases.",correct:true,explain:"Partial dissociation."},
    {statement:"Strong acid always has lower pH than weak at same concentration.",correct:true,explain:"Higher [H⁺]."},
    {statement:"Metal below H in series still reacts with oxidising acids differently.",correct:true,explain:"Cu + conc HNO₃ context."},
    {statement:"Al₂O₃ is only basic.",correct:false,explain:"Amphoteric."},
    {statement:"Dilute HNO₃ + Cu produces H₂ gas.",correct:false,explain:"Nitric acid is oxidising; copper does not give 'simple H₂' like with HCl/H₂SO₄. Nitrogen oxides form instead (NO/NO₂ context)."}
    
    ],
    });
})();
