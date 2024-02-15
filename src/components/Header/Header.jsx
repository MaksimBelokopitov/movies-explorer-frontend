import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';

function Header({openPopup, isLogin, isMain}){

  return (
    <header className={`header ${!isMain&&'header_white'}`}>
      <NavLink
        className="header__link"
        to={'/'}>
      </NavLink>
      <Navigation isLogin={isLogin} isMain={isMain}/>
      {isLogin&&<ProfileButton />}
      {isLogin&&<button className={`header__burger ${!isMain&&'header__burger_black'}`} onClick={openPopup}></button>}
    </header>
  );
};

export default Header