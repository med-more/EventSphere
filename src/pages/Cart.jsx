import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../features/cart/cartSlice';


const Cart = () => {
  return (
    <div>Cart</div>
  )
}

export default Cart