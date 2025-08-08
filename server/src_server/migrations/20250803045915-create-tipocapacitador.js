'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipo_capacitador', {
      id_tipo_capacitador: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      descripcion_tipo_capacitador: {
        type: Sequelize.STRING(240),
        allowNull: false
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tipo_capacitador', {
      schema: 'fcc_historiaclinica',
    });
  }
};
