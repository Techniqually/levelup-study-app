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
        }
    ],
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
    ],
    quiz: [
    {question:"Neutron has charge:",options:["+1","-1","0","+2"],correctIndex:2,explanation:"Neutral."},
    {question:"An atom with 15 p and 15 e is:",options:["Anion","Cation","Neutral","Ion always"],correctIndex:2,explanation:"Balanced charges."},
    {question:"Ion with 11 p and 10 e:",options:["Na⁺","Na⁻","Ne","Mg²⁺"],correctIndex:0,explanation:"Lost one electron."},
    {question:"Isotopes differ in:",options:["Proton count","Electron count in neutral","Neutron count","Position in table"],correctIndex:2,explanation:"Same element."},
    {question:"Mass number 23, atomic number 11 → neutrons:",options:["11","12","23","34"],correctIndex:1,explanation:"23−11=12."},
    {question:"Which defines the element:",options:["Neutron number","Proton number","Mass number","Electron shells"],correctIndex:1,explanation:"Z unique."},
    {question:"Cl atom becomes Cl⁻ by:",options:["Losing electron","Gaining electron","Losing proton","Fusion"],correctIndex:1,explanation:"Needs −1 charge."},
    {question:"Relative atomic mass of chlorine ~35.5 because:",options:["Single isotope","Mixture of isotopes","Error","Only Cl⁻"],correctIndex:1,explanation:"35Cl and 37Cl."},
    {question:"Electronic config of Al (13):",options:["2,8,4","2,8,3","2,11","8,5"],correctIndex:1,explanation:"2+8+3=13."},
    {question:"Valence electrons in group 17 atom:",options:["1","7","8","2"],correctIndex:1,explanation:"Halogens need 1 for octet."},
    {question:"Nuclear charge experienced by outer electron across period:",options:["Decreases","Increases","Constant","Zero"],correctIndex:1,explanation:"More protons."},
    {question:"Cation is always:",options:["Larger than parent atom","Smaller than parent atom","Same size","No charge"],correctIndex:1,explanation:"Fewer electrons, same nucleus pull."},
    {question:"Anion compared to atom:",options:["Smaller","Larger","Same","No electrons"],correctIndex:1,explanation:"More e⁻–e⁻ repulsion."},
    {question:"α decay: mass number changes by:",options:["0","4 decrease","4 increase","1 increase"],correctIndex:1,explanation:"He nucleus lost."},
    {question:"β⁻ decay Z:",options:["Decreases by 1","Increases by 1","Unchanged","Doubles"],correctIndex:1,explanation:"n→p+e⁻."},
    {question:"Which is deflected in electric field:",options:["Neutron beam","Electron beam","γ ray","All equally"],correctIndex:1,explanation:"Charged particles."},
    {question:"Isotopes have same:",options:["Chemical properties mostly","Mass number always","Neutron count","Density in all forms"],correctIndex:0,explanation:"Same electron config."},
    {question:"Mass spectrometer separates:",options:["By colour","By mass/charge","By taste","By volume only"],correctIndex:1,explanation:"m/z."},
    {question:"Half-life is:",options:["Time for half nuclei decay","Time to zero","Double mass","Bond length"],correctIndex:0,explanation:"Radioactivity."},
    {question:"γ emission:",options:["Changes Z","No change in Z or A","Adds proton","Only for metals"],correctIndex:1,explanation:"Electromagnetic."},
    {question:"First ionisation energy of Na vs Mg:",options:["Na higher","Mg higher","Equal","Zero"],correctIndex:1,explanation:"Mg smaller radius, higher IE."},
    {question:"Noble gas unreactive largely because:",options:["Large atoms","Full outer shell","No mass","Liquid"],correctIndex:1,explanation:"Stable config."},
    {question:"Number of neutrons in ¹⁴C:",options:["6","8","14","20"],correctIndex:1,explanation:"14−6=8."},
    {question:"Species isoelectronic with Ne:",options:["Na⁺","F⁻","Both","Neither"],correctIndex:2,explanation:"10 electrons each."},
    {question:"Dalton's atomic theory limitation:",options:["Atoms indivisible","Isotopes exist","Law of multiple proportions","Conservation of mass"],correctIndex:1,explanation:"Substructure discovered."},
    {question:"Penetration: s vs p electron near nucleus:",options:["s less likely","s more likely","Same","Neither exists"],correctIndex:1,explanation:"s closer on average."},
    {question:"Atomic radius trend down group:",options:["Decreases","Increases","Constant","Oscillates randomly"],correctIndex:1,explanation:"Extra shell."}
    ],
    trueFalse: [
    {statement:"All atoms of an element must have the same mass number.",correct:false,explain:"Isotopes."},
    {statement:"A positive ion has fewer electrons than protons.",correct:true,explain:"Cation."},
    {statement:"The mass of an electron is roughly the same as a proton.",correct:false,explain:"Electron ~1/1836 u."},
    {statement:"Isotopes show identical chemical reactivity in most reactions.",correct:true,explain:"Same electron arrangement."},
    {statement:"β⁺ decay decreases atomic number by 1.",correct:false,explain:"β⁺ (positron) decreases Z by 1 — actually proton→neutron; user O-level often β⁻ only."},
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
