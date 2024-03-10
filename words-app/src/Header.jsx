import React from "react";
import icon from "./assets/world-wide-black-symbol.png";

function Header() {
  return (
    <header className="header">
      <h1>
        <span className="icon-container">
          <img src={icon} className="globe" alt="globe" />
        </span>
        <span className="title">Words Translator</span>
      </h1>
    </header>
  );
}

export default Header;
