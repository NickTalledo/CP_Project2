import React, { useState } from "react";
import "./App.css";
import Flashcard from "./routes/Flashcard";

const App = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

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
    const randomIndex = Math.floor(Math.random() * flashcards.length);

    if (randomIndex !== selectedCardIndex) {
      setSelectedCardIndex(randomIndex);
    } else {
      handleNextCard();
    }
  };

  return (
    <div className="App">
      <h1>New York Jets Fun Facts</h1>
      <h2>Click on a card to reveal the secret solution</h2>
      <Flashcard
        frontSide={flashcards[selectedCardIndex].frontSide}
        backSide={flashcards[selectedCardIndex].backSide}
      />
      <button className="next-card-btn" onClick={handleNextCard}>
        Next Card
      </button>
    </div>
  );
};

export default App;
