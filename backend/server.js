const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


//const usuarioRoutes = require('./modules/usuarios/routes/usuarioRoutes');
const autenticacionRoutes = require('./modules/usuarios/routes/autenticacionRoutes');


app.use(express.json()); // Para parsear JSON
//app.use('/api/usuarios', usuarioRoutes);
app.use('/api/autenticacion', autenticacionRoutes);
  
