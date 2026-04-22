(function () {
  window.__registerTopic({
    id: "19",
    theme: "Theme 3: Chemistry in a Sustainable World",
    title: "Maintaining Air Quality",
    cheatBlocks: [
        {
            "title": "Pollutants",
            "points": [
                "**CO** — incomplete combustion; toxic (binds haemoglobin).",
                "**SO₂, NOₓ** — acid rain; from fossil fuel **S** and **high T N₂+O₂** in engines.",
                "**Particulates** — PM₂.₅, respiratory.",
                "**CFCs** historic **ozone** depletion — **Montreal Protocol**."
            ]
        },
        {
            "title": "Greenhouse",
            "points": [
                "**CO₂, CH₄, N₂O, H₂O vapour** trap IR.",
                "**Climate change** — linked to enhanced greenhouse effect.",
                "Mitigation: renewables, efficiency, transport (policy context)."
            ]
        },
        {
            "title": "Carbon cycle vs fossil CO₂",
            "points": [
                "**Fast cycle**: photosynthesis ↔ respiration/decay moves carbon without net geological burial.",
                "**Fossil fuels** release carbon fixed millions of years ago — faster than sinks can absorb → rising atmospheric CO₂."
            ]
        },
        {
            "title": "Control",
            "points": [
                "**Catalytic converter**: CO + hydrocarbons → CO₂ + H₂O; NOₓ → N₂.",
                "**Flue gas desulfurisation** in power stations.",
                "**Electric vehicles** reduce local NOₓ/PM (tailpipe)."
            ]
        },
        {
            "title": "Acid Rain Chemistry",
            "points": [
                "SO₂ + H₂O → H₂SO₃ (sulfurous acid); further oxidation: 2SO₂ + O₂ + 2H₂O → 2H₂SO₄.",
                "NOₓ + H₂O → HNO₃ (nitric acid) via oxidation pathways.",
                "**FGD** (flue gas desulfurisation): CaCO₃ + SO₂ → CaSO₃ + CO₂ (alkaline scrubbing).",
                "**Catalytic converter**: $2\\text{CO} + 2\\text{NO} \\rightarrow 2\\text{CO}_2 + \\text{N}_2$ and oxidises hydrocarbons.",
                "Limestone damage: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂ (soluble CaSO₄ washes away)."
            ]
        },
        { 
            "title": "Air Quality Chemical Reactions", 
            "points": [ 
                " **Catalytic Converter**: Converts harmful gases to harmless ones via redox. \nEquation: $2CO(g) + 2NO(g) \\rightarrow 2CO_2(g) + N_2(g)$. (CO is oxidised, NO is reduced).",
                " **Flue-Gas Desulfurisation**: Uses calcium carbonate (limestone) to remove SO₂ from factory chimneys. \nEquation: $CaCO_3(s) + SO_2(g) \\rightarrow CaSO_3(s) + CO_2(g)$.",
                " **Ozone Depletion**: UV light breaks C–Cl bonds in CFCs to form chlorine radicals, which act as catalysts to destroy the ozone layer ($O_3$)."
            ] 
        }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/sustainable-03-air-qualityjpg.jpg", caption: "Air pollutants + control measures (catalytic converter, ozone layer)" }
    ],
    flashcards: [
        {
            "front": "Main anthropogenic greenhouse gas emphasis?",
            "back": "CO₂ from fossil fuels."
        },
        {
            "front": "Acid rain from?",
            "back": "SO₂, NOₓ → H₂SO₄, HNO₃ in rain."
        },
        {
            "front": "Ozone layer location?",
            "back": "Stratosphere — UV-B absorption."
        },
        {
            "front": "CO poisoning?",
            "back": "Binds Hb stronger than O₂."
        },
        {
            "front": "Photochemical smog?",
            "back": "NOₓ + VOCs + sunlight → O₃ at ground level."
        },
        {
            "front": "Montreal Protocol?",
            "back": "Phase out ozone-depleting substances."
        },
        {
            "front": "Lead in petrol (historical)?",
            "back": "Neurotoxic — largely phased out."
        },
        {
            "front": "Carbon monoxide colour?",
            "back": "Odourless colourless — dangerous."
        },
        {
            "front": "Why NO in car engine?",
            "back": "N₂ + O₂ at high T."
        },
        {
            "front": "Afforestation?",
            "back": "CO₂ sink (partial)."
        },
        {
            "front": "Methane source?",
            "back": "Rice, livestock, landfill, natural gas leaks."
        },
        {
            "front": "Paris Agreement aim?",
            "back": "Limit warming — national pledges."
        },
        {
            "front": "Scrubber removes?",
            "back": "SO₂ from flue gases."
        }
    ,
    { "front": "CO danger mechanism?", "back": "Binds haemoglobin **~200× more strongly** than O₂ → tissues starved of oxygen (hypoxia)." },
    { "front": "3 greenhouse gases besides CO₂?", "back": "**CH₄** (methane), **N₂O** (nitrous oxide), **H₂O vapour**, and CFCs — pick any three." },
    { "front": "Ozone hole cause?", "back": "**CFCs** → UV breaks C–Cl → Cl· radicals catalytically destroy O₃ in chain reactions." },
    { "front": "FGD removes?", "back": "**SO₂** from power station flue gases — reacts with CaCO₃/Ca(OH)₂ scrubber." },
    { "front": "Why does rain have pH ~5.6 naturally?", "back": "CO₂ dissolves in rainwater: $\\text{CO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{CO}_3$ (weak acid). Pollution lowers pH further." }],
    quiz: [
    {id:"chem-T19-001",question:"CO is harmful because:",options:["Acidifies blood only","Blocks O₂ transport in blood","Radioactive","Green"],correctIndex:1,explanation:"Hb affinity."},
    {id:"chem-T19-002",question:"Acid rain damages:",options:["Only metals","Buildings, aquatic life, forests","Nothing","Only plastics"],correctIndex:1,explanation:"Low pH."},
    {id:"chem-T19-003",question:"CFCs harm ozone by:",options:["Adding O₂","Releasing Cl radicals that catalyse O₃ destruction","Absorbing all UV","Making rain"],correctIndex:1,explanation:"Chain reaction."},
    {id:"chem-T19-004",question:"Greenhouse effect is:",options:["No IR absorption","Certain gases trap outgoing IR","Only visible light block","Ozone only"],correctIndex:1,explanation:"Thermal balance."},
    {id:"chem-T19-005",question:"Catalytic converter reduces:",options:["Only CO₂","CO, unburnt HC, NOₓ","O₂","N₂ only"],correctIndex:1,explanation:"Three-way cat."},
    {id:"chem-T19-006",question:"SO₂ mainly from:",options:["Only volcanoes","Burning fossil fuels with sulfur","Photosynthesis","O₃"],correctIndex:1,explanation:"Coal/oil."},
    {id:"chem-T19-007",question:"Ground-level O₃:",options:["Always good","Smog component — respiratory irritant","Stratosphere only","Inert"],correctIndex:1,explanation:"Bad at surface."},
    {id:"chem-T19-008",question:"PM₂.₅ means:",options:["Particles ≤2.5 µm","Pressure","Only gas","Metal only"],correctIndex:0,explanation:"Fine particulates."},
    {id:"chem-T19-009",question:"Incomplete combustion of hydrocarbon produces:",options:["Only CO₂","CO and/or C","Only H₂","O₃"],correctIndex:1,explanation:"Limited O₂."},
    {id:"chem-T19-010",question:"CH₄ GWP vs CO₂ (concept):",options:["Lower per molecule","Higher over 20-yr","Zero","Same always"],correctIndex:1,explanation:"Potent GHG."},
    {id:"chem-T19-011",question:"Electric car local benefit:",options:["Less tailpipe NOₓ in city","No energy use","Removes all PM","No grid impact"],correctIndex:0,explanation:"Point of use."},
    {id:"chem-T19-012",question:"Flue gas desulfurisation:",options:["Adds sulfur","Removes SO₂","Makes CO","Only water"],correctIndex:1,explanation:"Wet scrubbing."},
    {id:"chem-T19-013",question:"In a catalytic converter, what happens to the oxidation state of nitrogen when nitrogen monoxide reacts with carbon monoxide?",options:["It increases from 0 to +2","It decreases from +2 to 0","It decreases from +4 to 0","It remains unchanged"],correctIndex:1,explanation:"The reaction is 2NO + 2CO → N₂ + 2CO₂. Nitrogen goes from +2 in NO to 0 in N₂ (it is reduced)."},
    {id:"chem-T19-014",question:"Stratospheric O₃ protects from:",options:["IR","UV-B","Visible all","Sound"],correctIndex:1,explanation:"DNA damage."},
    {id:"chem-T19-015",question:"NOₓ from lightning:",options:["Never","Natural source","Only human","Only liquid"],correctIndex:1,explanation:"Natural fixation."},
    {id:"chem-T19-016",question:"Carbon capture (concept):",options:["Emit more CO₂","Store CO₂ from industry","Remove N₂","Burn coal more"],correctIndex:1,explanation:"CCS."},
    {id:"chem-T19-017",question:"Which solid compound is used in power station chimneys to neutralise and remove sulfur dioxide gas?",options:["Sodium chloride","Calcium carbonate","Iron(III) oxide","Silicon dioxide"],correctIndex:1,explanation:"Calcium carbonate (limestone) reacts with acidic sulfur dioxide to form solid calcium sulfite and carbon dioxide in a process called flue-gas desulfurisation."},
    {id:"chem-T19-018",question:"Lead historically in petrol:",options:["Catalyst","Antiknock","Coolant","Fuel"],correctIndex:1,explanation:"Tetraethyl lead."},
    {id:"chem-T19-019",question:"Why does the use of catalytic converters not help to stop global warming?",options:["They do not remove sulfur dioxide","They release heat into the atmosphere","They produce large amounts of carbon dioxide","They produce unburnt hydrocarbons"],correctIndex:2,explanation:"While catalytic converters remove toxic CO and NO, they do so by producing CO₂, which is a major greenhouse gas contributing to global warming."},
    {id:"chem-T19-020",question:"Wildfire smoke:",options:["Only CO₂","PM and CO among pollutants","Pure O₂","Helium"],correctIndex:1,explanation:"Complex mix."},
    
    
    
    
    {id:"chem-T19-025",question:"Renewable vs fossil CO₂ argument:",options:["Same always","Biomass short-cycle may be nearer carbon neutral","No CO₂ from biomass burn","Coal is renewable"],correctIndex:1,explanation:"Lifecycle nuance."},
    
    {id:"chem-T19-027",question:"Deforestation and climate:",options:["Removes CO₂ sink","Adds O₃ layer","Cools planet always","No effect"],correctIndex:0,explanation:"Less uptake."},
    {id:"chem-T19-028",question:"In a catalytic converter, CO is typically oxidised toward:",options:["More CO","CO₂","Elemental carbon only","O₃"],correctIndex:1,explanation:"CO + ½O₂ → CO₂ on the catalyst."},
    {id:"chem-T19-029",question:"CFC-related chlorine destroys stratospheric O₃ efficiently because Cl· acts as:",options:["A one-step reactant only","A catalyst in radical chain cycles","Only a UV filter","An inert diluent"],correctIndex:1,explanation:"Cl is regenerated; many O₃ molecules destroyed per Cl."},
    {id:"chem-T19-030",question:"Rain slightly below pH 7 in clean air is mainly due to:",options:["SO₂ only","Dissolved CO₂ (weak carbonic acid)","Pure H₂O (pH 0)","NOₓ only"],correctIndex:1,explanation:"Unpolluted rain ≈ pH 5.6 from CO₂."},
    {id:"chem-T19-031",question:"Urban ground-level ozone is often classed as a:",options:["Primary pollutant from fuel tanks only","Secondary pollutant (NOₓ + VOCs + sunlight)","Stratospheric ozone sinking","Noble gas"],correctIndex:1,explanation:"Photochemical smog formation."},
    {id:"chem-T19-032",question:"SO₂ in moist air can be oxidised to contribute acid rain mainly as:",options:["CO gas","Sulfuric acid (via SO₃ / sulfate)","Methane","N₂"],correctIndex:1,explanation:"Forms acidic aerosols and rain."},
    {id:"chem-T19-033",question:"CO is especially hazardous because it:",options:["Turns blood green","Binds haemoglobin more strongly than O₂","Is visibly coloured","Is heavier than air only"],correctIndex:1,explanation:"Reduces O₂ delivery to tissues."},
    {id:"chem-T19-034",question:"The Montreal Protocol chiefly limits:",options:["Only fossil CO₂","Ozone-depleting substances (e.g. CFCs)","Only PM₂.₅","Only radon"],correctIndex:1,explanation:"International phase-out of ODS."},
    {id:"chem-T19-035",question:"Ocean acidification is driven mainly by:",options:["Extra CO₂ dissolving and shifting carbonate equilibria","Only SO₂ scrubbing","Stratospheric O₃ loss","Argon buildup"],correctIndex:0,explanation:"CO₂ → H⁺ affects seawater pH."},
    {id:"chem-T19-036",question:"High combustion temperatures in engines favour NO formation because:",options:["N₂ + O₂ in air can react","Fuel is pure nitrogen","Catalysts add NO","O₂ is removed"],correctIndex:0,explanation:"Thermal NOₓ from hot air."},
    {id:"chem-T19-037",question:"Wet flue-gas desulfurisation in power stations primarily cuts:",options:["CO emissions","SO₂ emissions","O₂ in air","Argon"],correctIndex:1,explanation:"Scrubbing sulfur oxides from stack gases."},
    {id:"chem-T19-201",question:"Photosynthesis removes CO₂ from the atmosphere mainly by:",options:["Combustion","Fixing carbon into biomass (simplified: CO₂ + H₂O → glucose + O₂ in light)","Releasing SO₂","Ozone destruction"],correctIndex:1,explanation:"Biological carbon sink."},
    {id:"chem-T19-202",question:"Burning fossil carbon adds CO₂ that was:",options:["Always in the fast carbon cycle","Locked away for geological timescales — net addition to active atmosphere/ocean pool","Removed last week by photosynthesis only","Never underground"],correctIndex:1,explanation:"Fossil vs biogenic carbon timescale argument."},
    
    {id:"chem-T19-204",question:"Secondary PM can form in air when:",options:["Only CO₂ condenses","Gases such as SO₂/NOₓ oxidise and nucleate as fine particles/sulfate/nitrate aerosols","O₂ disappears","N₂ becomes liquid"],correctIndex:1,explanation:"Gas-to-particle conversion."},
    {id:"chem-T19-205",question:"A catalytic converter works best once:",options:["The engine is cold forever","The catalyst is hot enough for efficient redox on the surface","All fuel is removed","Only diesel is used"],correctIndex:1,explanation:"Light-off temperature — cold start emissions issue."},
    {id:"chem-T19-206",question:"Acid rain can leach aluminium from soils into waterways partly because:",options:["Al is a noble metal","Lower pH increases mobility of some metal ions from minerals","Al dissolves only in bases","Rain has no ions"],correctIndex:1,explanation:"Soil/water chemistry nuance."},
    {id:"chem-T19-207",question:"Methane’s high global warming potential in short horizons is mainly because:",options:["It does not absorb IR","It absorbs outgoing IR strongly per molecule vs CO₂ (different lifetime and potency)","It is heavier than CO₂ always","It is not a gas"],correctIndex:1,explanation:"GWP concept — per molecule radiative efficiency × time."},
    {id:"chem-T19-208",question:"Ground-level ozone harms health mainly by:",options:["Blocking UV like stratospheric O₃","Irritating and oxidising lung tissue (respiratory effects)","Increasing haemoglobin O₂ carry","Being odourless and inert"],correctIndex:1,explanation:"Toxic oxidant at breathing level."},
    
    {id:"chem-T19-301",question:"Carbon monoxide (CO) is especially dangerous as an indoor pollutant because it:",options:["Is brown and easily spotted","Is colourless and odourless, AND binds haemoglobin more strongly than O₂, causing tissue hypoxia","Is a strong acid","Is heavier than air so detectable at floor level"],correctIndex:1,explanation:"CO binds Hb with 200× greater affinity than O₂ — silent, invisible threat."},
    {id:"chem-T19-302",question:"In a catalytic converter, which TWO main reactions occur?",options:["N₂ + O₂ → 2NO and 2CO → 2C + O₂","2CO + O₂ → 2CO₂ and 2NO → N₂ + O₂ (simplified)","SO₂ → S + O₂ and CO → CO₂","Only CO₂ → C + O₂"],correctIndex:1,explanation:"Converter oxidises CO and hydrocarbons to CO₂/H₂O; reduces NOₓ to N₂."},
    {id:"chem-T19-303",question:"Acid rain forms when SO₂ dissolves in rainwater. The simplified reaction is:",options:["SO₂ + H₂O → H₂SO₄ directly","SO₂ + H₂O → H₂SO₃; further oxidation in air can form H₂SO₄","SO₂ + NaOH → neutral salt only","SO₂ is a base"],correctIndex:1,explanation:"Sulfurous acid forms first; oxidation in moist air gives sulfuric acid — more corrosive."},
    {id:"chem-T19-304",question:"Acid rain damages limestone statues (CaCO₃) because:",options:["Rain evaporates the stone","H₂SO₄ / HNO₃ in acid rain reacts: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂ — stone dissolves","Limestone absorbs CO₂ only","Rain is always pH 7"],correctIndex:1,explanation:"Acid attack converts insoluble CaCO₃ to soluble calcium salts that wash away."},
    {id:"chem-T19-305",question:"The greenhouse effect keeps Earth habitable. The 'enhanced' greenhouse effect (climate change) is concerning because:",options:["All greenhouse gases are toxic to breathe","Human emissions of CO₂/CH₄ are increasing the amount of heat trapped, causing net warming beyond the natural balance","Greenhouse gases destroy the ozone layer","Only CO₂ matters"],correctIndex:1,explanation:"Natural greenhouse effect is necessary; enhanced = extra warming from anthropogenic emissions."},
    {id:"chem-T19-306",question:"CFCs (chlorofluorocarbons) damage the ozone layer because:",options:["They react with O₂ only","UV breaks C–Cl bonds, releasing Cl· radicals that catalytically destroy O₃ in chain reactions","They absorb all visible light","They are heavier than O₃"],correctIndex:1,explanation:"Each Cl· can destroy thousands of O₃ molecules before termination — catalytic chain."},
    {id:"chem-T19-307",question:"Flue-gas desulfurisation (FGD) in coal power stations removes SO₂ by:",options:["Burning the SO₂ to CO₂","Reacting it with slaked lime or limestone: CaCO₃ + SO₂ → CaSO₃ + CO₂ / CaO + SO₂ → CaSO₃","Adding more O₂","Electrolysis of SO₂"],correctIndex:1,explanation:"Alkaline scrubbing with CaCO₃ or Ca(OH)₂ neutralises acidic SO₂ → by-product gypsum CaSO₄."},
    {id:"chem-T19-308",question:"Which correctly links pollutant → health or environmental effect?",options:["CO₂ → direct blindness","SO₂/NOₓ → acid rain → forest damage and aquatic ecosystem harm","Cl₂ → only aesthetic damage to buildings","N₂ → toxic in lungs"],correctIndex:1,explanation:"Accurate linkage: S/N oxides dissolve in rain → sulfuric/nitric acids → ecological damage."}
    ],
    extendedQuestions: [
        {
            id: "chem-add-t19-E01",
            commandWord: "Evaluate",
            marks: 6,
            syllabusNote: "Maintaining Air Quality - Catalytic converters and Flue-gas desulfurisation.",
            prompt: "Fossil fuels used in power stations and vehicle engines produce harmful gaseous pollutants.\n\n(a) Name the pollutant gas formed in a car engine when nitrogen and oxygen from the air react under high temperatures, and state one environmental problem caused by this gas.\n(b) Write a balanced chemical equation to show how a catalytic converter removes this nitrogen-based pollutant and carbon monoxide from the exhaust fumes.\n(c) Power stations burn coal that contains sulfur impurities. Describe the chemical process, including a balanced equation, used to remove the resulting sulfur dioxide from the power station's flue gases.",
            rubric: [
                "(a) Gas: **Nitrogen monoxide (NO) / Nitrogen dioxide (NO₂)**.",
                "(a) Problem: Causes **acid rain** (or photochemical smog).",
                "(b) Equation: **$2NO(g) + 2CO(g) \\rightarrow N_2(g) + 2CO_2(g)$**.",
                "(c) Process: **Flue-gas desulfurisation (or scrubbing)**.",
                "(c) The gases are passed through **calcium carbonate (limestone)** or calcium oxide.",
                "(c) Equation: **$CaCO_3(s) + SO_2(g) \\rightarrow CaSO_3(s) + CO_2(g)$**."
            ],
            modelAnswer: "(a) At the high temperatures inside a car engine, nitrogen and oxygen react to form **nitrogen monoxide** (or nitrogen dioxide). In the atmosphere, this gas dissolves in rainwater to form nitric acid, leading to **acid rain** which damages buildings and kills aquatic life.\n\n(b) In the catalytic converter, nitrogen monoxide reacts with carbon monoxide in a redox reaction to produce harmless nitrogen gas and carbon dioxide. The equation is: \n$2NO(g) + 2CO(g) \\rightarrow N_2(g) + 2CO_2(g)$\n\n(c) Sulfur dioxide is removed from the power station chimneys using a process called **flue-gas desulfurisation**. The acidic exhaust gases are passed through a scrubber containing powdered **calcium carbonate** (limestone). The calcium carbonate neutralises the sulfur dioxide, forming solid calcium sulfite and carbon dioxide gas. The equation is:\n$CaCO_3(s) + SO_2(g) \\rightarrow CaSO_3(s) + CO_2(g)$"
        }
    ],
    trueFalse: [
    {statement:"Stratospheric ozone is a pollutant in the same sense as ground-level ozone.",correct:false,explain:"Location matters."},
    {statement:"Complete combustion of hydrocarbon in excess O₂ gives CO₂ and H₂O.",correct:true,explain:"Stoichiometric excess O₂."},
    {statement:"All greenhouse gases are toxic to breathe.",correct:false,explain:"CO₂ in air is normal; toxicity at high concentration."},
    {statement:"Montreal Protocol helped the ozone layer recover.",correct:true,explain:"Success story."},
    {statement:"NO₂ is brownish and contributes to acid rain.",correct:true,explain:"Visible in smog."},
    {statement:"Carbon monoxide has a sharp smell.",correct:false,explain:"Odourless."},
    {statement:"Sulfur in diesel/fuel oil contributes to SO₂ emissions.",correct:true,explain:"S content."},
    {statement:"Catalytic converters work best when hot.",correct:true,explain:"Light-off temperature."},
    {statement:"Air pollution only affects lungs.",correct:false,explain:"Cardiovascular, developmental effects."},
    {statement:"CO₂ is the only greenhouse gas.",correct:false,explain:"CH₄, N₂O, CFCs, H₂O vapour."},
    {statement:"Acid rain pH can be below 5.6 (natural rain weakly acidic from CO₂).",correct:true,explain:"Anthropogenic lower."},
    {statement:"Venus extreme greenhouse is mainly CO₂ thick atmosphere.",correct:true,explain:"Runaway comparison."}
    ],
    });
})();
