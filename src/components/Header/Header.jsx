import './Header.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';
import { useEffect, useState } from 'react';

function Header({openPopup, isLogin}){

  const [isMain, setIsMain] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function searchLocation() {
    if (location.pathname === '/') {
      setIsMain(true);
    }
    else {
      setIsMain(false);
    }
  };

  useEffect(() => {
    searchLocation();
  },[navigate]);

  return (
    <header className={`header ${!isMain&&'header_white'}`}>
      <NavLink
        className={"header__link"}
        to={'/'}>
      </NavLink>
      <Navigation isLogin={isLogin} isMain={isMain}/>
      {isLogin&&<ProfileButton />}
      {isLogin&&<button className={`header__burger ${!isMain&&'header__burger_black'}`} onClick={openPopup}></button>}
    </header>
  );
};

export default Header