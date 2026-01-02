import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../features/cart/cartSlice';


const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  console.log('cart Items', cartItems);
  console.log('Cart total', total);
  
  
  return (
    <div>Cart</div>
  )
}

export default Cart