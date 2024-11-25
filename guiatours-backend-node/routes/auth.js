const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/registerGuide', authController.registerGuide);
router.post('/loginGuide', authController.loginGuide);

module.exports = router;
