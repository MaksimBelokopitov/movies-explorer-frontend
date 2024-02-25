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
import { userUpdateEmailError, userUpdateError } from '../../utils/constants';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
 const [currentUser, setCurrentUser] = useState({});

  const [isMain, setIsMain] = useState(false);
  const [isMovies, setIsMovies] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardListVisible, setCardListVisible] = useState(false);
  const [savedCardListVisible, setSavedCardListVisible] = useState(true);
  const [moviesList, setMoviesList] = useLocalStorageState('moviesList', []);
  const [savedMoviesList, setSavedMoviesList] = useState([])
  const [movieErr, setMovieErr] = useState(false);
  const [movieEmpty, setMovieEmpty] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [buttonMoreVisible, setButtonMoreVisble] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if(!isLogin){
      navigate('/', {replace:true})
    }
   const handleResize = (event) => {
      setScreenWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  useEffect(() =>{
    if (localStorage.getItem('jwt')) {
      api.getSavedMovies()
        .then((res) => {
          setSavedMoviesList(res);
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
  }, [isPopupOpen])

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
      console.log('d');
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
    moviesApi.getMovies()
    .then((res) => {
      return res
    })
    .then((moviesData) =>{
      setMoviesList(MoviesFilter(moviesData, data, setMovieEmpty));
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

  function handleSavedMovieSearch(data) {
    setIsLoading(true);
    api.getSavedMovies()
    .then((res) => {
      setSavedMoviesList(MoviesFilter(res, data, setMovieEmpty));
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  function showCards() {

    const movieCards = Array.from(document.querySelectorAll('.movie-card'));

    function showInitialCards(item, index, indexValue) {
      if(index <= indexValue) {
        item.classList.add('movie-card_visible');
        setButtonMoreVisble(false);
      }
      if(index > indexValue){;
        item.classList.remove('movie-card_visible')
        setButtonMoreVisble(true);
      };
    }

    movieCards.forEach((item, index) => {
      if(screenWidth >= 1280) {
        showInitialCards(item, index, 15);
      }
      else if(screenWidth >=990 && window.innerWidth <= 1279) {
        showInitialCards(item, index, 11);
      }
      else if(screenWidth >=630 && window.innerWidth <= 989) {
        showInitialCards(item, index, 7);
      }
      else if(screenWidth <=629) {
        showInitialCards(item, index, 4);
      }
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
        setButtonMoreVisble(false)
      }
    });
  };

  function restoreCheckBoxStatus() {
    const checkbox = document.getElementById('short-film');
    const searchChecked = localStorage.getItem('searchQueryChecked') ==='true';
    if(searchChecked) {
      checkbox.checked = true
    }
  }

  function handleProfileSubmit(data, e) {
    const form = e.target.closest('form');
    console.log(data);
    api.updateUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        form.reset();
        setIsError(true);
        if(err.stutus = 409){
          setErrorMessage(userUpdateEmailError);
        }
        else{
          setErrorMessage(userUpdateError);
        }

      });
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
      .then(() => {
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
        showCards,
        handleButtonMoreClick,
        restoreCheckBoxStatus,
        buttonMoreVisible,
        errorMessage,
        isError,
        setIsError,
        savedCardListVisible,
        setSavedCardListVisible
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
                  moviesList={moviesList}
                  savedMoviesList={savedMoviesList}
                  movieSearch={handleMovieSearch}
                  likeMovie={handleCardLike}
                  deleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  deleteMovie={handleDeleteMovie}
                  moviesList={savedMoviesList}
                  movieSearch={handleSavedMovieSearch}
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
                />
              }
            />
            <Route path='/signup' element={<Register />} />
            <Route exact path='/signin' element={<Login />} />
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