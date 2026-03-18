(function () {
  window.__registerTopic({
    id: "10",
    theme: "Theme 2: Chemical Reactions",
    title: "Qualitative Analysis",
    cheatBlocks: [
        {
            "title": "Cations",
            "points": [
                "NaOH: Cu²⁺ blue ppt; Fe²⁺ green; Fe³⁺ brown; Al³⁺/Zn²⁺ white soluble in excess NaOH.",
                "Flame: Na yellow; K lilac (cobalt glass); Cu green-blue."
            ]
        },
        {
            "title": "Anions",
            "points": [
                "CO₃²⁻ + acid → CO₂ limewater milky.",
                "Cl⁻ + AgNO₃ → white AgCl (insoluble in dil HNO₃).",
                "SO₄²⁻ + Ba²⁺ → white BaSO₄."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-05-qualitative-analysis.jpg", caption: "Flame colours and precipitate tests" } ],
    flashcards: [
        {
            "front": "Carbonate test?",
            "back": "Acid → CO₂, limewater."
        },
        {
            "front": "AgBr colour?",
            "back": "Cream ppt."
        },
        {
            "front": "AgI?",
            "back": "Yellow."
        },
        {
            "front": "NH₄⁺ test?",
            "back": "NaOH heat, NH₃."
        },
        {
            "front": "Acidify before AgNO₃ nitrate test why?",
            "back": "Remove CO₃²⁻ interference."
        },
        {
            "front": "Fe³⁺ SCN⁻ blood red?",
            "back": "Complex (A-level)."
        },
        {
            "front": "Ca²⁺ flame?",
            "back": "Brick red-orange."
        },
        {
            "front": "Li flame?",
            "back": "Crimson."
        },
        {
            "front": "Sulfite + acid?",
            "back": "SO₂ — reduces dichromate."
        },
        {
            "front": "Nitrate brown ring test?",
            "back": "Historical wet test."
        },
        {
            "front": "Phosphate + ammonium molybdate?",
            "back": "Yellow ppt (adv)."
        },
        {
            "front": "Starch iodine?",
            "back": "Blue-black."
        },
        {
            "front": "Pb²⁺ + Cl⁻ hot?",
            "back": "Soluble cold white ppt."
        },
        {
            "front": "Chromate CrO₄²⁻ colour?",
            "back": "Yellow."
        }
    ],
    quiz: [
    {question:"CO₂ test:",options:["Relights splint","Limewater milky","White ppt AgNO₃","Blue litmus"],correctIndex:1,explanation:"Carbonate/acid."},
    {question:"Cl⁻ with AgNO₃:",options:["Black","White","Yellow","Red"],correctIndex:1,explanation:"AgCl."},
    {question:"AgCl in dil NH₃:",options:["Dissolves","Insoluble","Explodes","Yellow"],correctIndex:0,explanation:"Complex [Ag(NH₃)₂]⁺."},
    {question:"Ba²⁺ for sulfate:",options:["Soluble ppt","White BaSO₄","Gas","Blue"],correctIndex:1,explanation:"Insoluble."},
    {question:"Cu²⁺ + NaOH:",options:["Green","Blue ppt","Brown","No ppt"],correctIndex:1,explanation:"Cu(OH)₂."},
    {question:"Fe²⁺ + NaOH air:",options:["Stays green only","Turns brown surface","Dissolves","Gas"],correctIndex:1,explanation:"Oxidises to Fe(III)."},
    {question:"Al³⁺ + excess NaOH:",options:["Ppt stays","Dissolves","Red","Black"],correctIndex:1,explanation:"Amphoteric."},
    {question:"Zn²⁺ + excess NaOH:",options:["Insoluble","Dissolves","Only gas","Blue"],correctIndex:1,explanation:"Zincate."},
    {question:"K⁺ flame through cobalt glass:",options:["Yellow","Lilac","Green","Red"],correctIndex:1,explanation:"Mask Na yellow."},
    {question:"Na⁺ flame:",options:["Lilac","Yellow","Green","Blue"],correctIndex:1,explanation:"Intense yellow."},
    {question:"NH₄⁺ without NaOH heat:",options:["Always NH₃","Need OH⁻ heat","Only blue","Cl₂"],correctIndex:1,explanation:"Liberate gas."},
    {question:"Sulfate test acidify Ba²⁺:",options:["Avoid CO₃ ppt","No reason","Colour","Speed"],correctIndex:0,explanation:"BaCO₃ also white."},
    {question:"I⁻ + Ag⁺:",options:["White","Cream","Yellow","Clear"],correctIndex:2,explanation:"AgI."},
    {question:"Br⁻ + Ag⁺:",options:["White","Cream","Yellow","Black"],correctIndex:1,explanation:"AgBr."},
    {question:"Pb²⁺ toxic:",options:["Heavy metal","Nutrient","Noble gas","Halogen"],correctIndex:0,explanation:"Poison."},
    {question:"Gas turns acidified K₂Cr₂O₇ green:",options:["CO₂ only","SO₂ reducing","N₂","O₂"],correctIndex:1,explanation:"Reducing gas."},
    {question:"HCO₃⁻ + acid:",options:["Same CO₂ test as CO₃²⁻","No gas","Only H₂","Cl₂"],correctIndex:0,explanation:"Also CO₂."},
    {question:"Flame test wire clean:",options:["HCl dip heat","Only water","Oil","Sugar"],correctIndex:0,explanation:"Remove contamination."},
    {question:"MnO₄⁻ colour:",options:["Colourless","Purple","Yellow","Pink only"],correctIndex:1,explanation:"Permanganate."},
    {question:"Cu²⁺ concentrated solution colour:",options:["Blue","Green/yellow high Cl⁻","Always red","None"],correctIndex:0,explanation:"Aqua complex."},
    {question:"Ferricyanide test Fe²⁺ (adv):",options:["Turnbull's blue","Only gas","White","Silver"],correctIndex:0,explanation:"Qual scheme."},
    {question:"Nitrate reduction to NH₃ Devarda (context):",options:["Alloy reduces","Only heat","Only acid","Light"],correctIndex:0,explanation:"Old test."},
    {question:"Silver mirror Tollen aldehyde:",options:["Not cation test","Organic","Cl⁻","SO₄²⁻"],correctIndex:1,explanation:"Different test."},
    {question:"Gas relights glowing splint:",options:["CO₂","O₂","N₂","Cl₂"],correctIndex:1,explanation:"Oxygen test."},
    {question:"Pop test gas:",options:["O₂","H₂","CO₂","NH₃"],correctIndex:1,explanation:"Hydrogen."},
    {question:"Pb²⁺ + I⁻:",options:["White","Yellow ppt","Gas","Blue"],correctIndex:1,explanation:"PbI₂."}
    ],
    trueFalse: [
    {statement:"AgBr is more soluble than AgCl in water.",correct:true,explain:"Ksp larger."},
    {statement:"All metal hydroxides dissolve in excess NaOH.",correct:false,explain:"Only amphoteric."},
    {statement:"Flame test is definitive for anion.",correct:false,explain:"Cation."},
    {statement:"Dilute HNO₃ used with AgNO₃ to prevent unwanted ppt.",correct:true,explain:"Carbonate removal."},
    {statement:"BaSO₄ dissolves in dilute HCl.",correct:false,explain:"Insoluble."},
    {statement:"NH₃ from ammonium salt confirms NH₄⁺.",correct:true,explain:"Gas tests."},
    {statement:"Fe³⁺ and Fe²⁺ both give same colour NaOH initially.",correct:false,explain:"Green vs brownish."},
    {statement:"Copper carbonate green solid adds acid → CO₂.",correct:true,explain:"Carbonate."},
    {statement:"Silver nitrate stains skin brown.",correct:true,explain:"Photodecomposition."},
    {statement:"Sodium flame can mask potassium without cobalt glass.",correct:true,explain:"Yellow overlap."},
    {statement:"Chromate-dichromate pH equilibrium.",correct:true,explain:"Orange/yellow."},
    {statement:"Qualitative means identity not amount.",correct:true,explain:"vs quantitative."}
    ],
    });
})();
