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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-bright-orange animate-pulse font-medium">Chargement...</div>
            </div>
        );
    }
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 relative z-10">


            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-light-beige mb-2">
                    Tous les <span className="text-bright-orange">Événements</span>
                </h1>
                <p className="text-light-beige/70 text-sm">
                    Découvrez notre sélection d'événements exceptionnels
                </p>
            </div>


            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            selectedCategory === category
                                ? 'bg-bright-orange text-dark-black border-2 border-bright-orange'
                                : 'bg-dark-grey text-light-beige hover:bg-dark-grey/80 border-2 border-dark-grey hover:border-bright-orange/50'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>


            <div className="max-w-lg mx-auto mb-12 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-light-beige/50 group-focus-within:text-bright-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 bg-dark-grey border-2 border-dark-grey rounded-lg
                   text-sm text-light-beige placeholder-light-beige/40 focus:outline-none focus:border-bright-orange focus:ring-2 focus:ring-bright-orange/20
                   transition-all duration-300 hover:border-bright-orange/50"
                    placeholder="Rechercher un événement..."
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>



            {filteredEvents.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-4xl mb-3">🎫</div>
                    <h3 className="text-lg text-light-beige/70">Aucun événement trouvé</h3>
                </div>
            )}
        </div>
  )
}

export default Events