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

  const [formData, setFormData] = useState({
      fullName: '',
        email: '',
        phone: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
            toast.error('Le nom complet est requis');
            return;
        }
        if (!formData.email.trim()) {
            toast.error("L'email est requis");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("L'email n'est pas valide");
            return;
        }
        if (!formData.phone.trim()) {
            toast.error('Le numéro de téléphone est requis');
            return;
        }

        setLoading(true);

        try {
          const orderData = {
                customerName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                items: cartItems.map(item => ({
                    eventId: item.event.id,
                    eventName: item.event.name,
                    quantity: item.quantity,
                    price: item.event.price,
                })),
                totalPrice: total,
                orderDate: new Date().toISOString(),
            };
            await createOrder(orderData);

            try {
              const statsRes = await getStats();
              if (statsRes.data) {
                const currentStates = statsRes.data;
                const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

                await updateStats({
                  ...currentStates,
                  totalTicketsSold: currentStates.totalTicketsSold + totalQuantity,
                  eventsHosted: currentStates.eventsHosted,
                  happyCustomers: currentStates.happyCustomers + 1
                });
              }
            } catch (statsError) {
              console.error('Error updating stats:', statsError);
            }
            setShowSuccess(true);
            dispatch(clearCart());
            toast.success('Commande validée avec succès!');
            setTimeout(() => {
              navigate('/');
            }, 3000);
        } catch (error) {
          console.error('Error creating order:', error);
          toast.error('Une erreur est survenue pendant la commande');
        } finally{
          setLoading(false);
        }
  };

  if (cartItems.length === 0 && !showSuccess) {
    navigate('/cart');
    return null;
  }

  if (showSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="card max-w-md text-center animate-fade-in p-8 bg-dark-grey">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-bright-orange/20">
                        <svg className="w-10 h-10 text-bright-orange checkmark-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-light-beige mb-2">Commande confirmée!</h2>
                    <p className="text-light-beige/70 mb-6 text-sm">
                        Merci pour votre achat. Un email de confirmation a été envoyé à <span className="text-bright-orange">{formData.email}</span>
                    </p>
                    <p className="text-xs text-light-beige/50">Redirection automatique...</p>
                </div>
            </div>
        );
    }
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-light-beige mb-8 text-center">
                <span className="text-bright-orange">Finaliser</span> votre commande
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="card h-fit bg-dark-grey">
                    <h2 className="text-xl font-bold text-light-beige mb-6">Informations de contact</h2>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-light-beige/70 mb-1.5 text-xs font-medium uppercase tracking-wider">Nom complet</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Jean Dupont"
                            />
                        </div>

                        <div>
                            <label className="block text-light-beige/70 mb-1.5 text-xs font-medium uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="jean.dupont@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-light-beige/70 mb-1.5 text-xs font-medium uppercase tracking-wider">Téléphone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="+33 6 12 34 56 78"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Traitement...' : 'Confirmer la commande'}
                        </button>
                    </form>
                </div>


                <div className="card h-fit bg-dark-grey">
                    <h2 className="text-xl font-bold text-light-beige mb-6">Récapitulatif</h2>

                    <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item.event.id} className="flex justify-between items-start pb-3 border-b border-dark-grey last:border-0">
                                <div className="flex-1">
                                    <h3 className="text-light-beige font-medium text-sm">{item.event.name}</h3>
                                    <p className="text-light-beige/50 text-xs mt-0.5">Quantité: {item.quantity}</p>
                                </div>
                                <div className="text-bright-orange font-bold text-sm">
                                    {item.event.price * item.quantity} DH
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-dark-black rounded-lg p-4 border border-dark-grey">
                        <div className="flex justify-between items-center mb-2 text-sm">
                            <span className="text-light-beige/70">Sous-total</span>
                            <span className="text-light-beige">{total.toFixed(2)} DH</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 text-sm">
                            <span className="text-light-beige/70">Frais de service</span>
                            <span className="text-light-beige">0.00 DH</span>
                        </div>
                        <div className="border-t border-dark-grey pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-light-beige">Total</span>
                                <span className="text-2xl font-bold text-bright-orange">{total.toFixed(2)} DH</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Checkout