const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

// Rutas
const ciudadesRoutes = require('./routes/ciudades');
const guiasRoutes = require('./routes/guias');
const authRoutes = require('./routes/auth');
const mensajesRoutes = require('./routes/mensajes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Probar conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit();
  }
  console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.use('/api/ciudades', ciudadesRoutes);
app.use('/api/guias', guiasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mensajes', mensajesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});