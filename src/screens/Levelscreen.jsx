import { useState, useEffect } from "react";
import "./Levelscreen.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const fallbackQuestions = {
    saving: {
        1: {
            prompt: "_____ means keeping some money for later.",
            choices: ["Saving", "Spending", "Losing"],
            correct: 0,
        },
        2: {
            prompt: "Saving helps you reach your _____.",
            choices: ["goal", "friend", "school"],
            correct: 0,
        },
        3: {
            prompt: "A _____ is something you're saving for.",
            choices: ["goal", "problem", "book"],
            correct: 0,
        },
        4: {
            prompt: "Being _____ means waiting to buy what you want.",
            choices: ["patient", "quick", "loud"],
            correct: 0,
        },
        5: {
            prompt: "When you save enough, you feel _____!",
            choices: ["accomplishment", "sad", "tired"],
            correct: 0,
        },
    },
    spending: {
        1: {
            prompt: "_____ means using money to buy things.",
            choices: ["Spending", "Hiding", "Finding"],
            correct: 0,
        },
        2: {
            prompt: "A _____ is something you must have, like food.",
            choices: ["need", "want", "toy"],
            correct: 0,
        },
        3: {
            prompt: "_____ spending means thinking before you buy.",
            choices: ["Smart", "Fast", "Silly"],
            correct: 0,
        },
        4: {
            prompt: "Every time you spend, you make a _____.",
            choices: ["choice", "mess", "friend"],
            correct: 0,
        },
        5: {
            prompt: "Find a _____ between spending and saving.",
            choices: ["balance", "problem", "game"],
            correct: 0,
        },
    },
    management: {
        1: {
            prompt: "_____ management means making a plan for your money.",
            choices: ["Money", "Time", "Food"],
            correct: 0,
        },
        2: {
            prompt: "A _____ is a plan for how to use your money.",
            choices: ["budget", "story", "picture"],
            correct: 0,
        },
        3: {
            prompt: "_____ means keeping count of your money.",
            choices: ["Tracking", "Jumping", "Running"],
            correct: 0,
        },
        4: {
            prompt: "Money you get for doing chores is called _____.",
            choices: ["income", "candy", "homework"],
            correct: 0,
        },
        5: {
            prompt: "Managing money well means being _____.",
            choices: ["responsible", "sleepy", "silly"],
            correct: 0,
        },
    },
};

export default function LevelScreen({ state, dispatch }) {
    const { currentSection, currentLevel } = state;
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    
    const [genQuestion, setGenQuestion] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelectedChoice(null);
        setShowFeedback(false);
        setGenQuestion(null);

        const fetchQuestion = async () => {
            if (!genAI) return;
            
            setLoading(true);
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                
                const prompt = `Generate a fill-in-the-blank question about financial literacy topic "${currentSection}" for a 10-year-old kid. 
                Level difficulty: ${currentLevel}/5.
                Return ONLY valid JSON with this format:
                {
                    "prompt": "The question text with _____ for the blank",
                    "choices": ["Wrong Answer", "Correct Answer", "Wrong Answer"],
                    "correct": 1
                }
                Ensure the correct index matches the correct choice position (0, 1, or 2).`;

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();
                
                const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
                const data = JSON.parse(jsonStr);

                if (data.prompt && data.choices && typeof data.correct === 'number') {
                    setGenQuestion(data);
                }
            } catch (error) {
                console.error("Gemini API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [currentSection, currentLevel]);

    const question = genQuestion || fallbackQuestions[currentSection]?.[currentLevel] || {
        prompt: "Fill in the blank!",
        choices: ["Option 1", "Option 2", "Option 3"],
        correct: 0,
    };

    const handleChoiceClick = index => {
        setSelectedChoice(index);
        setShowFeedback(true);
    };

    const handleSubmit = () => {
        const isCorrect = selectedChoice === question.correct;
        dispatch({ type: "ANSWER_LEVEL", correct: isCorrect });
    };

    const isCorrect = selectedChoice === question.correct;

    return (
        <div className='level-screen'>
            <div className='level-content'>
                <div className='level-header'>
                    <span className='level-number'>Level {currentLevel}</span>
                    <span className='section-name'>{currentSection}</span>
                </div>

                {loading ? (
                     <div className="loading-container">
                        <span className="loading-spinner">🌊</span>
                        <p>Asking the Ocean Oracle...</p>
                    </div>
                ) : (
                    <>
                        <h2 className='question-prompt'>{question.prompt}</h2>

                        <div className='choices-container'>
                            {question.choices.map((choice, index) => (
                                <button
                                    key={index}
                                    className={`choice-btn ${
                                        selectedChoice === index
                                            ? showFeedback && isCorrect
                                                ? "correct"
                                                : showFeedback
                                                ? "incorrect"
                                                : "selected"
                                            : ""
                                    }`}
                                    onClick={() => handleChoiceClick(index)}
                                    disabled={showFeedback}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>

                        {showFeedback && (
                            <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
                                {isCorrect ? (
                                    <>
                                        <span className='feedback-icon'>✅</span>
                                        <p>Nice! You got it!</p>
                                    </>
                                ) : (
                                    <>
                                        <span className='feedback-icon'>💡</span>
                                        <p>Not quite! Try again!</p>
                                    </>
                                )}
                            </div>
                        )}

                        <div className='level-actions'>
                            {showFeedback ? (
                                <button className='btn-primary' onClick={handleSubmit}>
                                    {isCorrect ? "Continue" : "Try Again"}
                                </button>
                            ) : (
                                <button
                                    className='btn-primary'
                                    disabled={selectedChoice === null}
                                    onClick={() => setShowFeedback(true)}
                                >
                                    Check Answer
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
