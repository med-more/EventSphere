import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createEvent } from '../../api/axios';
import { uploadImage } from '../../api/cloudinary';
import toast from 'react-hot-toast';

const AdminAddEvent = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Musique',
        image: '',
        price: '',
        date: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) =>{
    const file = e.target.files[0];
    if(!file) return;
    
    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev=> ({...prev, image: imageUrl}));
    } catch (error) {
      toast.error("Erreur lors de l'upload de l'image");
    } finally{
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await createEvent(eventData);
      navigate('/admin/events');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Erreur lors de la création');
    }
  };
  return (
    <div>AdminAddEvent</div>
  )
}



export default AdminAddEvent