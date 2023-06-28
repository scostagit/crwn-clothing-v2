import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

import { useCallback, useState, useMemo} from 'react';

//function only for test, it is not party of the project.
const sleep = (milliseconds: number) => {
  var start = new Date().getTime();
  for(var i = 0; i < 1e7; i++) {
    if(new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  //code outside useCallback is rendering every single time 
  //when the state changes.a
  const [temp, setTemp] = useState('A');

  /*useCallback
   useCallback receicves two parameters 1 function, 2 state 

   *useMemo: memorize the result of the function, not the function.
   useCallback memorize the function.
  */
   const count = 0;

  const countTo100 = useMemo(() =>{
    console.log('start');
    sleep(2000);
    console.log('end');
    const result = count +100;
    console.log(result);
    return result;
  },[]);

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout'); //this function will be rendered only once.
    console.log(temp); // Display A
    //It never will Display B, unless and set it on track array(2 parameter)
  },[]);//[temp]); //in this scnario, the letter B will be logged

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

      <Button onClick={()=> { setTemp('B');}}>Update temp</Button>
      {countTo100}
    </CartDropdownContainer>
  );
};

export default CartDropdown;