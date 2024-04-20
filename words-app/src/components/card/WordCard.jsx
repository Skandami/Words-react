// WordCard.jsx
import React, { useState } from "react";
import { observer } from "mobx-react";

const WordCard = observer(({ word }) => {
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleClick = () => {
    setDisplayIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const renderContent = () => {
    if (word && word.english && word.transcription && word.russian) {
      switch (displayIndex) {
        case 0:
          return <div>{word.english}</div>;
        case 1:
          return <div>{word.transcription}</div>;
        case 2:
          return <div>{word.russian}</div>;
        default:
          return null;
      }
    } else {
      return <div>No word data available</div>;
    }
  };

  return (
    <div onClick={handleClick} className="card">
      {renderContent()}
    </div>
  );
});

export default WordCard;
