const pool = require('./db');

async function getAllProductos() {
  const result = await pool.query('SELECT * FROM productos');
  return result.rows;
}

async function getProductoById(id) {
  const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
  return result.rows[0];
}

async function createProducto({ nombre, descripcion, clasificacion, precio }) {
  const result = await pool.query(
    'INSERT INTO productos (nombre, descripcion, clasificacion, precio) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, descripcion, clasificacion, precio]
  );
  return result.rows[0];
}

async function updateProducto(id, { nombre, descripcion, clasificacion, precio }) {
  const result = await pool.query(
    'UPDATE productos SET nombre=$1, descripcion=$2, clasificacion=$3, precio=$4 WHERE id=$5 RETURNING *',
    [nombre, descripcion, clasificacion, precio, id]
  );
  return result.rows[0];
}

async function deleteProducto(id) {
  await pool.query('DELETE FROM productos WHERE id = $1', [id]);
}

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
