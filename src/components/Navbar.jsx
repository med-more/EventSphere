import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const cartCount = useSelector(selectCartCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div></div>
  )
}

export default Navbar