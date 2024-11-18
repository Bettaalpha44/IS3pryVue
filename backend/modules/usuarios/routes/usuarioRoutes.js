const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/autenticacionController');

const router = express.Router();

//router.get('/', usuarioController.getAllProducts);
router.get('/:id', usuarioController.getUserById);
//router.post('/', usuarioController.createProduct);
//router.put('/:id', usuarioController.updateProduct);
//router.delete('/:id', usuarioController.deleteProduct);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
