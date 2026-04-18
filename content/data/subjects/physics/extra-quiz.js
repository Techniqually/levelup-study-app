(function () {
  window.EXTRA_QUIZ_BY_TOPIC = window.EXTRA_QUIZ_BY_TOPIC || {};
  window.EXTRA_THEME_QUIZ = window.EXTRA_THEME_QUIZ || {};

  const extraThemeQuiz = {
    "Section I: Measurement": [
      { question: "A micrometer screw gauge has a zero error of +0.03 mm. If measured diameter reads 5.62 mm, corrected value is:", options: ["5.59 mm", "5.62 mm", "5.65 mm", "5.31 mm"], correctIndex: 0, explanation: "Positive zero error means instrument over-reads, so subtract error." },
      { question: "Which pair is vector quantities?", options: ["Speed and distance", "Velocity and force", "Mass and weight", "Time and displacement"], correctIndex: 1, explanation: "Velocity and force both have magnitude and direction." },
      { question: "Density can be determined most directly from:", options: ["mass x volume", "mass / volume", "weight / volume", "volume / mass"], correctIndex: 1, explanation: "Density rho equals m/V." },
      { question: "If repeated readings show a wide spread, the main issue is:", options: ["Systematic error", "Random error", "Parallax impossible", "Unit conversion"], correctIndex: 1, explanation: "Scatter in repeated measurements indicates random errors." },
      { question: "The SI unit of pressure is equivalent to:", options: ["N m", "N m^-2", "kg m s^-1", "J s^-1"], correctIndex: 1, explanation: "Pressure equals force per unit area, Pa = N/m^2." },
      { question: "For volume of an irregular solid by displacement, the best reading is taken at:", options: ["Top of meniscus", "Middle of tube", "Bottom of meniscus at eye level", "Any clear mark"], correctIndex: 2, explanation: "To reduce parallax in water, read bottom of meniscus at eye level." },
      { question: "A measurement quoted as 2.40 cm implies uncertainty roughly:", options: ["+-1 cm", "+-0.1 cm", "+-0.01 cm", "+-0.001 cm"], correctIndex: 2, explanation: "Last shown decimal place suggests resolution to 0.01 cm." },
      { question: "Which unit is derived, not base SI unit?", options: ["ampere", "kelvin", "newton", "second"], correctIndex: 2, explanation: "Newton is derived from kg m s^-2." },
      { question: "An object has mass 200 g and volume 80 cm^3. Its density is:", options: ["0.4 g/cm^3", "2.5 g/cm^3", "16 g/cm^3", "280 g/cm^3"], correctIndex: 1, explanation: "Density = 200/80 = 2.5 g/cm^3." },
      { question: "Systematic error can be reduced mainly by:", options: ["Taking many repeats only", "Calibrating instrument and correcting zero error", "Using larger units", "Rounding all values"], correctIndex: 1, explanation: "Calibration/zero correction targets systematic bias." },
    ],
    "Section II: Newtonian Mechanics": [
      { question: "A car accelerates uniformly from 10 to 22 m/s in 6 s. Acceleration is:", options: ["2.0 m/s^2", "1.5 m/s^2", "5.3 m/s^2", "32 m/s^2"], correctIndex: 0, explanation: "a = (v - u)/t = (22 - 10)/6 = 2.0 m/s^2." },
      { question: "Resultant force on an object is zero. Which statement is correct?", options: ["Object must be at rest", "Object must move in circle", "Object is in equilibrium (rest or constant velocity)", "Object accelerates uniformly"], correctIndex: 2, explanation: "Zero resultant force means no acceleration." },
      { question: "Pressure exerted by a solid on a surface increases when:", options: ["Contact area increases", "Force decreases", "Force increases at same area", "Density decreases"], correctIndex: 2, explanation: "P = F/A, so increasing F with fixed A increases pressure." },
      { question: "Moment of a force about pivot is:", options: ["F + d", "F x perpendicular distance", "F/d", "mass x g"], correctIndex: 1, explanation: "Moment = force x perpendicular distance from pivot." },
      { question: "In a closed system, momentum is conserved when:", options: ["No internal forces", "No external resultant force", "Kinetic energy is always conserved", "Mass changes"], correctIndex: 1, explanation: "Momentum conservation requires net external force to be zero." },
      { question: "Gravitational potential energy gained is:", options: ["mgh", "1/2 mv^2", "Fv", "ma"], correctIndex: 0, explanation: "Near Earth, GPE change = mgh." },
      { question: "A 60 kg person stands still in a lift. Weight is approximately:", options: ["60 N", "600 N", "980 N", "60 kg"], correctIndex: 1, explanation: "W = mg approx 60 x 10 = 600 N." },
      { question: "A machine has efficiency 40%. If input work is 500 J, useful output is:", options: ["125 J", "200 J", "300 J", "450 J"], correctIndex: 1, explanation: "Useful output = efficiency x input = 0.4 x 500 = 200 J." },
      { question: "A parachutist reaches terminal velocity because:", options: ["Weight becomes zero", "Air resistance equals weight", "Mass decreases", "Gravity switches off"], correctIndex: 1, explanation: "At terminal velocity resultant force is zero." },
      { question: "If power is constant, doubling work done requires:", options: ["Half the time", "Double the time", "No time change", "Quadruple time"], correctIndex: 1, explanation: "P = W/t, so t is proportional to W when P is constant." },
    ],
    "Section III: Thermal Physics": [
      { question: "In the kinetic model, temperature is proportional to:", options: ["Potential energy of particles", "Average kinetic energy of particles", "Number of particles only", "Total mass"], correctIndex: 1, explanation: "Temperature measures average kinetic energy of random motion." },
      { question: "Specific heat capacity is energy needed to raise:", options: ["1 kg by 1 K", "1 g by 10 K", "Any mass by 1 C", "1 mol by 1 K"], correctIndex: 0, explanation: "Definition: per kg per degree (K or C)." },
      { question: "During melting of pure ice at 0 C, temperature:", options: ["Rises steadily", "Remains constant until all melted", "Drops", "Depends only on mass"], correctIndex: 1, explanation: "Energy supplied becomes latent heat of fusion." },
      { question: "Thermal equilibrium is reached when two bodies have same:", options: ["Mass", "Temperature", "Specific heat capacity", "Color"], correctIndex: 1, explanation: "No net heat transfer at equal temperature." },
      { question: "Convection in fluids occurs because:", options: ["Only radiation acts", "Warmer regions become less dense and rise", "Particles stop moving", "Pressure remains constant"], correctIndex: 1, explanation: "Density differences drive convection currents." },
      { question: "A shiny silver surface reduces heat transfer mainly by:", options: ["Conduction", "Radiation", "Convection", "Evaporation"], correctIndex: 1, explanation: "Shiny surfaces are poor emitters/absorbers of infrared radiation." },
      { question: "Gas pressure in a fixed volume rises with temperature because:", options: ["Particles move slower", "Particles collide walls more forcefully/frequently", "Mass increases", "Volume increases"], correctIndex: 1, explanation: "Higher kinetic energy raises collision rate and momentum transfer." },
      { question: "Which has the largest specific latent heat?", options: ["material requiring most energy per kg for phase change", "material with highest density", "material with highest melting point always", "material with largest volume"], correctIndex: 0, explanation: "Specific latent heat is energy per kg during phase change." },
      { question: "In conduction through a metal rod, energy transfer is mainly via:", options: ["Bulk fluid motion", "Mobile electrons and lattice vibrations", "Ultraviolet light only", "Chemical reactions"], correctIndex: 1, explanation: "Metals conduct by free electrons plus lattice vibration." },
      { question: "To cool a drink quickly, best method is:", options: ["Wrap in wool", "Use metal container with larger surface area", "Seal in vacuum flask", "Paint black and insulate"], correctIndex: 1, explanation: "Better conduction and larger area increase heat transfer out." },
    ],
    "Section IV: Waves": [
      { question: "Wave speed is given by:", options: ["v = f/lambda", "v = lambda f", "v = lambda/f", "v = T/lambda"], correctIndex: 1, explanation: "Basic wave equation v = f lambda." },
      { question: "Increasing frequency of a wave in same medium causes:", options: ["Speed increases", "Wavelength decreases", "Wavelength increases", "Speed becomes zero"], correctIndex: 1, explanation: "In fixed medium speed is constant, so lambda = v/f decreases." },
      { question: "Sound cannot travel through vacuum because:", options: ["It is electromagnetic", "It needs a medium for vibrations", "Its frequency is too low", "It is always reflected"], correctIndex: 1, explanation: "Sound is mechanical wave requiring particles." },
      { question: "Refraction occurs because wave speed changes when:", options: ["Amplitude changes", "Entering a different medium", "Frequency changes at source", "Reflection angle changes"], correctIndex: 1, explanation: "Refraction arises from speed change across media boundary." },
      { question: "For a converging lens, image is real and inverted when object is:", options: ["Between lens and focal point", "At focal point only", "Beyond focal length", "At optical center only"], correctIndex: 2, explanation: "Object distance greater than f gives real inverted image." },
      { question: "Total internal reflection requires:", options: ["From denser to less dense and incidence above critical angle", "Any two media and normal incidence", "Only mirrors", "Only convex lenses"], correctIndex: 0, explanation: "Both conditions are required for TIR." },
      { question: "Electromagnetic waves with highest frequency are:", options: ["Radio waves", "Microwaves", "X-rays", "Gamma rays"], correctIndex: 3, explanation: "Gamma rays occupy highest-frequency end of EM spectrum." },
      { question: "Loudness of sound is mainly related to:", options: ["Frequency", "Amplitude", "Wavelength only", "Wave speed"], correctIndex: 1, explanation: "Greater amplitude generally corresponds to louder sound." },
      { question: "If angle of incidence equals angle of reflection, this law applies to:", options: ["Refraction only", "Reflection", "Diffraction only", "Polarization"], correctIndex: 1, explanation: "Law of reflection: i = r." },
      { question: "A wave with f = 500 Hz and lambda = 0.68 m has speed:", options: ["340 m/s", "170 m/s", "500 m/s", "680 m/s"], correctIndex: 0, explanation: "v = f lambda = 500 x 0.68 = 340 m/s." },
    ],
    "Section V: Electricity and Magnetism": [
      { question: "Current is defined as:", options: ["Energy transferred per second", "Charge flowing per second", "Voltage per resistance", "Force per charge"], correctIndex: 1, explanation: "I = Q/t." },
      { question: "Potential difference across component is:", options: ["Charge x time", "Energy transferred per unit charge", "Current x charge", "Power/current"], correctIndex: 1, explanation: "V = W/Q." },
      { question: "For resistors in series, total resistance:", options: ["Adds up", "Is less than smallest resistor", "Is product of resistances", "Is unchanged"], correctIndex: 0, explanation: "Series resistances add directly." },
      { question: "For resistors in parallel, equivalent resistance is:", options: ["Greater than largest branch", "Equal to average", "Less than smallest branch", "Sum of all"], correctIndex: 2, explanation: "Parallel combination gives lower equivalent resistance." },
      { question: "Electrical power can be expressed as:", options: ["P = IV", "P = I/V", "P = V/R", "P = QI"], correctIndex: 0, explanation: "Power in electric circuits is P = IV." },
      { question: "The fuse in a plug is placed in the:", options: ["Neutral wire", "Earth wire", "Live wire", "Any wire"], correctIndex: 2, explanation: "Fuse should disconnect live supply when current exceeds safe value." },
      { question: "Magnetic field around a straight current-carrying conductor forms:", options: ["Radial lines outward", "Concentric circles", "Parallel lines only", "No field"], correctIndex: 1, explanation: "Field pattern is concentric circles around wire." },
      { question: "A transformer works on principle of:", options: ["Electrolysis", "Electromagnetic induction", "Static electricity", "Photoelectric effect"], correctIndex: 1, explanation: "Changing magnetic flux induces emf in secondary coil." },
      { question: "Step-up transformer increases:", options: ["Current only", "Voltage while reducing current (ideal)", "Power output always", "Frequency"], correctIndex: 1, explanation: "Ideal transformer raises V and lowers I for same power." },
      { question: "A charged rod attracts an uncharged paper piece because of:", options: ["Magnetic domains", "Electrostatic induction", "Nuclear force", "Conduction current"], correctIndex: 1, explanation: "Charge redistribution in the paper causes net attraction." },
    ],
    "Section VI: Radioactivity": [
      { question: "Radioactive decay is best described as:", options: ["Triggered by high temperature", "Random and spontaneous", "Stopped by magnetic fields", "Controlled by pressure"], correctIndex: 1, explanation: "Decay occurs spontaneously and unpredictably for individual nuclei." },
      { question: "Half-life is the time for:", options: ["All nuclei to decay", "Activity to double", "Number of undecayed nuclei to halve", "Mass to become zero"], correctIndex: 2, explanation: "By definition, half-life reduces undecayed nuclei to half." },
      { question: "Which radiation is most ionizing?", options: ["Gamma", "Beta", "Alpha", "X-ray"], correctIndex: 2, explanation: "Alpha particles have greatest ionizing power but lowest penetration." },
      { question: "Which has greatest penetrating ability?", options: ["Alpha", "Beta", "Gamma", "All same"], correctIndex: 2, explanation: "Gamma rays penetrate most and need thick lead/concrete shielding." },
      { question: "A nucleus emits beta minus particle. Proton number then:", options: ["Increases by 1", "Decreases by 1", "Unchanged always", "Doubles"], correctIndex: 0, explanation: "Neutron converts to proton + electron + antineutrino." },
      { question: "Main purpose of a GM tube in school lab is to:", options: ["Generate radiation", "Detect/count ionizing events", "Shield from alpha", "Measure mass"], correctIndex: 1, explanation: "GM tube detects ionizing radiation counts." },
      { question: "Background radiation can come from:", options: ["Cosmic rays and rocks", "Only medical X-rays", "Only nuclear plants", "Only sunlight"], correctIndex: 0, explanation: "Natural sources include cosmic rays and terrestrial radioisotopes." },
      { question: "Best safety practice when handling sealed source is:", options: ["Increase handling time", "Minimize time, maximize distance, use shielding", "Use bare hands for control", "Store near classroom entrance"], correctIndex: 1, explanation: "Core radiation safety principles are time, distance, shielding." },
      { question: "If count rate drops from 800 cpm to 200 cpm in 12 min, half-life is:", options: ["3 min", "4 min", "6 min", "12 min"], correctIndex: 2, explanation: "800 to 200 is two half-lives, so one half-life is 6 min." },
      { question: "In medical tracers, preferred isotope should generally have:", options: ["Very long half-life and strong alpha", "Appropriate short half-life and detectable radiation", "No radiation emission", "Highest mass number"], correctIndex: 1, explanation: "Tracer should be detectable but minimize patient dose duration." },
    ],
  };

  window.EXTRA_THEME_QUIZ = { ...window.EXTRA_THEME_QUIZ, ...extraThemeQuiz };
})();

