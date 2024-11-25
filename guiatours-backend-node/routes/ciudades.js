const express = require('express');
const router = express.Router();
const ciudadesController = require('../controllers/ciudadesController');

router.get('/', ciudadesController.getCiudades);
router.get('/:id', ciudadesController.getCiudadById);

module.exports = router;
