const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

//router.get('/', usuarioController.getAllProducts);
//router.post('/', usuarioController.createProduct);
//router.put('/:id', usuarioController.updateProduct);
//router.delete('/:id', usuarioController.deleteProduct);

router.get('/:id', usuarioController.getUserById);

module.exports = router;
