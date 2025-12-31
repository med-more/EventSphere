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
  return (
    <div>Events</div>
  )
}

export default Events