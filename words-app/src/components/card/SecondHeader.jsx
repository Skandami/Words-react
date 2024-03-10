import React from "react";
import icon from "../../assets/heart.png";

export default function Header() {
  return (
    <header className="header">
      <h3>Immerse Yourself in Vegetables and Fruits Learning</h3>
      <img src={icon} className="wild" alt="wild-animal" />
    </header>
  );
}
