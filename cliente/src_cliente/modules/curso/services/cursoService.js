import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/curso';

export const getAllCurso = () => axios.get(API_URL);
export const getCursoById = (id) => axios.get(`${API_URL}/${id}`);
export const createCurso = (data) => axios.post(API_URL, data);
export const updateCurso = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCurso = (id) => axios.delete(`${API_URL}/${id}`);