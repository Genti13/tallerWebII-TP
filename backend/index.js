// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de productos
const productosRoutes = require('./productosRoutes');
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
