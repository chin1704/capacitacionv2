const express = require('express');
const router = express.Router();
const tipocapacitadorController = require('../../controllers/formacion.controllers/tipocapacitador.controller');

router
    .get('/', tipocapacitadorController.get)
    .get('/:id', tipocapacitadorController.getById)
    .post('/', tipocapacitadorController.create)
    .put('/:id', tipocapacitadorController.update)
    .delete('/:id', tipocapacitadorController._delete);

module.exports = router;