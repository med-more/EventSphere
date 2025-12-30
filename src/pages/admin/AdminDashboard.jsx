import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEvents, getOrders } from '../../api/axios';


const AdminDashboard = () => {
  const [ stats, setStats ] = useState({
        totalEvents: 0,
        totalOrders: 0,
        totalRevenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ eventsRes, ordersRes ] = await Promise.all([
          getEvents(),
          getOrders()
        ]);

        const totalRevenue = ordersRes.data.reduce((sum, order) => sum + order.totalPrice, 0);

        setStats({
              totalEvents: eventsRes.data.length,
              totalOrders: ordersRes.data.length,
              totalRevenue: totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        window.dispatchEvent(new Event('authChange'));
        navigate('/admin/login');
  };
  return (
    <div className="min-h-screen bg-dark-black py-8 px-4">
            <div className="max-w-7xl mx-auto">


                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-bright-orange rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-dark-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-light-beige">
                                    Dashboard <span className="text-bright-orange">Admin</span>
                                </h1>
                                <p className="text-light-beige/60 text-sm">Vue d'ensemble de votre plateforme</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                    </button>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-bright-orange rounded-xl p-6 border border-bright-orange/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-dark-black/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-dark-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-dark-black/70 text-sm font-medium mb-1">Total Événements</p>
                        <p className="text-4xl font-bold text-dark-black">{stats.totalEvents}</p>
                    </div>

                    <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-bright-orange/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-light-beige/70 text-sm font-medium mb-1">Total Commandes</p>
                        <p className="text-4xl font-bold text-light-beige">{stats.totalOrders}</p>
                    </div>

                    <div className="bg-dark-grey border border-bright-orange/20 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-bright-orange/20 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-light-beige/70 text-sm font-medium mb-1">Revenu Total</p>
                                <p className="text-4xl font-bold text-bright-orange">{stats.totalRevenue.toFixed(2)} DH</p>
                    </div>
                </div>



                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-light-beige mb-4">Actions rapides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/admin/events" className="group bg-dark-grey border border-bright-orange/20 rounded-xl p-6 hover:border-bright-orange hover:scale-[1.02] transform transition-all duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="bg-bright-orange/20 p-4 rounded-xl group-hover:bg-bright-orange/30 transition-colors flex-shrink-0">
                                    <svg className="w-8 h-8 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-light-beige group-hover:text-bright-orange transition-colors mb-2">
                                        Gérer les événements
                                    </h3>
                                    <p className="text-light-beige/60 text-sm mb-4">Ajouter, modifier ou supprimer des événements</p>
                                    <div className="flex items-center text-bright-orange text-sm font-medium">
                                        Accéder
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/admin/orders" className="group bg-dark-grey border border-bright-orange/20 rounded-xl p-6 hover:border-bright-orange hover:scale-[1.02] transform transition-all duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="bg-bright-orange/20 p-4 rounded-xl group-hover:bg-bright-orange/30 transition-colors flex-shrink-0">
                                    <svg className="w-8 h-8 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-light-beige group-hover:text-bright-orange transition-colors mb-2">
                                        Voir les commandes
                                    </h3>
                                    <p className="text-light-beige/60 text-sm mb-4">Consulter toutes les commandes clients</p>
                                    <div className="flex items-center text-bright-orange text-sm font-medium">
                                        Accéder
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AdminDashboard