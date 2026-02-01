import "./Learnscreen.css";
import lessonContent from "../data/lessonContent.json";

export default function LearnScreen({ state, dispatch }) {
  const { currentSection, currentLevel } = state;
  const lesson = lessonContent[currentSection]?.[currentLevel] || {
    title: "Let's Learn!",
        text: "Time to learn something new about money!",
  };

  // Bold key terms in text
    const formatText = text => {
        return text.split("**").map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part));
  };

  return (
        <div className='learn-screen'>
            <div className='learn-content'>
                <div className='level-badge'>Level {currentLevel}</div>
        
                <h2 className='learn-title'>{lesson.title}</h2>
        
                <div className='learn-text'>
          <p>{formatText(lesson.text)}</p>
        </div>

                <div className='learn-fish'>🐠</div>

                <button className='btn-primary' onClick={() => dispatch({ type: "START_LEVEL" })}>
          Start Level {currentLevel}
        </button>

                <button className='btn-secondary' onClick={() => dispatch({ type: "BACK_TO_MAP" })}>
          Back to Map
        </button>
      </div>
    </div>
  );
}
