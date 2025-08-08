const { Model, DataTypes } = require('sequelize');

class Capacitacion extends Model {
  static associate(models) {
    this.hasMany(models.Participante, {
      foreignKey: 'id_capacitacion',
      as: 'participante'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'capacitacion',
      modelName: 'Capacitacion',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const CapacitacionSchema = {
  id_capacitacion: {  allowNull: false,primaryKey: true,type: DataTypes.BIGINT, autoIncrement: true,},
  tema: { type: DataTypes.STRING(45), allowNull: false },
  fecha: { type: DataTypes.DATE },
  lugar: { type: DataTypes.STRING(100)},
};

module.exports = { Capacitacion, CapacitacionSchema };
