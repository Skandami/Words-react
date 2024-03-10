import { useState } from "react";
import translationsData from "../data/translations.json";
import animalsData from "../data/animals.json";
import MeaningCard from "./MeaningCard";
import MeaningTwoCard from "./MeaningTwoCard";
import WordCard from "./WordCard";
import WordCarousel from "./WordCarousel";
import SecondHeader from "./SecondHeader";
import ThirdHeader from "./ThirdHeader";

export default function TranslationApp() {
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
            <WordCard
              english={translation.english}
              russian={translation.russian}
            />
          )}
        </div>
      </div>
      <div className="second-header">
        <ThirdHeader />
      </div>
      <div className="carousel-container">
        <WordCarousel words={animalsData.animals} />
      </div>
      <div className="second-header">
        <SecondHeader />
      </div>
      <div className="meaning-container">
        <MeaningTwoCard />
        <MeaningCard />
      </div>
    </div>
  );
}
