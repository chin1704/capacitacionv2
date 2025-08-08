'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'paciente',
      {
        id_paciente: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        nombre_paciente: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        apellidos_paciente: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        nacionalidad_paciente: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        tipo_dni_paciente: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        dni_paciente: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        direccion_paciente: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        telefono_paciente: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        email_paciente: {
            type: Sequelize.STRING(120),
            allowNull: true,
        },
        tiposangre_paciente: {
            type: Sequelize.STRING(240),
            allowNull: true,
        },
        edad_paciente: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        fecha_paciente: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        genero_paciente: {
            type: Sequelize.STRING(15),
            allowNull: true,
        },
        familiar_cuidador: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        parentesco_familiar: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        telefono_cuidador: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        foto_paciente: {
            type: Sequelize.STRING(120),
            allowNull: true,
        },
        estado_paciente: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        archivo_documentos_cedulas : {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        archivo_certificado_medico : {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        biografia_paciente: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        fecha_registro_paciente: {
            type: Sequelize.DATE,
            allowNull: true,
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('paciente', { schema: 'fcc_historiaclinica' });
  },
};
