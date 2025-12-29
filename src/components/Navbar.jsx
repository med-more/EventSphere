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

  useEffect(() =>{
    const checkAuth = () =>{
      setIsAdminLoggedIn(localStorage.getItem('adminAuth') === 'true');
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChange', checkAuth);
    return() =>{
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem('adminAuth');
    setIsAdminLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
    toast.success('Déconnexion réussie');
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
     <nav className="sticky top-4 z-50 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-dark-grey/80 backdrop-blur-lg border border-bright-orange/20 md:rounded-full px-6">
                    <div className="flex justify-between items-center h-16">

                    <Link to="/" className="flex items-center group">
                        <span className="text-2xl font-bold text-light-beige group-hover:text-bright-orange transition-colors">EventSphere</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className="px-4 py-2 text-light-beige hover:text-bright-orange hover:bg-dark-grey rounded-lg transition-all font-medium">
                            Accueil
                        </Link>
                        <Link to="/events" className="px-4 py-2 text-light-beige hover:text-bright-orange hover:bg-dark-grey rounded-lg transition-all font-medium">
                            Événements
                        </Link>
                        <Link to="/contact" className="px-4 py-2 text-light-beige hover:text-bright-orange hover:bg-dark-grey rounded-lg transition-all font-medium">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAdminLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="hidden md:flex items-center gap-2 bg-dark-grey hover:bg-bright-orange text-xs font-bold text-light-beige hover:text-dark-black py-2 px-4 rounded-lg transition-all"
                                title="Se déconnecter"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Déconnexion</span>
                            </button>
                        ) : (
                            <Link
                                to="/admin/login"
                                className="hidden md:flex items-center gap-2 bg-dark-grey hover:bg-bright-orange text-xs font-bold text-light-beige hover:text-dark-black py-2 px-4 rounded-lg transition-all"
                                title="Section réservée aux administrateurs"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Admin</span>
                            </Link>
                        )}


                        <Link to="/cart" className="relative group p-2 hover:bg-dark-grey rounded-lg transition-all">
                            <svg className="w-6 h-6 text-light-beige group-hover:text-bright-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="badge">{cartCount}</span>
                            )}
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-light-beige hover:bg-dark-grey rounded-lg transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden mt-3 bg-dark-grey/95 backdrop-blur-lg border border-bright-orange/20 p-4 space-y-2 animate-fade-in shadow-2xl">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-bright-orange/20">
                                <span className="text-lg font-bold text-light-beige">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-dark-black transition-all"
                                >
                                    <svg className="w-5 h-5 text-light-beige" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <Link 
                                to="/" 
                                className="flex items-center gap-3 px-4 py-3 text-light-beige hover:text-bright-orange hover:bg-bright-orange/10 transition-all group" 
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="font-medium">Accueil</span>
                            </Link>
                            <Link 
                                to="/events" 
                                className="flex items-center gap-3 px-4 py-3 text-light-beige hover:text-bright-orange hover:bg-bright-orange/10 transition-all group" 
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">Événements</span>
                            </Link>
                            <Link 
                                to="/contact" 
                                className="flex items-center gap-3 px-4 py-3 text-light-beige hover:text-bright-orange hover:bg-bright-orange/10 transition-all group" 
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">Contact</span>
                            </Link>
                            <div className="pt-2 border-t border-bright-orange/20">
                                {isAdminLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-light-beige/70 hover:text-bright-orange hover:bg-bright-orange/10 transition-all group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="font-medium text-sm">Déconnexion</span>
                                    </button>
                                ) : (
                                    <Link 
                                        to="/admin/login" 
                                        className="flex items-center gap-3 px-4 py-3 text-light-beige/70 hover:text-bright-orange hover:bg-bright-orange/10 transition-all group" 
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span className="font-medium text-sm">Admin</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
  )
}

export default Navbar