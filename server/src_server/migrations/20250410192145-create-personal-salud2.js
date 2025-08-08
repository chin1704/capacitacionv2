'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'personalsalud',
      {
        id_personalsalud: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        id_especialidad: {
            allowNull: false,
            type: Sequelize.BIGINT,
        },
        nombres_personal: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        apellidos_personal: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        nacionalidad_personal: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        tipo_dni_personal: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        dni_personal: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        titulos_personal: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        telefono_personal: {
            type: Sequelize.STRING(160),
            allowNull: true,
        },
        direccion_personal: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        email_personal: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        hdv_personal: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        foto_personal: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        estado_personal: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        fecha_nacimiento_personal: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        fecha_registro_personal: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        licencia_personal: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('personalsalud', { schema: 'fcc_historiaclinica' });
  },
};
