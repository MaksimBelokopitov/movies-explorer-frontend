import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function Header({openPopup}){

  const appContext = useContext(AppContext);

  return (
    <header className={`header ${!appContext.isMain&&'header_white'}`}>
      <NavLink
        className="header__link"
        to={'/'}>
      </NavLink>
      <Navigation />
      {appContext.isLogin&&<ProfileButton />}
      {appContext.isLogin&&<button className={`header__burger ${!appContext.isMain&&'header__burger_black'}`} onClick={openPopup}></button>}
    </header>
  );
};

export default Header