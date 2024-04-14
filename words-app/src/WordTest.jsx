// WordTest.js
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import globe from "./assets/clipart.png";
import "./App.css";
import Footer from "./Footer";
import { useLocalStorage } from "react-use";
import { WordsContext } from "./MainContext";
import LoadingIndicator from "./components/card/Loading";

export default function WordTest() {
  const context = useContext(WordsContext);
  const { words, updateWords } = context;

  const [userTranslation, setUserTranslation] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState(
    Array.from({ length: words.length }, () => null)
  );
  const [showNextWord, setShowNextWord] = useState(false);
  const [loading, setLoading] = useState(true);

  const [savedCorrectAnswers, setSavedCorrectAnswers] = useLocalStorage(
    "correctAnswers",
    []
  );

  useEffect(() => {
    setCorrectAnswers(
      savedCorrectAnswers.map(({ english, russian }) => ({
        english,
        russian,
      }))
    );
  }, [savedCorrectAnswers]);

  useEffect(() => {
    if (savedCorrectAnswers.length > 0) {
      setCorrectAnswers(savedCorrectAnswers);
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch("/api/words");

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных с сервера");
      }

      const fetchedWords = await response.json();
      updateWords(fetchedWords);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка:", error);
      setLoading(false);
    }
  };

  const handleSaveWord = async (word) => {
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(word),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных на сервер");
      } else {
        console.log("Данные успешно отправлены на сервер");
      }

      const updatedWords = await response.json();
      updateWords(updatedWords);

      setSavedCorrectAnswers([...savedCorrectAnswers, word]);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const checkTranslation = () => {
    const translation = userTranslation.trim().toLowerCase();
    const { russian: correctTranslation } = words[currentIndex] || {};
    const isCorrect = translation === correctTranslation;

    setResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[currentIndex] = isCorrect;
      return newResults;
    });

    if (isCorrect) {
      const newCorrectAnswer = { ...words[currentIndex] };
      setCorrectAnswers((prevAnswers) => [...prevAnswers, newCorrectAnswer]);
      setCurrentIndex(currentIndex + 1);
      setShowNextWord(false);
      setUserTranslation("");
      handleSaveWord(newCorrectAnswer);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="test-container">
          <div>
            <span className="icon-container">
              <Link to="/">
                <img src={globe} className="globe" alt="globe" />
              </Link>
            </span>
            <h2>Word Test</h2>
            <h3>Введите правильный перевод на русский</h3>
            <div className="word-test">
              <div className="word-test-item">
                <div className="word">{words[currentIndex]?.english}</div>
                <input
                  type="text"
                  value={userTranslation}
                  onChange={(e) => setUserTranslation(e.target.value)}
                  className={
                    results[currentIndex] !== null &&
                    userTranslation.trim() !== "" &&
                    !results[currentIndex]
                      ? "incorrect"
                      : ""
                  }
                  disabled={showNextWord}
                />
                <button
                  className="button word-test-button"
                  onClick={checkTranslation}
                  disabled={showNextWord}
                >
                  Проверить
                </button>
              </div>
            </div>
          </div>
          <div className="list-answers">
            <h3>Правильные ответы:</h3>
            <ul>
              {correctAnswers.map(({ english, russian }, index) => (
                <li key={index}>
                  {english} - {russian}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
