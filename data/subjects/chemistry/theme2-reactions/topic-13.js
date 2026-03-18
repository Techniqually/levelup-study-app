(function () {
  window.__registerTopic({
    id: "13",
    theme: "Theme 2: Chemical Reactions",
    title: "Patterns in the Periodic Table",
    cheatBlocks: [
        {
            "title": "Trends",
            "points": [
                "Across period: atomic radius ↓; metallic character ↓; IE ↑.",
                "Down group: radius ↑; metallic ↑ (Gp1); halogen reactivity ↓.",
                "Noble gases full outer shell — unreactive."
            ]
        },
        {
            "title": "Groups",
            "points": [
                "Gp1 alkali — +1 ions; violent with water down group.",
                "Gp17 halogens — diatomic; displacement reactivity.",
                "Gp18 noble gases — monatomic gases."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-08-periodic-table.jpg", caption: "Periodic trends: radius and electronegativity" } ],
    flashcards: [
        {
            "front": "Gp1 reactivity down?",
            "back": "Increases."
        },
        {
            "front": "Halogen reactivity down?",
            "back": "Decreases."
        },
        {
            "front": "Atomic radius across Period 3?",
            "back": "Decreases."
        },
        {
            "front": "First IE across period?",
            "back": "Generally increases."
        },
        {
            "front": "Why Fr most reactive alkali?",
            "back": "Electron lost easily — far from nucleus."
        },
        {
            "front": "Electronegativity trend?",
            "back": "↑ across, ↓ down (F max)."
        },
        {
            "front": "Diagonal Li~Mg similarity?",
            "back": "Polarising power."
        },
        {
            "front": "Transition metals?",
            "back": "Variable oxidation states, coloured compounds."
        },
        {
            "front": "Shielding effect?",
            "back": "Inner electrons reduce nuclear pull on valence."
        },
        {
            "front": "Noble gas boiling point trend?",
            "back": "Increases down (London forces)."
        },
        {
            "front": "Metallic bonding strength Period 3?",
            "back": "Generally peaks middle."
        },
        {
            "front": "Chlorine state 25°C?",
            "back": "Gas."
        },
        {
            "front": "Bromine state?",
            "back": "Liquid."
        },
        {
            "front": "Iodine state?",
            "back": "Solid."
        }
    ],
    quiz: [
    {question:"Most metallic Period 3:",options:["Cl","Si","Na","S"],correctIndex:2,explanation:"Left."},
    {question:"Smallest atom Period 2:",options:["Li","Ne","Be","B"],correctIndex:1,explanation:"Right end noble small."},
    {question:"Highest first IE Period 3 excluding noble:",options:["Na","Mg","Si","Cl"],correctIndex:3,explanation:"Right before Ar."},
    {question:"Gp17 element liquid at room T:",options:["F₂","Cl₂","Br₂","I₂"],correctIndex:2,explanation:"Bromine."},
    {question:"Cl₂ + KBr:",options:["No reaction","Br₂ forms","KCl only","I₂"],correctIndex:1,explanation:"Displacement."},
    {question:"Noble gas in lamps often:",options:["Ne","Ar","He","Rn"],correctIndex:1,explanation:"Inert cheap."},
    {question:"Element 2,8,8,1:",options:["Gp1","Gp7","Gp18","Gp2"],correctIndex:0,explanation:"One valence e."},
    {question:"Across period valence electrons Gp1→2:",options:["Decrease","Increase to 3 then complex","Constant","Zero"],correctIndex:1,explanation:"Up to 3 for Na Mg Al."},
    {question:"Why Al less metallic than Na same period:",options:["More protons hold e⁻ tighter","Fewer protons","Same shielding exactly","Larger radius"],correctIndex:0,explanation:"Effective nuclear charge."},
    {question:"Down gp1 density trend:",options:["Always decreases","Generally increases then K anomaly","Constant","Only gas"],correctIndex:1,explanation:"K less dense than Na."},
    {question:"Electron affinity most exothermic halogen:",options:["I","Br","Cl","F"],correctIndex:2,explanation:"F small size — Cl often max in group."},
    {question:"Atomic radius Na vs Cl:",options:["Na smaller","Cl smaller","Same","Cannot"],correctIndex:1,explanation:"Same period: more nuclear charge → Cl smaller."},
    {question:"Melting trend alkali metals down:",options:["Generally decreases","Increases","Constant","Only Li melts"],correctIndex:0,explanation:"Metallic bonding weakens."},
    {question:"Which is not halogen:",options:["At","Se","I","Br"],correctIndex:1,explanation:"Selenium is chalcogen."},
    {question:"Oxidation state group 2:",options:["+1","+2","+3","0"],correctIndex:1,explanation:"Lose 2e."},
    {question:"Transition element property:",options:["Fixed +1 only","Variable oxidation state","No colour","Gas at RT"],correctIndex:1,explanation:"d-block."},
    {question:"Lanthanide contraction effect:",options:["6d and 5d similar size","No effect","Only s-block","Halogens shrink"],correctIndex:0,explanation:"5d vs 4d."},
    {question:"Hydrogen placement debate:",options:["Only metal","Non-metal mostly","Halogen always","Noble gas"],correctIndex:1,explanation:"Unique."},
    {question:"Silicon semiconductor:",options:["Metallic","Metalloid","Halogen","Alkali"],correctIndex:1,explanation:"Period 3 metalloid."},
    {question:"Fr predicted properties:",options:["Least volatile alkali","Most reactive alkali","Halogen","Noble"],correctIndex:1,explanation:"Radioactive alkali."},
    {question:"Ionisation energy Mg vs Al anomaly:",options:["Al lower (3p easier e⁻)","Mg lower","Same","Both zero"],correctIndex:0,explanation:"s² full subshell stable Mg."},
    {question:"S₂ molecule (adv):",options:["Like O₂ paramagnetic idea","Single bonded only","Noble","Ionic"],correctIndex:0,explanation:"Disulfur."},
    {question:"Allotropes oxygen:",options:["O₂ O₃","Only O","Fe O","Cl O"],correctIndex:0,explanation:"Ozone."},
    {question:"Halogen colour intensity down:",options:["Lighter","Darker","Colourless all","Only solid colours"],correctIndex:1,explanation:"Deeper colour."},
    {question:"Noble gas compound first (history):",options:["Xe compounds","He compounds easy","Ne many","Ar acids"],correctIndex:0,explanation:"XePtF₆."},
    {question:"Effective nuclear charge trend across:",options:["Decreases","Increases","Constant","Random"],correctIndex:1,explanation:"Zeff up."}
    ],
    trueFalse: [
    {statement:"Fluorine is the most electronegative element.",correct:true,explain:"Pauling scale."},
    {statement:"Atomic radius increases down a group.",correct:true,explain:"Extra shell."},
    {statement:"Noble gases have zero electron affinity.",correct:false,explain:"Can be slightly positive/endothermic."},
    {statement:"Sodium reacts more violently with water than lithium.",correct:true,explain:"More reactive down gp1."},
    {statement:"All period 3 elements are metals.",correct:false,explain:"Si P S Cl Ar non/metalloid."},
    {statement:"Ionisation energy removes electron from gaseous atom.",correct:true,explain:"Definition."},
    {statement:"Halogens exist as monatomic gases.",correct:false,explain:"X₂ diatomic."},
    {statement:"Electronegativity of Cs is higher than F.",correct:false,explain:"F max."},
    {statement:"Transition metals form coloured ions often.",correct:true,explain:"d-d transitions."},
    {statement:"Metallic character decreases across a period.",correct:true,explain:"Toward non-metals."},
    {statement:"He has highest first IE.",correct:true,explain:"Small, tight hold."},
    {statement:"Group 1 hydroxides become more soluble down group.",correct:true,explain:"General trend."}
    ],
    });
})();
