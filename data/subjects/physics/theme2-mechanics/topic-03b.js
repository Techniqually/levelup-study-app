(function () {
    window.__registerTopic({
        id: "3B",
        theme: "Section II: Newtonian Mechanics",
        title: "Force and Pressure II (Pressure)",
        cheatBlocks: [
          {
            title: "Pressure definition",
            points: [
              "Pressure \(p = F/A\\) where F is normal force, A area of contact.",
              "Units: Pa = N/m².",
              "For same force: smaller area → larger pressure (sharp knife).",
              "For same area: larger force → larger pressure (heavier load)."
            ],
          },
          {
            title: "Pressure in fluids",
            points: [
              "Fluid pressure acts **in all directions**; acts normal to surfaces.",
              "Pressure increases with depth due to weight of fluid above.",
              "In communicating vessels, same horizontal level in same fluid has same pressure.",
              "Applications: dams thicker at bottom; submarines/hydraulic systems (conceptual)."
            ],
          },
          {
            title: "Atmospheric pressure",
            points: [
              "Atmospheric pressure due to weight of air; ~101 kPa at sea level.",
              "Barometer measures atmospheric pressure; suction cups work by lower pressure inside.",
              "Boiling point decreases at lower atmospheric pressure (high altitude)."
            ],
          },
          {
            title: "Hydraulics (Pascal’s principle – O-level context)",
            points: [
              "Pressure transmitted equally in enclosed fluid (ideal).",
              "If same pressure: \(F_1/A_1 = F_2/A_2\\).",
              "Mechanical advantage: large output force with larger area piston (but greater distance moved)."
            ],
          },
        ],
        flashcards: [
          { front: "Pressure formula", back: "p = F/A" },
          { front: "Unit of pressure", back: "Pa = N/m²" },
          { front: "Decrease pressure with same force", back: "increase contact area" },
          { front: "Pressure acts in fluids…", back: "in all directions, normal to surfaces" },
          { front: "Atmospheric pressure approx", back: "101 kPa (1.01×10⁵ Pa)" },
          { front: "Why dams thicker at bottom?", back: "Higher pressure at greater depth." },
          { front: "Pascal principle", back: "Pressure applied to enclosed fluid transmitted equally." },
          { front: "Hydraulic relation", back: "F1/A1 = F2/A2" },
          { front: "Suction cup works because…", back: "lower pressure inside, atmosphere pushes it on." },
          { front: "Sharp nail pierces easily because…", back: "small area → high pressure." },
          { front: "Boiling point at high altitude", back: "lower (lower atmospheric pressure)." },
          { front: "Pressure vs force", back: "Pressure = force per unit area." },
        ],
        quiz: [
          { question: "Pressure is defined as…", options: ["F×A", "F/A", "A/F", "F+ A"], correctIndex: 1, explanation: "p = F/A." },
          { question: "Unit of pressure", options: ["N", "J", "Pa", "W"], correctIndex: 2, explanation: "Pascal." },
          { question: "A 20 N force acts on 0.5 m². Pressure = ?", options: ["10 Pa", "20 Pa", "40 Pa", "0.025 Pa"], correctIndex: 2, explanation: "p=F/A=20/0.5=40 Pa." },
          { question: "For same force, pressure increases when area…", options: ["increases", "decreases", "stays same", "becomes zero"], correctIndex: 1, explanation: "Smaller area → larger p." },
          { question: "Pressure in a liquid increases with…", options: ["height above surface", "depth below surface", "temperature only", "colour"], correctIndex: 1, explanation: "Greater depth → higher pressure." },
          { question: "Atmospheric pressure is due to…", options: ["Earth’s magnetism", "weight of air", "sunlight", "water pressure"], correctIndex: 1, explanation: "Weight of air column." },
          { question: "Hydraulic press: A2 is 5× A1, then F2 is…", options: ["5×F1", "F1/5", "F1", "25×F1"], correctIndex: 0, explanation: "F2/F1 = A2/A1." },
          { question: "In a fluid, pressure acts…", options: ["only downward", "only upward", "in all directions", "only sideways"], correctIndex: 2, explanation: "All directions." },
          { question: "Dams are thicker at the bottom because…", options: ["water is colder", "pressure higher at depth", "water flows faster", "surface tension"], correctIndex: 1, explanation: "p increases with depth." },
          { question: "A barometer measures…", options: ["temperature", "atmospheric pressure", "humidity", "wind speed"], correctIndex: 1, explanation: "Atmospheric pressure." },
          { question: "If F is doubled and A is doubled, pressure…", options: ["doubles", "halves", "same", "quadruples"], correctIndex: 2, explanation: "p = (2F)/(2A)=F/A." },
          { question: "Pa equals…", options: ["N/m", "N/m²", "J/s", "kg/m³"], correctIndex: 1, explanation: "Pa=N/m²." },
          { question: "Which gives the lowest pressure?", options: ["high heels", "snow shoes", "sharp knife", "needle"], correctIndex: 1, explanation: "Largest area." },
          { question: "A suction cup sticks because inside pressure is…", options: ["higher", "lower", "same", "zero"], correctIndex: 1, explanation: "Lower inside; atmosphere pushes." },
          { question: "Boiling point decreases at high altitude because…", options: ["air is colder", "pressure is lower", "gravity is higher", "water denser"], correctIndex: 1, explanation: "Lower external pressure." },
          { question: "If pressure is constant, force is proportional to…", options: ["1/area", "area", "area²", "mass"], correctIndex: 1, explanation: "F=pA." },
          { question: "A 60 kg student stands on both feet (total contact area 0.04 m²). Approximate pressure (g=10 N/kg) is…", options: ["600 Pa", "1500 Pa", "15 000 Pa", "150 Pa"], correctIndex: 2, explanation: "p=F/A=600/0.04=15 000 Pa." },
          { question: "Atmospheric pressure holds a newspaper on a table when air is pumped out under it mainly because…", options: ["vacuum pulls the paper", "outside air pressure pushes down on the paper", "paper becomes heavier", "gravity disappears"], correctIndex: 1, explanation: "Pressure difference: lower pressure under → net downward force from atmosphere above." },
          { question: "In a hydraulic jack, the output piston moves… compared with the input piston for the same fluid volume displaced.", options: ["a larger distance with smaller force", "a smaller distance with larger force", "the same distance always", "zero distance"], correctIndex: 1, explanation: "Mechanical advantage: force up, distance down (work ~ conserved in ideal case)." },
          { question: "Pressure at depth h in a liquid (density ρ) is increased by… when h doubles (g constant).", options: ["ρgh", "2ρgh", "ρgh/2", "unchanged"], correctIndex: 1, explanation: "p ∝ h for same ρ, g." },
          { question: "Two vessels hold the same liquid to the same depth. Bottom pressure is…", options: ["greater in the wider vessel", "greater in the narrower vessel", "the same if same liquid and depth", "zero in both"], correctIndex: 2, explanation: "Fluid pressure at a depth depends on depth and ρ, not container width." },
          { question: "1 kPa equals…", options: ["1000 Pa", "100 Pa", "10 000 Pa", "0.001 Pa"], correctIndex: 0, explanation: "k = 10³." },
          { question: "A sharp needle pierces skin more easily than a blunt one with the same hand force because…", options: ["force is larger", "pressure is larger (smaller area)", "friction is larger", "gravity is larger"], correctIndex: 1, explanation: "p=F/A; smaller A → larger p." },
          { question: "Pascal’s principle is most relevant to…", options: ["convection", "hydraulic systems", "thermal radiation", "sound echoes"], correctIndex: 1, explanation: "Pressure transmitted in enclosed fluid." },
          { question: "Absolute pressure at a point in a liquid open to the atmosphere includes…", options: ["only ρgh", "atmospheric pressure + ρgh", "only atmospheric pressure", "ρg/h"], correctIndex: 1, explanation: "Open surface: total pressure ≈ p_atm + ρgh." },
          { question: "If the input piston area is 0.02 m² and output area 0.10 m², ideal hydraulic multiplication of force is…", options: ["0.2×", "2×", "5×", "10×"], correctIndex: 2, explanation: "F_out/F_in = A_out/A_in = 0.10/0.02 = 5." },
        ],
        trueFalse: [
          { statement: "Pressure is measured in newtons.", correct: false, explain: "Pressure is in pascals (N/m²)." },
          { statement: "Pressure in a liquid acts perpendicular to surfaces.", correct: true, explain: "Normal to surface." },
          { statement: "A larger area gives a larger pressure for the same force.", correct: false, explain: "p=F/A." },
          { statement: "Hydraulics can multiply force.", correct: true, explain: "Using larger area piston." },
          { statement: "Atmospheric pressure is about 1 Pa.", correct: false, explain: "~1×10⁵ Pa." },
          { statement: "Pressure increases with depth in a liquid.", correct: true, explain: "More fluid above." },
          { statement: "The same pressure acts at the same depth in the same liquid.", correct: true, explain: "Same horizontal level." },
          { statement: "Suction cups work because atmospheric pressure is zero.", correct: false, explain: "Atmosphere is ~101 kPa." },
          { statement: "A sharp tip creates higher pressure.", correct: true, explain: "Small contact area." },
          { statement: "Pa is equivalent to N/m².", correct: true, explain: "Definition." },
        ],
    });
})();