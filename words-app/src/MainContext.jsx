import React, { createContext, useState, useEffect } from "react";

const WordsContext = createContext();

const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // получение списка слов из базы данных
  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch words");
      }
      const data = await response.json();
      setWords(data);
    } catch (error) {
      setError(error);
      console.error("Ошибка при получении данных с сервера:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  //обновление списка слов
  const updateWords = (updatedWords) => {
    setWords(updatedWords);
  };

  // добавление нового слова
  const addWord = async (newWord) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://itgirlschool.justmakeit.ru/api/words",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWord),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add word");
      }
      const data = await response.json();
      setWords([...words, data]);
    } catch (error) {
      setError(error);
      console.error("Ошибка при добавлении слова:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // обновление слова
  const updateWord = async (id, updatedWord) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWord),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update word");
      }
      const data = await response.json();
      const updatedWords = words.map((word) => (word.id === id ? data : word));
      setWords(updatedWords);
    } catch (error) {
      setError(error);
      console.error("Ошибка при обновлении слова:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // удаление слова
  const deleteWord = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://itgirlschool.justmakeit.ru/api/words/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete word");
      }
      setWords(words.filter((word) => word.id !== id));
    } catch (error) {
      setError(error);
      console.error("Ошибка при удалении слова:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        loading,
        error,
        addWord,
        updateWord,
        deleteWord,
        updateWords,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};

export { WordsProvider, WordsContext };