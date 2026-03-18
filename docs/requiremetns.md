It is incredibly supportive of you to take such a hands-on approach to your daughter's O-Level preparation. Sec 4 is a stressful year, and getting a 16-year-old engaged when they are already feeling weak in a subject is definitely a challenge. 

A gamified, bite-sized web app is a brilliant idea. By building it with HTML, CSS, and plain JavaScript, it can run directly in her web browser without any complex installations, and you can easily swap out the content for other subjects later.

Here is a **Requirement Design Document (RDD)** tailored to engage a distracted teen and build her confidence in MOE O-Level Chemistry over the next two weeks.

---

# Requirement Design Document (RDD): "LevelUp! O-Level Study Hub"

## 1. Project Overview
* **Goal:** To create a local, browser-based revision application to help a Sec 4 student master basic concepts, starting with Chemistry and expanding to other subjects.
* **Target Audience:** A 16-year-old student lacking motivation. The app must be visually appealing, fast-paced, and rewarding to prevent boredom and blind guessing.
* **Tech Stack:** HTML5, CSS3, Vanilla JavaScript (Local Storage for saving scores and progress). No backend server required; runs directly from a local folder on a Windows PC.

## 2. Content Architecture (Based on the MOE Syllabus)
The app will dynamically load content from a JSON structure (or a separate `.js` data file). This makes the app **subject-agnostic**. You will just need to create a new data file to switch from Chemistry to Physics or Math.

For Chemistry, the content will be structured exactly as per your textbook's table of contents:
* **Theme 1: Matter** (Topics 1-5: e.g., Kinetic Particle Theory, Atomic Structure)
* **Theme 2: Chemical Reactions** (Topics 6-12: e.g., Acids and Bases, Redox)
* **Theme 3: Chemistry in a Sustainable World** (Topics 17-19: e.g., Organic Chemistry)

## 3. Core Modules

### A. The "Cheat Sheet" (Things to Remember)
* **Feature:** A bite-sized, scrollable summary page for each topic. 
* **Design:** Bullet points, bold keywords, and placeholders for visual aids (where you can later insert your AI-generated images). 
* **Teen Psychology:** Do not overwhelm her with walls of text. Think of it like an Instagram carousel or TikTok slides—short, punchy facts she must read before unlocking the quiz.

### B. Interactive Flashcards
* **Feature:** Digital flashcards for memorizing definitions, formulas, and ionic charges.
* **Design:** Click to flip. Swipe right (or click a "Got It" button) if she knows it, swipe left ("Need Review") if she doesn't.
* **Teen Psychology:** Low-pressure active recall. Cards marked "Need Review" will cycle back until she gets them right.

### C. The Gamified Quiz Engine (Anti-Guessing)
* **Feature:** Multiple-choice and short-answer questions.
* **Gamification & Mechanics:**
    * **Time-Attack:** A visible timer bar drains for each question. 
    * **Dynamic Scoring:** Answering correctly and quickly awards more points (e.g., 100 points). Taking longer reduces the points.
    * **Anti-Guessing Penalty:** If she answers *wrong* within the first 3 seconds, she loses points or "health" (to penalize blind clicking).
    * **Streaks:** Answering 3 questions right in a row triggers a "Fire" mode (combo multiplier).
* **Explanations:** **Crucial Feature.** When she gets an answer wrong, the quiz pauses. A modal pops up explaining *why* the answer is wrong and reminds her of the core concept. She cannot proceed until she acknowledges it.

## 4. User Interface (UI) and Experience (UX)
* **Dark Mode by Default:** Looks modern, reduces eye strain, and feels less like a traditional school portal.
* **Dashboard:** A home screen showing her total "XP" (Experience Points), a daily streak counter, and locked/unlocked topics.
* **Progression:** Topics are locked. She must score at least 70% in Topic 3 (Kinetic Particle Theory) to unlock Topic 4 (Atomic Structure). This gives a sense of achievement.

## 5. Data Structure Strategy (Extensibility)
To ensure you can use this for other subjects, the app will separate the *engine* from the *content*. 
You will maintain a simple text file (like `chemistry_data.js`) structured like this:

```javascript
const appData = {
  subject: "O-Level Chemistry",
  topics: [
    {
      id: "topic_4",
      title: "Atomic Structure",
      cheatSheet: ["Protons are positive, Neutrons are neutral...", "Mass number = Protons + Neutrons"],
      flashcards: [
        { front: "Charge of an electron?", back: "-1" }
      ],
      quiz: [
        {
          question: "Which particle has no charge?",
          options: ["Proton", "Neutron", "Electron", "Ion"],
          correctAnswer: 1, // Index 1 is Neutron
          explanation: "Neutrons are neutral. Protons are positive (+1) and electrons are negative (-1)."
        }
      ]
    }
  ]
};
```
When you want to teach Biology, you simply create `biology_data.js` and point the HTML file to it.

## 6. Implementation Plan (The 2-Week Sprint)
Since you want to bring her up to speed in two weeks, we need to be realistic. Focus only on her weakest, most fundamental topics first (like Atomic Structure, Chemical Bonding, and Acids & Bases).

* **Days 1-2:** Build the basic HTML/CSS shell and the JavaScript logic for the Quiz and Flashcards. (I can write this code for you).
* **Days 3-4:** Input the content (Notes and Quiz questions) for the first 3 critical chapters. 
* **Days 5-14:** She plays/studies 30-45 minutes a day. You review her local scores at night, and we generate the content for the next chapters based on where she is struggling.

---

**Next Step:**
To get this off the ground, we can tackle the code or the content first. **Would you like me to generate the foundational HTML/JavaScript code for the app interface, or should we start by writing out the actual flashcards and quiz questions for Topic 3: Kinetic Particle Theory?**