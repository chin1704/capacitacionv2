const { Model, DataTypes } = require('sequelize');

class CategoriaCurso extends Model {
  static associate(models) {
    this.hasMany(models.Curso, {
      foreignKey: 'id_categoria',
      as: 'cursos'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: 'categorias_curso',
      modelName: 'CategoriaCurso',
      schema: 'fcc_historiaclinica',
      timestamps: false
    };
  }
}

const CategoriaCursoSchema = {
  id_categoria: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
  nombre_categoria: { type: DataTypes.STRING(240), allowNull: false },
  nivel_categoria: { type: DataTypes.INTEGER },
  padre_categoria: { type: DataTypes.STRING(240) },
  estado_categoria: { type: DataTypes.STRING(40) },
  codigo_categoria: { type: DataTypes.STRING(120) }
};

module.exports = { CategoriaCurso, CategoriaCursoSchema };