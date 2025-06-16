const express = require('express');
const router = express.Router();
const usuariosModel = require('./usuariosModel');


router.post('/register', async (req, res) => {
  try {
    const nuevoUsuario = await usuariosModel.registrarUsuario(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito', user: nuevoUsuario });
  } catch (error) {
    if (error.message === 'El email ya está registrado') {
      res.status(400).json({ error: error.message }); // ← nuevo manejo de error
    } else {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
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
