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
    ,
    {
        "title": "Trend Summary",
        "points": [
            "**Across period (→)**: atomic radius ↓; 1st IE ↑; electronegativity ↑; metallic character ↓.",
            "**Down group**: atomic radius ↑; 1st IE ↓; Gp1 reactivity ↑; Gp17 reactivity ↓ (as oxidising agents).",
            "**Gp1 + water**: metal + H₂O → metal hydroxide + H₂ (vigour increases down group).",
            "**Gp17 displacement**: Cl₂ > Br₂ > I₂ as oxidising agents. Cl₂ displaces Br⁻ and I⁻; Br₂ displaces I⁻ only.",
            "**Transition metals**: variable oxidation states; coloured compounds; catalyst activity."
        ]
    },
    {
        "title": "Transition Elements vs Group 1 Metals",
        "points": [
            " **Melting Point/Density**: Transition metals have high melting points and high densities. Group 1 metals have low melting points and low densities.",
            " **Chemical Properties**: Transition metals form **coloured compounds**, have **variable oxidation states** (e.g., $Fe^{2+}$, $Fe^{3+}$), and act as **catalysts**. Group 1 metals form white/colourless compounds and only have a +1 oxidation state."
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
            "front": "Why Fr most reactive alkali?",
            "back": "Electron lost easily — far from nucleus."
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
        },    
    { "front": "Down Group 1: why more reactive?", "back": "Atomic radius ↑ → outer electron further from nucleus → **lower ionisation energy** → lost more easily." },
    { "front": "Down Group 17: bp trend?", "back": "**Increases** (F₂ < Cl₂ < Br₂ < I₂) due to stronger London dispersion forces between larger molecules." },
    { "front": "Gp1 element: number of valence electrons?", "back": "**1** — hence configuration ends in …1." },
    { "front": "Why noble gases unreactive?", "back": "**Full outer shell** (duplet for He; octet for others) — very stable, high ionisation energy, very low electron affinity." }],
    quiz: [
    {id:"chem-T13-001",question:"Most metallic Period 3:",options:["Cl","Si","Na","S"],correctIndex:2,explanation:"Left."},
    {id:"chem-T13-002",question:"Smallest atom Period 2:",options:["Li","Ne","Be","B"],correctIndex:1,explanation:"Right end noble small."},
    
    {id:"chem-T13-004",question:"Gp17 element liquid at room T:",options:["F₂","Cl₂","Br₂","I₂"],correctIndex:2,explanation:"Bromine."},
    {id:"chem-T13-005",question:"Cl₂ + KBr:",options:["No reaction","Br₂ forms","KCl only","I₂"],correctIndex:1,explanation:"Displacement."},
    {id:"chem-T13-006",question:"Noble gas in lamps often:",options:["Ne","Ar","He","Rn"],correctIndex:1,explanation:"Inert cheap."},
    {id:"chem-T13-007",question:"Element 2,8,8,1:",options:["Gp1","Gp7","Gp18","Gp2"],correctIndex:0,explanation:"One valence e."},
    {id:"chem-T13-008",question:"Across period valence electrons Gp1→2:",options:["Decrease","Increase to 3 then complex","Constant","Zero"],correctIndex:1,explanation:"Up to 3 for Na Mg Al."},
    {id:"chem-T13-009",question: "Astatine (At) is located below iodine in Group 17 of the Periodic Table. Based on group trends, what are the most likely physical state and colour of astatine at room temperature?",options: ["Pale yellow gas","Red-brown liquid","Purple-black solid","Black solid"],correctIndex: 3,explanation: "Down Group 17, the colour darkens and the melting/boiling points increase. Since Iodine is a purple-black solid, Astatine will be an even darker (black) solid."},
    {id:"chem-T13-010",question:"Down gp1 density trend:",options:["Always decreases","Generally increases then K anomaly","Constant","Only gas"],correctIndex:1,explanation:"K less dense than Na."},
    {id:"chem-T13-011",question: "Element Z is a metal that acts as a catalyst, has a density of 8.9 g/cm³, and forms a green chloride salt. Where is Element Z located in the Periodic Table?",options: ["Group 1","Group 2","The block between Group 2 and Group 13","Group 17"],correctIndex: 2,explanation: "High density, catalytic activity, and coloured compounds are classic properties of Transition Elements, which are found in the block between Groups 2 and 13."},
    {id:"chem-T13-012",question:"Atomic radius Na vs Cl:",options:["Na smaller","Cl smaller","Same","Cannot"],correctIndex:1,explanation:"Same period: more nuclear charge → Cl smaller."},
    {id:"chem-T13-013",question:"Melting trend alkali metals down:",options:["Generally decreases","Increases","Constant","Only Li melts"],correctIndex:0,explanation:"Metallic bonding weakens."},
    {id:"chem-T13-014",question:"Which is not halogen:",options:["At","Se","I","Br"],correctIndex:1,explanation:"Selenium is chalcogen."},
    {id:"chem-T13-015",question:"Oxidation state group 2:",options:["+1","+2","+3","0"],correctIndex:1,explanation:"Lose 2e."},
    {id:"chem-T13-016",question:"Transition element property:",options:["Fixed +1 only","Variable oxidation state","No colour","Gas at RT"],correctIndex:1,explanation:"d-block."},
    
    {id:"chem-T13-018",question:"Hydrogen placement debate:",options:["Only metal","Non-metal mostly","Halogen always","Noble gas"],correctIndex:1,explanation:"Unique."},
    {id:"chem-T13-019",question:"Silicon semiconductor:",options:["Metallic","Metalloid","Halogen","Alkali"],correctIndex:1,explanation:"Period 3 metalloid."},
    {id:"chem-T13-020",question:"Fr predicted properties:",options:["Least volatile alkali","Most reactive alkali","Halogen","Noble"],correctIndex:1,explanation:"Radioactive alkali."},
    
    
    {id:"chem-T13-023",question:"Allotropes oxygen:",options:["O₂ O₃","Only O","Fe O","Cl O"],correctIndex:0,explanation:"Ozone."},
    {id:"chem-T13-024",question:"Halogen colour intensity down:",options:["Lighter","Darker","Colourless all","Only solid colours"],correctIndex:1,explanation:"Deeper colour."},
    
    
    {id:"chem-T13-027",question:"Between Na and Ar in Period 3, metallic character:",options:["Increases","Decreases","Is constant","Oscillates without pattern"],correctIndex:1,explanation:"Left → right: metals → metalloid → non-metals."},
    {id:"chem-T13-028",question:"Why does atomic radius increase down Group 1?",options:["Nuclear charge decreases","Additional electron shells increase size despite higher Z","Valence electrons are lost","Halogens pull electrons in"],correctIndex:1,explanation:"Extra shell dominates over increased nuclear charge."},
    {id:"chem-T13-029",question:"Which property rises down Group 17 (halogens)?",options:["Reactivity as oxidising agents","Melting/boiling points generally","Electronegativity","First ionisation energy"],correctIndex:1,explanation:"Stronger London forces between larger X₂ molecules."},
    
    {id:"chem-T13-031",question:"Across Period 3 from Na to Cl, electronegativity:",options:["Decreases","Increases","Stays the same","Becomes undefined"],correctIndex:1,explanation:"Greater attraction for bonding electrons toward the right."},
    {id:"chem-T13-032",question:"Noble gases boil at low temperatures mainly because:",options:["They are ionic","Only weak London forces between atoms","They are metals","They form hydrogen bonds"],correctIndex:1,explanation:"Monatomic — weak IM forces."},
    {id:"chem-T13-033",question:"Silicon is described as a metalloid because:",options:["It is a liquid metal","It shows some metallic and some non-metallic properties","It is a halogen","It has no electrical properties"],correctIndex:1,explanation:"Intermediate behaviour (e.g. semiconductor)."},
    {id:"chem-T13-034",question:"Transition metals often show coloured compounds because:",options:["They have no d electrons","d–d transitions can absorb visible light","They are always gases","They cannot form ions"],correctIndex:1,explanation:"Partially filled d subshell enables electronic transitions."},
    {id:"chem-T13-035",question:"Compared with Ca, Sr is expected to react with water:",options:["More slowly","More vigorously (more reactive down Group 2)","Not at all","Only as a catalyst"],correctIndex:1,explanation:"Down the group, outer electron is further from the nucleus."},
    {id:"chem-T13-036",question:"Which is a general trend for ionic radius vs atomic radius for metals in the same period?",options:["Ionic radius is always larger than atomic radius for cations","Cations are smaller than their parent atoms","Anions and cations are identical","Atoms are always smaller than their cations"],correctIndex:1,explanation:"Loss of electrons + same nuclear charge → stronger pull per electron."},
    
    
    {id:"chem-T13-203",question:"The element in Group 17 with the strongest oxidising ability among F₂, Cl₂, Br₂, I₂ at room temperature is typically:",options:["I₂","Br₂","Cl₂","F₂"],correctIndex:3,explanation:"F₂ is the strongest oxidising agent of the halogens."},
    {id:"chem-T13-204",question:"Noble gases are chemically unreactive mainly because:",options:["They have no electrons","Their valence shell is a stable closed shell","They are all metals","They are always diatomic"],correctIndex:1,explanation:"Full outer shell — high ionisation energy, low tendency to bond."},
    {id:"chem-T13-205",question:"Down Group 1, atomic radius increases mainly because:",options:["Nuclear charge decreases","Additional occupied electron shells outweigh increased nuclear charge","Electrons are removed","Halogens pull electrons in"],correctIndex:1,explanation:"Extra shell dominates size trend."},
    {id:"chem-T13-206",question:"Silicon (period 3) is a semiconductor partly because:",options:["It has a full metallic electron sea","The band gap is small enough for some electrons to be promoted at room temperature","It is a halogen","It has no crystal structure"],correctIndex:1,explanation:"Semiconductor band structure (syllabus-level link)."},
    
    {id:"chem-T13-208",question:"Transition metals are placed in the d-block because:",options:["Their highest-energy electrons occupy d orbitals (after Ca)","They have no d electrons","They are all gases","They only form +1 ions"],correctIndex:0,explanation:"d-block definition."},
    {id:"chem-T13-209",question:"Astatine (below iodine) is predicted to be:",options:["A colourless gas at RTP","A darker solid with lower melting point than I₂","A noble gas","Non-existent"],correctIndex:1,explanation:"Trend to darker, higher mp solids down halogens."},
    {id:"chem-T13-301",question:"Elements in the same group of the periodic table have similar chemical properties because:",options:["They have the same mass number","They have the same number of outer-shell (valence) electrons","They are all gases","They have the same number of neutrons"],correctIndex:1,explanation:"Same group = same valence electron count = similar reactivity and bonding."},
    {id:"chem-T13-302",question:"Elements in the same period have the same:",options:["Number of valence electrons","Number of electron shells","Atomic mass","Reactivity"],correctIndex:1,explanation:"Period number = number of occupied electron shells."},
    {id:"chem-T13-303",question:"Down Group 1 (Li → Cs), the metals react more vigorously with water because:",options:["Atoms get smaller, nucleus holds electrons tighter","Atoms get larger — the outer electron is further from the nucleus and lost more easily","Fewer neutrons down the group","Electronegativity increases"],correctIndex:1,explanation:"Increasing atomic radius → weaker attraction for outer electron → easier ionisation → more reactive."},
    {id:"chem-T13-304",question:"Chlorine (Group 17) has 7 valence electrons and forms Cl⁻. Argon (Group 18) has 8. Which is MORE reactive?",options:["Argon — more electrons","Chlorine — needs 1 electron to complete its outer shell","Argon — it never reacts","Both equally reactive"],correctIndex:1,explanation:"Cl is reactive because it needs one more electron. Ar already has a stable full shell."},
    {id:"chem-T13-305",question:"Bromine is a liquid at room temperature while chlorine is a gas. This is mainly because:",options:["Br₂ is ionic","Br₂ molecules are larger, so London dispersion forces are stronger, raising the boiling point","Br₂ has fewer electrons","Cl₂ has stronger intermolecular forces"],correctIndex:1,explanation:"Bigger molecules → more electrons → stronger instantaneous dipoles → higher melting/boiling points."},
    {id:"chem-T13-306",question:"A displacement reaction: Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq). This shows:",options:["Br₂ is more reactive than Cl₂","Cl₂ is a stronger oxidising agent than Br₂ and displaces bromide ions","Br⁻ is reduced to Br₂","Cl₂ is an alkali metal"],correctIndex:1,explanation:"More reactive halogen oxidises (displaces) the less reactive one's anion."},
    {id:"chem-T13-307",question:"Sodium (Period 3) has first ionisation energy much lower than magnesium. The main reason is:",options:["Na has more protons","Na has only 1 outer-shell electron and larger radius than Mg in the same period — Zeff effect","Na is a non-metal","Mg is in Group 1"],correctIndex:1,explanation:"Mg has 2 outer electrons held more tightly (higher Zeff); Na's 1 outer electron is less tightly held."},
    {id:"chem-T13-308",question:"Which pair of elements has properties most similar to each other?",options:["Na and Cl","Na and K (both Group 1)","Na and Ne","Cl and Ar"],correctIndex:1,explanation:"Same group → same outer electron configuration → most similar chemical properties."}
    ],
    extendedQuestions: [
        {
            id: "chem-T13-E01",
            commandWord: "Deduce",
            marks: 6,
            syllabusNote: "Periodic Table - Predicting reactivity and displacement in Group 17.",
            prompt: "A student bubbles chlorine gas into a colourless solution of aqueous potassium iodide. The solution turns brown. \n\n(a) Write a balanced chemical equation, including state symbols, for this reaction.\n(b) Explain, in terms of reactivity trends in Group 17, why this reaction occurs.\n(c) The student then bubbles bromine vapour into aqueous potassium chloride. Predict what will be observed and explain your answer.",
            rubric: [
                "(a) Equation: **$Cl_2(g) + 2KI(aq) \\rightarrow 2KCl(aq) + I_2(aq)$**.",
                "(b) States that reactivity **decreases down Group 17**.",
                "(b) Mentions that Chlorine is **more reactive** than Iodine.",
                "(b) Explains that the more reactive chlorine **displaces** the less reactive iodide from its solution.",
                "(c) Observation: **No visible change / no reaction**.",
                "(c) Explanation: Bromine is **less reactive** than Chlorine, so it cannot displace chloride ions."
            ],
            modelAnswer: "(a) $Cl_2(g) + 2KI(aq) \\rightarrow 2KCl(aq) + I_2(aq)$\n\n(b) In Group 17 (the halogens), reactivity decreases down the group. Chlorine is positioned above iodine in the periodic table, making it more reactive. Therefore, chlorine is a strong enough oxidising agent to displace the less reactive iodide ions from the solution, forming brown aqueous iodine.\n\n(c) There will be **no visible change**. Bromine is located below chlorine in Group 17, meaning it is less reactive than chlorine. A less reactive halogen cannot displace a more reactive halogen from its salt solution."
        }
    ],
    trueFalse: [    
    {statement:"Atomic radius increases down a group.",correct:true,explain:"Extra shell."},    
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
