import axios from 'axios';
import {API_URL} from '../apiConfig';


export const getProvincia= async () => {
    try {
        const response = await axios.get(`${API_URL}/provincia`); //referencia API del server = server/src/routes/comunidad.routes/index.js
        return response.data;
    } catch (error) {
        console.error('Error getting provincia:', error);
        throw error;
    }
}

export const getProvinciaById = async (id_provincia) => {
    try {
        const response = await axios.get(`${API_URL}/provincia/${id_provincia}`);
        return response.data;
    } catch (error) {
        console.error('Error getting provincia:', error);
        throw error;
    }
}

export const createProvincia = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/provincia`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating provincia:', error);
        throw error;
    }
}

export const updateProvincia = async (id_provincia, data) => {
    try {
        const response = await axios.put(`${API_URL}/provincia/${id_provincia}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating provincia:', error);
        throw error;
    }
}

export const deleteProvincia = async (id_provincia) => {
    try {
        const response = await axios.delete(`${API_URL}/provincia/${id_provincia}`); // variable = {id_provincia} identificacion de variable dentro cadena texto
        return response.data;
    } catch (error) {
        console.error('Error deleting provincia:', error);
        throw error;
    }
}

