(function () {
  window.__registerTopic({
    id: "14",
    theme: "Theme 2: Chemical Reactions",
    title: "Reactivity Series of Metals",
    cheatBlocks: [
        {
            "title": "Series",
            "points": [
                "K Na Ca Mg Al (C) Zn Fe Pb (H) Cu Ag Au — learn pattern.",
                "Metal above displaces ions of metal below from aqueous solution.",
                "Above H: H₂ from dilute acids (with caveats for passivation)."
            ]
        },
        {
            "title": "Uses",
            "points": [
                "Extraction: C reduces ZnO etc.; very reactive → electrolysis.",
                "Sacrificial protection; thermite (Al + Fe₂O₃)."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-09-reactivity-series.jpg", caption: "Reactivity series and displacement" } ],
    flashcards: [
        {
            "front": "Fe + CuSO₄?",
            "back": "FeSO₄ + Cu."
        },
        {
            "front": "Cu + ZnSO₄?",
            "back": "No reaction."
        },
        {
            "front": "K with water?",
            "back": "Violent H₂ + strong alkali."
        },
        {
            "front": "Carbon reduces?",
            "back": "Oxides of Zn and below in blast furnace context."
        },
        {
            "front": "Gold occurrence?",
            "back": "Native (unreacted)."
        },
        {
            "front": "Iron rust?",
            "back": "Hydrated Fe(III) oxide."
        },
        {
            "front": "Galvanising?",
            "back": "Zn coat on steel."
        },
        {
            "front": "Stainless steel?",
            "back": "Cr/Ni alloy corrosion resistant."
        },
        {
            "front": "Sn + Fe²⁺?",
            "back": "Sn less reactive than Fe? Sn below Fe — no displacement of Fe²⁺ by Sn... Sn above Fe? Actually Sn above Fe in some tables — check: Fe more reactive than Sn in many UK series — Fe above Sn. So Sn cannot displace Fe²⁺. Fe displaces Sn²⁺."
        },
        {
            "front": "Hydrogen reference?",
            "back": "Metals above H displace H₂ from dilute acid."
        },
        {
            "front": "Thermite use?",
            "back": "Weld rails; molten Fe."
        },
        {
            "front": "Blast furnace reducing agent?",
            "back": "C/CO."
        },
        {
            "front": "Native copper?",
            "back": "Sometimes found uncombined."
        },
        {
            "front": "Silver tarnish?",
            "back": "Ag₂S from H₂S."
        }
    ],
    quiz: [
    {question:"Displaces Cu from CuSO₄:",options:["Ag","Zn","Au","Pt"],correctIndex:1,explanation:"Zn above Cu."},
    {question:"No reaction with cold water:",options:["Na","K","Ca","Mg"],correctIndex:3,explanation:"Mg very slow cold."},
    {question:"Most reactive listed:",options:["Au","K","Cu","Ag"],correctIndex:1,explanation:"Top of series."},
    {question:"H₂ from dilute HCl:",options:["Cu","Fe","Ag","Au"],correctIndex:1,explanation:"Fe above H."},
    {question:"Thermite Al + Fe₂O₃:",options:["Al oxidised","Fe oxidised","O₂ product","No heat"],correctIndex:0,explanation:"Al reduces Fe."},
    {question:"Carbon cannot reduce at high T:",options:["ZnO","Al₂O₃","Fe₂O₃","PbO"],correctIndex:1,explanation:"Al too reactive — electrolysis."},
    {question:"Sacrificial anode for iron ship:",options:["Cu","Zn","Ag","Sn"],correctIndex:1,explanation:"Zn more reactive."},
    {question:"Native metal likely:",options:["Na","Au","Mg","Al"],correctIndex:1,explanation:"Unreactive."},
    {question:"Fe + Sn²⁺:",options:["Fe²⁺ + Sn","No reaction","Fe³⁺ only","Sn + Fe"],correctIndex:0,explanation:"Fe above Sn displaces."},
    {question:"Cu + AgNO₃:",options:["No reaction","Cu²⁺ + Ag","Cu + Ag only solid","Gas"],correctIndex:1,explanation:"Cu above Ag."},
    {question:"Metal oxide most easily reduced by H₂:",options:["Na₂O","CuO","Al₂O₃","MgO"],correctIndex:1,explanation:"Lower in series easier reduce."},
    {question:"Blast furnace iron ore reduced by:",options:["Only H₂","CO/C","Al","Electrons only"],correctIndex:1,explanation:"Reductants."},
    {question:"Why Al resists corrosion:",options:["Oxide layer","No oxide","Liquid","Gold coat"],correctIndex:0,explanation:"Al₂O₃ passive."},
    {question:"Mg + steam:",options:["No reaction","MgO + H₂","MgH₂ only","Explodes always"],correctIndex:1,explanation:"Hot."},
    {question:"Pb + HCl dilute:",options:["Fast H₂","Slow/no simple H₂","Cl₂","PbCl₂ insoluble coats"],correctIndex:3,explanation:"Insoluble chloride layer."},
    {question:"Silver in HNO₃ conc:",options:["No reaction","Dissolves (redox)","Only H₂","Heats only"],correctIndex:1,explanation:"Oxidising acid."},
    {question:"Order Zn Fe Cu reactivity:",options:["Zn>Fe>Cu","Cu>Fe>Zn","Fe>Zn>Cu","Same"],correctIndex:0,explanation:"Series."},
    {question:"Hydrogen in series is reference for:",options:["Halogen displacement","Acid-metal","Precipitation","Titration"],correctIndex:1,explanation:"H₂ liberation."},
    {question:"Rusting needs:",options:["Dry O₂ only","O₂ + H₂O","Only N₂","Only salt never"],correctIndex:1,explanation:"Electrochemical."},
    {question:"Zinc-coated steel scratched:",options:["Zn still protects Fe cathodically","Fe rusts immediately fast","Cu needed","No effect"],correctIndex:0,explanation:"Sacrificial."},
    {question:"Metal extracted by electrolysis molten:",options:["Fe","Al","Cu","Pb"],correctIndex:1,explanation:"Very reactive."},
    {question:"Carbon reduces PbO on heating:",options:["Yes often","Never","Only liquid","Only with Pt"],correctIndex:0,explanation:"Below Al in series."},
    {question:"Gold jewellery alloy:",options:["Pure always","Cu added hardness","Na added","Cl added"],correctIndex:1,explanation:"Hardness."},
    {question:"Fe + acid → Fe²⁺ or Fe³⁺ dilute:",options:["Fe²⁺ typically","Fe³⁺ always","Fe⁰","No ions"],correctIndex:0,explanation:"Dilute HCl."},
    {question:"Metal + water steam general gp1:",options:["Hydroxide + H₂","Only oxide","No reaction","Only O₂"],correctIndex:0,explanation:"Alkali metals."},
    {question:"Reactivity series from reduction potentials (concept):",options:["More negative E° more reactive metal","More positive more reactive","No link","Only non-metals"],correctIndex:0,explanation:"Trend."}
    ],
    trueFalse: [
    {statement:"Copper reacts with dilute hydrochloric acid to give hydrogen.",correct:false,explain:"Below hydrogen."},
    {statement:"Iron is more reactive than carbon in extracting aluminium.",correct:false,explain:"Al more reactive — C cannot reduce Al₂O₃ commercially."},
    {statement:"Zinc will displace lead from lead nitrate solution.",correct:true,explain:"Zn above Pb."},
    {statement:"Gold is found native because it is unreactive.",correct:true,explain:"Low reactivity."},
    {statement:"Magnesium burns in CO₂ (spark).",correct:true,explain:"Reduces CO₂."},
    {statement:"All metals conduct electricity.",correct:true,explain:"Metallic bonding."},
    {statement:"Stainless steel never rusts.",correct:false,explain:"Can under harsh conditions."},
    {statement:"Alkali metals stored under oil.",correct:true,explain:"Prevent water contact."},
    {statement:"Silver is a good conductor of electricity.",correct:true,explain:"Used in contacts."},
    {statement:"Iron is below hydrogen in reactivity series.",correct:false,explain:"Above — Fe + acid → H₂."},
    {statement:"Carbon can reduce iron(III) oxide in blast furnace.",correct:true,explain:"CO/C reduction."},
    {statement:"Mercury liquid metal below hydrogen.",correct:false,explain:"Hg below H — no H₂ from dilute acid."}
    ],
    orderGame: ["K","Na","Ca","Mg","Al","Zn","Fe","Pb","H","Cu","Ag"],
    orderTitle: "Metals (simplified series)",
    });
})();
