import React, { useState } from "react";
import "./App.css";
import Flashcard from "./routes/Flashcard";

const App = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [flashcards, setFlashcards] = useState([
    {
      frontSide: "What were the New York Jets originally called?",
      backSide: "Titans",
    },
    {
      frontSide: "What QB led the Jets to victory in Super Bowl III?",
      backSide: "Joe Namath",
    },
    {
      frontSide:
        "Which Jets WR was the first NFL player to reach 10,000 receiving yards?",
      backSide: "Don Maynard",
    },
    {
      frontSide:
        "Which Jets DE got 107½ quarterback sacks in his first 100 starts?",
      backSide: "Mark Gastineau",
    },
    {
      frontSide:
        "Which Jets LB is best known for the hit that benched Drew Bledsoe and started Tom Brady's career?",
      backSide: "Mo Lewis",
    },
    {
      frontSide:
        "Which Jets QB holds the record for most fumbles in a single game?",
      backSide: "Chad Pennington",
    },
    {
      frontSide: "Who is the New York Jets all-time leading scorer?",
      backSide: "Pat Leahy",
    },
    {
      frontSide:
        "Jets punter Steve O'Neal owns the NFL record for longest punt in football history. How long was it?",
      backSide: "98 yards",
    },
  ]);

  const handleNextCard = () => {
    setSelectedCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setUserGuess("");
    setShowFeedback(false);
  };

  const handlePreviousCard = () => {
    setSelectedCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setUserGuess("");
    setShowFeedback(false);
  };

  const handleShuffleCards = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setSelectedCardIndex(randomIndex);
    setUserGuess("");
    setShowFeedback(false);
  };

  const calculateLevenshteinDistance = (a, b) => {
    const dp = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= b.length; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }

    return dp[a.length][b.length];
  };

  const handleSubmit = () => {
    setShowFeedback(true);

    const correctAnswer = flashcards[selectedCardIndex].backSide.toLowerCase();
    const userAnswer = userGuess.toLowerCase();

    const maxAllowedDistance = 2;

    const levenshteinDistance = calculateLevenshteinDistance(
      correctAnswer,
      userAnswer
    );

    setIsCorrect(levenshteinDistance <= maxAllowedDistance);
  };

  return (
    <div className="App">
      <h1>New York Jets Fun Facts</h1>
      <h2>Click on a card to reveal the secret solution</h2>
      <Flashcard
        frontSide={flashcards[selectedCardIndex].frontSide}
        backSide={flashcards[selectedCardIndex].backSide}
      />
      <div className="input-container">
        <input
          className="user-input"
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          disabled={showFeedback}
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={showFeedback}
        >
          Submit
        </button>
      </div>
      {showFeedback && (
        <div
          className={`feedback-message ${isCorrect ? "correct" : "incorrect"}`}
        >
          {isCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}
      <div className="button-container">
        <button className="next-card-btn" onClick={handlePreviousCard}>
          Back
        </button>
        <button className="next-card-btn" onClick={handleNextCard}>
          Next
        </button>
      </div>
      <button className="next-card-btn" onClick={handleShuffleCards}>
        Shuffle Cards
      </button>
    </div>
  );
};

export default App;
