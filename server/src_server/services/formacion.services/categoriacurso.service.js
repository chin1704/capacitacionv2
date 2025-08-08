const { models } = require('../../libs/sequelize');

class CategoriaCursoService {

  async create(data) {
    try {
      const categoriaCurso = await models.CategoriaCurso.create(data);
      return categoriaCurso;
    } catch (error) {
      console.error('Error en CategoriaCursoService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const categoriaCursos = await models.CategoriaCurso.findAll();
      return categoriaCursos;
    } catch (error) {
      console.error('Error en CategoriaCursoService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const categoriaCurso = await models.CategoriaCurso.findByPk(id);
      return categoriaCurso;
    } catch (error) {
      console.error('Error en CategoriaCursoService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const categoriaCurso = await models.CategoriaCurso.findByPk(id);
      if (!categoriaCurso) {
        return null;
      }

      await models.CategoriaCurso.update(data, {
        where: { id_categoria: id }
      });

      const updatedCategoriaCurso = await models.CategoriaCurso.findByPk(id);
      return updatedCategoriaCurso;
    } catch (error) {
      console.error('Error en CategoriaCursoService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const categoriaCurso = await models.CategoriaCurso.findByPk(id);
      if (!categoriaCurso) {
        return null;
      }

      const deletedRows = await models.CategoriaCurso.destroy({
        where: { id_categoria: id }
      });

      return deletedRows > 0;
    } catch (error) {
      console.error('Error en CategoriaCursoService.delete:', error);
      throw error;
    }
  }

}

module.exports = CategoriaCursoService;
