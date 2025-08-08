const { Model, DataTypes } = require('sequelize');



class Asistencia extends Model {
  static associate(models) {
    this.belongsTo(models.Participante, {
      foreignKey: 'id_participante',
      as: 'participante'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'asistencia',
      schema: 'fcc_historiaclinica',
      modelName: 'Asistencia',
      timestamps: false
    };
  }
}

const AsistenciaSchema = {
  id_asistencia: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_participante: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATE, allowNull: false },
  estado: { type: DataTypes.STRING }
};

module.exports = { Asistencia, AsistenciaSchema };
