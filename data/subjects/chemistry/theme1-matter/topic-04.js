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
        }
    ,
    {
        "title": "Electronic Configuration Guide",
        "points": [
            "Fill shells in order: shell 1 → max **2**; shell 2 → max **8**; shell 3 → max **8** (up to Z = 20).",
            "Write as comma-separated numbers, e.g. Cl (Z=17): **2, 8, 7**.",
            "**Group number** (1–7) = number of valence electrons in the outermost shell.",
            "**Period number** = number of occupied electron shells.",
            "**Ion**: cation loses outer e⁻; anion gains e⁻ to match noble gas config."
        ]
    }],
    infographics: [
      { image: "data/subjects/chemistry/images/matter-04-atomic-structure.jpg", caption: "Bohr-style atom: nucleus and shells" },
      { svg: "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"260\" height=\"150\" fill=\"#1c222d\"/><circle cx=\"130\" cy=\"75\" r=\"45\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"130\" cy=\"75\" r=\"14\" fill=\"#f87171\"/><text x=\"118\" y=\"80\" fill=\"#fff\" font-size=\"10\">nucleus</text><circle cx=\"90\" cy=\"50\" r=\"4\" fill=\"#5eead4\"/><circle cx=\"175\" cy=\"95\" r=\"4\" fill=\"#5eead4\"/><circle cx=\"165\" cy=\"48\" r=\"4\" fill=\"#5eead4\"/><text x=\"12\" y=\"138\" fill=\"#8b95a8\" font-size=\"9\">Protons+neutrons in nucleus · electrons in shells</text></svg>", caption: "Nucleus + electron shells (schematic)" }
    ],
    flashcards: [
        {
            "front": "Atomic number?",
            "back": "Number of protons."
        },
        {
            "front": "Mass number?",
            "back": "Protons + neutrons."
        },
        {
            "front": "Isotope of carbon?",
            "back": "Same 6 protons; C-12 vs C-14 differ in neutrons."
        },
        {
            "front": "Mg²⁺ formed how?",
            "back": "Mg loses 2 electrons."
        },
        {
            "front": "Cl⁻?",
            "back": "Cl gains one electron."
        },
        {
            "front": "Where is mass concentrated?",
            "back": "Nucleus."
        },
        {
            "front": "Relative atomic mass?",
            "back": "Weighted mean of isotope masses."
        },
        {
            "front": "First shell max electrons?",
            "back": "2."
        },
        {
            "front": "Sodium electron arrangement?",
            "back": "2,8,1."
        },
        {
            "front": "Noble gas outer shell (except He)?",
            "back": "8 electrons (octet)."
        },
        {
            "front": "α particle composition?",
            "back": "2p + 2n (He nucleus)."
        },
        {
            "front": "β⁻ emission?",
            "back": "Neutron → proton + electron (atomic number up by 1)."
        },
        {
            "front": "Ionisation energy trend across period?",
            "back": "Generally increases."
        },
        {
            "front": "Why smaller atomic radius across period?",
            "back": "Same shell, more nuclear charge pulls electrons in."
        }
    ,
    { "front": "Electronic config of Na (Z=11)?", "back": "**2, 8, 1** → Period 3, Group 1, 1 valence electron." },
    { "front": "Electronic config of Cl (Z=17)?", "back": "**2, 8, 7** → Period 3, Group 17, 7 valence electrons." },
    { "front": "Electronic config of Ca (Z=20)?", "back": "**2, 8, 8, 2** → Period 4, Group 2." },
    { "front": "Neutrons = ?", "back": "$\\text{neutrons} = A - Z$ (mass number minus atomic number)." },
    { "front": "Why isotopes have same chemistry?", "back": "Same **number of protons and electrons** → same electronic configuration → identical chemical behaviour." }],
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
    {id:"chem-T4-011",question:"Nuclear charge experienced by outer electron across period:",options:["Decreases","Increases","Constant","Zero"],correctIndex:1,explanation:"More protons."},
    {id:"chem-T4-012",question:"Cation is always:",options:["Larger than parent atom","Smaller than parent atom","Same size","No charge"],correctIndex:1,explanation:"Fewer electrons, same nucleus pull."},
    {id:"chem-T4-013",question:"Anion compared to atom:",options:["Smaller","Larger","Same","No electrons"],correctIndex:1,explanation:"More e⁻–e⁻ repulsion."},
    {id:"chem-T4-014",question:"α decay: mass number changes by:",options:["0","4 decrease","4 increase","1 increase"],correctIndex:1,explanation:"He nucleus lost."},
    {id:"chem-T4-015",question:"β⁻ decay Z:",options:["Decreases by 1","Increases by 1","Unchanged","Doubles"],correctIndex:1,explanation:"n→p+e⁻."},
    {id:"chem-T4-016",question:"Which is deflected in electric field:",options:["Neutron beam","Electron beam","γ ray","All equally"],correctIndex:1,explanation:"Charged particles."},
    {id:"chem-T4-017",question:"Isotopes have same:",options:["Chemical properties mostly","Mass number always","Neutron count","Density in all forms"],correctIndex:0,explanation:"Same electron config."},
    {id:"chem-T4-018",question:"Mass spectrometer separates:",options:["By colour","By mass/charge","By taste","By volume only"],correctIndex:1,explanation:"m/z."},
    {id:"chem-T4-019",question:"Half-life is:",options:["Time for half nuclei decay","Time to zero","Double mass","Bond length"],correctIndex:0,explanation:"Radioactivity."},
    {id:"chem-T4-020",question:"γ emission:",options:["Changes Z","No change in Z or A","Adds proton","Only for metals"],correctIndex:1,explanation:"Electromagnetic."},
    {id:"chem-T4-021",question:"First ionisation energy of Na vs Mg:",options:["Na higher","Mg higher","Equal","Zero"],correctIndex:1,explanation:"Mg smaller radius, higher IE."},
    {id:"chem-T4-022",question:"Noble gas unreactive largely because:",options:["Large atoms","Full outer shell","No mass","Liquid"],correctIndex:1,explanation:"Stable config."},
    {id:"chem-T4-023",question:"Number of neutrons in ¹⁴C:",options:["6","8","14","20"],correctIndex:1,explanation:"14−6=8."},
    {id:"chem-T4-024",question:"Which pair has the same number of electrons?",options:["Na atom and Ne atom","Na⁺ and Ne atom","Mg atom and Ne atom","Cl atom and Ar atom"],correctIndex:1,explanation:"Na⁺ has 10 electrons, same as Ne."},
    {id:"chem-T4-025",question:"A key idea in the modern atomic model is:",options:["Atoms are indivisible solid spheres","Atoms contain a tiny nucleus and electrons","All atoms of an element have the same mass number","Electrons are in the nucleus"],correctIndex:1,explanation:"Modern model includes nucleus and electron shells."},
    {id:"chem-T4-026",question:"Across a period, first ionisation energy generally:",options:["Decreases","Increases","Stays exactly constant","Becomes zero"],correctIndex:1,explanation:"Stronger nuclear attraction usually makes electrons harder to remove."},
    {id:"chem-T4-027",question:"Atomic radius trend down group:",options:["Decreases","Increases","Constant","Oscillates randomly"],correctIndex:1,explanation:"Extra shell."},
    {id:"chem-T4-028",question:"Which species is isoelectronic with Ar and has a +1 charge?",options:["S²⁻","K⁺","Cl⁻","Ca²⁺"],correctIndex:1,explanation:"K⁺ has 18 electrons like Ar (19 − 1)."},
    {id:"chem-T4-029",question:"An ion X²⁺ has electron arrangement 2,8. In the Periodic Table X is most likely:",options:["Na","Mg","Al","Si"],correctIndex:1,explanation:"Mg atom is 2,8,2; losing two electrons gives 2,8."},
    {id:"chem-T4-030",question:"Why do isotopes of the same element have very similar chemistry?",options:["Same neutron number","Same electron configuration in the neutral atom","Same mass number","Same nuclear volume exactly"],correctIndex:1,explanation:"Chemistry is mostly controlled by electrons; isotopes share Z."},
    {id:"chem-T4-031",question:"β⁻ decay in a nucleus increases Z because:",options:["A proton becomes a neutron","A neutron becomes a proton","A gamma is emitted","Mass number always increases by 4"],correctIndex:1,explanation:"A neutron converts to a proton + electron (β⁻) + antineutrino."},
    {id:"chem-T4-032",question:"The mass spectrum of chlorine shows peaks at m/z 35 and 37 mainly due to:",options:["Different charge states","Isotopes ³⁵Cl and ³⁷Cl","Ionisation only","Electron diffraction"],correctIndex:1,explanation:"Isotopes give different molecular/atomic masses."},
    {id:"chem-T4-033",question:"First ionisation energy generally increases across Period 3 mainly because:",options:["Atoms get larger","Effective nuclear charge increases for valence electrons","Metallic character increases","Shielding increases without limit"],correctIndex:1,explanation:"Greater nuclear pull on outer electrons (same shell)."},
    {id:"chem-T4-034",question:"Which statement about γ-radiation from a nucleus is correct?",options:["It changes atomic number by 2","It carries no rest mass charge","It is slow helium nuclei","It always increases mass number"],correctIndex:1,explanation:"Gamma is electromagnetic radiation; no change to Z or A."},
    {id:"chem-T4-035",question:"A ²³⁸U atom undergoes α-decay. The daughter nucleus has mass number:",options:["234","238","242","236"],correctIndex:0,explanation:"α is ⁴He; A decreases by 4 → 234."},
    {id:"chem-T4-036",question:"Why is the atomic radius of a Na atom larger than a Mg atom in Period 3?",options:["Mg has fewer protons","Mg’s higher nuclear charge pulls the same-shell electrons closer","Na has more valence electrons","Mg always has d-electrons"],correctIndex:1,explanation:"Across a period, increasing Z contracts the radius for the same shell."},
    {id:"chem-T4-037",question:"Relative atomic mass is rarely a whole number for many elements because:",options:["Electrons have mass 1 u","Elements are mixtures of isotopes","Protons have fractional charge","The periodic table uses molar volume"],correctIndex:1,explanation:"Ar is a weighted mean of isotopic masses and abundances."},
    {id:"chem-T4-201",question:"A neutral atom has atomic number 17. How many electrons does it have?",options:["16","17","18","34"],correctIndex:1,explanation:"Neutral atoms have electrons equal to protons (atomic number)."},
    {id:"chem-T4-202",question:"Which isotope pair belongs to the same element?",options:["¹²C and ¹⁴N","³⁵Cl and ³⁷Cl","²³Na and ²⁴Mg","¹⁶O and ¹⁶N"],correctIndex:1,explanation:"Same element means same proton number."},
    {id:"chem-T4-203",question:"Across Period 3, atomic radius decreases mainly because:",options:["More shells are added","Nuclear charge increases while electrons are added to the same principal shell","Metallic bonding strengthens","Neutron number decreases"],correctIndex:1,explanation:"Same-shell screening; increasing Z pulls electrons in."},
    {id:"chem-T4-204",question:"Which statement about a ¹²C atom and a ¹³C atom is correct?",options:["They have different chemical properties in all reactions","They have the same number of protons but different numbers of neutrons","They have different atomic numbers","They have different numbers of electrons in any state"],correctIndex:1,explanation:"Isotopes: same Z, different A."},
    {id:"chem-T4-205",question:"A species with 18 electrons and 17 protons is:",options:["Cl atom","Cl⁻ ion","Ar atom","K⁺ ion"],correctIndex:1,explanation:"17 protons = Cl; 18 electrons → −1 charge."},
    {id:"chem-T4-206",question:"The mass spectrum peak intensity of an isotope is related to:",options:["Its nuclear charge only","Its relative abundance in the sample","Its colour","Its boiling point"],correctIndex:1,explanation:"Taller peak usually means more abundant isotope."},
    {id:"chem-T4-207",question:"Which statement about ions is correct?",options:["Na becomes Na⁺ by gaining one electron","Cl becomes Cl⁻ by losing one electron","Mg becomes Mg²⁺ by losing two electrons","O becomes O²⁻ by losing two electrons"],correctIndex:2,explanation:"Metals form positive ions by losing electrons."},
    {id:"chem-T4-208",question:"γ-emission from an excited nucleus:",options:["Increases mass number by 4","Does not change Z or A","Converts a neutron to a proton","Always ejects an α particle"],correctIndex:1,explanation:"Gamma is electromagnetic radiation from nucleus de-excitation."},
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
    trueFalse: [
    {statement:"All atoms of an element must have the same mass number.",correct:false,explain:"Isotopes."},
    {statement:"A positive ion has fewer electrons than protons.",correct:true,explain:"Cation."},
    {statement:"The mass of an electron is roughly the same as a proton.",correct:false,explain:"Electron ~1/1836 u."},
    {statement:"Isotopes show identical chemical reactivity in most reactions.",correct:true,explain:"Same electron arrangement."},
    {statement:"In β⁻ decay, atomic number increases by 1.",correct:true,explain:"A neutron changes into a proton and an electron is emitted."},
    {statement:"Gamma rays are high-energy electromagnetic waves.",correct:true,explain:"No rest mass."},
    {statement:"The nucleus contains protons and neutrons in ordinary atoms.",correct:true,explain:"Except H-1 no neutron."},
    {statement:"Ionisation energy is energy to remove outermost electron from gaseous atom.",correct:true,explain:"Definition."},
    {statement:"Electrons in the same shell have exactly the same energy in multi-electron atoms.",correct:false,explain:"s,p,d subshell splitting."},
    {statement:"Atomic number 6 always means carbon.",correct:true,explain:"Identity of element."},
    {statement:"An atom can gain two protons in a chemical reaction.",correct:false,explain:"Nuclear change, not chemical."},
    {statement:"Relative atomic mass is dimensionless on the carbon-12 scale.",correct:true,explain:"Ar has no unit."}
    ],
    });
})();
