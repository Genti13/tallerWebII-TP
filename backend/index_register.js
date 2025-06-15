const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// // Ruta para registrar usuario
// app.post('/register', (req, res) => {
//   const user = req.body;
//   console.log('Usuario recibido:', user);

//   
//   res.status(200).json({ message: 'Usuario registrado con éxito' });
// });

const usuarios = []; //  Array en memoria para guardar usuarios

app.post('/register', (req, res) => {
  const user = req.body;
  usuarios.push(user); // Guardar temporalmente
  console.log('Usuarios:', usuarios); // Ver la lista en consola
  res.status(200).json({ message: 'Usuario registrado con éxito' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const usuarioEncontrado = usuarios.find(u =>
  u.email === email && u.password === password && !u.logueado
);

  if (usuarioEncontrado) {
    res.status(200).json({ message: 'Login exitoso', user: usuarioEncontrado });
  } else {
    res.status(401).json({ message: 'Email o contraseña incorrectos' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
