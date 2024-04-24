import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AnimalPage from "./components/card/AnimalPage";
import Veggies from "./components/card/Veggies";
import WordTest from "./WordTest";
import ErrorPage from "./ErrorPage";
import ErrorBound from "../ErrorBound";

function App() {
  return (
    <HashRouter>
      <ErrorBound>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/animals" element={<AnimalPage />} />
          <Route path="/veggies" element={<Veggies />} />
          <Route path="/test" element={<WordTest />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBound>
    </HashRouter>
  );
}

export default App;
