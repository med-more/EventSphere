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
    <div>Login</div>
  )
}

export default Login