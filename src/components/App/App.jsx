import React, {useState, useEffect}  from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = true;

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  function searchLocation() {
    if (location.pathname === '/') {
      setIsHeaderVisible(true);
      setIsFooterVisible(true);
    }
    else if (location.pathname === '/movies') {
      setIsHeaderVisible(true);
      setIsFooterVisible(true);
    }
    else if (location.pathname === '/saved-movies'){
      setIsHeaderVisible(true);
      setIsFooterVisible(true);
    }
    else if (location.pathname === '/profile') {
      setIsHeaderVisible(true);
      setIsFooterVisible(false);
    }
    else if (location.pathname === '/signup') {
      setIsHeaderVisible(false);
      setIsFooterVisible(false);
    }
  };

useEffect(() => {
  searchLocation();
},[navigate]);

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
      {isHeaderVisible&&
        <Header
          openPopup={handleOpenPopup}
          popupIsOpen={isPopupOpen}
          closePopup={closePopup}
          isLogin={isLogin}>
        </Header>
      }
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {isFooterVisible&&<Footer />}
      {isLogin&&<Popup isOpen={isPopupOpen} popupClose={closePopup} />}
    </div>
  );
}

export default App;