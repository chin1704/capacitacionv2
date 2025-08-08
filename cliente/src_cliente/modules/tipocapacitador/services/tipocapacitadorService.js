import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/tipo_capacitador';

export const getAllTipoCapacitador = () => axios.get(API_URL);
export const getTipoCapacitadorById = (id) => axios.get(`${API_URL}/${id}`);
export const createTipoCapacitador = (data) => axios.post(API_URL, data);
export const updateTipoCapacitador = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTipoCapacitador = (id) => axios.delete(`${API_URL}/${id}`);