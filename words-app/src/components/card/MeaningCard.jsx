import React, { useState } from "react";

export default function MeaningCard() {
  const [isEnglish] = useState(true);
  const [title, setTitle] = useState(getRandomWord());

  function getRandomWord() {
    const randomWords = [
      { english: "apple", russian: "яблоко" },
      { english: "banana", russian: "банан" },
      { english: "orange", russian: "апельсин" },
      { english: "strawberry", russian: "клубника" },
      { english: "grape", russian: "виноград" },
      { english: "watermelon", russian: "арбуз" },
      { english: "pineapple", russian: "ананас" },
      { english: "kiwi", russian: "киви" },
      { english: "cherry", russian: "вишня" },
      { english: "pear", russian: "груша" },
    ];
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    return randomWords[randomIndex];
  }

  const changeWord = () => {
    setTitle(getRandomWord());
  };

  return (
    <div onClick={changeWord} className="translation-card">
      <span>click me</span>
      <h2>{isEnglish ? title.english : title.russian}</h2>
      <div className="card-content">
        {isEnglish ? title.russian : title.english}
      </div>
    </div>
  );
}
