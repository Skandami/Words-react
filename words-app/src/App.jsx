
import './App.css';
import TranslationApp from './components/card/TranslationApp';
import Header from './Header';
import Footer from './Footer';



export default function App() {
  return (<div className='container'>
    <Header /> 
    <div className="App">
      <TranslationApp />
    </div>
    <Footer /></div>
  );
}


