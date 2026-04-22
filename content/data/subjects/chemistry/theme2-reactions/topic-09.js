(function () {
  window.__registerTopic({
    id: "9",
    theme: "Theme 2: Chemical Reactions",
    title: "Ammonia",
    cheatBlocks: [
        {
            "title": "Haber",
            "points": [
                "N₂+3H₂⇌2NH₃; Fe catalyst; ~450°C; high P.",
                "Recycle unreacted gases.",
                "NH₃ → HNO₃, fertilisers."
            ]
        },
        {
            "title": "Properties",
            "points": [
                "Alkaline gas; turns damp red litmus blue.",
                "Very soluble; fountain experiment.",
                "NH₄⁺ + OH⁻ → NH₃."
            ]
        }
    ,
    {
        "title": "Haber Process — Conditions & Reasons",
        "points": [
            "Equation: $\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g)$ (ΔH < 0, exothermic)",
            "**Temperature**: ~450 °C — compromise. Low T: slow (rate). High T: equilibrium shifts left (Le Chatelier). 450°C balances both.",
            "**Pressure**: ~200 atm — high P shifts right (4 mol gas → 2 mol). Expensive to build/run so 200 atm is compromise.",
            "**Catalyst**: iron (Fe) with promoters — lowers activation energy.",
            "Yield ~15%. Unreacted N₂/H₂ recycled — efficient overall."
        ]
    }],
    infographics: [ { image: "data/subjects/chemistry/images/reactions-04-ammonia.jpg", caption: "Haber process and conditions" } ],
    flashcards: [
        {
            "front": "Haber catalyst?",
            "back": "Iron."
        },
        {
            "front": "Urea formula?",
            "back": "CO(NH₂)₂ fertiliser N."
        },
        {
            "front": "Test ammonium ion?",
            "back": "NaOH heat, gas turns litmus blue."
        },
        {
            "front": "Dilute NH₃ + Cu²⁺?",
            "back": "Pale blue ppt, deep blue solution excess."
        },
        {
            "front": "NPK fertiliser?",
            "back": "N,P,K nutrients."
        },
        {
            "front": "Le Chatelier low T favours NH₃ but?",
            "back": "Rate slower — compromise T."
        },
        {
            "front": "High P favours?",
            "back": "Fewer gas moles side — NH₃."
        },
        {
            "front": "Natural ammonia source?",
            "back": "Decomposition, bacterial."
        },
        {
            "front": "Ammonium nitrate explosive risk?",
            "back": "Oxidiser — careful storage."
        },
        {
            "front": "Nitrate leaching?",
            "back": "Eutrophication risk."
        },
        {
            "front": "Haber energy intensive?",
            "back": "Fossil H₂ often."
        },
        {
            "front": "NH₃ bp vs H₂O?",
            "back": "Lower — H-bond weaker than water."
        }
    ,
    { "front": "Haber conditions (3 things)?", "back": "~**450°C**, ~**200 atm**, **iron catalyst** (with K₂O/Al₂O₃ promoters)." },
    { "front": "Why 450°C not higher?", "back": "Higher T shifts equilibrium *left* (exothermic forward) → less NH₃. 450°C is a **kinetic compromise**." },
    { "front": "Why high pressure in Haber?", "back": "$N_2 + 3H_2 \\rightarrow 2NH_3$: 4 mol gas → 2 mol. High P pushes **right** → more NH₃ (Le Chatelier)." },
    { "front": "3 uses of NH₃?", "back": "1. **Fertilisers** (NH₄NO₃, urea). 2. **Nitric acid** (Ostwald process). 3. **Cleaners/refrigerants**." }],
    quiz: [
    {id:"chem-T9-001",question:"NH₃ turns damp red litmus:",options:["Red","Blue","No change","Green"],correctIndex:1,explanation:"Base."},
    {id:"chem-T9-002",question:"Haber nitrogen source:",options:["Air fractionation","Only NH₄Cl","Urea burn","Water only"],correctIndex:0,explanation:"N₂ from air."},
    {id:"chem-T9-003",question:"Forward reaction to NH₃ is:",options:["Endothermic","Exothermic","Zero ΔH","Only physical"],correctIndex:1,explanation:"Heat released."},
    {id:"chem-T9-004",question:"Higher pressure in Haber:",options:["Less NH₃","More NH₃ equilibrium","No effect","Explodes always"],correctIndex:1,explanation:"Fewer gas moles."},
    {id:"chem-T9-005",question:"NH₄Cl + NaOH warmed:",options:["Cl₂","NH₃","H₂","N₂"],correctIndex:1,explanation:"Ammonium test."},
    {id:"chem-T9-006",question:"NH₃ in water equation simplified:",options:["NH₃+H₂O⇌NH₄⁺+OH⁻","Only NH₄OH molecule","No ions","Only H⁺"],correctIndex:0,explanation:"Equilibrium."},
    {id:"chem-T9-007",question:"Fertiliser from NH₃ not:",options:["Urea","Ammonium salts","Diamond","NH₄NO₃"],correctIndex:2,explanation:"Not carbon allotrope."},
    {id:"chem-T9-008",question:"Catalyst in Haber:",options:["Pt only","Fe","Ni","Enzyme"],correctIndex:1,explanation:"Iron promoted."},
    {id:"chem-T9-009",question:"Hydrated copper(II) sulfate undergoes a reversible reaction when heated: $CuSO_4\\cdot5H_2O(s) \\rightleftharpoons CuSO_4(s) + 5H_2O(l)$. What observation proves this reaction can go backwards?",options:["The solid turns white when heated","Adding water to the white anhydrous solid turns it blue again and releases heat","The solid evaporates","Steam is produced when heated"],correctIndex:1,explanation:"The forward reaction is endothermic (heating turns it white). The reverse reaction is exothermic (adding water turns it blue again)."},
    {id:"chem-T9-010",question:"NH₃ density vs air:",options:["Lighter","Heavier","Same","No mass"],correctIndex:0,explanation:"Mr 17<29."},
    {id:"chem-T9-011",question:"Why compress gases in Haber:",options:["Increase rate and shift equilibrium","Only cooling","Remove catalyst","Dilute"],correctIndex:0,explanation:"More collisions."},
    {id:"chem-T9-012",question:"Equilibrium means:",options:["Forward stops","Forward=reverse rates","Only products","No catalyst"],correctIndex:1,explanation:"Dynamic."},
    {id:"chem-T9-013",question:"NH₃ hydrogen bonding:",options:["Yes with water","Never","Only ionic","Only metal"],correctIndex:0,explanation:"N lone pair."},
    {id:"chem-T9-014",question:"Ammonium nitrate in soil:",options:["N source","Only P","Toxic metal","Inert sand"],correctIndex:0,explanation:"N fertiliser."},
    {id:"chem-T9-015",question:"According to Haber Process yield graphs, why is 200 atm chosen instead of 1000 atm, even though 1000 atm gives a higher yield of ammonia?",options:["1000 atm reduces the reaction rate","1000 atm would vaporise the ammonia","Maintaining and building pipes to withstand 1000 atm is too expensive and dangerous","1000 atm shifts the equilibrium to the left"],correctIndex:2,explanation:"While higher pressure pushes the equilibrium to the right (more yield), extremely high pressures incur prohibitive safety and engineering costs."},
    {id:"chem-T9-016",question:"NH₃ toxic inhalation:",options:["Respiratory irritant","Nutrient only","Inert","Healing"],correctIndex:0,explanation:"Safety."},
    {id:"chem-T9-017",question:"Dry NH₃ does not turn litmus on paper without:",options:["Water","Heat only","O₂","Cl₂"],correctIndex:0,explanation:"Needs moisture."},
    {id:"chem-T9-018",question:"Reverse of Haber:",options:["NH₃ decomposes to N₂+H₂ at very high T","Never","Only liquid","Only catalyst"],correctIndex:0,explanation:"Endothermic back."},
    {id:"chem-T9-019",question:"Eutrophication from excess N:",options:["Algal bloom","Ozone hole","Acid rain only","Nothing"],correctIndex:0,explanation:"Nutrient runoff."},
    {id:"chem-T9-020",question:"NH₃ + HCl gas:",options:["White smoke NH₄Cl","Blue solution","No reaction","Cl₂"],correctIndex:0,explanation:"Solid formation."},
    {id:"chem-T9-021",question:"Industrial H₂ for Haber often from:",options:["Natural gas steam reforming","Only water split","Air only","Coal never"],correctIndex:0,explanation:"CH₄+H₂O."},
    {id:"chem-T9-022",question: "The Contact process manufactures sulfuric acid and involves a reversible reaction: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g). The forward reaction is exothermic. Based on Le Chatelier's principle, which conditions would theoretically yield the most SO₃?",options: ["High temperature and high pressure","Low temperature and high pressure","High temperature and low pressure","Low temperature and low pressure"],correctIndex: 1,explanation: "Low temperature shifts the equilibrium to the right to produce heat (exothermic). High pressure shifts the equilibrium to the right because there are fewer gas molecules on the product side (2 moles vs 3 moles)."},
    {id:"chem-T9-023",question:"pH of 0.1 M NH₃ ~:",options:["1","7","11","14"],correctIndex:2,explanation:"Weak base ~11."},
    {id:"chem-T9-024",question:"Double salt ammonium (context):",options:["NH₄Fe(SO₄)₂ type","Only NaCl","Gas","Diamond"],correctIndex:0,explanation:"Alum analogues."},
    {id:"chem-T9-025",question:"Why not extreme low T in Haber:",options:["Rate too slow","Explosion","No catalyst","No N₂"],correctIndex:0,explanation:"Kinetic limit."},
    {id:"chem-T9-026",question:"NOₓ from fertiliser overuse:",options:["Can acidify/runoff issues","Only ozone","Helium release","None"],correctIndex:0,explanation:"Environmental."},
    {id:"chem-T9-027",question:"Le Chatelier: for N₂(g)+3H₂(g)⇌2NH₃(g), increasing total pressure at constant T shifts equilibrium:",options:["Left (more gas moles)","Right (fewer gas moles)","No shift","Only changes rate"],correctIndex:1,explanation:"4 mol gas → 2 mol gas; higher P favours the side with fewer gas molecules."},
    {id:"chem-T9-028",question:"The Haber forward reaction is exothermic, so lower T would favour NH₃ yield but plants use ~450 °C because:",options:["High T removes catalyst","Higher T increases rate despite lower K","Low T always gives zero NH₃","Catalyst needs cold"],correctIndex:1,explanation:"Kinetic compromise — reasonable rate vs equilibrium."},
    {id:"chem-T9-029",question:"Recycling unreacted N₂ and H₂ in the Haber process mainly:",options:["Changes ΔH of reaction","Improves atom economy of the overall plant","Removes need for a catalyst","Stops ammonia liquefaction"],correctIndex:1,explanation:"Unconverted feedstock is returned — less waste."},
    {id:"chem-T9-030",question:"Aqueous ammonia is a weak base because:",options:["NH₃ fully ionises","NH₃ only partially forms NH₄⁺ and OH⁻","It contains no nitrogen","It is always pH 14"],correctIndex:1,explanation:"Equilibrium lies left: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻."},
    
    {id:"chem-T9-032",question:"Compared with air, a small leak of NH₃ gas is:",options:["Heavier and sinks only","Lighter on average (Mr 17) and can mix upward in air","The same density always","Only found as a liquid"],correctIndex:1,explanation:"Average molar mass of air ~29 g/mol > NH₃."},
    {id:"chem-T9-033",question:"Nitrogen fixation (Haber) is industrially important because:",options:["N₂ is very unreactive at room conditions","Air has no nitrogen","Ammonia is never used","Plants cannot use nitrogen"],correctIndex:0,explanation:"Strong N≡N bond — harsh conditions + catalyst needed."},
    {id:"chem-T9-034",question:"Excess nitrate runoff can cause eutrophication because:",options:["It removes all oxygen instantly","Nutrients boost algal growth → decomposition can deplete dissolved O₂","Nitrates are insoluble","It raises pH to 14 always"],correctIndex:1,explanation:"Algal blooms and microbial breakdown harm aquatic life."},
    {id:"chem-T9-035",question:"NH₄NO₃ as fertiliser must be stored carefully because:",options:["It is never soluble","It can decompose explosively under misuse/heat/shock","It is a noble gas","It cannot absorb water"],correctIndex:1,explanation:"Oxidiser + fuel hazard — safety context."},
    
    {id:"chem-T9-201",question:"The main reason a high pressure is used in the Haber process is:",options:["To increase the rate only","To shift equilibrium toward fewer gas moles (NH₃) and increase collision frequency","To remove the catalyst","To make N₂ unreactive"],correctIndex:1,explanation:"N₂ + 3H₂ ⇌ 2NH₃ — fewer gas molecules on the right."},
    {id:"chem-T9-202",question:"If the temperature of a Haber reactor is suddenly increased (other factors fixed), the equilibrium constant K for the exothermic forward reaction:",options:["Always increases","Generally decreases","Is unchanged","Becomes zero"],correctIndex:1,explanation:"Exothermic forward — heat treated as product; Le Chatelier."},
    {id:"chem-T9-203",question:"Iron catalyst in Haber mainly:",options:["Increases equilibrium yield of NH₃","Increases reaction rate without changing equilibrium position","Removes H₂","Converts N₂ to NO"],correctIndex:1,explanation:"Catalyst speeds both directions equally."},
    {id:"chem-T9-204",question:"Ammonium nitrate as fertiliser is a source of:",options:["Only phosphorus","Nitrogen for plant growth","Only potassium","Inert filler only"],correctIndex:1,explanation:"NH₄⁺ and NO₃⁻ both supply nitrogen."},
    {id:"chem-T9-205",question:"Why is NH₃ liquefied in industrial synthesis?",options:["To remove it from the equilibrium mixture and shift equilibrium forward","Because it is always a solid","To destroy the catalyst","To increase N₂ pressure"],correctIndex:0,explanation:"Product removal favours more NH₃ formation."},
    {id:"chem-T9-206",question:"Hydrogen for the Haber process is often sourced from:",options:["Electrolysis of NaCl only","Steam reforming of natural gas (CH₄)","Only air","Only water photolysis"],correctIndex:1,explanation:"Industrial H₂ source."},
    {id:"chem-T9-207",question:"When NH₃(g) dissolves in water, the solution is basic because:",options:["NH₃ fully ionises","NH₃ partially accepts H⁺ from water forming OH⁻","NH₃ removes all water","NH₃ is a strong acid"],correctIndex:1,explanation:"Equilibrium produces OH⁻."},
    
    {id:"chem-T9-209",question:"The N≡N triple bond in N₂ is very strong, so:",options:["N₂ reacts instantly at room temperature without catalyst","High temperatures and catalysts are needed for Haber kinetics","N₂ cannot be liquefied","N₂ always forms NO at room temperature"],correctIndex:1,explanation:"Kinetic barrier despite favourable thermodynamics at some conditions."},
    {id:"chem-T9-301",question:"In the fountain experiment, water rushes into a flask containing NH₃(g) mainly because:",options:["NH₃ is heavier than air","NH₃ dissolves rapidly in the water droplet, greatly reducing gas pressure inside the flask","NH₃ reacts explosively with water","The flask is heated"],correctIndex:1,explanation:"High solubility of NH₃ creates a partial vacuum that draws water in."},
    {id:"chem-T9-302",question:"Which statement best explains why the Haber process uses ~450 °C rather than a much higher or lower temperature?",options:["Higher temperature would melt the catalyst","It is a compromise: high enough for a useful rate, not so high that equilibrium yield drops too far","Lower temperatures produce NO instead of NH₃","The catalyst only works at exactly 450 °C"],correctIndex:1,explanation:"Exothermic forward reaction means higher T shifts equilibrium left; kinetics and yield are balanced at ~450 °C."},
    
    {id:"chem-T9-304",question:"Which fertiliser supplies BOTH nitrogen and potassium in one compound?",options:["(NH₄)₂SO₄","NH₄NO₃","KNO₃","Urea CO(NH₂)₂"],correctIndex:2,explanation:"Potassium nitrate (KNO₃) provides K⁺ and NO₃⁻ — both plant nutrients."},
    {id:"chem-T9-305",question:"A gas has a pungent smell, turns damp red litmus blue, and produces white smoke when a rod dipped in concentrated HCl is held near it. The gas is:",options:["Cl₂","SO₂","NH₃","H₂S"],correctIndex:2,explanation:"NH₃ + HCl(g) → NH₄Cl(s) white smoke; litmus confirms alkaline gas."},
    {id:"chem-T9-306",question:"In the Haber process, high pressure (200 atm) favours NH₃ because:",options:["It lowers activation energy","There are fewer gas moles on the right (N₂ + 3H₂ → 2NH₃: 4 → 2) so high pressure shifts equilibrium right","High pressure cools the reactor","Pressure has no effect on equilibrium"],correctIndex:1,explanation:"Le Chatelier: fewer moles on product side — higher pressure pushes right."},
    {id:"chem-T9-307",question:"The industrial catalyst in the Haber process is:",options:["Platinum","Vanadium(V) oxide","Iron","Nickel"],correctIndex:2,explanation:"Iron with promoters (K₂O/Al₂O₃). Platinum is for Contact process."},
    {id:"chem-T9-308",question:"Nitrogen can be 'fixed' naturally by lightning because:",options:["Lightning removes N₂","High-temperature electrical discharge provides enough energy for N₂ + O₂ → 2NO","Lightning adds H₂ to N₂","Soil bacteria need lightning"],correctIndex:1,explanation:"Thermal energy of lightning arc allows the very endothermic N₂/O₂ reaction."},
    {id:"chem-T9-309",question:"Which fertiliser provides both nitrogen and potassium?",options:["(NH₄)₂SO₄","NH₄NO₃","KNO₃","Urea CO(NH₂)₂"],correctIndex:2,explanation:"Potassium nitrate KNO₃ contains both K and N — dual-nutrient fertiliser."},
    {id:"chem-T9-310",question:"Excess nitrate fertiliser washing into rivers can cause:",options:["Acid rain only","Eutrophication — algal blooms deplete dissolved O₂","Ozone depletion","Only pH decrease in air"],correctIndex:1,explanation:"Nitrate → algal bloom → algae die → bacteria decompose → O₂ depleted → aquatic life dies."},
    {id:"chem-T9-311",question:"The Haber process uses a compromise temperature of around 450°C because:",options:["High T gives very high NH₃ yield but Fe catalyst is not needed","Low T gives good yield but too slow (kinetics); high T is fast but yield falls (Le Chatelier). 450°C is the practical optimum","Fe catalyst only works at exactly 450°C","Higher pressures reduce temperature effects"],correctIndex:1,explanation:"Rate vs equilibrium trade-off: lower T = better equilibrium yield but too slow. 450°C balances acceptable rate and reasonable yield."},
    
    ],
    extendedQuestions: [
        {
            id: "chem-T9-E01",
            commandWord: "Evaluate",
            marks: 5,
            syllabusNote: "Ammonia - Interpreting Haber process yield graphs.",
            prompt: "In the Haber process, the reaction between nitrogen and hydrogen to form ammonia is reversible: N₂(g) + 3H₂(g) ⇌ 2NH₃(g). The forward reaction is exothermic.\n\n(a) Looking at standard industrial data, an increase in pressure from 100 atm to 300 atm at 450 °C increases the yield of ammonia. Explain why this happens using Le Chatelier's principle.\n(b) A temperature of 200 °C would theoretically give a much higher yield of ammonia than 450 °C. Suggest why industry does not use 200 °C.\n(c) State the catalyst used and explain its exact role in this reversible reaction.",
            rubric: [
                "(a) The reactant side has **4 moles of gas**, and the product side has **2 moles of gas**.",
                "(a) Increasing pressure shifts the equilibrium to the right (side with **fewer gas molecules**) to reduce the pressure, increasing yield.",
                "(b) At 200 °C, the particles have less kinetic energy, making the **rate of reaction far too slow** to be economically viable.",
                "(c) Catalyst: **Finely divided Iron**.",
                "(c) Role: It **lowers the activation energy**, speeding up both the forward and backward reactions equally without altering the equilibrium position."
            ],
            modelAnswer: "(a) The balanced equation shows there are 4 moles of reactant gases (1 N₂ + 3 H₂) reacting to form 2 moles of product gas (2 NH₃). According to Le Chatelier's principle, increasing the pressure forces the system to shift towards the side with fewer gas molecules to counteract the change. Therefore, the equilibrium shifts to the right, increasing the yield of ammonia.\n\n(b) Even though a lower temperature shifts the equilibrium to the right (favouring the exothermic reaction and giving a higher theoretical yield), at 200 °C the particles lack sufficient kinetic energy. The rate of reaction would be incredibly slow, meaning it would take far too long to produce the ammonia, making it economically unviable for an industrial plant.\n\n(c) The catalyst used is finely divided iron. Its role is to speed up the rate of reaction by providing an alternative reaction pathway with a lower activation energy. It increases the speed of both the forward and reverse reactions equally, helping the system reach equilibrium much faster without changing the final yield."
        }
    ],
    trueFalse: [
    {statement:"Haber process runs at room temperature industrially.",correct:false,explain:"~450°C."},
    
    {statement:"All soil nitrogen is immediately plant-available.",correct:false,explain:"Mineralisation needed."},
    {statement:"NH₄⁺ in solution acidic hydrolysis.",correct:true,explain:"Weak base conjugate."},
    
    
    {statement:"Haber fixed N enabled population growth.",correct:true,explain:"Historical impact."},
    {statement:"NH₃ is stored as pressurised liquid.",correct:true,explain:"Liquefaction."},
    {statement:"Ammonium salts with nitrate are always safe to heat.",correct:false,explain:"Decomposition/explosion risk."},
    {statement:"N₂ is very inert at room T.",correct:true,explain:"Strong triple bond."},
    {statement:"Catalyst increases equilibrium yield.",correct:false,explain:"Speeds both ways equally."},
    {statement:"NH₃ is trigonal pyramidal.",correct:true,explain:" Lone pair on N."}
    ],
    });
})();
