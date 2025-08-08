const express = require('express'); 

const cabeceraRouter = require('./cabecera.routes');
const capacitadorRouter = require('./capacitador.routes');
const categoriacursoRouter = require('./categoriacurso.routes');
const cursoRouter = require('./curso.routes');
const eventocapacitacionRouter = require('./eventocapacitacion.routes');
const tipocapacitadorRouter = require('./tipocapacitador.routes');

function setupFormacionRoutes(router) {
  router.use('/cabecera', cabeceraRouter)
  router.use('/capacitador', capacitadorRouter)
  router.use('/categoria_curso', categoriacursoRouter)
  router.use('/curso', cursoRouter)
  router.use('/evento_capacitacion', eventocapacitacionRouter)
  router.use('/tipo_capacitador', tipocapacitadorRouter)

  }

module.exports = setupFormacionRoutes;