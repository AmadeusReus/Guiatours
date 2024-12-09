const express = require('express');
const router = express.Router();
const contratosController = require('../controllers/contratosController');

// Ruta para crear un contrato
router.post('/', contratosController.createContract);

// Ruta para obtener métricas del guía
router.get('/metrics/:guia_id', contratosController.getGuideMetrics);

module.exports = router;
