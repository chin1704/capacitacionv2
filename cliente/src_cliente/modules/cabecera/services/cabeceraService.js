import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/cabecera';


export const getAllCabecera = () => axios.get(API_URL);
export const getCabeceraById = (id) => axios.get(`${API_URL}/${id}`);
export const createCabecera = (data) => axios.post(API_URL, data);
export const updateCabecera = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCabecera = (id) => axios.delete(`${API_URL}/${id}`);