'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cabecera', {
      id_cabecera: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      descripcion_cabecera: {
        type: Sequelize.STRING(240)
      },
      fecha_cabecera: {
        type: Sequelize.DATE
      },
      archivo_cabecera: {
        type: Sequelize.STRING(240)
      },
      id_evento_capacitacion: {
        type: Sequelize.BIGINT,
        references: {
          model: 'evento_capacitacion',
          key: 'id_evento_capacitacion'
        },
        onDelete: 'CASCADE'
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cabecera', {
      schema: 'fcc_historiaclinica',
    });
  }
};
