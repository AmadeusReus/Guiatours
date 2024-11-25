const db = require('../config/db');

exports.getCiudades = (req, res) => {
  const query = 'SELECT * FROM ciudades';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las ciudades:', err);
      return res.status(500).json({ mensaje: 'Error al obtener las ciudades' });
    }
    res.json(results);
  });
};

exports.getCiudadById = (req, res) => {
  const ciudadId = req.params.id;

  const ciudadQuery = 'SELECT * FROM ciudades WHERE id = ?';
  const atraccionesQuery = 'SELECT * FROM atracciones WHERE ciudad_id = ?';
  const guiasQuery = 'SELECT * FROM guias WHERE ciudad_id = ?';

  db.query(ciudadQuery, [ciudadId], (err, resultadosCiudad) => {
    if (err || resultadosCiudad.length === 0) {
      return res.status(404).json({ mensaje: 'Ciudad no encontrada' });
    }

    db.query(atraccionesQuery, [ciudadId], (err, resultadosAtracciones) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al obtener las atracciones' });
      }

      db.query(guiasQuery, [ciudadId], (err, resultadosGuias) => {
        if (err) {
          return res.status(500).json({ mensaje: 'Error al obtener los guías' });
        }

        res.json({
          ciudad: resultadosCiudad[0],
          atracciones: resultadosAtracciones,
          guias: resultadosGuias,
        });
      });
    });
  });
};
