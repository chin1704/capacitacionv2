'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'terapias',
      {
        id_terapia: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        id_historia: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        id_personalsalud: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        id_tipo_terapia: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        fecha_hora: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        notas_evolucion: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        farmacoterapia_indicaciones: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        url_adjunto: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        // Nuevos atributos en formato JSON
        alimentacion: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        descanso: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        aseo: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        vestimenta: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        juego: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        conducta: {
            type: Sequelize.JSON,
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('terapias', { schema: 'fcc_historiaclinica' });
  },
};
