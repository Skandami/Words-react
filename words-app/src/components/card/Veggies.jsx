import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/clipart.png";
import MeaningCard from "./MeaningCard";
import MeaningTwoCard from "./MeaningTwoCard";
import SecondHeader from "./SecondHeader";
import Footer from "../../Footer";

export default function Veggies() {
  return (
    <div>
      <div className="header">
        <Link to="/">
          <img src={icon} className="globe" alt="globe" />
        </Link>
        <SecondHeader />
      </div>
      <div className="meaning-container">
        <MeaningTwoCard />
        <MeaningCard />
      </div>
      <Footer />
    </div>
  );
}
