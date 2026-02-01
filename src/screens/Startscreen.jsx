import "./Startscreen.css";
import { useState } from "react";

export default function StartScreen({ dispatch }) {
    const hasSave = localStorage.getItem("reefriches_save");
    const [isOpen, setIsOpen] = useState(false);
    const handleNewGame = () => {
        dispatch({ type: "NEW_GAME" });
    };

    const handleContinue = () => {
        const save = JSON.parse(localStorage.getItem("reefriches_save"));
        dispatch({ type: "LOAD_GAME", payload: save });
    };

    return (
        <div className='start-screen'>
            <div className='start-content'>
                <div className='button-group'>
                    <button className='btn-primary' onClick={handleNewGame}>
                        🎮 Play as Guest
                    </button>

                    {hasSave && (
                        <button className='btn-secondary' onClick={handleContinue}>
                            ↩️ Continue Game
                        </button>
                    )}
                </div>
                <p className='tagline'>Swim through the ocean of financial knowledge!</p>


                <button className='btn-text' onClick={() => setIsOpen(true)}>
                    Parent/Guardian Info
                </button>
                {isOpen && (
                    <div className='modal-overlay' onClick={() => setIsOpen(false)}>
                        <div className='modal' onClick={e => e.stopPropagation()}>
                            <h2>Parent / Guardian Info</h2>
                            <p>
                                This section contains important privacy and consent information for parents and
                                guardians.
                            </p>

                            <button onClick={() => setIsOpen(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
