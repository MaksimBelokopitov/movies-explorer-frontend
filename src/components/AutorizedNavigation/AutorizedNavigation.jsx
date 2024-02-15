import './AutorizedNavigation.css';
import { NavLink } from 'react-router-dom';

function AutorizedNavigation({popupIsOpen, isMain, isMovies, isSavedMovies,}){
  return(
    <nav className="nav">
      {popupIsOpen?
        <ul className="nav__list-popup">
          <li className="nav__item">
            <NavLink
              className={`nav__link-popup ${isMain && "nav__link-popup_active"}`}
              to={'/'}>
              Главная
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={`nav__link-popup ${isMovies && "nav__link-popup_active"}`}
              to={'/movies'}>
              Фильмы
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={`nav__link-popup ${isSavedMovies && "nav__link-popup_active"}`}
              to={'/saved-movies'}>
              Сохраненые фильмы
            </NavLink>
          </li>
        </ul>
        :
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className={`nav__link ${isMain&&'nav__link_white'}`}
              to={'/movies'}>
              Фильмы
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={`nav__link ${isMain&&'nav__link_white'}`}
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