(function () {
    window.__registerTopic({
      id: "1",
      theme: "Section I: Measurement",
      title: "Physical Quantities, Units and Measurement",
      cheatBlocks: [
        {
          title: "SI base + derived",
          points: [
            "**Base quantities**: length (m), mass (kg), time (s), electric current (A), temperature (K).",
            "**Derived**: speed m/s, acceleration m/s², force N = kg·m/s², energy J = N·m, power W = J/s.",
            "**Prefixes**: m (10⁻³), μ (10⁻⁶), n (10⁻⁹), k (10³), M (10⁶).",
            "Convert by factors of 10; keep 3 s.f. unless asked."
          ],
        },
        {
          title: "Measurement skills",
          points: [
            "**Repeat** readings; take mean; identify anomalies.",
            "**Random error**: scatter; reduce with repeats. **Systematic error**: bias (zero error) — correct by calibration.",
            "Quote **uncertainty**: e.g. metre rule ±1 mm; stopwatch reaction time dominates short intervals.",
            "Use appropriate instrument: vernier calipers (0.01 cm) for diameters; micrometer (0.01 mm) for thin wires."
          ],
        },
        {
          title: "Scalars vs vectors",
          points: [
            "**Scalar**: magnitude only (mass, time, temperature, speed, energy).",
            "**Vector**: magnitude + direction (displacement, velocity, acceleration, force, momentum).",
            "Vector addition: head-to-tail; subtraction = add the negative.",
            "Resolve components: \(F_x = F\\cos\\theta\\), \(F_y = F\\sin\\theta\\)."
          ],
        },
        {
          title: "Density + gradients (preview)",
          points: [
            "Density \(\\rho = m/V\\). For a block, \(V = lwh\\); for cylinder \(V=\\pi r^2 h\\).",
            "Graph skills: gradient = Δy/Δx; area under v–t = displacement; gradient of v–t = acceleration."
          ],
        },
      ],
      flashcards: [
        { front: "SI unit of force?", back: "newton (N) = kg·m/s²" },
        { front: "Difference: speed vs velocity", back: "Speed scalar; velocity vector (direction)." },
        { front: "Convert 72 km/h to m/s", back: "72×1000/3600 = 20 m/s" },
        { front: "What is a systematic error?", back: "A consistent bias (e.g. zero error) affecting all readings similarly." },
        { front: "Micrometer resolution", back: "Typically 0.01 mm (check instrument)." },
        { front: "Uncertainty of 1 mm rule reading", back: "±0.5 mm per end; lengths often ±1 mm when subtracting two readings." },
        { front: "Scalar examples", back: "mass, time, speed, energy, temperature" },
        { front: "Vector examples", back: "force, velocity, acceleration, displacement" },
        { front: "Derived unit of power", back: "W = J/s" },
        { front: "Density formula", back: "ρ = m/V" },
        { front: "Prefix μ", back: "micro = 10⁻⁶" },
        { front: "Why repeat measurements?", back: "Reduce random error; increase reliability." },
      ],
      quiz: [
        { question: "Which is a vector quantity?", options: ["speed", "mass", "force", "temperature"], correctIndex: 2, explanation: "Force has magnitude and direction." },
        { question: "Unit of energy is…", options: ["N", "J", "W", "Pa"], correctIndex: 1, explanation: "Joule (J)." },
        { question: "1 kW equals…", options: ["100 W", "1000 W", "10,000 W", "0.001 W"], correctIndex: 1, explanation: "k = 10³." },
        { question: "Density is defined as…", options: ["V/m", "m/V", "m×V", "m+V"], correctIndex: 1, explanation: "ρ = m/V." },
        { question: "Convert 3.6 km/h to m/s", options: ["0.1", "1", "10", "36"], correctIndex: 1, explanation: "3.6 km/h = 1 m/s." },
        { question: "A zero error is mainly a…", options: ["random error", "systematic error", "parallax error", "rounding error"], correctIndex: 1, explanation: "Bias present in each reading." },
        { question: "Which is a base unit?", options: ["newton", "joule", "kilogram", "pascal"], correctIndex: 2, explanation: "kg is base; others derived." },
        { question: "The gradient of a distance–time graph gives…", options: ["acceleration", "speed", "force", "energy"], correctIndex: 1, explanation: "Δdistance/Δtime = speed." },
        { question: "Uncertainty is reduced mainly by…", options: ["using a larger scale", "repeats + averaging", "using fewer readings", "rounding early"], correctIndex: 1, explanation: "Repeats reduce random error." },
        { question: "Prefix 'm' (milli) is…", options: ["10⁻⁶", "10⁻³", "10³", "10⁶"], correctIndex: 1, explanation: "milli = 10⁻³." },
        { question: "A scalar quantity has…", options: ["direction only", "magnitude only", "both magnitude and direction", "neither"], correctIndex: 1, explanation: "Scalar = magnitude only." },
        { question: "Which is NOT a good way to reduce random error?", options: ["repeat", "average", "calibrate for zero error", "use best-fit line"], correctIndex: 2, explanation: "Calibration targets systematic error." },
        { question: "SI unit of time", options: ["minute", "hour", "second", "day"], correctIndex: 2, explanation: "second (s)." },
        { question: "Force unit in base units", options: ["kg·m/s", "kg·m/s²", "kg/s²", "m/s²"], correctIndex: 1, explanation: "N = kg·m/s²." },
        { question: "If a micrometer reads 0.06 mm when closed, its zero error is…", options: ["+0.06 mm", "−0.06 mm", "0.06 m", "cannot tell"], correctIndex: 0, explanation: "Positive reading at zero implies +0.06 mm." },
        { question: "Correcting +0.06 mm zero error means…", options: ["add 0.06 to readings", "subtract 0.06 from readings", "multiply by 0.06", "ignore"], correctIndex: 1, explanation: "Measured reading is too big by 0.06; subtract." },
        { question: "A length is found by subtracting two metre-rule readings (each ±0.5 mm). A reasonable combined uncertainty is about…", options: ["±0.5 mm", "±1 mm", "±2 mm", "±0.25 mm"], correctIndex: 1, explanation: "Worst-case errors add for a difference: ±(0.5+0.5) mm." },
        { question: "Express 0.00045 A using a prefix.", options: ["0.45 mA", "450 μA", "45 nA", "4.5 mA"], correctIndex: 1, explanation: "0.00045 A = 4.5×10⁻⁴ A = 450×10⁻⁶ A = 450 μA." },
        { question: "A horizontal force of 12 N acts at 30° to the x-axis. Its x-component is…", options: ["6 N", "6√3 N", "12 N", "10.4 N"], correctIndex: 1, explanation: "Fx = F cos30° = 12×(√3/2) = 6√3 N." },
        { question: "Parallax error is reduced mainly by…", options: ["repeating the measurement", "viewing the scale perpendicular to your line of sight", "using a larger instrument", "rounding to fewer s.f."], correctIndex: 1, explanation: "Read at right angles to the scale to align pointer and scale." },
        { question: "The SI derived unit pascal (Pa) expressed in base units is…", options: ["kg·m⁻¹·s⁻²", "kg·m·s⁻²", "kg·m²·s⁻²", "kg·m⁻²·s²"], correctIndex: 0, explanation: "Pa = N/m² = (kg·m/s²)/m² = kg·m⁻¹·s⁻²." },
        { question: "A student measures the same quantity many times and the mean is unchanged but scatter decreases. This mainly improves…", options: ["systematic error", "precision / random scatter", "instrument resolution", "SI base definitions"], correctIndex: 1, explanation: "Repeats reduce random scatter; they don’t remove a fixed bias." },
        { question: "On a velocity–time graph, the gradient represents…", options: ["displacement", "acceleration", "distance", "momentum"], correctIndex: 1, explanation: "Gradient of v–t is Δv/Δt = acceleration." },
        { question: "Convert 90 km/h to m/s.", options: ["25 m/s", "50 m/s", "36 m/s", "15 m/s"], correctIndex: 0, explanation: "90×1000/3600 = 25 m/s." },
        { question: "Which pair are both vectors?", options: ["speed and distance", "mass and weight", "displacement and acceleration", "energy and power"], correctIndex: 2, explanation: "Displacement and acceleration have magnitude and direction." },
        { question: "Micrometer reads 0.01 mm divisions. Two readings used in a difference can give length uncertainty about…", options: ["±0.01 mm", "±0.02 mm", "±0.005 mm", "±1 mm"], correctIndex: 1, explanation: "Each end contributes ~one division; combined uncertainty is often ~±2× least count for a difference." },
      ],
      trueFalse: [
        { statement: "Velocity is a scalar.", correct: false, explain: "Velocity includes direction." },
        { statement: "1 m/s² means velocity increases by 1 m/s every second.", correct: true, explain: "Definition of acceleration." },
        { statement: "Systematic error can be reduced by repeats.", correct: false, explain: "Repeats reduce random error; systematic needs calibration/correction." },
        { statement: "The unit of pressure is N/m².", correct: true, explain: "Pascal definition." },
        { statement: "Density has SI unit kg/m³.", correct: true, explain: "m in kg and V in m³." },
        { statement: "A best-fit line helps reduce random scatter impact.", correct: true, explain: "Averages trend across points." },
        { statement: "μ means 10⁻³.", correct: false, explain: "μ is 10⁻⁶; milli is 10⁻³." },
        { statement: "For lengths measured between two marks, uncertainty may be ±1 mm.", correct: true, explain: "Two end readings contribute." },
        { statement: "Weight is measured in kilograms.", correct: false, explain: "Weight is a force in newtons." },
        { statement: "A vector can be represented by an arrow.", correct: true, explain: "Arrow shows magnitude and direction." },
      ],
    });
})();