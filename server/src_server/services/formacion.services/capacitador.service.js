const { models } = require('../../libs/sequelize');

class CapacitadorService {

  async create(data) {
    try {
      const capacitador = await models.Capacitador.create(data);
      return capacitador;
    } catch (error) {
      console.error('Error en CapacitadorService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const capacitadores = await models.Capacitador.findAll();
      return capacitadores;
    } catch (error) {
      console.error('Error en CapacitadorService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const capacitador = await models.Capacitador.findByPk(id);
      return capacitador;
    } catch (error) {
      console.error('Error en CapacitadorService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const capacitador = await models.Capacitador.findByPk(id);
      if (!capacitador) {
        return null;
      }

      await models.Capacitador.update(data, {
        where: { id_capacitador: id }
      });

      const updatedCapacitador = await models.Capacitador.findByPk(id);
      return updatedCapacitador;
    } catch (error) {
      console.error('Error en CapacitadorService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const capacitador = await models.Capacitador.findByPk(id);
      if (!capacitador) {
        return null;
      }

      const deletedRows = await models.Capacitador.destroy({
        where: { id_capacitador: id }
      });

      return deletedRows > 0;
    } catch (error) {
      console.error('Error en CapacitadorService.delete:', error);
      throw error;
    }
  }

}

module.exports = CapacitadorService;
