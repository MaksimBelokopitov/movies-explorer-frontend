import "./Navigation.css";
import AutorizedNavigation from '../AutorizedNavigation/AutorizedNavigation'
import LoginNavigation from '../LoginNavigation/LoginNavigation'

function Navigation({isLogin}){

  return (
    <div className="navigation">
      {isLogin?
        <AutorizedNavigation  />
        :
        <LoginNavigation />
      }
    </div>
  );
}

export default Navigation