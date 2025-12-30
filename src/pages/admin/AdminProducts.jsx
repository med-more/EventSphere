import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../api/axios';
import { uploadImage } from '../../api/cloudinary';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [events, setEvents] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ editingEvent, setEditingEvent ] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Musique',
        image: '',
        price: '',
        date: '',
    });

    useEffect(() =>  {
      fetchEvents();
    }, []);

    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...FormData,
        [e.target.name]: e.target.value,
      });
    };

    const handleImageUpload = async (e) =>{
      const file = e.target.files[0];
      if(!file) return;

      setUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        setFormData(prev => ({ ...prev, image: imageUrl }));
      } catch (error) {
        toast.error("Erreur lors de l'upload de l'image");
      } finally{
        setUploading(false);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const eventData= {
          ...formData,
          price: parseFloat(formData.price),
        };

        if (editingEvent) {
          await updateEvent(editingEvent.id, eventData);
        } else{
          await createEvent(eventData);
        }


        fetchEvents();
        resetForm();
      } catch (error) {
        console.error('Error saving event:', error);
        toast.error('Erreur lors de la sauvegarde');
      }
    };

    const handleEdit = async (event) =>{
      setEditingEvent(event);
      setFormData({
            name: event.name,
            description: event.description,
            category: event.category,
            image: event.image,
            price: event.price.toString(),
            date: event.date,
      });
      setShowModal(true);
    };

    const handleDelete = async (id) => {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            try {
                await deleteEvent(id);
                fetchEvents();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const resetForm = () => {
      setFormData({
            name: '',
            description: '',
            category: 'Musique',
            image: '',
            price: '',
            date: '',
      });
      setEditingEvent(null);
      setShowModal(false);
    };
  return (
     <div className="min-h-screen bg-dark-black py-8 px-4">
            <div className="max-w-7xl mx-auto">


                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <Link to="/admin/dashboard" className="text-bright-orange hover:text-bright-orange/80 mb-3 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour au dashboard
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-bright-orange/20 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-bright-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-light-beige">
                                    Gestion des <span className="text-bright-orange">Événements</span>
                                </h1>
                                <p className="text-light-beige/60 text-sm mt-1">{events.length} événement(s) au total</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nouvel événement
                    </button>
                </div>



                <div className="bg-dark-grey border border-bright-orange/20 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-bright-orange/20 bg-dark-black/50">
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm">Image</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm">Nom</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">Catégorie</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">Prix</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm hidden md:table-cell">Date</th>
                                    <th className="text-left py-4 px-6 text-light-beige font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12 text-light-beige/60">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-16 h-16 text-light-beige/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-lg font-medium mb-2">Aucun événement</p>
                                                <p className="text-sm">Commencez par créer votre premier événement</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((event) => (
                                        <tr key={event.id} className="border-b border-dark-grey/50 hover:bg-dark-black/30 transition-colors">
                                            <td className="py-4 px-6">
                                                <img src={event.image} alt={event.name} className="w-16 h-16 object-cover rounded-lg border border-dark-grey" />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-light-beige">{event.name}</div>
                                                <div className="text-xs text-light-beige/50 mt-1 line-clamp-1">{event.description}</div>
                                            </td>
                                            <td className="py-4 px-6 hidden md:table-cell">
                                                <span className="bg-bright-orange/20 text-bright-orange px-3 py-1 rounded-md text-xs font-medium">
                                                    {event.category}
                                                </span>
                                            </td>
                                    <td className="py-4 px-6 hidden md:table-cell">
                                        <span className="text-bright-orange font-bold">{event.price} DH</span>
                                    </td>
                                            <td className="py-4 px-6 hidden md:table-cell">
                                                <span className="text-light-beige/70 text-sm">{event.date}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(event)}
                                                        className="bg-bright-orange hover:bg-bright-orange/90 text-dark-black p-2 rounded-lg transition-all hover:scale-110"
                                                        title="Modifier"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(event.id)}
                                                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 p-2 rounded-lg transition-all hover:scale-110 border border-red-500/30"
                                                        title="Supprimer"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>





                {showModal && (
                    <div className="fixed inset-0 bg-dark-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-dark-grey border border-bright-orange/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="sticky top-0 bg-dark-grey border-b border-bright-orange/20 px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-light-beige">
                                        {editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
                                    </h2>
                                    <p className="text-light-beige/60 text-sm mt-1">
                                        {editingEvent ? 'Mettez à jour les informations de l\'événement' : 'Remplissez les informations pour créer un nouvel événement'}
                                    </p>
                                </div>
                                <button onClick={resetForm} className="text-light-beige/70 hover:text-light-beige hover:bg-dark-black/50 p-2 rounded-lg transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-light-beige mb-2 text-sm font-medium">Nom de l'événement</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Ex: Concert de Jazz"
                                    />
                                </div>

                                <div>
                                    <label className="block text-light-beige mb-2 text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="input-field resize-none"
                                        placeholder="Décrivez votre événement..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-light-beige mb-2 text-sm font-medium">Catégorie</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="input-field"
                                        >
                                            <option value="Musique">Musique</option>
                                            <option value="Art">Art</option>
                                            <option value="Spectacle">Spectacle</option>
                                            <option value="Football">Football</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-light-beige mb-2 text-sm font-medium">Prix (DH)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="input-field"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-light-beige mb-2 text-sm font-medium">Image de l'événement</label>
                                    <div className="space-y-3">
                                        <div className="flex gap-4 items-center">
                                            <label className="cursor-pointer">
                                                <span className="btn-secondary inline-flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Choisir une image
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    disabled={uploading}
                                                />
                                            </label>
                                            {uploading && (
                                                <span className="text-bright-orange flex items-center gap-2">
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Upload en cours...
                                                </span>
                                            )}
                                        </div>
                                        {formData.image && (
                                            <div className="relative group w-fit">
                                                <img
                                                    src={formData.image}
                                                    alt="Aperçu"
                                                    className="h-32 w-32 object-cover rounded-lg border-2 border-bright-orange/30"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-light-beige mb-2 text-sm font-medium">Date de l'événement</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>

                                <div className="flex space-x-4 pt-6 border-t border-dark-grey">
                                    <button type="submit" className="btn-primary flex-1 text-base py-3">
                                        {editingEvent ? 'Mettre à jour' : 'Créer l\'événement'}
                                    </button>
                                    <button type="button" onClick={resetForm} className="btn-secondary flex-1 text-base py-3">
                                        Annuler
                                    </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
  )
}

export default AdminProducts