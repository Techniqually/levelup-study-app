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
    ,
    {
        "title": "Rust & Prevention",
        "points": [
            "**Rusting** requires **both O₂ and H₂O** (electrochemical). Salt water accelerates it.",
            "Rust = hydrated iron(III) oxide $\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O}$.",
            "**Barrier methods**: paint, oil, plastic coat, tin plating (stops when scratched).",
            "**Galvanising** (Zn coat): barrier + sacrificial anode even when scratched.",
            "**Sacrificial anode**: Zn or Mg block corrodes preferentially (more reactive than Fe).",
            "**Alloying**: stainless steel (Cr, Ni) forms passive Cr₂O₃ layer."
        ]
    }],
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
    ,
    { "front": "Metal + cold water → products?", "back": "**Metal hydroxide + H₂** (e.g. 2K + 2H₂O → 2KOH + H₂↑)." },
    { "front": "Metal + dilute acid → products?", "back": "**Metal salt + H₂** (e.g. Zn + H₂SO₄ → ZnSO₄ + H₂↑). Only metals above H." },
    { "front": "Extraction method for Al?", "back": "**Electrolysis of molten Al₂O₃** (cryolite lowers mp). Carbon cannot reduce Al₂O₃." },
    { "front": "Why scratched tin-plated steel rusts fast?", "back": "Tin is *below* Fe in series → Fe becomes anode in electrochemical cell → Fe rusts rapidly." },
    { "front": "Thermite reaction?", "back": "Al + Fe₂O₃ → Al₂O₃ + Fe. Al is more reactive → **displaces** Fe from its oxide. Very exothermic." }],
    quiz: [
    {id:"chem-T14-001",question:"Displaces Cu from CuSO₄:",options:["Ag","Zn","Au","Pt"],correctIndex:1,explanation:"Zn above Cu."},
    {id:"chem-T14-002",question:"No reaction with cold water:",options:["Na","K","Ca","Mg"],correctIndex:3,explanation:"Mg very slow cold."},
    {id:"chem-T14-003",question:"Most reactive listed:",options:["Au","K","Cu","Ag"],correctIndex:1,explanation:"Top of series."},
    {id:"chem-T14-004",question:"H₂ from dilute HCl:",options:["Cu","Fe","Ag","Au"],correctIndex:1,explanation:"Fe above H."},
    {id:"chem-T14-005",question:"Thermite Al + Fe₂O₃:",options:["Al oxidised","Fe oxidised","O₂ product","No heat"],correctIndex:0,explanation:"Al reduces Fe."},
    {id:"chem-T14-006",question:"Carbon cannot reduce at high T:",options:["ZnO","Al₂O₃","Fe₂O₃","PbO"],correctIndex:1,explanation:"Al too reactive — electrolysis."},
    {id:"chem-T14-007",question:"Sacrificial anode for iron ship:",options:["Cu","Zn","Ag","Sn"],correctIndex:1,explanation:"Zn more reactive."},
    {id:"chem-T14-008",question:"Native metal likely:",options:["Na","Au","Mg","Al"],correctIndex:1,explanation:"Unreactive."},
    {id:"chem-T14-009",question:"Fe + Sn²⁺:",options:["Fe²⁺ + Sn","No reaction","Fe³⁺ only","Sn + Fe"],correctIndex:0,explanation:"Fe above Sn displaces."},
    {id:"chem-T14-010",question:"Cu + AgNO₃:",options:["No reaction","Cu²⁺ + Ag","Cu + Ag only solid","Gas"],correctIndex:1,explanation:"Cu above Ag."},
    {id:"chem-T14-011",question:"Metal oxide most easily reduced by H₂:",options:["Na₂O","CuO","Al₂O₃","MgO"],correctIndex:1,explanation:"Lower in series easier reduce."},
    {id:"chem-T14-012",question:"Blast furnace iron ore reduced by:",options:["Only H₂","CO/C","Al","Electrons only"],correctIndex:1,explanation:"Reductants."},
    {id:"chem-T14-013",question:"Why Al resists corrosion:",options:["Oxide layer","No oxide","Liquid","Gold coat"],correctIndex:0,explanation:"Al₂O₃ passive."},
    {id:"chem-T14-014",question:"Mg + steam:",options:["No reaction","MgO + H₂","MgH₂ only","Explodes always"],correctIndex:1,explanation:"Hot."},
    {id:"chem-T14-015",question:"Pb + HCl dilute:",options:["Fast H₂","Slow/no simple H₂","Cl₂","PbCl₂ insoluble coats"],correctIndex:3,explanation:"Insoluble chloride layer."},
    {id:"chem-T14-016",question:"Silver in HNO₃ conc:",options:["No reaction","Dissolves (redox)","Only H₂","Heats only"],correctIndex:1,explanation:"Oxidising acid."},
    {id:"chem-T14-017",question:"Order Zn Fe Cu reactivity:",options:["Zn>Fe>Cu","Cu>Fe>Zn","Fe>Zn>Cu","Same"],correctIndex:0,explanation:"Series."},
    {id:"chem-T14-018",question:"Hydrogen in series is reference for:",options:["Halogen displacement","Acid-metal","Precipitation","Titration"],correctIndex:1,explanation:"H₂ liberation."},
    {id:"chem-T14-019",question:"Rusting needs:",options:["Dry O₂ only","O₂ + H₂O","Only N₂","Only salt never"],correctIndex:1,explanation:"Electrochemical."},
    {id:"chem-T14-020",question:"Zinc-coated steel scratched:",options:["Zn still protects Fe cathodically","Fe rusts immediately fast","Cu needed","No effect"],correctIndex:0,explanation:"Sacrificial."},
    {id:"chem-T14-021",question:"Metal extracted by electrolysis molten:",options:["Fe","Al","Cu","Pb"],correctIndex:1,explanation:"Very reactive."},
    {id:"chem-T14-022",question:"Carbon reduces PbO on heating:",options:["Yes often","Never","Only liquid","Only with Pt"],correctIndex:0,explanation:"Below Al in series."},
    {id:"chem-T14-023",question:"Gold jewellery alloy:",options:["Pure always","Cu added hardness","Na added","Cl added"],correctIndex:1,explanation:"Hardness."},
    {id:"chem-T14-024",question:"Fe + acid → Fe²⁺ or Fe³⁺ dilute:",options:["Fe²⁺ typically","Fe³⁺ always","Fe⁰","No ions"],correctIndex:0,explanation:"Dilute HCl."},
    {id:"chem-T14-025",question:"Metal + water steam general gp1:",options:["Hydroxide + H₂","Only oxide","No reaction","Only O₂"],correctIndex:0,explanation:"Alkali metals."},
    {id:"chem-T14-026",question: "Four unknown metals W, X, Y, and Z are tested. \n- W displaces X from a solution of X nitrate.\n- Z reacts violently with cold water, while W only reacts with steam.\n- Y does not react with dilute hydrochloric acid.\nWhat is the correct order of reactivity, from most reactive to least reactive?",options: ["Z > W > X > Y","Z > X > W > Y","Y > X > W > Z","W > Z > Y > X"],correctIndex: 0,explanation: "Z reacts with cold water (most reactive). W reacts with steam (less reactive than Z). W displaces X (W > X). Y doesn't react with acid (least reactive, below hydrogen). Thus, Z > W > X > Y."},
    {id:"chem-T14-027",question:"Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) happens because:",options:["Cu is more reactive than Zn","Zn is more reactive than Cu","Both are equally reactive","Cu oxidises Zn"],correctIndex:1,explanation:"Zn is higher in the series — displaces Cu²⁺."},
    {id:"chem-T14-028",question:"Why does aluminium resist corrosion in air despite being very reactive?",options:["It cannot oxidise","A stable surface Al₂O₃ layer protects the metal","It is a noble metal","Water dissolves aluminium instantly"],correctIndex:1,explanation:"Passivation by oxide film."},
    {id:"chem-T14-029",question:"Iron rusting is accelerated by salt water mainly because:",options:["Salt removes oxygen","Ions increase electrolyte conductivity for electrochemical corrosion","NaCl reacts with Fe to make Au","Salt raises bp only"],correctIndex:1,explanation:"Better ionic conduction speeds electron-transfer steps."},
    {id:"chem-T14-030",question:"Carbon cannot reduce Al₂O₃ in a blast furnace to make Al because:",options:["Al is more reactive than carbon (Al₂O₃ very stable)","Al is below carbon in the series","Al is a gas","Carbon only reduces halogens"],correctIndex:0,explanation:"Very reactive metals need electrolysis."},
    {id:"chem-T14-031",question:"When Fe displaces Cu²⁺, Fe is:",options:["Reduced","Oxidised","A spectator","Always Fe³⁺"],correctIndex:1,explanation:"Fe → Fe²⁺ loses electrons."},
    {id:"chem-T14-032",question:"Gold is often found native because:",options:["It reacts with all acids","It is very unreactive","It floats on water","It only forms sulfides"],correctIndex:1,explanation:"Low down the series — does not easily corrode."},
    {id:"chem-T14-033",question:"Galvanising (zinc coating) protects steel even when scratched because:",options:["Zn is anodic and corrodes preferentially","Zn is cathodic to Fe always","Steel becomes noble","Paint does all the work"],correctIndex:0,explanation:"Sacrificial protection."},
    {id:"chem-T14-034",question:"Pb with cold dilute HCl often gives little H₂ because:",options:["Pb is above hydrogen","Insoluble PbCl₂ can coat the metal and slow/stop reaction","Pb is not a metal","HCl is always dry"],correctIndex:1,explanation:"Kinetic barrier from surface coating."},
    {id:"chem-T14-035",question:"Thermite (Al + Fe₂O₃) releases a lot of heat because:",options:["Al is reduced","Highly exothermic redox forming Al₂O₃ and Fe","It is endothermic","No redox occurs"],correctIndex:1,explanation:"Al reduces iron oxide very exothermically."},
    {id:"chem-T14-036",question:"In extraction, a metal high in the reactivity series typically needs:",options:["Only carbon reduction","Electrolysis of molten compounds","Heating in air only","Dissolving in water"],correctIndex:1,explanation:"Very stable oxides — electrolytic routes."},
    {id:"chem-T14-037",question: "Which of the following methods of rust prevention relies on 'sacrificial protection'?",options: ["Painting a steel bridge","Coating a food can with a layer of tin","Attaching blocks of magnesium to the steel hull of a ship","Applying grease to a bicycle chain"],correctIndex: 2,explanation: "Magnesium is more reactive than iron. It acts as a sacrificial anode, corroding in place of the iron. Painting, greasing, and tin-plating are purely barrier methods."},
    {id:"chem-T14-038",question:"In blast furnace reduction, iron(III) oxide is reduced mainly by:",options:["Hydrogen","Carbon monoxide","Calcium oxide","Steam"],correctIndex:1,explanation:"Coke burns to form carbon monoxide gas, which acts as the primary reducing agent to convert iron(III) oxide into molten iron."},
    {id:"chem-T14-201",question:"When Mg ribbon is placed in CuSO₄(aq), the blue colour fades mainly because:",options:["Cu²⁺ is reduced to Cu(s) and Mg is oxidised","Mg dissolves without redox","Water evaporates","Cu²⁺ is oxidised"],correctIndex:0,explanation:"Mg displaces Cu²⁺ — redox."},
    {id:"chem-T14-202",question:"Iron nails in copper(II) sulfate solution will:",options:["Deposit Cu and Fe²⁺ forms (if Fe displaces Cu²⁺)","Never react","Make Cl₂","Only rust without Cu"],correctIndex:0,explanation:"Fe above Cu — displacement."},
    {id:"chem-T14-203",question:"Rusting of iron requires both:",options:["Only dry air","Oxygen and water (electrochemical cell on surface)","Only pure nitrogen","Only heat with no O₂"],correctIndex:1,explanation:"Classic rust conditions."},
    {id:"chem-T14-204",question:"Sacrificial protection of steel pipes uses a metal that is:",options:["Less reactive than iron","More reactive than iron (e.g. Zn, Mg)","Exactly as reactive as carbon","A noble gas"],correctIndex:1,explanation:"Anode corrodes instead of Fe."},
    {id:"chem-T14-205",question:"Blast furnace iron production uses CO mainly as a:",options:["Catalyst only","Reducing agent for iron oxide","Oxidising agent for water","Coolant only"],correctIndex:1,explanation:"C/CO reduces Fe₂O₃."},
    {id:"chem-T14-206",question:"Why is cryolite used with molten Al₂O₃ in aluminium extraction?",options:["It is the aluminium ore","It lowers the working temperature of the melt","It removes all oxygen without current","It makes Al unreactive"],correctIndex:1,explanation:"Flux — lowers mp / dissolves alumina."},
    
    {id:"chem-T14-208",question:"Stainless steel resists rust better than plain carbon steel mainly because:",options:["It contains chromium that forms a passive oxide layer","It has no iron","It cannot conduct electricity","It is pure copper"],correctIndex:0,explanation:"Cr₂O₃ passive layer."},
    {id:"chem-T14-209",question:"If a student adds Sn to Pb²⁺(aq), Sn is:",options:["Reduced because Sn is less reactive","Oxidised to Sn²⁺ if Sn is more reactive than Pb","Unchanged always","A catalyst only"],correctIndex:1,explanation:"More reactive metal displaces less reactive ion."},
    {id:"chem-T14-301",question:"Potassium reacts vigorously with cold water. The products are:",options:["K₂O + H₂","KOH(aq) + H₂(g)","KCl + H₂","K₂SO₄ + O₂"],correctIndex:1,explanation:"2K + 2H₂O → 2KOH + H₂. Group 1 metals produce metal hydroxide + hydrogen."},
    {id:"chem-T14-302",question:"Magnesium reacts with steam but not cold water because:",options:["Mg is less reactive than water","Steam provides enough energy to overcome Mg's surface oxide layer — reaction: Mg + H₂O(g) → MgO + H₂","Cold water dissolves Mg instantly","Mg is below hydrogen"],correctIndex:1,explanation:"Mg's reactivity with water requires steam; Ca reacts with cold water."},
    {id:"chem-T14-303",question:"From the reactivity series, which metals can be extracted by reduction with carbon (not electrolysis)?",options:["K, Na, Ca, Al","Zn, Fe, Pb (below Al but above Cu)","Cu, Ag, Au (too unreactive, easily reduced)","Only Cu"],correctIndex:1,explanation:"Carbon is practical for metals below Al in the series (Zn, Fe, Pb); those above Al need electrolysis."},
    {id:"chem-T14-304",question:"When iron filings are placed in copper(II) sulfate solution, visible evidence of reaction includes:",options:["Solution turns colourless and no solid forms","Blue colour fades; red/brown copper coats the iron","Yellow gas evolves","White precipitate forms"],correctIndex:1,explanation:"Fe displaces Cu²⁺: Fe + CuSO₄ → FeSO₄ + Cu. Blue Cu²⁺ replaced by pale green Fe²⁺; red Cu deposits."},
    {id:"chem-T14-305",question:"Oil is applied to the moving parts of a machine to prevent rusting mainly by:",options:["Providing extra oxygen","Forming a barrier that excludes water and oxygen from the iron surface","Acting as a reducing agent","Adding electrons to iron"],correctIndex:1,explanation:"Barrier method: excludes H₂O and O₂ needed for electrochemical rusting."},
    {id:"chem-T14-306",question:"Calcium metal reacts with cold water to give Ca(OH)₂ + H₂. Calcium is placed above magnesium in the reactivity series because:",options:["Ca is denser than Mg","Ca reacts more vigorously — cold water vs only steam for Mg","Ca has fewer electrons","Mg is radioactive"],correctIndex:1,explanation:"Relative vigour with water and acids places Ca above Mg in the series."},
    {id:"chem-T14-307",question:"Gold and silver are found as native metals in nature because:",options:["They are radioactive and decay from other metals","They are very unreactive — low position in series means oxides easily reduced / rarely form stable compounds","They are allotropes of carbon","Water dissolves their ores"],correctIndex:1,explanation:"Low reactivity → not easily oxidised → found uncombined."},
    {id:"chem-T14-308",question:"In the thermite reaction: Al + Fe₂O₃ → Al₂O₃ + Fe, which is the oxidising agent?",options:["Al","Fe₂O₃ (Fe³⁺ is reduced to Fe)","O₂ gas added separately","H₂O"],correctIndex:1,explanation:"Fe₂O₃ oxidises Al (Al is oxidised); Fe³⁺ gains electrons (is reduced). Fe₂O₃ = oxidising agent."}
    ],
    extendedQuestions: [
        {
            id: "chem-T14-E01",
            commandWord: "Evaluate",
            marks: 6,
            syllabusNote: "Reactivity Series - Rusting conditions and prevention.",
            prompt: "Three test tubes are set up to investigate the rusting of iron nails.\n- **Tube A**: Iron nail in tap water, open to the air.\n- **Tube B**: Iron nail in boiled water, with a layer of oil on top.\n- **Tube C**: Iron nail in tap water containing dissolved sodium chloride, open to the air.\n\n(a) Explain the purpose of boiling the water and adding the oil layer in Tube B.\n(b) State and explain the observation in Tube B after one week.\n(c) Compare the expected rate of rusting in Tube A and Tube C after one week. Explain your reasoning.",
            rubric: [
                "(a) Boiling the water removes **dissolved oxygen**.",
                "(a) The oil layer prevents **oxygen from the air from dissolving** back into the water.",
                "(b) Observation: **No rust** is formed.",
                "(b) Explanation: Rusting requires **both oxygen and water**; Tube B lacks oxygen.",
                "(c) Comparison: Tube C will rust **much faster** than Tube A.",
                "(c) Explanation: The dissolved sodium chloride (salt) acts as an electrolyte, which **accelerates the electrochemical rusting process**."
            ],
            modelAnswer: "(a) Boiling the water drives out any dissolved air/oxygen. The layer of oil acts as a barrier to prevent atmospheric oxygen from re-dissolving into the water.\n\n(b) After one week, the nail in Tube B will have **no rust**. Rusting is an oxidation process that requires the simultaneous presence of both water and oxygen. Because Tube B has no oxygen, rusting cannot occur.\n\n(c) The nail in Tube C will rust **much faster** and more extensively than the nail in Tube A. While both tubes have water and oxygen, Tube C contains dissolved sodium chloride. The salt provides mobile ions that increase the electrical conductivity of the water, greatly accelerating the electrochemical rusting process."
        },
        {
            id: "chem-T14-E02",
            commandWord: "Deduce",
            marks: 4,
            syllabusNote: "Reactivity Series - Extraction of metals using carbon.",
            prompt: "Lead can be extracted from its ore, lead(II) oxide ($PbO$), by heating it strongly with carbon in a furnace. However, aluminium cannot be extracted from aluminium oxide ($Al_2O_3$) using this method.\n\n(a) Write a balanced chemical equation for the extraction of lead using carbon.\n(b) Using the reactivity series, explain why carbon can reduce lead(II) oxide but cannot reduce aluminium oxide.",
            rubric: [
                "(a) Equation: **$2PbO(s) + C(s) \\rightarrow 2Pb(s) + CO_2(g)$** (or forming CO).",
                "(b) Carbon is positioned **above lead** in the reactivity series, so it is reactive enough to displace/reduce lead.",
                "(b) Carbon is positioned **below aluminium** in the reactivity series.",
                "(b) Therefore, carbon is **not reactive enough** to reduce the very stable aluminium oxide."
            ],
            modelAnswer: "(a) $2PbO(s) + C(s) \\rightarrow 2Pb(s) + CO_2(g)$\n\n(b) In the reactivity series, carbon is positioned above lead but below aluminium. Because carbon is more reactive than lead, it can successfully reduce lead(II) oxide to extract the metal. However, because aluminium is highly reactive, aluminium oxide is extremely stable. Carbon is less reactive than aluminium and therefore cannot remove the oxygen from aluminium oxide."
        }
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
