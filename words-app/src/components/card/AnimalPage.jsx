import React from "react";
import animalsData from "../data/animals.json";
import WordCarousel from "./WordCarousel";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import globe from "../../assets/clipart.png";

export default function Animals() {
  return (
    <>
      <header className="header">
        <span className="icon-container">
          <Link to="/">
            <img src={globe} className="globe" alt="globe" />
          </Link>
        </span>
        <h3>Discover Animals</h3>
      </header>
      <div className="carousel-container">
        <WordCarousel words={animalsData.animals} />
      </div>
      <Footer />
    </>
  );
}
