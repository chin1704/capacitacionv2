const { models } = require('../../libs/sequelize');

class ParticipanteService {

  async create(data) {
    try {
      const participante = await models.Participante.create(data);
      return participante;
    } catch (error) {
      console.error('Error in ParticipanteService.create:', error);
      throw error;
    }
  }

  async find() {
    try {
      const participantes = await models.Participante.findAll();
      return participantes;
    } catch (error) {
      console.error('Error in ParticipanteService.find:', error);
      throw error;
    }
  }

  async findOne(id) {
    try {
      const participante = await models.Participante.findByPk(id);
      return participante;
    } catch (error) {
      console.error('Error in ParticipanteService.findOne:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {   
      const participante = await models.Participante.findByPk(id);
      if (!participante) {
        return null;
      }
      
      await models.Participante.update(data, {
        where: { id_participante: id }
      });
      
      const updatedParticipante = await models.Participante.findByPk(id);
      return updatedParticipante;
    } catch (error) {
      console.error('Error in ParticipanteService.update:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const participante = await models.Participante.findByPk(id);
      if (!participante) {
        return null;
      }
      
      const deletedRows = await models.Participante.destroy({
        where: { id_participante: id }
      });
      
      return deletedRows > 0;
    } catch (error) {
      console.error('Error in ParticipanteService.delete:', error);
      throw error;
    }
  }
}

module.exports = ParticipanteService;
