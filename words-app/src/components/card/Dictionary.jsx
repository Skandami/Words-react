import { useState } from "react";
import icon from "../../assets/clipart.png";
import translationsData from "../data/translations.json";
import WordCard from "./WordCard";
import Footer from "../../Footer";
import { Link } from "react-router-dom";

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
    <div>
      <header className="header">
        <h1>
          <span className="icon-container">
            <Link to="/">
              <img src={icon} className="globe" alt="globe" />
            </Link>
          </span>
          <span className="title">MemoLingo</span>
        </h1>
      </header>

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
      </div>
      <Footer />
    </div>
  );
}
