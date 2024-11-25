const db = require('../config/db');

// Enviar un mensaje
exports.enviarMensaje = (req, res) => {
  const { usuario_id, guia_id, contenido, emisor } = req.body;

  if (!usuario_id || !guia_id || !contenido || !emisor) {
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
      console.error('Error al obtener mensajes:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor.' });
    }

    res.status(200).json({ mensajes: results });
  });
};
