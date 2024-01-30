import React, {useState, useEffect}  from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isLogin = true;

  function handleOpenPopup() {
    setIsPopupOpen(true);
  };

  function closePopup() {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closePopup();
      }
    }
    if(isPopupOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isPopupOpen])

  return (
    <div className="app">
      <Header
        openPopup={handleOpenPopup}
        popupIsOpen={isPopupOpen}
        closePopup={closePopup}
        isLogin={isLogin}>
      </Header>
      <Main />
      <Footer />


      {isLogin&&<Popup isOpen={isPopupOpen} popupClose={closePopup} />}


    </div>
  );
}

export default App;