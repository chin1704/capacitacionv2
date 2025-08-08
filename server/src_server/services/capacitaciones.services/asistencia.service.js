const { models } = require('../../libs/sequelize');

class AsistenciaService {

  async create(data) {
    try {
      console.log('Creating asistencia with data:', data);
      const asistencia = await models.Asistencia.create(data);
      return asistencia;
    } catch (error) {
      console.error('Error in AsistenciaService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const asistencias = await models.Asistencia.findAll();
      return asistencias;
    } catch (error) {
      console.error('Error in AsistenciaService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const asistencia = await models.Asistencia.findByPk(id);
      return asistencia;
    } catch (error) {
      console.error('Error in AsistenciaService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const asistencia = await models.Asistencia.findByPk(id);
      if (!asistencia) {
        return null;
      }
      
      await models.Asistencia.update(data, {
        where: { id_asistencia: id }
      });
      
      const updatedAsistencia = await models.Asistencia.findByPk(id);
      return updatedAsistencia;
    } catch (error) {
      console.error('Error in AsistenciaService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const asistencia = await models.Asistencia.findByPk(id);
      if (!asistencia) {
        return null;
      }
      
      const deletedRows = await models.Asistencia.destroy({
        where: { id_asistencia: id }
      });
      
      return deletedRows > 0;
    } catch (error) {
      console.error('Error in AsistenciaService.delete:', error);
      throw error;
    }
  }
}

module.exports = AsistenciaService;
