import { useState } from "react";
import translationsData from "../../translations.json";
import TranslationCard from "./TranslationCard";
import MeaningCard from "./MeaningCard";
import MeaningTwoCard from "./MeaningTwoCard";

function TranslationApp() {
  const [englishWord, setEnglishWord] = useState("");
  const [translation, setTranslation] = useState(null);

  const translateWord = () => {
    const foundTranslation = translationsData.translations.find(
      (word) => word.english.toLowerCase() === englishWord.toLowerCase()
    );
    setTranslation(foundTranslation);
  };

  return (
    <div className="app">
      <input
        className="input"
        type="text"
        value={englishWord}
        onChange={(e) => setEnglishWord(e.target.value)}
        placeholder="Enter word in English"
      />
      <button className="button" onClick={translateWord}>
        Translate
      </button>
      <div className="wrap">
        <div className="card-container">
          {translation && (
            <TranslationCard
              english={translation.english}
              russian={translation.russian}
            />
          )}

          <div className="meaning-container">
            {" "}
            <div>
              <h3>Learn Veggies</h3>
              <MeaningTwoCard />
              <h3>Learn Fruits</h3>
              <MeaningCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranslationApp;
