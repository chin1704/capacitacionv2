'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('participante', {
      id_participante: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cedula: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      comunidad: {
        type: Sequelize.STRING,
      },
      id_capacitacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'capacitacion',
          key: 'id_capacitacion',
          onDelete: 'CASCADE',
        },
      },
    }, {
      schema: 'fcc_historiaclinica',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('participante', {
      schema: 'fcc_historiaclinica',
    });
  }
};