import { useReducer, useEffect } from "react";
import StartScreen from "./screens/Startscreen";
import StoryScreen from "./screens/Storyscreen";
import MapScreen from "./screens/Mapscreen";
import LearnScreen from "./screens/Learnscreen";
import LevelScreen from "./screens/Levelscreen";
import ResultScreen from "./screens/Resultscreen";
import "./App.css";

// Initial game state
const initialState = {
    coins: 0,
    xp: 0,
    fishLevel: 1,
    currentScreen: "start",
    currentSection: null,
    currentLevel: 0,
    storySeen: false,
    sections: {
        saving: { completed: 0, hp: 100, badge: false },
        spending: { completed: 0, hp: 100, badge: false },
        management: { completed: 0, hp: 100, badge: false },
    },
    lastAnswer: null,
};

// Game reducer
function gameReducer(state, action) {
    switch (action.type) {
        case "NEW_GAME":
            return { ...initialState, currentScreen: "story" };

        case "LOAD_GAME":
            return { ...action.payload, currentScreen: "map" };

        case "SET_SCREEN":
            return { ...state, currentScreen: action.screen };

        case "START_SECTION":
            return {
                ...state,
                currentSection: action.section,
                currentLevel: 1,
                currentScreen: "learn",
            };

        case "START_LEVEL":
            return { ...state, currentScreen: "level" };

        case "ANSWER_LEVEL":
            const isCorrect = action.correct;
            const damage = isCorrect ? 20 : 5;
            const coinsEarned = isCorrect ? 10 : 3;
            const xpEarned = isCorrect ? 15 : 5;

            return {
                ...state,
                coins: state.coins + coinsEarned,
                xp: state.xp + xpEarned,
                sections: {
                    ...state.sections,
                    [state.currentSection]: {
                        ...state.sections[state.currentSection],
                        hp: Math.max(0, state.sections[state.currentSection].hp - damage),
                        completed: isCorrect
                            ? state.sections[state.currentSection].completed + 1
                            : state.sections[state.currentSection].completed,
                    },
                },
                lastAnswer: { correct: isCorrect, damage, coins: coinsEarned, xp: xpEarned },
                currentScreen: "result",
            };

        case "NEXT_LEVEL":
            const nextLevel = state.currentLevel + 1;
            if (nextLevel > 5) {
                // Check if earned badge (all 5 levels completed)
                const earned = state.sections[state.currentSection].completed >= 5;
                return {
                    ...state,
                    sections: {
                        ...state.sections,
                        [state.currentSection]: {
                            ...state.sections[state.currentSection],
                            badge: earned || state.sections[state.currentSection].badge,
                        },
                    },
                    currentScreen: "map",
                    currentLevel: 0,
                    currentSection: null,
                };
            }
            return {
                ...state,
                currentLevel: nextLevel,
                currentScreen: "learn",
            };

        case "BACK_TO_MAP":
            return {
                ...state,
                currentScreen: "map",
                currentSection: null,
                currentLevel: 0,
            };

        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Auto-save to localStorage
    useEffect(() => {
        if (state.currentScreen !== "start") {
            localStorage.setItem("reefriches_save", JSON.stringify(state));
        }
    }, [state]);

    const renderScreen = () => {
        switch (state.currentScreen) {
            case "start":
                return <StartScreen dispatch={dispatch} />;
            case "story":
                return <StoryScreen dispatch={dispatch} />;
            case "map":
                return <MapScreen state={state} dispatch={dispatch} />;
            case "learn":
                return <LearnScreen state={state} dispatch={dispatch} />;
            case "level":
                return <LevelScreen state={state} dispatch={dispatch} />;
            case "result":
                return <ResultScreen state={state} dispatch={dispatch} />;
            default:
                return <StartScreen dispatch={dispatch} />;
        }
    };

    return (
        <div className='app'>
            <div className='top-bar'>
                <div className='logo'>🐟 ReefRiches</div>
                <div className='stats'>
                    <span className='coin-stat'>🪙 {state.coins}</span>
                    <span className='xp-stat'>⭐ {state.xp} XP</span>
                </div>
            </div>
            <div className='game-container'>{renderScreen()}</div>
        </div>
    );
}

export default App;
