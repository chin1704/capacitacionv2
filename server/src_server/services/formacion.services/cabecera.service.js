const { models } = require('../../libs/sequelize');

class CabeceraService {
  
  async create(data) {
    try {
      const cabecera = await models.Cabecera.create(data);
      return cabecera;
    } catch (error) {
      console.error('Error en CabeceraService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const cabeceras = await models.Cabecera.findAll();
      return cabeceras;
    } catch (error) {
      console.error('Error en CabeceraService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const cabecera = await models.Cabecera.findByPk(id);
      return cabecera;
    } catch (error) {
      console.error('Error en CabeceraService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   

      const cabecera = await models.Cabecera.findByPk(id);
      if (!cabecera) {
        return null;
      }
      
      await models.Cabecera.update(data, {
        where: { id_cabecera: id }
      });
      
      const updateCabecera = await models.Cabecera.findByPk(id);
      return updateCabecera;
    } catch (error) {
      console.error('Error en CabeceraService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const cabecera = await models.Cabecera.findByPk(id);
      if (!cabecera) {
        return null;
      }
      
      const deletedRows = await models.Cabecera.destroy({
        where: { id_cabecera: id }
      });
      
      return deletedRows > 0;
    } catch (error) {
      console.error('Error en CabeceraService.delete:', error);
      throw error;
    }
  }

}

module.exports = CabeceraService;