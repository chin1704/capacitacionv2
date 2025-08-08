const express = require('express');
const router = express.Router();
const interaccionController = require('../../controllers/comunidad.controllers/interaccion.controller');

router
    .get('/', interaccionController.get)
    .get('/:id', interaccionController.getById)
    .post('/', interaccionController.create)
    .put('/:id', interaccionController.update)
    .delete('/:id', interaccionController._delete);

module.exports = router;
