const { TipoCapacitador, TipoCapacitadorSchema } = require('./tipocapacitador.models');
const { EventoCapacitacion, EventoCapacitacionSchema } = require('./eventocapacitacion.models');
const { Curso, CursoSchema } = require('./curso.models');
const { CategoriaCurso, CategoriaCursoSchema } = require('./categoriacurso.models');
const { Capacitador, CapacitadorSchema } = require('./capacitador.models');
const { Cabecera, CabeceraSchema } = require('./cabecera.models');

function setupFormacionModels(sequelize) {
  TipoCapacitador.init(TipoCapacitadorSchema, TipoCapacitador.config(sequelize));
  EventoCapacitacion.init(EventoCapacitacionSchema, EventoCapacitacion.config(sequelize));
  Curso.init(CursoSchema, Curso.config(sequelize));
  CategoriaCurso.init(CategoriaCursoSchema, CategoriaCurso.config(sequelize));
  Capacitador.init(CapacitadorSchema, Capacitador.config(sequelize));
  Cabecera.init(CabeceraSchema, Cabecera.config(sequelize));

  TipoCapacitador.associate?.(sequelize.models);
  EventoCapacitacion.associate?.(sequelize.models);
  Curso.associate?.(sequelize.models);
  CategoriaCurso.associate?.(sequelize.models);
  Capacitador.associate?.(sequelize.models);
  Cabecera.associate?.(sequelize.models);
}

module.exports = setupFormacionModels;