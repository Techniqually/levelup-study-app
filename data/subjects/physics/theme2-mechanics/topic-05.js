(function () {
    window.__registerTopic({

        id: "5",
        theme: "Section II: Newtonian Mechanics",
        title: "Turning Effects of Forces",
        cheatBlocks: [
          { title: "Moments", points: [
            "Moment (torque) about a pivot: \(\\tau = F \\times d_\\perp\\) where d is perpendicular distance from pivot to line of action.",
            "Clockwise moments = anticlockwise moments in equilibrium.",
            "Couple: two equal/opposite parallel forces separated by distance → pure turning effect."
          ]},
          { title: "Equilibrium", points: [
            "For equilibrium: resultant force = 0 **and** resultant moment = 0.",
            "Stable / unstable / neutral equilibrium based on centre of gravity (CoG) position change when displaced."
          ]},
          { title: "Centre of gravity", points: [
            "CoG: point where weight acts (resultant of gravitational forces).",
            "Lowering CoG and widening base increases stability.",
            "Finding CoG of lamina: suspend, draw plumb line; intersection is CoG."
          ]},
        ],
        flashcards: [
          { front: "Moment formula", back: "τ = F × perpendicular distance" },
          { front: "Equilibrium conditions", back: "ΣF=0 and Σmoment=0" },
          { front: "Define couple", back: "Two equal/opposite parallel forces causing rotation only" },
          { front: "Stable equilibrium", back: "CoG rises when displaced; tends to return" },
          { front: "Unstable equilibrium", back: "CoG lowers when displaced; moves away" },
          { front: "Neutral equilibrium", back: "CoG same height when displaced" },
          { front: "Stability increased by…", back: "lower CoG, wider base" },
          { front: "CoG of lamina method", back: "suspend + plumb line intersection" },
          { front: "Perpendicular distance means…", back: "shortest distance to line of action" },
          { front: "Unit of moment", back: "N·m" },
          { front: "Door handle far from hinge helps because…", back: "larger d → larger moment" },
          { front: "If Σmoment ≠ 0, object…", back: "rotates / tends to rotate" },
        ],
        quiz: [
          { question: "Moment about pivot is…", options: ["F/d", "F×d⊥", "F×A", "m/V"], correctIndex: 1, explanation: "Torque = force × perpendicular distance." },
          { question: "Unit of moment", options: ["N", "N/m", "N·m", "J"], correctIndex: 2, explanation: "N·m." },
          { question: "For equilibrium, ΣF and Σmoment are…", options: ["both zero", "both max", "ΣF zero only", "Σmoment zero only"], correctIndex: 0, explanation: "Need both." },
          { question: "A 10 N force acts 0.3 m from pivot. Moment?", options: ["3", "30", "0.03", "33"], correctIndex: 0, explanation: "10×0.3=3 N·m." },
          { question: "Opening a door is easier at handle because…", options: ["smaller force", "bigger d", "bigger mass", "less friction"], correctIndex: 1, explanation: "Larger distance → larger moment." },
          { question: "A couple produces…", options: ["translation only", "rotation only", "no effect", "always equilibrium"], correctIndex: 1, explanation: "Pure turning." },
          { question: "Stable equilibrium means CoG… when displaced", options: ["lowers", "rises", "stays same", "vanishes"], correctIndex: 1, explanation: "CoG rises → restoring tendency." },
          { question: "Wider base makes object…", options: ["less stable", "more stable", "no change", "weightless"], correctIndex: 1, explanation: "More stable." },
          { question: "If line of action of weight falls outside base, object…", options: ["stable", "topples", "floats", "shrinks"], correctIndex: 1, explanation: "It topples." },
          { question: "CoG can be found by…", options: ["measuring density", "suspending and drawing plumb lines", "using thermometer", "using ammeter"], correctIndex: 1, explanation: "Standard method." },
          { question: "Perpendicular distance is measured to…", options: ["pivot", "force arrow head", "line of action", "object edge"], correctIndex: 2, explanation: "Shortest distance to line of action." },
          { question: "If clockwise moment > anticlockwise, object turns…", options: ["anticlockwise", "clockwise", "no turn", "upwards"], correctIndex: 1, explanation: "Net clockwise." },
          { question: "A beam in equilibrium has Σmoment about any point…", options: ["zero", "max", "unknown", "negative"], correctIndex: 0, explanation: "Equilibrium implies zero about any pivot." },
          { question: "Shifting weight lower increases stability because…", options: ["less mass", "CoG lower", "force smaller", "area smaller"], correctIndex: 1, explanation: "Lower CoG harder to topple." },
          { question: "Moment arm equals…", options: ["distance along beam", "perpendicular distance to line of action", "height only", "mass"], correctIndex: 1, explanation: "Definition." },
          { question: "A spanner is longer to…", options: ["increase force", "increase moment for same force", "reduce pivot", "increase mass"], correctIndex: 1, explanation: "Larger d increases torque." },
          { question: "A 20 N force acts at 40° to a beam; perpendicular distance from pivot to line of action is 0.5 m. Moment magnitude is…", options: ["10 N·m", "20 N·m", "7.66 N·m", "0 N·m"], correctIndex: 0, explanation: "τ = F×d⊥ = 20×0.5 = 10 N·m (d⊥ already given)." },
          { question: "A uniform metre rule balances at 50 cm. Its centre of gravity is at…", options: ["25 cm", "50 cm", "0 cm", "100 cm"], correctIndex: 1, explanation: "Uniform rod: CoG at geometric centre." },
          { question: "Taking moments about pivot P eliminates unknown forces that…", options: ["act at P", "are perpendicular to the beam", "are vertical", "are zero"], correctIndex: 0, explanation: "Forces through pivot have zero moment arm about P." },
          { question: "A couple consists of two 8 N forces parallel, opposite, 0.25 m apart. Couple magnitude is…", options: ["2 N·m", "4 N·m", "8 N·m", "32 N·m"], correctIndex: 0, explanation: "Couple = F×separation = 8×0.25 = 2 N·m." },
          { question: "Tilting a box: the critical condition for toppling is when the line of action of weight…", options: ["lies inside the base", "passes through the edge of the base", "is above the CoG", "is zero"], correctIndex: 1, explanation: "At the edge of support; beyond that, unbalanced moment." },
          { question: "A ladder leans on a wall. The wall’s reaction is horizontal because…", options: ["weight is horizontal", "walls can only push normal to the surface", "friction is zero", "moment is zero"], correctIndex: 1, explanation: "Contact force is perpendicular to smooth wall (basic model)." },
          { question: "Neutral equilibrium: after a small tilt, the centre of gravity…", options: ["rises", "falls", "stays at the same height", "vanishes"], correctIndex: 2, explanation: "No restoring or destabilising height change." },
          { question: "Two children sit on a seesaw balanced horizontally. If one moves closer to the pivot, that side’s moment…", options: ["increases", "decreases", "stays same", "becomes infinite"], correctIndex: 1, explanation: "τ = F×d; smaller d → smaller moment." },
          { question: "SI base units of moment (N·m) are equivalent to…", options: ["kg·m²·s⁻²", "kg·m·s⁻²", "kg·m·s⁻¹", "kg·m²·s⁻³"], correctIndex: 0, explanation: "N·m = (kg·m/s²)·m = kg·m²/s² = kg·m²·s⁻²." },
          { question: "For equilibrium, ΣF = 0 is necessary but a body can still rotate if…", options: ["Σmoment ≠ 0", "mass is zero", "g is zero", "forces are balanced"], correctIndex: 0, explanation: "Need both ΣF=0 and Σmoment=0 for full equilibrium." },
        ],
        trueFalse: [
          { statement: "Moment depends on perpendicular distance.", correct: true, explain: "τ=F×d⊥." },
          { statement: "For equilibrium, only ΣF=0 is needed.", correct: false, explain: "Must also have Σmoment=0." },
          { statement: "A couple has zero resultant force.", correct: true, explain: "Forces cancel but cause turning." },
          { statement: "Lower CoG increases stability.", correct: true, explain: "Harder to topple." },
          { statement: "Stable equilibrium means CoG lowers when displaced.", correct: false, explain: "CoG rises when displaced." },
          { statement: "Moment unit is N/m.", correct: false, explain: "N·m." },
          { statement: "Wider base decreases stability.", correct: false, explain: "It increases stability." },
          { statement: "If weight’s line of action is within base, object will not topple.", correct: true, explain: "No toppling moment." },
          { statement: "CoG is always at geometric centre.", correct: false, explain: "Only for uniform symmetric objects." },
          { statement: "A door handle is far from hinge to increase turning effect.", correct: true, explain: "Larger moment arm." },
        ],
      
    });
})();