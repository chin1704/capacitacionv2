import axios from 'axios';

const API_URL = 'http://localhost:5000/api/fcc/categoria_curso';

export const getAllCategoriaCurso = () => axios.get(API_URL);
export const getCategoriaCursoById = (id) => axios.get(`${API_URL}/${id}`);
export const createCategoriaCurso= (data) => axios.post(API_URL, data);
export const updateCategoriaCurso = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCategoriaCurso = (id) => axios.delete(`${API_URL}/${id}`);
