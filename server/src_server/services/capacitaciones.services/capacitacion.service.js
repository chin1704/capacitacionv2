const { models } = require('../../libs/sequelize');

class CapacitacionService {
  
  async create(data) {
    try {
      const capacitacion = await models.Capacitacion.create(data);
      return capacitacion;
    } catch (error) {
      console.error('Error in CapacitacionService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const capacitaciones = await models.Capacitacion.findAll();
      return capacitaciones;
    } catch (error) {
      console.error('Error in CapacitacionService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const capacitacion = await models.Capacitacion.findByPk(id);
      return capacitacion;
    } catch (error) {
      console.error('Error in CapacitacionService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   

      const capacitacion = await models.Capacitacion.findByPk(id);
      if (!capacitacion) {
        return null;
      }
      
      await models.Capacitacion.update(data, {
        where: { id_capacitacion: id }
      });
      
      const updatedCapacitacion = await models.Capacitacion.findByPk(id);
      return updatedCapacitacion;
    } catch (error) {
      console.error('Error in CapacitacionService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const capacitacion = await models.Capacitacion.findByPk(id);
      if (!capacitacion) {
        return null;
      }
      
      const deletedRows = await models.Capacitacion.destroy({
        where: { id_capacitacion: id }
      });
      
      return deletedRows > 0;
    } catch (error) {
      console.error('Error in CapacitacionService.delete:', error);
      throw error;
    }
  }

  async findByTema(tema) {
    try {
      const capacitaciones = await models.Capacitacion.findAll({
        where: {
          tema: {
            [Op.iLike]: `%${tema}%` 
          }
        }
      });
      return capacitaciones;
    } catch (error) {
      console.error('Error in CapacitacionService.findByTema:', error);
      throw error;
    }
  }

  async count() {
    try {
      const count = await Capacitacion.count();
      return count;
    } catch (error) {
      console.error('Error in CapacitacionService.count:', error);
      throw error;
    }
  }
}

module.exports = CapacitacionService;