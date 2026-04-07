(function () {
  window.__registerTopic({
    id: "12",
    theme: "Theme 2: Chemical Reactions",
    title: "Electrochemistry",
    cheatBlocks: [
        {
            "title": "Electrolysis",
            "points": [
                "Cathode − reduction; anode + oxidation.",
                "Molten ionic: metal at cathode, non-metal anode.",
                "Aqueous: H₂ or O₂ may form depending on reactivity/concentration."
            ]
        },
        {
            "title": "Cells",
            "points": [
                "Voltaic: spontaneous; more reactive metal negative electrode.",
                "Electroplating: object at cathode."
            ]
        }
    ,
    {
        "title": "Preferential Discharge",
        "points": [
            "At **cathode**: less reactive cation discharged first (e.g. Cu²⁺ before H⁺ before Na⁺ in aqueous).",
            "At **anode**: high [Cl⁻] → **Cl₂** preferred over O₂; dilute salt → **O₂** preferred.",
            "Inert electrodes (Pt, graphite): don't react with electrolyte or products.",
            "Active electrodes (Cu anode in CuSO₄): electrode dissolves (electrorefining)."
        ]
    },
    {
        "title": "Industrial Electrolysis",
        "points": [
            "**Al extraction**: molten Al₂O₃ dissolved in cryolite (lowers mp ~1000°C → ~950°C). Cathode: Al; anode: O₂ (burns C anode).",
            "**Chlor-alkali** (brine NaCl(aq)): anode → **Cl₂**; cathode → **H₂**; bulk solution → **NaOH(aq)**.",
            "**Electroplating**: object = cathode in metal ion solution. Anode = plating metal (dissolves to replenish ions).",
            "**Electrorefining Cu**: impure Cu anode dissolves; pure Cu deposits on cathode."
        ]
    }],
    infographics: [
      { image: "data/subjects/chemistry/images/reactions-07-electrochemistry.jpg", caption: "Electrolysis and Daniel cell" },
      { svg: "<svg viewBox=\"0 0 280 120\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"280\" height=\"120\" fill=\"#1c222d\"/><rect x=\"50\" y=\"35\" width=\"180\" height=\"55\" fill=\"#2a3344\" stroke=\"#5eead4\"/><rect x=\"60\" y=\"45\" width=\"35\" height=\"35\" fill=\"#6366f1\"/><rect x=\"185\" y=\"45\" width=\"35\" height=\"35\" fill=\"#f87171\"/><text x=\"58\" y=\"100\" fill=\"#8b95a8\" font-size=\"9\">cathode −</text><text x=\"175\" y=\"100\" fill=\"#8b95a8\" font-size=\"9\">anode +</text><text x=\"70\" y=\"28\" fill=\"#5eead4\" font-size=\"10\">Electrolysis · DC supply</text></svg>", caption: "Electrolysis cell (schematic)" }
    ],
    flashcards: [
        {
            "front": "Cathode attracts?",
            "back": "Cations."
        },
        {
            "front": "Anode molten NaCl?",
            "back": "Cl₂."
        },
        {
            "front": "Cu²⁺ aq inert electrodes?",
            "back": "Cu plates cathode."
        },
        {
            "front": "Electrolyte?",
            "back": "Ions conduct."
        },
        {
            "front": "Faraday (qual)?",
            "back": "More charge ∝ more substance."
        },
        {
            "front": "Mg–Cu cell negative?",
            "back": "Mg."
        },
        {
            "front": "Salt bridge?",
            "back": "Completes ion circuit."
        },
        {
            "front": "Standard electrode potential?",
            "back": "Measure vs reference."
        },
        {
            "front": "Al extraction?",
            "back": "Electrolysis molten cryolite Al₂O₃."
        },
        {
            "front": "Brine electrolysis diaphragm?",
            "back": "NaOH + Cl₂ + H₂."
        },
        {
            "front": "Anode in cell is oxidation?",
            "back": "Yes in voltaic cell."
        },
        {
            "front": "Overpotential?",
            "back": "Extra voltage needed (kinetics)."
        },
        {
            "front": "Inert electrode Pt?",
            "back": "Unreactive."
        },
        {
            "front": "Ion migration cathode?",
            "back": "Positive ions reduced."
        }
    ,
    { "front": "Half-equation at cathode: Cu²⁺?", "back": "$\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}(s)$ (reduction)." },
    { "front": "Half-equation at anode: 2Cl⁻?", "back": "$2\\text{Cl}^- \\rightarrow \\text{Cl}_2 + 2e^-$ (oxidation)." },
    { "front": "Electroplating: object is which electrode?", "back": "**Cathode** — metal ions are *reduced* (deposited) onto the object." },
    { "front": "Chlor-alkali: 3 products?", "back": "**Cl₂** (anode), **H₂** (cathode), **NaOH(aq)** in solution." },
    { "front": "Why cryolite with Al₂O₃?", "back": "Dissolves Al₂O₃ and **lowers melting point** of the mixture → less energy, cheaper." }],
    quiz: [
    {id:"chem-T12-001",question:"Cathode in electrolysis:",options:["Positive","Negative","No charge","AC"],correctIndex:1,explanation:"Cations go there."},
    {id:"chem-T12-002",question:"Molten PbBr₂ anode:",options:["Pb","Br₂","H₂","O₂"],correctIndex:1,explanation:"Halide oxidised."},
    {id:"chem-T12-003",question:"Electroplate object:",options:["Anode","Cathode","Either","Outside cell"],correctIndex:1,explanation:"Metal deposits."},
    {id:"chem-T12-004",question:"Electrolysis needs:",options:["Spontaneous","Electrical energy input","Light only","Heat only"],correctIndex:1,explanation:"Non-spontaneous driven."},
    {id:"chem-T12-005",question:"Dilute H₂SO₄ electrolysis inert:",options:["Na at cathode","H₂ and O₂","Only SO₂","Cu"],correctIndex:1,explanation:"Water electrolysis dominant."},
    {id:"chem-T12-006",question:"CuSO₄ aq Cu electrodes:",options:["Cu dissolves anode plates cathode","Only H₂","No change","Cl₂"],correctIndex:0,explanation:"Refining."},
    {id:"chem-T12-007",question:"More reactive metal as cell anode:",options:["Oxidised","Reduced","Inert","Coated"],correctIndex:0,explanation:"Loses e⁻."},
    {id:"chem-T12-008",question:"E° cell >0 means:",options:["Non-spontaneous","Spontaneous as written","Equilibrium","No electrons"],correctIndex:1,explanation:"ΔG<0."},
    {id:"chem-T12-009",question:"Ion flow salt bridge to cathode compartment:",options:["Anions","Cations","Electrons","None"],correctIndex:0,explanation:"Balance charge."},
    {id:"chem-T12-010",question:"Al extraction method:",options:["Coke reduction","Electrolysis molten","Displacement","Acid leach only"],correctIndex:1,explanation:"Too reactive."},
    {id:"chem-T12-011",question:"Na extraction:",options:["H₂ reduction","Electrolysis molten NaCl","Carbon only","Titanium catalyst"],correctIndex:1,explanation:"Reactive metal."},
    {id:"chem-T12-012",question:"Charge on anion moves to anode in electrolysis:",options:["True migration","False","Only metals","Gas only"],correctIndex:0,explanation:"Anions to positive."},
    {id:"chem-T12-013",question:"Brine products at electrodes:",options:["Na metal always","Cl₂ H₂ NaOH","Only O₂","N₂"],correctIndex:1,explanation:"Industrial chlor-alkali."},
    {id:"chem-T12-014",question:"Why cryolite in Al extraction:",options:["Lowers melting point","Increases mp","Colour","Catalyst only"],correctIndex:0,explanation:"Solvent for alumina."},
    {id:"chem-T12-015",question:"Fuel cell vehicle advantage:",options:["Only water from H₂/O₂ ideal","No energy input ever","Solid only","No storage issue"],correctIndex:0,explanation:"Clean product."},
    {id:"chem-T12-016",question:"Corrosion iron needs:",options:["O₂ and H₂O often","Only N₂","Only dry air","Vacuum"],correctIndex:0,explanation:"Electrochemical rust."},
    {id:"chem-T12-017",question:"Sacrificial anode connected to ship:",options:["Cathode protected","More reactive metal corrodes","No effect","Insulator"],correctIndex:1,explanation:"Zn/Mg blocks."},
    {id:"chem-T12-018",question:"Electrolysis of acidified water O₂ at:",options:["Cathode","Anode","Both","Neither"],correctIndex:1,explanation:"OH⁻/H₂O oxidised."},
    {id:"chem-T12-019",question:"Silver plating electrolyte:",options:["Ag⁺ solution","Only NaCl","Only sugar","Oil"],correctIndex:0,explanation:"Ag source."},
    {id:"chem-T12-020",question:"Charge carriers in metal wire:",options:["Ions","Electrons","Protons","Neutrons"],correctIndex:1,explanation:"e⁻ flow."},
    {id:"chem-T12-021",question:"Daniel cell Zn in ZnSO₄:",options:["Positive electrode","Negative electrode","Salt","Membrane"],correctIndex:1,explanation:"Zn oxidises."},
    {id:"chem-T12-022",question:"During charging lead-acid battery:",options:["Electrolysis reversing cell","Only discharge","No redox","Fusion"],correctIndex:0,explanation:"Non-spontaneous charge."},
    {id:"chem-T12-023",question:"Why AC not used simple electrolysis cell:",options:["No net product","Better yield","Safer always","Required"],correctIndex:0,explanation:"Alternating redox."},
    {id:"chem-T12-024",question:"Concentrated NaCl brine anode:",options:["O₂ preferred","Cl₂ preferred","H₂","Na"],correctIndex:1,explanation:"High [Cl⁻]."},
    {id:"chem-T12-025",question:"Reduction at cathode always involves:",options:["Gain of electrons","Loss of electrons","Proton emission","Neutron capture"],correctIndex:0,explanation:"Definition."},
    {id:"chem-T12-026",question:"Nernst idea (qual):",options:["Concentration affects E","No effect","Only gas colour","Only solid"],correctIndex:0,explanation:"Le Chatelier on potentials."},
    {id:"chem-T12-027",question:"Electrolysis of molten NaCl: product at the positive anode is:",options:["Na metal","Cl₂ gas","H₂ gas","O₂ gas"],correctIndex:1,explanation:"Chloride ions are oxidised to chlorine."},
    {id:"chem-T12-028",question:"Electrolysis of dilute Na₂SO₄(aq) with inert electrodes mainly produces at the electrodes:",options:["Na and S","H₂ at cathode and O₂ at anode","Cl₂ and Na","Only H₂ at both"],correctIndex:1,explanation:"Water is split preferentially in dilute sulfate (H⁺/OH⁻ from water)."},
    {id:"chem-T12-029",question:"In a voltaic cell, electrons travel externally from:",options:["Cathode to anode","Anode to cathode","Salt bridge to air","Positive cathode to positive anode"],correctIndex:1,explanation:"Oxidation at anode releases electrons that flow to cathode."},
    {id:"chem-T12-030",question:"Electrorefining copper: impure Cu anode, pure Cu cathode. What happens at the anode?",options:["Cu²⁺ plates","Cu dissolves into solution as Cu²⁺","O₂ evolves only","Na deposits"],correctIndex:1,explanation:"Active metal dissolves; purer Cu plates at cathode."},
    {id:"chem-T12-031",question:"Why is molten cryolite used with alumina in aluminium extraction?",options:["It is the main ore","It lowers the melting point of the mixture","It removes oxygen without electricity","It is the only source of aluminium"],correctIndex:1,explanation:"Al₂O₃ has a very high mp; cryolite dissolves it at lower T."},
    {id:"chem-T12-032",question:"In the chlor-alkali diaphragm cell (concept), separating anode and cathode compartments reduces:",options:["Voltage need","Mixing of OH⁻ with Cl₂ (unwanted reactions)","Water density","Faraday efficiency always to zero"],correctIndex:1,explanation:"OH⁻ and Cl₂ can react if mixed."},
    {id:"chem-T12-033",question:"A sacrificial zinc block on steel works because Zn:",options:["Is less reactive than Fe","Is more reactive and preferentially oxidises","Insulates the steel","Catalyses rust"],correctIndex:1,explanation:"Zn corrodes instead of Fe (cathodic protection)."},
    {id:"chem-T12-034",question:"During discharge of a simple Zn–Cu voltaic cell, the mass of the Zn electrode:",options:["Increases","Decreases","Stays exactly constant","Doubles"],correctIndex:1,explanation:"Zn oxidises to Zn²⁺ and enters solution."},
    {id:"chem-T12-035",question:"Why does pure water conduct electricity poorly in electrolysis?",options:["Water has no dipole","Very low concentration of ions (H⁺/OH⁻) from autoionisation","Electrons swim in water freely","O₂ blocks current"],correctIndex:1,explanation:"Adding an electrolyte increases conductivity."},
    {id:"chem-T12-036",question:"Fuel cell advantage over combustion in a heat engine (ideal comparison):",options:["Always 100% efficient","Direct chemical-to-electrical conversion can be more efficient than Carnot-limited heat engines","No redox occurs","Produces only solid carbon"],correctIndex:1,explanation:"Avoids some thermal losses — syllabus-level idea."},
    {id:"chem-T12-201",question:"During electrolysis of molten PbBr₂ with inert electrodes, bromide ions are oxidised at:",options:["The cathode","The anode","Both electrodes","Neither"],correctIndex:1,explanation:"Anode = oxidation; 2Br⁻ → Br₂ + 2e⁻."},
    {id:"chem-T12-202",question:"In electrolysis of dilute H₂SO₄(aq) with Pt electrodes, the main product at the cathode is usually:",options:["O₂","H₂","SO₂","Na"],correctIndex:1,explanation:"H⁺ reduced to H₂ in acidic aqueous electrolysis."},
    {id:"chem-T12-203",question:"Why is cryolite used in aluminium extraction with molten Al₂O₃?",options:["It is the main ore","It lowers the melting point of the mixture","It removes oxygen without electricity","It is cheaper than aluminium"],correctIndex:1,explanation:"Al₂O₃ has very high mp; cryolite dissolves it at lower T."},
    {id:"chem-T12-204",question:"A Faraday (F) links:",options:["Mass of metal to gas volume only","Moles of electrons to electric charge","Temperature to pressure","Catalyst mass to rate"],correctIndex:1,explanation:"Q = nF for electrons transferred."},
    {id:"chem-T12-205",question:"In electroplating silver onto a spoon, the spoon should be:",options:["The anode","The cathode","The electrolyte","The salt bridge"],correctIndex:1,explanation:"Ag⁺ reduces onto the object (cathode)."},
    {id:"chem-T12-206",question:"In a voltaic cell, electrons flow in the external wire from:",options:["Cathode to anode","Anode to cathode","Salt bridge to air","Positive cathode to positive anode"],correctIndex:1,explanation:"Oxidation at anode releases electrons."},
    {id:"chem-T12-207",question:"Electrolysis of concentrated NaCl(aq) with inert electrodes often produces Cl₂ at the anode because:",options:["OH⁻ is never oxidised","High [Cl⁻] favours chloride discharge over oxygen evolution","Na metal always forms","Water never oxidises"],correctIndex:1,explanation:"Preferential discharge order depends on concentration."},
    {id:"chem-T12-208",question:"Sacrificial zinc protects steel because Zn:",options:["Is less reactive than Fe","Is more reactive and preferentially oxidises","Insulates the steel","Catalyses rust"],correctIndex:1,explanation:"Zn corrodes instead of Fe."},
    {id:"chem-T12-209",question:"Pure water electrolyses slowly without added ions mainly because:",options:["Water has no dipole","Very low ion concentration","Electrons swim freely","O₂ blocks current"],correctIndex:1,explanation:"Low conductivity — need electrolyte."},
    {id:"chem-T12-301",question:"Electrolysis of CuSO₄(aq) with copper electrodes: the net effect over time is:",options:["Copper deposits on cathode only; anode is unchanged","Copper dissolves from the anode and plates onto the cathode — net copper transfer","Solution concentration rises indefinitely","H₂ and O₂ are the main products"],correctIndex:1,explanation:"Electrorefining: Cu → Cu²⁺ at anode; Cu²⁺ + 2e⁻ → Cu at cathode. [Cu²⁺] stays roughly constant."},
    {id:"chem-T12-302",question:"To electroplate a steel spoon with silver, the spoon must be:",options:["The anode in a silver nitrate solution","The cathode in a silver nitrate solution","Either electrode — it doesn't matter","Outside the electrolysis cell"],correctIndex:1,explanation:"Ag⁺ + e⁻ → Ag on the cathode (the spoon)."},
    {id:"chem-T12-303",question:"Electrolysis of acidified water produces H₂ and O₂. The volume ratio H₂ : O₂ is:",options:["1 : 2","2 : 1","1 : 1","4 : 1"],correctIndex:1,explanation:"2H₂O → 2H₂ + O₂ → 2 mol H₂ : 1 mol O₂ → volume ratio 2:1."},
    {id:"chem-T12-304",question:"Aluminium cannot be extracted by carbon reduction of Al₂O₃ because:",options:["Al is below carbon in the reactivity series","Al is more reactive than carbon — carbon cannot reduce Al₂O₃ under practical conditions","Al₂O₃ has too low a melting point","Al is a noble metal"],correctIndex:1,explanation:"Very reactive metals need electrolysis; carbon reduction only works for metals below Al in the series."},
    {id:"chem-T12-305",question:"In the chlor-alkali process (brine electrolysis), the THREE products formed are:",options:["Na, Cl₂, H₂","Cl₂, H₂, and NaOH solution","Na, O₂, HCl","NaCl, H₂, O₂"],correctIndex:1,explanation:"At cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (NaOH); at anode: 2Cl⁻ → Cl₂."},
    {id:"chem-T12-306",question:"In a hydrogen fuel cell, hydrogen is oxidised at the:",options:["Cathode","Anode","Salt bridge","Electrolyte only"],correctIndex:1,explanation:"Anode = oxidation: H₂ → 2H⁺ + 2e⁻. Electrons flow through external circuit."},
    {id:"chem-T12-307",question:"Corrosion of iron is accelerated when two different metals are in electrical contact in an electrolyte (bimetallic corrosion) because:",options:["The less reactive metal becomes the anode and corrodes","The more reactive metal becomes the anode and preferentially oxidises","Both metals corrode at equal rate","No electrons transfer"],correctIndex:1,explanation:"More reactive metal = anode, corrodes sacrificially. This is also the principle of galvanic corrosion."},
    {id:"chem-T12-308",question:"The quantity of product in electrolysis (Faraday's law concept) depends on:",options:["Only temperature","Charge passed (current × time) and the number of electrons per ion","Only the colour of the electrolyte","The shape of the electrode only"],correctIndex:1,explanation:"$Q = It$; moles of electrons = $Q/F$; links to moles of product via stoichiometry."}
    ],
    trueFalse: [
    {statement:"In electrolysis the cathode is where oxidation happens.",correct:false,explain:"Reduction at cathode."},
    {statement:"Molten oxides of very reactive metals are electrolysed to extract metal.",correct:true,explain:"Al, Na, etc."},
    {statement:"Pure water electrolyses easily without ions.",correct:false,explain:"Very low conductivity."},
    {statement:"In a voltaic cell electrons flow external circuit anode to cathode.",correct:true,explain:"Conventional current opposite."},
    {statement:"Copper can be purified by electrolysis with impure Cu anode.",correct:true,explain:"Electrorefining."},
    {statement:"Hydrogen fuel cell produces electricity from H₂ and O₂.",correct:true,explain:"Redox cell."},
    {statement:"Electrolysis always produces elements at both electrodes.",correct:false,explain:"Could be water ions products."},
    {statement:"Anode in electrolysis is positive terminal of supply.",correct:true,explain:"Attracts anions."},
    {statement:"Faraday's laws link mass to charge.",correct:true,explain:"m ∝ Q."},
    {statement:"Sea water accelerates steel corrosion.",correct:true,explain:"Electrolyte."},
    {statement:"Gold plating uses Au³⁺ reduction at cathode.",correct:true,explain:"Thin layer."},
    {statement:"Mercury cell for brine is environmentally phased.",correct:true,explain:"Mercury pollution."}
    ],
    });
})();
