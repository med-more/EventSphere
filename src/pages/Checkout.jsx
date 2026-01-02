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
  return (
    <div>Checkout</div>
  )
}

export default Checkout