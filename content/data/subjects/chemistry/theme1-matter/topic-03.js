(function () {
  window.__registerTopic({
    id: "3",
    theme: "Theme 1: Matter – Structures & Properties",
    title: "Kinetic Particle Theory",
    cheatBlocks: [
        {
            "title": "States",
            "points": [
                "**Solid** — ordered lattice; vibrate; definite shape/volume.",
                "**Liquid** — disordered close packing; flow; definite volume.",
                "**Gas** — random motion; negligible IM forces; fill container."
            ]
        },
        {
            "title": "Energy",
            "points": [
                "Heating increases **average** kinetic energy.",
                "Melting, boiling, evaporation absorb energy.",
                "Condensation, freezing release energy."
            ]
        },
        {
            "title": "Gas laws (qualitative)",
            "points": [
                "Higher T at constant V → higher **pressure** (more violent collisions).",
                "**Diffusion** — gases mix; rate ∝ speed of particles; lighter molecules often faster."
            ]
        },
        {
            "title": "Changes of state (heating curves)",
            "points": [
                "**Melting / freezing** — solid ↔ liquid at melting point; latent heat of fusion.",
                "**Boiling / condensing** — liquid ↔ gas at boiling point; latent heat of vaporisation.",
                "During a **phase change at constant pressure**, temperature stays constant while energy breaks or forms intermolecular attractions."
            ]
        },
        {
            "title": "Gas Laws & Diffusion (qualitative)",
            "points": [
                "T ↑ (fixed V) → particles move faster → more/harder wall collisions → **pressure ↑**.",
                "V ↓ (fixed T) → particles closer → collision frequency ↑ → **pressure ↑**.",
                "Lighter molecules diffuse **faster** at the same T (same average KE).",
                "$\\overline{\\text{KE}} \\propto T_{\\text{kelvin}}$ — temperature IS average kinetic energy.",
                "**Brownian motion**: visible particle jitter = evidence for randomly moving invisible molecules."
            ]
        },
        { 
            "title": "Heating & Cooling Curves", 
            "points": [ 
                "During a phase change (e.g., melting or boiling), the temperature remains **constant**.", 
                "A solid-liquid or liquid-gas mixture exists during this constant-temperature plateau.",
                "Thermal energy absorbed during melting/boiling is used to overcome intermolecular forces of attraction, pulling particles further apart.",
                "When freezing/condensing, thermal energy is transferred to the surroundings."
            ] 
        },
        {
            "title": "Diffusion Rate Evidence",
            "points": [
                "Rate of diffusion depends on molecular mass and temperature.",
                " **Ammonia & HCl Experiment**: A white ring of ammonium chloride forms closer to the HCl source.",
                "Reason: Ammonia ($NH_3$) has a lower molecular mass ($M_r=17$) than Hydrogen Chloride ($HCl$, $M_r=36.5$), so it diffuses faster and travels further in the same time."
            ]
        }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/matter-03-kinetic-theory.jpg", caption: "Particle arrangement: solid, liquid, gas" },
      { svg: "<svg viewBox=\"0 0 360 140\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"360\" height=\"140\" fill=\"#1c222d\"/><text x=\"50\" y=\"22\" fill=\"#5eead4\" font-size=\"11\" font-family=\"system-ui\">SOLID</text><g fill=\"#a78bfa\"><circle cx=\"40\" cy=\"55\" r=\"5\"/><circle cx=\"58\" cy=\"50\" r=\"5\"/><circle cx=\"52\" cy=\"70\" r=\"5\"/><circle cx=\"70\" cy=\"62\" r=\"5\"/></g><text x=\"190\" y=\"22\" fill=\"#5eead4\" font-size=\"11\">LIQUID</text><g fill=\"#5eead4\"><circle cx=\"205\" cy=\"55\" r=\"4\"/><circle cx=\"220\" cy=\"50\" r=\"4\"/><circle cx=\"215\" cy=\"68\" r=\"4\"/><circle cx=\"232\" cy=\"60\" r=\"4\"/><circle cx=\"245\" cy=\"52\" r=\"4\"/></g><text x=\"295\" y=\"22\" fill=\"#5eead4\" font-size=\"11\">GAS</text><g fill=\"#fb923c\"><circle cx=\"300\" cy=\"52\" r=\"3\"/><circle cx=\"318\" cy=\"48\" r=\"3\"/><circle cx=\"310\" cy=\"68\" r=\"3\"/><circle cx=\"328\" cy=\"62\" r=\"3\"/></g><text x=\"15\" y=\"128\" fill=\"#8b95a8\" font-size=\"9\">Fixed lattice · vibrate</text><text x=\"175\" y=\"128\" fill=\"#8b95a8\" font-size=\"9\">Random positions · close</text><text x=\"285\" y=\"128\" fill=\"#8b95a8\" font-size=\"9\">Far apart · rapid motion</text></svg>", caption: "Particle arrangement: solid, liquid, gas" }
    ],
    flashcards: [
        { "front": "Why does temperature remain constant during melting despite continuous heating?", "back": "The thermal energy absorbed is converted to kinetic energy to overcome the forces of attraction between particles, rather than raising the temperature." },
        { "front": "In the glass tube experiment with ammonia and hydrogen chloride, where does the white ring form?", "back": "Closer to the hydrogen chloride (HCl) end." },
        { "front": "Why does the white ring form closer to the HCl gas?", "back": "Ammonia particles have a lower relative molecular mass (17) than HCl particles (36.5), so they diffuse faster and travel further in the same amount of time." },
        { "front": "What states of matter are present during the horizontal plateau of a boiling curve?", "back": "Both liquid and gas are present as a mixture." },
        { "front": "What is vapour deposition?", "back": "The process where a gas changes directly into a solid without going through the liquid state (e.g., iodine vapour to solid crystals)." },
        { "front": "Why can liquids flow?","back": "Particles slide past one another."},
        { "front": "Gas pressure cause?","back": "Particles colliding with walls."},
        { "front": "Evaporation vs boiling?","back": "Evaporation surface any T; boiling throughout at bp."},
        { "front": "Sublimation?","back": "Solid → gas without liquid."},
        { "front": "Brownian motion?","back": "Random jostling of suspended particles by fluid molecules."},
        { "front": "Why gas is compressible?", "back": "Large empty space between particles."},
        { "front": "Heating a gas in fixed volume?","back": "Pressure increases."},
        { "front": "Diffusion in liquids slower than gases?", "back": "Yes — slower particle motion."},
        { "front": "Melting point?", "back": "Solid and liquid coexist at equilibrium."},
        { "front": "Condensation releases energy?","back": "Yes — particles lose KE."},
        { "front": "Why smell spreads?","back": "Diffusion of volatile molecules in air."},
        { "front": "Expansion on heating (most solids)?","back": "Particles vibrate more — average separation increases."},
        { "front": "Why does a gas fill the whole container?","back": "Gas particles move randomly in all directions and are far apart."},
        { "front": "Why lighter gas diffuses faster?", "back": "At same T, average KE is equal. Lighter mass → higher average speed ($v \\propto 1/\\sqrt{m}$). e.g. NH₃ faster than HCl." },
        { "front": "Brownian motion evidence for?", "back": "Invisible air/liquid molecules in constant **random motion** bombarding visible particles — kinetic particle theory." },
        { "front": "Boiling vs evaporation?", "back": "**Evaporation**: surface only, any temperature. **Boiling**: throughout liquid at fixed boiling point (vapour pressure = atmospheric pressure)." },
        { "front": "$\\overline{\\text{KE}}$ and temperature?", "back": "$\\overline{\\text{KE}} \\propto T$ (kelvin). Hotter = faster particles on average." }],
    quiz: [
    {id:"chem-T3-001",question:"Gas particles are best described as:",options:["Fixed in rows","Far apart with random motion","Only vibrating in place","Not moving at 0 K only"],correctIndex:1,explanation:"Kinetic model."},
    {id:"chem-T3-002",question:"Liquids have definite:",options:["Shape and volume","Volume only","Neither","Shape only"],correctIndex:1,explanation:"Take container shape."},
    {id:"chem-T3-003",question:"Boiling is:",options:["Only at surface","Throughout liquid at bp","Only for metals","Endothermic for surroundings"],correctIndex:1,explanation:"Bubbles form inside."},
    {id:"chem-T3-004",question:"Evaporation cools liquid because:",options:["Fast molecules escape","Slow molecules escape","No energy change","Air heats it"],correctIndex:0,explanation:"Removes high-KE molecules."},
    {id:"chem-T3-005",question:"Diffusion fastest in:",options:["Solid","Liquid","Gas","Same all"],correctIndex:2,explanation:"Higher speed, larger gaps."},
    {id:"chem-T3-006",question:"Compressing gas at constant T:",options:["Increases pressure","Decreases collisions","Removes molecules","Becomes solid always"],correctIndex:0,explanation:"More collisions per area."},
    {id:"chem-T3-007",question:"Heating sealed rigid gas:",options:["Pressure drops","Pressure rises","Volume rises","Mass leaves"],correctIndex:1,explanation:"Harder hits on walls."},
    {id:"chem-T3-008",question:"Melting is:",options:["Exothermic","Endothermic","No energy","Only for ice"],correctIndex:1,explanation:"Breaks some lattice bonds."},
    {id:"chem-T3-009",question:"Deposition is:",options:["Gas to solid","Solid to gas","Liquid to gas","Gas to liquid"],correctIndex:0,explanation:"Reverse sublimation."},
    {id:"chem-T3-010",question:"Which state has strongest typical IM forces?",options:["Gas","Liquid","Solid","Same"],correctIndex:2,explanation:"Lattice binding."},
    {id:"chem-T3-011",question:"Brownian motion evidence for:",options:["Electrons only","Moving atoms/molecules","Gravity","Light waves"],correctIndex:1,explanation:"Particle kinetic evidence."},
    {id:"chem-T3-012",question:"Perfume across room is mainly:",options:["Convection only","Diffusion","Condensation","Ionisation"],correctIndex:1,explanation:"Random molecular motion."},
    {id:"chem-T3-013",question:"At same T, H₂ vs O₂ average speed:",options:["O₂ faster","H₂ faster","Same always","Zero"],correctIndex:1,explanation:"Lighter molecules faster (same KE)."},
    {id:"chem-T3-014",question:"In an experiment, a cotton swab soaked in concentrated ammonia is placed at one end of a tube, and a swab soaked in concentrated HCl at the other. A white ring forms. Where does it form?",options:["Exactly in the middle","Closer to the ammonia swab","Closer to the HCl swab","Outside the tube"],correctIndex:2,explanation:"Ammonia particles are lighter and move faster, travelling further down the tube before meeting the heavier, slower HCl particles."},
    {id:"chem-T3-015",question:"Surface evaporation rate increases with:",options:["Lower T","Wind and higher T","Lower surface area","Humid air always"],correctIndex:1,explanation:"More molecules escape."},
    {id:"chem-T3-016",question:"Solid expands on heating mostly because:",options:["Atoms destroyed","Vibration amplitude and spacing increase","Electrons lost","Mass increases"],correctIndex:1,explanation:"Typical thermal expansion."},
    {id:"chem-T3-017",question:"Gas in syringe sealed — push piston in:",options:["Pressure decreases","Pressure increases","T always drops to zero","No change"],correctIndex:1,explanation:"Boyle's law idea."},
    {id:"chem-T3-018",question:"Liquid boiling point at mountain:",options:["Higher than sea level","Lower than sea level","Same always","Undefined"],correctIndex:1,explanation:"Lower external pressure."},
    {id:"chem-T3-019",question:"Condensation on cold glass:",options:["Water vapour → liquid","Liquid → solid","Solid → gas","Endothermic for glass"],correctIndex:0,explanation:"Gas loses KE."},
    {id:"chem-T3-020",question:"Look at a standard heating curve for a pure solid melting into a liquid. What is happening to the particles during the flat, horizontal sections?",options:["The substance is cooling down","Thermal energy is used to overcome attractive forces between particles","Kinetic energy of the particles is decreasing","The particles are stopping completely"],correctIndex:1,explanation:"Temperature remains constant as energy is used to disrupt the regular arrangement and break intermolecular forces."},
    {id:"chem-T3-021",question:"Diffusion in gel slower than in water because:",options:["Particles bigger obstacle path","No difference","Gravity stronger","Temperature zero"],correctIndex:0,explanation:"Medium hinders motion."},
    {id:"chem-T3-022",question:"Sublimation of dry ice:",options:["CO₂ solid → gas","H₂O only","Metal vapour","Liquid CO₂ only"],correctIndex:0,explanation:"Dry ice sublimes."},
    {id:"chem-T3-023",question:"Which of the following describes vapour deposition?",options:["Solid to gas","Liquid to gas","Gas to solid","Gas to liquid"],correctIndex:2,explanation:"Vapour deposition is the reverse of sublimation; a gas cools directly into a solid."},
    {id:"chem-T3-024",question:"When liquid boils, temperature:",options:["Rises continuously","Stays constant until done","Drops","Zero"],correctIndex:1,explanation:"Latent heat goes to vapour."},
    {id:"chem-T3-025",question:"Gas pressure in container is due to:",options:["Weight of gas only","Momentum change at walls","Colour","Volume only"],correctIndex:1,explanation:"Collisions."},
    {id:"chem-T3-026",question:"Solid to liquid at constant pressure absorbs:",options:["Latent heat of fusion","Latent heat of vapourisation","No heat","Only light"],correctIndex:0,explanation:"Melting."},
    {id:"chem-T3-027",question:"At the same temperature, which gas diffuses fastest?",options:["O₂","N₂","CO₂","H₂"],correctIndex:3,explanation:"Lighter gas particles move faster on average at the same temperature."},
    {id:"chem-T3-028",question:"Why does increasing temperature raise the rate of diffusion?",options:["Particles become heavier","Particles move faster on average, so mixing happens quicker","Volume always decreases","Pressure always drops"],correctIndex:1,explanation:"Higher temperature increases average particle speed."},
    {id:"chem-T3-029",question:"A sealed gas is heated at constant volume. The pressure rises because:",options:["Molecules gain mass","Collisions with walls become more frequent and harder on average","The container shrinks","Avogadro’s number changes"],correctIndex:1,explanation:"Higher average kinetic energy → greater momentum transfer per collision and more frequent hits."},
    {id:"chem-T3-030",question:"A pure liquid is placed in a freezer. As it solidifies (freezes), what happens to its temperature?",options:["It continues to fall steadily","It rises slightly","It remains constant at the freezing point until entirely solid","It drops to absolute zero instantly"],correctIndex:2,explanation:"During changes of state, transition temperatures remain constant until the entire substance has changed state."},
    {id:"chem-T3-031",question:"Evaporation of a liquid is faster when the vapour above the liquid is:",options:["Saturated","Unsaturated (low humidity)","At 0 K","Trapped in a sealed vacuum always"],correctIndex:1,explanation:"A bigger vapour–liquid gradient drives net evaporation."},
    {id:"chem-T3-032",question:"The boiling point of a liquid depends on external pressure because:",options:["Boiling needs vapour pressure to match surrounding pressure","Only ionic liquids boil","Hydrogen bonds disappear at high P","Temperature is undefined"],correctIndex:0,explanation:"Bubbles form when liquid vapour pressure equals external pressure."},
    {id:"chem-T3-033",question:"Which change most increases how quickly particles spread out in a gas?",options:["Lowering temperature","Raising temperature","Increasing particle size","Using a heavier gas"],correctIndex:1,explanation:"Higher temperature means faster particle motion."},
    {id:"chem-T3-034",question:"Diffusion of KMnO₄ in water is slower than in air mainly because:",options:["KMnO₄ is not soluble","Liquid-phase collisions are denser and slower than gas-phase motion","Gravity stops diffusion in liquids","Water has no kinetic energy"],correctIndex:1,explanation:"Slower random motion and closer packing reduce mixing speed."},
    {id:"chem-T3-035",question:"Sublimation is endothermic because:",options:["It releases lattice energy","Energy is needed to overcome forces holding the solid together","Solids have no kinetic energy","It only occurs at 0 K"],correctIndex:1,explanation:"Breaking intermolecular (or lattice) interactions requires energy input."},
    {id:"chem-T3-036",question:"A sample of gas diffuses faster at higher temperature mainly because:",options:["Particles become lighter","Particles move with higher average kinetic energy","Gas becomes ionic","Volume must decrease"],correctIndex:1,explanation:"Higher temperature increases the average kinetic energy, raising the molecular speed of the gas."},
    {id:"chem-T3-201",question:"During boiling of a pure liquid at constant atmospheric pressure, the temperature of the liquid:",options:["Rises until all liquid is gone","Stays constant while both liquid and vapour coexist","Drops as vapour forms","Oscillates randomly"],correctIndex:1,explanation:"Energy input goes into latent heat of vaporisation at the boiling point."},
    
    {id:"chem-T3-203",question:"When a gas condenses to a liquid at constant pressure, the surroundings:",options:["Do work on the gas only","Receive energy (process is exothermic for the condensing substance)","Neither gain nor lose energy","Always cool to 0 K"],correctIndex:1,explanation:"Condensation releases latent heat to the surroundings."},
    {id:"chem-T3-204",question:"When ice changes to water at 0 °C, the temperature stays constant because:",options:["No energy is absorbed","Absorbed energy is used to overcome intermolecular attractions","Thermometer is faulty","Kinetic energy decreases"],correctIndex:1,explanation:"Latent heat goes into changing state, not raising temperature."},
    {id:"chem-T3-205",question:"Why is perfume smell detected faster in a warm room than a cold room?",options:["Warm air has fewer particles","Particles have more kinetic energy and diffuse faster","Perfume evaporates less","Air pressure is always lower"],correctIndex:1,explanation:"Higher temperature increases evaporation and diffusion rates."},
    {id:"chem-T3-206",question:"When ice melts to water at 0 °C (at constant pressure), energy absorbed is used mainly to:",options:["Raise the kinetic energy of molecules only","Break some lattice structure while maintaining the melting temperature","Decrease the volume always","Ionise the water"],correctIndex:1,explanation:"Latent heat goes into overcoming intermolecular forces in the solid."},
    {id:"chem-T3-207",question:"Liquid water is densest at about 4 °C mainly because:",options:["Ice is ionic","Hydrogen bonding opens an open structure in ice so liquid can pack more tightly above 0 °C","Water has no molecular motion at 4 °C","Gases dissolve more at 4 °C"],correctIndex:1,explanation:"Ice floats — open structure; liquid water can be denser."},
    
    {id:"chem-T3-209",question:"Deposition (gas → solid) on a cold surface releases energy because:",options:["Particles gain speed","Gas particles lose KE forming the solid lattice","Volume always increases","It is always endothermic"],correctIndex:1,explanation:"Forming stronger attractions in the solid releases energy."},
    {id:"chem-T3-301",question:"Sublimation means:",options:["Solid to liquid","Liquid to gas","Solid directly to gas","Gas to liquid"],correctIndex:2,explanation:"Sublimation is solid changing straight to gas."},
    {id:"chem-T3-302",question:"Why can gases be compressed much more than liquids?",options:["Gases have larger particles","Gas particles are far apart with lots of empty space","Liquids are always cold","Liquids have no particles"],correctIndex:1,explanation:"Large spaces between gas particles allow compression."},
    {id:"chem-T3-303",question:"Which change of state is exothermic?",options:["Melting","Boiling","Evaporation","Condensation"],correctIndex:3,explanation:"Condensation releases energy to surroundings."},
    {id:"chem-T3-304",question:"Which statement best describes particles in a liquid?",options:["Fixed in a regular lattice","Far apart with no attractions","Close together but able to move past one another","Not moving"],correctIndex:2,explanation:"Liquid particles are close but not fixed in place."},
    {id:"chem-T3-305",question:"Gas pressure in a container is caused by:",options:["Mass of gas only","Collisions of gas particles with container walls","Gravity only","Colour of gas"],correctIndex:1,explanation:"Pressure comes from particle-wall collisions."},
    {id:"chem-T3-306",question:"Ammonia (Mr = 17) diffuses faster than hydrogen chloride (Mr = 36.5) in air. This is because:",options:["Ammonia is acidic","Lighter molecules move faster at the same temperature (same average KE → higher average speed)","HCl is a liquid","Ammonia has more electrons"],correctIndex:1,explanation:"At the same temperature, lighter molecules have higher average speeds ($v \\propto \\frac{1}{\\sqrt{m}}$ at constant KE) — evidence from white ring position in the diffusion tube experiment."},
    {id:"chem-T3-307",question:"Brownian motion of smoke particles seen through a microscope provides evidence that:",options:["Smoke particles are alive","Air molecules are in constant random motion and bombard the smoke particles randomly","Smoke has a fixed structure","Light causes particles to move"],correctIndex:1,explanation:"Jittery random motion of visible particles is explained by invisible air molecules colliding unevenly — kinetic particle theory."},
    {id:"chem-T3-308",question:"When a gas is heated in a sealed container (fixed volume), the pressure increases because:",options:["Molecules get larger","Molecules collide with the walls more frequently and with greater force","Molecules disappear","Volume decreases"],correctIndex:1,explanation:"Higher temperature → greater kinetic energy → more frequent and harder collisions with container walls → higher pressure."},
    {id:"chem-T3-309",question:"The boiling point is the temperature at which:",options:["Liquid starts to absorb heat","Vapour pressure of the liquid equals the atmospheric pressure — particles throughout the liquid escape","All molecules stop moving","Only surface evaporation occurs"],correctIndex:1,explanation:"Boiling is bulk evaporation throughout the liquid; evaporation only happens from the surface at any temperature."},
    {id:"chem-T3-310",question:"Average kinetic energy of particles in a substance is directly proportional to:",options:["Mass number","Absolute temperature (in kelvin)","Volume only","Pressure only"],correctIndex:1,explanation:"$\\text{KE}_{\\text{avg}} \\propto T$ (kelvin). Hotter = faster-moving particles on average — this is the molecular basis of temperature."}
    ],
    extendedQuestions: [
        { 
        id: "chem-T3-E01", 
        commandWord: "Explain", 
        marks: 4, 
        syllabusNote: "Kinetic particle theory - dependence of diffusion rate on molecular mass.", 
        prompt: "A long glass tube has a cotton wool plug soaked in concentrated aqueous ammonia placed at one end, and a plug soaked in concentrated hydrochloric acid placed at the other end. After a few minutes, a white ring of ammonium chloride forms inside the tube.\n\nExplain, using the kinetic particle theory, why the white ring forms closer to the hydrochloric acid end.", 
        rubric: [ 
            "Mentions particles of ammonia and hydrogen chloride **evaporate/vaporise** and **diffuse** along the tube.", 
            "States that ammonia ($NH_3$) has a **lower relative molecular mass** ($M_r=17$) than hydrogen chloride ($HCl$, $M_r=36.5$).", 
            "Explains that gases with lower mass require less kinetic energy to move at the same speed, hence lighter particles **diffuse faster**.", 
            "Concludes that ammonia travels a **greater distance** in the same amount of time, causing the reaction to occur closer to the HCl source." 
        ], 
        modelAnswer: "Particles from the concentrated solutions evaporate and **diffuse** randomly down the glass tube. Ammonia has a **lower relative molecular mass** (17) compared to hydrogen chloride (36.5). According to kinetic particle theory, lighter particles move and **diffuse faster** than heavier particles at the same temperature. Therefore, the ammonia particles travel a **greater distance** in the same amount of time, meeting the hydrogen chloride particles and forming the white ring closer to the hydrochloric acid end." 
        }
    ],
    trueFalse: [
    {statement:"A liquid has a fixed volume but takes the shape of its container.",correct:true,explain:"Definition."},
    {statement:"Compressing a liquid is as easy as compressing a gas.",correct:false,explain:"Liquids nearly incompressible."},
    {statement:"Diffusion proves particles are in continuous random motion.",correct:true,explain:"Classic inference."},
    {statement:"Boiling point is when vapour pressure equals atmospheric pressure.",correct:true,explain:"Bubble formation stable."},
    {statement:"Heating always increases volume for every substance in every state.",correct:false,explain:"Water 0–4°C anomaly; some contracts."},
    {statement:"Gas fills any container because particles move randomly and are far apart.",correct:true,explain:"Kinetic picture."},
    {statement:"Evaporation only happens at 100°C for water.",correct:false,explain:"Any temperature — surface phenomenon."},
    {statement:"Sublimation skips the liquid phase.",correct:true,explain:"Solid directly to gas."},
    {statement:"In a solid, particles have zero kinetic energy at room temperature.",correct:false,explain:"They vibrate — zero point motion."},
    {statement:"Lighter gas molecules effuse faster through a small hole.",correct:true,explain:"Graham."},
    {statement:"Condensation is exothermic for the substance condensing.",correct:true,explain:"Energy released to surroundings."},
    {statement:"During boiling, the temperature of a pure liquid continues to rise as you add continuous heat.",correct:false,explain:"The temperature remains constant at the boiling point until all the liquid has changed to a gas."},
    {statement:"Heavier gas particles diffuse more slowly than lighter gas particles at the same temperature.",correct:true,explain:"Diffusion rate is inversely proportional to particle mass; heavier particles move slower."},
    {statement:"Evaporation can occur at temperatures significantly below a substance's boiling point.",correct:true,explain:"Evaporation happens at any temperature at the surface, unlike boiling which requires a specific fixed temperature throughout the liquid."}
    ],
    });
})();
