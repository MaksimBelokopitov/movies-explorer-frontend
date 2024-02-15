import AutorizedNavigation from '../AutorizedNavigation/AutorizedNavigation'
import LoginNavigation from '../LoginNavigation/LoginNavigation'

function Navigation({isLogin, isMain}){

  return (
    <div className="navigation">
      {isLogin?
        <AutorizedNavigation isMain={isMain} />
        :
        <LoginNavigation  isMain={isMain}/>
      }
    </div>
  );
}

export default Navigation