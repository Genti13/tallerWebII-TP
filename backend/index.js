// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Datos en memoria (esto reemplaza la BD, es solo para pruebas)
let productos = [
  { id: 1, nombre: 'Camiseta', descripcion: 'Camiseta deportiva', clasificacion: 'Ropa', precio: 2000 },
  { id: 2, nombre: 'Zapatillas', descripcion: 'Para correr', clasificacion: 'Calzado', precio: 5000 },
];
let carrito = [];

// Obtener productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Agregar producto al carrito
app.post('/carrito', (req, res) => {
  const { id } = req.body;
  const prod = productos.find(p => p.id === id);
  if (prod) {
    carrito.push(prod);
    res.json({ ok: true, carrito });
  } else {
    res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
  }
});

// Ver el carrito
app.get('/carrito', (req, res) => {
  res.json(carrito);
});

// (Opcional) cargar nuevo producto
app.post('/productos', (req, res) => {
  const prod = req.body;
  prod.id = productos.length + 1;
  productos.push(prod);
  res.json(prod);
});

// Limpiar carrito (opcional)
app.delete('/carrito', (req, res) => {
  carrito = [];
  res.json({ ok: true, mensaje: 'Carrito vaciado' });
});

app.listen(3000, () => console.log('API backend corriendo en http://localhost:3000'));
