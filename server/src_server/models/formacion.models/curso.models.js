const { Model, DataTypes } = require('sequelize');

class Curso extends Model {
  static associate(models) {
    this.hasMany(models.EventoCapacitacion, {
      foreignKey: 'id_curso',
      as: 'eventoCapacitacion'
    });
    this.belongsTo(models.CategoriaCurso, {
      foreignKey: 'id_categoria',
      as: 'categoriaCurso'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'cursos',
      modelName: 'Curso',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const CursoSchema = {
  id_curso: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  nombre_curso: { type: DataTypes.STRING(240), allowNull: false },
  codigo_curso: { type: DataTypes.STRING(120), allowNull: false },
  descripcion_curso: { type: DataTypes.STRING(240) },
  id_categoria: { type: DataTypes.BIGINT, allowNull: false }
};

module.exports = { Curso, CursoSchema };