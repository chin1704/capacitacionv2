'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tipo_especialidad',
      {
        id_tipo_especialidad: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        descripcion_tipo_especialidad: {
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
    return queryInterface.dropTable('tipo_especialidad', { schema: 'fcc_historiaclinica' });
  },
};
