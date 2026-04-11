(function () {
  window.__registerTopic({
    id: "1",
    theme: "Theme 1: Matter – Structures & Properties",
    title: "Experimental Design",
    cheatBlocks: [
        {
            "title": "Variables",
            "points": [
                "**Independent** — what you change (one factor).",
                "**Dependent** — what you measure.",
                "**Control variables** — kept constant for a fair test.",
                "Only **one** independent variable should change per experiment."
            ]
        },
        {
            "title": "Validity & reliability",
            "points": [
                "**Reliability** — repeat and get similar results (reduce random error).",
                "**Accuracy** — close to true value; **precision** — repeatable readings.",
                "**Systematic error** — same direction every time (e.g. zero error).",
                "**Random error** — scatter; reduce by repeats and averaging."
            ]
        },
        {
            "title": "Graphs",
            "points": [
                "Plot **dependent** on **y-axis**, **independent** on **x-axis**.",
                "Line of best fit for proportional relationships; identify anomalies.",
                "Units on axes; sensible scale."
            ]
        },
        {
            "title": "Risk & method",
            "points": [
                "List hazards (corrosive, flammable, hot).",
                "Control measures: goggles, fume cupboard, low concentration.",
                "Step-by-step method so others can repeat."
            ]
        },
        {
            "title": "Physical quantities & measurement",
            "points": [
                "**Consistent units** — SI base units; convert before calculations.",
                "**Significant figures** — report to the precision of the limiting measurement.",
                "**Parallax** — view scale perpendicularly to avoid systematic reading error.",
                "**Volumetric glassware** — read burette/pipette meniscus at eye level."
            ]
        }
    ,
    {
        "title": "Measurement Apparatus",
        "points": [
            "**Burette** — reads to ±0.05 cm³; use for delivering variable volumes in titrations.",
            "**Volumetric pipette** — delivers one exact fixed volume (e.g. 25.00 cm³).",
            "**Thermometer** — ±0.5°C; immerse bulb fully; read at eye level.",
            "$R_f = \\dfrac{\\text{distance substance moved}}{\\text{distance solvent front moved}}$ (always ≤ 1).",
            "SI base units: mass → **kg** (g in chemistry); T → **K** (= °C + 273); time → **s**."
        ]
    }],
    infographics: [ { image: "data/subjects/chemistry/images/matter-01-experimental-design.jpg", caption: "Fair test: variables and apparatus" } ],
    flashcards: [
        {
            "front": "Independent variable?",
            "back": "The one you deliberately change."
        },
        {
            "front": "Why control variables?",
            "back": "So only the tested factor affects the result."
        },
        {
            "front": "Random vs systematic error?",
            "back": "Random: scatter. Systematic: consistent bias."
        },
        {
            "front": "Hypothesis vs prediction?",
            "back": "Hypothesis is testable; prediction is expected outcome."
        },
        {
            "front": "Why pilot experiment?",
            "back": "Check method, range, safety before full run."
        },
        {
            "front": "Anomalous result?",
            "back": "Outlier — often excluded if clear mistake."
        },
        {
            "front": "Repeat vs replicate?",
            "back": "Repeat: same person; replicate: different runs/people."
        },
        {
            "front": "Blind testing?",
            "back": "Reduces bias when subject doesn't know which is which."
        },
        {
            "front": "Resolution of instrument?",
            "back": "Smallest change it can detect."
        },
        {
            "front": "Uncertainty?",
            "back": "Half smallest division or stated instrument error."
        },
        {
            "front": "Correlation vs causation?",
            "back": "Correlation doesn't prove one caused the other."
        },
        {
            "front": "Control group?",
            "back": "Baseline without the treatment for comparison."
        },
        {
            "front": "Sample size?",
            "back": "Larger sample usually more representative."
        },
        {
            "front": "Fair test checklist?",
            "back": "One IV, measure DV, list and fix controls."
        }
    ,
    { "front": "$R_f$ formula?", "back": "$R_f = \\dfrac{d_{\\text{substance}}}{d_{\\text{solvent front}}}$. Always between 0 and 1." },
    { "front": "Precision vs accuracy?", "back": "**Precision**: readings agree with each other (reproducible). **Accuracy**: readings are close to the true value." },
    { "front": "How to reduce random error?", "back": "Take **repeat readings** and calculate the **mean**. Discard outliers." },
    { "front": "Which glassware for exact 25.00 cm³?", "back": "**Volumetric pipette** (fixed volume) or **burette** (variable, to 0.05 cm³)." }],
    quiz: [
    {id:"chem-T1-001",question:"Fair test requires changing:",options:["Only one independent variable","All variables","Only the dependent","Nothing"],correctIndex:0,explanation:"One factor at a time."},
    {id:"chem-T1-002",question:"Dependent variable is:",options:["What you measure","What you keep fixed","The hypothesis","Apparatus list"],correctIndex:0,explanation:"Response to your change."},
    {id:"chem-T1-003",question:"Reliability improves when you:",options:["Change two variables","Repeat measurements","Use one reading only","Skip units"],correctIndex:1,explanation:"Repeats show consistency."},
    {id:"chem-T1-004",question:"Systematic error:",options:["Averages to zero","Shifts all results similarly","Only in gases","Impossible"],correctIndex:1,explanation:"Same bias each time."},
    {id:"chem-T1-005",question:"Random error:",options:["Always +5%","Causes scatter","Only human","Removes need for graph"],correctIndex:1,explanation:"Unpredictable variation."},
    {id:"chem-T1-006",question:"On a graph, independent variable usually goes on:",options:["y-axis","x-axis","Neither","Title only"],correctIndex:1,explanation:"Convention: x = what you change."},
    {id:"chem-T1-007",question:"An anomaly should be:",options:["Always kept","Investigated; may exclude if error proven","Doubled","Ignored silently"],correctIndex:1,explanation:"Document decision."},
    {id:"chem-T1-008",question:"Precision means:",options:["Close to literature value","Readings cluster tightly","Fast experiment","Cheap"],correctIndex:1,explanation:"Repeatability."},
    {id:"chem-T1-009",question:"Accuracy means:",options:["Many repeats","Close to true value","Large sample","Short report"],correctIndex:1,explanation:"Correctness."},
    {id:"chem-T1-010",question:"Control experiment helps:",options:["Waste time","Isolate effect of the variable tested","Remove all errors","Avoid graph"],correctIndex:1,explanation:"Comparison baseline."},
    {id:"chem-T1-011",question:"Zero error on a meter:",options:["Random","Systematic","Never happens","Only digital"],correctIndex:1,explanation:"Consistent offset."},
    {id:"chem-T1-012",question:"Sample should be:",options:["Always size 1","Representative of population","Only extremes","Random words"],correctIndex:1,explanation:"Generalisable."},
    {id:"chem-T1-013",question:"Risk assessment includes:",options:["Only results","Hazard + control measure","Only cost","Exam date"],correctIndex:1,explanation:"Safety first."},
    {id:"chem-T1-014",question:"Valid conclusion requires:",options:["Fair test + relevant data","Many colours on graph","Short method","No repeats"],correctIndex:0,explanation:"Logic + evidence."},
    {id:"chem-T1-015",question:"Operational definition:",options:["Defines how you measure a variable","Defines exam board","Unit only","Hypothesis"],correctIndex:0,explanation:"Measurable definition."},
    {id:"chem-T1-016",question:"Blind trial reduces:",options:["Cost only","Observer bias","Time","Apparatus need"],correctIndex:1,explanation:"Expectation effects."},
    {id:"chem-T1-017",question:"Line of best fit:",options:["Joins every dot","Shows trend; balances scatter","Horizontal only","Optional for marks"],correctIndex:1,explanation:"Trend line."},
    {id:"chem-T1-018",question:"Interpolation vs extrapolation:",options:["Same","Interpolation within data; extrapolation beyond — riskier","Only extrapolation safe","Neither used"],correctIndex:1,explanation:"Outside range uncertain."},
    {id:"chem-T1-019",question:"Resolution 0.1 cm means:",options:["Error 10%","Smallest reading step 0.1 cm","Length 0.1 cm","Volume"],correctIndex:1,explanation:"Instrument precision."},
    {id:"chem-T1-020",question:"Peer review improves:",options:["Font size","Credibility of method","Speed only","Nothing"],correctIndex:1,explanation:"Others check design."},
    {id:"chem-T1-021",question:"Controlled variable example when testing temp on rate:",options:["Temperature","Concentration of acid","Time measured","Product colour"],correctIndex:1,explanation:"Keep concentration same."},
    {id:"chem-T1-022",question:"Pilot study:",options:["Final exam","Small trial to refine method","Only theory","Graph type"],correctIndex:1,explanation:"Practice run."},
    {id:"chem-T1-023",question:"Recording raw data means:",options:["Only averages","Original readings before manipulation","Final conclusion","Teacher marks"],correctIndex:1,explanation:"Primary data."},
    {id:"chem-T1-024",question:"Ethical sampling (humans):",options:["Force participation","Informed consent","Hide purpose always","No documentation"],correctIndex:1,explanation:"Consent matters."},
    {id:"chem-T1-025",question:"Uncertainty bar on graph shows:",options:["Artist choice","Range of doubt in measurement","Exam board","Colour code"],correctIndex:1,explanation:"Error representation."},
    {id:"chem-T1-026",question:"If gradient units are mol/dm³ ÷ s, you have:",options:["Rate of reaction","Density","Pressure","Voltage"],correctIndex:0,explanation:"Concentration change per time."},
    {id:"chem-T1-027",question:"Two investigators get different means from repeats of the same method. Most likely difference:",options:["Random error only in one lab","They changed the independent variable","Different systematic errors (e.g. calibration)","Random error cannot differ between labs"],correctIndex:2,explanation:"Consistent bias shifts the whole dataset; random scatter differs run-to-run."},
    {id:"chem-T1-028",question:"A result is precise but not accurate. This fits:",options:["Tight cluster far from true value","Wide scatter around true value","Tight cluster on true value","One reading only"],correctIndex:0,explanation:"Precision is repeatability; accuracy needs closeness to true value."},
    {id:"chem-T1-029",question:"Blinding in testing mainly addresses:",options:["Instrument resolution","Observer and subject bias","Random error from temperature","Systematic zero error"],correctIndex:1,explanation:"Expectations should not drive measurements or responses."},
    {id:"chem-T1-030",question:"Interpolation is usually safer than extrapolation because:",options:["Graph paper forbids extrapolation","You stay within the range where the relationship was observed","Interpolation always gives exact values","Extrapolation only works for gases"],correctIndex:1,explanation:"Outside the data range the model may fail."},
    {id:"chem-T1-031",question:"Percentage uncertainty on a calculated quantity often combines uncertainties by:",options:["Adding raw readings","Root-sum-square or linear rules depending on operation","Always halving them","Ignoring the smallest uncertainty"],correctIndex:1,explanation:"How uncertainties combine depends on how quantities are combined."},
    {id:"chem-T1-032",question:"A control experiment differs from a control variable because it:",options:["Is always a placebo","Provides a baseline without the factor being tested","Must use a different instrument","Removes all random error"],correctIndex:1,explanation:"A control run isolates the effect; control variables are kept constant."},
    {id:"chem-T1-033",question:"Validity of a conclusion is threatened most when:",options:["Random error is small","The method answers a different question than claimed","Sample size is large","Results are reproducible"],correctIndex:1,explanation:"Validity is whether the evidence actually supports the claim."},
    {id:"chem-T1-034",question:"Calibration of a balance with standard masses mainly reduces:",options:["Random error in a single reading","Systematic error from incorrect scale","The need to repeat","Human reaction time"],correctIndex:1,explanation:"Calibration corrects consistent offsets."},
    {id:"chem-T1-035",question:"An operational definition is important so that:",options:["The experiment uses expensive kit","The dependent variable is measured the same way each time","The hypothesis becomes unfalsifiable","The risk assessment is shorter"],correctIndex:1,explanation:"It makes the measurement explicit and comparable."},
    {id:"chem-T1-036",question:"Using a line of best fit rather than joining every point mainly helps:",options:["Remove the need for units","Show overall trend and reduce noise from scatter","Guarantee a straight line","Increase systematic error"],correctIndex:1,explanation:"Trend lines summarise data; anomalies stand out."},
    {id:"chem-T1-201",question:"A student reads a burette meniscus from above while the liquid is still draining. This mainly introduces:",options:["A random error that averages to zero","A systematic parallax / timing error","No error if the titre is repeated","Only random error from temperature"],correctIndex:1,explanation:"Viewing angle and premature reading bias results consistently; repeats may not fix systematic bias."},
    {id:"chem-T1-202",question:"Multiplying 2.3 cm × 4.56 cm gives an area that should be reported as:",options:["10.488 cm²","10.5 cm²","10 cm²","10.49 cm²"],correctIndex:1,explanation:"The product cannot be more precise than the least precise factor (2.3 has 2 s.f.)."},
    {id:"chem-T1-203",question:"Random allocation of participants/samples to experimental groups mainly reduces:",options:["Systematic zero error","Selection bias from non-random assignment","The need for a control group","Instrument resolution"],correctIndex:1,explanation:"Randomisation spreads confounding factors evenly."},
    {id:"chem-T1-204",question:"A double-blind experiment means:",options:["Two observers time each trial","Neither subject nor key assessor knows who received which treatment","Two independent variables are tested","Two repeats are done"],correctIndex:1,explanation:"Reduces expectation bias on both sides."},
    {id:"chem-T1-205",question:"Internal validity of a study refers to:",options:["Whether results apply worldwide","Whether the measured effect is genuinely caused by the intended factor","Whether the sample size is large","Whether the graph is printed in colour"],correctIndex:1,explanation:"Internal validity = causal claim is supported within the setup."},
    {id:"chem-T1-206",question:"External validity refers to:",options:["How far conclusions generalise beyond the specific conditions tested","Whether the thermometer is calibrated","Whether random error is small","Whether the hypothesis is long"],correctIndex:0,explanation:"Generalisable to other contexts."},
    {id:"chem-T1-207",question:"When plotting a quantity that spans 10^4–10^8 on a wide range, a log scale is often used because:",options:["It removes all systematic error","It compresses wide ranges so trends are easier to see","It makes all relationships linear","It is required by SI"],correctIndex:1,explanation:"Log scales help visualise multiplicative change across orders of magnitude."},
    {id:"chem-T1-208",question:"A systematic error that is proportional to the measured value (e.g. a wrongly calibrated 2% high scale) will:",options:["Affect only one reading","Shift all readings by a consistent percentage or offset pattern","Disappear if you repeat once","Average out over many repeats"],correctIndex:1,explanation:"Repeats stay biased; calibration is needed."},
    {id:"chem-T1-209",question:"The best reason to plot error bars on a graph is to:",options:["Make the graph colourful","Show uncertainty in each measured point","Force the line to be straight","Replace a table"],correctIndex:1,explanation:"Error bars communicate uncertainty visually."},
    {id:"chem-T1-301",question:"Which conversion is correct?",options:["1 m = 1000 cm","1 kg = 100 g","1 minute = 60 s","1 cm³ = 1000 dm³"],correctIndex:2,explanation:"1 minute equals 60 seconds."},
    {id:"chem-T1-302",question:"Temperature in Kelvin is calculated from Celsius by:",options:["K = °C - 273","K = °C + 273","K = °C × 273","K = °C / 273"],correctIndex:1,explanation:"Add 273 to convert from degrees Celsius to Kelvin."},
    {id:"chem-T1-303",question:"A pure substance is identified by having:",options:["Any colour","A fixed melting or boiling point at fixed pressure","Only one element always","A very high density"],correctIndex:1,explanation:"Pure substances show sharp, fixed phase-change temperatures."},
    {id:"chem-T1-304",question:"Which pair is correctly matched in an experiment?",options:["Independent variable: what you measure","Dependent variable: what you change","Control variable: kept constant","Anomaly: always removed"],correctIndex:2,explanation:"Control variables are kept the same for a fair test."},
    {id:"chem-T1-305",question:"Why are repeat readings taken in practical work?",options:["To make the graph longer","To reduce random error and improve reliability","To change the independent variable","To remove all systematic error"],correctIndex:1,explanation:"Repeats allow averaging and improve reliability."},
    {id:"chem-T1-306",question:"To measure exactly 25.15 cm³ of acid solution, a student should use:",options:["A measuring cylinder (reads to 1 cm³)","A burette (reads to 0.05 cm³)","A beaker","A conical flask"],correctIndex:1,explanation:"Burette gives the precision needed for 0.05 cm³ readings; measuring cylinders are far less precise."},
    {id:"chem-T1-307",question:"The SI unit of temperature is:",options:["°C (degrees Celsius)","K (kelvin)","°F","Cal"],correctIndex:1,explanation:"SI unit = kelvin (K). Celsius is commonly used but K is the base SI unit. 0°C = 273 K."},
    {id:"chem-T1-308",question:"Chlorine gas is denser than air AND soluble in water. The correct collection method is:",options:["Upward delivery","Downward delivery","Water displacement (collection over water)","Syringe only"],correctIndex:1,explanation:"Downward delivery: denser gas sinks to fill the jar from the bottom. Cannot use water displacement (Cl₂ is very soluble in water)."},
    {id:"chem-T1-309",question:"In a chromatography experiment, substance V remains on the start line. This means:",options:["V moved the fastest","V is the most soluble in the solvent","V did not dissolve in (or was not carried by) the solvent used — Rf = 0","V is a pure substance"],correctIndex:2,explanation:"Rf = 0 means no movement; the substance is insoluble in or does not interact with the solvent."},
    {id:"chem-T1-310",question:"'Accuracy' in a measurement means:",options:["Getting the same reading every time","How close the measurement is to the true/accepted value","Taking many measurements","Having no random error ever"],correctIndex:1,explanation:"Accuracy = closeness to true value. Precision = reproducibility (same result each time, but may be consistently wrong)."}
    ],
    extendedQuestions: [
      {
        id: "chem-T1-E01",
        commandWord: "Explain",
        marks: 4,
        syllabusNote: "Theme: experimental design — variables & fair test (5070/5073 practical skills).",
        prompt: "A student investigates how **temperature** affects the **rate** of reaction between marble chips and dilute hydrochloric acid. They measure the **volume of carbon dioxide** collected in the first minute at different water-bath temperatures.\n\nExplain why the **concentration of the acid**, **mass or size of marble chips**, and **volume of acid** should be kept constant in this investigation.",
        rubric: [
          "States that these are **control variables** (or equivalent: kept the same for a fair test).",
          "Explains that if concentration / acid volume / marble amount or surface area changed, it would also affect the rate — so you could not tell if a change in gas volume was due to **temperature** alone.",
          "Links idea of **one independent variable** (temperature) while others are controlled — valid/fair comparison.",
          "Quality: clear cause–effect (confounding) reasoning in the context of reaction rate."
        ],
        modelAnswer: "- **Control variables** are factors kept constant so they do not affect the outcome.\n- **Concentration** and **volume of acid** change the amount of reactant per unit time; **mass or size of chips** changes surface area — all alter rate.\n- If they changed together with temperature, any difference in gas volume could be due to those factors **or** temperature, so the conclusion about temperature would **not be valid** (not a fair test)."
      },
      {
        id: "chem-T1-E02",
        commandWord: "Describe",
        marks: 4,
        syllabusNote: "Reliability, random error, repeats — practical measurement.",
        prompt: "The same student collects **carbon dioxide** by **downward delivery** into a **measuring cylinder** over water, recording the **gas volume** at 60 s for each temperature.\n\nDescribe **two** practical steps they could take to improve the **reliability** of the volume readings (reduce the effect of random error).",
        rubric: [
          "**Repeat** the whole experiment at each temperature (or repeat readings) and **average** — mentions random scatter reduced.",
          "Same **procedure** each time (same delay before starting timer, same way of sealing the flask, same eye level for reading meniscus).",
          "Reduce **leaks** / ensure apparatus airtight / wait for steady collection if relevant — practical consistency.",
          "Any valid second distinct strategy (e.g. larger gas sample if method allows, consistent **room pressure** awareness) if clearly linked to reliability."
        ],
        modelAnswer: "1) **Repeat** each temperature **at least two or three times** and calculate a **mean** volume — random errors tend to average out.\n2) Use a **consistent method** for starting the clock and reading the **bottom of the meniscus** at eye level on the measuring cylinder each time.\n3) (Optional third) Check joints are **airtight** so gas loss does not differ between runs."
      },
      {
        id: "chem-T1-E03",
        commandWord: "State",
        marks: 2,
        syllabusNote: "5096/5070 distinction between accuracy and precision.",
        prompt: "A thermometer gives readings that are **always 2 °C higher** than the true temperature, but the readings are **very close to each other** when repeated.\n\nState what this shows about **accuracy** and **precision** of this thermometer.",
        rubric: [
          "**Precision** — readings are close together / repeatable (low scatter).",
          "**Accuracy** — readings are **not** accurate / systematically high / **systematic error** (offset from true value)."
        ],
        modelAnswer: "- **Precision** is good (readings are reproducible and cluster tightly).\n- **Accuracy** is poor because there is a **systematic error** — a constant +2 °C bias from the true value."
      },
      {
        id: "chem-T1-E04",
        commandWord: "Explain",
        marks: 5,
        syllabusNote: "Validity of conclusions; fair test; controlled variables.",
        prompt: "Two groups compare **which metal** gives the **higher temperature rise** when the same mass of metal powder is added to **25 cm³** of **copper(II) sulfate solution** of the **same concentration**. Group A uses **polystyrene cups** as calorimeters; Group B uses **glass beakers** with no lid.\n\nExplain whether a simple comparison of **final temperature** between the two groups would be **valid** for deciding which metal is **more reactive** in this practical.",
        rubric: [
          "Recognises **different apparatus / insulation** → different **heat loss** to surroundings.",
          "Explains that **greater heat loss** lowers the measured temperature rise — not a fair comparison between groups.",
          "Suggests **controlling** calorimeter type, **lid**, **stirring**, **starting temperature**, **same volume and concentration** of solution for a valid comparison.",
          "Uses idea of **fair test** / **control variables** explicitly.",
          "Conclusion: comparison **as described** is **not valid** (or only valid if same setup) — clear judgement."
        ],
        modelAnswer: "It would **not be a valid** comparison because the **calorimeter** differs: polystyrene is a better **insulator** than an open glass beaker, so Group B loses **more heat** to the air. That **systematically reduces** the measured temperature rise even if the metal is equally reactive.\nFor a **fair test**, both groups should use the **same type** of insulated cup (or same beaker + lid), **same stirring**, and the **same initial conditions**. Then temperature rise reflects the reaction more reliably."
      }
    ],
    trueFalse: [
    {statement:"More repeats always remove systematic error.",correct:false,explain:"Repeats reduce random error; systematic needs calibration/fix."},
    {statement:"You can change two independent variables and still claim which caused the effect.",correct:false,explain:"Confounded variables — unclear cause."},
    {statement:"The dependent variable should be plotted on the y-axis in chemistry kinetics graphs.",correct:true,explain:"y = measured response."},
    {statement:"A very precise data set can still be inaccurate.",correct:true,explain:"Clustered but offset from true value."},
    {statement:"Control variables are irrelevant if you do the experiment quickly.",correct:false,explain:"They still affect validity."},
    {statement:"Extrapolating far beyond data range is usually reliable.",correct:false,explain:"Assumptions may break."},
    {statement:"Random errors often follow a normal distribution around the mean.",correct:true,explain:"Central limit idea."},
    {statement:"Recording only 'nice' results without outliers is good practice.",correct:false,explain:"Cherry-picking is dishonest."},
    {statement:"A hypothesis must be falsifiable.",correct:true,explain:"Science tests refutation."},
    {statement:"Same student repeating 10 times is weaker than independent replication.",correct:true,explain:"Same bias may persist."},
    {statement:"Digital readout always means higher accuracy than analogue.",correct:false,explain:"Resolution and calibration matter."},
    {statement:"Risk: concentrated acid — wear eye protection.",correct:true,explain:"Standard lab rule."}
    ],
    orderGame: ["State aim and hypothesis","List hazards and controls","List apparatus","Describe method step-by-step","Tabulate raw results","Process data and graph","Evaluate and conclude"],
    orderTitle: "Typical investigation write-up",
    });
})();
