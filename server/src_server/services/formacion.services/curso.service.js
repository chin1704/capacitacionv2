const { models } = require('../../libs/sequelize');

class CursoService {

  async create(data) {
    try {
      const curso = await models.Curso.create(data);
      return curso;
    } catch (error) {
      console.error('Error en CursoService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const cursos = await models.Curso.findAll();
      return cursos;
    } catch (error) {
      console.error('Error en CursoService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const curso = await models.Curso.findByPk(id);
      return curso;
    } catch (error) {
      console.error('Error en CursoService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const curso = await models.Curso.findByPk(id);
      if (!curso) {
        return null;
      }

      await models.Curso.update(data, {
        where: { id_curso: id }
      });

      const updatedCurso = await models.Curso.findByPk(id);
      return updatedCurso;
    } catch (error) {
      console.error('Error en CursoService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const curso = await models.Curso.findByPk(id);
      if (!curso) {
        return null;
      }

      const deletedRows = await models.Curso.destroy({
        where: { id_curso: id }
      });

      return deletedRows > 0;
    } catch (error) {
      console.error('Error en CursoService.delete:', error);
      throw error;
    }
  }

}

module.exports = CursoService;
