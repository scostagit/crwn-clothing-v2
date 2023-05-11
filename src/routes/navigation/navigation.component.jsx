import { Fragment} from 'react';
import { Outlet, Link} from 'react-router-dom';

import {ReactComponent as CrwnLogout} from '../../assets/crown.svg';

import './navigation.styles.scss'
;
const Navigation = () =>{
  return (
    <Fragment>
      <div  className="navigation">        
        <Link className="logo-container" to="/">
            <CrwnLogout className="logo"/>
        </Link>
        <div className="nav-links-container">            
            <Link className="nav-link" to="/shop">
                Shop
            </Link>
            <Link className="nav-link" to="/sign-in">
                Sing In
            </Link>
        </div>
      </div>
      <Outlet/>
    </Fragment> 
  );
};

export default Navigation;