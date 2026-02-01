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
                                Your child’s privacy and safety are very important to us. This game was designed with transparency in mind, so parents and guardians can clearly understand how information is handled. We collect only the minimum data needed to support gameplay and learning progress, and we do not sell or share personal information with third parties.
                            </p>
                            <p>-</p>
                            <p>
                                Any content created during play is used solely to improve the learning experience within the game. No sensitive personal details are required to play. Parental awareness and consent are encouraged before a child begins, and parents may review or request deletion of their child’s data at any time.
                            </p>
                            <p>-</p>
                            <p>
                                Our goal is to create a fun, educational environment where children can learn about financial literacy; while parents can feel confident their privacy is respected.
                            </p>
                            <p>-</p>

                            <button onClick={() => setIsOpen(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
