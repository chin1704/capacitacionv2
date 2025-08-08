const express = require('express');
const router = express.Router();
const tipo_personaController = require('../../controllers/comunidad.controllers/tipo_persona.controller');

router
    .get('/', tipo_personaController.get)
    .get('/:id', tipo_personaController.getById)
    .post('/', tipo_personaController.create)
    .put('/:id', tipo_personaController.update)
    .delete('/:id', tipo_personaController._delete);

module.exports = router;
