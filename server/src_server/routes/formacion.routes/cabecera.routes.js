const express = require('express');
const router = express.Router();
const cabeceraController = require('../../controllers/formacion.controllers/cabecera.controller');

router
    .get('/', cabeceraController.get)
    .get('/:id', cabeceraController.getById)
    .post('/', cabeceraController.create)
    .put('/:id', cabeceraController.update)
    .delete('/:id', cabeceraController._delete);

module.exports = router;
