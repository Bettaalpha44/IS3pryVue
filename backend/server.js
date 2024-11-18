const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


//const productRoutes = require('./modules/products/routes/productRoutes');
const usuarioRoutes = require('./modules/usuarios/routes/usuarioRoutes');


app.use(express.json()); // Para parsear JSON
//app.use('/api/products', productRoutes);
app.use('/api/usuarios', usuarioRoutes);
  
