'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('asistencia', {
      id_asistencia: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_participante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'participante',
          key: 'id_participante',
          onDelete: 'CASCADE',
        },
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
      },
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('asistencia', {
      schema: 'fcc_historiaclinica',
    });
  }
};
