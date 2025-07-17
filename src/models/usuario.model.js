const db = require('../config/db');

exports.create = async ({ nombre, email, telefono, direccion, password_hash, role }) => {
  const result = await db.query(
    `INSERT INTO usuario (nombre, email, telefono, direccion, password_hash, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id_usuario, nombre, email, telefono, direccion, role, created_at`,
    [nombre, email, telefono, direccion, password_hash, role]
  );
  return result.rows[0];
};

exports.findByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  );
  return result.rows[0];
};