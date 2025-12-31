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

    useEffect(()=> {
      let result = events;

      const categoryParam = searchParams.get('category');
      const activeCategory = categoryParam || selectedCategory; 

      if (categoryParam && categoryParam !== selectedCategory) {
        setSelectedCategory(categoryParam);
      }

      if (activeCategory !== 'All') {
        result = result.filter(event => event.category === activeCategory);
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(event =>
          event.name.toLowerCase().includes(query)
        );
      }

      setFilteredEvents(result);
    }, [events, selectedCategory, searchQuery, searchParams]);

    const handleCategoryChange = (category) =>{
      setSelectedCategory(category);
    };

    const handleAddToCart = (event) => {
      dispatch(addToCart(event));
      toast.success(`${event.name} ajouté au panier!`, {
            icon: '🎫',
            style: {
                borderRadius: '10px',
                background: '#1e293b',
                color: '#fff',
            },
        });
    };
  return (
    <div>Events</div>
  )
}

export default Events