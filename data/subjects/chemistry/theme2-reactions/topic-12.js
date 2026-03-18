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
    ],
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
    ],
    quiz: [
    {question:"Cathode in electrolysis:",options:["Positive","Negative","No charge","AC"],correctIndex:1,explanation:"Cations go there."},
    {question:"Molten PbBr₂ anode:",options:["Pb","Br₂","H₂","O₂"],correctIndex:1,explanation:"Halide oxidised."},
    {question:"Electroplate object:",options:["Anode","Cathode","Either","Outside cell"],correctIndex:1,explanation:"Metal deposits."},
    {question:"Electrolysis needs:",options:["Spontaneous","Electrical energy input","Light only","Heat only"],correctIndex:1,explanation:"Non-spontaneous driven."},
    {question:"Dilute H₂SO₄ electrolysis inert:",options:["Na at cathode","H₂ and O₂","Only SO₂","Cu"],correctIndex:1,explanation:"Water electrolysis dominant."},
    {question:"CuSO₄ aq Cu electrodes:",options:["Cu dissolves anode plates cathode","Only H₂","No change","Cl₂"],correctIndex:0,explanation:"Refining."},
    {question:"More reactive metal as cell anode:",options:["Oxidised","Reduced","Inert","Coated"],correctIndex:0,explanation:"Loses e⁻."},
    {question:"E° cell >0 means:",options:["Non-spontaneous","Spontaneous as written","Equilibrium","No electrons"],correctIndex:1,explanation:"ΔG<0."},
    {question:"Ion flow salt bridge to cathode compartment:",options:["Anions","Cations","Electrons","None"],correctIndex:0,explanation:"Balance charge."},
    {question:"Al extraction method:",options:["Coke reduction","Electrolysis molten","Displacement","Acid leach only"],correctIndex:1,explanation:"Too reactive."},
    {question:"Na extraction:",options:["H₂ reduction","Electrolysis molten NaCl","Carbon only","Titanium catalyst"],correctIndex:1,explanation:"Reactive metal."},
    {question:"Charge on anion moves to anode in electrolysis:",options:["True migration","False","Only metals","Gas only"],correctIndex:0,explanation:"Anions to positive."},
    {question:"Brine products at electrodes:",options:["Na metal always","Cl₂ H₂ NaOH","Only O₂","N₂"],correctIndex:1,explanation:"Industrial chlor-alkali."},
    {question:"Why cryolite in Al extraction:",options:["Lowers melting point","Increases mp","Colour","Catalyst only"],correctIndex:0,explanation:"Solvent for alumina."},
    {question:"Fuel cell vehicle advantage:",options:["Only water from H₂/O₂ ideal","No energy input ever","Solid only","No storage issue"],correctIndex:0,explanation:"Clean product."},
    {question:"Corrosion iron needs:",options:["O₂ and H₂O often","Only N₂","Only dry air","Vacuum"],correctIndex:0,explanation:"Electrochemical rust."},
    {question:"Sacrificial anode connected to ship:",options:["Cathode protected","More reactive metal corrodes","No effect","Insulator"],correctIndex:1,explanation:"Zn/Mg blocks."},
    {question:"Electrolysis of acidified water O₂ at:",options:["Cathode","Anode","Both","Neither"],correctIndex:1,explanation:"OH⁻/H₂O oxidised."},
    {question:"Silver plating electrolyte:",options:["Ag⁺ solution","Only NaCl","Only sugar","Oil"],correctIndex:0,explanation:"Ag source."},
    {question:"Charge carriers in metal wire:",options:["Ions","Electrons","Protons","Neutrons"],correctIndex:1,explanation:"e⁻ flow."},
    {question:"Daniel cell Zn in ZnSO₄:",options:["Positive electrode","Negative electrode","Salt","Membrane"],correctIndex:1,explanation:"Zn oxidises."},
    {question:"During charging lead-acid battery:",options:["Electrolysis reversing cell","Only discharge","No redox","Fusion"],correctIndex:0,explanation:"Non-spontaneous charge."},
    {question:"Why AC not used simple electrolysis cell:",options:["No net product","Better yield","Safer always","Required"],correctIndex:0,explanation:"Alternating redox."},
    {question:"Concentrated NaCl brine anode:",options:["O₂ preferred","Cl₂ preferred","H₂","Na"],correctIndex:1,explanation:"High [Cl⁻]."},
    {question:"Reduction at cathode always involves:",options:["Gain of electrons","Loss of electrons","Proton emission","Neutron capture"],correctIndex:0,explanation:"Definition."},
    {question:"Nernst idea (qual):",options:["Concentration affects E","No effect","Only gas colour","Only solid"],correctIndex:0,explanation:"Le Chatelier on potentials."}
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
