(function () {
  window.__registerTopic({
    id: "18",
    theme: "Theme 3: Chemistry in a Sustainable World",
    title: "Polymers",
    cheatBlocks: [
        {
            "title": "Addition polymerisation",
            "points": [
                "Monomer: **alkene** with C=C opens.",
                "Repeat unit in brackets; **n** large.",
                "e.g. poly(ethene), PVC, PTFE."
            ]
        },
        {
            "title": "Condensation",
            "points": [
                "**Nylon** (polyamide) — amide link; **polyester** (Terylene) — ester link.",
                "Small molecule eliminated (often H₂O)."
            ]
        },
        {
            "title": "Sustainability",
            "points": [
                "Plastics persist; **recycling** codes; **biodegradable** vs durable.",
                "Microplastics environmental issue."
            ]
        },
        {
            "title": "Addition vs Condensation — Quick Compare",
            "points": [
                "**Addition**: monomer has **C=C** (alkene); π bond opens; **no small molecule released**; repeat unit = monomer atoms.",
                "**Condensation**: monomers have 2 functional groups; **small molecule lost** (H₂O or HCl per bond formed).",
                "**Nylon**: diamine + diacid/diacyl chloride → **amide links** (–CONH–).",
                "**Polyester (PET/Terylene)**: diol + diacid → **ester links** (–COO–).",
                "Condensation repeat unit contains **fewer atoms** than monomers combined."
            ]
        },
        { 
            "title": "Deducing Monomers from Polymers", 
            "points": [ 
                " **Addition Polymer**: Locate the 2-carbon backbone of the repeat unit. Remove the trailing bonds and place a **double bond (C=C)** between those two carbons.",
                " **Condensation Polymer (Polyester)**: Break the ester link (–COO–) down the middle. Add an **–OH** to the C=O part (making a dicarboxylic acid) and an **–H** to the –O– part (making a diol).",
                " **Condensation Polymer (Polyamide/Nylon)**: Break the amide link (–CONH–). Add an **–OH** to the C=O part (making a dicarboxylic acid) and an **–H** to the –NH– part (making a diamine)."
            ] 
        }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/sustainable-02-polymers.jpg", caption: "Addition and condensation polymers + recycling context" }
    ],
    flashcards: [
        {
            "front": "Repeat unit?",
            "back": "Smallest repeating section in brackets."
        },
        {
            "front": "Nylon link?",
            "back": "Amide (–CONH–)."
        },
        {
            "front": "Polyester link?",
            "back": "Ester."
        },
        {
            "front": "Monomer polypropene?",
            "back": "Propene."
        },
        {
            "front": "Thermoplastic vs thermoset?",
            "back": "Thermoplastic remelts; thermoset cross-linked rigid."
        },
        {
            "front": "Why plastic waste problem?",
            "back": "Slow degradation; fossil-derived."
        },
        {
            "front": "Biopolymer example?",
            "back": "Starch, cellulose (natural polymers)."
        },
        {
            "front": "Condensation vs addition polymer?",
            "back": "Condensation eliminates small molecule."
        },
        {
            "front": "Terylene type?",
            "back": "Synthetic polyester fibre."
        },
        {
            "front": "Recycling symbol meaning?",
            "back": "Resin identification — sorting."
        },
        {
            "front": "Addition polymer only C,H,Cl etc.?",
            "back": "No atoms lost from monomer."
        },
        {
            "front": "Polystyrene monomer?",
            "back": "Phenylethene (styrene)."
        }
    ,
    { "front": "Monomer for PVC?", "back": "**Chloroethene** (CH₂=CHCl, vinyl chloride)." },
    { "front": "Monomer for poly(propene)?", "back": "**Propene** (CH₂=CHCH₃). Each chain unit has a –CH₃ branch." },
    { "front": "Nylon bond type?", "back": "**Amide bond** (–CONH–); formed between –NH₂ and –COOH groups." },
    { "front": "Thermoplastic vs thermoset — recycling?", "back": "**Thermoplastic**: chain polymer → remelt → recyclable. **Thermoset**: cross-linked network → cannot remelt." },
    { "front": "Why plastics are non-biodegradable?", "back": "**C–C backbone** is not recognised by most soil enzymes as a substrate for decomposition." }],
    quiz: [
    {id:"chem-T18-001",question:"Poly(ethene) monomer:",options:["Ethane","Ethene","Ethanol","Ethyne"],correctIndex:1,explanation:"Opens double bond."},
    {id:"chem-T18-002",question:"Condensation polymer examples:",options:["Only PE","Nylon, polyester","Only diamond","NaCl"],correctIndex:1,explanation:"Step-growth."},
    {id:"chem-T18-003",question:"PVC from:",options:["Ethene","Chloroethene","Benzene","Propane"],correctIndex:1,explanation:"Vinyl chloride."},
    {id:"chem-T18-004",question:"Repeat unit drawn with:",options:["Only ions","Brackets and continuation bonds","Circles","No bonds"],correctIndex:1,explanation:"Show backbone."},
    {id:"chem-T18-005",question:"Nylon formed from:",options:["Ethene only","Diamine + diacid (or derivatives)","Glucose only","HCl"],correctIndex:1,explanation:"Condensation."},
    {id:"chem-T18-006",question:"Polyester from:",options:["Two alcohols","Diol + diacid","Metal + acid","Only ethene"],correctIndex:1,explanation:"Ester links."},
    {id:"chem-T18-007",question:"Thermosetting polymer:",options:["Remelts easily","Cross-linked — does not remelt","Only gas","Ionic"],correctIndex:1,explanation:"Network."},
    {id:"chem-T18-008",question:"Microplastics:",options:["Large bottles only","Small plastic fragments","Only metal","Water vapour"],correctIndex:1,explanation:"Environmental concern."},
    {id:"chem-T18-009",question:"Addition polymer M_r change n monomers:",options:["Loses H₂O each step","Sum of monomers (no small molecule out)","Halves","Becomes ionic"],correctIndex:1,explanation:"Mass adds."},
    {id:"chem-T18-010",question:"Natural polymer:",options:["PVC","Cellulose","Polyethene","Nylon"],correctIndex:1,explanation:"Plant polymer."},
    {id:"chem-T18-011",question:"Why recycle plastics:",options:["Reduce landfill and crude oil use","Increase waste","No reason","Make heavier"],correctIndex:0,explanation:"Sustainability."},
    {id:"chem-T18-012",question:"PTFE monomer:",options:["Tetrafluoroethene","Ethene","Propene","Styrene"],correctIndex:0,explanation:"CF₂=CF₂."},
    {id:"chem-T18-013",question:"A polymer has the repeat unit –[CH₂–CH(CH₃)]–. What is the name and molecular formula of the monomer?",options:["Ethene, C₂H₄","Propene, C₃H₆","Butene, C₄H₈","Methylpropane, C₄H₁₀"],correctIndex:1,explanation:"Placing a double bond between the two backbone carbons gives CH₂=CH(CH₃), which is propene (C₃H₆)."},
    {id:"chem-T18-014",question:"Biodegradable plastic (ideal):",options:["Never breaks","Microbes break down","Infinite life","Metal"],correctIndex:1,explanation:"Design goal."},
    {id:"chem-T18-015",question:"Polypeptide (protein) is:",options:["Addition polymer of ethene","Condensation of amino acids","Ionic crystal","Only fat"],correctIndex:1,explanation:"Amide links."},
    {id:"chem-T18-016",question:"A polymer is formed by reacting HO–CH₂CH₂–OH with HOOC–C₆H₄–COOH. What type of polymer is this and what small molecule is eliminated?",options:["Polyamide, HCl","Polyester, H₂O","Addition polymer, H₂O","Polyester, CO₂"],correctIndex:1,explanation:"A diol and a dicarboxylic acid undergo condensation polymerisation to form a polyester, eliminating water molecules."},
    {id:"chem-T18-017",question:"Monomer count in repeat unit of poly(ethene):",options:["2","1 (–CH₂–CH₂–) derived from 1 ethene","3","0"],correctIndex:1,explanation:"One monomer unit."},
    {id:"chem-T18-018",question:"Condensation needs:",options:["Always UV","Two functional monomers often","Only heat no monomer","Diamond"],correctIndex:1,explanation:"Two sites."},
    {id:"chem-T18-019",question:"Foam polystyrene:",options:["Gas pockets in polymer","Pure metal","Liquid only","Salt"],correctIndex:0,explanation:"Expanded PS."},
    {id:"chem-T18-020",question:"The molar mass of chloroethene (CH₂=CHCl) is 62.5 g/mol. A single chain of poly(chloroethene) has a molar mass of 62,500 g/mol. How many monomer units are in this chain?",options:["500","1000","2000","Need more information"],correctIndex:1,explanation:"In addition polymerisation, no mass is lost. Number of monomers = Total Mass ÷ Monomer Mass = 62500 ÷ 62.5 = 1000."},
    {id:"chem-T18-021",question:"A key advantage of biodegradable polymers is:",options:["They always have higher strength","They reduce long-term plastic persistence in the environment","They are always cheaper to manufacture","They cannot burn"],correctIndex:1,explanation:"Biodegradable polymers can be broken down by microbes, helping to reduce the accumulation of persistent plastic waste."},
    {id:"chem-T18-022",question:"Depolymerisation:",options:["Break polymer to monomers","Make longer chains","Only physical","Ionise"],correctIndex:0,explanation:"Reverse."},
    {id:"chem-T18-023",question:"Green polymer goal:",options:["Non-recyclable","Renewable feedstock + recyclable","Only black colour","Heavy metal only"],correctIndex:1,explanation:"Sustainable chemistry."},
    {id:"chem-T18-024",question:"Which strategy best supports a circular economy in polymers?",options:["Single-use mixed plastics","Designing for reuse and easier chemical recycling","Landfilling all plastics","Increasing virgin monomer use"],correctIndex:1,explanation:"Designing products so that their materials can be easily recovered and reused reduces reliance on crude oil and minimises waste."},
    
    {id:"chem-T18-026",question:"Combustion of PVC releases:",options:["Only N₂","HCl among products","No gases","He only"],correctIndex:1,explanation:"Chlorinated polymer."},
    
    {id:"chem-T18-028",question:"In addition polymerisation of ethene, each monomer unit typically:",options:["Joins without eliminating a small molecule (π bond opens)","Eliminates one H₂O","Eliminates one H₂","Eliminates one CO₂"],correctIndex:0,explanation:"Addition polymer: no step-wise loss of H₂O unlike condensation."},
    {id:"chem-T18-029",question:"PET (polyethylene terephthalate) is best described as:",options:["Poly(ethene) with terephthalate","A polyester from a diol + benzene-1,4-dicarboxylic acid (concept)","A polyamide only","Natural rubber"],correctIndex:1,explanation:"Condensation polymer with ester links."},
    {id:"chem-T18-030",question:"PVC contains chlorine in the polymer chain because:",options:["The monomer is chloroethene (vinyl chloride)","Chlorine is added only after polymerisation","Cl is only a colourant","PVC has no chlorine"],correctIndex:0,explanation:"Each repeat unit comes from CH₂=CHCl."},
    {id:"chem-T18-031",question:"Nylon formed from a diamine and a diacyl chloride is a:",options:["Polyamide","Polyester only","Polyalkene","Ionic crystal"],correctIndex:0,explanation:"–CONH– (amide) links between monomers."},
    {id:"chem-T18-032",question:"Thermoplastics can be remoulded when heated because:",options:["Chains are not locked in a permanent covalent network","They are always gases","They contain only ions","They cannot soften"],correctIndex:0,explanation:"No extensive cross-links; chains slide when hot."},
    {id:"chem-T18-033",question:"Condensation polymerisation often differs from addition polymerisation by:",options:["Eliminating a small molecule (e.g. H₂O)","Never using heat","Using only alkenes","Producing only monatomic gases"],correctIndex:0,explanation:"Step-growth with loss of H₂O / HCl etc."},
    {id:"chem-T18-034",question:"Which monomer is used to make poly(propene)?",options:["Propene","Propane","Propyne","Propan-1-ol"],correctIndex:0,explanation:"Same addition mechanism as ethene but with a methyl branch."},
    {id:"chem-T18-035",question:"Melting and remoulding for mechanical recycling suits:",options:["Typical thermoplastics","Typical thermosets","Ceramics only","Metals only"],correctIndex:0,explanation:"Thermoplastics soften reversibly."},
    {id:"chem-T18-036",question:"Ester functional groups appear in:",options:["Polyesters only","Polyesters and natural fats/oils","Poly(ethene) only","Diamond"],correctIndex:1,explanation:"Triglycerides are esters; Terylene is polyester."},
    {id:"chem-T18-037",question:"The repeat unit –CH₂–CH₂– in poly(ethene) is derived per monomer from:",options:["Two ethene molecules","One ethene molecule","Ethane only","Ethanol"],correctIndex:1,explanation:"One C=C opens to two –CH₂– units in the chain."},
    {id:"chem-T18-201",question:"In condensation polymerisation, a small molecule such as H₂O or HCl is often eliminated because:",options:["The reactor is wet","Monomers join with loss of atoms not incorporated in the polymer backbone","Addition polymers always lose CO₂","Only metals condense"],correctIndex:1,explanation:"Step-growth with elimination."},
    {id:"chem-T18-202",question:"Compared with LDPE, HDPE typically has:",options:["More short-chain branching → lower density","Fewer branches → higher density and more crystallinity","No carbon atoms","Only ionic bonding"],correctIndex:1,explanation:"Branching lowers packing density."},
    
    
    {id:"chem-T18-205",question:"A thermosetting polymer differs from a thermoplastic because:",options:["Thermosets soften every time they are heated","Thermosets have extensive cross-links and do not remelt like simple thermoplastics","Thermosets are always gases","Thermosets contain no covalent bonds"],correctIndex:1,explanation:"Network covalent solid."},
    {id:"chem-T18-206",question:"PET bottles are often recycled mechanically by:",options:["Cracking to ethene only","Melting and remoulding (thermoplastic behaviour)","Electrolysis","Dissolving in HCl only"],correctIndex:1,explanation:"Thermoplastic polyester."},
    {id:"chem-T18-207",question:"The repeat unit of poly(propene) contains a methyl branch because:",options:["Propane was cracked","The monomer is CH₂=CHCH₃","The catalyst is methyl","Ethene dimerises"],correctIndex:1,explanation:"Propene structure is retained in the chain."},
    {id:"chem-T18-208",question:"Which is a health/environment reason to limit open burning of mixed plastics?",options:["Produces only CO₂","May release toxic gases (e.g. HCl from PVC) and particulates","Removes all particulates","Increases ozone in stratosphere only"],correctIndex:1,explanation:"Incomplete combustion and halogen content."},
    {id:"chem-T18-209",question:"Disposing of durable plastics in landfill is problematic mainly because:",options:["They dissolve overnight","They persist and may fragment to microplastics","They become noble gases","They always biodegrade quickly"],correctIndex:1,explanation:"Environmental persistence."},
    {id:"chem-T18-301",question:"In addition polymerisation of ethene, the C=C double bond opens so that:",options:["H₂O is eliminated","Each monomer unit bonds to the next without losing any atoms — all atoms are in the polymer","CO₂ is released","The chain remains unsaturated"],correctIndex:1,explanation:"Addition: no small molecule lost. The π bond becomes two new σ bonds linking monomers."},
    {id:"chem-T18-302",question:"PVC (poly(chloroethene)) is made from chloroethene monomers CH₂=CHCl. The repeat unit is:",options:["–CH₂–CH₂–","–CH₂–CHCl–","–CHCl–CHCl–","–CH=CCl–"],correctIndex:1,explanation:"Each chloroethene monomer contributes –CH₂–CHCl– to the chain."},
    {id:"chem-T18-303",question:"Nylon-6,6 is produced from a diamine (6 carbons) and a dicarboxylic acid (6 carbons). Each bond formed is an:",options:["Ester link (–COO–)","Amide link (–CONH–)","Ether link (–O–)","Double C=C bond"],correctIndex:1,explanation:"Amide bond formation: –COOH + H₂N– → –CONH– + H₂O. Polyamide = nylon."},
    {id:"chem-T18-304",question:"Thermoplastics can be melted and remoulded because:",options:["They are cross-linked covalent networks","Polymer chains are held together only by intermolecular forces that break on heating","They are ionic solids","They contain no carbon"],correctIndex:1,explanation:"No permanent cross-links → chains slide when soft → shape-able."},
    {id:"chem-T18-305",question:"Plastics are generally non-biodegradable because:",options:["They contain too much oxygen","The C–C backbone is not recognised by most soil microorganisms as a substrate","They are too cold","They contain metal atoms"],correctIndex:1,explanation:"Biological enzymes that digest natural polymers (cellulose, starch) do not break C–C chains easily."},
    {id:"chem-T18-306",question:"Physical recycling of thermoplastic bottles involves:",options:["Cracking to monomers","Melting, shredding, and reforming into new plastic products","Electrolysis","Burning for energy only"],correctIndex:1,explanation:"Mechanical recycling: clean thermoplastic is softened by heat and remoulded."},
    {id:"chem-T18-307",question:"Burning mixed plastics in open air is environmentally harmful mainly because:",options:["Only CO₂ is released — same as natural fires","Incomplete combustion and chlorine/other atoms in polymers like PVC produce toxic gases (e.g. HCl, dioxins) and particulates","All plastics burn cleanly","Only smoke is harmful"],correctIndex:1,explanation:"Halogenated and mixed plastics release toxic compounds when burnt without proper scrubbing."},
    {id:"chem-T18-308",question:"A polyester is formed from ethane-1,2-diol and benzene-1,4-dicarboxylic acid. The link between monomers is:",options:["Amide bond","Ester bond (–COO–) with elimination of water","Carbon–carbon double bond","Ionic bond"],correctIndex:1,explanation:"Diol + diacid condensation → –COO– ester links + H₂O. This is how PET (Terylene) is made."}
    ],
    extendedQuestions: [
        {
            id: "chem-add-t18-E01",
            commandWord: "Construct",
            marks: 6,
            syllabusNote: "Polymers - Drawing condensation polymer linkages.",
            prompt: "Nylon is a synthetic polyamide used to make clothing and ropes. It can be manufactured from hexanedioic acid (a dicarboxylic acid) and 1,6-diaminohexane (a diamine).\n\n(a) Draw the full structural formula of the amide linkage that joins the two monomers together.\n(b) Draw the structure of the repeat unit of this nylon, using blocks to represent the carbon chains of the monomers.\n(c) State one difference in the formation process between nylon and poly(ethene).",
            rubric: [
                "(a) Diagram must show the amide link: **–C(=O)–N(H)–**.",
                "(b) Diagram shows: **–[C(=O)–[block 1]–C(=O)–N(H)–[block 2]–N(H)]–**.",
                "(b) Continuation bonds must be present at both ends crossing the brackets.",
                "(c) Poly(ethene) is an **addition polymer** formed by the breaking of C=C double bonds with no by-products.",
                "(c) Nylon is a **condensation polymer** formed by joining two different monomers and **eliminating a small molecule** (water)."
            ],
            modelAnswer: "(a) *(Structural description)*: The amide linkage consists of a carbon atom double-bonded to an oxygen atom (C=O), and single-bonded to a nitrogen atom. The nitrogen atom is single-bonded to a hydrogen atom (N-H). \n\n(b) *(Diagram description)*: The repeat unit should show: a continuation bond leading to a C=O group, attached to a shaded rectangle (representing the rest of the diacid chain), attached to another C=O group. This C=O is directly bonded to an N-H group, which is attached to an empty rectangle (representing the diamine chain), which is attached to another N-H group, ending with a continuation bond.\n\n(c) Poly(ethene) is formed via addition polymerisation, where unsaturated monomers simply add together to form a long chain without losing any atoms. Nylon is formed via condensation polymerisation, where two different functional groups react, causing a small molecule (water) to be eliminated each time a link is formed."
        }
    ],
    trueFalse: [
    {statement:"All plastics are addition polymers.",correct:false,explain:"Condensation: nylon, polyester."},
    {statement:"The repeat unit of poly(propene) has a methyl branch on every other carbon.",correct:true,explain:"CH₃ side group."},
    {statement:"Thermoplastics can be remoulded when heated.",correct:true,explain:"No extensive cross-links."},
    {statement:"Nylon can be made from diamine and diacyl chloride.",correct:true,explain:"Lab nylon rope trick."},
    {statement:"PET is a polyester used in bottles.",correct:true,explain:"Polyethylene terephthalate."},
    {statement:"Burning plastics in open air is always environmentally safe.",correct:false,explain:"Toxic gases, particulates."},
    {statement:"Polymers have very high molecular masses.",correct:true,explain:"Macromolecules."},
    {statement:"Monomer and repeat unit are always identical formula.",correct:false,explain:"Condensation loses atoms."},
    {statement:"Recycling reduces crude oil demand for new plastic.",correct:true,explain:"Feedstock saving."},
    {statement:"Bioplastics are always biodegradable.",correct:false,explain:"Some are durable PLA etc."},
    
    {statement:"Polymer burning test: PE drips; PVC self-extinguishing green flame (Cl).",correct:true,explain:"Qualitative distinction."}
    ],
    });
})();
