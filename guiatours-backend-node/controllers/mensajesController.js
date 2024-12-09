const db = require('../config/db');

// Enviar un mensaje
exports.enviarMensaje = (req, res) => {
  const { usuario_id, guia_id, contenido, emisor } = req.body;

  if (!usuario_id || !guia_id || !contenido || !emisor) {
    console.error('Campos obligatorios faltantes:', { usuario_id, guia_id, contenido, emisor });
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
  }

  const query = `
    INSERT INTO mensajes (usuario_id, guia_id, contenido, emisor)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [usuario_id, guia_id, contenido, emisor], (err, results) => {
    if (err) {
      console.error('Error al enviar el mensaje:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor.' });
    }

    console.log('Mensaje enviado correctamente. ID:', results.insertId);
    res.status(201).json({
      mensaje: 'Mensaje enviado correctamente.',
      mensajeId: results.insertId,
    });
  });
};

// Obtener mensajes entre un usuario y un guía
exports.obtenerMensajes = (req, res) => {
  const { usuario_id, guia_id } = req.params;

  if (!usuario_id || !guia_id) {
    console.error('Usuario ID o Guía ID faltantes:', { usuario_id, guia_id });
    return res.status(400).json({ mensaje: 'Usuario ID y Guía ID son obligatorios.' });
  }

  const query = `
    SELECT id, contenido, emisor, timestamp
    FROM mensajes
    WHERE usuario_id = ? AND guia_id = ?
    ORDER BY timestamp ASC
  `;

  db.query(query, [usuario_id, guia_id], (err, results) => {
    if (err) {
      console.error('Error al obtener mensajes entre usuario y guía:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor.' });
    }

    console.log('Mensajes obtenidos para usuario_id y guia_id:', { usuario_id, guia_id, mensajes: results });
    res.status(200).json({ mensajes: results });
  });
};

// Obtener todos los mensajes relacionados con un guía
exports.obtenerMensajesGuia = (req, res) => {
  let { guia_id } = req.params;

  // Validar que guia_id sea un número
  guia_id = parseInt(guia_id, 10);
  if (isNaN(guia_id)) {
    console.error('ID del guía no es válido:', req.params.guia_id);
    return res.status(400).json({ mensaje: 'El ID del guía debe ser un número válido.' });
  }

  const query = `
    SELECT usuario_id, contenido, emisor, timestamp
    FROM mensajes
    WHERE guia_id = ?
    ORDER BY timestamp ASC
  `;

  db.query(query, [guia_id], (err, results) => {
    if (err) {
      console.error('Error al obtener mensajes del guía:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor.' });
    }

    console.log('Mensajes obtenidos para guia_id:', { guia_id, mensajes: results });
    res.status(200).json({ mensajes: results });
  });
};
