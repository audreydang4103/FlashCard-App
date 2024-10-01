import React, { useState, useEffect } from 'react';
import './Flashcard.css';

function Flashcard({ card, resetFlip }) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
    }, [resetFlip]);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    const subjectClass = card.subject ? `flashcard ${card.subject}` : 'flashcard';
    const flipClass = flipped ? 'flashcard-flipped' : '';

    return (
        <div className={`${subjectClass} ${flipClass}`} onClick={handleClick}>
            {!flipped ? (
                <>
                    {card.image && (
                        <img src={card.image} alt="Image for the question" className="flashcard-image" />
                    )}
                    <p>{card.question}</p>
                </>
            ) : (
                <p>{card.answer}</p>
            )}
        </div>
    );
}

export default Flashcard;