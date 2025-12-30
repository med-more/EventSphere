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
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard