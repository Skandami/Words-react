import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import globe from "./assets/clipart.png";
import translationsData from "./components/data/translations.json";
import "./App.css";
import Footer from "./Footer";
import { useLocalStorage } from "react-use";

export default function WordTest() {
  const [userTranslations, setUserTranslations] = useState(
    new Array(translationsData.translations.length).fill("")
  );
  const [results, setResults] = useState(
    new Array(translationsData.translations.length).fill(null)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showNextWord, setShowNextWord] = useState(true);

  const handleInputChange = (index, e) => {
    const newTranslations = [...userTranslations];
    newTranslations[index] = e.target.value;
    setUserTranslations(newTranslations);
  };

  // Получение и установка сохраненных слов
  const [savedCorrectAnswers, setSavedCorrectAnswers] = useLocalStorage(
    "correctAnswers",
    []
  );

  useEffect(() => {
    setCorrectAnswers(savedCorrectAnswers);
  }, [savedCorrectAnswers]);

  const checkTranslation = () => {
    const translation = userTranslations[currentIndex].toLowerCase();
    const correctTranslation =
      translationsData.translations[currentIndex].russian.toLowerCase();
    const result = translation === correctTranslation;
    const newResults = [...results];
    newResults[currentIndex] = result;
    setResults(newResults);

    if (result) {
      const newCorrectAnswers = [
        ...correctAnswers,
        {
          english: translationsData.translations[currentIndex].english,
          translation: translation,
        },
      ];

      setCorrectAnswers(newCorrectAnswers);
      setSavedCorrectAnswers(newCorrectAnswers); // Сохранение в localStorage

      setShowNextWord(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="test-container">
        <div>
          <span className="icon-container">
            <Link to="/">
              <img src={globe} className="globe" alt="globe" />
            </Link>
          </span>
          <h2>Word Test</h2>
          <h3>Enter correct answer</h3>
          <div className="word-test">
            <div className="word-test-item">
              <div className="word">
                {translationsData.translations[currentIndex].english}
              </div>
              <input
                type="text"
                value={userTranslations[currentIndex]}
                onChange={(e) => handleInputChange(currentIndex, e)}
                className={
                  results[currentIndex] !== null
                    ? results[currentIndex]
                      ? "correct"
                      : "incorrect"
                    : ""
                }
                disabled={!showNextWord}
              />
              {showNextWord && (
                <button
                  className="button word-test-button"
                  onClick={checkTranslation}
                >
                  Check
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="list-answers">
          <h3>Correct Answers:</h3>
          <ul>
            {correctAnswers.map((answer, index) => (
              <li key={index}>
                {answer.english} - {answer.translation}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
