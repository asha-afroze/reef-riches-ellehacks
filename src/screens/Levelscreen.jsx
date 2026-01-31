import { useState } from 'react';
import './LevelScreen.css';

// Questions for each section and level
const questions = {
  saving: {
    1: {
      prompt: "_____ means keeping some money for later.",
      choices: ["Saving", "Spending", "Losing"],
      correct: 0
    },
    2: {
      prompt: "Saving helps you reach your _____.",
      choices: ["goal", "friend", "school"],
      correct: 0
    },
    3: {
      prompt: "A _____ is something you're saving for.",
      choices: ["goal", "problem", "book"],
      correct: 0
    },
    4: {
      prompt: "Being _____ means waiting to buy what you want.",
      choices: ["patient", "quick", "loud"],
      correct: 0
    },
    5: {
      prompt: "When you save enough, you feel _____!",
      choices: ["accomplishment", "sad", "tired"],
      correct: 0
    }
  },
  spending: {
    1: {
      prompt: "_____ means using money to buy things.",
      choices: ["Spending", "Hiding", "Finding"],
      correct: 0
    },
    2: {
      prompt: "A _____ is something you must have, like food.",
      choices: ["need", "want", "toy"],
      correct: 0
    },
    3: {
      prompt: "_____ spending means thinking before you buy.",
      choices: ["Smart", "Fast", "Silly"],
      correct: 0
    },
    4: {
      prompt: "Every time you spend, you make a _____.",
      choices: ["choice", "mess", "friend"],
      correct: 0
    },
    5: {
      prompt: "Find a _____ between spending and saving.",
      choices: ["balance", "problem", "game"],
      correct: 0
    }
  },
  management: {
    1: {
      prompt: "_____ management means making a plan for your money.",
      choices: ["Money", "Time", "Food"],
      correct: 0
    },
    2: {
      prompt: "A _____ is a plan for how to use your money.",
      choices: ["budget", "story", "picture"],
      correct: 0
    },
    3: {
      prompt: "_____ means keeping count of your money.",
      choices: ["Tracking", "Jumping", "Running"],
      correct: 0
    },
    4: {
      prompt: "Money you get for doing chores is called _____.",
      choices: ["income", "candy", "homework"],
      correct: 0
    },
    5: {
      prompt: "Managing money well means being _____.",
      choices: ["responsible", "sleepy", "silly"],
      correct: 0
    }
  }
};

export default function LevelScreen({ state, dispatch }) {
  const { currentSection, currentLevel } = state;
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const question = questions[currentSection]?.[currentLevel] || {
    prompt: "Fill in the blank!",
    choices: ["Option 1", "Option 2", "Option 3"],
    correct: 0
  };

  const handleChoiceClick = (index) => {
    setSelectedChoice(index);
    setShowFeedback(true);
  };

  const handleSubmit = () => {
    const isCorrect = selectedChoice === question.correct;
    dispatch({ type: 'ANSWER_LEVEL', correct: isCorrect });
  };

  const isCorrect = selectedChoice === question.correct;

  return (
    <div className="level-screen">
      <div className="level-content">
        <div className="level-header">
          <span className="level-number">Level {currentLevel}</span>
          <span className="section-name">{currentSection}</span>
        </div>

        <h2 className="question-prompt">{question.prompt}</h2>

        <div className="choices-container">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              className={`choice-btn ${
                selectedChoice === index
                  ? showFeedback && isCorrect
                    ? 'correct'
                    : showFeedback
                    ? 'incorrect'
                    : 'selected'
                  : ''
              }`}
              onClick={() => handleChoiceClick(index)}
              disabled={showFeedback}
            >
              {choice}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="feedback-icon">✅</span>
                <p>Nice! You got it!</p>
              </>
            ) : (
              <>
                <span className="feedback-icon">💡</span>
                <p>Not quite! Try again - look for the bold word in the lesson!</p>
              </>
            )}
          </div>
        )}

        <div className="level-actions">
          {showFeedback ? (
            <button className="btn-primary" onClick={handleSubmit}>
              {isCorrect ? 'Continue' : 'Try Again'}
            </button>
          ) : (
            <button
              className="btn-primary"
              disabled={selectedChoice === null}
              onClick={() => setShowFeedback(true)}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}