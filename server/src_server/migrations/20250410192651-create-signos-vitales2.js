'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'signos_vitales',
      {
        id_signos_vitales: {
            allowNull: true,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        id_historia: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
        },
        id_aps: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        fecha_medicion: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        temperatura: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        presion_arterial: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        pulso: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        frecuencia_respiratoria: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        peso: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        talla: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('signos_vitales', { schema: 'fcc_historiaclinica' });
  },
};
