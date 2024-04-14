import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WordsProvider } from "./MainContext"; // Импорт провайдер контекста

ReactDOM.createRoot(document.getElementById("root")).render(
  <WordsProvider>
    <App />
  </WordsProvider>
);
