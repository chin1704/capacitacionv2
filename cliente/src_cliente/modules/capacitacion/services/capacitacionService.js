import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/capacitacion';

export const getAllCapacitaciones = () => axios.get(API_URL);
export const getCapacitacionById = (id) => axios.get(`${API_URL}/${id}`);
export const createCapacitacion = (data) => axios.post(API_URL, data);
export const updateCapacitacion = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCapacitacion = (id) => axios.delete(`${API_URL}/${id}`);
