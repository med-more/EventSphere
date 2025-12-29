import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../api/axios';
import { uploadImage } from '../../api/cloudinary';

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
  return (
    <div>AdminProducts</div>
  )
}

export default AdminProducts