import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/cartSlice';
import { createOrder, getStats, updateStats } from '../api/axios';
import toast from 'react-hot-toast';


const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>Checkout</div>
  )
}

export default Checkout