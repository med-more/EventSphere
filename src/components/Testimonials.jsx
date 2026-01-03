import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTestimonials } from '../api/axios';
import toast from 'react-hot-toast';



const Testimonials = () => {
    const [ testimonials, setTestimonials ] = useState([]);
    const navigate = useNavigate();
  return (
    <div>Testimonials</div>
  )
}

export default Testimonials