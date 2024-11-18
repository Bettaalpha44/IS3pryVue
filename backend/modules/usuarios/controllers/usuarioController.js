const usuarioService = require('../services/usuarioService');

const getUserById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUserById(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/*
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const id = await productService.createProduct(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getAllProducts, getUserById, createProduct, updateProduct, deleteProduct };*/
module.exports = { getUserById };
