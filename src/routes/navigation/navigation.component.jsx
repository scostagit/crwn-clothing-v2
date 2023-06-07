import { Fragment, useContext} from 'react';
import { Outlet, Link} from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {ReactComponent as CrwnLogout} from '../../assets/crown.svg';

import {UserContext} from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import {signOutUser} from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const Navigation = () =>{

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
              <CartIcon />          
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet/>
    </Fragment> 
  );
};

export default Navigation;