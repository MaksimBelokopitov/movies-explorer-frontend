import './AutorizedNavigation.css';
import '../Navigation/Navigation.css';
import { NavLink } from 'react-router-dom';

function AutorizedNavigation({popupIsOpen}){
  return(
    <nav className="nav">
      <ul className={`nav__list ${popupIsOpen? 'nav__list-autorized_popup' : 'nav__list-autorized'}`}>
        {popupIsOpen&&
          <li className="nav__item">
            <NavLink
              className={`nav__link ${popupIsOpen? 'nav__link-autorized_popup' : 'nav__link-autorized'}`}
              to={'/'}>
              Главная
            </NavLink>
          </li>
        }
        <li className="nav__item">
          <NavLink
            className={`nav__link ${popupIsOpen? 'nav__link-autorized_popup' : 'nav__link-autorized'}`}
            to={'/movies'}>
            Фильмы
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className={`nav__link ${popupIsOpen? 'nav__link-autorized_popup' : 'nav__link-autorized'}`}
            to={'/saved-movies'}>
            Сохраненые фильмы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AutorizedNavigation