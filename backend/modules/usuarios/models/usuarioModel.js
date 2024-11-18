const db = require('../../../config/db');


const getUserById = async (id) => {
  const connection = await db; // Espera a que la conexión esté lista
  const [rows] = await connection.query('SELECT * FROM usuario WHERE numIdentificacion = ?', [id]);
  return rows[0];
};

/*
const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

const createProduct = async (product) => {
  const { name, price } = product;
  const [result] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
  return result.insertId;
};

const updateProduct = async (id, product) => {
  const { name, price } = product;
  await db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
};

const deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = { getAllProducts, getUserById, createProduct, updateProduct, deleteProduct };*/

module.exports = { getUserById };