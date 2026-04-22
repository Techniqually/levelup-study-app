(function () {
  window.__registerTopic({
    id: "8",
    theme: "Theme 2: Chemical Reactions",
    title: "Salts",
    cheatBlocks: [
        {
            "title": "Preparation",
            "points": [
                "Soluble salt + insoluble base/carbonate: acid + excess solid, filter, crystallise.",
                "Acid+alkali both soluble: **titration** then evaporate.",
                "Insoluble salt: **precipitation** (mix ions)."
            ]
        },
        {
            "title": "Examples",
            "points": [
                "AgCl white ppt; BaSO₄ white.",
                "CuSO₄·5H₂O blue crystals hydrated."
            ]
        }
    ,
    {
        "title": "Solubility Rules (key)",
        "points": [
            "**ALL nitrates** are soluble.",
            "**ALL sodium, potassium, ammonium salts** are soluble.",
            "**Most chlorides** soluble — EXCEPT AgCl (white), PbCl₂ (white).",
            "**Most sulfates** soluble — EXCEPT BaSO₄ (white), PbSO₄ (white), CaSO₄ (slightly soluble).",
            "**Most carbonates** insoluble — EXCEPT Na₂CO₃, K₂CO₃, (NH₄)₂CO₃.",
            "**Most hydroxides** insoluble — EXCEPT NaOH, KOH, Ba(OH)₂; Ca(OH)₂ slightly soluble."
        ]
    }],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-03-salts.jpg", caption: "Salt preparation: acid + base and titration" } ],
    flashcards: [
        {
            "front": "Titration for?",
            "back": "Two soluble reactants."
        },
        {
            "front": "AgNO₃ + NaCl?",
            "back": "AgCl white ppt."
        },
        {
            "front": "Nitric + copper oxide?",
            "back": "Copper nitrate + water."
        },
        {
            "front": "Hydrated salt?",
            "back": "Contains water of crystallisation."
        },
        {
            "front": "Anhydrous copper sulfate?",
            "back": "White; turns blue with water."
        },
        {
            "front": "Pb(NO₃)₂ + KI?",
            "back": "Yellow PbI₂ ppt."
        },
        {
            "front": "Soluble group 1 salts?",
            "back": "Most nitrates, group 1 salts soluble."
        },
        {
            "front": "Filtration after reaction?",
            "back": "Remove excess insoluble reactant."
        },
        {
            "front": "Evaporate to point of crystallisation?",
            "back": "Then cool for crystals."
        },
        {
            "front": "Insoluble salt prep?",
            "back": "Double decomposition in solution."
        },
        {
            "front": "Zinc + H₂SO₄ excess Zn?",
            "back": "ZnSO₄ + H₂; filter Zn."
        },
        {
            "front": "Ammonium sulfate fertiliser?",
            "back": "From NH₃ + H₂SO₄."
        },
        {
            "front": "Fe + dilute HCl?",
            "back": "FeCl₂ + H₂"
        },
        {
            "front": "Test for sulfate?",
            "back": "Ba²⁺ acidified white ppt."
        }
    ,
    { "front": "Are all nitrates soluble?", "back": "**Yes — ALL nitrates are soluble** in water. Key rule!" },
    { "front": "Insoluble chlorides?", "back": "**AgCl** (white ppt); **PbCl₂** (white ppt, soluble in hot water)." },
    { "front": "Insoluble sulfates?", "back": "**BaSO₄** (white, insoluble in HCl — used as test); **PbSO₄** (white); CaSO₄ (slightly)." },
    { "front": "How to prepare BaSO₄?", "back": "**Precipitation**: mix BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) ppt. Filter, wash, dry." }],
    quiz: [
    {id:"chem-T8-001",question:"NaCl from HCl+NaOH:",options:["Excess CuO","Titration","Burn Na","AgCl only"],correctIndex:1,explanation:"Both soluble."},
    {id:"chem-T8-002",question:"AgCl from:",options:["Na+Cl heat","AgNO₃+NaCl aq","Ag+Cl₂ gas","Only solid"],correctIndex:1,explanation:"Precipitation."},
    {id:"chem-T8-003",question:"CuO + H₂SO₄ excess CuO:",options:["Filter then crystallise","Only filter gas","Distil Cu","No salt"],correctIndex:0,explanation:"Remove excess oxide."},
    {id:"chem-T8-004",question:"Insoluble CaCO₃ + HCl:",options:["CaCl₂ + CO₂ + H₂O","Ca only","Cl₂","No reaction"],correctIndex:0,explanation:"Carbonate+acid."},
    {id:"chem-T8-005",question:"Barium test for sulfate acidified to avoid:",options:["CO₃²⁻ interference","Na⁺","Colour","Heat"],correctIndex:0,explanation:"BaCO₃ also ppt."},
    {id:"chem-T8-006",question:"Hydrated salt formula dot means:",options:["Covalent only","Water in crystal","Gas","Charge"],correctIndex:1,explanation:"Water of crystallisation."},
    {id:"chem-T8-007",question:"Pb²⁺ + I⁻:",options:["Soluble","Yellow ppt","Gas","Blue"],correctIndex:1,explanation:"PbI₂."},
    {id:"chem-T8-008",question:"Soluble salt from insoluble carbonate:",options:["Add acid to excess carbonate","Only water","Electrolysis","Burn"],correctIndex:0,explanation:"Filter excess."},
    {id:"chem-T8-009",question:"Fe + H₂SO₄:",options:["Fe₂(SO₄)₃ + H₂","FeSO₄ + H₂","S only","No reaction"],correctIndex:1,explanation:"Iron(II) with dilute."},
    {id:"chem-T8-010",question:"NH₃ + H₂SO₄:",options:["(NH₄)₂SO₄","NH₄OH","N₂","H₂"],correctIndex:0,explanation:"Salt."},
    {id:"chem-T8-011",question:"Which pair gives soluble salt both ions Na+Cl:",options:["Precipitation","Evaporate titration product","Only fusion","Decant oil"],correctIndex:1,explanation:"Titration route."},
    {id:"chem-T8-012",question:"KNO₃ solubility vs temperature:",options:["Decreases","Increases strongly","Constant","Zero"],correctIndex:1,explanation:"Often crystallise on cooling."},
    {id:"chem-T8-013",question:"Washing crystals:",options:["With saturated solution of same salt","Distilled always full","Hot acid","Oil"],correctIndex:0,explanation:"Reduce loss."},
    {id:"chem-T8-014",question:"ZnCl₂ from Zn + HCl:",options:["Crystallise","Only gas collect","No product","Burn Zn"],correctIndex:0,explanation:"Evaporate."},
    {id:"chem-T8-015",question:"Silver sulfate solubility:",options:["Insoluble like AgCl","Soluble unlike AgCl","Gas","Only molten"],correctIndex:1,explanation:"AgCl insoluble."},
    {id:"chem-T8-016",question:"Mg + HNO₃ dilute may:",options:["Still complex","H₂ sometimes with very dilute Mg","Never react","Only NO₂ always"],correctIndex:1,explanation:"Syllabus: Mg+HCl typical."},
    {id:"chem-T8-017",question:"Salt hydrolysis Na₂CO₃ solution:",options:["Acidic","Basic","Always 7","Neutral"],correctIndex:1,explanation:"CO₃²⁻ hydrolysis."},
    {id:"chem-T8-018",question:"To prepare a pure, dry sample of insoluble lead(II) sulfate, which two solutions should be mixed?",options:["Lead(II) carbonate and sulfuric acid","Lead(II) nitrate and sodium sulfate","Lead metal and sulfuric acid","Lead(II) oxide and barium sulfate"],correctIndex:1,explanation:"To make an insoluble salt via precipitation, you MUST mix two SOLUBLE salts. Lead(II) nitrate and sodium sulfate are both soluble."},
    {id:"chem-T8-019",question:"After mixing two solutions to form an insoluble salt precipitate, what is the purpose of washing the residue with cold distilled water?",options:["To dissolve the precipitate","To remove unreacted soluble impurities from the surface of the crystals","To dry the salt","To increase the size of the crystals"],correctIndex:1,explanation:"Washing the residue removes the soluble spectator ions and leftover aqueous reactants clinging to the solid."},
    {id:"chem-T8-020",question: "Which of the following methods is NOT suitable for preparing a pure sample of copper(II) sulfate?",options: ["Reacting solid copper(II) oxide with dilute sulfuric acid","Reacting solid copper(II) carbonate with dilute sulfuric acid","Reacting copper metal with dilute sulfuric acid","They are all suitable methods"],correctIndex: 2,explanation: "Copper is an unreactive metal (below hydrogen in the reactivity series) and will not react with dilute sulfuric acid."},
    {id:"chem-T8-021",question:"Preservative NaCl:",options:["Osmosis bacteria","pH 14","Oxidises all","Only sweet"],correctIndex:0,explanation:"Food context."},
    {id:"chem-T8-022",question:"Epsom salt:",options:["MgSO₄·7H₂O","NaCl","CaCO₃","KNO₃"],correctIndex:0,explanation:"Hydrated sulfate."},
    {id:"chem-T8-023",question:"Fertiliser nitrate benefit:",options:["N for protein","Only P","Only K","Cl only"],correctIndex:0,explanation:"N source."},
    {id:"chem-T8-024",question:"Chloride test acidified AgNO₃:",options:["White AgCl","Black","Red","Gas"],correctIndex:0,explanation:"Except AgBr/I."},
    {id:"chem-T8-025",question:"Sulfite + acid:",options:["SO₂ gas","CO₂ only","H₂","No gas"],correctIndex:0,explanation:"Acidified sulfite."},
    {id:"chem-T8-026",question:"Which salt is insoluble in water?",options:["Sodium nitrate","Potassium sulfate","Silver chloride","Ammonium carbonate"],correctIndex:2,explanation:"Most chlorides are soluble, with the notable exceptions of silver chloride and lead(II) chloride."},
    {id:"chem-T8-027",question:"Why acidify with dilute HNO₃ before adding AgNO₃ for halide tests?",options:["To make AgCl soluble","To remove carbonate/sulfite that could give false white precipitates","To oxidise all metals","To raise pH"],correctIndex:1,explanation:"Carbonates also give white precipitates with Ag⁺ — acid decomposes them."},
    {id:"chem-T8-028",question:"Preparing CuSO₄ from CuO + H₂SO₄, why use excess CuO?",options:["To speed light","To ensure all acid reacts so filtrate is not acidic","To make gas","To dissolve CuO less"],correctIndex:1,explanation:"Filter off excess base; solution contains only salt."},
    {id:"chem-T8-029",question:"Which salt is best prepared by titration of acid with alkali?",options:["CuSO₄ from CuO","NaCl from HCl + NaOH","AgCl from precipitation","BaSO₄ from mixing solutions"],correctIndex:1,explanation:"Both reactants soluble → known endpoint via titration."},
    {id:"chem-T8-030",question:"Heating hydrated CuSO₄·5H₂O strongly turns it white mainly because:",options:["It melts only","Water of crystallisation is lost","Copper oxidises to Cu²⁺","It becomes metallic"],correctIndex:1,explanation:"Dehydration to anhydrous CuSO₄."},
    
    {id:"chem-T8-032",question:"Why is Ba(NO₃)₂ used instead of BaCl₂ when chloride interferes?",options:["Ba(NO₃)₂ never works","Avoid introducing Cl⁻ if testing for sulfate in a chloride matrix","BaCl₂ is insoluble","Nitrates are always acidic"],correctIndex:1,explanation:"Choose reagents that don’t add confusing ions."},
    {id:"chem-T8-033",question:"Fe(s) + dilute H₂SO₄ typically gives:",options:["Fe₂(SO₄)₃ + H₂","FeSO₄ + H₂","FeS + H₂","No reaction"],correctIndex:1,explanation:"Iron(II) sulfate with hydrogen (dilute acid)."},
    {id:"chem-T8-034",question:"Which ion with I⁻(aq) forms a yellow precipitate in a common school test?",options:["Pb²⁺","Na⁺","Ba²⁺","K⁺"],correctIndex:0,explanation:"Pb²⁺ + 2I⁻ → PbI₂(s) yellow."},
    {id:"chem-T8-035",question:"Washing filtered crystals with lots of distilled water can reduce yield because:",options:["Water is always pH 0","Some product still dissolves","Crystals become covalent","Filtration speeds up reaction"],correctIndex:1,explanation:"Even sparingly soluble salts lose mass if washed excessively."},
    {id:"chem-T8-036",question:"Epsom salt (MgSO₄·7H₂O) shows:",options:["No water in lattice","Water of crystallisation","Only covalent network","Gas hydrate only"],correctIndex:1,explanation:"The dot shows hydrated formula units."},
    {id:"chem-T8-037",question:"Why might evaporating a nitrate salt to complete dryness be risky?",options:["It always explodes at room temperature","Thermal decomposition can occur — controlled evaporation","Nitrates never decompose","Water never leaves"],correctIndex:1,explanation:"Heating nitrates may decompose; often stop at crystallisation point."},
    {id:"chem-T8-201",question:"Soluble salt from insoluble carbonate + acid: excess solid carbonate is used so that:",options:["The reaction is faster only","All acid is neutralised and excess carbonate can be filtered off","The salt is insoluble","CO₂ is not produced"],correctIndex:1,explanation:"Ensures no leftover acid in filtrate."},
    {id:"chem-T8-202",question:"Which statement about NaNO₃(aq) is correct?",options:["It is insoluble","It is highly soluble (common rule)","It always gives pH 2","It contains no ions"],correctIndex:1,explanation:"All common nitrates are soluble."},
    {id:"chem-T8-203",question:"A student mixes solutions of NaCl and AgNO₃. The white precipitate is:",options:["NaNO₃","AgCl","NaCl","Ag"],correctIndex:1,explanation:"Ag⁺ + Cl⁻ → AgCl(s)."},
    {id:"chem-T8-204",question:"Heating hydrated CuSO₄·5H₂O to constant mass until white is mainly:",options:["Oxidation of Cu²⁺","Loss of water of crystallisation","Reduction to copper metal","Formation of Cu(OH)₂ only"],correctIndex:1,explanation:"Anhydrous white CuSO₄ after dehydration."},
    {id:"chem-T8-205",question:"Why is Na₂SO₄(aq) + BaCl₂(aq) a good test for sulfate ions?",options:["BaSO₄ is soluble and blue","BaSO₄ is a white insoluble precipitate","BaCl₂ is a gas","Na₂SO₄ is coloured"],correctIndex:1,explanation:"Ba²⁺ + SO₄²⁻ → BaSO₄(s)."},
    {id:"chem-T8-206",question:"A solution of Na₂CO₃ is slightly basic because:",options:["Na⁺ is acidic","CO₃²⁻ hydrolyses to produce OH⁻","Water has no role","Na₂CO₃ is a strong acid"],correctIndex:1,explanation:"Carbonate is basic in water."},
    {id:"chem-T8-207",question:"When preparing a soluble salt from an acid and an insoluble base, excess base is used so that:",options:["The acid is in excess","No acid remains in the filtrate after filtration","The base dissolves completely","The salt is always insoluble"],correctIndex:1,explanation:"Filter off excess solid base."},
    {id:"chem-T8-208",question:"Which ion with NaOH(aq) gives a green precipitate typical of Fe²⁺?",options:["Fe³⁺","Fe²⁺","Cu²⁺","Na⁺"],correctIndex:1,explanation:"Fe(OH)₂ is green (may oxidise on standing)."},
    
    {id:"chem-T8-301",question:"To prepare magnesium sulfate (MgSO₄) in the lab, a student adds excess magnesium oxide to dilute H₂SO₄. Why is excess MgO used?",options:["To speed up the reaction only","To ensure all the acid reacts so the final solution contains only the salt","To make the solution more acidic","To produce more H₂ gas"],correctIndex:1,explanation:"Excess insoluble base consumes all the acid; excess is filtered off leaving pure salt solution."},
    {id:"chem-T8-302",question:"Which of the following salts can only be made by a precipitation reaction (not acid + metal/base/carbonate)?",options:["MgSO₄","NaCl from HCl + NaOH","BaSO₄","ZnCl₂"],correctIndex:2,explanation:"BaSO₄ is insoluble — it cannot be made by titration and is obtained by mixing Ba²⁺ and SO₄²⁻ solutions."},
    {id:"chem-T8-303",question:"In preparing copper(II) sulfate by adding CuO to H₂SO₄, after filtering the excess CuO, the next step to obtain crystals is:",options:["Add more acid","Evaporate the filtrate until saturated then cool","Heat to full dryness immediately","Add NaOH"],correctIndex:1,explanation:"Evaporate to crystallisation point then cool — avoids decomposition of the salt."},
    {id:"chem-T8-304",question:"Which of the following is a correct solubility rule?",options:["All carbonates are soluble","All sulfates are insoluble","All nitrates are soluble","All chlorides are insoluble"],correctIndex:2,explanation:"All common nitrates (including Pb(NO₃)₂ and AgNO₃) are soluble in water."},
    {id:"chem-T8-305",question:"When Na₂CO₃(aq) is mixed with CaCl₂(aq), a white precipitate forms. This is an example of:",options:["Thermal decomposition","A displacement reaction","A precipitation reaction forming insoluble CaCO₃","Electrolysis"],correctIndex:2,explanation:"Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(s) — double decomposition gives an insoluble salt."},
    {id:"chem-T8-306",question:"To obtain pure, dry crystals of CuSO₄ from excess CuO + H₂SO₄, which step comes AFTER filtration?",options:["Add more acid","Evaporate filtrate then cool to crystallise","Electrolyse","Add NaOH"],correctIndex:1,explanation:"Heat solution to concentrate → cool → crystals form → filter and dry."},
    {id:"chem-T8-307",question:"In the preparation of BaSO₄ by mixing BaCl₂(aq) + Na₂SO₄(aq), the method is precipitation because:",options:["Both reactants are soluble but the product is insoluble","Heat is required","Only acids work","BaSO₄ is very soluble"],correctIndex:0,explanation:"Mixing two soluble salts produces an insoluble precipitate — precipitation route."},
    {id:"chem-T8-308",question:"Washing a precipitate on filter paper with cold distilled water removes:",options:["The desired precipitate","Soluble impurities (from the original solution) that cling to the solid","Colour only","The filter paper itself"],correctIndex:1,explanation:"Soluble by-products are washed away; the precipitate stays."},
    {id:"chem-T8-309",question:"To make sodium chloride NaCl by titration, the correct method is:",options:["Add excess NaOH to HCl and evaporate","Use an indicator — find exact volume of acid to neutralise alkali, then repeat without indicator and evaporate","Electrolyse brine","Dissolve Na in HCl"],correctIndex:1,explanation:"Titration gives the exact volume; omit indicator for the final pure product, then evaporate."},
    {id:"chem-T8-310",question:"Which salt is insoluble in water?",options:["Sodium nitrate NaNO₃","Potassium chloride KCl","Barium sulfate BaSO₄","Ammonium sulfate (NH₄)₂SO₄"],correctIndex:2,explanation:"BaSO₄ is insoluble; most nitrates and potassium/sodium salts are soluble."},
    {id:"chem-T8-311",question:"Lead(II) chloride PbCl₂ is insoluble. To prepare it, a student mixes:",options:["Pb(NO₃)₂(aq) + NaCl(aq) → PbCl₂(s) precipitate by precipitation","Pb metal + HCl — impractical for pure product","Dissolving PbCl₂ in water directly","Electrolysing PbSO₄"],correctIndex:0,explanation:"Precipitation: mix solutions of Pb²⁺ and Cl⁻ salts. PbCl₂ is insoluble → forms precipitate. Filter, wash, dry."},
    {id:"chem-T8-312",question:"Which statement about the solubility of salts is correct?",options:["All potassium salts are insoluble","All nitrate salts are soluble in water","All sodium salts are insoluble","All carbonate salts are soluble"],correctIndex:1,explanation:"Key rule: ALL nitrates are soluble. Most Group 1 (Na, K) salts are soluble. Most carbonates (except Na, K, NH₄) are insoluble."}
    ],
    extendedQuestions: [
        {
            id: "chem-T8-E01",
            commandWord: "Construct",
            marks: 6,
            syllabusNote: "Salts - Preparing an insoluble salt via precipitation.",
            prompt: "Barium sulfate ($BaSO_4$) is an insoluble salt used in hospitals as a 'barium meal' for X-rays. \n\n(a) Name two suitable aqueous solutions that can be mixed to prepare a pure sample of barium sulfate.\n(b) Describe the step-by-step procedure to prepare, separate, and obtain a pure, dry sample of barium sulfate from your chosen solutions. Include an ionic equation with state symbols.",
            rubric: [
                "(a) Names a soluble barium salt (e.g., **barium chloride** or barium nitrate) AND a soluble sulfate (e.g., **sodium sulfate** or sulfuric acid).",
                "(b) Step 1: **Mix** the two solutions together to form a white precipitate.",
                "(b) Step 2: **Filter** the mixture to collect the barium sulfate precipitate as the residue.",
                "(b) Step 3: **Wash** the residue with cold distilled water to remove any soluble impurities.",
                "(b) Step 4: **Dry** the precipitate between a few sheets of filter paper.",
                "(b) Equation: **$Ba^{2+}(aq) + SO_4^{2-}(aq) \\rightarrow BaSO_4(s)$**"
            ],
            modelAnswer: "(a) Aqueous **barium chloride** and aqueous **sodium sulfate**.\n\n(b) First, **mix** the solutions of barium chloride and sodium sulfate in a beaker. A white precipitate of barium sulfate will form immediately. \nSecond, **filter** the mixture using a filter funnel and filter paper; the barium sulfate will be collected as the solid residue. \nThird, **wash** the residue with cold distilled water to remove any soluble impurities (like sodium chloride). \nFinally, **dry** the pure barium sulfate precipitate by pressing it between a few sheets of filter paper.\n\nIonic equation: $Ba^{2+}(aq) + SO_4^{2-}(aq) \\rightarrow BaSO_4(s)$"
        },
        {
            id: "chem-T8-E02",
            commandWord: "Construct",
            marks: 4,
            syllabusNote: "Salts - Sequencing the preparation of a soluble salt from an insoluble solid.",
            prompt: "Andrew was preparing copper(II) sulfate crystals using copper(II) carbonate and dilute sulfuric acid. Below are his steps, but they are written in the wrong order:\n\n**U** - Filter the mixture into an evaporating dish.\n**V** - Heat the filtrate until a saturated solution is obtained.\n**W** - Filter, wash, and dry the crystals between a few sheets of filter paper.\n**X** - Leave the hot saturated solution to cool until crystals are formed.\n**Y** - Place 25 cm³ of dilute sulfuric acid in a beaker.\n**Z** - Add copper(II) carbonate powder with constant stirring, until no more dissolves.\n\n(a) Write down the correct chronological order of the letters to successfully prepare the salt.\n(b) Explain why step Z is a crucial safety and purity precaution in this method.",
            rubric: [
                "(a) Correct order: **Y ➔ Z ➔ U ➔ V ➔ X ➔ W**.",
                "(b) Adding the solid until no more dissolves ensures that **all the sulfuric acid has reacted**.",
                "(b) This guarantees the final filtrate is not contaminated with unreacted acid."
            ],
            modelAnswer: "(a) The correct sequence is: Y, Z, U, V, X, W.\n\n(b) Step Z (adding the copper(II) carbonate until it is in excess) is crucial because it ensures that all of the dilute sulfuric acid is completely neutralised. If acid were left over, it would remain in the filtrate alongside the dissolved copper(II) sulfate, resulting in impure crystals and a potentially hazardous (corrosive) final product."
        }
    ],
    trueFalse: [
    {statement:"All nitrates are soluble.",correct:true,explain:"General rule."},
    {statement:"All silver salts are insoluble.",correct:false,explain:"AgNO₃ soluble."},
    {statement:"Titration indicator chosen to change at steep pH jump.",correct:true,explain:"Endpoint near equivalence."},
    {statement:"Heating CuSO₄·5H₂O strongly gives white anhydrous.",correct:true,explain:"Water driven off."},
    {statement:"BaSO₄ is safe as X-ray contrast (insoluble).",correct:true,explain:"Medical context."},
    {statement:"Pb²⁺ salts are often toxic.",correct:true,explain:"Heavy metal."},
    {statement:"Filtrate is always pure product.",correct:false,explain:"May need crystallisation."},
    {statement:"Mixed two solutions always gives ppt.",correct:false,explain:"Need insoluble product."},
    {statement:"Ammonium salts all soluble.",correct:true,explain:"General pattern."},
    {statement:"Fe³⁺ + OH⁻ brown ppt.",correct:true,explain:"Fe(OH)₃."},
    {statement:"Carbonate + acid always produces CO₂.",correct:true,explain:"With acid protonation."},
    {statement:"Evaporating to dryness may decompose nitrates.",correct:true,explain:"Heat carefully."}
    ],
    orderGame: ["Weigh acid/alkali","Add indicator","Titrate to endpoint","Repeat for concordant titre","Calculate known concentration","Evaporate to crystallise"],
    orderTitle: "Soluble salt via titration",
    });
})();
