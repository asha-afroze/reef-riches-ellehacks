# ReefRiches - Financial Literacy Game for Kids

An interactive, storyline-based game designed to teach kids financial literacy through fun gameplay.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
/screens
  ├── StartScreen.jsx       # Welcome screen with play/continue options
  ├── StoryScreen.jsx       # Story intro cutscene
  ├── MapScreen.jsx         # Main hub with 3 sections
  ├── LearnScreen.jsx       # Mini lesson before each level
  ├── LevelScreen.jsx       # Fill-in-the-blank gameplay
  └── ResultScreen.jsx      # Battle result after answering

App.jsx                     # Main app with game state management
App.css                     # Global styles and top bar
```

## Game Flow

1. **Start Screen** - Play as guest or continue saved game
2. **Story Intro** - Learn about the loan sharks
3. **World Map** - Choose from 3 sections (Saving, Spending, Management)
4. **Learn Screen** - Read lesson with key terms highlighted
5. **Level Screen** - Answer fill-in-the-blank questions
6. **Result Screen** - See battle animation and stats
7. Repeat levels 1-5 to earn badges!

## Features Implemented

✅ 5 core screens with navigation
✅ Game state management with useReducer
✅ Auto-save to localStorage
✅ Progress tracking (coins, XP, badges)
✅ 3 sections with 5 levels each
✅ Fill-in-the-blank questions
✅ Battle animations
✅ Responsive design

## Privacy & Safety

- No personal information collected
- All data stored locally on device
- No accounts or login required
- Kid-friendly content and design

## Next Steps to Complete

- [ ] Add matching game levels
- [ ] Add badges screen
- [ ] Add privacy/settings screen
- [ ] Add sound effects (optional)
- [ ] Add more questions/content
- [ ] Polish animations