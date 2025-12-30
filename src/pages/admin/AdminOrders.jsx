import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../api/axios';


const AdminOrders = () => {
  const [ orders, setOrders ] = useState([]);
  const [ expandedOrder, setExpandedOrder ] = useState(null);

  useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const toggleExpand (orderId) =>{
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };
  return (
    <div className="min-h-screen bg-dark-black py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/admin/dashboard" className="text-bright-orange hover:text-bright-orange/80 mb-3 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour au dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-bright-orange/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-light-beige">
                                Gestion des <span className="text-bright-orange">Commandes</span>
                            </h1>
                            <p className="text-light-beige/60 text-sm mt-1">{orders.length} commande(s) au total</p>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-dark-grey border border-bright-orange/20 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-bright-orange/20 bg-dark-black/50">
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">ID</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm">Client</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">Email</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">Téléphone</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm">Total</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">Date</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm">Détails</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-12 text-light-beige/60">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-16 h-16 text-light-beige/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <p className="text-lg font-medium mb-2">Aucune commande</p>
                                                <p className="text-sm">Les commandes apparaîtront ici</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <>
                                            <tr
                                                key={order.id}
                                                className="border-b border-dark-grey/50 hover:bg-dark-black/30 transition-colors"
                                            >
                                                <td className="py-4 px-6 text-light-beige/60 hidden md:table-cell">
                                                    <span className="font-mono text-xs">#{order.id}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="font-semibold text-light-beige">{order.customerName}</div>
                                                </td>
                                                <td className="py-4 px-6 text-light-beige/70 hidden md:table-cell text-sm">{order.email}</td>
                                                <td className="py-4 px-6 text-light-beige/70 hidden md:table-cell text-sm">{order.phone}</td>
                                            <td className="py-4 px-6">
                                                <span className="text-bright-orange font-bold text-lg">{order.totalPrice.toFixed(2)} DH</span>
                                            </td>
                                                <td className="py-4 px-6 text-light-beige/70 hidden md:table-cell text-sm">
                                                    {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        onClick={() => toggleExpand(order.id)}
                                                        className="bg-bright-orange hover:bg-bright-orange/90 text-dark-black p-2 rounded-lg transition-all hover:scale-110 flex items-center gap-2"
                                                        title={expandedOrder === order.id ? 'Masquer' : 'Voir détails'}
                                                    >
                                                        {expandedOrder === order.id ? (
                                                            <>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                                </svg>
                                                                <span className="text-xs font-medium">Masquer</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                                <span className="text-xs font-medium">Détails</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedOrder === order.id && (
                                                <tr className="bg-dark-black/50">
                                                    <td colSpan="7" className="py-6 px-6">
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <div className="w-1 h-6 bg-bright-orange rounded-full"></div>
                                                                <h4 className="text-light-beige font-semibold text-lg">Articles commandés</h4>
                                                            </div>
                                                            <div className="grid gap-3">
                                                                {order.items.map((item, index) => (
                                                                    <div key={index} className="flex justify-between items-center bg-dark-grey border border-bright-orange/10 p-4 rounded-lg">
                                                                        <div className="flex-1">
                                                                            <div className="text-light-beige font-medium">{item.eventName}</div>
                                                                            <div className="text-light-beige/50 text-sm mt-1">Quantité: {item.quantity} × {item.price} DH</div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <span className="text-bright-orange font-bold text-lg">
                                                                                {(item.price * item.quantity).toFixed(2)} DH
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex justify-between items-center pt-4 border-t border-dark-grey">
                                                                <span className="text-light-beige font-semibold">Total de la commande</span>
                                                                <span className="text-bright-orange font-bold text-xl">{order.totalPrice.toFixed(2)} DH</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default AdminOrders