import { useState } from 'react';
import { createContact } from '../api/axios';
import toast from 'react-hot-toast';

const Contact = () => {
   const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

     const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
  return (
    <div>Contact</div>
  )
}

export default Contact