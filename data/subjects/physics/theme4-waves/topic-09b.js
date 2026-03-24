(function () {
    window.__registerTopic({

        id: "9B",
        theme: "Section IV: Waves",
        title: "General Properties of Waves II (Sound)",
        cheatBlocks: [
          { title: "Sound as a wave", points: [
            "Sound in air: **longitudinal** pressure wave (compressions/rarefactions).",
            "Requires medium (cannot travel in vacuum).",
            "Speed depends on medium (solids > liquids > gases, generally)."
          ]},
          { title: "Loudness and pitch", points: [
            "Loudness relates to amplitude (and intensity).",
            "Pitch relates to frequency: higher f → higher pitch.",
            "Human hearing range ~20 Hz to 20 kHz (context)."
          ]},
          { title: "Echo + ultrasound (context)", points: [
            "Echo: reflection of sound; distance \(d = vt/2\\) (there and back).",
            "Ultrasound (>20 kHz): imaging and cleaning applications."
          ]},
        ],
        flashcards: [
          { front: "Sound wave type", back: "longitudinal" },
          { front: "Needs medium?", back: "yes (no sound in vacuum)" },
          { front: "Loudness relates to", back: "amplitude/intensity" },
          { front: "Pitch relates to", back: "frequency" },
          { front: "Echo distance formula", back: "d = vt/2" },
          { front: "Compression", back: "high pressure region" },
          { front: "Rarefaction", back: "low pressure region" },
          { front: "Ultrasound", back: "frequency > 20 kHz" },
          { front: "Why solids transmit sound faster", back: "particles closer; stiffness higher" },
          { front: "Speed of sound depends on", back: "medium + temperature (gas)" },
          { front: "If amplitude increases, pitch…", back: "unchanged (basic model)" },
          { front: "If frequency doubles, pitch…", back: "higher" },
        ],
        quiz: [
          { question: "Sound cannot travel through…", options: ["air", "water", "steel", "vacuum"], correctIndex: 3, explanation: "Needs medium." },
          { question: "Sound in air is…", options: ["transverse", "longitudinal", "electromagnetic", "circular"], correctIndex: 1, explanation: "Longitudinal." },
          { question: "Pitch depends on…", options: ["amplitude", "frequency", "wavelength only", "speed only"], correctIndex: 1, explanation: "Frequency sets pitch." },
          { question: "Loudness depends mainly on…", options: ["frequency", "amplitude", "speed", "wavelength"], correctIndex: 1, explanation: "Amplitude/intensity." },
          { question: "An echo returns in 0.40 s. Speed of sound 340 m/s. Distance to wall?", options: ["68 m", "136 m", "340 m", "850 m"], correctIndex: 0, explanation: "d=vt/2=340×0.40/2=68 m." },
          { question: "Ultrasound has frequency…", options: ["<20 Hz", "20–200 Hz", ">20 kHz", "any"], correctIndex: 2, explanation: "Above human hearing." },
          { question: "In a longitudinal wave, particles oscillate…", options: ["perpendicular to travel", "parallel to travel", "in circles", "not at all"], correctIndex: 1, explanation: "Parallel." },
          { question: "If frequency increases in same medium, wavelength…", options: ["increases", "decreases", "same", "random"], correctIndex: 1, explanation: "v constant → λ=v/f." },
          { question: "Sound speed is highest in…", options: ["gas", "liquid", "solid", "vacuum"], correctIndex: 2, explanation: "Typically solid fastest." },
          { question: "A louder sound has…", options: ["higher frequency", "larger amplitude", "shorter wavelength always", "lower speed"], correctIndex: 1, explanation: "Larger amplitude." },
          { question: "Compressions are regions of…", options: ["low pressure", "high pressure", "no pressure", "vacuum"], correctIndex: 1, explanation: "High pressure/density." },
          { question: "Rarefactions are regions of…", options: ["low pressure", "high pressure", "no particles", "metal"], correctIndex: 0, explanation: "Low pressure/density." },
          { question: "Sound intensity is related to…", options: ["amplitude² (qualitative)", "wavelength only", "mass", "temperature only"], correctIndex: 0, explanation: "Intensity increases strongly with amplitude." },
          { question: "Echo uses reflection of…", options: ["light", "sound", "current", "magnetism"], correctIndex: 1, explanation: "Reflection of sound." },
          { question: "If echo time doubles, distance to wall…", options: ["halves", "doubles", "same", "quadruples"], correctIndex: 1, explanation: "d ∝ t." },
          { question: "Sound in air becomes faster when temperature…", options: ["decreases", "increases", "same", "becomes zero"], correctIndex: 1, explanation: "Higher temp → faster molecules." },
          { question: "An echo returns after 1.20 s. If v = 340 m/s, the reflecting surface is about… away.", options: ["136 m", "204 m", "408 m", "340 m"], correctIndex: 1, explanation: "d = vt/2 = 340×1.20/2 = 204 m." },
          { question: "Compared with audible sound in the same medium, ultrasound differs mainly in…", options: ["speed only", "amplitude only", "frequency", "being longitudinal"], correctIndex: 2, explanation: "Ultrasound is still sound; it is defined by higher frequency." },
          { question: "In a given gas at fixed temperature, sound speed is approximately… frequency over the usual audible range.", options: ["proportional to", "independent of", "inversely proportional to", "equal to"], correctIndex: 1, explanation: "Speed depends mainly on the medium and conditions, not f (basic model)." },
          { question: "If sound speed is constant and frequency doubles, wavelength…", options: ["doubles", "halves", "is unchanged", "quadruples"], correctIndex: 1, explanation: "λ = v/f ⇒ λ halves when f doubles." },
          { question: "Compressions in a sound wave are regions of…", options: ["minimum particle density", "maximum particle density", "zero pressure variation", "zero particle motion"], correctIndex: 1, explanation: "Compression = squeezed regions → higher density/pressure." },
          { question: "Sound waves in air cannot be…", options: ["longitudinal", "described by f and λ", "polarised like transverse waves", "reflected"], correctIndex: 2, explanation: "Longitudinal waves do not have polarisation in the same sense as transverse EM waves." },
          { question: "A ship’s sonar hears an echo 2.0 s after a pulse. If v = 1500 m/s in water, the obstacle is about…", options: ["750 m", "1500 m", "3000 m", "375 m"], correctIndex: 1, explanation: "d = vt/2 = 1500×2.0/2 = 1500 m." },
          { question: "Increasing only the amplitude of a pure tone in air (same f) mainly changes…", options: ["wave speed", "pitch", "loudness", "wavelength"], correctIndex: 2, explanation: "Loudness relates to intensity/amplitude; pitch stays tied to frequency." },
          { question: "Rarefactions are regions where pressure is…", options: ["highest", "lowest compared with equilibrium", "always zero absolute", "equal to compression pressure"], correctIndex: 1, explanation: "Rarefaction = stretched regions → lower pressure than equilibrium." },
          { question: "For echo timing, the factor ½ appears because the distance calculated is…", options: ["one-way distance", "round-trip distance", "only the reflected path", "twice the wall thickness"], correctIndex: 0, explanation: "Time is there-and-back, so one-way distance is d = v(t/2)." },
        ],
        trueFalse: [
          { statement: "Sound waves are electromagnetic.", correct: false, explain: "Sound is mechanical." },
          { statement: "Sound needs a medium.", correct: true, explain: "No sound in vacuum." },
          { statement: "Pitch increases with frequency.", correct: true, explain: "Higher f → higher pitch." },
          { statement: "Loudness increases with amplitude.", correct: true, explain: "Amplitude relates to intensity." },
          { statement: "Echo time includes travel to wall and back.", correct: true, explain: "Hence divide by 2." },
          { statement: "Ultrasound is below 20 Hz.", correct: false, explain: "Ultrasound is above 20 kHz." },
          { statement: "Compressions have low pressure.", correct: false, explain: "Compressions are high pressure." },
          { statement: "Sound travels fastest in vacuum.", correct: false, explain: "It cannot travel in vacuum." },
          { statement: "If frequency doubles, wavelength doubles in same medium.", correct: false, explain: "λ halves if v constant." },
          { statement: "Amplitude affects wave speed in air.", correct: false, explain: "Speed mainly depends on medium and temperature." },
        ],
      
    });
})();