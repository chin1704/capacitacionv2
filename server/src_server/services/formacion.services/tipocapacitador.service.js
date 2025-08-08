const { models } = require('../../libs/sequelize');

class TipoCapacitadorService {

  async create(data) {
    try {
      const tipoCapacitador = await models.TipoCapacitador.create(data);
      return tipoCapacitador;
    } catch (error) {
      console.error('Error en TipoCapacitadorService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const tipoCapacitadores = await models.TipoCapacitador.findAll();
      return tipoCapacitadores;
    } catch (error) {
      console.error('Error en TipoCapacitadorService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const tipoCapacitador = await models.TipoCapacitador.findByPk(id);
      return tipoCapacitador;
    } catch (error) {
      console.error('Error en TipoCapacitadorService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const tipoCapacitador = await models.TipoCapacitador.findByPk(id);
      if (!tipoCapacitador) {
        return null;
      }

      await models.TipoCapacitador.update(data, {
        where: { id_tipo_capacitador: id }
      });

      const updatedTipoCapacitador = await models.TipoCapacitador.findByPk(id);
      return updatedTipoCapacitador;
    } catch (error) {
      console.error('Error en TipoCapacitadorService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const tipoCapacitador = await models.TipoCapacitador.findByPk(id);
      if (!tipoCapacitador) {
        return null;
      }

      const deletedRows = await models.TipoCapacitador.destroy({
        where: { id_tipo_capacitador: id }
      });

      return deletedRows > 0;
    } catch (error) {
      console.error('Error en TipoCapacitadorService.delete:', error);
      throw error;
    }
  }

}

module.exports = TipoCapacitadorService;
