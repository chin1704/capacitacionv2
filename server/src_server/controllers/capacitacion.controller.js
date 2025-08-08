const CapacitacionService = require('../services/capacitaciones.services/capacitacion.service');
const service = new CapacitacionService();

const create = async (req, res) => {
    try {
        const response = await service.create(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.error('Error in create:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find();
        res.json({ success: true, data: response });
    } catch (error) {
        console.error('Error in get:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        
        if (!response) {
            return res.status(404).json({ success: false, message: 'Capacitación no encontrada' });
        }
        
        res.json({ success: true, data: response });
    } catch (error) {
        console.error('Error in getById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
        
        if (!response) {
            return res.status(404).json({ success: false, message: 'Capacitación no encontrada' });
        }
        
        res.json({ success: true, data: response, message: 'Actualizado correctamente' });
    } catch (error) {
        console.error('Error in update:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        
        if (!response) {
            return res.status(404).json({ success: false, message: 'Capacitación no encontrada' });
        }
        
        res.json({ success: true, message: 'Eliminado correctamente' });
    } catch (error) {
        console.error('Error in delete:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    create, 
    get, 
    getById, 
    update, 
    _delete
};