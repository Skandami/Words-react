import React, { useState } from "react";

function WordCard({ english, russian }) {
  const [showTranslation, setShowTranslation] = useState(false);

  const handleClick = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div onClick={handleClick} className="card">
      {showTranslation ? <div>{russian}</div> : <div>{english}</div>}
    </div>
  );
}

export default WordCard;
