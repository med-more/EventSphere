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
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard