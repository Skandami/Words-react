import React from "react";
import icon from "./assets/svg.png";
import { Link } from "react-router-dom";
import "./App.css";

export default function Header() {
  return (
    <header className="header-container">
      <h1>
        <span className="icon-container">
          <Link to="/">
            <img src={icon} className="globe" alt="globe" />
          </Link>
        </span>
        <span className="title">Words Translator</span>
      </h1>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/translation">Translation</Link>
          </li>
          <li>
            <Link to="/animals">Learn Animals</Link>
          </li>
          <li>
            <Link to="/veggies">Learn Fruits and Vegetables</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
