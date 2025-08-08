'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cursos', {
      id_curso: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre_curso: {
        type: Sequelize.STRING(240),
        allowNull: false
      },
      codigo_curso: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      descripcion_curso: {
        type: Sequelize.STRING(240)
      },
      id_categoria: {
        type: Sequelize.BIGINT,
        references: {
          model: 'categorias_curso',
          key: 'id_categoria'
        },
        onDelete: 'CASCADE'
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cursos', {
      schema: 'fcc_historiaclinica',
    });
  }
};

