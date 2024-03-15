import React from "react";
import "./App.css";
import Header from "./Header";
import TranslationApp from "././components/card/TranslationApp";

export default function MainPage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="description">
          <p>
            Welcome to Words Translator, your Russian-English language tool!
            Our platform breaks down language barriers, making communication
            easy. Say goodbye to confusion and hello to clear translations.
            Explore, learn, and connect effortlessly with our user-friendly
            interface. Whether you're traveling or expanding your vocabulary,
            Words Translator is here to help. Join us for a smooth language
            journey!
          </p>
        </div>
        <TranslationApp />
      </div>
      <div></div>
    </div>
  );
}
