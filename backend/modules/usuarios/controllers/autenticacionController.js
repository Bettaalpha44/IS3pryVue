const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../config/db');

const SECRET_KEY = '309823';

// Registro de usuario PARA ACLARAR. POR AHORA SOLO ESTO ES LO QUE HAY DE AUTENTICACIÓN Y AUTORIZACIÓN
/*CON LAS TABLAS QUE YO TENGO, AQUI NO SE COMO DIFERENCIAR LO DE LOS ROLES. ADEMÁS DE QUE QUE SI SON DOS INTERFACES, 
UNA PARA DOCENTE Y OTRA DIFERENTE PARA COORDINADOR TALVEZ NECESITE HACER DOS ENDPOINTS O TRAER LO QUE EL ESCOGIÓ ALLÁ
Y AQUI HACER UN IF CON ESO QUE EL ESCOGIÓ*/
const register = async (req, res) => {
  const { 
    tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, nombreUsuario, contrasenia, tipoDocente, ultimoTitulo 
  } = req.body;

  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(contrasenia, 10);

  try {
    const connection = await db;
    // Insertar usuario
    const [userResult] = await connection.query(
      'INSERT INTO usuario (tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, rol, nombreUsuario, contrasenia, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, 'Docente', nombreUsuario, hashedPassword, 1]
    );    

    // Obtener el userId generado
    const userId = userResult.insertId;

    // Insertar docente
    const [docenteResult] = await connection.query(
      'INSERT INTO docente (idUsuario, tipoDocente, ultimoTitulo) VALUES (?, ?, ?)',
      [userId, tipoDocente, ultimoTitulo]
    );

    // Responder al cliente
    res.status(201).json({ 
      message: 'Usuario y docente registrados con éxito', 
      userId: userId, // Incluye el ID generado
      docenteId: docenteResult.insertId // ID del docente también
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Inicio de sesión
const login = async (req, res) => {
  const { nombreUsuario, contrasenia } = req.body;

  try {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM usuario WHERE nombreUsuario = ?', [nombreUsuario]);
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
    const token = jwt.sign({ userId: user.idUsuario, role: user.rol }, SECRET_KEY, { expiresIn: '1h' });

    // Enviar el token en la respuesta
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
