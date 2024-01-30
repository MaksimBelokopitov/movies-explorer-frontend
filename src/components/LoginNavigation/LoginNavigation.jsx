import './LoginNavigation.css';
import '../Navigation/Navigation.css';
import {NavLink} from "react-router-dom";

function LoginNavigation() {
  return(
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            className={"nav__link nav__link-"}
            to={'/movies'}>
            Регистрация
          </NavLink>
        </li>
        <li className="nav__item">
          <button className="nav__button">
            Войти
          </button>
        </li>
      </ul>
    </nav>
  );
};

 export default LoginNavigation