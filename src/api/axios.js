import axios from 'axios';
import { testimonials, stats, categories, contacts } from '../data/staticData';


const API_URL = 'https://695303b8a319a928023a7d14.mockapi.io'


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createEvent = (eventData) => api.post('/events', eventData);
