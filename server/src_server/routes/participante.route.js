const express = require('express');
const controller = require('../controllers/participante.controller');

module.exports = (router) => {
  const participanteRouter = express.Router();

  participanteRouter.post('/', controller.create);
  participanteRouter.get('/', controller.get);
  participanteRouter.get('/:id', controller.getById);
  participanteRouter.put('/:id', controller.update);
  participanteRouter.delete('/:id', controller._delete);

  router.use('/participante', participanteRouter);
};
