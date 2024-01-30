import './Popup.css';
import AutorizedNavigation from '../AutorizedNavigation/AutorizedNavigation';
import ProfileButton from '../ProfileButton/ProfileButton';

function Popup({isOpen, popupClose}) {

  return (
    <div onClick={e => (e.currentTarget === e.target) && popupClose()} className={`popup ${isOpen && 'popup_active'}`}>
      <div className="popup__container">
        <button className="popup__button-close" onClick={popupClose}></button>
        <AutorizedNavigation popupIsOpen={isOpen} />
        <ProfileButton isPopupOpen={isOpen} />
      </div>
    </div>
  )
}


 export default Popup