import "./Resultscreen.css";

export default function ResultScreen({ state, dispatch }) {
    const { lastAnswer, currentLevel, currentSection, sections } = state;

    if (!lastAnswer) return null;

    const { correct, damage, coins, xp } = lastAnswer;
    const sharkHp = sections[currentSection]?.hp;

    return (
        <div className='result-screen'>
            <div className='result-content'>
                <div className='battle-animation'>
                    <span className='fish-attack'>🐠</span>
                    <span className='bubbles'>🫧🫧🫧</span>
                    <span className='shark'>🦈</span>
                </div>

                <h2 className={`result-title ${correct ? "success" : "try-again"}`}>
                    {correct ? "🎉 Great Job!" : "💪 Keep Trying!"}
                </h2>

                <div className='result-stats'>
                    <div className='stat-item'>
                        <span className='stat-label'>Shark Damage:</span>
                        <span className='stat-value damage'>-{damage} HP</span>
                    </div>
                    <div className='stat-item'>
                        <span className='stat-label'>Coins Earned:</span>
                        <span className='stat-value coins'>+{coins} 🪙</span>
                    </div>
                    <div className='stat-item'>
                        <span className='stat-label'>XP Earned:</span>
                        <span className='stat-value xp'>+{xp} ⭐</span>
                    </div>
                </div>

                <p className='encouragement'>
                    {correct
                        ? "You're getting smarter every level!"
                        : "Don't give up! Review the lesson and try again!"}
                </p>

                <button className='btn-primary' onClick={() => dispatch({ type: "NEXT_LEVEL" })}>
                    {currentLevel >= 5 ? "Complete Section!" : "Next Level"}
                </button>
            </div>
        </div>
    );
}
