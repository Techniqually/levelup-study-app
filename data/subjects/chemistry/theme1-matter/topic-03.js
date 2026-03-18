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
        }
    ],
    infographics: [
      { image: "data/subjects/chemistry/images/matter-03-kinetic-theory.jpg", caption: "Particle arrangement: solid, liquid, gas" },
      { svg: "<svg viewBox=\"0 0 360 140\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"360\" height=\"140\" fill=\"#1c222d\"/><text x=\"50\" y=\"22\" fill=\"#5eead4\" font-size=\"11\" font-family=\"system-ui\">SOLID</text><g fill=\"#a78bfa\"><circle cx=\"40\" cy=\"55\" r=\"5\"/><circle cx=\"58\" cy=\"50\" r=\"5\"/><circle cx=\"52\" cy=\"70\" r=\"5\"/><circle cx=\"70\" cy=\"62\" r=\"5\"/></g><text x=\"190\" y=\"22\" fill=\"#5eead4\" font-size=\"11\">LIQUID</text><g fill=\"#5eead4\"><circle cx=\"205\" cy=\"55\" r=\"4\"/><circle cx=\"220\" cy=\"50\" r=\"4\"/><circle cx=\"215\" cy=\"68\" r=\"4\"/><circle cx=\"232\" cy=\"60\" r=\"4\"/><circle cx=\"245\" cy=\"52\" r=\"4\"/></g><text x=\"295\" y=\"22\" fill=\"#5eead4\" font-size=\"11\">GAS</text><g fill=\"#fb923c\"><circle cx=\"300\" cy=\"52\" r=\"3\"/><circle cx=\"318\" cy=\"48\" r=\"3\"/><circle cx=\"310\" cy=\"68\" r=\"3\"/><circle cx=\"328\" cy=\"62\" r=\"3\"/></g><text x=\"15\" y=\"128\" fill=\"#8b95a8\" font-size=\"9\">Fixed lattice · vibrate</text><text x=\"175\" y=\"128\" fill=\"#8b95a8\" font-size=\"9\">Random positions · close</text><text x=\"285\" y=\"128\" fill=\"#8b95a8\" font-size=\"9\">Far apart · rapid motion</text></svg>", caption: "Particle arrangement: solid, liquid, gas" }
    ],
    flashcards: [
        {
            "front": "Why can liquids flow?",
            "back": "Particles slide past one another."
        },
        {
            "front": "Gas pressure cause?",
            "back": "Particles colliding with walls."
        },
        {
            "front": "Evaporation vs boiling?",
            "back": "Evaporation surface any T; boiling throughout at bp."
        },
        {
            "front": "Sublimation?",
            "back": "Solid → gas without liquid."
        },
        {
            "front": "Brownian motion?",
            "back": "Random jostling of suspended particles by fluid molecules."
        },
        {
            "front": "Why gas is compressible?",
            "back": "Large empty space between particles."
        },
        {
            "front": "Heating a gas in fixed volume?",
            "back": "Pressure increases."
        },
        {
            "front": "Diffusion in liquids slower than gases?",
            "back": "Yes — slower particle motion."
        },
        {
            "front": "Melting point?",
            "back": "Solid and liquid coexist at equilibrium."
        },
        {
            "front": "Condensation releases energy?",
            "back": "Yes — particles lose KE."
        },
        {
            "front": "Ideal gas assumptions?",
            "back": "No forces; point particles; elastic collisions (model)."
        },
        {
            "front": "Why smell spreads?",
            "back": "Diffusion of volatile molecules in air."
        },
        {
            "front": "Expansion on heating (most solids)?",
            "back": "Particles vibrate more — average separation increases."
        },
        {
            "front": "Triple point?",
            "back": "T,P where solid, liquid, gas coexist (advanced)."
        }
    ],
    quiz: [
    {question:"Gas particles are best described as:",options:["Fixed in rows","Far apart with random motion","Only vibrating in place","Not moving at 0 K only"],correctIndex:1,explanation:"Kinetic model."},
    {question:"Liquids have definite:",options:["Shape and volume","Volume only","Neither","Shape only"],correctIndex:1,explanation:"Take container shape."},
    {question:"Boiling is:",options:["Only at surface","Throughout liquid at bp","Only for metals","Endothermic for surroundings"],correctIndex:1,explanation:"Bubbles form inside."},
    {question:"Evaporation cools liquid because:",options:["Fast molecules escape","Slow molecules escape","No energy change","Air heats it"],correctIndex:0,explanation:"Removes high-KE molecules."},
    {question:"Diffusion fastest in:",options:["Solid","Liquid","Gas","Same all"],correctIndex:2,explanation:"Higher speed, larger gaps."},
    {question:"Compressing gas at constant T:",options:["Increases pressure","Decreases collisions","Removes molecules","Becomes solid always"],correctIndex:0,explanation:"More collisions per area."},
    {question:"Heating sealed rigid gas:",options:["Pressure drops","Pressure rises","Volume rises","Mass leaves"],correctIndex:1,explanation:"Harder hits on walls."},
    {question:"Melting is:",options:["Exothermic","Endothermic","No energy","Only for ice"],correctIndex:1,explanation:"Breaks some lattice bonds."},
    {question:"Deposition is:",options:["Gas to solid","Solid to gas","Liquid to gas","Gas to liquid"],correctIndex:0,explanation:"Reverse sublimation."},
    {question:"Which state has strongest typical IM forces?",options:["Gas","Liquid","Solid","Same"],correctIndex:2,explanation:"Lattice binding."},
    {question:"Brownian motion evidence for:",options:["Electrons only","Moving atoms/molecules","Gravity","Light waves"],correctIndex:1,explanation:"Particle kinetic evidence."},
    {question:"Perfume across room is mainly:",options:["Convection only","Diffusion","Condensation","Ionisation"],correctIndex:1,explanation:"Random molecular motion."},
    {question:"At same T, H₂ vs O₂ average speed:",options:["O₂ faster","H₂ faster","Same always","Zero"],correctIndex:1,explanation:"Lighter molecules faster (same KE)."},
    {question:"Internal energy of ideal gas increases when:",options:["Volume doubled at constant T","Temperature rises","Pressure drops isothermally","Mass halved"],correctIndex:1,explanation:"KE linked to T."},
    {question:"Surface evaporation rate increases with:",options:["Lower T","Wind and higher T","Lower surface area","Humid air always"],correctIndex:1,explanation:"More molecules escape."},
    {question:"Solid expands on heating mostly because:",options:["Atoms destroyed","Vibration amplitude and spacing increase","Electrons lost","Mass increases"],correctIndex:1,explanation:"Typical thermal expansion."},
    {question:"Gas in syringe sealed — push piston in:",options:["Pressure decreases","Pressure increases","T always drops to zero","No change"],correctIndex:1,explanation:"Boyle's law idea."},
    {question:"Liquid boiling point at mountain:",options:["Higher than sea level","Lower than sea level","Same always","Undefined"],correctIndex:1,explanation:"Lower external pressure."},
    {question:"Condensation on cold glass:",options:["Water vapour → liquid","Liquid → solid","Solid → gas","Endothermic for glass"],correctIndex:0,explanation:"Gas loses KE."},
    {question:"Which is NOT assumed in simple particle model of ideal gas:",options:["Elastic collisions","Negligible volume of particles","Strong attractions at all distances","Random motion"],correctIndex:2,explanation:"Ideal: no IM forces."},
    {question:"Diffusion in gel slower than in water because:",options:["Particles bigger obstacle path","No difference","Gravity stronger","Temperature zero"],correctIndex:0,explanation:"Medium hinders motion."},
    {question:"Sublimation of dry ice:",options:["CO₂ solid → gas","H₂O only","Metal vapour","Liquid CO₂ only"],correctIndex:0,explanation:"Dry ice sublimes."},
    {question:"Rate of diffusion Graham's law (same T):",options:["Heavier gas faster","Lighter gas faster","Independent of mass","Only liquids"],correctIndex:1,explanation:"u ∝ 1/√M."},
    {question:"When liquid boils, temperature:",options:["Rises continuously","Stays constant until done","Drops","Zero"],correctIndex:1,explanation:"Latent heat goes to vapour."},
    {question:"Gas pressure in container is due to:",options:["Weight of gas only","Momentum change at walls","Colour","Volume only"],correctIndex:1,explanation:"Collisions."},
    {question:"Solid to liquid at constant pressure absorbs:",options:["Latent heat of fusion","Latent heat of vapourisation","No heat","Only light"],correctIndex:0,explanation:"Melting."}
    ],
    trueFalse: [
    {statement:"All particles in a gas have exactly the same speed at a given temperature.",correct:false,explain:"Maxwell-Boltzmann distribution — range of speeds."},
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
    {statement:"Condensation is exothermic for the substance condensing.",correct:true,explain:"Energy released to surroundings."}
    ],
    });
})();
