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
import moviesApi from '../../utils/MoviesApi';
import useLocalStorageState from '../../hooks/useLocalStorageState';
import MoviesFilter from '../../utils/MoviesFilter';
import { AppContext } from '../../context/AppContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import * as api from '../../utils/MainApi';
import {
  USER_UPDATE_EMAIL_ERR,
  USER_UPDATE_ERR,
  SCREEN_WIDTH_BIG,
  SCREEN_WIDTH_MIDDLE,
  SCREEN_WIDTH_LITTLE,
  CARDS_COUNT_MANY,
  CARDS_COUNT_BIG_MIDDLE,
  CARDS_COUNT_MIDDLE,
  CARDS_COUNT_LITTLE} from '../../utils/constants';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useLocalStorageState('isLogin', false);
  const [currentUser, setCurrentUser] = useState({});

  const [isMain, setIsMain] = useState(false);
  const [isMovies, setIsMovies] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardListVisible, setCardListVisible] = useState(false);
  const [moviesList, setMoviesList] = useLocalStorageState('moviesList', []);
  const [savedMoviesList, setSavedMoviesList] = useState([])
  const [movieErr, setMovieErr] = useState(false);
  const [movieEmpty, setMovieEmpty] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [buttonMoreVisible, setButtonMoreVisible] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [profileChangeOk, setProfileChangeOk] = useState(false);
  const [filteredMovies, setFilteredMovies] = useLocalStorageState('filtredList', []);
  const [onSubmit, setOnSubmit] = useState(false);

  useEffect(() => {
   const handleResize = (event) => {
      setScreenWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  useEffect(() =>{
    if (location.pathname === '/signup'||location.pathname === '/signin'){
      navigate("/", {replace: true})
    }
    if (localStorage.getItem('jwt')) {
      api.getSavedMovies()
        .then((res) => {
          setSavedMoviesList(res);
          setFilteredSavedMovies(res);
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        });
    }
  },[isLogin]);

  useEffect(() => {
    searchLocation();
    const token = localStorage.getItem('jwt');
    if(token){
      handleTokenCheck();
    }
  },[navigate]);

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
  }, [isPopupOpen]);

  useEffect(() => {
    if(isLoading){
      setCardListVisible(false);
      setMovieErr(false);
      setMovieEmpty(false);
      setOnSubmit(true);
    }
    else{
      setOnSubmit(false)
    }
  }, [isLoading]);

  function handleTokenCheck () {
    if (localStorage.getItem('jwt')){
      api.checkToken()
      .then((data) => {
          setCurrentUser(data);
          setIsLogin(true);
      })
      .catch((err) => {
        localStorage.removeItem('jwt')
        console.log(`Ошибка.....: ${err}`);
      });
    };
  };

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

  function handleOpenPopup() {
    setIsPopupOpen(true);
  };

  function closePopup() {
    setIsPopupOpen(false);
  };

  function handleMovieSearch(data) {
    setIsLoading(true);
    const moviesLocal = localStorage.getItem('moviesList');
    if(moviesLocal === '[]'){
      moviesApi.getMovies()
        .then((res) => {
          setMoviesList(res);
          setFilteredMovies(MoviesFilter(res, data, setMovieEmpty));
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
          setMovieErr(true);
          setCardListVisible(false);
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    else{
      setFilteredMovies(MoviesFilter(moviesList, data, setMovieEmpty));
      setIsLoading(false);
    }
  }



  function handleSavedMovieSearch(data) {
    setIsLoading(true);
    setFilteredSavedMovies(MoviesFilter(savedMoviesList, data, setMovieEmpty));
    setIsLoading(false);
  }

// localStorage.clear()
  function handleCheckboxSearch(data) {
    setIsLoading(true);
    setFilteredMovies(MoviesFilter(moviesList, data, setMovieEmpty));
    setIsLoading(false);
  }

  function handleSavedCheckboxSearch(data) {
    setIsLoading(true);
    setFilteredSavedMovies(MoviesFilter(savedMoviesList, data, setMovieEmpty));
    setIsLoading(false);
  }

  // localStorage.clear()

  function showCards() {

    const movieCards = Array.from(document.querySelectorAll('.movie-card'));

    function showInitialCards(item, index, indexValue) {
      if(index <= indexValue) {
        item.classList.add('movie-card_visible');
        setButtonMoreVisible(false);
      }
      if(index > indexValue){;
        item.classList.remove('movie-card_visible')
        setButtonMoreVisible(true);
      };
    }

    movieCards.forEach((item, index) => {
      if(screenWidth >= SCREEN_WIDTH_BIG) {
        showInitialCards(item, index, CARDS_COUNT_MANY);
      }
      else if(screenWidth >=SCREEN_WIDTH_MIDDLE && window.innerWidth < SCREEN_WIDTH_BIG) {
        showInitialCards(item, index, CARDS_COUNT_BIG_MIDDLE);
      }
      else if(screenWidth >=SCREEN_WIDTH_LITTLE && window.innerWidth < SCREEN_WIDTH_MIDDLE) {
        showInitialCards(item, index, CARDS_COUNT_MIDDLE);
      }
      else if(screenWidth < SCREEN_WIDTH_LITTLE) {
        showInitialCards(item, index, CARDS_COUNT_LITTLE);
      }
    })
  };

  function showSavedCards() {

    const movieCards = Array.from(document.querySelectorAll('.movie-card'));

    movieCards.forEach((item) => {
      item.classList.add('movie-card_visible');
    })
  };

  function handleButtonMoreClick() {
    const movieCards = Array.from(document.querySelectorAll('.movie-card'));
    let countCard = 0;

    movieCards.forEach((item) => {

      if(screenWidth >= 1280) {
        if(item.offsetParent === null && countCard < 4){
          item.classList.add('movie-card_visible');
          countCard++;
        };
      }

      else if(screenWidth >=990 && window.innerWidth <= 1279) {
        if(item.offsetParent === null && countCard < 3){
          item.classList.add('movie-card_visible');
          countCard++;
        };
      }

      else if(screenWidth <= 989) {
        if(item.offsetParent === null && countCard < 2){
          item.classList.add('movie-card_visible');
          countCard++;
        }
      };

      const movieVisibleCards = Array.from(document.querySelectorAll('.movie-card_visible'));
      if(movieCards.length === movieVisibleCards.length){
        setButtonMoreVisible(false)
      }
    });
  };

  function restoreCheckboxStatus() {
    const checkbox = document.getElementById('short-film');
    const searchChecked = localStorage.getItem('searchQueryChecked') ==='true';
    if(searchChecked) {
      checkbox.checked = true
    }
  }

  function restoreSavedCheckboxStatus() {
    const checkbox = document.getElementById('short-film-saved');
    const searchChecked = localStorage.getItem('searchQuerySavedChecked') ==='true';
    if(searchChecked) {
      checkbox.checked = true
    }
  }

  function handleProfileSubmit(data, e) {
    const form = e.target.closest('form');
    setOnSubmit(true);
    api.updateUser(data)
      .then((res) => {
        console.log(res);
        setProfileChangeOk(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        form.reset();
        setIsError(true);
        if(err.stutus = 409){
          setErrorMessage(USER_UPDATE_EMAIL_ERR);
        }
        else{
          setErrorMessage(USER_UPDATE_ERR);
        }
      })
      .finally(() => {
        setOnSubmit(false)
      })
  }

  function handleSignOut(){
    api.signout()
      .then((res) => {
        console.log(res);
        localStorage.clear();
        setIsLogin(false);
        setMoviesList([]);
        navigate('/', {replace:true})

      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(data) {
    api.createMovie({data})
      .then((res) => {
        const a = [...savedMoviesList, res]
        setSavedMoviesList(a)
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleDeleteMovie(data) {

    api.deleteMovie(data)
      .then((res) => {
        console.log(res);
        api.getSavedMovies()
        .then((res) => {
          setSavedMoviesList(res);
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        });
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      });

  }

  return (
    <AppContext.Provider value={
      {
        isMain,
        isLogin,
        isMovies,
        isSavedMovies,
        setIsLogin,
        isPopupOpen,
        cardListVisible,
        setCardListVisible,
        isLoading,
        movieErr,
        setMovieErr,
        movieEmpty,
        setMovieEmpty,
        screenWidth,
        handleButtonMoreClick,
        restoreCheckboxStatus,
        restoreSavedCheckboxStatus,
        errorMessage,
        isError,
        setIsError,
        onSubmit,
        setOnSubmit
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          {isHeaderVisible&&
            <Header openPopup={handleOpenPopup} />
          }
          <Routes>
            <Route
              path='/'
              element={<Main />}
            />
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  filteredList={filteredMovies}
                  savedMoviesList={savedMoviesList}
                  movieSearch={handleMovieSearch}
                  likeMovie={handleCardLike}
                  deleteMovie={handleDeleteMovie}
                  buttonMoreVisible={buttonMoreVisible}
                  showCards={showCards}
                  checkboxSearch={handleCheckboxSearch}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  filteredList={filteredSavedMovies}
                  movieSearch={handleSavedMovieSearch}
                  deleteMovie={handleDeleteMovie}
                  showCards={showSavedCards}
                  checkboxSearch={handleSavedCheckboxSearch}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  signOut={handleSignOut}
                  handleProfileSubmit={handleProfileSubmit}
                  profileChangeOk={profileChangeOk}
                  setProfileChangeOk={setProfileChangeOk}
                />
              }
            />
            <Route path='/signup' element={<Register />} />
            <Route  path='/signin' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          {isFooterVisible&&<Footer />}
          {isLogin&&<Popup popupClose={closePopup} />}
        </div>
      </CurrentUserContext.Provider>
  </AppContext.Provider>
  );
}

export default App;