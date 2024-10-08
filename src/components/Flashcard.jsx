import React, { useState, useEffect } from 'react';
import './Flashcard.css';

function Flashcard({ card, resetFlip, onSubmitAnswer, feedback }) {
    const [flipped, setFlipped] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        setFlipped(false);
        setUserAnswer('');
    }, [resetFlip, card]);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    const handleChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitAnswer(userAnswer);
    };

    const subjectClass = card.subject ? `flashcard ${card.subject}` : 'flashcard';
    const flipClass = flipped ? 'flashcard-flipped' : '';
    const feedbackClass = feedback === 'Correct!' ? 'input-small correct' : feedback === 'Incorrect. Try again.' ? 'input-small incorrect' : 'input-small';
    return (
        <>
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
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userAnswer" className="label-small">Guess the answer here:</label>
                    <input
                        type="text"
                        id="userAnswer"
                        value={userAnswer}
                        onChange={handleChange}
                        placeholder="Enter your answer"
                        className={feedbackClass}
                        autocomplete="off"
                    />
                    <button type="submit" className="button-small">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Flashcard;