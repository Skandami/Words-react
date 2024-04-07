import React, { useState, useEffect, useRef } from "react";
import "./components/styles/mainPageButtonStyles.css";
import Header from "./Header";
import Footer from "./Footer";
import translationsData from "./components/data/translations.json";
import WordCard from "./components/card/WordCard";
import picture from "./assets/dog.png";
import List from "./components/card/List";
import { useLocalStorage } from "react-use";

export default function MainPage() {
  const [englishWord, setEnglishWord] = useState("");
  const [translation, setTranslation] = useState(null);
  const [wordsLearned, setWordsLearned] = useState(0);
  const [translatedWords, setTranslatedWords] = useState([]);
  const [savedTranslatedWords, setSavedTranslatedWords] = useLocalStorage(
    "translatedWords",
    []
  ); // кастомный хук useLocalStorage для сохранения данных в localStorage

  const translateButtonRef = useRef(null); // ссылка для кнопки "Translate"

  const translateWord = () => {
    const foundTranslation = translationsData.translations.find(
      (word) => word.english.toLowerCase() === englishWord.toLowerCase()
    );
    setTranslation(foundTranslation);
    setWordsLearned((prevWordsLearned) => prevWordsLearned + 1);

    // добавление переведенного слова к списку
    if (foundTranslation) {
      setTranslatedWords([...translatedWords, foundTranslation]);
      setSavedTranslatedWords([...savedTranslatedWords, foundTranslation]); // Сохранение переведенных слов в localStorage
    }
  };

  useEffect(() => {
    //  фокус на кнопке "Translate"
    if (translation) {
      translateButtonRef.current.focus();
    }
  }, [translation]);

  const handleRemoveWord = (index) => {
    // копия массива translatedWords
    const updatedWords = [...translatedWords];
    // удаление слова определнного индекса
    updatedWords.splice(index, 1);
    // обновление измененного массива
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
            <h2>
              <div className="count">Words Learned: {wordsLearned}</div>
            </h2>
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
                  {translation && (
                    <WordCard
                      english={translation.english}
                      transcription={translation.transcription}
                      russian={translation.russian}
                    />
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
