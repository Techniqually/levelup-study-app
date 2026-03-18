(function () {
  window.__registerTopic({
    id: "9",
    theme: "Theme 2: Chemical Reactions",
    title: "Ammonia",
    cheatBlocks: [
        {
            "title": "Haber",
            "points": [
                "N₂+3H₂⇌2NH₃; Fe catalyst; ~450°C; high P.",
                "Recycle unreacted gases.",
                "NH₃ → HNO₃, fertilisers."
            ]
        },
        {
            "title": "Properties",
            "points": [
                "Alkaline gas; turns damp red litmus blue.",
                "Very soluble; fountain experiment.",
                "NH₄⁺ + OH⁻ → NH₃."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-04-ammonia.jpg", caption: "Haber process and conditions" } ],
    flashcards: [
        {
            "front": "Haber catalyst?",
            "back": "Iron."
        },
        {
            "front": "Ostwald (context)?",
            "back": "NH₃ → NO → HNO₃."
        },
        {
            "front": "Urea formula?",
            "back": "CO(NH₂)₂ fertiliser N."
        },
        {
            "front": "Liquid NH₃ use?",
            "back": "Refrigerant; solvent."
        },
        {
            "front": "Test ammonium ion?",
            "back": "NaOH heat, gas turns litmus blue."
        },
        {
            "front": "Dilute NH₃ + Cu²⁺?",
            "back": "Pale blue ppt, deep blue solution excess."
        },
        {
            "front": "NPK fertiliser?",
            "back": "N,P,K nutrients."
        },
        {
            "front": "Le Chatelier low T favours NH₃ but?",
            "back": "Rate slower — compromise T."
        },
        {
            "front": "High P favours?",
            "back": "Fewer gas moles side — NH₃."
        },
        {
            "front": "Natural ammonia source?",
            "back": "Decomposition, bacterial."
        },
        {
            "front": "Ammonium nitrate explosive risk?",
            "back": "Oxidiser — careful storage."
        },
        {
            "front": "Nitrate leaching?",
            "back": "Eutrophication risk."
        },
        {
            "front": "Haber energy intensive?",
            "back": "Fossil H₂ often."
        },
        {
            "front": "NH₃ bp vs H₂O?",
            "back": "Lower — H-bond weaker than water."
        }
    ],
    quiz: [
    {question:"NH₃ turns damp red litmus:",options:["Red","Blue","No change","Green"],correctIndex:1,explanation:"Base."},
    {question:"Haber nitrogen source:",options:["Air fractionation","Only NH₄Cl","Urea burn","Water only"],correctIndex:0,explanation:"N₂ from air."},
    {question:"Forward reaction to NH₃ is:",options:["Endothermic","Exothermic","Zero ΔH","Only physical"],correctIndex:1,explanation:"Heat released."},
    {question:"Higher pressure in Haber:",options:["Less NH₃","More NH₃ equilibrium","No effect","Explodes always"],correctIndex:1,explanation:"Fewer gas moles."},
    {question:"NH₄Cl + NaOH warmed:",options:["Cl₂","NH₃","H₂","N₂"],correctIndex:1,explanation:"Ammonium test."},
    {question:"NH₃ in water equation simplified:",options:["NH₃+H₂O⇌NH₄⁺+OH⁻","Only NH₄OH molecule","No ions","Only H⁺"],correctIndex:0,explanation:"Equilibrium."},
    {question:"Fertiliser from NH₃ not:",options:["Urea","Ammonium salts","Diamond","NH₄NO₃"],correctIndex:2,explanation:"Not carbon allotrope."},
    {question:"Catalyst in Haber:",options:["Pt only","Fe","Ni","Enzyme"],correctIndex:1,explanation:"Iron promoted."},
    {question:"Nitric acid from ammonia:",options:["Ostwald process","Contact only","Haber only","Electrolysis"],correctIndex:0,explanation:"Oxidation steps."},
    {question:"NH₃ density vs air:",options:["Lighter","Heavier","Same","No mass"],correctIndex:0,explanation:"Mr 17<29."},
    {question:"Why compress gases in Haber:",options:["Increase rate and shift equilibrium","Only cooling","Remove catalyst","Dilute"],correctIndex:0,explanation:"More collisions."},
    {question:"Equilibrium means:",options:["Forward stops","Forward=reverse rates","Only products","No catalyst"],correctIndex:1,explanation:"Dynamic."},
    {question:"NH₃ hydrogen bonding:",options:["Yes with water","Never","Only ionic","Only metal"],correctIndex:0,explanation:"N lone pair."},
    {question:"Ammonium nitrate in soil:",options:["N source","Only P","Toxic metal","Inert sand"],correctIndex:0,explanation:"N fertiliser."},
    {question:"Biological nitrogen fixation:",options:["Lightning only","Bacteria in legumes","Only Haber","Oceans only"],correctIndex:1,explanation:"Rhizobia."},
    {question:"NH₃ toxic inhalation:",options:["Respiratory irritant","Nutrient only","Inert","Healing"],correctIndex:0,explanation:"Safety."},
    {question:"Dry NH₃ does not turn litmus on paper without:",options:["Water","Heat only","O₂","Cl₂"],correctIndex:0,explanation:"Needs moisture."},
    {question:"Reverse of Haber:",options:["NH₃ decomposes to N₂+H₂ at very high T","Never","Only liquid","Only catalyst"],correctIndex:0,explanation:"Endothermic back."},
    {question:"Eutrophication from excess N:",options:["Algal bloom","Ozone hole","Acid rain only","Nothing"],correctIndex:0,explanation:"Nutrient runoff."},
    {question:"NH₃ + HCl gas:",options:["White smoke NH₄Cl","Blue solution","No reaction","Cl₂"],correctIndex:0,explanation:"Solid formation."},
    {question:"Industrial H₂ for Haber often from:",options:["Natural gas steam reforming","Only water split","Air only","Coal never"],correctIndex:0,explanation:"CH₄+H₂O."},
    {question:"NH₃ lone pair:",options:["Lewis base","Lewis acid only","No electrons","Only metal"],correctIndex:0,explanation:"Donor."},
    {question:"pH of 0.1 M NH₃ ~:",options:["1","7","11","14"],correctIndex:2,explanation:"Weak base ~11."},
    {question:"Double salt ammonium (context):",options:["NH₄Fe(SO₄)₂ type","Only NaCl","Gas","Diamond"],correctIndex:0,explanation:"Alum analogues."},
    {question:"Why not extreme low T in Haber:",options:["Rate too slow","Explosion","No catalyst","No N₂"],correctIndex:0,explanation:"Kinetic limit."},
    {question:"NOₓ from fertiliser overuse:",options:["Can acidify/runoff issues","Only ozone","Helium release","None"],correctIndex:0,explanation:"Environmental."}
    ],
    trueFalse: [
    {statement:"Haber process runs at room temperature industrially.",correct:false,explain:"~450°C."},
    {statement:"Ammonia is a base in Brønsted sense.",correct:true,explain:"Accepts H⁺."},
    {statement:"All soil nitrogen is immediately plant-available.",correct:false,explain:"Mineralisation needed."},
    {statement:"NH₄⁺ in solution acidic hydrolysis.",correct:true,explain:"Weak base conjugate."},
    {statement:"Liquid ammonia autoionises like water.",correct:true,explain:"2NH₃⇌NH₄⁺+NH₂⁻ minimal."},
    {statement:"Urea hydrolyses to ammonia in soil.",correct:true,explain:"Enzyme urease."},
    {statement:"Haber fixed N enabled population growth.",correct:true,explain:"Historical impact."},
    {statement:"NH₃ is stored as pressurised liquid.",correct:true,explain:"Liquefaction."},
    {statement:"Ammonium salts with nitrate are always safe to heat.",correct:false,explain:"Decomposition/explosion risk."},
    {statement:"N₂ is very inert at room T.",correct:true,explain:"Strong triple bond."},
    {statement:"Catalyst increases equilibrium yield.",correct:false,explain:"Speeds both ways equally."},
    {statement:"NH₃ is trigonal pyramidal.",correct:true,explain:" Lone pair on N."}
    ],
    });
})();
