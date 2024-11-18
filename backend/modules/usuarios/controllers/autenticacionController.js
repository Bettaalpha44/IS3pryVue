const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../../../config/db');

const SECRET_KEY = '309823';

// Registro de usuario PARA ACLARAR. POR AHORA SOLO ESTO ES LO QUE HAY DE AUTENTICACIÓN Y AUTORIZACIÓN
/*CON LAS TABLAS QUE YO TENGO, AQUI NO SE COMO DIFERENCIAR LO DE LOS ROLES. ADEMÁS DE QUE QUE SI SON DOS INTERFACES, 
UNA PARA DOCENTE Y OTRA DIFERENTE PARA COORDINADOR TALVEZ NECESITE HACER DOS ENDPOINTS O TRAER LO QUE EL ESCOGIÓ ALLÁ
Y AQUI HACER UN IF CON ESO QUE EL ESCOGIÓ*/
const register = async (req, res) => {
  const { tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, nombreUsuario, contrasenia } = req.body;

  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(contrasenia, 10);

  try {
    const [result] = await pool.query('INSERT INTO usuarios (tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, nombreUsuario, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?)'
        , [tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, nombreUsuario, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  const { nombreUsuario, contrasenia } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM coordinador WHERE nombreUsuario = ?', [nombreUsuario]);
    const user = rows[0];

    if (!user) {
      //return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.status(401).json({ error: 'Nombre o contrasenia incorrecta' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isMatch) {
      //return res.status(401).json({ error: 'Contraseña incorrecta' });
      return res.status(401).json({ error: 'Nombre o contrasenia incorrecta' });
    }

    // Crear el token JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
