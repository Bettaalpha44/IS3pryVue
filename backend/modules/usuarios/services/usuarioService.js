const usuarioModel = require('../models/usuarioModel');

const getAllProducts = async () => {
  // Aquí podrías aplicar lógica adicional, como filtrado o transformación de datos.
  const products = await productModel.getAllProducts();
  return products.map((product) => ({
    ...product,
    price: parseFloat(product.price).toFixed(2), // Ejemplo de formato adicional.
  }));
};

const getUserById = async (id) => {
  const usuario = await usuarioModel.getUserById(id);
  if (!usuario) {
    throw new Error(`User with ID ${id} not found`);
  }
  return usuario;
};

const createProduct = async (productData) => {
  // Validación de datos antes de enviar al modelo.
  if (!productData.name || productData.price <= 0) {
    throw new Error('Invalid product data');
  }
  return await productModel.createProduct(productData);
};

const updateProduct = async (id, productData) => {
  const existingProduct = await productModel.getProductById(id);
  if (!existingProduct) {
    throw new Error(`Cannot update non-existent product with ID ${id}`);
  }
  await productModel.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
  const existingProduct = await productModel.getProductById(id);
  if (!existingProduct) {
    throw new Error(`Cannot delete non-existent product with ID ${id}`);
  }
  await productModel.deleteProduct(id);
};

module.exports = { getAllProducts, getUserById, createProduct, updateProduct, deleteProduct };
