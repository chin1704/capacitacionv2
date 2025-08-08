'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'especialidad',
      {
        id_especialidad: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,

        },
        id_tipo_especialidad: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        nombre_especialidad: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('especialidad', { schema: 'fcc_historiaclinica' });
  },
};
