const express = require('express');
const router = express.Router();
const cursoController = require('../../controllers/formacion.controllers/curso.controller');

router
    .get('/', cursoController.get)
    .get('/:id', cursoController.getById)
    .post('/', cursoController.create)
    .put('/:id', cursoController.update)
    .delete('/:id', cursoController._delete);

module.exports = router