'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categorias_curso', {
      id_categoria: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre_categoria: {
        type: Sequelize.STRING(240),
        allowNull: false
      },
      nivel_categoria: {
        type: Sequelize.INTEGER
      },
      padre_categoria: {
        type: Sequelize.STRING(240)
      },
      estado_categoria: {
        type: Sequelize.STRING(40)
      },
      codigo_categoria: {
        type: Sequelize.STRING(120)
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categorias_curso', {
      schema: 'fcc_historiaclinica',
    });
  }
};
