const express = require('express');
const router = express.Router();
const eventocapacitacionController = require('../../controllers/formacion.controllers/eventocapacitacion.controller');

router
    .get('/', eventocapacitacionController.get)
    .get('/:id', eventocapacitacionController.getById)
    .post('/', eventocapacitacionController.create)
    .put('/:id', eventocapacitacionController.update)
    .delete('/:id', eventocapacitacionController._delete);

module.exports = router