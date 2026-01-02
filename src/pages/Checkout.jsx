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
    <div>Checkout</div>
  )
}

export default Checkout