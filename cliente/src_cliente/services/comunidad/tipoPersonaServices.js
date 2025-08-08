import axios from 'axios';
import {API_URL} from '../apiConfig';


export const getTipoPersona = async () => {
    try {
        const response = await axios.get(`${API_URL}/tipo_persona`); //referencia API del server = server/src/routes/comunidad.routes/index.js
        return response.data;
    } catch (error) {
        console.error('Error getting tipo_persona:', error);
        throw error;
    }
}

export const getTipoPersonaById = async (id_tipo_persona) => {
    try {
        const response = await axios.get(`${API_URL}/tipo_persona/${id_tipo_persona}`);
        return response.data;
    } catch (error) {
        console.error('Error getting tipo_persona:', error);
        throw error;
    }
}

export const createTipoPersona = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/tipo_persona`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating tipo_persona:', error);
        throw error;
    }
}

export const updateTipoPersona = async (id_tipo_persona, data) => {
    try {
        const response = await axios.put(`${API_URL}/tipo_persona/${id_tipo_persona}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating tipo_persona:', error);
        throw error;
    }
}

export const deleteTipoPersona = async (id_tipo_persona) => {
    try {
        const response = await axios.delete(`${API_URL}/tipo_persona/${id_tipo_persona}`); // variable = {id_tipo_persona} identificacion de variable dentro cadena texto
        return response.data;
    } catch (error) {
        console.error('Error deleting tipo_persona:', error);
        throw error;
    }
}

