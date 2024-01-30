import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import ProfileButton from '../ProfileButton/ProfileButton';
import NavBurger from '../Popup/Popup';

function Header({openPopup, isLogin}){

  function handleBurgerClick(){
    const burgerButton = document.querySelector('.header__burger');
    openPopup();
    // burgerButton.classList.toggle('header__burger_active');

};

  return (
    <header className="header">
      <NavLink
        className={"header__link"}
        to={'/'}>
      </NavLink>
      <Navigation isLogin={isLogin}/>
      {isLogin&&<ProfileButton />}
      {isLogin&&<button className="header__burger" onClick={handleBurgerClick}></button>}
    </header>
)
}

export default Header