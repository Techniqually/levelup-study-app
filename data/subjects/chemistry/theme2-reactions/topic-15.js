(function () {
  window.__registerTopic({
    id: "15",
    theme: "Theme 2: Chemical Reactions",
    title: "Chemical Energetics",
    cheatBlocks: [
        {
            "title": "Enthalpy",
            "points": [
                "Exothermic: ΔH negative — heat out.",
                "Endothermic: ΔH positive — heat in.",
                "Activation energy Ea — hill on profile."
            ]
        },
        {
            "title": "Bonds",
            "points": [
                "Breaking bonds endothermic; making bonds exothermic.",
                "ΔH reaction ≈ bonds broken − made (bond energy estimate)."
            ]
        },
        {
            "title": "Catalyst",
            "points": [
                "Lowers Ea; does not change ΔH.",
                "Speeds forward and reverse equally."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-10-energetics.jpg", caption: "Exothermic and endothermic profiles" } ],
    flashcards: [
        {
            "front": "Combustion ΔH?",
            "back": "Negative (exothermic)."
        },
        {
            "front": "Photosynthesis overall?",
            "back": "Endothermic."
        },
        {
            "front": "Neutralisation?",
            "back": "Exothermic."
        },
        {
            "front": "Thermal decomposition CaCO₃?",
            "back": "Endothermic."
        },
        {
            "front": "Bond breaking?",
            "back": "Endothermic."
        },
        {
            "front": "Haber forward exothermic?",
            "back": "Yes — low T favours NH₃ but rate trade-off."
        },
        {
            "front": "ΔH solution NH₄NO₃ in water?",
            "back": "Endothermic cold pack."
        },
        {
            "front": "Activation energy with catalyst?",
            "back": "Lower pathway."
        },
        {
            "front": "Enthalpy level diagram exo?",
            "back": "Products lower than reactants."
        },
        {
            "front": "Standard conditions?",
            "back": "298 K, 100 kPa, stated state."
        },
        {
            "front": "Hess's law?",
            "back": "Path independent — cycle sums."
        },
        {
            "front": "Formation enthalpy?",
            "back": "Elements → 1 mol compound."
        },
        {
            "front": "Combustion enthalpy?",
            "back": "Substance + O₂ → oxides."
        },
        {
            "front": "Lattice enthalpy?",
            "back": "Ions → ionic solid (gaseous ions)."
        }
    ],
    quiz: [
    {question:"Exothermic:",options:["Products higher energy","Products lower energy than reactants","No energy change","Only light in"],correctIndex:1,explanation:"Heat released."},
    {question:"Endothermic decomposition CaCO₃:",options:["Releases heat","Absorbs heat","No ΔH","Only physical"],correctIndex:1,explanation:"Needs strong heating."},
    {question:"Catalyst effect on ΔH:",options:["Increases","Decreases","No change","Doubles"],correctIndex:2,explanation:"Only Ea."},
    {question:"Bond forming:",options:["Endothermic","Exothermic","Zero","Only gas"],correctIndex:1,explanation:"Stability."},
    {question:"Overall exothermic if:",options:["Bonds broken > formed energy","Bonds formed release more than break cost","Only catalyst","No bonds"],correctIndex:1,explanation:"Net downhill."},
    {question:"Hand warmer iron oxidation:",options:["Endothermic","Exothermic","No reaction","Nuclear"],correctIndex:1,explanation:"Heat pack."},
    {question:"Cold pack NH₄NO₃:",options:["Exothermic dissolving","Endothermic dissolving","No ΔH","Only gas"],correctIndex:1,explanation:"Absorbs heat."},
    {question:"Ea is:",options:["Total ΔH","Barrier to reaction","Only product energy","Catalyst mass"],correctIndex:1,explanation:"Activation."},
    {question:"Reverse reaction ΔH:",options:["Same as forward","Opposite sign","Always zero","Twice forward"],correctIndex:1,explanation:"Hess."},
    {question:"Combustion methane sign:",options:["Positive ΔH","Negative ΔH","Zero","Undefined"],correctIndex:1,explanation:"Exothermic."},
    {question:"Neutralisation strong acid-base:",options:["Strongly endothermic","Exothermic ~57 kJ/mol per mol water context","No heat","Only gas"],correctIndex:1,explanation:"Typical."},
    {question:"Graph exothermic profile:",options:["Peak below products","Products below reactants energy","Flat","No peak"],correctIndex:1,explanation:"Downhill net."},
    {question:"Enzyme:",options:["Raises ΔH","Lowers Ea","Changes equilibrium only","Consumes product"],correctIndex:1,explanation:"Biocatalyst."},
    {question:"Fuel higher enthalpy density:",options:["More energy per kg","Less energy","No combustion","Only solid"],correctIndex:0,explanation:"Useful fuel."},
    {question:"Hess cycle for enthalpy formation:",options:["Path dependent","Sum around cycle zero","Only gases","No numbers"],correctIndex:1,explanation:"Conservation."},
    {question:"Bond energy O=O high means:",options:["Hard to break","Easy to break","No O₂","Liquid only"],correctIndex:0,explanation:"Strong bond."},
    {question:"Explosion highly exothermic fast:",options:["Slow release","Rapid exothermic gas expansion","Endothermic","Only light"],correctIndex:1,explanation:"TNT etc."},
    {question:"Photosynthesis light energy:",options:["Stored in products endothermic overall","Released fully","No storage","Only heat out"],correctIndex:0,explanation:"ΔH>0 overall."},
    {question:"Respiration glucose:",options:["Exothermic","Endothermic","No redox","Only physical"],correctIndex:0,explanation:"Energy release."},
    {question:"Dissolving NaOH in water:",options:["Cold","Heats up","No change","Freezes"],correctIndex:1,explanation:"Exothermic solvation."},
    {question:"Sublimation iodine ΔH:",options:["Negative always","Positive","Zero","Only liquid"],correctIndex:1,explanation:"Endothermic."},
    {question:"Activation energy without catalyst higher:",options:["Slower reaction","Faster","Same rate always","No reaction ever"],correctIndex:0,explanation:"Fewer successful collisions."},
    {question:"ΔHf° element standard state:",options:["Zero","Always positive","Always negative","100 kJ"],correctIndex:0,explanation:"Reference."},
    {question:"Combustion incomplete CO vs CO₂:",options:["CO releases more heat per C","CO₂ releases more complete combustion","Same","Neither exothermic"],correctIndex:1,explanation:"Complete more exothermic per C."},
    {question:"Le Chatelier exothermic forward reaction low T:",options:["Favours products equilibrium","Favours reactants","No effect","Explodes"],correctIndex:0,explanation:"Heat as product."},
    {question:"Calorimetry heat capacity (concept):",options:["q = mcΔT","Only volume","Only pressure","No formula"],correctIndex:0,explanation:"Specific heat."}
    ],
    trueFalse: [
    {statement:"All spontaneous reactions are exothermic.",correct:false,explain:"Entropy can drive endothermic."},
    {statement:"Catalyst increases equilibrium yield of exothermic forward.",correct:false,explain:"Speed only."},
    {statement:"Breaking all bonds in methane is endothermic.",correct:true,explain:"Need energy input."},
    {statement:"Formation of water from H₂ and O₂ is highly exothermic.",correct:true,explain:"Explosive mix."},
    {statement:"ΔH depends on state of reactants (s,l,g,aq).",correct:true,explain:"State matters."},
    {statement:"Activation energy can be supplied by heat or light.",correct:true,explain:"Initiation."},
    {statement:"Bond energy is always positive magnitude for breaking.",correct:true,explain:"Endothermic process."},
    {statement:"An endothermic reaction feels cold to touch on flask.",correct:true,explain:"Absorbs heat from surroundings."},
    {statement:"N₂ + O₂ → NO is endothermic.",correct:true,explain:"Lightning fixation."},
    {statement:"Dissolving NH₄Cl is endothermic.",correct:true,explain:"Cold flask."},
    {statement:"Hess's law is consequence of enthalpy state function.",correct:true,explain:"Path independent."},
    {statement:"Lattice enthalpy MgO very exothermic.",correct:true,explain:"Strong ionic attraction."}
    ],
    });
})();
