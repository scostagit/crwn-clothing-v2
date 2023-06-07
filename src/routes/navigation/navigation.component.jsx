import { Fragment, useContext} from 'react';
import { Outlet, Link} from 'react-router-dom';

import {ReactComponent as CrwnLogout} from '../../assets/crown.svg';

import {UserContext} from '../../contexts/user.context';

import {signOutUser} from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const Navigation = () =>{

  const { currentUser } = useContext(UserContext);

  const singOutHandler = async ()=>{
    await signOutUser();    
  };

  return (
    <Fragment>
      <div  className="navigation">        
        <Link className="logo-container" to="/">
            <CrwnLogout className="logo"/>
        </Link>
        <div className="nav-links-container">            
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            {currentUser?(
              <span className="nav-link" onClick={singOutHandler}>SING OUT</span>
            ):( 
                <Link className="nav-link" to="/auth">
                    SING IN
                </Link>
            )}           
        </div>
      </div>
      <Outlet/>
    </Fragment> 
  );
};

export default Navigation;