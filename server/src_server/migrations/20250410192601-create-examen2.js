'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'examen',
      {
        id_examen: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        id_historia: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
        },
        fecha_solicitud_examen: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        url_examen: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        nombre_examen: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        comentario_examen: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        estado_examen: {
            type: Sequelize.STRING(40),
            allowNull: true,
        },
        id_aps: {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('examen', { schema: 'fcc_historiaclinica' });
  },
};