const { Model, DataTypes } = require('sequelize');

class Cabecera extends Model {
  static associate(models) {
    this.belongsTo(models.EventoCapacitacion, {
      foreignKey: 'id_evento_capacitacion',
      as: 'eventoCapacitacion'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'cabecera',
      modelName: 'Cabecera',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const CabeceraSchema = {
  id_cabecera: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  descripcion_cabecera: { type: DataTypes.STRING(240) },
  fecha_cabecera: { type: DataTypes.DATE },
  archivo_cabecera: { type: DataTypes.STRING(240) },
  id_evento_capacitacion: { type: DataTypes.BIGINT, allowNull: false }
};

module.exports = { Cabecera, CabeceraSchema };
