'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tipo_terapia',
      {
        id_tipo_terapia: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        nombre_terapia: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tipo_terapia', { schema: 'fcc_historiaclinica' });
  },
};
