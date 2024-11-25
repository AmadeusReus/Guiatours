const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Obtener los detalles de un guía por ID
exports.getGuiaById = (req, res) => {
  const { id } = req.params;

  const guiaQuery = `
    SELECT g.*, DATE_FORMAT(g.created_at, '%d-%m-%Y') AS fecha_registro
    FROM guias g
    WHERE g.id = ?
  `;

  const reseñasQuery = `
    SELECT r.texto, r.calificacion, DATE_FORMAT(r.fecha, '%d-%m-%Y') AS fecha, u.nombre_completo AS usuario
    FROM resenas_guias r
    INNER JOIN usuarios u ON r.usuario_id = u.id
    WHERE r.guia_id = ?
  `;

  db.query(guiaQuery, [id], (err, guiaResults) => {
    if (err) {
      console.error('Error al obtener los detalles del guía:', err);
      return res.status(500).json({ mensaje: 'Error al obtener los detalles del guía' });
    }

    if (guiaResults.length === 0) {
      return res.status(404).json({ mensaje: 'Guía no encontrado' });
    }

    const guia = guiaResults[0];

    db.query(reseñasQuery, [id], (err, reseñasResults) => {
      if (err) {
        console.error('Error al obtener las reseñas:', err);
        return res.status(500).json({ mensaje: 'Error al obtener las reseñas' });
      }

      res.json({
        id: guia.id,
        nombre: guia.nombre,
        experiencia: guia.experiencia,
        idiomas: guia.idiomas,
        foto: guia.foto,
        especialidad: guia.especialidad,
        sobre_mi: guia.sobre_mi,
        tarifa: guia.tarifa,
        tour: guia.tour,
        calificacion: guia.calificacion,
        contacto: {
          email: guia.email,
          whatsapp: guia.whatsapp,
        },
        fecha_registro: guia.fecha_registro,
        reseñas: reseñasResults,
      });
    });
  });
};

// Agregar una reseña a un guía
exports.addResena = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta'); // Cambia 'tu_clave_secreta' por tu clave real
    const usuario_id = decoded.id;

    const { texto, calificacion } = req.body;
    const { id: guia_id } = req.params;

    if (!texto || !calificacion) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    const query = `
      INSERT INTO resenas_guias (guia_id, usuario_id, texto, calificacion, fecha)
      VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(query, [guia_id, usuario_id, texto, calificacion], (err) => {
      if (err) {
        console.error('Error al agregar la reseña:', err);
        return res.status(500).json({ mensaje: 'Error al agregar la reseña' });
      }

      res.status(201).json({
        mensaje: 'Reseña agregada correctamente',
        reseña: { usuario_id, texto, calificacion, fecha: new Date().toISOString() },
      });
    });
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

// Actualizar datos del guía sin token
exports.updateGuia = (req, res) => {
  const guiaId = parseInt(req.params.id, 10); // ID enviado en la URL
  if (isNaN(guiaId)) {
    return res.status(400).json({ mensaje: 'ID del guía inválido' });
  }

  const { nombre, experiencia, idiomas, especialidad, sobre_mi, tarifa, tour, whatsapp } = req.body;

  // Validar los datos obligatorios
  if (!nombre || !whatsapp) {
    return res.status(400).json({ mensaje: 'Nombre y WhatsApp son obligatorios' });
  }

  const updateQuery = `
    UPDATE guias
    SET nombre = ?, experiencia = ?, idiomas = ?, especialidad = ?, sobre_mi = ?, tarifa = ?, tour = ?, whatsapp = ?
    WHERE id = ?
  `;

  db.query(
    updateQuery,
    [nombre, experiencia, idiomas, especialidad, sobre_mi, tarifa, tour, whatsapp, guiaId],
    (err) => {
      if (err) {
        console.error('Error al actualizar los datos del guía:', err);
        return res.status(500).json({ mensaje: 'Error al actualizar los datos del guía' });
      }

      res.status(200).json({ mensaje: 'Datos del guía actualizados correctamente' });
    }
  );
};
