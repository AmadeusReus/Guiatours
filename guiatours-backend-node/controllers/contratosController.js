const db = require('../config/db');

// Registrar un nuevo contrato
exports.createContract = (req, res) => {
  const { guia_id, usuario_id, num_personas, monto } = req.body;

  if (!guia_id || !usuario_id || !num_personas || !monto) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO contratos (guia_id, usuario_id, num_personas, monto)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [guia_id, usuario_id, num_personas, monto], (err, result) => {
    if (err) {
      console.error('Error al registrar el contrato:', err);
      return res.status(500).json({ mensaje: 'Error al registrar el contrato' });
    }

    res.status(201).json({ mensaje: 'Contrato registrado exitosamente', contratoId: result.insertId });
  });
};

// Obtener métricas del guía
exports.getGuideMetrics = (req, res) => {
  const { guia_id } = req.params;

  if (!guia_id) {
    return res.status(400).json({ mensaje: 'El ID del guía es obligatorio' });
  }

  const query = `
    SELECT COUNT(*) AS veces_contratado, SUM(monto) AS total_ganado
    FROM contratos
    WHERE guia_id = ?
  `;

  db.query(query, [guia_id], (err, results) => {
    if (err) {
      console.error('Error al obtener métricas del guía:', err);
      return res.status(500).json({ mensaje: 'Error al obtener métricas del guía' });
    }

    const metrics = results[0];
    res.json({
      veces_contratado: metrics.veces_contratado || 0,
      total_ganado: metrics.total_ganado || 0,
    });
  });
};
