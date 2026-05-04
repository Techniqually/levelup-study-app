(function () {
  window.__registerTopic({
    id: "11",
    theme: "Theme 2: Chemical Reactions",
    title: "Oxidation and Reduction",
    cheatBlocks: [
        {
            "title": "Definitions",
            "points": [
                "OIL RIG — oxidation is loss of electrons.",
                "Oxidising agent is reduced; reducing agent oxidised.",
                "Gain O / loss H often oxidation (inorganic shortcuts)."
            ]
        },
        {
            "title": "Examples",
            "points": [
                "Halogen displacement: more reactive halogen displaces lower.",
                "Metal displacement: higher in series displaces lower ions."
            ]
        }
    ,
    {
        "title": "Oxidation State Rules",
        "points": [
            "**Uncombined element** = 0 (e.g. Fe, O₂, Cl₂).",
            "**Simple ion** = ion charge (Na⁺ = +1; Cl⁻ = −1; Fe²⁺ = +2).",
            "**O in compounds** = −2 (except peroxides e.g. H₂O₂: −1).",
            "**H in compounds** = +1 (except metal hydrides e.g. NaH: −1).",
            "Sum in **neutral compound** = 0; sum in **polyatomic ion** = charge.",
            "Example: Cr in CrO₄²⁻: $x + 4(-2) = -2 \\Rightarrow x = +6$."
        ]
    },
    { 
        "title": "Testing for Oxidising & Reducing Agents", 
        "points": [ 
            " **Test for Reducing Agents**: Add acidified potassium manganate(VII) ($KMnO_4$). It acts as an oxidising agent. If a reducing agent is present, the purple solution turns **colourless** ($Mn^{7+} \\rightarrow Mn^{2+}$).",
            " **Test for Oxidising Agents**: Add aqueous potassium iodide ($KI$). It acts as a reducing agent. If an oxidising agent is present, the colourless solution turns **brown** ($2I^- \\rightarrow I_2$)." 
        ] 
    }
    ],
    infographics: [ 
        { image: "data/subjects/chemistry/images/reactions-06-redox.jpg", caption: "Redox: electron transfer and OIL RIG" },
        { image: "data/subjects/chemistry/images/topic-11-infographic.png", caption: "Oxidation and Reduction Infographic" }
    ],
    flashcards: [
        {
            "front": "Oxidising agent?",
            "back": "Gains electrons (reduced)."
        },
        {
            "front": "Cl₂ + Br⁻?",
            "back": "Br₂ + Cl⁻."
        },
        {
            "front": "Combustion Mg?",
            "back": "Mg oxidised, O₂ reduced."
        },
        {
            "front": "Acidified MnO₄⁻ colour change?",
            "back": "Purple → colourless (Mn²⁺)."
        },
        {
            "front": "Half-equation balance?",
            "back": "Atoms then charge with e⁻."
        },
        {
            "front": "Disproportionation?",
            "back": "Same element oxidised and reduced."
        },
        {
            "front": "Fuel cell?",
            "back": "Redox produces electrical energy."
        },
        {
            "front": "Corrosion iron?",
            "back": "Oxidation Fe → rust."
        },
        {
            "front": "Sacrificial Zn?",
            "back": "Zn oxidises instead of Fe."
        },
        {
            "front": "Bleach oxidises?",
            "back": "ClO⁻ oxidising."
        },
        {
            "front": "Photosynthesis redox?",
            "back": "CO₂ reduced, H₂O oxidised."
        },
        {
            "front": "Highest oxidation state Mn in MnO₄⁻?",
            "back": "+7."
        },
        {
            "front": "Gain electrons is?",
            "back": "Reduction."
        }
    ,
    { "front": "Oxidation state of O in compounds?", "back": "Usually **−2** (except peroxides: −1; OF₂: +2)." },
    { "front": "Oxidation state of H in compounds?", "back": "Usually **+1** (except metal hydrides: −1)." },
    { "front": "Cr in Cr₂O₇²⁻?", "back": "$2x + 7(-2) = -2 \\Rightarrow 2x = +12 \\Rightarrow x = +6$." },
    { "front": "MnO₄⁻: oxidation state of Mn?", "back": "$x + 4(-2) = -1 \\Rightarrow x = +7$." },
    { "front": "Oxidising agent = ?", "back": "**Gains** electrons (is **reduced**). e.g. MnO₄⁻, Cl₂, O₂." },
    { "front": "Reducing agent = ?", "back": "**Loses** electrons (is **oxidised**). e.g. Fe, CO, SO₂." },
    { "front": "What is the test for an oxidising agent?", "back": "Add aqueous potassium iodide (KI). It will turn from colourless to brown as iodide ions are oxidised to iodine." },
    { "front": "What is the test for a reducing agent?", "back": "Add acidified potassium manganate(VII). It will turn from purple to colourless as $Mn^{7+}$ is reduced to $Mn^{2+}$." }

    ],

    quiz: [
    {id:"chem-T11-001",question:"In Zn + Cu²⁺ → Zn²⁺ + Cu, oxidising agent:",options:["Zn","Cu²⁺","Zn²⁺","Cu"],correctIndex:1,explanation:"Cu²⁺ reduced."},
    {id:"chem-T11-002",question:"Oxidation is:",options:["Gain e⁻","Loss e⁻","Gain H","Loss O"],correctIndex:1,explanation:"OIL."},
    {id:"chem-T11-003",question:"Cl₂ + 2I⁻ → 2Cl⁻ + I₂: oxidised:",options:["Cl⁻","I⁻","Cl₂","I₂"],correctIndex:1,explanation:"I⁻ to I₂."},
    {id:"chem-T11-004",question:"Which is reduced in Fe₂O₃ + 3CO → 2Fe + 3CO₂:",options:["Fe in oxide","C in CO","O only","None"],correctIndex:0,explanation:"Fe +3→0."},
    {id:"chem-T11-005",question:"Reducing agent in same:",options:["Fe₂O₃","CO","CO₂","Fe"],correctIndex:1,explanation:"CO oxidised to CO₂."},
    {id:"chem-T11-006",question:"Half-equation Fe²⁺ → Fe³⁺:",options:["+ e⁻","- e⁻","+2H⁺","No change"],correctIndex:1,explanation:"Loses electron."},
    {id:"chem-T11-007",question:"Acidified MnO₄⁻ + Fe²⁺:",options:["Fe oxidised","Fe reduced only","No reaction","Only Mn oxidised"],correctIndex:0,explanation:"Fe²⁺→Fe³⁺."},
    {id:"chem-T11-008",question:"More reactive halogen displaces:",options:["Higher halide from solution","Lower halogen from its halide","Water","Noble gases"],correctIndex:1,explanation:"Cl₂ + Br⁻."},
    {id:"chem-T11-009",question:"Oxidation state O in H₂O₂:",options:["-2","-1","0","+1"],correctIndex:1,explanation:"Peroxide."},
    {id:"chem-T11-010",question:"O in OF₂:",options:["-2","+2","-1","0"],correctIndex:1,explanation:"F more EN."},
    {id:"chem-T11-011",question:"Disproportionation Cl₂ + OH⁻ cold:",options:["Cl⁻ + ClO⁻","Only Cl⁻","Only ClO₃⁻","O₂"],correctIndex:0,explanation:"Cold dilute."},
    {id:"chem-T11-012",question:"N in NH₃:",options:["-3","+3","+5","0"],correctIndex:0,explanation:"H +1."},
    {id:"chem-T11-013",question:"S in SO₄²⁻:",options:["+4","+6","-2","0"],correctIndex:1,explanation:"Oxide sum."},
    {id:"chem-T11-014",question:"Balanced e⁻ in Cu + Ag⁺:",options:["Cu → Cu²⁺ +2e; Ag⁺ +e → Ag","1e each","No e⁻","3e"],correctIndex:0,explanation:"Stoichiometry 1Cu:2Ag."},
    {id:"chem-T11-015",question:"Internal combustion NOₓ:",options:["N₂ oxidised","N₂ + O₂ high T","Only fuel","H₂O"],correctIndex:1,explanation:"Fixation."},
    {id:"chem-T11-016",question:"Antioxidant vitamin C:",options:["Reducing agent","Oxidising","Catalyst","Inert"],correctIndex:0,explanation:"Reduces radicals."},
    {id:"chem-T11-017",question:"Electrolysis cathode is:",options:["Oxidation","Reduction","Both","Neither"],correctIndex:1,explanation:"Reduction."},
    {id:"chem-T11-018",question:"Galvanic cell anode:",options:["Oxidation","Reduction","No electron flow","Both"],correctIndex:0,explanation:"Electron source."},
    {id:"chem-T11-019",question:"Rust Fe oxidation state final hydrous oxide:",options:["0","+2","+3","-3"],correctIndex:2,explanation:"Fe(III) oxide hydroxide."},
    {id:"chem-T11-020",question:"H₂S reduces acidified dichromate:",options:["S oxidised","Cr oxidised","No redox","Only physical"],correctIndex:0,explanation:"S²⁻ → S."},
    {id:"chem-T11-021",question:"KMnO₄ is:",options:["Reducing agent","Oxidising agent","Catalyst only","Acid"],correctIndex:1,explanation:"Strong oxidant."},
    {id:"chem-T11-022",question:"Same element oxidation states in O₂:",options:["0","-2","+2","-1"],correctIndex:0,explanation:"Elemental."},
    {id:"chem-T11-023",question:"Combustion hydrocarbon C oxidised to:",options:["Always only CO","CO₂ if complete","Only C","H₂"],correctIndex:1,explanation:"Complete."},
    {id:"chem-T11-024",question:"Nitrate in acid with Cu:",options:["H₂","NOₓ gases","N₂ only","Cl₂"],correctIndex:1,explanation:"Oxidising acid."},
    {id:"chem-T11-025",question:"Balancing redox acidic MnO₄⁻ + C₂O₄²⁻:",options:["Electrons + H₂O + H⁺","Only heat","No H⁺","Only OH⁻"],correctIndex:0,explanation:"Acid medium."},
    {id:"chem-T11-026",question: "A few drops of aqueous potassium iodide are added to an unknown solution X. The mixture turns from colourless to brown. What can be deduced about solution X?",options: ["X is a strong reducing agent.","X is an oxidising agent.","X is a neutral oxide.","X is an alkali."],correctIndex: 1,explanation: "Potassium iodide is a reducing agent. The colourless iodide ions ($I^-$) are oxidised to brown iodine ($I_2$) by an oxidising agent."},
    {id:"chem-T11-027",question:"In 2Na + Cl₂ → 2NaCl, chlorine is:",options:["Oxidised only","Reduced","Neither","A catalyst"],correctIndex:1,explanation:"Cl goes from 0 to −1 (gains electrons)."},
    {id:"chem-T11-028",question:"Oxidation state of Cr in Cr₂O₇²⁻ is:",options:["+3","+6","+7","−2"],correctIndex:1,explanation:"2Cr + 7(−2) = −2 → Cr = +6."},
    {id:"chem-T11-029",question:"Which is the strongest oxidising agent in typical aqueous chemistry among:",options:["Na⁺(aq)","Cl⁻(aq)","Acidified MnO₄⁻(aq)","K⁺(aq)"],correctIndex:2,explanation:"Permanganate(VII) is a powerful oxidant under acidic conditions."},
    {id:"chem-T11-030",question:"Disproportionation means the same element:",options:["Always becomes a noble gas","Is both oxidised and reduced in one reaction","Never changes oxidation number","Only gains oxygen"],correctIndex:1,explanation:"One species splits into higher and lower oxidation states."},
    {id:"chem-T11-031",question:"In electrolysis, reduction occurs at the cathode because:",options:["It is positive in electrolysis","Electrons are supplied to species at the cathode","Anions always oxidise there","It is always the platinum terminal"],correctIndex:1,explanation:"Reduction is gain of electrons — cathode supplies electrons to cations."},
    {id:"chem-T11-032",question:"Fuel combustion of hydrocarbons is redox because:",options:["Only oxygen bonds break","Carbon is oxidised and O₂ is reduced","No electron transfer occurs","Water is always oxidised"],correctIndex:1,explanation:"Electron transfer between fuel and oxidant."},
    {id:"chem-T11-033",question:"The oxidising agent in Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂ is:",options:["Br⁻","Cl₂","Br₂","Cl⁻"],correctIndex:1,explanation:"Cl₂ is reduced (gains electrons) while oxidising Br⁻."},
    {id:"chem-T11-034",question: "In the reaction: $2FeCl_2(aq) + Cl_2(g) \\rightarrow 2FeCl_3(aq)$, what is the role of chlorine gas?",options: ["It acts as a catalyst.","It acts as a reducing agent because its oxidation state increases.","It acts as an oxidising agent because its oxidation state decreases from 0 to -1.","It is a spectator ion."],correctIndex: 2,explanation: "Chlorine goes from an oxidation state of 0 (in $Cl_2$) to -1 (in $Cl^-$). Because it gains electrons and is reduced, it acts as the oxidising agent."},
    {id:"chem-T11-035",question:"Why balance redox with H⁺ in acid and OH⁻ in alkali?",options:["To match charge and atoms in the medium","Because water has no role","To add colour only","To remove electrons"],correctIndex:0,explanation:"Half-equations must balance atoms and charge in the stated conditions."},
    {id:"chem-T11-036",question:"Corrosion of iron is fundamentally:",options:["Only physical wetting","Electrochemical redox with O₂ and H₂O","A single displacement of gold","Nuclear decay"],correctIndex:1,explanation:"Fe is oxidised; O₂ is reduced in rusting pathways."},
    {id:"chem-T11-037",question: "A compound has the formula $X_2(SO_4)_3$. What is the oxidation state of element X?",options: ["+2", "+3", "+6", "-2"],correctIndex: 1,explanation: "The sulfate ion ($SO_4^{2-}$) has a charge of -2. Three sulfate ions give a total charge of -6. Therefore, two X ions must have a total charge of +6, meaning each X is +3."},
    {id:"chem-T11-038",question:"Which observation is the most direct evidence of a redox reaction?",options:["Temperature decreases","Colourless solution turns cloudy","Oxidation state changes","A gas dissolves"],correctIndex:2,explanation:"Redox reactions are fundamentally defined by the transfer of electrons, which is measured by a change in oxidation states."},
    {id:"chem-T11-201",question:"In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, the oxidising agent is:",options:["Zn","Zn²⁺","Cu²⁺","Cu"],correctIndex:2,explanation:"Cu²⁺ is reduced (gains electrons) — it oxidises Zn."},
    {id:"chem-T11-202",question:"In a redox reaction, the species that reduces another is called the:",options:["Oxidising agent","Reducing agent","Catalyst only","Spectator ion"],correctIndex:1,explanation:"Reducing agent donates electrons."},
    {id:"chem-T11-203",question:"The oxidation number of O in H₂O₂ is:",options:["−2","−1","0","+1"],correctIndex:1,explanation:"Peroxide: O is −1 in H₂O₂."},
    {id:"chem-T11-204",question:"When MnO₄⁻ is reduced to Mn²⁺ in acidic solution, manganese:",options:["Gains electrons (decrease in oxidation number)","Loses electrons","Stays at +7","Forms Mn metal always"],correctIndex:0,explanation:"Reduction is gain of electrons — oxidation number decreases."},
    {id:"chem-T11-205",question:"In disproportionation of Cl₂ in cold dilute alkali (concept), chlorine:",options:["Is only oxidised","Is only reduced","Is both oxidised and reduced","Does not change oxidation state"],correctIndex:2,explanation:"Forms Cl⁻ and ClO⁻ (classic pattern)."},
    {id:"chem-T11-206",question:"A fuel cell converts chemical energy to electrical energy because:",options:["No redox occurs","Controlled redox separates electron flow at electrodes","Heat is stored in bonds only","Water is electrolysed"],correctIndex:1,explanation:"Spontaneous redox in a cell."},
    {id:"chem-T11-207",question:"When Fe²⁺ is oxidised to Fe³⁺, Fe is:",options:["Reduced","Oxidised","Neither","Always a catalyst"],correctIndex:1,explanation:"Loss of electrons — oxidation."},
    {id:"chem-T11-208",question:"The best reason to balance redox half-equations with H₂O and H⁺ in acid is:",options:["To add colour","To balance atoms and charges in the stated medium","To remove electrons","To make ΔH zero"],correctIndex:1,explanation:"Atom and charge conservation."},
    {id:"chem-T11-209",question:"In a blast furnace, CO reduces Fe₂O₃. Carbon in CO is:",options:["Oxidised","Reduced","Neither","Always +4"],correctIndex:0,explanation:"CO → CO₂ — carbon oxidation state increases."},
    {id:"chem-T11-301",question:"Food is packaged in nitrogen gas rather than air to prevent spoilage. The key reason is:",options:["Nitrogen is heavier than oxygen","Nitrogen is unreactive and does not oxidise food","Nitrogen makes the food taste better","Nitrogen lowers the pH inside the packet"],correctIndex:1,explanation:"N₂ is inert — it prevents oxidation reactions that would spoil the food."},
    {id:"chem-T11-302",question:"In 2Mg(s) + O₂(g) → 2MgO(s), which species is the oxidising agent?",options:["Mg","MgO","O₂","None — no redox occurs"],correctIndex:2,explanation:"O₂ gains electrons (is reduced) — it oxidises Mg, making O₂ the oxidising agent."},
    {id:"chem-T11-303",question:"Rusting of iron requires both oxygen and water. A piece of iron in dry oxygen will:",options:["Rust at the same rate as in moist air","Not rust — both O₂ and water are needed together","Rust faster because more O₂ is present","Explode"],correctIndex:1,explanation:"The electrochemical corrosion process requires both O₂ and H₂O simultaneously."},
    {id:"chem-T11-304",question:"When Cl₂(aq) is added to KBr(aq), the mixture turns orange-brown. This shows that:",options:["KBr is the stronger oxidising agent","Cl₂ is a stronger oxidising agent and displaces Br₂ from bromide solution","Br₂ is produced by decomposition of KBr","Cl⁻ displaces Br₂ ions"],correctIndex:1,explanation:"Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂; Cl₂ has higher oxidising power down Group 17."},
    {id:"chem-T11-305",question:"In the reaction Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s), iron is:",options:["Reduced — it gains electrons","Oxidised — it loses electrons going from 0 to +2","Acting as the oxidising agent","Not involved in electron transfer"],correctIndex:1,explanation:"Fe goes from oxidation state 0 to +2, losing 2 electrons — this is oxidation."},
    {id:"chem-T11-306",question:"In 2FeCl₃ + SnCl₂ → 2FeCl₂ + SnCl₄: the tin is:",options:["Reduced (Sn²⁺ → Sn⁴⁺)","Oxidised (Sn²⁺ → Sn⁴⁺)","Unchanged","Acting as a catalyst"],correctIndex:1,explanation:"Sn²⁺ loses 2 electrons to become Sn⁴⁺ — oxidation. Fe³⁺ is reduced to Fe²⁺."},
    {id:"chem-T11-307",question:"Which reaction is NOT a redox reaction?",options:["Zn + CuSO₄ → ZnSO₄ + Cu","NaCl(aq) + AgNO₃(aq) → AgCl(s) + NaNO₃(aq)","2Mg + O₂ → 2MgO","Fe₂O₃ + 3CO → 2Fe + 3CO₂"],correctIndex:1,explanation:"Precipitation: Na, Cl, Ag, NO₃ oxidation states all unchanged. No electron transfer."},
    {id:"chem-T11-308",question:"Rusting of iron is an electrochemical redox process. The iron is:",options:["Reduced to Fe²⁺/Fe³⁺","Oxidised to Fe²⁺/Fe³⁺ — it loses electrons","Reduced and gains mass","Not involved in redox"],correctIndex:1,explanation:"Fe → Fe²⁺ + 2e⁻ (oxidation). O₂ is the oxidising agent that is reduced."},
    {id:"chem-T11-309",question:"Bleach (NaOCl) kills bacteria by acting as an oxidising agent. This means the bleach:",options:["Donates electrons to bacteria","Gains electrons from the organic compounds it oxidises","Loses oxygen to the bacteria","Provides acid pH only"],correctIndex:1,explanation:"Oxidising agent gains electrons (is itself reduced) while oxidising organic material."},
    {id:"chem-T11-310",question:"Fluorine is such a strong oxidising agent because:",options:["It has a low electronegativity","It has the highest electronegativity of all elements and strongly attracts electrons","It is the largest halogen","It easily loses electrons"],correctIndex:1,explanation:"F is the most electronegative element; strongest electron acceptor among the halogens."},
    {id:"chem-T11-311",question:"The oxidation state of chlorine in HClO₄ (perchloric acid) is:",options:["+1","+5","+7","−1"],correctIndex:2,explanation:"H is +1; O is −2 (×4 = −8). Total = 0. +1 + Cl + (−8) = 0 → Cl = +7."},
    {id:"chem-T11-312",question:"In the reaction: MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic conditions), the oxidising agent is:",options:["Fe²⁺ (reduced)","MnO₄⁻ (Mn goes from +7 to +2 — it is reduced, acting as oxidising agent)","H⁺","H₂O"],correctIndex:1,explanation:"MnO₄⁻ gains electrons (Mn: +7 → +2) = reduced = oxidising agent. Fe²⁺ loses electrons = oxidised = reducing agent."}
    ],
    extendedQuestions: [
        {
            id: "chem-T11-E01",
            commandWord: "Evaluate",
            marks: 6,
            syllabusNote: "Oxidation and Reduction - Combining oxidation states, half-equations, and tests.",
            prompt: "Sulfur dioxide ($SO_2$) gas is bubbled into a beaker containing acidified potassium manganate(VII) solution. \n\n(a) State the colour change observed in the beaker.\n(b) Using oxidation states, explain why sulfur dioxide is acting as a reducing agent in this reaction. (Assume $SO_2$ is converted to sulfate ions, $SO_4^{2-}$).\n(c) The half-equation for the reduction of the manganate(VII) ion is: $MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O$. Deduce the number of moles of electrons transferred when 0.2 moles of $MnO_4^-$ is completely reduced.",
            rubric: [
                "(a) The solution turns from **purple to colourless**.",
                "(b) The oxidation state of sulfur in $SO_2$ is **+4**.",
                "(b) The oxidation state of sulfur in $SO_4^{2-}$ is **+6**.",
                "(b) Because the oxidation state of sulfur **increases**, it is oxidised. A substance that gets oxidised acts as a **reducing agent**.",
                "(c) From the half-equation, 1 mole of $MnO_4^-$ requires 5 moles of electrons.",
                "(c) 0.2 moles of $MnO_4^-$ requires $0.2 \\times 5 =$ **1.0 mole of electrons**."
            ],
            modelAnswer: "(a) The acidified potassium manganate(VII) solution will turn from purple to colourless.\n\n(b) In sulfur dioxide ($SO_2$), the oxidation state of oxygen is -2, so sulfur is +4. In the sulfate ion ($SO_4^{2-}$), the four oxygens give -8, so sulfur must be +6 to give an overall charge of -2. Because the oxidation state of sulfur increases from +4 to +6, the sulfur dioxide is oxidised. By being oxidised itself, it acts as a reducing agent.\n\n(c) The half-equation shows a 1:5 molar ratio between $MnO_4^-$ and electrons. Therefore, 0.2 moles of $MnO_4^-$ will require $0.2 \\times 5 = 1.0$ mole of electrons."
        }
    ],
    trueFalse: [
    {statement:"If a species gains electrons it is oxidised.",correct:false,explain:"Reduced."},
    {statement:"All combustion reactions are redox.",correct:true,explain:"O₂ involved."},
    {statement:"Single displacement reactions are often redox.",correct:true,explain:"Electron transfer."},
    {statement:"In a redox reaction total oxidation states change sum to zero net element.",correct:true,explain:"Conservation."},
    {statement:"H₂ can act as reducing agent.",correct:true,explain:"Fuels."},
    {statement:"Concentrated H₂SO₄ oxidises Cu.",correct:false,explain:"Needs nitric or hot conc sulfuric specific cases."},
    {statement:"The species with highest oxidation state always oxidises others.",correct:false,explain:"Kinetics matter."},
    {statement:"Oxidation and reduction always occur together.",correct:true,explain:"Redox pair."},
    {statement:"Cl₂ is stronger oxidant than I₂.",correct:true,explain:"Reactivity series halogens."},
    {statement:"Zn protects Fe by preferential oxidation.",correct:true,explain:"Sacrificial."},
    {statement:"Photosynthesis overall reduces CO₂.",correct:true,explain:"To carbohydrate."},
    {statement:"Respiration oxidises glucose.",correct:true,explain:"To CO₂."}
    ],
    });
})();
