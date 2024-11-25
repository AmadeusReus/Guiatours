const express = require('express');
const router = express.Router();
const guiasController = require('../controllers/guiasController');

// Obtener detalles del guía
router.get('/:id', guiasController.getGuiaById);

// Agregar una reseña
router.post('/:id/resenas', guiasController.addResena);

// Actualizar datos del guía
router.put('/:id', guiasController.updateGuia);

module.exports = router;
