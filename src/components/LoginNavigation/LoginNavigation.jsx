import './LoginNavigation.css';
import {NavLink} from "react-router-dom";

function LoginNavigation({isMain}) {
  return(
    <nav className="nav">
      <ul className="nav__list-login">
        <li className="nav__item">
          <NavLink
            className={`nav__link ${isMain&&'nav__link_white'}`}
            to={'/signup'}>
            Регистрация
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className={'nav__button'}
            to={'/signin'}>
            Войти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

 export default LoginNavigation