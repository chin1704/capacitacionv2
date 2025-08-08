const { Model, DataTypes } = require('sequelize');


class Participante extends Model {
  static associate(models) {
    this.belongsTo(models.Capacitacion, {
      foreignKey: 'id_capacitacion',
      as: 'capacitacion'
    });
    this.hasMany(models.Asistencia, {
      foreignKey: 'id_participante',
      as: 'asistencia'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'participante',
      schema: 'fcc_historiaclinica',
      modelName: 'Participante',
      timestamps: false
    };
  }
}

const ParticipanteSchema = {
  id_participante: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_completo: { type: DataTypes.STRING, allowNull: false },
  cedula: { type: DataTypes.STRING, unique: true, allowNull: false },
  correo: DataTypes.STRING,
  telefono: DataTypes.STRING,
  comunidad: DataTypes.STRING,
  id_capacitacion: { type: DataTypes.INTEGER, allowNull: false }
};

module.exports = { Participante, ParticipanteSchema };
