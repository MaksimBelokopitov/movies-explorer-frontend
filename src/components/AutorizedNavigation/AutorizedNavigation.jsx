import './AutorizedNavigation.css';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function AutorizedNavigation(){

  const appContext = useContext(AppContext);

  return(
    <nav className="nav">
      {appContext.isPopupOpen?
        <ul className="nav__list-popup">
          <li className="nav__item">
            <NavLink
              className={`nav__link-popup ${appContext.isMain && "nav__link-popup_active"}`}
              to={'/'}>
              Главная
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={`nav__link-popup ${appContext.isMovies && "nav__link-popup_active"}`}
              to={'/movies'}>
              Фильмы
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={`nav__link-popup ${appContext.isSavedMovies && "nav__link-popup_active"}`}
              to={'/saved-movies'}>
              Сохраненые фильмы
            </NavLink>
          </li>
        </ul>
        :
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className={`nav__link ${appContext.isMain&&'nav__link_white'}`}
              to={'/movies'}>
              Фильмы
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={`nav__link ${appContext.isMain&&'nav__link_white'}`}
              to={'/saved-movies'}>
              Сохраненые фильмы
            </NavLink>
          </li>
        </ul>
      }
    </nav>
  );
};

export default AutorizedNavigation