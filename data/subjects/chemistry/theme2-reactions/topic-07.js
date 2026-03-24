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
            "front": "Conjugate pair?",
            "back": "Acid/base differ by H⁺."
        },
        {
            "front": "Dilution strong acid pH?",
            "back": "Rises toward 7."
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
            "front": "pH + pOH = 14 (25°C)?",
            "back": "In water Kw=10⁻¹⁴."
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
    ],
    quiz: [
    {question:"pH of 0.1 M NaOH strong:",options:["~1","~7","~13","~0"],correctIndex:2,explanation:"High OH⁻."},
    {question:"Mg + dil HCl:",options:["Cl₂","H₂","O₂","N₂"],correctIndex:1,explanation:"Metal+acid."},
    {question:"Na₂CO₃ + HCl:",options:["No gas","CO₂","SO₂","H₂"],correctIndex:1,explanation:"Carbonate+acid."},
    {question:"Which weak acid:",options:["HCl","CH₃COOH","H₂SO₄","HNO₃"],correctIndex:1,explanation:"Ethanoic."},
    {question:"Neutralisation products acid+NaOH:",options:["Salt+CO₂","Salt+H₂O","Only water","Cl₂"],correctIndex:1,explanation:"Classic."},
    {question:"NH₃ aqueous:",options:["Strong acid","Weak alkali","Strong alkali","Neutral"],correctIndex:1,explanation:"NH₄OH equilibrium."},
    {question:"Indicator phenolphthalein acid:",options:["Pink","Colourless","Yellow","Blue"],correctIndex:1,explanation:"Colourless in acid."},
    {question:"Proton donor (Brønsted) acid:",options:["Accepts H⁺","Donates H⁺","Donates e⁻","Accepts e⁻"],correctIndex:1,explanation:"Definition."},
    {question:"Metal oxide CuO + H₂SO₄:",options:["H₂","CuSO₄+H₂O","SO₂","No reaction"],correctIndex:1,explanation:"Basic oxide."},
    {question:"Diluting acid safely:",options:["Water to acid","Acid to water","Both fast","No water"],correctIndex:1,explanation:"Exothermic."},
    {question:"pH of pure water 25°C:",options:["0","7","14","1"],correctIndex:1,explanation:"Neutral."},
    {question:"Excess stomach acid treated with:",options:["Strong NaOH drink","Mild antacid","Conc HCl","Sugar"],correctIndex:1,explanation:"Weak base."},
    {question:"H⁺ concentration pH=2:",options:["0.01 M","0.1 M","1 M","0.001 M"],correctIndex:0,explanation:"10⁻²."},
    {question:"Salt from HCl + KOH:",options:["KCl","K₂SO₄","KNO₃","K₂CO₃"],correctIndex:0,explanation:"Chloride."},
    {question:"Not a base:",options:["NaOH","KOH","HCl","Ca(OH)₂"],correctIndex:2,explanation:"Acid."},
    {question:"Alkali turns litmus:",options:["Red","Blue","No change","Green only"],correctIndex:1,explanation:"Base."},
    {question:"Conjugate base of H₂SO₄ (first step):",options:["HSO₄⁻","SO₄²⁻","H₃O⁺","OH⁻"],correctIndex:0,explanation:"Lost one H⁺."},
    {question:"Buffer (simple):",options:["Weak acid + conjugate salt","Strong only","Only NaCl","Only water"],correctIndex:0,explanation:"Resists pH change."},
    {question:"Acid rain pH:",options:[">7","<5.6 often","14","Always 7"],correctIndex:1,explanation:"Acidic deposition."},
    {question:"Zn + CH₃COOH vs HCl same conc rate:",options:["Same","HCl faster (stronger)","Acetic faster","No Zn reaction"],correctIndex:1,explanation:"Higher [H⁺] in strong."},
    {question:"Basic gas:",options:["HCl","NH₃","CO₂","SO₂"],correctIndex:1,explanation:"Ammonia."},
    {question:"Titration strong acid-strong base endpoint pH:",options:["~7","~5","~9","~1"],correctIndex:0,explanation:"NaCl solution."},
    {question:"Methyl orange in acid:",options:["Yellow","Red","Blue","Pink"],correctIndex:1,explanation:"Red acidic."},
    {question:"Sulfuric acid formula:",options:["H₂SO₃","H₂SO₄","HSO₄","SO₂"],correctIndex:1,explanation:"Diprotic acid."},
    {question:"Insoluble base + acid salt prep:",options:["Filter excess solid","Distil","Burn","Only titrate"],correctIndex:0,explanation:"Excess oxide/carbonate."},
    {question:"Water acts as acid toward NH₃:",options:["Never","Donates H⁺ to NH₃","Only gas","Only solid"],correctIndex:1,explanation:"NH₄⁺ forms."},
    {question:"A buffer resists pH change mainly because:",options:["It has pH 7 always","It contains a conjugate acid–base pair that can consume added H⁺ or OH⁻","It removes all ions","It stops water autoionisation"],correctIndex:1,explanation:"Equilibrium shifts absorb small additions of acid or base."},
    {question:"Which 0.1 M solution has the lowest pH?",options:["HCl","CH₃COOH","NH₃(aq)","NaCl(aq)"],correctIndex:0,explanation:"Strong acid is fully ionised → highest [H⁺]."},
    {question:"Why is aqueous NH₄Cl slightly acidic?",options:["NH₄⁺ donates H⁺ to water (hydrolysis)","Cl⁻ is strongly acidic","NH₃ is a strong acid","Water has pH 0"],correctIndex:0,explanation:"The ammonium ion is the conjugate acid of a weak base."},
    {question:"Adding water to a fixed amount of concentrated strong acid:",options:["Increases [H⁺]","Decreases [H⁺]","Does not change [H⁺]","Removes all H⁺"],correctIndex:1,explanation:"Dilution spreads the same moles of H⁺ over a larger volume."},
    {question:"Which gas forms when a metal carbonate reacts with dilute acid?",options:["H₂","CO₂","Cl₂","NH₃"],correctIndex:1,explanation:"Carbonate + acid → salt + water + carbon dioxide."},
    {question:"Methyl orange is a poor choice for weak acid–weak base titration because:",options:["It is always red","The endpoint is not sharp — pH jump is small","It only works in gas phase","It requires UV light"],correctIndex:1,explanation:"Indicators need a steep pH change at equivalence."},
    {question:"Concentrated H₂SO₄ is a dehydrating agent because it:",options:["Adds water to esters","Strongly attracts water in many reactions","Is always pH 7","Contains OH⁻"],correctIndex:1,explanation:"It can remove water from species (e.g. sugar dehydration)."},
    {question:"Which is the conjugate base of HCO₃⁻?",options:["CO₂","CO₃²⁻","H₂CO₃","OH⁻"],correctIndex:1,explanation:"Remove one H⁺ from HCO₃⁻ → CO₃²⁻."},
    {question:"At 25 °C, if [H⁺] = 1×10⁻⁵ mol/dm³, [OH⁻] is about:",options:["1×10⁻⁹","1×10⁻⁵","1×10⁻¹⁴","1×10⁵"],correctIndex:0,explanation:"Kw ≈ 10⁻¹⁴ → [OH⁻]=Kw/[H⁺]=10⁻⁹."},
    {question:"Why must nitric acid be handled in a fume cupboard when concentrated?",options:["It is non-toxic","It releases irritating acidic/oxidising fumes","It is odourless and inert","It is always a weak acid"],correctIndex:1,explanation:"Concentrated acids are corrosive and may release hazardous vapours."}
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
    {statement:"Dilute HNO₃ + Cu produces H₂ gas.",correct:false,explain:"Nitric acid is oxidising; copper does not give 'simple H₂' like with HCl/H₂SO₄. Nitrogen oxides form instead (NO/NO₂ context)."},
    {statement:"Kw increases with temperature.",correct:true,explain:"Endothermic ionisation of water."}
    ],
    });
})();
