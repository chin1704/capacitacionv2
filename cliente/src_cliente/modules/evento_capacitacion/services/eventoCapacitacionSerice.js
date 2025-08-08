import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/evento_capacitacion';

export const getAllEventoCapacitacion = () => axios.get(API_URL);
export const getEventoCapacitacionById = (id) => axios.get(`${API_URL}/${id}`);
export const createEventoCapacitacion = (data) => axios.post(API_URL, data);
export const updateEventoCapacitacion = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEventoCapacitacion = (id) => axios.delete(`${API_URL}/${id}`);