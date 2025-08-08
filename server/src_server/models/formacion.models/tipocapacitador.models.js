const { Model, DataTypes } = require('sequelize');

class TipoCapacitador extends Model {
  static associate(models) {
    this.hasMany(models.Capacitador, {
      foreignKey: 'id_tipo_capacitador',
      as: 'capacitadores'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'tipo_capacitador',
      modelName: 'TipoCapacitador',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const TipoCapacitadorSchema = {
  id_tipo_capacitador: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  descripcion_tipo_capacitador: { type: DataTypes.STRING(240), allowNull: false }
};

module.exports = { TipoCapacitador, TipoCapacitadorSchema };
