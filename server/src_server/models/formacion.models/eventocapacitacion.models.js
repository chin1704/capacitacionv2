const { Model, DataTypes } = require('sequelize');

class EventoCapacitacion extends Model {
  static associate(models) {
    this.hasMany(models.Cabecera, {
      foreignKey: 'id_evento_capacitacion',
      as: 'cabecera'
    });
    this.belongsTo(models.Curso, {
      foreignKey: 'id_curso',
      as: 'curso'
    });
    this.belongsTo(models.Capacitador, {
      foreignKey: 'id_capacitador',
      as: 'capacitador'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'evento_capacitacion',
      modelName: 'EventoCapacitacion',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const EventoCapacitacionSchema = {
  id_evento_capacitacion: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  nombre_evento_capacitacion: { type: DataTypes.STRING(240), allowNull: false },
  descripcion_evento_capacitacion: { type: DataTypes.STRING(240) },
  fecha_inicio_evento_capacitacion: { type: DataTypes.DATE },
  fecha_fin_evento_capacitacion: { type: DataTypes.DATE },
  costo_evento_capacitacion: { type: DataTypes.DECIMAL(10, 2) },
  observaciones_evento_capacitacion: { type: DataTypes.STRING(240) },
  archivo_evento_capacitacion: { type: DataTypes.STRING(250) },
  id_curso: { type: DataTypes.BIGINT, allowNull: false },
   id_capacitador: { type: DataTypes.BIGINT, allowNull: false }
};

module.exports = { EventoCapacitacion, EventoCapacitacionSchema };