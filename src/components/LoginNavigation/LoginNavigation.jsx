import './LoginNavigation.css';
import {NavLink} from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function LoginNavigation() {

  const appContext = useContext(AppContext);

  return(
    <nav className="nav">
      <ul className="nav__list-login">
        <li className="nav__item">
          <NavLink
            className={`nav__link ${appContext.isMain&&'nav__link_white'}`}
            to={'/signup'}>
            Регистрация
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className='nav__button'
            to={'/signin'}>
            Войти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

 export default LoginNavigation