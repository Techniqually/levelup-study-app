(function () {
    window.__registerTopic({

        id: "6",
        theme: "Section II: Newtonian Mechanics",
        title: "Energy",
        cheatBlocks: [
          { title: "Energy stores + transfers", points: [
            "Energy stores: kinetic, gravitational potential, elastic, chemical, thermal (internal), nuclear, magnetic, electrostatic (context).",
            "Transfers: mechanically (forces doing work), electrically, by heating, by radiation.",
            "Principle: energy is conserved (transformed/transferred)."
          ]},
          { title: "Work, power, efficiency", points: [
            "Work done \(W = F s\\) where s is displacement in direction of force (J).",
            "GPE \(E_p = mgh\\). KE \(E_k = \\tfrac12 mv^2\\).",
            "Power \(P = W/t\\) (W). Also \(P = Fv\\) for steady motion.",
            "Efficiency = (useful output / total input) × 100%."
          ]},
          { title: "Energy + motion links", points: [
            "If energy is lost to thermal due to friction/drag, mechanical energy decreases.",
            "On frictionless fall: loss in GPE ≈ gain in KE.",
            "Braking: KE → thermal in brakes + road (and sound)."
          ]},
        ],
        flashcards: [
          { front: "Work done", back: "W = F × s (along force direction)" },
          { front: "GPE", back: "mgh" },
          { front: "KE", back: "½mv²" },
          { front: "Power", back: "P = W/t" },
          { front: "Power alternative", back: "P = Fv (steady)" },
          { front: "Efficiency", back: "useful/total ×100%" },
          { front: "Unit of energy", back: "J" },
          { front: "Unit of power", back: "W" },
          { front: "Energy conservation means…", back: "total energy constant; changes form" },
          { front: "What energy store for stretched spring", back: "elastic potential" },
          { front: "What store for raised object", back: "gravitational potential" },
          { front: "Braking converts KE to…", back: "thermal energy" },
        ],
        quiz: [
          { question: "Work done is…", options: ["Fs", "F/s", "s/F", "mgh"], correctIndex: 0, explanation: "W=Fs." },
          { question: "Unit of work", options: ["W", "J", "N", "Pa"], correctIndex: 1, explanation: "Joule." },
          { question: "A 5 N force moves 3 m in its direction. Work?", options: ["15 J", "8 J", "2 J", "0.6 J"], correctIndex: 0, explanation: "5×3=15 J." },
          { question: "GPE formula", options: ["½mv²", "mgh", "Fs", "P=t/W"], correctIndex: 1, explanation: "mgh." },
          { question: "KE formula", options: ["mgh", "½mv²", "Fs", "F/A"], correctIndex: 1, explanation: "½mv²." },
          { question: "Power is…", options: ["W×t", "W/t", "t/W", "F/A"], correctIndex: 1, explanation: "P=W/t." },
          { question: "An appliance uses 600 J in 2 s. Power?", options: ["300 W", "1200 W", "602 W", "0.003 W"], correctIndex: 0, explanation: "600/2=300 W." },
          { question: "Efficiency 40% means…", options: ["40% wasted", "40% useful output", "60% useful output", "cannot tell"], correctIndex: 1, explanation: "useful/total=0.4." },
          { question: "If GPE decreases by 50 J (no losses), KE increases by…", options: ["0", "50 J", "100 J", "25 J"], correctIndex: 1, explanation: "Energy conserved." },
          { question: "Which is energy store?", options: ["force", "speed", "chemical", "pressure"], correctIndex: 2, explanation: "Chemical is a store." },
          { question: "Power of a car at steady speed v with driving force F is…", options: ["Fv", "F/v", "v/F", "Ft"], correctIndex: 0, explanation: "P=Fv." },
          { question: "If height doubles, GPE…", options: ["halves", "same", "doubles", "quadruples"], correctIndex: 2, explanation: "mgh proportional to h." },
          { question: "If speed doubles, KE…", options: ["doubles", "quadruples", "halves", "same"], correctIndex: 1, explanation: "v² dependence." },
          { question: "Energy transferred by electric current is measured in…", options: ["J", "N", "Pa", "kg"], correctIndex: 0, explanation: "Joules." },
          { question: "Work done against friction becomes mainly…", options: ["GPE", "thermal", "nuclear", "elastic"], correctIndex: 1, explanation: "Heat." },
          { question: "A 2 kg object at 10 m/s has KE (≈)", options: ["20 J", "50 J", "100 J", "200 J"], correctIndex: 2, explanation: "½×2×100=100 J." },
          { question: "A motor lifts 30 kg through 4 m at steady speed (g=10). Minimum work done against gravity is…", options: ["120 J", "750 J", "1200 J", "12 000 J"], correctIndex: 2, explanation: "W=mgh=30×10×4=1200 J." },
          { question: "A machine has input energy 500 J and useful output 200 J. Efficiency is…", options: ["20%", "40%", "60%", "250%"], correctIndex: 1, explanation: "200/500×100%=40%." },
          { question: "If speed triples, kinetic energy is multiplied by…", options: ["3", "6", "9", "27"], correctIndex: 2, explanation: "KE ∝ v² → 3²." },
          { question: "A cyclist does 2400 J of work in 80 s. Average power is…", options: ["30 W", "0.03 W", "300 W", "192 kW"], correctIndex: 0, explanation: "P=W/t=2400/80=30 W." },
          { question: "A car exerts driving force 3000 N at 25 m/s. Output power is…", options: ["120 W", "75 kW", "12 kW", "7500 W"], correctIndex: 1, explanation: "P=Fv=3000×25=75 000 W=75 kW." },
          { question: "A spring is stretched; the extra energy stored is mainly…", options: ["gravitational potential", "elastic potential", "thermal", "nuclear"], correctIndex: 1, explanation: "Elastic energy in stretched/compressed spring." },
          { question: "In a closed system with friction, total energy is…", options: ["not conserved", "conserved but mechanical energy may decrease", "only kinetic energy", "always zero"], correctIndex: 1, explanation: "Energy conserved; some becomes thermal via friction." },
          { question: "A 0.5 kg ball falls 2 m (g=10). Approximate loss of GPE if air resistance is negligible is…", options: ["1 J", "5 J", "10 J", "100 J"], correctIndex: 2, explanation: "ΔEp=mgh=0.5×10×2=10 J." },
          { question: "Useful power output 400 W, wasted power 100 W. Efficiency is…", options: ["20%", "25%", "80%", "400%"], correctIndex: 2, explanation: "η=400/(400+100)=80%." },
          { question: "Work done by a force is zero when…", options: ["force is large", "displacement is perpendicular to the force", "velocity is constant", "time is long"], correctIndex: 1, explanation: "W=Fs cosθ; θ=90° → W=0." },
        ],
        trueFalse: [
          { statement: "Work done can be negative if force opposes displacement.", correct: true, explain: "Direction matters." },
          { statement: "Power is energy transferred per unit time.", correct: true, explain: "Definition." },
          { statement: "Efficiency can exceed 100%.", correct: false, explain: "Cannot get more useful output than input." },
          { statement: "KE depends linearly on speed.", correct: false, explain: "Depends on v²." },
          { statement: "GPE depends on reference level.", correct: true, explain: "Height measured relative to chosen zero." },
          { statement: "Friction always reduces mechanical energy.", correct: true, explain: "Transfers energy to thermal store." },
          { statement: "1 W = 1 J/s.", correct: true, explain: "Definition." },
          { statement: "A force can do work even if object doesn’t move.", correct: false, explain: "No displacement → no work." },
          { statement: "Energy is created when a battery runs.", correct: false, explain: "Chemical energy is converted to electrical." },
          { statement: "If speed doubles, KE doubles.", correct: false, explain: "It quadruples." },
        ],
      
    });
})();