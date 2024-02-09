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

  const [isMain, setIsMain] = useState(false);
  const [isMovies, setIsMovies] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  function searchLocation() {
    if (location.pathname === '/') {
      setIsMain(true);
      setIsMovies(false);
      setIsSavedMovies(false);
      setIsHeaderVisible(true);
      setIsFooterVisible(true);
    }
    else if (location.pathname === '/movies') {
      setIsMain(false);
      setIsMovies(true);
      setIsSavedMovies(false);
      setIsHeaderVisible(true);
      setIsFooterVisible(true);
    }
    else if (location.pathname === '/saved-movies'){
      setIsMain(false);
      setIsMovies(false);
      setIsSavedMovies(true);
      setIsHeaderVisible(true);
      setIsFooterVisible(true);
    }
    else if (location.pathname === '/profile') {
      setIsMain(false);
      setIsMovies(false);
      setIsSavedMovies(false);
      setIsHeaderVisible(true);
      setIsFooterVisible(false);
    }
    else if (location.pathname === '/signup') {
      setIsMain(false);
      setIsMovies(false);
      setIsSavedMovies(false);
      setIsHeaderVisible(false);
      setIsFooterVisible(false);
    }

    else if (location.pathname === '/signin') {
      setIsMain(false);
      setIsMovies(false);
      setIsSavedMovies(false);
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
          isLogin={isLogin}
          isMain={isMain}>
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
      {isLogin&&<Popup
        isOpen={isPopupOpen}
        isMain={isMain}
        isMovies={isMovies}
        isSavedMovies={isSavedMovies}
      popupClose={closePopup} />}
    </div>
  );
}

export default App;