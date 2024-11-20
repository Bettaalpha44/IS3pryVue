const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../config/db');

const SECRET_KEY = '309823';

// Registro de usuario
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
      'INSERT INTO usuario (tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, rol, nombreUsuario, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [tipoIdentificacion, numIdentificacion, correoInstitucional, nombres, apellidos, 'Docente', nombreUsuario, hashedPassword]
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
  console.log('Solicitud recibida:', req.body);
  const { nombreUsuario, contrasenia } = req.body;

  try {
    const connection = await db;
    const [rows] = await connection.query('SELECT * FROM usuario WHERE nombreUsuario = ?', [nombreUsuario]);
    const user = rows[0];

    if (!user) {
      //return res.status(404).json({ error: 'Usuario no encontrado' });
      return res.status(401).json({ error: 'Nombre o contrasenia incorrecta' });
    }
    if(user.numeroIntentos >= 3){
      return res.status(429).json({ error: 'Demasiados intentos fallidos. Por favor, intenta de nuevo en 30 minutos' });
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


//FUNCIONES APARTE PARA CADA SOLICITUD
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) return res.status(401).send('Acceso denegado. No hay token.');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).send('Token inválido');
    req.user = decoded; // Almacenar la información del usuario decodificada
    next();
  });
};

const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).send('Acceso denegado. No tienes los permisos suficientes');
    }

    next(); // Si el usuario tiene el rol adecuado, continuar
  };
};

module.exports = { register, login, authenticate, authorize };
