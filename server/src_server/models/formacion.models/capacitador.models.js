const { Model, DataTypes } = require('sequelize');

class Capacitador extends Model {
  static associate(models) {
     this.hasMany(models.EventoCapacitacion, {
      foreignKey: 'id_capacitador',
      as: 'eventoCapacitacion'
    });
    this.belongsTo(models.TipoCapacitador, {
      foreignKey: 'id_tipo_capacitador',
      as: 'tipoCapacitador'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'capacitador',
      modelName: 'Capacitador',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const CapacitadorSchema = {
  id_capacitador: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  nombre_capacitador: { type: DataTypes.STRING(30), allowNull: false },
  apellido_capacitador: { type: DataTypes.STRING(30), allowNull: false },
  id_tipo_capacitador: { type: DataTypes.BIGINT, allowNull: false }
};

module.exports = { Capacitador, CapacitadorSchema };
