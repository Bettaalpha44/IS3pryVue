// db.js
const mysql = require('mysql2/promise'); // Cambiado a mysql2/promise

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia según tu configuración
    password: '150919', // Cambia según tu configuración
    database: 'bdvueis3'
});

db.then(() => {
  console.log('Conectado a la base de datos');
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

module.exports = db;
