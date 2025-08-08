const { models } = require('../../libs/sequelize');

class EventoCapacitacionService {

  async create(data) {
    try {
      const eventoCapacitacion = await models.EventoCapacitacion.create(data);
      return eventoCapacitacion;
    } catch (error) {
      console.error('Error en EventoCapacitacionService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const eventoCapacitaciones = await models.EventoCapacitacion.findAll();
      return eventoCapacitaciones;
    } catch (error) {
      console.error('Error en EventoCapacitacionService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const eventoCapacitacion = await models.EventoCapacitacion.findByPk(id);
      return eventoCapacitacion;
    } catch (error) {
      console.error('Error en EventoCapacitacionService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const eventoCapacitacion = await models.EventoCapacitacion.findByPk(id);
      if (!eventoCapacitacion) {
        return null;
      }

      await models.EventoCapacitacion.update(data, {
        where: { id_evento_capacitacion: id }
      });

      const updatedEventoCapacitacion = await models.EventoCapacitacion.findByPk(id);
      return updatedEventoCapacitacion;
    } catch (error) {
      console.error('Error en EventoCapacitacionService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const eventoCapacitacion = await models.EventoCapacitacion.findByPk(id);
      if (!eventoCapacitacion) {
        return null;
      }

      const deletedRows = await models.EventoCapacitacion.destroy({
        where: { id_evento_capacitacion: id }
      });

      return deletedRows > 0;
    } catch (error) {
      console.error('Error en EventoCapacitacionService.delete:', error);
      throw error;
    }
  }

}

module.exports = EventoCapacitacionService;
