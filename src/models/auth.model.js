const db = require('../config/db');

exports.findByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

exports.insert = async ({ nombre, email, telefono, direccion, password_hash }) => {
  const result = await db.query(
    `INSERT INTO usuario (nombre, email, telefono, direccion, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_usuario, nombre, email, telefono, direccion, created_at`,
    [nombre, email, telefono, direccion, password_hash]
  );
  return result.rows[0];
};