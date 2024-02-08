import './AutorizedNavigation.css';
import { NavLink } from 'react-router-dom';

function AutorizedNavigation({popupIsOpen, isMain}){
  return(
    <nav className="nav">
      {popupIsOpen?
        <ul className={'nav__list_popup'}>
          <li className="nav__item">
            <NavLink
              className={'nav__link nav__link_popup'}
              to={'/'}>
              Главная
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={'nav__link nav__link_popup'}
              to={'/movies'}>
              Фильмы
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className={'nav__link nav__link_popup'}
              to={'/saved-movies'}>
              Сохраненые фильмы
            </NavLink>
          </li>
        </ul>
        :
        <ul className={'nav__list'}>
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