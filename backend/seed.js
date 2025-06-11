// backend/seed.js
const pool = require('./db');

const productos = [
  { nombre: 'Alimento para Perros', descripcion: 'Bolsa de 10kg de alimento premium para perros adultos', clasificacion: 'Alimento', precio: 5200.00 },
  { nombre: 'Alimento para Gatos', descripcion: 'Bolsa de 7kg de alimento para gatos esterilizados', clasificacion: 'Alimento', precio: 4200.00 },
  { nombre: 'Correa Retráctil', descripcion: 'Correa retráctil de 5 metros para perros medianos', clasificacion: 'Accesorios', precio: 1800.00 },
  { nombre: 'Juguete de Goma', descripcion: 'Juguete mordedor de goma para perros', clasificacion: 'Juguetes', precio: 650.00 },
  { nombre: 'Rascador para Gatos', descripcion: 'Rascador de sisal para gatos', clasificacion: 'Accesorios', precio: 2300.00 },
  { nombre: 'Shampoo Antipulgas', descripcion: 'Shampoo antipulgas para perros y gatos, 250ml', clasificacion: 'Higiene', precio: 890.00 },
  { nombre: 'Comedero Doble', descripcion: 'Comedero doble de acero inoxidable', clasificacion: 'Accesorios', precio: 1200.00 },
  { nombre: 'Transportadora Plástica', descripcion: 'Transportadora tamaño chico para gatos o perros pequeños', clasificacion: 'Transporte', precio: 3600.00 },
  { nombre: 'Piedras Sanitarias', descripcion: 'Bolsa de 8kg de piedras sanitarias para gatos', clasificacion: 'Higiene', precio: 1500.00 },
  { nombre: 'Cama Acolchada', descripcion: 'Cama acolchada mediana para perros y gatos', clasificacion: 'Camas', precio: 3200.00 },
];

async function seed() {
  try {
    for (const p of productos) {
      await pool.query(
        'INSERT INTO productos (nombre, descripcion, clasificacion, precio) VALUES ($1, $2, $3, $4)',
        [p.nombre, p.descripcion, p.clasificacion, p.precio]
      );
    }
    console.log('¡Datos de ejemplo de Petshop insertados!');
  } catch (err) {
    console.error('Error al insertar datos:', err);
  } finally {
    await pool.end();
    process.exit();
  }
}

seed();
