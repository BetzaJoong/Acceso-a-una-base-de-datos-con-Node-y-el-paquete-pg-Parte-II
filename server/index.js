// server/index.js
const express = require('express');
const app = express();
const cors = require('cors');
const postsRouter = require('./posts');

app.use(cors());
app.use(express.json()); 

// Rutas relacionadas con los posts
app.use('/posts', postsRouter);

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
  res.send('Hola, esta es la ruta principal.');
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Enlace del backend: http://localhost:${PORT}`);
});
