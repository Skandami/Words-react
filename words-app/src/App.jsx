
import React from 'react';
import TranslationApp from './TranslationApp';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  return (<div className='container'>
    <Header /> 
    <div className="App">
      <TranslationApp />
    </div>
    <Footer /></div>
 
  );
}

export default App;
