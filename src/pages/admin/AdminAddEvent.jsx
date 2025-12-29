import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createEvent } from '../../api/axios';
import { uploadImage } from '../../api/cloudinary';

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
  return (
    <div>AdminAddEvent</div>
  )
}



export default AdminAddEvent