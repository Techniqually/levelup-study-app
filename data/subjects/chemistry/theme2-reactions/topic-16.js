(function () {
  window.__registerTopic({
    id: "16",
    theme: "Theme 2: Chemical Reactions",
    title: "Rate of Reactions",
    cheatBlocks: [
        {
            "title": "Factors",
            "points": [
                "Concentration ↑ → collision frequency ↑.",
                "Temperature ↑ → more particles ≥ Ea; more frequent collisions.",
                "Surface area ↑ (solid) → more exposed sites.",
                "Catalyst: lower Ea."
            ]
        },
        {
            "title": "Measurement",
            "points": [
                "Gas volume vs time; mass loss; colour change; titrate samples quenched.",
                "Initial rate = gradient at t=0."
            ]
        },
        {
            "title": "Collision theory",
            "points": [
                "Particles must collide with correct orientation and ≥ Ea for reaction."
            ]
        }
    ],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-11-rates.jpg", caption: "Surface area and catalyst effects on rate" } ],
    flashcards: [
        {
            "front": "Rate units?",
            "back": "mol dm⁻³ s⁻¹ or g s⁻¹ etc."
        },
        {
            "front": "Catalyst?",
            "back": "Same at end; alternative pathway."
        },
        {
            "front": "Powder vs lump zinc acid?",
            "back": "Powder faster — area."
        },
        {
            "front": "Maxwell-Boltzmann T↑?",
            "back": "More molecules past Ea."
        },
        {
            "front": "Effective collision?",
            "back": "Sufficient energy + orientation."
        },
        {
            "front": "Inhibitor?",
            "back": "Slows catalyst poison."
        },
        {
            "front": "Clock reaction?",
            "back": "Sudden colour after delay."
        },
        {
            "front": "Half-life first order?",
            "back": "Constant."
        },
        {
            "front": "Concentration doubles rate doubles first order?",
            "back": "Yes linear."
        },
        {
            "front": "Enzyme denatured high T?",
            "back": "Loses shape — rate drops."
        },
        {
            "front": "Pressure gas reaction rate?",
            "back": "Higher P often faster (more conc)."
        },
        {
            "front": "Stirring?",
            "back": "Mixes — increases effective collisions surface."
        },
        {
            "front": "Quenching sample?",
            "back": "Stops reaction for titration."
        },
        {
            "front": "Photochemical initiation?",
            "back": "Light provides activation."
        }
    ],
    quiz: [
    {question:"Increase rate CaCO₃ + HCl:",options:["Use large lumps","Heat and powder","Dilute more","Remove acid"],correctIndex:1,explanation:"T and surface area."},
    {question:"Lower concentration usually:",options:["Faster","Slower","Same","Explosive"],correctIndex:1,explanation:"Fewer collisions."},
    {question:"Catalyst:",options:["Consumed net","Lowers Ea","Changes ΔH lots","Shifts equilibrium only"],correctIndex:1,explanation:"Pathway."},
    {question:"Flat on volume-time curve:",options:["Fastest rate","Reaction complete or very slow","Explosion","Catalyst added mid"],correctIndex:1,explanation:"Level off."},
    {question:"Temperature 10°C rise often:",options:["Halves rate","Doubles rate approx rule of thumb","No change","Stops"],correctIndex:1,explanation:"Rough guide."},
    {question:"MnO₂ in H₂O₂:",options:["Reactant","Catalyst","Product","Inhibitor"],correctIndex:1,explanation:"Speeds decomposition."},
    {question:"Gas pressure on 2NO+O₂:",options:["No effect","Higher P faster","Only solid","Only liquid"],correctIndex:1,explanation:"More gas molecules per volume."},
    {question:"Measuring rate via mass loss:",options:["CO₂ escape in carbonate+acid","Only gain","Never","Only metal"],correctIndex:0,explanation:"Open system."},
    {question:"Initial rate from graph:",options:["Tangent at t=0","Final height","Average whole","Zero always"],correctIndex:0,explanation:"Steepest start."},
    {question:"Heterogeneous catalyst:",options:["Same phase as reactants","Different phase often surface","Only enzyme","Only gas"],correctIndex:1,explanation:"Surface catalysis."},
    {question:"Homogeneous catalyst:",options:["Same phase","Solid only","Only liquid metal","Never used"],correctIndex:0,explanation:"Fe³⁺ in solution."},
    {question:"Autocatalysis MnO₄⁻ oxalic:",options:["Product speeds","Product slows","No effect","Only temp"],correctIndex:0,explanation:"Mn²⁺ autocatalyst."},
    {question:"Light Br₂ + alkane:",options:["Substitution slow dark","Fast with UV","No reaction ever","Only addition"],correctIndex:1,explanation:"Radical chain."},
    {question:"Concentration-time zero order:",options:["Straight line ln conc","Linear decrease conc vs t","Exponential","Flat"],correctIndex:1,explanation:"Rate constant."},
    {question:"Half-life zero order depends on:",options:["Initial conc","Constant always","Catalyst only","Volume only"],correctIndex:0,explanation:"t½ = [A]₀/2k."},
    {question:"Stirring flask solid + liquid:",options:["May increase rate dissolving","Never helps","Only gas","Stops reaction"],correctIndex:0,explanation:"Surface refresh."},
    {question:"Enzyme substrate saturation:",options:["Rate levels Vmax","Rate infinite","Rate zero","Only low [S]"],correctIndex:0,explanation:"Michaelis-Menten shape."},
    {question:"Explosion limit gas:",options:["Concentration window","Always all ratios","Only liquid","Only catalyst"],correctIndex:0,explanation:"Fuel/air limits."},
    {question:"Catalyst poison lead on Pt:",options:["Blocks active sites","Speeds more","Adds reactant","Removes product"],correctIndex:0,explanation:"Deactivation."},
    {question:"Orientation important:",options:["Bimolecular reactions","Only atoms","Never","Only solids"],correctIndex:0,explanation:"Steric."},
    {question:"Clock reaction I₂ starch:",options:["Sudden blue-black after S₂O₃²⁻ used up","Immediate","Never colour","Only gas"],correctIndex:0,explanation:"Iodine clock."},
    {question:"Quench with ice:",options:["Slow molecular motion","Speed up","Evaporate","Only metal"],correctIndex:0,explanation:"Freeze rate."},
    {question:"Pressure cooker food:",options:["Higher bp water faster cooking","Lower bp","No effect","Only colour"],correctIndex:0,explanation:"Rate and T."},
    {question:"Nanoparticle catalyst:",options:["Larger surface per mass","Smaller surface","No surface","Only bulk"],correctIndex:0,explanation:"More active sites."},
    {question:"Rate law from experiment:",options:["Stoichiometry coefficients always","Must measure orders","Only theory","Always 1"],correctIndex:1,explanation:"Empirical orders."},
    {question:"Arrhenius k = A e^{-Ea/RT} T↑:",options:["k decreases","k increases","k constant","k zero"],correctIndex:1,explanation:"Exponential."}
    ],
    trueFalse: [
    {statement:"A catalyst increases the rate of both forward and reverse reactions.",correct:true,explain:"Ea lowered both ways."},
    {statement:"Higher temperature always increases rate for elementary steps.",correct:true,explain:"More molecules exceed Ea."},
    {statement:"Increasing surface area of a solid reactant has no effect on rate.",correct:false,explain:"More collisions at surface."},
    {statement:"All reactions are zero order.",correct:false,explain:"Orders vary."},
    {statement:"Catalyst appears in overall balanced equation.",correct:false,explain:"Regenerated."},
    {statement:"Collision frequency alone determines rate.",correct:false,explain:"Energy and orientation matter."},
    {statement:"Instantaneous rate can change during reaction.",correct:true,explain:"Concentration drops."},
    {statement:"Measuring rate requires only final yield.",correct:false,explain:"Need time data."},
    {statement:"Enzymes are specific to substrate shape.",correct:true,explain:"Lock and key."},
    {statement:"Increasing pressure in a solution reaction rarely affects rate like gases.",correct:true,explain:"Liquids nearly incompressible."},
    {statement:"A larger Ea means slower reaction at same T.",correct:true,explain:"Fewer successful collisions."},
    {statement:"Radioactive decay rate independent of temperature mostly.",correct:true,explain:"Nuclear not thermal activation."}
    ],
    });
})();
