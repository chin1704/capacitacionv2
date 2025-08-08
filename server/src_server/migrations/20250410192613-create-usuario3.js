'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'usuario',
      {
        id_usuario:{
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT,
            autoIncrement: true,
        },
        id_personal_salud: {
            type: Sequelize.BIGINT,
            allowNull: true, 
        },
        nombre_usuario:{
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        apellido_usuario:{
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        correo_usuario:{
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        password_usuario:{
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        rol_usuario:{
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        estado_usuario:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
      },
      {
        schema: 'fcc_historiaclinica', // Especificar el esquema
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuario', { schema: 'fcc_historiaclinica' });
  },
};