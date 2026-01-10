import { useState } from 'react';
import { createContact } from '../api/axios';
import toast from 'react-hot-toast';

const Contact = () => {
   const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
  return (
    <div>Contact</div>
  )
}

export default Contact