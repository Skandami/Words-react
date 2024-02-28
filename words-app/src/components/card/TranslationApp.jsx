
import { useState } from 'react';
import translationsData from '../../translations.json';
import TranslationCard from './TranslationCard';


function TranslationApp() {
  const [englishWord, setEnglishWord] = useState('');
  const [translation, setTranslation] = useState(null);

  const translateWord = () => {
    const foundTranslation = translationsData.translations.find(word => word.english.toLowerCase() === englishWord.toLowerCase());
    setTranslation(foundTranslation);
  };

  return (
    <div className="app">
      <input className='input'
        type="text"
        value={englishWord}
        onChange={(e) => setEnglishWord(e.target.value)}
        placeholder="Enter word in English"
      />
      <button className='button' onClick={translateWord}>Translate</button>
      <div className="card-container">
        {translation && <TranslationCard english={translation.english} russian={translation.russian} />}
      </div>
    </div>
  );
}

export default TranslationApp;
