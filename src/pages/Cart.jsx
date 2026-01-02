import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../features/cart/cartSlice';


const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  console.log('cart Items', cartItems);
  console.log('Cart total', total);

  const handleQuantityChange = (eventId, newQuantity) =>{
    dispatch(updateQuantity({ eventId, quantity: newQuantity }));
  };
  
  const handleRemove = (eventId) => {
    dispatch(removeFromCart(eventId));
  };

  if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-light-beige mb-2">Votre panier est vide</h2>
                    <p className="text-light-beige/70 mb-6 text-sm">Découvrez nos événements et ajoutez vos favoris!</p>
                    <Link to="/events" className="btn-primary inline-flex">
                        Parcourir les événements
                    </Link>
                </div>
            </div>
        );
    } 
  
  return (
    <div>Cart</div>
  )
}

export default Cart