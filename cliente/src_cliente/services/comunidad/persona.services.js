import axios from 'axios';
import {API_URL} from '../apiConfig';


export const getPersonas = async () => {
    try {
        const response = await axios.get(`${API_URL}/persona`); //referencia API del server = server/src/routes/comunidad.routes/index.js
        return response.data;
    } catch (error) {
        console.error('Error getting persona:', error);
        throw error;
    }
}

export const getPersonaById = async (id_persona) => {
    try {
        const response = await axios.get(`${API_URL}/persona/${id_persona}`);
        return response.data;
    } catch (error) {
        console.error('Error getting persona:', error);
        throw error;
    }
}

export const createPersona = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/persona`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating persona:', error);
        throw error;
    }
}

export const updatePersona = async (id_persona, data) => {
    try {
        const response = await axios.put(`${API_URL}/persona/${id_persona}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating persona:', error);
        throw error;
    }
}

export const deletePersona = async (id_persona) => {
    try {
        const response = await axios.delete(`${API_URL}/persona/${id_persona}`); // variable = {id_persona} identificacion de variable dentro cadena texto
        return response.data;
    } catch (error) {
        console.error('Error deleting persona:', error);
        throw error;
    }
}

