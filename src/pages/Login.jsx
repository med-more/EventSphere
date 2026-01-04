import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }

        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');

            window.dispatchEvent(new Event('authChange'));
            toast.success('Connexion réussie');
            navigate('/admin/dashboard');
        } else {
            toast.error('Identifiants incorrects');
        }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-black relative overflow-hidden">

            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-bright-orange rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-bright-orange rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-dark-grey border border-bright-orange/20 rounded-2xl p-8 shadow-2xl">

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-bright-orange rounded-xl mb-4">
                            <svg className="w-8 h-8 text-dark-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-light-beige mb-2">Connexion Admin</h1>
                        <p className="text-light-beige/60 text-sm">Accédez à votre espace d'administration</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div>
                            <label className="block text-light-beige mb-2 text-sm font-medium">Nom d'utilisateur</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-light-beige/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Entrez votre nom d'utilisateur"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-light-beige mb-2 text-sm font-medium">Mot de passe</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-light-beige/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Entrez votre mot de passe"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full mt-8 text-base py-3">
                            Se connecter
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-light-beige/60 hover:text-bright-orange text-sm transition-colors">
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login