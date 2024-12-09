const express = require('express');
const router = express.Router();
const mensajesController = require('../controllers/mensajesController');

// Ruta específica para obtener mensajes relacionados con un guía
router.get('/guia/:guia_id', mensajesController.obtenerMensajesGuia);

// Ruta genérica para obtener mensajes entre un usuario y un guía
router.get('/:usuario_id/:guia_id', mensajesController.obtenerMensajes);

// Ruta para enviar un mensaje
router.post('/enviar', mensajesController.enviarMensaje);

module.exports = router;
