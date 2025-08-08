'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'atencion_medica',
      {
        id_aps: {
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
        problema_actual: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        fecha_atencion: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        motivo_consulta: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        revision_actual_sistema: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        examen_fisico: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        plan_tratamiento: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        prescripciones: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        diagnostico: {
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
    return queryInterface.dropTable('atencion_medica', { schema: 'fcc_historiaclinica' });
  },
};