(function () {
    window.__registerTopic({

        id: "11C",
        theme: "Section IV: Waves",
        title: "Light III (Thin Converging Lenses)",
        cheatBlocks: [
          { title: "Converging lens basics", points: [
            "Converging lens brings parallel rays to a **principal focus** at distance f (focal length).",
            "Principal axis: line through optical centre and foci.",
            "Ray rules: parallel → through focus; through focus → emerges parallel; through optical centre → undeviated."
          ]},
          { title: "Image formation (qualitative)", points: [
            "Object beyond 2f → real, inverted, diminished image between f and 2f.",
            "Object at 2f → real, inverted, same size at 2f.",
            "Object between f and 2f → real, inverted, magnified beyond 2f.",
            "Object inside f → **virtual, upright, magnified** (magnifying glass)."
          ]},
          { title: "Lens formula + magnification", points: [
            "Thin lens equation: \(\\frac{1}{f}=\\frac{1}{u}+\\frac{1}{v}\\) (sign conventions vary; use syllabus convention).",
            "Magnification \(m = \\frac{\\text{image height}}{\\text{object height}} = \\frac{v}{u}\\) (with sign conventions).",
            "Practical: measure u and v for sharp image; plot 1/v vs 1/u or compute f."
          ]},
        ],
        flashcards: [
          { front: "Focal length", back: "distance from lens to principal focus" },
          { front: "Ray rule 1", back: "parallel ray → passes through focus" },
          { front: "Ray rule 2", back: "through focus → emerges parallel" },
          { front: "Ray rule 3", back: "through optical centre → undeviated" },
          { front: "Object inside focal length gives image that is…", back: "virtual, upright, magnified" },
          { front: "Object at 2f gives image…", back: "real, inverted, same size at 2f" },
          { front: "Lens formula", back: "1/f = 1/u + 1/v" },
          { front: "Magnification", back: "m = v/u (basic)" },
          { front: "Real image", back: "can be formed on a screen" },
          { front: "Virtual image", back: "cannot be formed on a screen" },
          { front: "Principal axis", back: "line through optical centre and foci" },
          { front: "Converging lens", back: "thicker in middle" },
        ],
        quiz: [
          { question: "A converging lens is…", options: ["thicker at edges", "thicker in middle", "flat mirror", "prism"], correctIndex: 1, explanation: "Convex lens." },
          { question: "Focal length is distance from…", options: ["focus to object", "lens to focus", "object to image", "mirror to image"], correctIndex: 1, explanation: "Lens to principal focus." },
          { question: "Parallel rays after converging lens go through…", options: ["optical centre", "principal focus", "object", "screen always"], correctIndex: 1, explanation: "They converge at focus." },
          { question: "Object inside f gives image that is…", options: ["real inverted", "virtual upright magnified", "real upright", "virtual inverted"], correctIndex: 1, explanation: "Magnifying glass case." },
          { question: "Object at 2f gives image size…", options: ["bigger", "same", "smaller", "zero"], correctIndex: 1, explanation: "Same size." },
          { question: "Lens formula is…", options: ["1/f=1/u+1/v", "f=u+v", "v=fλ", "p=F/A"], correctIndex: 0, explanation: "Thin lens equation." },
          { question: "If u decreases (object closer but still >f), image distance v generally…", options: ["decreases", "increases", "same", "becomes negative"], correctIndex: 1, explanation: "Image moves further away approaching infinity as u→f." },
          { question: "If u = 2f, v is…", options: ["f", "2f", "∞", "0"], correctIndex: 1, explanation: "Symmetry for thin lens." },
          { question: "A real image can be formed on a…", options: ["wall", "screen", "mirror only", "lens only"], correctIndex: 1, explanation: "Screen." },
          { question: "Ray through optical centre is…", options: ["bent strongly", "undeviated", "reflected", "absorbed"], correctIndex: 1, explanation: "Passes straight." },
          { question: "Magnification m equals…", options: ["u/v", "v/u", "f/u", "u+v"], correctIndex: 1, explanation: "m=v/u (basic convention)." },
          { question: "If image is inverted, it is…", options: ["always virtual", "always real (for lens cases here)", "always same size", "never formed"], correctIndex: 1, explanation: "Converging lens forms real inverted images when object beyond f." },
          { question: "Object beyond 2f gives image between…", options: ["lens and f", "f and 2f", "beyond 2f", "at infinity"], correctIndex: 1, explanation: "Diminished between f and 2f." },
          { question: "Object between f and 2f gives image…", options: ["between f and 2f", "beyond 2f", "at f", "virtual behind lens"], correctIndex: 1, explanation: "Magnified beyond 2f." },
          { question: "If u is just greater than f, v is…", options: ["small", "very large", "zero", "negative"], correctIndex: 1, explanation: "Image forms very far away." },
          { question: "A magnifying glass uses object placed…", options: ["beyond 2f", "at 2f", "inside f", "at infinity"], correctIndex: 2, explanation: "Inside focal length for virtual magnified image." },
          { question: "A thin converging lens has f = 10 cm. An object is at u = 30 cm. The image distance v is…", options: ["7.5 cm", "10 cm", "15 cm", "30 cm"], correctIndex: 2, explanation: "1/v = 1/f − 1/u = 1/10 − 1/30 = 2/30 ⇒ v = 15 cm." },
          { question: "For the same lens (f = 10 cm), if u = 15 cm, then v equals…", options: ["6 cm", "15 cm", "30 cm", "60 cm"], correctIndex: 2, explanation: "1/v = 1/10 − 1/15 = 1/30 ⇒ v = 30 cm." },
          { question: "An object is placed at u = 2f for a thin converging lens. The image is formed at…", options: ["f", "2f", "infinity", "f/2"], correctIndex: 1, explanation: "Symmetry: object at 2f gives image at 2f (real, inverted, same size)." },
          { question: "As a real object outside f moves toward the lens (still beyond f), the real image generally…", options: ["moves closer to the lens", "moves farther from the lens", "stays fixed", "disappears"], correctIndex: 1, explanation: "Approaching f from above, v increases (image moves away from lens toward infinity)." },
          { question: "A magnifying glass produces a virtual image. This image cannot be…", options: ["upright", "magnified", "projected on a screen", "seen by looking through the lens"], correctIndex: 2, explanation: "Virtual images are not formed by real ray convergence on a screen." },
          { question: "Parallel rays from a distant object arrive at a converging lens. They converge approximately at…", options: ["the optical centre", "the principal focus", "2f", "the object"], correctIndex: 1, explanation: "Parallel to principal axis ⇒ image at focal plane at f." },
          { question: "If u = 20 cm and f = 10 cm for a real image, the magnification magnitude |m| = v/u is…", options: ["0.5", "1", "2", "4"], correctIndex: 1, explanation: "1/v = 1/10 − 1/20 = 1/20 ⇒ v = 20 cm ⇒ |m| = 20/20 = 1." },
          { question: "Which case gives a virtual, upright image for a single thin converging lens?", options: ["object at 2f", "object beyond 2f", "object between f and the lens", "object at infinity"], correctIndex: 2, explanation: "Object inside f ⇒ virtual upright magnified image (same side as object)." },
          { question: "For a real inverted image formed by a converging lens, the image distance v is…", options: ["always negative in any sign convention", "positive in the usual real-image convention used here", "zero", "undefined"], correctIndex: 1, explanation: "Real image on opposite side ⇒ taken positive in basic thin-lens work." },
        ],
        trueFalse: [
          { statement: "A converging lens can form a real image.", correct: true, explain: "For object beyond f." },
          { statement: "A virtual image can be projected onto a screen.", correct: false, explain: "Virtual images cannot be formed on screen." },
          { statement: "Focal length is measured from optical centre to focus.", correct: true, explain: "Definition." },
          { statement: "Parallel rays converge at the principal focus.", correct: true, explain: "Lens focusing." },
          { statement: "Object inside focal length forms real inverted image.", correct: false, explain: "It forms virtual upright magnified." },
          { statement: "At u=2f, image is same size.", correct: true, explain: "Magnification 1." },
          { statement: "Ray through optical centre is undeviated.", correct: true, explain: "Thin lens approximation." },
          { statement: "Lens formula uses v=fλ.", correct: false, explain: "That’s wave equation." },
          { statement: "If object moves closer to lens, image always moves closer too.", correct: false, explain: "It can move further away depending on region." },
          { statement: "Magnification relates image and object heights.", correct: true, explain: "m = hi/ho." },
        ],
        orderTitle: "Draw a converging lens ray diagram",
        orderGame: [
          "Draw principal axis and lens with optical centre.",
          "Mark focal points F and 2F on both sides using focal length.",
          "Place object arrow at distance u from lens.",
          "Draw ray parallel to axis; refract through focus.",
          "Draw ray through optical centre (undeviated).",
          "Intersect rays (or extend backward for virtual) to locate image; label image properties."
        ],
      
    });
})();