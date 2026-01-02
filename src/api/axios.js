import axios from 'axios';
import { testimonials, stats, categories, contacts } from '../data/staticData';


const API_URL = 'https://695303b8a319a928023a7d14.mockapi.io'


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData);
export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

export const getOrders = () => api.get('/orders');
export const createOrder = (orderData) => api.post('/orders', orderData);