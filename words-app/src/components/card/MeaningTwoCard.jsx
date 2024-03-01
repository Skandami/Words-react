import React, { useState } from "react";

export default function MeaningTwoCard() {
  const [isEnglish] = useState(true);
  const [title, setTitle] = useState(getRandomWord());

  function getRandomWord() {
    const randomVegetables = [
      { english: "carrot", russian: "морковь" },
      { english: "potato", russian: "картошка" },
      { english: "tomato", russian: "помидор" },
      { english: "cucumber", russian: "огурец" },
      { english: "onion", russian: "лук" },
      { english: "garlic", russian: "чеснок" },
      { english: "lettuce", russian: "салат" },
      { english: "broccoli", russian: "брокколи" },
      { english: "pepper", russian: "перец" },
      { english: "spinach", russian: "шпинат" },
    ];
    const randomIndex = Math.floor(Math.random() * randomVegetables.length);
    return randomVegetables[randomIndex];
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
