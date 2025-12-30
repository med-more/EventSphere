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
    <div>AdminProducts</div>
  )
}

export default AdminProducts