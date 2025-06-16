const productosModel = require('./productosModel');

async function getProductos(req, res) {
  try {
    const productos = await productosModel.getAllProductos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProducto(req, res) {
  try {
    const producto = await productosModel.getProductoById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createProducto(req, res) {
  try {
    const nuevoProducto = await productosModel.createProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateProducto(req, res) {
  try {
    const productoActualizado = await productosModel.updateProducto(req.params.id, req.body);
    if (!productoActualizado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteProducto(req, res) {
  try {
    await productosModel.deleteProducto(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto
};
