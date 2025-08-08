const setupHistoriaClinicaModels = require('./historiaclinica.models');
const setupCapacitacionModels = require('./capacitacion.models');
const setupComunidadModels = require('./comunidad.models');
const setupFormacionModels = require('./formacion.models');
const setupHooks = require('./hooks');

function setupModels(sequelize) {
  setupHistoriaClinicaModels(sequelize); // incluye historia clínica + capacitación
  setupComunidadModels(sequelize);
  setupCapacitacionModels(sequelize);
  setupFormacionModels(sequelize);
  setupHooks(); // después de definir modelos
}

module.exports = setupModels;
