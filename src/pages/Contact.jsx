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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Le nom est requis');
            return;
        }
        if (!formData.email.trim()) {
            toast.error("L'email est requis");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("L'email n'est pas valide");
            return;
        }
        if (!formData.message.trim()) {
            toast.error('Le message est requis');
            return;
        }

        setLoading(true);

        try {
            await createContact({
                ...formData,
                submittedAt: new Date().toISOString(),
            });

            toast.success('Message envoyé avec succès!');
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            console.error('Error submitting contact form:', error);
            toast.error('Erreur lors de l\'envoi du message');
        } finally {
            setLoading(false);
        }
    };
  return (
    <div>Contact</div>
  )
}

export default Contact