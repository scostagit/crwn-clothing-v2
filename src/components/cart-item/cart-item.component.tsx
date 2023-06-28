import { FC, memo } from 'react';

import { CartItemContainer, ItemDetails } from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem;
};

/* memo
memo is used to avoid desnecerry rending. Using the
react dev tools, you can go to redux profile and
check if is there any component rendering desnecessary, 
if yes, you can use the memo to solve the issue.
 */
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;