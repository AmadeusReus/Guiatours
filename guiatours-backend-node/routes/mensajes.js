const express = require('express');
const router = express.Router();
const mensajesController = require('../controllers/mensajesController');

// Enviar un mensaje
router.post('/enviar', mensajesController.enviarMensaje);

// Obtener mensajes entre un usuario y un guía
router.get('/:usuario_id/:guia_id', mensajesController.obtenerMensajes);

module.exports = router;
