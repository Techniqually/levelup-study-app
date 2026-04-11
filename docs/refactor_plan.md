## Phase 1: Structural Reorganization
Transition from a file-type structure (all JS in one folder) to a Feature-Based structure. This groups logic by what it actually does. [3, 4] 

src/
├── api/                # Core infrastructure
│   └── supabase.js     # Shared Supabase client & global DB methods
├── core/               # App-wide engines
│   ├── router.js       # Handles page/view transitions
│   └── store.js        # Global state (loadState, saveState)
├── features/           # Independent business logic "slices"
│   ├── shop/           # Shop & Rewards logic
│   ├── study/          # Quiz, MatchGame, & FlashSession logic
│   └── social/         # Daily challenge & XP logic
├── ui/                 # Reusable UI interactions
│   └── components/     # logic for shared components (Modals, Nav)
└── utils/              # Pure helper functions (Dates, Crypto)

------------------------------
## Phase 2: Decoupling app.js
Your current app.js contains mixed responsibilities. Break it down by moving functions into their respective domain modules using export. [1, 5] 

| Feature Domain | Functions to Extract (from your Image) |
|---|---|
| api/supabase.js | applyShopSnapshot, recordPurchaseEntry |
| features/study/ | runQuiz, runMatchGame, getTopicQuizBank |
| features/social/ | ensureDailyChallenge, addXp, getTimeTracker |
| core/store.js | loadState, saveState, normalizeState |
| utils/index.js | formatDurationCountdown, bufToB64, encryptPayload |

------------------------------
## Phase 3: The Implementation (Code Examples)## 1. The Global Provider (src/api/supabase.js)
Initialize Supabase once and export the client for the rest of your app to use. [6] 

import { createClient } from 'https://jsdelivr.net';
export const supabase = createClient('PROJECT_URL', 'ANON_KEY');
export async function saveUserProgress(data) {
    const { error } = await supabase.from('progress').upsert(data);
    if (error) console.error('Sync failed:', error);
}

## 2. Feature Logic (src/features/study/quiz.js)
Keep specialized logic isolated. Import only what is needed. [7] 

import { supabase } from '../../api/supabase.js';import { updateTopbar } from '../../ui/topbar.js';
export async function runQuiz(topicId) {
    const questions = await getQuestions(topicId);
    // ... quiz logic
    updateTopbar(); // Triggers UI update after completion
}

## 3. Entry Point (index.html & app.js)
In your HTML, use type="module" to enable these imports. Your main app.js now acts as an orchestrator rather than a container for all logic. [5] 

<!-- index.html -->
<script type="module" src="./src/app.js"></script>

// src/app.jsimport { initStore } from './core/store.js';import { renderHome } from './ui/home.js';
async function bootstrap() {
    await initStore(); // Load initial state from Supabase
    renderHome();      // Initial UI draw
}

bootstrap();

------------------------------
## Phase 4: Scaling Strategies

* Lazy Loading: Use import() to load feature modules only when needed (e.g., loading the shop.js logic only when the user clicks the Shop icon) to keep initial load times fast.
* HTML Templates: Use the native <template> tag in your HTML files to define UI snippets. Your JS modules can then clone these templates and fill them with data, keeping HTML out of your JavaScript strings.
* Custom Events: Use window.dispatchEvent(new CustomEvent('xp-gained')) to communicate between modules without creating tight dependencies. [1, 8, 9] 
* 
