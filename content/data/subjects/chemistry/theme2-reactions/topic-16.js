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
    ,
    {
        "title": "Rate Experiment Methods",
        "points": [
            "**Gas syringe / inverted burette**: collect and measure volume of gas vs time.",
            "**Balance method**: open flask on balance; mass decreases as gas escapes.",
            "**Colorimetry / colour change**: for coloured reactant/product.",
            "**Titration**: withdraw samples at time intervals; quench (stop reaction); titrate.",
            "**Initial rate** = gradient of tangent to concentration–time curve at t = 0.",
            "**Clock reaction** (iodine-clock): sudden blue-black colour appears after a delay."
        ]
    }],
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
    ,
    { "front": "Initial rate from graph?", "back": "**Gradient of tangent at t = 0** — steepest part of concentration-time curve." },
    { "front": "Why same final gas volume regardless of surface area?", "back": "Surface area affects **rate**, not the total **amount** of product. Total moles of reagent determines volume." },
    { "front": "Why catalyst doesn't change equilibrium position?", "back": "It lowers $E_a$ for **both** forward and reverse reactions equally → K unchanged; only reaches equilibrium faster." },
    { "front": "10°C rise roughly doubles rate. Why?", "back": "Fraction of molecules with $E \\geq E_a$ increases **exponentially** (Boltzmann distribution) — not just linearly." }],
    quiz: [
    {id:"chem-T16-001",question:"Increase rate CaCO₃ + HCl:",options:["Use large lumps","Heat and powder","Dilute more","Remove acid"],correctIndex:1,explanation:"T and surface area."},
    {id:"chem-T16-002",question:"Lower concentration usually:",options:["Faster","Slower","Same","Explosive"],correctIndex:1,explanation:"Fewer collisions."},
    {id:"chem-T16-003",question:"Catalyst:",options:["Consumed net","Lowers Ea","Changes ΔH lots","Shifts equilibrium only"],correctIndex:1,explanation:"Pathway."},
    {id:"chem-T16-004",question:"Flat on volume-time curve:",options:["Fastest rate","Reaction complete or very slow","Explosion","Catalyst added mid"],correctIndex:1,explanation:"Level off."},
    {id:"chem-T16-005",question:"Temperature 10°C rise often:",options:["Halves rate","Doubles rate approx rule of thumb","No change","Stops"],correctIndex:1,explanation:"Rough guide."},
    {id:"chem-T16-006",question:"MnO₂ in H₂O₂:",options:["Reactant","Catalyst","Product","Inhibitor"],correctIndex:1,explanation:"Speeds decomposition."},
    {id:"chem-T16-007",question:"Gas pressure on 2NO+O₂:",options:["No effect","Higher P faster","Only solid","Only liquid"],correctIndex:1,explanation:"More gas molecules per volume."},
    {id:"chem-T16-008",question:"Measuring rate via mass loss:",options:["CO₂ escape in carbonate+acid","Only gain","Never","Only metal"],correctIndex:0,explanation:"Open system."},
    {id:"chem-T16-009",question:"Initial rate from graph:",options:["Tangent at t=0","Final height","Average whole","Zero always"],correctIndex:0,explanation:"Steepest start."},
    {id:"chem-T16-010",question:"Heterogeneous catalyst:",options:["Same phase as reactants","Different phase often surface","Only enzyme","Only gas"],correctIndex:1,explanation:"Surface catalysis."},
    {id:"chem-T16-011",question:"Homogeneous catalyst:",options:["Same phase","Solid only","Only liquid metal","Never used"],correctIndex:0,explanation:"Fe³⁺ in solution."},
    {id:"chem-T16-012",question:"Autocatalysis MnO₄⁻ oxalic:",options:["Product speeds","Product slows","No effect","Only temp"],correctIndex:0,explanation:"Mn²⁺ autocatalyst."},
    {id:"chem-T16-013",question:"Light Br₂ + alkane:",options:["Substitution slow dark","Fast with UV","No reaction ever","Only addition"],correctIndex:1,explanation:"Radical chain."},
    {id:"chem-T16-014",question:"Concentration-time zero order:",options:["Straight line ln conc","Linear decrease conc vs t","Exponential","Flat"],correctIndex:1,explanation:"Rate constant."},
    {id:"chem-T16-015",question:"Half-life zero order depends on:",options:["Initial conc","Constant always","Catalyst only","Volume only"],correctIndex:0,explanation:"t½ = [A]₀/2k."},
    {id:"chem-T16-016",question:"Stirring flask solid + liquid:",options:["May increase rate dissolving","Never helps","Only gas","Stops reaction"],correctIndex:0,explanation:"Surface refresh."},
    {id:"chem-T16-017",question:"Enzyme substrate saturation:",options:["Rate levels Vmax","Rate infinite","Rate zero","Only low [S]"],correctIndex:0,explanation:"Michaelis-Menten shape."},
    {id:"chem-T16-018",question:"Explosion limit gas:",options:["Concentration window","Always all ratios","Only liquid","Only catalyst"],correctIndex:0,explanation:"Fuel/air limits."},
    {id:"chem-T16-019",question:"Catalyst poison lead on Pt:",options:["Blocks active sites","Speeds more","Adds reactant","Removes product"],correctIndex:0,explanation:"Deactivation."},
    {id:"chem-T16-020",question:"Orientation important:",options:["Bimolecular reactions","Only atoms","Never","Only solids"],correctIndex:0,explanation:"Steric."},
    {id:"chem-T16-021",question:"Clock reaction I₂ starch:",options:["Sudden blue-black after S₂O₃²⁻ used up","Immediate","Never colour","Only gas"],correctIndex:0,explanation:"Iodine clock."},
    {id:"chem-T16-022",question:"Quench with ice:",options:["Slow molecular motion","Speed up","Evaporate","Only metal"],correctIndex:0,explanation:"Freeze rate."},
    {id:"chem-T16-023",question:"Pressure cooker food:",options:["Higher bp water faster cooking","Lower bp","No effect","Only colour"],correctIndex:0,explanation:"Rate and T."},
    {id:"chem-T16-024",question:"Nanoparticle catalyst:",options:["Larger surface per mass","Smaller surface","No surface","Only bulk"],correctIndex:0,explanation:"More active sites."},
    {id:"chem-T16-025",question:"Rate law from experiment:",options:["Stoichiometry coefficients always","Must measure orders","Only theory","Always 1"],correctIndex:1,explanation:"Empirical orders."},
    {id:"chem-T16-026",question:"Arrhenius k = A e^{-Ea/RT} T↑:",options:["k decreases","k increases","k constant","k zero"],correctIndex:1,explanation:"Exponential."},
    {id:"chem-T16-027",question:"Increasing concentration of a dissolved reactant usually increases rate because:",options:["It lowers activation energy","Collision frequency increases","It removes the need for orientation","It stops equilibrium"],correctIndex:1,explanation:"More particles per unit volume → more collisions per second."},
    {id:"chem-T16-028",question:"Powdered marble reacts faster with acid than lumps mainly due to:",options:["Higher temperature automatically","Larger surface area for collisions","Lower activation energy","Different reaction pathway"],correctIndex:1,explanation:"More solid–solution contact area."},
    {id:"chem-T16-029",question:"A Maxwell–Boltzmann curve shifts when temperature rises: the fraction of molecules with E ≥ Ea:",options:["Always decreases","Generally increases","Stays exactly the same","Becomes zero"],correctIndex:1,explanation:"Higher T broadens and shifts the distribution — more high-energy tails."},
    {id:"chem-T16-030",question:"Measuring initial rate from a concentration–time graph uses:",options:["The final plateau","The tangent gradient at t = 0","The average over 10 minutes","Only the y-intercept"],correctIndex:1,explanation:"Instantaneous rate at start is steepest slope."},
    {id:"chem-T16-031",question:"A homogeneous catalyst is in the same phase as reactants; an example context is:",options:["Iron in Haber (solid) only","Fe³⁺(aq) catalysing solution redox","MnO₂ in H₂O₂ decomposition as a solid","Platinum surface only"],correctIndex:1,explanation:"Dissolved ions catalysing solution chemistry."},
    {id:"chem-T16-032",question:"Catalyst poison on a surface catalyst works by:",options:["Increasing active area","Blocking active sites","Raising ΔH","Making Ea infinite for all molecules"],correctIndex:1,explanation:"Active sites become unavailable."},
    {id:"chem-T16-033",question:"For many reactions, doubling concentration doubles rate → suggests overall order with respect to that species of:",options:["Zero","First","Second","Third"],correctIndex:1,explanation:"Rate ∝ [A]¹ (first order in A)."},
    {id:"chem-T16-034",question:"Increasing pressure speeds gas-phase reactions mainly by:",options:["Increasing concentration of gases","Making gases ideal","Removing activation energy","Cooling the system"],correctIndex:1,explanation:"Higher P → more moles per dm³ → more collisions."},
    {id:"chem-T16-035",question:"Quenching (e.g. cooling/diluting) a sample withdrawn from a reaction is done to:",options:["Speed the reaction for fun","Stop or slow reaction before analysis","Remove all products","Heat the titration"],correctIndex:1,explanation:"Freeze composition for titration."},
    {id:"chem-T16-036",question:"Enzymes increase rate but can denature at high T because:",options:["They become stronger oxidants","The protein structure unfolds so the active site is lost","They always precipitate as noble metals","They raise activation energy"],correctIndex:1,explanation:"Shape-specific catalysis is lost when the enzyme unfolds."},
    {id:"chem-T16-201",question:"For A + B → products, if halving [A] halves the rate, the order in A is:",options:["Zero","First","Second","Third"],correctIndex:1,explanation:"Rate ∝ [A]¹."},
    {id:"chem-T16-202",question:"A reaction with a large activation energy compared to a similar reaction will typically:",options:["Be faster at the same temperature","Be slower at the same temperature","Have the same rate always","Have zero rate"],correctIndex:1,explanation:"Fewer molecules exceed Ea."},
    {id:"chem-T16-203",question:"A Maxwell–Boltzmann distribution at higher temperature has:",options:["Fewer molecules with any energy","A broader spread; more molecules exceed a given Ea","The same shape exactly","Only one speed"],correctIndex:1,explanation:"Tail population increases."},
    {id:"chem-T16-204",question:"Catalyst increases rate without changing equilibrium constant because:",options:["It alters ΔH","It provides an alternative pathway with lower Ea for forward and reverse equally","It removes products","It shifts equilibrium to products only"],correctIndex:1,explanation:"K unchanged; rates both directions increase."},
    {id:"chem-T16-205",question:"Measuring initial rate avoids complications from:",options:["Temperature changes only","Reverse reaction becoming significant as products build up","Catalyst poisoning only","Reading the meniscus"],correctIndex:1,explanation:"Early time — nearly forward only."},
    {id:"chem-T16-206",question:"For a solid reacting with a solution, increasing stirring may increase rate by:",options:["Lowering Ea","Improving transport of reactants to the surface","Removing the need for collisions","Making the reaction zero order"],correctIndex:1,explanation:"Mass transfer / fresh solution at surface."},
    {id:"chem-T16-207",question:"In the iodine clock with thiosulfate, the sudden colour appears when:",options:["I₂ is produced instantly","Thiosulfate is consumed and free I₂ can accumulate to show with starch","Starch disappears","Temperature hits 100 °C"],correctIndex:1,explanation:"S₂O₃²⁻ scavenges I₂ until it runs out."},
    {id:"chem-T16-208",question:"Heterogeneous catalysis often involves:",options:["Reactants and catalyst in the same phase","Adsorption onto a solid surface","No surface area","Only enzymes"],correctIndex:1,explanation:"Surface catalysis."},
    {id:"chem-T16-209",question:"If a graph of rate vs [reactant] is a horizontal line, order in that reactant is:",options:["First","Zero","Second","Cannot tell"],correctIndex:1,explanation:"Rate independent of concentration."},
    {id:"chem-T16-301",question:"Marble chips (CaCO₃) react with dilute HCl. The rate is measured by mass loss per second. Which change would DECREASE the initial rate?",options:["Using smaller marble chips","Adding water to the acid (diluting it)","Raising the temperature","Using powdered marble"],correctIndex:1,explanation:"Diluting = fewer HCl particles per dm³ → fewer effective collisions → slower rate."},
    {id:"chem-T16-302",question:"Two rate graphs (volume CO₂ vs time) for marble + acid: same mass of marble, same acid amount. Curve A (powder) reaches the final volume faster than B (lumps), but both reach the SAME final volume because:",options:["A uses more acid","Both have same moles of CaCO₃ — only rate differs, not total amount","Powder creates more acid","Lumps keep reacting after powder stops"],correctIndex:1,explanation:"Surface area affects rate but not the amount of product (that depends on moles of limiting reagent)."},
    {id:"chem-T16-303",question:"A 10°C rise roughly doubles reaction rate. The molecular reason is:",options:["Molecules slow down at higher T","The fraction of molecules with energy ≥ Ea increases significantly — an exponential (Boltzmann) effect","Concentration doubles with T","Catalyst forms spontaneously"],correctIndex:1,explanation:"The high-energy tail of the Maxwell–Boltzmann distribution grows with temperature."},
    {id:"chem-T16-304",question:"In terms of collision theory, increasing pressure in a gas-phase reaction increases rate because:",options:["It raises activation energy","More gas molecules per unit volume → higher collision frequency → more effective collisions per second","Pressure lowers temperature","Molecules become more reactive individually"],correctIndex:1,explanation:"Higher pressure = higher concentration for gases → more frequent collisions."},
    {id:"chem-T16-305",question:"A catalyst is described as 'regenerated' at the end of a reaction. This means:",options:["It is consumed in making products","It is reformed unchanged and can catalyse further reactions — it does not appear in the overall equation","It is a reactant only","It lowers the amount of product"],correctIndex:1,explanation:"Catalyst provides an alternative pathway but is regenerated — net amount unchanged."},
    {id:"chem-T16-306",question:"Effervescent vitamin C tablets bubble faster in warm water than cold. In terms of particles, this is because:",options:["Warm water has fewer molecules","More water molecules and acid particles have energy ≥ Ea → more effective collisions per second","The tablet dissolves slower in warm water","Only surface area changes with temperature"],correctIndex:1,explanation:"Temperature → more particles exceed activation energy → faster reaction."},
    {id:"chem-T16-307",question:"An initial rate experiment: the gradient at t = 0 on a concentration-time graph gives the initial rate because:",options:["The gradient is zero at t=0","The gradient is steepest at the start when [reactant] is highest","The reaction stops at t=0","The graph is flat initially"],correctIndex:1,explanation:"Concentration is highest at the start → fastest rate; gradient = rate."},
    {id:"chem-T16-308",question:"Vacuum-sealed food packs have longer shelf lives partly because:",options:["Vacuum increases O₂ concentration","Removing O₂ and moisture prevents oxidation/decomposition reactions that spoil food","Vacuum increases temperature","Bacteria grow faster without O₂"],correctIndex:1,explanation:"Oxidation and aerobic bacterial spoilage require O₂ — removing it slows these reactions."}
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
