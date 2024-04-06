import React from "react";
import icon from "./assets/clipart.png";
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
        <span className="title">MemoLingo</span>
      </h1>
      <h2>for beginners</h2>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/animals">Learn Animals</Link>
          </li>
          <li>
            <Link to="/veggies">Learn Fruits and Vegetables</Link>
          </li>
          <li>
            <Link to="/test">Take a test</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
