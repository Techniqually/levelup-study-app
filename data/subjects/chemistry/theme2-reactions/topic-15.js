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
                "$\Delta H \approx \sum E_{\text{broken}} - \sum E_{\text{formed}}$ (bond energy estimate)."
            ]
        },
        {
            "title": "Catalyst",
            "points": [
                "Lowers Ea; does not change ΔH.",
                "Speeds forward and reverse equally."
            ]
        }
    ,
    {
        "title": "Calorimetry & Energy Profiles",
        "points": [
            "$q = mc\\Delta T$ — heat (J); m = mass of water/solution (g); c = 4.18 J g⁻¹ K⁻¹; ΔT in K.",
            "Exothermic: products **lower** than reactants on diagram; $\\Delta H < 0$.",
            "Endothermic: products **higher** than reactants; $\\Delta H > 0$.",
            "Activation energy $E_a$ = peak height above reactants.",
            "Catalyst: **lowers $E_a$** (lower peak) but $\\Delta H$ and product/reactant levels unchanged.",
            "$\\Delta H \\approx \\sum E_{\\text{broken}} - \\sum E_{\\text{formed}}$ (bond energy method; endothermic step first)."
        ]
    }],
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
    ,
    { "front": "Calorimetry formula?", "back": "$q = mc\\Delta T$. c(water) = 4.18 J g⁻¹ K⁻¹. ΔT = T_final − T_initial." },
    { "front": "Exothermic: ΔH sign?", "back": "**Negative** (ΔH < 0). Heat released to surroundings → temperature of solution rises." },
    { "front": "Bond energy ΔH estimate?", "back": "$\\Delta H \\approx \\sum E_{\\text{broken}} - \\sum E_{\\text{formed}}$. Positive = endo; negative = exo." },
    { "front": "Standard ΔHf° of an element?", "back": "**Zero** by definition (reference state)." },
    { "front": "What does a catalyst do on an energy profile?", "back": "Lowers the activation energy peak — provides a **lower-energy alternative pathway**. ΔH unchanged." }],
    quiz: [
    {id:"chem-T15-001",question:"Exothermic:",options:["Products higher energy","Products lower energy than reactants","No energy change","Only light in"],correctIndex:1,explanation:"Heat released."},
    {id:"chem-T15-002",question:"Endothermic decomposition CaCO₃:",options:["Releases heat","Absorbs heat","No ΔH","Only physical"],correctIndex:1,explanation:"Needs strong heating."},
    {id:"chem-T15-003",question:"Catalyst effect on ΔH:",options:["Increases","Decreases","No change","Doubles"],correctIndex:2,explanation:"Only Ea."},
    {id:"chem-T15-004",question:"Bond forming:",options:["Endothermic","Exothermic","Zero","Only gas"],correctIndex:1,explanation:"Stability."},
    {id:"chem-T15-005",question:"Overall exothermic if:",options:["Bonds broken > formed energy","Bonds formed release more than break cost","Only catalyst","No bonds"],correctIndex:1,explanation:"Net downhill."},
    {id:"chem-T15-006",question:"Hand warmer iron oxidation:",options:["Endothermic","Exothermic","No reaction","Nuclear"],correctIndex:1,explanation:"Heat pack."},
    {id:"chem-T15-007",question:"Cold pack NH₄NO₃:",options:["Exothermic dissolving","Endothermic dissolving","No ΔH","Only gas"],correctIndex:1,explanation:"Absorbs heat."},
    {id:"chem-T15-008",question:"Ea is:",options:["Total ΔH","Barrier to reaction","Only product energy","Catalyst mass"],correctIndex:1,explanation:"Activation."},
    {id:"chem-T15-009",question:"Reverse reaction ΔH:",options:["Same as forward","Opposite sign","Always zero","Twice forward"],correctIndex:1,explanation:"Hess."},
    {id:"chem-T15-010",question:"Combustion methane sign:",options:["Positive ΔH","Negative ΔH","Zero","Undefined"],correctIndex:1,explanation:"Exothermic."},
    {id:"chem-T15-011",question:"Neutralisation strong acid-base:",options:["Strongly endothermic","Exothermic ~57 kJ/mol per mol water context","No heat","Only gas"],correctIndex:1,explanation:"Typical."},
    {id:"chem-T15-012",question:"Graph exothermic profile:",options:["Peak below products","Products below reactants energy","Flat","No peak"],correctIndex:1,explanation:"Downhill net."},
    {id:"chem-T15-013",question:"Enzyme:",options:["Raises ΔH","Lowers Ea","Changes equilibrium only","Consumes product"],correctIndex:1,explanation:"Biocatalyst."},
    {id:"chem-T15-014",question:"Fuel higher enthalpy density:",options:["More energy per kg","Less energy","No combustion","Only solid"],correctIndex:0,explanation:"Useful fuel."},
    {id:"chem-T15-015",question:"Hess cycle for enthalpy formation:",options:["Path dependent","Sum around cycle zero","Only gases","No numbers"],correctIndex:1,explanation:"Conservation."},
    {id:"chem-T15-016",question:"Bond energy O=O high means:",options:["Hard to break","Easy to break","No O₂","Liquid only"],correctIndex:0,explanation:"Strong bond."},
    {id:"chem-T15-017",question:"Explosion highly exothermic fast:",options:["Slow release","Rapid exothermic gas expansion","Endothermic","Only light"],correctIndex:1,explanation:"TNT etc."},
    {id:"chem-T15-018",question:"Photosynthesis light energy:",options:["Stored in products endothermic overall","Released fully","No storage","Only heat out"],correctIndex:0,explanation:"ΔH>0 overall."},
    {id:"chem-T15-019",question:"Respiration glucose:",options:["Exothermic","Endothermic","No redox","Only physical"],correctIndex:0,explanation:"Energy release."},
    {id:"chem-T15-020",question:"Dissolving NaOH in water:",options:["Cold","Heats up","No change","Freezes"],correctIndex:1,explanation:"Exothermic solvation."},
    {id:"chem-T15-021",question:"Sublimation iodine ΔH:",options:["Negative always","Positive","Zero","Only liquid"],correctIndex:1,explanation:"Endothermic."},
    {id:"chem-T15-022",question:"Activation energy without catalyst higher:",options:["Slower reaction","Faster","Same rate always","No reaction ever"],correctIndex:0,explanation:"Fewer successful collisions."},
    {id:"chem-T15-023",question:"ΔHf° element standard state:",options:["Zero","Always positive","Always negative","100 kJ"],correctIndex:0,explanation:"Reference."},
    {id:"chem-T15-024",question:"Combustion incomplete CO vs CO₂:",options:["CO releases more heat per C","CO₂ releases more complete combustion","Same","Neither exothermic"],correctIndex:1,explanation:"Complete more exothermic per C."},
    {id:"chem-T15-025",question:"Le Chatelier exothermic forward reaction low T:",options:["Favours products equilibrium","Favours reactants","No effect","Explodes"],correctIndex:0,explanation:"Heat as product."},
    {id:"chem-T15-026",question:"Calorimetry heat capacity (concept):",options:["q = mcΔT","Only volume","Only pressure","No formula"],correctIndex:0,explanation:"Specific heat."},
    {id:"chem-T15-027",question:"For an exothermic reaction, the enthalpy change ΔH is:",options:["Positive","Negative","Zero","Always +100 kJ"],correctIndex:1,explanation:"Products lower in enthalpy than reactants → heat released → ΔH < 0."},
    {id:"chem-T15-028",question:"Bond breaking is endothermic because:",options:["Energy is released when bonds break","Energy must be put in to overcome attractions","Bond breaking is always exothermic","Only ionic bonds break"],correctIndex:1,explanation:"Separating bonded atoms costs energy."},
    {id:"chem-T15-029",question:"A catalyst speeds a reaction by:",options:["Increasing ΔH of reaction","Providing a route with lower activation energy","Removing products completely","Shifting equilibrium to products only"],correctIndex:1,explanation:"More molecules have sufficient energy to react per collision."},
    {id:"chem-T15-030",question:"Hess’s law lets you calculate unknown ΔH by:",options:["Measuring only temperature","Constructing cycles where ΔH around a closed loop sums to zero","Ignoring states of matter","Doubling all coefficients without changing ΔH"],correctIndex:1,explanation:"Enthalpy is a state function — path independent."},
    {id:"chem-T15-031",question:"Standard enthalpy of formation of O₂(g) is defined as:",options:["+494 kJ/mol","0 kJ/mol","−494 kJ/mol","1 kJ/mol"],correctIndex:1,explanation:"Element in its standard state is the reference (zero)."},
    {id:"chem-T15-032",question:"Which process is typically most endothermic overall?",options:["Combustion of methane","Photosynthesis","Neutralisation of strong acid–base","Freezing of water"],correctIndex:1,explanation:"Light energy stored in products — overall ΔH > 0."},
    {id:"chem-T15-033",question:"Using bond energies, ΔH ≈ Σ(bonds broken) − Σ(bonds made). Why minus bonds made?",options:["Making bonds releases energy (exothermic step)","Making bonds always costs energy","Bonds made are ignored","It should be plus"],correctIndex:0,explanation:"Forming bonds stabilises the system — releases energy."},
    {id:"chem-T15-034",question:"Dissolving many ionic salts in water can be slightly endothermic yet spontaneous because:",options:["Only enthalpy matters","Entropy increase of mixing can drive the process (ΔG = ΔH − TΔS)","Water stops moving","Lattice enthalpy is always zero"],correctIndex:1,explanation:"For experts: Gibbs energy — O-level hint: disorder increases."},
    {id:"chem-T15-035",question:"Strong exothermic combustion releases energy mainly as:",options:["Only sound","Heat and light","Only magnetic fields","Mass increase"],correctIndex:1,explanation:"Exothermic reactions transfer energy to surroundings."},
    {id:"chem-T15-036",question:"For a reversible reaction that is exothermic in the forward direction, lowering temperature typically shifts equilibrium:",options:["Toward products (forward)","Toward reactants (reverse)","Not at all","Only if ΔH is zero"],correctIndex:0,explanation:"Cooling favours the exothermic direction (Le Chatelier — heat treated as a product)."},
    {id:"chem-T15-201",question:"For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔS (entropy change) is typically:",options:["Positive because more gas moles","Negative because gas moles decrease","Zero always","Positive only if H₂O is steam"],correctIndex:1,explanation:"3 gas → 1 gas — fewer gas molecules usually decreases entropy."},
    {id:"chem-T15-202",question:"A reaction with ΔH = −120 kJ/mol and small negative ΔS can still be spontaneous at room temperature if:",options:["T is always zero","ΔG = ΔH − TΔS is negative","ΔS alone decides everything","Only endothermic reactions are spontaneous"],correctIndex:1,explanation:"Gibbs — O-level hint: exothermic often dominates at moderate T."},
    {id:"chem-T15-203",question:"Bond energy data estimate ΔH by:",options:["Bonds made minus bonds broken","Bonds broken minus bonds made","Only catalyst mass","Only volume"],correctIndex:1,explanation:"ΔH ≈ Σ break − Σ make (sign convention)."},
    {id:"chem-T15-204",question:"Neutralisation of strong acid + strong base in dilute solution has ΔH about:",options:["+57 kJ per mol water","−57 kJ per mol water (exothermic)","0 kJ","+500 kJ"],correctIndex:1,explanation:"Standard exothermic neutralisation magnitude (context)."},
    {id:"chem-T15-205",question:"Photosynthesis stores energy mainly as:",options:["Heat only","Chemical potential energy in products","Kinetic energy of N₂","Electrical energy in lightning"],correctIndex:1,explanation:"Endothermic — light energy converted to chemical energy."},
    {id:"chem-T15-206",question:"When anhydrous CuSO₄ turns blue on adding water, the process is:",options:["Always endothermic","Often exothermic (hydration)","Never releases heat","Only physical with no energy change"],correctIndex:1,explanation:"Hydration can be noticeably exothermic."},
    {id:"chem-T15-207",question:"Activation energy is best described as:",options:["The overall ΔH of reaction","The minimum energy needed for a successful collision leading to product","The heat released at equilibrium","The energy of products only"],correctIndex:1,explanation:"Ea definition."},
    {id:"chem-T15-208",question:"Hess’s law works because enthalpy is:",options:["Path-dependent","A state function (path independent)","Always zero","Only defined for gases"],correctIndex:1,explanation:"State function — cycles sum to zero."},
    {id:"chem-T15-209",question:"Incomplete combustion of hydrocarbons can produce CO because:",options:["Oxygen is in excess always","Limited O₂ favours partial oxidation to CO","CO has lower bond energy than CO₂ always","Water cannot form"],correctIndex:1,explanation:"Fuel-rich / limited oxygen conditions."},
    {id:"chem-T15-301",question:"Dissolving solid NaOH pellets in water makes the water warm. This dissolving is:",options:["Endothermic","Exothermic — hydration of ions releases more energy than lattice energy absorbed","A physical change with no energy","Only fast, not thermochemical"],correctIndex:1,explanation:"Exothermic dissolution: $\\Delta H_{\\text{sol}} < 0$. Heat released to surroundings."},
    {id:"chem-T15-302",question:"Boiling water ($\\text{H}_2\\text{O}(l) \\to \\text{H}_2\\text{O}(g)$) is endothermic because:",options:["Energy is released when molecules separate","Energy must be absorbed to overcome hydrogen bonds and separate water molecules","Boiling produces CO₂","Water molecules are destroyed"],correctIndex:1,explanation:"Breaking intermolecular hydrogen bonds requires energy input → endothermic."},
    {id:"chem-T15-303",question:"Using bond energies: H–H = 436, Cl–Cl = 242, H–Cl = 431 kJ/mol. For H₂ + Cl₂ → 2HCl, $\\Delta H \\approx$:",options:["+678 kJ/mol","+862 kJ/mol","−184 kJ/mol","+184 kJ/mol"],correctIndex:2,explanation:"$\\Delta H \\approx (436+242) - 2 \\times 431 = 678 - 862 = -184$ kJ/mol. Exothermic."},
    {id:"chem-T15-304",question:"An energy profile shows a catalyst lowers the activation energy. The $\\Delta H$ of the reaction:",options:["Becomes less negative with catalyst","Stays exactly the same — catalyst only provides alternate lower-Ea pathway","Increases","Becomes zero"],correctIndex:1,explanation:"Catalyst speeds up by lowering Ea; reactant and product energy levels (hence $\\Delta H$) are unchanged."},
    {id:"chem-T15-305",question:"A cold pack contains NH₄NO₃ and water. When activated, it feels cold because:",options:["NH₄NO₃ combusts","Dissolving NH₄NO₃ is endothermic — heat absorbed from hand/surroundings","The pack contains ice","CO₂ is released"],correctIndex:1,explanation:"Endothermic dissolution: absorbs heat from surroundings → cooling effect."},
    {id:"chem-T15-306",question:"Condensation of steam into liquid water releases heat because:",options:["Bond breaking is exothermic","Forming intermolecular bonds (hydrogen bonds) releases energy","Condensation is always endothermic","Only ionic bonds release energy"],correctIndex:1,explanation:"Bond/interaction forming = exothermic. Condensation releases the same energy as boiling absorbed."},
    {id:"chem-T15-307",question:"Hess's law states that the total enthalpy change is independent of the route because:",options:["All reactions have the same rate","Enthalpy is a state function — depends only on initial and final states","ΔH is always zero","Temperature is always 25°C"],correctIndex:1,explanation:"State function: path does not matter. Energy of reactants and products fixed → $\\sum \\Delta H$ around cycle = 0."},
    {id:"chem-T15-308",question:"Reaction profile: reactants at 200 kJ, peak at 280 kJ, products at 120 kJ. The activation energy Ea and $\\Delta H$ are:",options:["Ea = 80 kJ; $\\Delta H$ = −80 kJ","Ea = 80 kJ; $\\Delta H$ = −80 kJ","Ea = 80 kJ (280−200); $\\Delta H$ = −80 kJ (120−200)","Ea = 160 kJ; $\\Delta H$ = +80 kJ"],correctIndex:2,explanation:"$E_a = 280 - 200 = 80$ kJ; $\\Delta H = 120 - 200 = -80$ kJ (exothermic)."}
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
