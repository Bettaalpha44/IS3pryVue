const express = require('express');
const authController = require('../controllers/autenticacionController');

const router = express.Router();


router.post('/register', authController.authenticate, authController.authorize(['Coordinador']), authController.register);
router.post('/login', authController.login);

module.exports = router;
