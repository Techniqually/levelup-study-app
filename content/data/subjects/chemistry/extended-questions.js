(function () {
  function q(id, commandWord, marks, prompt, rubric, modelAnswer, syllabusNote, minCharsForModel) {
    return {
      id: id,
      commandWord: commandWord,
      marks: marks,
      prompt: prompt,
      rubric: rubric,
      modelAnswer: modelAnswer,
      syllabusNote: syllabusNote || "",
      minCharsForModel: Number(minCharsForModel || 60),
    };
  }

  window.SUBJECT_WRITTEN_QUESTIONS_BY_TOPIC = window.SUBJECT_WRITTEN_QUESTIONS_BY_TOPIC || {};
  Object.assign(window.SUBJECT_WRITTEN_QUESTIONS_BY_TOPIC, {
    "1": [
      q("chem-T1-EX-05", "Explain", 5, "A student investigates how concentration of hydrochloric acid affects the rate of reaction with magnesium ribbon.\n\nExplain why the student must keep **temperature**, **mass/length of magnesium**, and **total volume of solution** constant.", [
        "Identifies these as **control variables** in a fair test.",
        "Explains each can affect rate independently (collision frequency/energy, amount of reactant).",
        "States only one independent variable should change to keep the conclusion valid.",
      ], "- Keep temperature, magnesium amount, and solution volume constant so they do not become extra causes of rate change.\n- If any of these changes, reaction rate may change even at the same concentration.\n- Therefore, only concentration should vary for a valid conclusion.", "Topic 1 experimental design"),
      q("chem-T1-EX-06", "Describe", 4, "Describe how **repeat trials** and **averaging** improve reliability in practical chemistry.", [
        "States repeats reduce random error effects.",
        "Mentions outliers/anomalies can be identified and investigated.",
        "Averaging gives a more representative value.",
      ], "- Repeating measurements reduces the influence of random fluctuations.\n- A clearly inconsistent value can be checked as an anomaly.\n- Taking the mean gives a more reliable estimate than a single reading.", "Topic 1 reliability and data quality"),
      q("chem-T1-EX-07", "Explain", 4, "A student reads a measuring cylinder from above eye level.\n\nExplain why this causes a systematic error and suggest one correction.", [
        "Names parallax/meniscus reading error.",
        "Explains same reading bias repeats in one direction.",
        "Gives valid correction: read meniscus at eye level.",
      ], "- Reading above or below eye level gives parallax error.\n- This shifts readings consistently high or low, so the error is systematic.\n- Correction: place eye level with the meniscus and read consistently.", "Topic 1 measurement error"),
      q("chem-T1-EX-08", "State", 3, "State the difference between **accuracy**, **precision**, and **validity** in an experiment.", [
        "Accuracy: closeness to true value.",
        "Precision: closeness of repeated values.",
        "Validity: method tests what it claims/controls confounders.",
      ], "- Accuracy is how close results are to the accepted true value.\n- Precision is how close repeated results are to one another.\n- Validity is whether the method fairly tests the intended variable.", "Topic 1 core terms"),
      q("chem-T1-EX-09", "Explain", 5, "A class compares two methods to collect gas and obtains different yields.\n\nExplain what must be standardised before concluding one method is better.", [
        "Same reactant amounts/concentrations and conditions.",
        "Same timing and end-point definition.",
        "Same leak control/apparatus checks.",
        "Need comparable repeats for both methods.",
      ], "- Standardise reactant quantities, concentration, and temperature.\n- Use the same time interval or end-point rule.\n- Ensure airtight apparatus in both methods.\n- Run repeats for each method before comparing mean yield.", "Topic 1 fair comparison"),
      q("chem-T1-EX-10", "Describe", 4, "Describe a suitable table format for raw practical data and processed data.", [
        "Raw readings recorded with units and headings.",
        "Consistent decimal places/significant figures based on instrument resolution.",
        "Processed values (mean/gradient) kept in separate columns.",
      ], "- Use clear column headings with units (for example, time / s, volume / cm^3).\n- Record raw repeats first, then include a separate mean column.\n- Keep decimals consistent with instrument precision.", "Topic 1 data handling"),
    ],
    "2": [
      q("chem-T2-EX-05", "Explain", 5, "A student uses **simple distillation** to separate ethanol from water with close boiling points.\n\nExplain why the distillate is not very pure and how to improve the method.", [
        "Close boiling points give mixed vapour composition.",
        "Simple distillation has limited fractionation.",
        "Use fractional distillation (column, repeated condensation/evaporation).",
      ], "- Ethanol and water have relatively close boiling points, so both enter vapour.\n- Simple distillation gives limited separation, so distillate remains mixed.\n- A fractionating column increases repeated condensation/evaporation and improves purity.", "Topic 2 distillation"),
      q("chem-T2-EX-06", "Describe", 4, "Describe how to obtain pure copper(II) sulfate crystals from copper(II) sulfate solution.", [
        "Heat gently to concentrate, not to dryness.",
        "Allow solution to cool to crystallise.",
        "Filter and dry crystals.",
      ], "- Warm the solution to evaporate some water and make it near saturation.\n- Leave to cool so crystals form.\n- Filter out crystals and dry between filter papers or in a warm oven.", "Topic 2 crystallisation"),
      q("chem-T2-EX-07", "Explain", 4, "In chromatography, explain why spots must be small and the tank should be covered.", [
        "Small spots reduce tailing/overlap.",
        "Covered tank maintains solvent vapour and stable front.",
        "Improves separation and reproducibility.",
      ], "- Small concentrated spots prevent smearing and overlap.\n- A covered tank keeps solvent vapour saturated so solvent front moves more evenly.\n- This gives clearer separation and more reliable R_f values.", "Topic 2 chromatography"),
      q("chem-T2-EX-08", "Calculate", 4, "A spot travels 3.6 cm while solvent front travels 8.0 cm.\n\nCalculate $R_f$ and comment on whether the value is valid.", [
        "Uses $R_f = \\frac{3.6}{8.0}$.",
        "Obtains 0.45.",
        "States value is valid because $0 < R_f < 1$.",
      ], "$R_f = \\frac{3.6}{8.0} = 0.45$.\nThe value is valid because $R_f$ must be between 0 and 1.", "Topic 2 R_f"),
      q("chem-T2-EX-09", "Explain", 5, "A separating funnel contains two immiscible layers. Explain how to identify and collect each layer safely.", [
        "Denser liquid is lower layer.",
        "Use stopper and tap correctly; drain lower layer first.",
        "Stop at interface and collect upper layer separately.",
      ], "- In a separating funnel, the denser liquid forms the lower layer.\n- Open tap to drain the lower layer into one beaker.\n- Close tap at the interface, then pour out upper layer into a second beaker.", "Topic 2 immiscible liquid separation"),
      q("chem-T2-EX-10", "State", 3, "State two limitations of using only one solvent system to identify compounds by chromatography.", [
        "Different compounds can share same R_f in one solvent.",
        "R_f depends on conditions (solvent, temperature, support).",
      ], "- Two different compounds can sometimes have similar or equal R_f in one solvent.\n- R_f depends on conditions, so confirmation with another solvent/system is needed.", "Topic 2 chromatography validity"),
    ],
    "3": [
      q("chem-T3-EX-01", "Explain", 5, "Explain why gases are more compressible than liquids and solids using kinetic particle theory.", [
        "Gas particles are far apart with large empty spaces.",
        "Compression reduces spaces between particles.",
        "Liquid/solid particles are closer so much less compressible.",
      ], "- Gas particles have large spaces between them, so pressure pushes them closer together.\n- In liquids and solids, particles are already close-packed, so volume change is small.", "Topic 3 KPT"),
      q("chem-T3-EX-02", "Describe", 4, "Describe particle changes when ice is heated to steam.", [
        "Solid: particles vibrate in fixed positions.",
        "Liquid: particles move past each other.",
        "Gas: particles move randomly and rapidly with weak attractions.",
      ], "- In ice, particles vibrate about fixed positions.\n- On melting, particles can slide past one another (liquid).\n- On boiling, particles separate widely and move quickly in all directions.", "Topic 3 states of matter"),
      q("chem-T3-EX-03", "Explain", 4, "A gas syringe reading increases when temperature rises at constant pressure.\nExplain using particles.", [
        "Higher temperature increases particle kinetic energy.",
        "Particles move faster and collide more forcefully/frequently.",
        "Gas expands to maintain pressure equilibrium.",
      ], "- Heating gives gas particles more kinetic energy.\n- They move faster and produce greater pressure.\n- At constant external pressure, volume increases until pressures balance.", "Topic 3 gas behavior"),
      q("chem-T3-EX-04", "State", 3, "State what diffusion shows about particles in gases and liquids.", [
        "Particles are moving randomly.",
        "Movement occurs from high to low concentration.",
      ], "- Diffusion shows particles are in constant random motion.\n- Net movement is from higher concentration to lower concentration.", "Topic 3 diffusion"),
      q("chem-T3-EX-05", "Explain", 5, "A perfume smell spreads faster in a warm room than a cold room. Explain fully.", [
        "Higher temperature raises kinetic energy.",
        "Faster random motion increases diffusion rate.",
        "Shorter time to spread across room.",
      ], "- In a warm room, perfume molecules have higher kinetic energy.\n- They move faster, so diffusion from concentrated source to the room happens more quickly.\n- Therefore smell reaches people sooner.", "Topic 3 diffusion and temperature"),
    ],
    "4": [
      q("chem-T4-EX-01", "Explain", 5, "Chlorine has isotopes $^{35}Cl$ and $^{37}Cl$.\nExplain isotopes and why chlorine has relative atomic mass around 35.5.", [
        "Isotopes: same proton number, different neutron number.",
        "Relative atomic mass is weighted mean of isotope abundances.",
        "Value lies between isotope mass numbers.",
      ], "- Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons.\n- Relative atomic mass uses weighted average of isotopic abundances.\n- For chlorine, mixed isotopes give a value around 35.5.", "Topic 4 isotopes"),
      q("chem-T4-EX-02", "State", 4, "State the numbers of protons, neutrons and electrons in $^{24}_{12}Mg^{2+}$.", [
        "Protons = 12.",
        "Neutrons = 24 - 12 = 12.",
        "Electrons in Mg^2+ = 10.",
      ], "For $^{24}_{12}Mg^{2+}$:\n- protons = 12\n- neutrons = 12\n- electrons = 10", "Topic 4 subatomic particles"),
      q("chem-T4-EX-03", "Describe", 4, "Describe the arrangement of electrons in shells for sodium atom and sodium ion.", [
        "Na atom: 2,8,1.",
        "Na^+ ion: 2,8.",
        "Loss of one valence electron forms cation.",
      ], "Sodium atom has electronic configuration 2,8,1.\nSodium ion (Na^+) has 2,8 after losing one outer electron.", "Topic 4 electronic configuration"),
      q("chem-T4-EX-04", "Explain", 5, "Explain why atoms are electrically neutral but ions are charged.", [
        "Neutral atom has equal protons and electrons.",
        "Ion forms by electron gain/loss only.",
        "Unequal proton/electron count gives net charge.",
      ], "- A neutral atom has equal positive protons and negative electrons.\n- Ions form when electrons are gained or lost.\n- If electrons are lost, ion is positive; if gained, ion is negative.", "Topic 4 ions"),
      q("chem-T4-EX-05", "Calculate", 3, "An atom has proton number 17 and mass number 37.\nCalculate number of neutrons.", [
        "Neutrons = mass number - proton number.",
        "37 - 17 = 20.",
      ], "Neutrons $= 37 - 17 = 20$.", "Topic 4 atomic notation"),
    ],
    "5": [
      q("chem-T5-EX-01", "Explain", 6, "Compare ionic bonding in magnesium oxide with covalent bonding in carbon dioxide.", [
        "Ionic: electron transfer, Mg^2+ and O^2- ions, electrostatic attraction.",
        "Covalent: shared electron pairs between non-metals.",
        "Links bonding type to structure/properties (high mp for ionic, molecular CO2 lower mp).",
      ], "- In MgO, magnesium transfers two electrons to oxygen to form Mg^2+ and O^2-; strong electrostatic attraction forms a giant ionic lattice.\n- In CO2, carbon and oxygen share electron pairs to form covalent bonds in simple molecules.\n- Giant ionic lattices have high melting points; simple molecular substances generally have lower melting points.", "Topic 5 bonding comparison"),
      q("chem-T5-EX-02", "Describe", 4, "Describe why graphite conducts electricity but diamond does not.", [
        "Graphite has delocalised/mobile electrons.",
        "Diamond has all valence electrons in covalent bonds.",
        "No mobile charge carriers in diamond.",
      ], "- Graphite has each carbon bonded to three others, leaving one delocalised electron per atom.\n- These mobile electrons carry charge, so graphite conducts.\n- In diamond, each carbon uses all four valence electrons in bonds, so no free electrons exist.", "Topic 5 allotropes"),
      q("chem-T5-EX-03", "Explain", 5, "Explain why sodium chloride conducts when molten but not when solid.", [
        "Solid lattice has fixed ions (no mobility).",
        "Molten state has mobile ions.",
        "Current requires moving charged particles.",
      ], "- In solid NaCl, ions are locked in a lattice and cannot move.\n- When molten, ions are free to move and carry charge.\n- Therefore molten NaCl conducts but solid NaCl does not.", "Topic 5 ionic conduction"),
      q("chem-T5-EX-04", "State", 4, "State two differences between giant covalent and simple molecular structures.", [
        "Giant covalent: extended network, very high mp/bp.",
        "Simple molecular: discrete molecules, lower mp/bp due to weak intermolecular forces.",
      ], "- Giant covalent substances have continuous networks of strong covalent bonds, so melting/boiling points are very high.\n- Simple molecular substances consist of separate molecules with weaker intermolecular forces, so melting/boiling points are usually lower.", "Topic 5 structures"),
      q("chem-T5-EX-05", "Explain", 5, "Silicon dioxide is hard and has high melting point.\nExplain using structure and bonding.", [
        "Giant covalent network.",
        "Many strong Si-O covalent bonds throughout lattice.",
        "Large energy needed to break bonds.",
      ], "- SiO2 forms a giant covalent structure.\n- Strong Si-O covalent bonds extend through the lattice.\n- A lot of energy is needed to break many bonds, so it is hard and has high melting point.", "Topic 5 giant covalent"),
    ],
    "6": [
      q("chem-T6-EX-01", "Calculate", 5, "Calculate moles of sodium hydroxide in 25.0 cm^3 of 0.200 mol dm^-3 NaOH.", [
        "Convert volume to dm^3: 25.0 cm^3 = 0.0250 dm^3.",
        "Use n = cV.",
        "n = 0.200 x 0.0250 = 0.00500 mol.",
      ], "$n = cV = 0.200 \\times 0.0250 = 5.00 \\times 10^{-3}\\ \\text{mol}$.", "Topic 6 mole calculations"),
      q("chem-T6-EX-02", "Calculate", 6, "2HCl + Mg -> MgCl2 + H2\n\nIf 0.050 mol Mg reacts fully, calculate moles of H2 formed.", [
        "Uses stoichiometric ratio Mg:H2 = 1:1.",
        "Moles H2 = 0.050 mol.",
        "References balanced equation.",
      ], "From 2HCl + Mg -> MgCl2 + H2, Mg:H2 ratio is 1:1.\nSo moles of H2 formed = 0.050 mol.", "Topic 6 stoichiometry"),
      q("chem-T6-EX-03", "Explain", 5, "Explain why balancing equations is essential before mole calculations.", [
        "Coefficients give mole ratios.",
        "Incorrect balancing gives wrong stoichiometric factors.",
        "Directly affects calculated masses/volumes/yields.",
      ], "- Balanced equations give correct mole ratios between reactants and products.\n- Mole calculations depend on these ratios.\n- If equation is not balanced, all later quantitative answers are wrong.", "Topic 6 equations and moles"),
      q("chem-T6-EX-05", "Describe", 4, "Describe how percentage yield is calculated and suggest one reason for yield below 100%.", [
        "Percentage yield = actual/theoretical x 100%.",
        "Any valid reason: incomplete reaction, side reactions, product loss in transfer/filtration.",
      ], "Percentage yield is calculated by\n$\\frac{\\text{actual yield}}{\\text{theoretical yield}}\\times 100\\%$.\nYield may be below 100% due to incomplete reaction or product losses during purification.", "Topic 6 yield"),
    ],
    "7": [
      q("chem-T7-EX-01", "Explain", 5, "Explain why acids conduct electricity only in aqueous solution, using hydrochloric acid as an example.", [
        "Acids ionise in water to form mobile ions (H^+ / H3O^+ and anions).",
        "Current carried by moving ions.",
        "No significant ion mobility in pure covalent gas/liquid state.",
      ], "- In water, HCl forms ions (H^+ and Cl^-), which move and carry charge.\n- Electrical conduction in electrolytes depends on mobile ions.\n- Without ionisation/mobile ions, conduction is poor.", "Topic 7 acids and conductivity"),
      q("chem-T7-EX-02", "Describe", 4, "Describe what happens when dilute acid reacts with a carbonate, and give one test for the gas produced.", [
        "Produces salt, water, and carbon dioxide.",
        "Effervescence observed.",
        "CO2 turns limewater milky.",
      ], "- Acid + carbonate gives salt + water + carbon dioxide.\n- Bubbles/effervescence are seen.\n- The gas turns limewater milky, confirming carbon dioxide.", "Topic 7 acid reactions"),
      q("chem-T7-EX-04", "State", 4, "State two differences between strong and weak acids of equal concentration.", [
        "Strong acids ionise almost completely; weak acids partially.",
        "Strong acids have higher [H^+] and usually lower pH.",
      ], "- Strong acids ionise nearly completely in water; weak acids only partially ionise.\n- For equal concentration, strong acids produce higher hydrogen ion concentration and lower pH.", "Topic 7 acid strength"),
      q("chem-T7-EX-05", "Explain", 5, "Explain why antacid tablets containing carbonate can relieve excess stomach acid.", [
        "Neutralisation of excess HCl.",
        "Produces salt + water (and CO2 if carbonate).",
        "Reduces acidity and irritation.",
      ], "- Carbonate antacids react with excess hydrochloric acid in the stomach.\n- Neutralisation lowers acidity by converting acid to salt and water (plus carbon dioxide).\n- Lower acidity helps reduce irritation and discomfort.", "Topic 7 neutralisation"),
    ],
    "8": [
      q("chem-T8-EX-01", "Describe", 6, "Describe how to prepare pure copper(II) sulfate crystals starting from dilute sulfuric acid and copper(II) oxide.", [
        "Warm acid gently and add CuO in excess.",
        "Filter off unreacted solid.",
        "Evaporate filtrate to near saturation, cool to crystallise.",
        "Filter and dry crystals.",
      ], "- Warm dilute sulfuric acid and add copper(II) oxide until some remains unreacted (ensures complete neutralisation).\n- Filter to remove excess solid.\n- Heat filtrate to concentrate, then cool to form crystals.\n- Filter and dry crystals.", "Topic 8 soluble salt prep"),
      q("chem-T8-EX-02", "Explain", 5, "Explain why excess insoluble base is used in soluble salt preparation from acid.", [
        "Ensures all acid is neutralised.",
        "Excess solid can be removed by filtration.",
        "Avoids acidic contamination in final salt solution.",
      ], "- Adding excess insoluble base guarantees all acid is used up.\n- Any unreacted base is insoluble and easy to remove by filtration.\n- This leaves a neutral salt solution before crystallisation.", "Topic 8 method rationale"),
      q("chem-T8-EX-03", "Describe", 5, "Describe how to make barium sulfate in the lab and explain why this method is used.", [
        "Mix two soluble solutions containing Ba^2+ and SO4^2-.",
        "White precipitate forms.",
        "Filter, wash, and dry precipitate.",
        "Used because BaSO4 is insoluble.",
      ], "- Mix barium chloride solution with sodium sulfate solution.\n- A white precipitate of barium sulfate forms.\n- Filter, wash with distilled water, and dry the solid.\n- Precipitation is used because barium sulfate is insoluble in water.", "Topic 8 precipitation"),
      q("chem-T8-EX-04", "Calculate", 4, "Write the ionic equation for formation of silver chloride precipitate from silver nitrate and sodium chloride solutions.", [
        "Identifies spectator ions Na^+ and NO3^-.",
        "Correct ionic equation: Ag^+ + Cl^- -> AgCl(s).",
      ], "$Ag^+(aq) + Cl^-(aq) \\rightarrow AgCl(s)$", "Topic 8 ionic equation"),
      q("chem-T8-EX-05", "Explain", 5, "A student heats a salt solution to dryness strongly and gets poor crystals.\nExplain what likely went wrong.", [
        "Overheating to dryness can cause decomposition/spattering.",
        "Crystallisation requires concentrated hot solution then controlled cooling.",
        "Rapid or complete drying harms crystal quality/purity.",
      ], "- Heating to complete dryness can decompose some salts or cause spitting/loss.\n- Good crystallisation needs near-saturated solution then slow cooling.\n- Overheating gives poor crystal formation and possible impurity.", "Topic 8 crystallisation control"),
    ],
    "9": [
      q("chem-T9-EX-02", "Describe", 4, "Describe laboratory test to identify ammonia gas.", [
        "Pungent smell (carefully wafted).",
        "Turns damp red litmus paper blue.",
        "Forms white fumes with HCl gas (ammonium chloride).",
      ], "- Ammonia has a pungent smell (test safely).\n- It turns damp red litmus blue.\n- With hydrogen chloride gas, dense white fumes of ammonium chloride form.", "Topic 9 gas test"),
      q("chem-T9-EX-03", "Explain", 5, "Explain the role of denitrifying bacteria in the nitrogen cycle and one agricultural implication.", [
        "Convert nitrates to nitrogen gas under anaerobic conditions.",
        "Removes fixed nitrogen from soil.",
        "Can reduce soil fertility/increase fertiliser requirement.",
      ], "- Denitrifying bacteria convert nitrate ions back to nitrogen gas.\n- This removes plant-available nitrogen from the soil.\n- Farmers may need additional fertiliser to maintain crop yield.", "Topic 9 nitrogen cycle"),
      q("chem-T9-EX-04", "State", 4, "State two ways ammonia is used industrially and link each use to chemistry.", [
        "Fertiliser production (ammonium salts/urea as nitrogen source).",
        "Nitric acid manufacture (Ostwald process).",
      ], "- Ammonia is used to produce nitrogen fertilisers such as ammonium nitrate/urea.\n- It is also oxidised to produce nitric acid for further chemical manufacture.", "Topic 9 uses of ammonia"),
      q("chem-T9-EX-05", "Explain", 5, "Explain why the ammonia fountain experiment gives a rapid rise of water into the flask.", [
        "Ammonia dissolves very readily in water.",
        "Gas amount/pressure in flask drops.",
        "External atmospheric pressure pushes water in quickly.",
      ], "- Ammonia is highly soluble in water.\n- As it dissolves, gas pressure inside the flask falls.\n- Atmospheric pressure outside forces water into the flask rapidly, producing the fountain.", "Topic 9 solubility and pressure"),
    ],
    "10": [
      q("chem-T10-EX-01", "Describe", 6, "Describe tests and observations to distinguish aqueous Al^3+, Zn^2+ and Ca^2+ using sodium hydroxide solution.", [
        "All may form white precipitates initially.",
        "Al(OH)3 and Zn(OH)2 dissolve in excess NaOH (amphoteric behavior).",
        "Ca(OH)2 does not dissolve in excess NaOH.",
      ], "- Add NaOH dropwise: white precipitates may appear.\n- In excess NaOH, Al^3+ and Zn^2+ precipitates dissolve, but Ca^2+ precipitate remains.\n- Therefore amphoteric ions are identified by dissolving in excess.", "Topic 10 cation analysis"),
      q("chem-T10-EX-02", "Explain", 5, "Explain why acidified silver nitrate is used to test for chloride ions.", [
        "Acidification removes carbonate/hydroxide interference.",
        "Cl^- forms white AgCl precipitate.",
        "Improves specificity of halide test.",
      ], "- The sample is acidified first to remove interfering ions such as carbonate.\n- Chloride then reacts with Ag^+ to form white AgCl precipitate.\n- This gives a clearer, more specific halide test.", "Topic 10 anion tests"),
      q("chem-T10-EX-03", "Describe", 5, "Describe how to test for sulfate ions in solution and state observation.", [
        "Acidify with dilute acid.",
        "Add barium chloride or barium nitrate solution.",
        "White precipitate of barium sulfate indicates sulfate.",
      ], "- Acidify sample with dilute nitric/hydrochloric acid.\n- Add barium ion solution.\n- A white precipitate of BaSO4 confirms sulfate ions.", "Topic 10 sulfate test"),
      q("chem-T10-EX-04", "Explain", 5, "A gas decolourises acidified potassium manganate(VII).\nExplain what this suggests and name one likely gas from syllabus tests.", [
        "Decolourisation indicates reducing agent present.",
        "SO2 is a likely reducing gas in qualitative analysis context.",
      ], "- Acidified KMnO4 is purple and is decolourised by reducing agents.\n- This suggests a reducing gas such as sulfur dioxide is present.", "Topic 10 redox gas test"),
      q("chem-T10-EX-05", "State", 4, "State expected flame test colours for sodium, potassium and copper(II).", [
        "Sodium: yellow.",
        "Potassium: lilac.",
        "Copper(II): blue-green.",
      ], "- Sodium gives a yellow flame.\n- Potassium gives a lilac flame.\n- Copper(II) gives a blue-green flame.", "Topic 10 flame tests"),
    ],
    "11": [
      q("chem-T11-EX-01", "Explain", 6, "Using oxidation state changes, explain why reaction between iron and copper(II) sulfate is a redox reaction.", [
        "Fe: 0 to +2 (oxidation).",
        "Cu^2+: +2 to 0 (reduction).",
        "Both oxidation and reduction occur simultaneously.",
      ], "- In $Fe + CuSO_4 \\rightarrow FeSO_4 + Cu$, iron changes from 0 to +2, so iron is oxidised.\n- Copper ions change from +2 to 0, so copper is reduced.\n- Because oxidation and reduction happen together, this is redox.", "Topic 11 oxidation states"),
      q("chem-T11-EX-02", "Describe", 4, "Describe one everyday corrosion process and one method to prevent it.", [
        "Valid process: rusting of iron in presence of oxygen and water.",
        "Valid prevention: painting, galvanising, sacrificial protection, alloying.",
      ], "- Rusting is corrosion of iron when oxygen and water are both present.\n- A prevention method is galvanising: zinc coating protects iron and acts as sacrificial metal.", "Topic 11 corrosion"),
      q("chem-T11-EX-03", "Explain", 5, "Explain why oxidation and reduction must occur together in chemical reactions.", [
        "Electron transfer framework.",
        "Electrons lost by one species must be gained by another.",
        "Conservation of charge.",
      ], "- Oxidation involves loss of electrons and reduction involves gain of electrons.\n- Electrons cannot disappear, so species losing electrons must transfer them to species gaining electrons.\n- Therefore oxidation and reduction are coupled processes.", "Topic 11 electron transfer"),
      q("chem-T11-EX-04", "State", 4, "State what is meant by oxidising agent and reducing agent.", [
        "Oxidising agent causes oxidation, itself reduced.",
        "Reducing agent causes reduction, itself oxidised.",
      ], "- An oxidising agent causes another substance to be oxidised and is itself reduced.\n- A reducing agent causes another substance to be reduced and is itself oxidised.", "Topic 11 definitions"),
      q("chem-T11-EX-05", "Explain", 5, "Chlorine displaces bromine from bromide solution.\nExplain this in terms of relative oxidising power.", [
        "More reactive halogen is stronger oxidising agent.",
        "Cl2 gains electrons from Br^- to form Cl^-.",
        "Br^- is oxidised to Br2.",
      ], "- Chlorine is more reactive and a stronger oxidising agent than bromine.\n- Chlorine molecules gain electrons from bromide ions to form chloride ions.\n- Bromide ions are oxidised to bromine molecules.", "Topic 11 halogen redox"),
    ],
    "12": [
      q("chem-T12-EX-01", "Explain", 6, "Explain why graphite is used as an electrode in electrolysis of aqueous solutions.", [
        "Conducts electricity.",
        "Relatively unreactive under many electrolysis conditions.",
        "Provides surface for electron transfer.",
      ], "- Graphite conducts electricity so electrons can move to/from the electrolyte.\n- It is relatively inert in many school electrolysis systems.\n- It provides a stable electrode surface for redox reactions.", "Topic 12 electrolysis setup"),
      q("chem-T12-EX-02", "Describe", 5, "Describe products and key observations for electrolysis of concentrated aqueous sodium chloride (brine) with inert electrodes.", [
        "Cathode: hydrogen gas.",
        "Anode: chlorine gas.",
        "Solution near cathode becomes alkaline (NaOH formed in solution).",
      ], "- At the cathode, hydrogen gas is produced.\n- At the anode, chlorine gas is produced.\n- The remaining solution becomes alkaline due to sodium hydroxide formation.", "Topic 12 brine electrolysis"),
      q("chem-T12-EX-03", "Explain", 5, "Explain why aluminium is extracted by electrolysis rather than reduction with carbon.", [
        "Aluminium more reactive than carbon.",
        "Carbon cannot reduce Al2O3 effectively.",
        "Electrolysis provides external electrical energy to force reduction.",
      ], "- Aluminium is above carbon in reactivity, so carbon cannot reduce aluminium oxide effectively.\n- Extraction therefore uses electrolysis of molten/alumina-containing electrolyte to force reduction at the cathode.", "Topic 12 extraction"),
      q("chem-T12-EX-05", "State", 4, "State one advantage and one environmental issue of electroplating.", [
        "Advantage: corrosion resistance/appearance.",
        "Issue: toxic metal ions/waste disposal/electricity consumption.",
      ], "- Advantage: electroplating protects metal from corrosion and improves appearance.\n- Environmental issue: plating solutions can contain harmful ions that need proper treatment/disposal.", "Topic 12 applications"),
    ],
    "13": [
      q("chem-T13-EX-01", "Describe", 5, "Describe trends down Group I for reactivity and melting point, with explanation.", [
        "Reactivity increases down group.",
        "Melting point generally decreases down group.",
        "Outer electron further from nucleus, weaker attraction.",
      ], "- Down Group I, reactivity increases because outer electron is further from nucleus and easier to lose.\n- Melting points decrease because metallic bonding weakens with larger ions and greater spacing.", "Topic 13 Group I"),
      q("chem-T13-EX-02", "Explain", 5, "Explain why halogens become less reactive down Group VII.", [
        "Reactivity depends on gaining one electron.",
        "Atomic radius and shielding increase down group.",
        "Nuclear attraction for incoming electron weakens.",
      ], "- Halogens react by gaining an electron.\n- Down the group, atoms are larger with more shielding, so attraction for an incoming electron decreases.\n- Hence oxidising power/reactivity decreases down Group VII.", "Topic 13 Group VII"),
      q("chem-T13-EX-03", "Describe", 4, "Describe the change in physical state and colour of halogens from chlorine to iodine.", [
        "Chlorine: pale green gas.",
        "Bromine: red-brown liquid.",
        "Iodine: dark grey solid (purple vapour when heated).",
      ], "- Chlorine is a pale green gas.\n- Bromine is a red-brown liquid.\n- Iodine is a dark grey solid and gives purple vapour on heating.", "Topic 13 halogen properties"),
      q("chem-T13-EX-04", "Explain", 5, "Astatine is predicted to be less reactive than iodine.\nExplain using periodic trends.", [
        "Further down Group VII.",
        "Greater shielding and larger radius.",
        "Lower ability to gain electron.",
      ], "- Astatine is below iodine in Group VII.\n- Its valence shell is further from the nucleus with more inner-shell shielding.\n- It attracts an extra electron less strongly, so it is less reactive.", "Topic 13 prediction"),
      q("chem-T13-EX-05", "State", 4, "State why noble gases are generally unreactive.", [
        "Full outer electron shell.",
        "No strong tendency to gain/lose/share electrons.",
      ], "- Noble gases already have stable full outer shells.\n- They have little tendency to gain, lose, or share electrons, so they are largely inert.", "Topic 13 noble gases"),
    ],
    "14": [
      q("chem-T14-EX-01", "Explain", 6, "Explain why extraction method depends on position of a metal in the reactivity series.", [
        "Less reactive than carbon can be reduced by carbon/CO.",
        "More reactive than carbon require electrolysis.",
        "Relates to stability of metal compounds and reducing ability.",
      ], "- Metals below carbon in reactivity can often be extracted from oxides by reduction with carbon or CO.\n- Metals above carbon are too stable/reactive for this and are extracted by electrolysis.\n- Therefore extraction method follows reactivity position.", "Topic 14 extraction and reactivity"),
      q("chem-T14-EX-02", "Describe", 5, "Describe observations when zinc is added to copper(II) sulfate solution and explain them.", [
        "Blue solution fades.",
        "Reddish-brown copper forms.",
        "Zinc displaces copper due to higher reactivity.",
      ], "- Blue CuSO4 solution becomes paler as Cu^2+ is removed.\n- Reddish-brown copper metal deposits.\n- Zinc is more reactive and displaces copper from solution.", "Topic 14 displacement"),
      q("chem-T14-EX-03", "Calculate", 4, "Magnesium reacts with dilute hydrochloric acid to produce hydrogen.\nWrite balanced equation and state mole ratio Mg:H2.", [
        "Balanced equation: Mg + 2HCl -> MgCl2 + H2.",
        "Ratio Mg:H2 = 1:1.",
      ], "$Mg + 2HCl \\rightarrow MgCl_2 + H_2$\nSo Mg:H2 mole ratio is 1:1.", "Topic 14 metal-acid reactions"),
      q("chem-T14-EX-04", "Explain", 5, "Why is sacrificial protection with zinc effective for steel even if coating is scratched?", [
        "Zinc more reactive than iron.",
        "Zinc oxidises preferentially (sacrificial anode).",
        "Iron remains protected until zinc significantly consumed.",
      ], "- Zinc is higher than iron in reactivity, so zinc oxidises first.\n- Even if scratched, zinc around the area still corrodes preferentially.\n- This sacrificial action protects the iron from rusting.", "Topic 14 corrosion control"),
      q("chem-T14-EX-05", "State", 4, "State order of reactivity (most to least) for Mg, Fe, Cu, Ag and justify one position.", [
        "Expected order: Mg > Fe > Cu > Ag.",
        "Any valid displacement/electrode evidence for one pair.",
      ], "A typical order is $Mg > Fe > Cu > Ag$.\nFor example, Fe displaces Cu^2+ from CuSO4, showing Fe is more reactive than Cu.", "Topic 14 reactivity order"),
    ],
    "15": [
      q("chem-T15-EX-01", "Explain", 6, "Draw and explain an energy profile for an exothermic reaction, including activation energy and overall enthalpy change.", [
        "Products lower energy than reactants for exothermic process.",
        "Activation energy barrier shown from reactants to peak.",
        "Delta H negative.",
      ], "- In an exothermic profile, products are at lower energy than reactants.\n- The peak above reactants shows activation energy.\n- The enthalpy change, $\\Delta H$, is negative because energy is released overall.", "Topic 15 energy profiles"),
      q("chem-T15-EX-03", "Explain", 5, "Explain why bond breaking is endothermic and bond making is exothermic.", [
        "Energy required to overcome attractions when breaking bonds.",
        "Energy released when new stable bonds form.",
        "Overall Delta H depends on balance of both.",
      ], "- Breaking bonds requires energy input to separate bonded atoms, so it is endothermic.\n- Forming bonds releases energy as atoms move to lower-energy stable states, so it is exothermic.\n- Net reaction enthalpy depends on which total is larger.", "Topic 15 bond energies"),
      q("chem-T15-EX-04", "State", 4, "State two uses of exothermic and one use of endothermic reactions in daily life.", [
        "Exothermic uses: hand warmers/fuel combustion/self-heating cans.",
        "Endothermic use: instant cold packs/thermal decomposition steps.",
      ], "- Exothermic reactions are used in hand warmers and fuel combustion for heating.\n- Endothermic reactions are used in instant cold packs for cooling.", "Topic 15 applications"),
      
    ],
    "16": [
      q("chem-T16-EX-01", "Explain", 6, "Use collision theory to explain effect of increasing concentration on reaction rate.", [
        "More particles per unit volume.",
        "Collision frequency increases.",
        "More successful collisions per second (if Ea condition met).",
      ], "- Higher concentration means more reactant particles in the same volume.\n- Particles collide more often.\n- Therefore successful collisions per second increase and rate rises.", "Topic 16 collision theory"),
      q("chem-T16-EX-02", "Explain", 6, "Explain how a catalyst increases rate without changing equilibrium position.", [
        "Provides alternative pathway with lower activation energy.",
        "Increases rate of forward and reverse reactions.",
        "Does not change Delta H or equilibrium constant/position.",
      ], "- A catalyst provides an alternative pathway with lower activation energy.\n- Both forward and reverse reactions are accelerated.\n- The equilibrium position itself is unchanged; equilibrium is just reached faster.", "Topic 16 catalysts"),
      q("chem-T16-EX-03", "Describe", 5, "Describe one method to measure rate of reaction between calcium carbonate and hydrochloric acid.", [
        "Measure gas volume vs time using gas syringe OR mass loss vs time.",
        "Keep key control variables constant.",
        "Determine rate from gradient/initial slope.",
      ], "- Use a gas syringe to measure CO2 volume at regular time intervals (or record mass loss from escaping gas).\n- Keep acid concentration, solid mass/surface area, and temperature controlled.\n- Rate can be estimated from the initial gradient of volume-time or mass-time graph.", "Topic 16 practical rate methods"),
      q("chem-T16-EX-04", "Calculate", 4, "A graph shows concentration of reactant decreases from 1.20 to 0.80 mol dm^-3 in 40 s.\nCalculate average rate of disappearance.", [
        "Change in concentration = 0.40 mol dm^-3.",
        "Rate = 0.40/40 = 0.010 mol dm^-3 s^-1.",
      ], "Average rate $= \\frac{1.20 - 0.80}{40} = 0.010\\ \\text{mol dm}^{-3}\\text{ s}^{-1}$.", "Topic 16 rates from data"),
      q("chem-T16-EX-05", "State", 4, "State why powdered solids often react faster than large lumps.", [
        "Powder has larger surface area to volume ratio.",
        "More collision sites exposed simultaneously.",
      ], "- Powdered solids expose much larger surface area than lumps.\n- More reactant particles can collide at the same time, increasing reaction rate.", "Topic 16 surface area"),
    ],
    "17": [
      q("chem-T17-EX-01", "Describe", 6, "Describe chemical tests to distinguish alkane, alkene, alcohol and carboxylic acid samples.", [
        "Alkene decolourises bromine water quickly.",
        "Carboxylic acid reacts with carbonate to release CO2.",
        "Alcohol shows characteristic oxidation behavior (with acidified dichromate).",
        "Alkane generally unreactive to bromine water without UV.",
      ], "- Add bromine water: alkene decolourises rapidly; alkane usually does not in dark conditions.\n- Add carbonate: carboxylic acid gives effervescence (CO2).\n- Warm alcohol with acidified dichromate: orange to green indicates oxidation (for suitable alcohols).", "Topic 17 functional group tests"),
      q("chem-T17-EX-02", "Explain", 5, "Explain why alkenes are generally more reactive than alkanes.", [
        "Alkenes have C=C double bond with electron-rich pi bond.",
        "Pi bond breaks more readily in addition reactions.",
        "Alkanes mainly undergo substitution under harsher conditions.",
      ], "- Alkenes contain a C=C bond with a pi component that is easier to break.\n- This makes alkenes reactive toward addition reactions.\n- Alkanes have only single bonds and are less reactive under similar conditions.", "Topic 17 hydrocarbons"),
      q("chem-T17-EX-03", "Calculate", 4, "Ethanol is oxidised to ethanoic acid.\nWrite a balanced equation using [O].", [
        "C2H5OH + 2[O] -> CH3COOH + H2O.",
      ], "$C_2H_5OH + 2[O] \\rightarrow CH_3COOH + H_2O$", "Topic 17 oxidation of alcohols"),
      q("chem-T17-EX-04", "Explain", 5, "Explain ester formation from ethanol and ethanoic acid, including role of concentrated sulfuric acid.", [
        "Condensation reaction produces ester + water.",
        "Concentrated H2SO4 acts as catalyst and dehydrating agent.",
      ], "- Ethanol reacts with ethanoic acid to form an ester and water (esterification).\n- Concentrated sulfuric acid catalyses the reaction and helps remove water, driving ester formation.", "Topic 17 esters"),
      q("chem-T17-EX-05", "State", 4, "State one use each of alkanes, alkenes and alcohols in society.", [
        "Alkanes as fuels.",
        "Alkenes as feedstock for polymers.",
        "Alcohols as fuels/solvents/disinfectants.",
      ], "- Alkanes are used as fuels (for example LPG, petrol fractions).\n- Alkenes are important feedstocks for making polymers.\n- Alcohols are used as solvents, fuels, and antiseptics.", "Topic 17 applications"),
    ],
    "18": [
      q("chem-T18-EX-01", "Explain", 6, "Explain the difference between addition polymerisation and condensation polymerisation.", [
        "Addition: unsaturated monomers join with no small molecule by-product.",
        "Condensation: monomers with two functional groups join and eliminate small molecules (for example water/HCl).",
        "Links to polymer backbone formation.",
      ], "- In addition polymerisation, monomers (often alkenes) add together with no small molecule lost.\n- In condensation polymerisation, bifunctional monomers react and release small molecules such as water.\n- Both form long-chain polymers, but mechanisms and by-products differ.", "Topic 18 polymer chemistry"),
      q("chem-T18-EX-02", "Describe", 5, "Describe why thermosoftening and thermosetting polymers behave differently on heating.", [
        "Thermosoftening polymers have weaker intermolecular forces between chains.",
        "Thermosetting polymers have extensive cross-links.",
        "Cross-links prevent softening/remoulding.",
      ], "- Thermosoftening plastics have chains held mainly by weaker forces, so heating allows chains to slide and soften.\n- Thermosetting plastics have strong cross-links between chains, so they do not melt easily and cannot be remoulded.", "Topic 18 polymer structure"),
      q("chem-T18-EX-03", "Explain", 5, "Explain one environmental problem from persistent plastic waste and one chemistry-based mitigation approach.", [
        "Problem: long degradation time, ecosystem/microplastic impact.",
        "Mitigation: reduce/reuse/recycle, design for biodegradability, or controlled incineration with energy recovery and emission control.",
      ], "- Many plastics persist for long periods, causing accumulation and potential ecosystem harm.\n- Mitigation can include improved recycling systems and designing polymers with more degradable structures where appropriate.", "Topic 18 sustainability"),
      q("chem-T18-EX-04", "State", 4, "State why sorting plastics by polymer type is important before recycling.", [
        "Different polymers have different melting/processing conditions.",
        "Mixed polymers reduce product quality and process control.",
      ], "- Different polymers soften at different temperatures and have different properties.\n- If mixed, recycled material quality drops and processing becomes unreliable.", "Topic 18 recycling"),
      q("chem-T18-EX-05", "Describe", 5, "Describe two desirable properties of polymers used for food packaging and link each to molecular structure.", [
        "Barrier properties (gas/moisture) linked to chain packing/polarity.",
        "Mechanical strength/flexibility linked to chain interactions and branching/cross-linking.",
      ], "- Food packaging polymers should have good barrier properties to reduce oxygen/moisture transfer.\n- They also need suitable strength/flexibility for handling.\n- These properties arise from chain packing, intermolecular forces, and degree of branching/cross-linking.", "Topic 18 applications"),
    ],
    "19": [
      q("chem-T19-EX-01", "Explain", 6, "Explain how sulfur dioxide and nitrogen oxides contribute to acid rain and give one impact.", [
        "SO2/NOx dissolve/react in atmosphere to form acids.",
        "Acids lower rainwater pH.",
        "Impacts: damage to lakes, soils, vegetation, buildings.",
      ], "- Sulfur dioxide and nitrogen oxides are oxidised and dissolved in atmospheric moisture to form acidic species.\n- This lowers rainwater pH (acid rain).\n- Acid rain can damage ecosystems and corrode limestone/metal structures.", "Topic 19 acid rain"),
      q("chem-T19-EX-02", "Describe", 5, "Describe how catalytic converters reduce harmful vehicle emissions.", [
        "Convert CO to CO2 by oxidation.",
        "Reduce NOx to N2.",
        "Catalyst surface speeds reactions at exhaust temperatures.",
      ], "- Catalytic converters use catalysts to oxidise carbon monoxide to carbon dioxide and reduce nitrogen oxides to nitrogen.\n- This lowers toxic pollutant output from vehicle exhaust.", "Topic 19 pollution control"),
      q("chem-T19-EX-03", "Explain", 5, "Explain why incomplete combustion of hydrocarbons is dangerous in indoor environments.", [
        "Produces carbon monoxide and soot.",
        "CO binds strongly to haemoglobin reducing oxygen transport.",
        "Health hazard/asphyxiation risk.",
      ], "- Incomplete combustion can produce carbon monoxide and soot.\n- Carbon monoxide binds strongly to haemoglobin, reducing oxygen delivery in the body.\n- This can cause severe poisoning and is especially dangerous in poorly ventilated spaces.", "Topic 19 combustion and health"),
      q("chem-T19-EX-04", "State", 4, "State two major anthropogenic sources of carbon dioxide and one strategy to reduce net emissions.", [
        "Sources: fossil fuel combustion, cement production, deforestation/land-use change.",
        "Strategy: renewable energy, efficiency, reforestation, carbon capture.",
      ], "- Major human sources include burning fossil fuels and cement manufacture.\n- One reduction strategy is replacing fossil energy with low-carbon renewable sources.", "Topic 19 greenhouse gases"),
      q("chem-T19-EX-05", "Explain", 5, "Ozone in stratosphere is beneficial, but ground-level ozone is harmful.\nExplain this difference.", [
        "Stratospheric ozone absorbs harmful UV radiation.",
        "Tropospheric ozone is pollutant formed by photochemical reactions and irritates respiratory system.",
      ], "- Stratospheric ozone protects life by absorbing ultraviolet radiation.\n- At ground level, ozone is a pollutant that can irritate lungs and damage plants, so its effects are harmful.", "Topic 19 atmospheric chemistry"),
    ],
  });
})();
