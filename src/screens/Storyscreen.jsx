import { useState } from "react";
import "./Storyscreen.css";


const storyPages = [
    {
        text: "In the colorful reef, all the fish lived happily...",
        emoji: "°‧ 𓆝 𓆟 𓆞 ·｡",
    },
    {
        text: "Until the Loan Sharks arrived! They're stealing everyone's financial freedom!",
        emoji: "★ ᯓ 🦈 ᯓ ★",
    },
    {
        text: "But you can stop them! Learn about money to become a Finance Pro!",
        emoji: ". ݁₊ ⊹ . ݁ 💸 ⊹ ₊ ݁.",
    },
    {
        text: "Collect 3 badges by mastering Saving, Spending, and Money Management!",
        emoji: "⋆｡𖦹˚｡🌟 🌟 🌟⋆｡𖦹°｡",
    },
];

export default function StoryScreen({ dispatch }) {
    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = () => {
        if (currentPage < storyPages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            dispatch({ type: "SET_SCREEN", screen: "map" });
        }
    };

    return (
        <div className='story-screen'>
            <div className='story-content'>
                <div className='story-emoji'>{storyPages[currentPage].emoji}</div>
                <p className='story-text'>{storyPages[currentPage].text}</p>

                <div className='story-progress'>
                    {storyPages.map((_, index) => (
                        <span key={index} className={`dot ${index === currentPage ? "active" : ""}`} />
                    ))}
                </div>

                <button className='btn-primary' onClick={handleNext}>
                    {currentPage < storyPages.length - 1 ? "Next" : "Start Adventure!"}
                </button>
            </div>
        </div>
    );
}
