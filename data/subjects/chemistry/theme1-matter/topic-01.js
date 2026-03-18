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
        }
    ],
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
    ],
    quiz: [
    {question:"Fair test requires changing:",options:["Only one independent variable","All variables","Only the dependent","Nothing"],correctIndex:0,explanation:"One factor at a time."},
    {question:"Dependent variable is:",options:["What you measure","What you keep fixed","The hypothesis","Apparatus list"],correctIndex:0,explanation:"Response to your change."},
    {question:"Reliability improves when you:",options:["Change two variables","Repeat measurements","Use one reading only","Skip units"],correctIndex:1,explanation:"Repeats show consistency."},
    {question:"Systematic error:",options:["Averages to zero","Shifts all results similarly","Only in gases","Impossible"],correctIndex:1,explanation:"Same bias each time."},
    {question:"Random error:",options:["Always +5%","Causes scatter","Only human","Removes need for graph"],correctIndex:1,explanation:"Unpredictable variation."},
    {question:"On a graph, independent variable usually goes on:",options:["y-axis","x-axis","Neither","Title only"],correctIndex:1,explanation:"Convention: x = what you change."},
    {question:"An anomaly should be:",options:["Always kept","Investigated; may exclude if error proven","Doubled","Ignored silently"],correctIndex:1,explanation:"Document decision."},
    {question:"Precision means:",options:["Close to literature value","Readings cluster tightly","Fast experiment","Cheap"],correctIndex:1,explanation:"Repeatability."},
    {question:"Accuracy means:",options:["Many repeats","Close to true value","Large sample","Short report"],correctIndex:1,explanation:"Correctness."},
    {question:"Control experiment helps:",options:["Waste time","Isolate effect of the variable tested","Remove all errors","Avoid graph"],correctIndex:1,explanation:"Comparison baseline."},
    {question:"Zero error on a meter:",options:["Random","Systematic","Never happens","Only digital"],correctIndex:1,explanation:"Consistent offset."},
    {question:"Sample should be:",options:["Always size 1","Representative of population","Only extremes","Random words"],correctIndex:1,explanation:"Generalisable."},
    {question:"Risk assessment includes:",options:["Only results","Hazard + control measure","Only cost","Exam date"],correctIndex:1,explanation:"Safety first."},
    {question:"Valid conclusion requires:",options:["Fair test + relevant data","Many colours on graph","Short method","No repeats"],correctIndex:0,explanation:"Logic + evidence."},
    {question:"Operational definition:",options:["Defines how you measure a variable","Defines exam board","Unit only","Hypothesis"],correctIndex:0,explanation:"Measurable definition."},
    {question:"Blind trial reduces:",options:["Cost only","Observer bias","Time","Apparatus need"],correctIndex:1,explanation:"Expectation effects."},
    {question:"Line of best fit:",options:["Joins every dot","Shows trend; balances scatter","Horizontal only","Optional for marks"],correctIndex:1,explanation:"Trend line."},
    {question:"Interpolation vs extrapolation:",options:["Same","Interpolation within data; extrapolation beyond — riskier","Only extrapolation safe","Neither used"],correctIndex:1,explanation:"Outside range uncertain."},
    {question:"Resolution 0.1 cm means:",options:["Error 10%","Smallest reading step 0.1 cm","Length 0.1 cm","Volume"],correctIndex:1,explanation:"Instrument precision."},
    {question:"Peer review improves:",options:["Font size","Credibility of method","Speed only","Nothing"],correctIndex:1,explanation:"Others check design."},
    {question:"Controlled variable example when testing temp on rate:",options:["Temperature","Concentration of acid","Time measured","Product colour"],correctIndex:1,explanation:"Keep concentration same."},
    {question:"Pilot study:",options:["Final exam","Small trial to refine method","Only theory","Graph type"],correctIndex:1,explanation:"Practice run."},
    {question:"Recording raw data means:",options:["Only averages","Original readings before manipulation","Final conclusion","Teacher marks"],correctIndex:1,explanation:"Primary data."},
    {question:"Ethical sampling (humans):",options:["Force participation","Informed consent","Hide purpose always","No documentation"],correctIndex:1,explanation:"Consent matters."},
    {question:"Uncertainty bar on graph shows:",options:["Artist choice","Range of doubt in measurement","Exam board","Colour code"],correctIndex:1,explanation:"Error representation."},
    {question:"If gradient units are mol/dm³ ÷ s, you have:",options:["Rate of reaction","Density","Pressure","Voltage"],correctIndex:0,explanation:"Concentration change per time."}
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
