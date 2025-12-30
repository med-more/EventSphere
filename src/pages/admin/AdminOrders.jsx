import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../api/axios';


const AdminOrders = () => {
  const [ orders, setOrders ] = useState([]);
  const [ expandedOrder, setExpandedOrder ] = useState(null);

  useEffect(() => {
        fetchOrders();
    }, []);
  return (
    <div>AdminOrders</div>
  )
}

export default AdminOrders