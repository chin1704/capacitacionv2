'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('capacitador', {
      id_capacitador: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre_capacitador: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      apellido_capacitador: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      id_tipo_capacitador: {
        type: Sequelize.BIGINT,
        references: {
          model: 'tipo_capacitador',
          key: 'id_tipo_capacitador'
        },
        onDelete: 'CASCADE'
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('capacitador', {
      schema: 'fcc_historiaclinica',
    });
  }
};
