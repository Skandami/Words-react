// MainPage.js
import React, { useContext, useState, useEffect, useRef } from "react";
import "./components/styles/mainPageButtonStyles.css";
import Header from "./Header";
import Footer from "./Footer";
import WordCard from "./components/card/WordCard";
import List from "./components/card/List";
import { useLocalStorage } from "react-use";
import { WordsContext } from "./MainContext";
import dogImage from "./assets/dog.png";
import clickSound from "./assets/dog.mp3";
import LoadingIndicator from "./components/card/Loading";

export default function MainPage() {
  const { words, updateWords } = useContext(WordsContext);
  const [englishWord, setEnglishWord] = useState("");
  const [translation, setTranslation] = useState(null);
  const [wordsLearned, setWordsLearned] = useState(0);
  const [translatedWords, setTranslatedWords] = useState([]);
  const [savedTranslatedWords, setSavedTranslatedWords] = useLocalStorage(
    "translatedWords",
    []
  );
  const [loading, setLoading] = useState(true);

  const translateButtonRef = useRef(null);
  const audioRef = useRef(null);

  const translateWord = async () => {
    const foundTranslation = words.find(
      (word) => word.english.toLowerCase() === englishWord.toLowerCase()
    );

    // Проверка- нашлось слово или нет
    if (foundTranslation) {
      setTranslation(foundTranslation);
      setWordsLearned((prevWordsLearned) => prevWordsLearned + 1);

      setTranslatedWords([...translatedWords, foundTranslation]);
      setSavedTranslatedWords([...savedTranslatedWords, foundTranslation]);

      // Отправка данных на сервер
      try {
        const response = await fetch(
          "https://itgirlschool.justmakeit.ru/api/words",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(foundTranslation),
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при отправке данных на сервер");
        } else {
          console.log("Данные успешно отправлены на сервер");
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } else {
      // Если слово не найдено, перевод очищается
      setTranslation(null);
    }
  };

  //фокус на кнопке Translate
  useEffect(() => {
    if (translation) {
      translateButtonRef.current.focus();
    }
  }, [translation]);

  const handleRemoveWord = (index) => {
    const updatedWords = [...translatedWords];
    updatedWords.splice(index, 1);
    setTranslatedWords(updatedWords);
  };

  //вопроизведение звука при клике на собачку
  const handleClickImage = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // Выполнение загрузки слов после монтирования компонента
    fetchWords();
  }, []); // Пустой массив зависимостей означает- эффект выполнится только при монтировании компонента

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://itgirlschool.justmakeit.ru/api/words"
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных с сервера");
      }

      const fetchedWords = await response.json();
      updateWords(fetchedWords);
      setLoading(false); // Установка состояния loading в false после успешной загрузки данных
    } catch (error) {
      console.error("Ошибка:", error);
      setLoading(false); // Установка состояния loading в false в случае ошибки загрузки данных
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Header />
          <div className="App">
            <div className="description-wrapper">
              <div className="picture-container">
                <img
                  src={dogImage}
                  alt="description"
                  className="picture"
                  onClick={handleClickImage}
                />
                <p>" Begin your English learning journey with MemoLingo!"</p>
              </div>
              <div className="description">
                <h2>
                  <div className="count">Выученные слова: {wordsLearned}</div>
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
          </div>
          <Footer />
        </>
      )}
      <audio ref={audioRef} src={clickSound} />
    </div>
  );
}
