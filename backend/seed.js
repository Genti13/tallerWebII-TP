const pool = require('./db');

const productos = [
  { nombre: 'Alimento para Perros', descripcion: 'Bolsa de 10kg de alimento premium para perros adultos', clasificacion: 'Alimento', precio: 5200.00, imagen_url: 'http://localhost:3000/public/alimentoparaperros.jpg' },
  { nombre: 'Alimento para Gatos', descripcion: 'Bolsa de 7kg de alimento para gatos esterilizados', clasificacion: 'Alimento', precio: 4200.00, imagen_url: 'http://localhost:3000/public/alimentoparagatos.jpg' },
  { nombre: 'Correa Retráctil', descripcion: 'Correa retráctil de 5 metros para perros medianos', clasificacion: 'Accesorios', precio: 1800.00, imagen_url: 'http://localhost:3000/public/correaperro.jpg' },
  { nombre: 'Juguete de Goma', descripcion: 'Juguete mordedor de goma para perros', clasificacion: 'Juguetes', precio: 650.00, imagen_url: 'http://localhost:3000/public/juguetemordedor.jpg' },
  { nombre: 'Rascador para Gatos', descripcion: 'Rascador de sisal para gatos', clasificacion: 'Accesorios', precio: 2300.00, imagen_url: 'http://localhost:3000/public/rascadorgato.jpg' },
  { nombre: 'Shampoo Antipulgas', descripcion: 'Shampoo antipulgas para perros y gatos, 250ml', clasificacion: 'Higiene', precio: 890.00, imagen_url: 'http://localhost:3000/public/shampoo.jpg' },
  { nombre: 'Comedero Doble', descripcion: 'Comedero doble de acero inoxidable', clasificacion: 'Accesorios', precio: 1200.00, imagen_url: 'http://localhost:3000/public/comedero.jpg' },
  { nombre: 'Transportadora Plástica', descripcion: 'Transportadora tamaño chico para gatos o perros pequeños', clasificacion: 'Transporte', precio: 3600.00, imagen_url: 'http://localhost:3000/public/transportadora.jpg' },
  { nombre: 'Piedras Sanitarias', descripcion: 'Bolsa de 8kg de piedras sanitarias para gatos', clasificacion: 'Higiene', precio: 1500.00, imagen_url: 'http://localhost:3000/public/piedras.jpg' },
  { nombre: 'Cama Acolchada', descripcion: 'Cama acolchada mediana para perros y gatos', clasificacion: 'Camas', precio: 3200.00, imagen_url: 'http://localhost:3000/public/cama.jpg' },
];

async function seed() {
  try {
    for (const p of productos) {
    await pool.query(
      'INSERT INTO productos (nombre, descripcion, clasificacion, precio, imagen_url) VALUES ($1, $2, $3, $4, $5)',
      [p.nombre, p.descripcion, p.clasificacion, p.precio, p.imagen_url]
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
