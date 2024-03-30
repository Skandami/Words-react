import React from "react";

function List({ english, transcription, russian, onRemove }) {
  return (
    <div className="list-card">
      <div className="english">{english}</div>
      <div className="transcription">{transcription}</div>
      <div className="russian">{russian}</div>
      <button className="close-button" onClick={onRemove}>
        X
      </button>
    </div>
  );
}

export default List;
