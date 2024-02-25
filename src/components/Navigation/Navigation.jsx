import AutorizedNavigation from '../AutorizedNavigation/AutorizedNavigation';
import LoginNavigation from '../LoginNavigation/LoginNavigation';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function Navigation(){

  const appContext = useContext(AppContext);

  return (
    <div className="navigation">
      {appContext.isLogin?
        <AutorizedNavigation />
        :
        <LoginNavigation />
      }
    </div>
  );
};

export default Navigation