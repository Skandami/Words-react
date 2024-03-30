import React, { useState } from "react";
import WordCard from "./WordCard";

function WordCarousel({ words }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === words.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? words.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {" "}
      <p>click to see translation</p>
      <div className="arrows">
        <button onClick={goToPrevious}>{"<"}</button>
        <WordCard
          english={words[currentIndex].english}
          transcription={words[currentIndex].transcription}
          russian={words[currentIndex].russian}
        />
        <button onClick={goToNext}>{">"}</button>
      </div>
      <p>
        {currentIndex + 1} / {words.length}
      </p>
    </div>
  );
}

export default WordCarousel;
