import './Popup.css';
import AutorizedNavigation from '../AutorizedNavigation/AutorizedNavigation';
import ProfileButton from '../ProfileButton/ProfileButton';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function Popup({ popupClose }) {

  const appContext = useContext(AppContext);

  return (
    <div onClick={e => (e.currentTarget === e.target) && popupClose()} className={`popup ${appContext.isPopupOpen && 'popup_active'}`}>
      <div className="popup__container">
        <button className="popup__button-close" type='button' onClick={popupClose}></button>
        <AutorizedNavigation />
        <ProfileButton />
      </div>
    </div>
  );
};

 export default Popup