const db = require('../config/db');

exports.findByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

exports.insert = async ({ nombre, email, password_hash, rol }) => {
  const result = await db.query(
    `INSERT INTO usuario (nombre, email, password_hash, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING id_usuario, nombre, email, rol, created_at`,
    [nombre, email, password_hash, rol]
  );
  return result.rows[0];
};