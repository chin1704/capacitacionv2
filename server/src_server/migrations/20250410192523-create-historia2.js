'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'historia',
      {
        id_historia: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        id_paciente: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        codigo_historia: {
            type: Sequelize.STRING(40),
            allowNull: true,
        },
        fecha_historia: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        motivo_consulta_historia: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        ant_familiares_materno: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        ant_familiares_paterno: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        otros_antecedentes: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        ant_prenatales: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        ant_perinatales: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        ant_postnatales: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        seguro_social: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        alergias: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        medicamentos: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        diagnostico_presuntivo: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        tratamientos_recibidos: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
        },
        observaciones: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('historia', { schema: 'fcc_historiaclinica' });
  },
};