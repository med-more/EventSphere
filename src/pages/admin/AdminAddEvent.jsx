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
    <div className="min-h-screen bg-dark-black py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Link to="/admin/events" className="text-bright-orange hover:text-bright-orange/80 mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour aux événements
                </Link>

                <div className="bg-dark-grey border border-bright-orange/20 rounded-2xl p-6">
                    <h1 className="text-3xl font-bold text-light-beige mb-6">Nouvel événement</h1>

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
                                Créer l'événement
                            </button>
                            <Link to="/admin/events" className="btn-secondary flex-1 text-base py-3 text-center">
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}



export default AdminAddEvent