import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: '',
  });
  return (
    <div>Login</div>
  )
}

export default Login