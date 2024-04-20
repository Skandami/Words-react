import React, { useState, useEffect, useRef } from "react";
import "./components/styles/mainPageButtonStyles.css";
import Header from "./Header";
import Footer from "./Footer";
import WordCard from "./components/card/WordCard";
import picture from "./assets/dog.png";
import List from "./components/card/List";
import { useLocalStorage } from "react-use";
import WordStore from "./WordStore"; // Импортируем WordStore

export default function MainPage() {
  const [englishWord, setEnglishWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState(null); // состояние для отслеживания переведенного слова
  const [translatedWords, setTranslatedWords] = useState([]);
  const [savedTranslatedWords, setSavedTranslatedWords] = useLocalStorage(
    "translatedWords",
    []
  );

  const translateButtonRef = useRef(null);
  const [translateClicked, setTranslateClicked] = useState(false); // Состояние для отслеживания нажатия кнопки Translate

  useEffect(() => {
    // Загрузка данных при монтировании компонента
    WordStore.fetchWords();
  }, []);

  useEffect(() => {
    //  фокус на кнопке "Translate"
    if (translatedWord) {
      translateButtonRef.current.focus();
    }
  }, [translatedWord]);

  const translateWord = () => {
    // еревод слова из хранилища и устанавка его в состояние
    const foundTranslation = WordStore.words.find(
      (word) => word.english.toLowerCase() === englishWord.toLowerCase()
    );
    setTranslatedWord(foundTranslation);
    setTranslateClicked(true); // флаг нажатия кнопки Translate

    // Добавление переведенного слова в список, если найдено
    if (foundTranslation) {
      setTranslatedWords([...translatedWords, foundTranslation]);
      setSavedTranslatedWords([...savedTranslatedWords, foundTranslation]);
    }
  };

  const handleRemoveWord = (index) => {
    // Удаляние слова из списка
    const updatedWords = [...translatedWords];
    updatedWords.splice(index, 1);
    setTranslatedWords(updatedWords);
  };

  return (
    <div>
      <Header />
      <div className="App">
        <div className="description-wrapper">
          <div className="picture-container">
            <img src={picture} alt="description" className="picture" />
            <p>" Begin your English learning journey with MemoLingo!"</p>
          </div>
          <div className="description">
            <div className="app">
              <input
                className="main-input"
                type="text"
                value={englishWord}
                onChange={(e) => setEnglishWord(e.target.value)}
                placeholder="Enter word in English"
              />
              <button
                ref={translateButtonRef}
                className="button"
                onClick={translateWord}
              >
                Translate
              </button>
              <div className="wrap">
                <div className="card-container">
                  {translateClicked && translatedWord && (
                    <WordCard word={translatedWord} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="translated-words">
            {translatedWords.map((word, index) => (
              <List
                key={index}
                english={word.english}
                transcription={word.transcription}
                russian={word.russian}
                onRemove={() => handleRemoveWord(index)}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
