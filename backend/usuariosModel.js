const pool = require('./db'); 

async function registrarUsuario(usuario) {
  const { nombre, apellido, direccion, email, password } = usuario;

  // Verificar si ya existe un usuario con ese email
  const existe = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  if (existe.rows.length > 0) {
    throw new Error('El email ya está registrado');
  }

  // Insertar si no existe
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, direccion, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, apellido, direccion, email, password]
  );

  return result.rows[0];
}

module.exports = {
  registrarUsuario,
  buscarUsuario: async (email, password) => {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
      [email, password]
    );
    return result.rows[0];
  }
};
