'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evento_capacitacion', {
      id_evento_capacitacion: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre_evento_capacitacion: {
        type: Sequelize.STRING(240),
        allowNull: false
      },
      descripcion_evento_capacitacion: {
        type: Sequelize.STRING(240)
      },
      fecha_inicio_evento_capacitacion: {
        type: Sequelize.DATE
      },
      fecha_fin_evento_capacitacion: {
        type: Sequelize.DATE
      },
      costo_evento_capacitacion: {
        type: Sequelize.DECIMAL(10, 2)
      },
      observaciones_evento_capacitacion: {
        type: Sequelize.STRING(240)
      },
      archivo_evento_capacitacion: {
        type: Sequelize.STRING(250)
      },
      id_curso: {
        type: Sequelize.BIGINT,
        references: {
          model: 'cursos',
          key: 'id_curso'
        },
        onDelete: 'CASCADE'
      },
      id_capacitador: {
        type: Sequelize.BIGINT,
        references: {
          model: 'capacitador',
          key: 'id_capacitador'
        },
        onDelete: 'CASCADE'
      }
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('evento_capacitacion', {
      schema: 'fcc_historiaclinica',
    });
  }
};

