const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta donde estan las imagenes de los productos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
const productosRoutes = require('./productosRoutes');
const usuariosRoutes = require('./usuariosRoutes');

app.use('/api/productos', productosRoutes);
app.use('/', usuariosRoutes); // ✅ Ahora /register y /login funcionan sin prefijo

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
