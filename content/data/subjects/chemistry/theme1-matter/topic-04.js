(function () {
  window.__registerTopic({
    id: "4",
    theme: "Theme 1: Matter – Structures & Properties",
    title: "Atomic Structure",
    cheatBlocks: [
        {
            "title": "Particles",
            "points": [
                "**Proton** +1, mass 1 u; **neutron** 0, ~1 u; **electron** −1, negligible mass.",
                "In atom: **protons = electrons** (neutral).",
                "**Atomic number Z** = protons = electrons in neutral atom."
            ]
        },
        {
            "title": "Mass & ions",
            "points": [
                "**Mass number A** = protons + neutrons.",
                "**Isotopes** — same Z, different neutron number.",
                "**Ion** — electron gain/loss; cation +, anion −."
            ]
        },
        {
            "title": "Electronic structure",
            "points": [
                "Shells fill 2,8,8… (O-level pattern).",
                "**Valence electrons** — outer shell; drive bonding.",
                "Group number (main) ≈ valence e⁻ for groups 1–2, 7–0 pattern context."
            ]
        },
        {
            "title": "Atomic models and trends",
            "points": [
                "Modern model: tiny dense nucleus with electrons in shells around it.",
                "Across a period, atoms generally get smaller because nuclear charge increases.",
                "Down a group, atoms get larger because extra shells are added."
            ]
        },
        {
            "title": "Electronic Configuration Guide",
            "points": [
                "Fill shells in order: shell 1 → max **2**; shell 2 → max **8**; shell 3 → max **8** (up to Z = 20).",
                "Write as comma-separated numbers, e.g. Cl (Z=17): **2, 8, 7**.",
                "**Group number** (1–7) = number of valence electrons in the outermost shell.",
                "**Period number** = number of occupied electron shells.",
                "**Ion**: cation loses outer e⁻; anion gains e⁻ to match noble gas config."
            ]
        },
        { 
            "title": "Sub-atomic Particles & Properties", 
            "points": [ 
                " **Proton**: Relative Mass = 1, Relative Charge = +1", 
                " **Neutron**: Relative Mass = 1, Relative Charge = 0", 
                " **Electron**: Relative Mass = $\\frac{1}{1840}$, Relative Charge = -1",
                "An atom is electrically neutral because the number of protons equals the number of electrons."
            ] 
        },
        {
            "title": "Nuclide Notation",
            "points": [
                "Atoms can be represented using nuclide notation: $_Z^A X$.",
                " $A$ = **Nucleon (mass) number** (protons + neutrons).",
                " $Z$ = **Proton (atomic) number**.",
                " $X$ = Atomic symbol of the element."
            ]
        },
        {
            "title": "Isotopes: Chemical vs Physical Properties",
            "points": [
                " **Isotopes** are atoms of the same element with the same proton number but different nucleon numbers.",
                "They have the **same chemical properties** because they have the same number of electrons and electronic configuration.",
                "They have **different physical properties** (e.g., density, melting point, boiling point) because they have different masses."
            ]
        }
],
    infographics: [
      { image: "data/subjects/chemistry/images/matter-04-atomic-structure.jpg", caption: "Bohr-style atom: nucleus and shells" },
      { svg: "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"260\" height=\"150\" fill=\"#1c222d\"/><circle cx=\"130\" cy=\"75\" r=\"45\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"130\" cy=\"75\" r=\"14\" fill=\"#f87171\"/><text x=\"118\" y=\"80\" fill=\"#fff\" font-size=\"10\">nucleus</text><circle cx=\"90\" cy=\"50\" r=\"4\" fill=\"#5eead4\"/><circle cx=\"175\" cy=\"95\" r=\"4\" fill=\"#5eead4\"/><circle cx=\"165\" cy=\"48\" r=\"4\" fill=\"#5eead4\"/><text x=\"12\" y=\"138\" fill=\"#8b95a8\" font-size=\"9\">Protons+neutrons in nucleus · electrons in shells</text></svg>", caption: "Nucleus + electron shells (schematic)" }
    ],
    flashcards: [
        {"front": "Atomic number?","back": "Number of protons."},
        {"front": "Mass number?","back": "Protons + neutrons."},
        {"front": "Isotope of carbon?","back": "Same 6 protons; C-12 vs C-14 differ in neutrons."},
        {"front": "Mg²⁺ formed how?","back": "Mg loses 2 electrons."},
        {"front": "Cl⁻?","back": "Cl gains one electron."},
        {"front": "Where is mass concentrated?","back": "Nucleus."},
        {"front": "Relative atomic mass?","back": "Weighted mean of isotope masses."},
        {"front": "First shell max electrons?","back": "2."},
        {"front": "Sodium electron arrangement?","back": "2,8,1."},
        {"front": "Noble gas outer shell (except He)?","back": "8 electrons (octet)."},
        { "front": "Electronic config of Na (Z=11)?", "back": "**2, 8, 1** → Period 3, Group 1, 1 valence electron." },
        { "front": "Electronic config of Cl (Z=17)?", "back": "**2, 8, 7** → Period 3, Group 17, 7 valence electrons." },
        { "front": "Electronic config of Ca (Z=20)?", "back": "**2, 8, 8, 2** → Period 4, Group 2." },
        { "front": "Neutrons = ?", "back": "$\\text{neutrons} = A - Z$ (mass number minus atomic number)." },
        { "front": "Why isotopes have same chemistry?", "back": "Same **number of protons and electrons** → same electronic configuration → identical chemical behaviour." },
        { "front": "What is the exact relative mass of an electron according to the O-Level syllabus?", "back": "$\\frac{1}{1840}$" },
        { "front": "In the nuclide notation $_Z^A X$, what do A and Z stand for?", "back": "A is the nucleon (mass) number. Z is the proton (atomic) number." },
        { "front": "Do isotopes of the same element have the same physical properties?", "back": "No, they have different physical properties (like density and boiling point) due to their different masses." },
        { "front": "Why do isotopes have identical chemical properties?", "back": "Chemical reactions only involve electrons. Isotopes have the same number of protons, so they have the same number of electrons and the exact same electronic configuration." }
    ],
    quiz: [
    {id:"chem-T4-001",question:"Neutron has charge:",options:["+1","-1","0","+2"],correctIndex:2,explanation:"Neutral."},
    {id:"chem-T4-002",question:"An atom with 15 p and 15 e is:",options:["Anion","Cation","Neutral","Ion always"],correctIndex:2,explanation:"Balanced charges."},
    {id:"chem-T4-003",question:"Ion with 11 p and 10 e:",options:["Na⁺","Na⁻","Ne","Mg²⁺"],correctIndex:0,explanation:"Lost one electron."},
    {id:"chem-T4-004",question:"Isotopes differ in:",options:["Proton count","Electron count in neutral","Neutron count","Position in table"],correctIndex:2,explanation:"Same element."},
    {id:"chem-T4-005",question:"Mass number 23, atomic number 11 → neutrons:",options:["11","12","23","34"],correctIndex:1,explanation:"23−11=12."},
    {id:"chem-T4-006",question:"Which defines the element:",options:["Neutron number","Proton number","Mass number","Electron shells"],correctIndex:1,explanation:"Z unique."},
    {id:"chem-T4-007",question:"Cl atom becomes Cl⁻ by:",options:["Losing electron","Gaining electron","Losing proton","Fusion"],correctIndex:1,explanation:"Needs −1 charge."},
    {id:"chem-T4-008",question:"Relative atomic mass of chlorine ~35.5 because:",options:["Single isotope","Mixture of isotopes","Error","Only Cl⁻"],correctIndex:1,explanation:"35Cl and 37Cl."},
    {id:"chem-T4-009",question:"Electronic config of Al (13):",options:["2,8,4","2,8,3","2,11","8,5"],correctIndex:1,explanation:"2+8+3=13."},
    {id:"chem-T4-010",question:"Valence electrons in group 17 atom:",options:["1","7","8","2"],correctIndex:1,explanation:"Halogens need 1 for octet."},
    {id:"chem-T4-011",question:"What is the relative mass of an electron compared to a proton?",options:["1","0","1/1840","1/2000"],correctIndex:2,explanation:"The textbook specifies the relative mass of an electron is 1/1840 of a proton or neutron."},
    {id:"chem-T4-012",question:"Cation is always:",options:["Larger than parent atom","Smaller than parent atom","Same size","No charge"],correctIndex:1,explanation:"Fewer electrons, same nucleus pull."},
    {id:"chem-T4-013",question:"Anion compared to atom:",options:["Smaller","Larger","Same","No electrons"],correctIndex:1,explanation:"More e⁻–e⁻ repulsion."},
    {id:"chem-T4-014",question:"Tungsten is commonly used to make drill bits. It is represented in nuclide notation as $^{184}_{74}\\text{W}$. How many neutrons does an atom of tungsten-184 have?",options:["74","110","184","258"],correctIndex:1,explanation:"Number of neutrons = Nucleon number (A) - Proton number (Z) = 184 - 74 = 110."},
    {id:"chem-T4-015",question:"Which of the following is true regarding the isotopes of chlorine, $^{35}\\text{Cl}$ and $^{37}\\text{Cl}$?",options:["They have different electronic configurations","They react differently with sodium","They have the same density and boiling point","They have identical chemical properties but slightly different physical properties"],correctIndex:3,explanation:"Isotopes share chemical properties because their electron configurations are identical, but differ in physical properties due to mass differences."},    
    {id:"chem-T4-017",question:"Isotopes have same:",options:["Chemical properties mostly","Mass number always","Neutron count","Density in all forms"],correctIndex:0,explanation:"Same electron config."},
    {id:"chem-T4-018",question: "A sulfide ion is formed from the isotope $^{32}_{16}\\text{S}$. How many protons, neutrons, and electrons does this ion contain?",options: ["16 protons, 16 neutrons, 16 electrons","16 protons, 16 neutrons, 18 electrons","16 protons, 18 neutrons, 16 electrons","18 protons, 16 neutrons, 18 electrons"],correctIndex: 1,explanation: "Protons = 16. Neutrons = 32 - 16 = 16. The sulfur atom is in Group 16 and gains 2 electrons to form an $S^{2-}$ ion, so it has 16 + 2 = 18 electrons."},
    {id:"chem-T4-019",question: "Element $X$ has an atomic number of 13 and a mass number of 27. Element $Y$ has an atomic number of 14 and a mass number of 28. Which statement is correct?",options: ["They are isotopes of the same element.","They have the same number of neutrons.","Element X forms an anion with a -3 charge.","They have the same number of valence electrons."],correctIndex: 1,explanation: "Neutrons in $X$ = 27 - 13 = 14. Neutrons in $Y$ = 28 - 14 = 14. They are different elements (different Z) in different groups (Group 13 vs Group 14)."},
    {id:"chem-T4-020",question: "An atom $W$ has a nucleon number of 39 and contains 20 neutrons. What is the electronic configuration of its most stable ion?",options: ["2, 8, 8, 1","2, 8, 8","2, 8, 18, 8, 3","2, 8, 7"],correctIndex: 1,explanation: "Protons in $W$ = 39 - 20 = 19. $W$ is Potassium (K), which has the atom configuration 2, 8, 8, 1. It loses 1 electron to form $K^+$, resulting in a 2, 8, 8 configuration."},
    {id:"chem-T4-021",question: "A particle $Q$ has 15 protons, 16 neutrons, and 18 electrons. Which of the following best describes $Q$?",options: ["It is an atom of Phosphorus-31.","It is a cation with a +3 charge.","It is an anion with a -3 charge and a nucleon number of 31.","It is an isotope of Argon."],correctIndex: 2,explanation: "Protons = 15, meaning the element is Phosphorus. Nucleon number = 15 + 16 = 31. Because it has 18 electrons (3 more than protons), it has a -3 charge ($P^{3-}$)."},
    {id:"chem-T4-022",question:"Noble gas unreactive largely because:",options:["Large atoms","Full outer shell","No mass","Liquid"],correctIndex:1,explanation:"Stable config."},
    {id:"chem-T4-023",question:"Number of neutrons in ¹⁴C:",options:["6","8","14","20"],correctIndex:1,explanation:"14−6=8."},
    {id:"chem-T4-024",question:"Which pair has the same number of electrons?",options:["Na atom and Ne atom","Na⁺ and Ne atom","Mg atom and Ne atom","Cl atom and Ar atom"],correctIndex:1,explanation:"Na⁺ has 10 electrons, same as Ne."},
    {id:"chem-T4-025",question:"A key idea in the modern atomic model is:",options:["Atoms are indivisible solid spheres","Atoms contain a tiny nucleus and electrons","All atoms of an element have the same mass number","Electrons are in the nucleus"],correctIndex:1,explanation:"Modern model includes nucleus and electron shells."},
    {id:"chem-T4-026",question:"An isotope has the same number of which particle as another isotope of the same element?",options:["Neutrons","Nucleons","Protons","Electrons only in ions"],correctIndex:2,explanation:"Isotopes are atoms of the same element, meaning they must have the exact same proton (atomic) number."},
    {id:"chem-T4-027",question:"Which electronic configuration corresponds to a Group 17 element in Period 3?",options:["2,8,7","2,7","2,8,8,1","2,8,6"],correctIndex:0,explanation:"Group 17 means 7 valence electrons. Period 3 means three occupied electron shells. This matches 2,8,7 (Chlorine)."},
    {id:"chem-T4-028",question:"Which species is isoelectronic with Ar and has a +1 charge?",options:["S²⁻","K⁺","Cl⁻","Ca²⁺"],correctIndex:1,explanation:"K⁺ has 18 electrons like Ar (19 − 1)."},
    {id:"chem-T4-029",question:"An ion X²⁺ has electron arrangement 2,8. In the Periodic Table X is most likely:",options:["Na","Mg","Al","Si"],correctIndex:1,explanation:"Mg atom is 2,8,2; losing two electrons gives 2,8."},
    {id:"chem-T4-030",question:"Why do isotopes of the same element have very similar chemistry?",options:["Same neutron number","Same electron configuration in the neutral atom","Same mass number","Same nuclear volume exactly"],correctIndex:1,explanation:"Chemistry is mostly controlled by electrons; isotopes share Z."},
    
    
    
    
    
    
    {id:"chem-T4-037",question:"Relative atomic mass is rarely a whole number for many elements because:",options:["Electrons have mass 1 u","Elements are mixtures of isotopes","Protons have fractional charge","The periodic table uses molar volume"],correctIndex:1,explanation:"Ar is a weighted mean of isotopic masses and abundances."},
    {id:"chem-T4-201",question:"A neutral atom has atomic number 17. How many electrons does it have?",options:["16","17","18","34"],correctIndex:1,explanation:"Neutral atoms have electrons equal to protons (atomic number)."},
    {id:"chem-T4-202",question:"Which isotope pair belongs to the same element?",options:["¹²C and ¹⁴N","³⁵Cl and ³⁷Cl","²³Na and ²⁴Mg","¹⁶O and ¹⁶N"],correctIndex:1,explanation:"Same element means same proton number."},
    
    {id:"chem-T4-204",question:"Which statement about a ¹²C atom and a ¹³C atom is correct?",options:["They have different chemical properties in all reactions","They have the same number of protons but different numbers of neutrons","They have different atomic numbers","They have different numbers of electrons in any state"],correctIndex:1,explanation:"Isotopes: same Z, different A."},
    {id:"chem-T4-205",question:"A species with 18 electrons and 17 protons is:",options:["Cl atom","Cl⁻ ion","Ar atom","K⁺ ion"],correctIndex:1,explanation:"17 protons = Cl; 18 electrons → −1 charge."},
    
    {id:"chem-T4-207",question:"Which statement about ions is correct?",options:["Na becomes Na⁺ by gaining one electron","Cl becomes Cl⁻ by losing one electron","Mg becomes Mg²⁺ by losing two electrons","O becomes O²⁻ by losing two electrons"],correctIndex:2,explanation:"Metals form positive ions by losing electrons."},
    
    {id:"chem-T4-209",question:"The atomic number of an element is defined by:",options:["The number of neutrons","The number of protons in the nucleus","The mass number","The number of electrons in any ion"],correctIndex:1,explanation:"Z identifies the element."},
    {id:"chem-T4-301",question:"An atom has mass number 27 and atomic number 13. Number of neutrons is:",options:["13","14","27","40"],correctIndex:1,explanation:"Neutrons = mass number - atomic number = 27 - 13."},
    {id:"chem-T4-302",question:"Which statement about isotopes is true?",options:["They have different proton numbers","They have same proton number but different neutron numbers","They always have different electron numbers in neutral atoms","They are different elements"],correctIndex:1,explanation:"Isotopes are atoms of the same element with different neutron numbers."},
    {id:"chem-T4-303",question:"Why do isotopes of an element usually have similar chemical properties?",options:["They have the same mass number","They have the same number of valence electrons","They have the same number of neutrons","They are all neutral"],correctIndex:1,explanation:"Chemistry is controlled by outer electrons, which are the same for isotopes of the same element."},
    {id:"chem-T4-304",question:"Which statement is correct for a neutral atom?",options:["Number of protons equals number of neutrons","Number of protons equals number of electrons","Number of electrons equals mass number","Number of neutrons equals atomic number"],correctIndex:1,explanation:"Neutral atoms have equal positive and negative charges."},
    {id:"chem-T4-305",question:"An atom with electronic arrangement 2,8,1 is most likely to form:",options:["A 1- ion","A 1+ ion","A 2+ ion","A 3- ion"],correctIndex:1,explanation:"It loses one outer electron to get a stable shell."},
    {id:"chem-T4-306",question:"An atom is electrically neutral because:",options:["It has no nucleus","Number of protons (positive) equals number of electrons (negative)","Neutrons cancel everything","All atoms have the same mass"],correctIndex:1,explanation:"Neutral atom: proton count = electron count. Adding or removing electrons creates an ion."},
    {id:"chem-T4-307",question:"Sulfur has atomic number 16. Its electronic configuration is:",options:["2, 8, 8","2, 6, 6, 2","2, 8, 6","2, 8, 4, 2"],correctIndex:2,explanation:"16 electrons fill: shell 1 = 2, shell 2 = 8, shell 3 = 6. So 2,8,6. (Note: 2+8+6=16 ✓)"},
    {id:"chem-T4-308",question:"Magnesium-26 has atomic number 12. The number of neutrons in this isotope is:",options:["12","14","26","8"],correctIndex:1,explanation:"Neutrons = mass number − proton number = 26 − 12 = 14."},
    {id:"chem-T4-309",question:"Two isotopes of bromine: ⁷⁹Br and ⁸¹Br both have atomic number 35. They have the same chemical properties because:",options:["They have different mass numbers","They have the same number of protons and the same electron configuration — chemistry depends on electrons","Neutrons cause reactions","They are different elements"],correctIndex:1,explanation:"Chemical behaviour depends on electron arrangement (same for both isotopes). Neutron count only affects mass/stability."},
    {id:"chem-T4-310",question:"The period number in the periodic table tells you:",options:["The number of valence electrons","The number of occupied electron shells in a neutral atom","The group number","The mass number"],correctIndex:1,explanation:"Period 1 → 1 shell; Period 2 → 2 shells; Period 3 → 3 shells. e.g. Na (Period 3) has electron configuration 2,8,1 — three shells."}
    ],
    extendedQuestions: [
        { 
            id: "chem-T4-E01", 
            commandWord: "Compare", 
            marks: 4, 
            syllabusNote: "Atomic Structure - Isotopes and their properties.", 
            prompt: "Carbon-12 ($^{12}_6\\text{C}$) and Carbon-14 ($^{14}_6\\text{C}$) are both naturally occurring isotopes of carbon.\n\nDefine the term *isotope* and explain why Carbon-12 and Carbon-14 have the same chemical properties but different physical properties.", 
            rubric: [ 
                "Defines isotopes: Atoms of the **same element** (or same proton number) with **different nucleon (mass) numbers** (or different numbers of neutrons).", 
                "States that Carbon-12 has 6 neutrons and Carbon-14 has 8 neutrons.",
                "Explains that chemical properties are determined by **electrons**. Both have 6 electrons (electronic configuration 2,4), so they react the same way.", 
                "Explains that physical properties (like density or melting point) depend on **mass**, which differs between the two isotopes." 
            ], 
            modelAnswer: "**Isotopes** are atoms of the same element that have the same proton number but different nucleon (mass) numbers. Carbon-12 and Carbon-14 both have 6 protons, but Carbon-12 has 6 neutrons while Carbon-14 has 8 neutrons.\n\nThey share the **same chemical properties** because chemical reactions involve valence electrons. Both isotopes have exactly 6 electrons and an identical electronic configuration (2,4). However, they have **different physical properties** (such as density) because physical properties are influenced by the mass of the atoms, and Carbon-14 is heavier than Carbon-12." 
        },
        {
            id: "chem-T4-E02",
            commandWord: "Deduce",
            marks: 6,
            syllabusNote: "Atomic Structure - Deducing atomic/ionic composition from table data.",
            prompt: "The table below shows information about four particles: A, B, C, and D.\n\n| Particle | Protons | Neutrons | Electrons |\n|---|---|---|---|\n| A | 8 | 8 | 10 |\n| B | 10 | 10 | 10 |\n| C | 8 | 10 | 8 |\n| D | 11 | 12 | 10 |\n\n(a) Which particle is an unreactive noble gas atom? Explain your choice.\n(b) Which two particles are isotopes of the same element? Give a reason.\n(c) Identify particle D and write its chemical symbol, including its charge.\n(d) Write the nuclide notation for the atom of particle C.",
            rubric: [
                "(a) Identifies **B**. Explains that it has equal protons and electrons (so it's a neutral atom) and 10 electrons gives it a full valence shell (2,8 configuration, Neon).",
                "(b) Identifies **A and C**. Explains they have the same number of protons (8) but different numbers of neutrons (8 and 10).",
                "(c) Identifies that D has 11 protons, so it is **Sodium (Na)**.",
                "(c) States the charge is **+1** (11 protons vs 10 electrons), so the symbol is **$Na^+$**.",
                "(d) States the element is Oxygen (8 protons).",
                "(d) Correctly writes the nuclide notation: **$^{18}_{8}\\text{O}$** (nucleon number = 8 + 10 = 18)."
            ],
            modelAnswer: "(a) **Particle B**. It has 10 protons and 10 electrons, making it a neutral atom. With 10 electrons, its electronic configuration is 2,8, which is a stable octet (Neon), making it an unreactive noble gas.\n(b) **Particles A and C**. They are atoms/ions of the same element because they both have 8 protons, but they are isotopes because they have different numbers of neutrons (8 and 10 respectively).\n(c) Particle D has 11 protons, so the element is sodium. It has 11 positive protons and only 10 negative electrons, giving it a net charge of +1. The symbol is **$Na^+$**.\n(d) Particle C has 8 protons (atomic number = 8) and 10 neutrons. Its nucleon number is 8 + 10 = 18. The nuclide notation is **$^{18}_{8}\\text{O}$**."
        }
    ],
    trueFalse: [
    {statement:"All atoms of an element must have the same mass number.",correct:false,explain:"Isotopes."},
    {statement:"A positive ion has fewer electrons than protons.",correct:true,explain:"Cation."},
    {statement:"The mass of an electron is roughly the same as a proton.",correct:false,explain:"Electron ~1/1836 u."},
    {statement:"Isotopes show identical chemical reactivity in most reactions.",correct:true,explain:"Same electron arrangement."},
    {statement:"The relative mass of an electron is considered to be exactly zero.",correct:false,explain:"While negligible, its relative mass is officially stated as 1/1840."},
    {statement:"Isotopes of the same element can be separated chemically because they react at different speeds.",correct:false,explain:"Isotopes undergo the exact same chemical reactions because they possess the same electronic configuration. They must be separated using physical properties."},
    {statement:"In nuclide notation, the smaller number is always the proton number.",correct:true,explain:"The proton (atomic) number (Z) represents just protons, while the nucleon number (A) represents protons + neutrons, so Z is always the smaller of the two numbers."},
    
    {statement:"The nucleus contains protons and neutrons in ordinary atoms.",correct:true,explain:"Except H-1 no neutron."},
    
    
    {statement:"Atomic number 6 always means carbon.",correct:true,explain:"Identity of element."},
    {statement:"An atom can gain two protons in a chemical reaction.",correct:false,explain:"Nuclear change, not chemical."},
    {statement:"Relative atomic mass is dimensionless on the carbon-12 scale.",correct:true,explain:"Ar has no unit."}
    ],
    });
})();
