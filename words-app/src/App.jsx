import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AnimalPage from "./components/card/AnimalPage";
import Veggies from "./components/card/Veggies";
import Dictionary from "./components/card/Dictionary";
import ErrorPage from "./ErrorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/translation" element={<Dictionary />} />
        <Route path="/animals" element={<AnimalPage />} />
        <Route path="/veggies" element={<Veggies />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
