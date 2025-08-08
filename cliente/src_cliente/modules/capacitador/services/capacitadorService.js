import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/capacitador';

export const getAllCapacitador = () => axios.get(API_URL);
export const getCapacitadorById = (id) => axios.get(`${API_URL}/${id}`);
export const createCapacitador = (data) => axios.post(API_URL, data);
export const updateCapacitador = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCapacitador = (id) => axios.delete(`${API_URL}/${id}`);