import React, { useState } from "react";

function WordCard({ english, transcription, russian }) {
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleClick = () => {
    setDisplayIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const renderContent = () => {
    switch (displayIndex) {
      case 0:
        return <div>{english}</div>;
      case 1:
        return <div>{transcription}</div>;
      case 2:
        return <div>{russian}</div>;
      default:
        return null;
    }
  };

  return (
    <div onClick={handleClick} className="card">
      {renderContent()}
    </div>
  );
}

export default WordCard;
