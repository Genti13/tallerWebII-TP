const express = require('express');
const router = express.Router();
const usuariosModel = require('./usuariosModel');

router.post('/register', async (req, res) => {
  const { password, confirmar } = req.body;

  if (!password || !confirmar) {
    return res.status(400).json({ error: 'La contraseña y su confirmación son requeridas' });
  }
  if (password !== confirmar) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    const nuevoUsuario = await usuariosModel.registrarUsuario(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito', user: nuevoUsuario });
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.message === 'El email ya está registrado') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await usuariosModel.buscarUsuario(email, password);
    if (!usuario) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    res.json({ message: 'Login exitoso', user: usuario });
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
