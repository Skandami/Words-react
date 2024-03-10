import React from "react";
import icon from "../../assets/wild-animals.png";

export default function Header() {
  return (
    <header className="header">
      <span>
        {" "}
        <img src={icon} className="wild" alt="wild-animal" />{" "}
      </span>{" "}
      <h3>Discover Animals</h3>
    </header>
  );
}
