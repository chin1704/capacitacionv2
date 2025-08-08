const express = require('express');
const controller = require('../controllers/asistencia.controller');

module.exports = (router) => {
  const asistenciaRouter = express.Router();

  asistenciaRouter.post('/', controller.create);
  asistenciaRouter.get('/', controller.get);
  asistenciaRouter.get('/:id', controller.getById);
  asistenciaRouter.put('/:id', controller.update);
  asistenciaRouter.delete('/:id', controller._delete);

  router.use('/asistencia', asistenciaRouter);
};
