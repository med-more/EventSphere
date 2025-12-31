import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getEvents } from '../api/axios';
import { addToCart } from '../features/cart/cartSlice';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [ filteredEvents, setFilteredEvents ] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

    const categories = ['All', 'Musique', 'Art', 'Spectacle', 'Football'];

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await getEvents();
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
          toast.error('Erreur lors du chargement des événements');
        }finally{
          setLoading(false);
        }
      }
    }, []);
  return (
    <div>Events</div>
  )
}

export default Events