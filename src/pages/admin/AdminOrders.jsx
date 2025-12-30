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
  return (
    <div>AdminOrders</div>
  )
}

export default AdminOrders