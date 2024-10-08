import React, { useState } from 'react';
import Flashcard from './components/Flashcard';
import flashcardsData from './data';
import './App.css';

function App() {
  const [shuffledFlashcards, setShuffledFlashcards] = useState(flashcardsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetFlip, setResetFlip] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const shuffleFlashcards = () => {
    const shuffled = [...shuffledFlashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledFlashcards(shuffled);
    setCurrentIndex(0);
    setResetFlip(true);
    setFeedback('');
  };

  const resetQuiz = () => {
    shuffleFlashcards();
    setStreak(0);
    setLongestStreak(0);
    setFeedback('');
  };


  const handleNext = () => {
    if (currentIndex < shuffledFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('You have reached the end of the flashcards. The deck will be reshuffled.');
      shuffleFlashcards();
    }
    setResetFlip(true);
    setFeedback('');
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResetFlip(true);
      setFeedback('');
    }
  };

  const [correctCards, setCorrectCards] = useState(new Set());

  const onSubmitAnswer = (userAnswer) => {
    if (userAnswer.toLowerCase() === currentCard.answer.toLowerCase()) {
      setFeedback('Correct!');
      if (!correctCards.has(currentCard.id)) {
        setCorrectCards(new Set([...correctCards, currentCard.id]));
        setStreak(streak + 1);
        setLongestStreak(Math.max(streak + 1, longestStreak));
      }
    } else {
      setFeedback('Incorrect. Try again next time.');
      setStreak(0);
    }
  };

  if (shuffledFlashcards.length === 0) {
    return <div>Loading...</div>;
  }

  const currentCard = shuffledFlashcards[currentIndex];

  return (
    <div className="app">
      <h1>Comprehensive Quiz</h1>
      <p className="description">Test your knowledge with this quiz!</p>
      <p>
        Card {currentIndex + 1} of {shuffledFlashcards.length}
        <p>Current Streak: {streak} Longest Streak: {longestStreak} </p>
      </p>

      <Flashcard card={currentCard} resetFlip={resetFlip} onSubmitAnswer={onSubmitAnswer} feedback={feedback} currentIndex={currentIndex} />

      <p>{feedback}</p>
      <div className="buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          ←
        </button>
        <button onClick={handleNext}> →</button>
        <button onClick={shuffleFlashcards}>Shuffle Cards</button>
        <button onClick={resetQuiz}>Reset Quiz</button>
      </div>
    </div>
  );
}

export default App;