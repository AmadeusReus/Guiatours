const db = require('../config/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave segura

// Registro de usuario
exports.register = (req, res) => {
  const { nombre_completo, email, contrasena } = req.body;

  if (!nombre_completo || !email || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre_completo, email, contrasena_hash) VALUES (?, ?, ?)';
  const contrasenaHash = contrasena;

  db.query(query, [nombre_completo, email, contrasenaHash], (err) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      return res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  });
};

// Inicio de sesión de usuario
exports.login = (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const user = results[0];
    if (user.contrasena_hash !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  });
};

// Registro de guía
exports.registerGuide = (req, res) => {
  const {
    nombre,
    email,
    contrasena,
    whatsapp,
    ciudad_id,
    experiencia = 'Información no disponible', // Valor predeterminado
    sobre_mi = 'Información no disponible', // Valor predeterminado
    tarifa = '0 COP', // Valor predeterminado
    tour = 'Tour no especificado', // Valor predeterminado
    calificacion = 0.0 // Valor predeterminado
  } = req.body;

  if (!nombre || !email || !contrasena || !whatsapp || !ciudad_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const checkQuery = 'SELECT * FROM guias WHERE email = ? OR whatsapp = ?';
  db.query(checkQuery, [email, whatsapp], (err, results) => {
    if (err) {
      console.error('Error al verificar email o whatsapp:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length > 0) {
      return res.status(409).json({ mensaje: 'El email o el whatsapp ya están registrados' });
    }

    const insertQuery = `
      INSERT INTO guias (nombre, email, contrasena, whatsapp, ciudad_id, experiencia, sobre_mi, tarifa, tour, calificacion, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(insertQuery, [nombre, email, contrasena, whatsapp, ciudad_id, experiencia, sobre_mi, tarifa, tour, calificacion], (err) => {
      if (err) {
        console.error('Error al registrar el guía:', err);
        return res.status(500).json({ mensaje: 'Error al registrar el guía' });
      }

      res.status(201).json({ mensaje: 'Guía registrado correctamente' });
    });
  });
};

// Inicio de sesión de guía
exports.loginGuide = (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const query = 'SELECT * FROM guias WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ mensaje: 'Guía no encontrado' });
    }

    const guia = results[0];
    if (guia.contrasena !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: guia.id, email: guia.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ mensaje: 'Inicio de sesión exitoso', token, guiaId: guia.id });
  });
};
