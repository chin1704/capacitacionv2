const express = require('express');
const router = express.Router();
const categoriacursoController = require('../../controllers/formacion.controllers/categoriacurso.controller');

router
    .get('/', categoriacursoController.get)
    .get('/:id', categoriacursoController.getById)
    .post('/', categoriacursoController.create)
    .put('/:id', categoriacursoController.update)
    .delete('/:id', categoriacursoController._delete);

module.exports = router;