# ReefRiches 🐠💰 - Financial Literacy Game for Kids

> **Submitted to [ElleHacks 2026](https://ellehacks.com/)**  
> 🔗 **[View Project on Devpost](https://devpost.com/software/reefriches?ref_content=my-projects-tab&ref_feature=my_projects)**

**ReefRiches** is an interactive, gamified web application designed to teach children (ages 7-12) the fundamentals of financial literacy. By turning learning into an underwater adventure, kids navigate through modules on **Saving**, **Spending**, and **Management**, battling "Loan Sharks" with their knowledge!

To ensure the experience remains fresh and challenging, we integrated **Google Gemini 2.5 Flash** to generate context-aware quiz questions dynamically. This adaptive approach ensures that no two playthroughs are exactly the same.

---

## 🎮 Key Features

### 🤖 AI-Powered Learning
*   **Dynamic Content:** Uses **Google Gemini API** to generate unique fill-in-the-blank questions based on lesson context.
*   **Adaptive Fallback:** Includes a robust offline mode with pre-set questions ensuring the game works 100% of the time, even without an API connection.

### ⚔️ Gamification & Battle System
*   **Defeat the "Loan Shark":** Each correct answer deals damage to the section boss (Shark HP).
*   **Rewards System:** Earn **Coins 🪙** and **XP ⭐** for every victory.
*   **Progress Tracking:** Visual progress bars, persistent save states, and collectable badges for completing modules.

### 🛡️ Privacy & Safety First
*   **No Data Collection:** All game progress is stored locally on the device (`localStorage`).
*   **Parental Controls:** Dedicated "Parent/Guardian Info" modal explaining data usage.
*   **Kid-Friendly UI:** Simple navigation, large text, and engaging visuals.

---

## 🛠️ Tech Stack

*   **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **AI Integration:** [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (Gemini 2.5 Flash)
*   **State Management:** React `useReducer` for complex game logic & `Context`
*   **Styling:** Pure CSS with responsive design

---

## 🚀 Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/reef-riches.git
    cd reef-riches
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
    *(Note: The game works in "Offline Mode" with fallback questions if no key is provided!)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 🗺️ Game Flow

1.  **Start Screen**: Choose to "Play as Guest" or "Continue" from a previous session. Parents can view the privacy policy here.
2.  **Story Intro**: Meet the cast and understand the mission—saving the reef from financial ignorance!
3.  **World Map**: Select one of 3 educational modules:
    *   🟣 **Saving**: Goal setting & patience.
    *   🔵 **Spending**: Needs vs. Wants.
    *   🟢 **Management**: Budgeting & income.
4.  **Learn Phase**: Short, digestible lessons with key terms highlighted.
5.  **Battle Phase (Level Screen)**: Answer AI-generated questions to attack the Shark.
    *   ✅ **Correct**: Deal 20 DMG, earn 10 Coins + 15 XP.
    *   ❌ **Incorrect**: Deal 5 DMG (chipping away!), earn fewer rewards.
6.  **Victory**: Deplete the Shark's 100 HP to earn the Module Badge!

---

## What's Next for ReefRiches

*   **Expanded Content:** Adding modules for "Investing" and "Charity".
*   **Shop System:** Use earned **Coins** to buy accessories for the player avatar (Orange Fishy).
*   **Leaderboards:** Optional opt-in social features to compete with friends.
*   **Voiceover:** Text-to-speech support for younger players who are still learning to read.
