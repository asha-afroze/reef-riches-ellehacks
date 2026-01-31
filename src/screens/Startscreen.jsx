import "./Startscreen.css";

export default function StartScreen({ dispatch }) {
    const hasSave = localStorage.getItem("reefriches_save");

    const handleNewGame = () => {
        dispatch({ type: "NEW_GAME" });
    };

    const handleContinue = () => {
        const save = JSON.parse(localStorage.getItem("reefriches_save"));
        dispatch({ type: "LOAD_GAME", payload: save });
    };

return (
    <div className="start-screen">
        <div className="start-content">
            <h1 className="game-title">Welcome to ReefRiches!</h1>
            <p className="tagline">Swim through the ocean of financial knowledge!</p>

            <div className="button-group">
            <button className="btn-primary" onClick={handleNewGame}>
                🎮 Play as Guest
            </button>

            {hasSave && (
                <button className="btn-secondary" onClick={handleContinue}>
                ↩️ Continue Game
                </button>
            )}
            </div>

            <button
            className="btn-text"
            onClick={() =>
                dispatch({ type: "SET_SCREEN", screen: "privacy" })
            }
            >
            Parent/Guardian Info
            </button>
        </div>
  </div>
);

}
