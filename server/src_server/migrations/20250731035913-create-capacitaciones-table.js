'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('capacitacion', {
      id_capacitacion: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      tema: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lugar: {
        type: Sequelize.STRING(100),
        allowNull: true
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('capacitacion', {
      schema: 'fcc_historiaclinica'
    });
  }
};
