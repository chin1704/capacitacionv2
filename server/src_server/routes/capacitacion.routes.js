const express = require('express');
const controller = require('../controllers/capacitacion.controller');

module.exports = (router) => {
  const capacitacionRouter = express.Router();

  capacitacionRouter.post('/', controller.create);
  capacitacionRouter.get('/', controller.get);
  capacitacionRouter.get('/:id', controller.getById);
  capacitacionRouter.put('/:id', controller.update);
  capacitacionRouter.delete('/:id', controller._delete);

  router.use('/capacitacion', capacitacionRouter);
};
