const { Capacitacion, CapacitacionSchema } = require('./capacitacion.model');
const { Participante, ParticipanteSchema } = require('./participante.model');
const { Asistencia, AsistenciaSchema } = require('./asistencia.model');

function setupCapacitacionModels(sequelize) {
  Capacitacion.init(CapacitacionSchema, Capacitacion.config(sequelize));
  Participante.init(ParticipanteSchema, Participante.config(sequelize));
  Asistencia.init(AsistenciaSchema, Asistencia.config(sequelize));

  Capacitacion.associate?.({ Participante });
  Participante.associate?.({ Capacitacion, Asistencia });
  Asistencia.associate?.({ Participante });
}

module.exports = setupCapacitacionModels;
