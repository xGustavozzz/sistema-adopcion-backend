const db = require('../config/db');

exports.create = async ({ nombre, email, telefono, direccion, password_hash }) => {
  const result = await db.query(
    `INSERT INTO usuario (nombre, email, telefono, direccion, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_usuario, nombre, email, telefono, direccion, role, created_at`,
    [nombre, email, telefono, direccion, password_hash]
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

exports.findById = async (id) => {
  const result = await db.query(
    'SELECT id_usuario, nombre, email, telefono, direccion, role, created_at, updated_at FROM usuario WHERE id_usuario = $1',
    [id]
  );
  return result.rows[0];
};

exports.findAll = async () => {
  const result = await db.query(
    'SELECT id_usuario, nombre, email, telefono, direccion, role, created_at, updated_at FROM usuario'
  );
  return result.rows;
};

exports.update = async (id, fields) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) return await this.findById(id);
  // Si actualizan contraseña, hashearla
  let password_hash;
  if (fields.password) {
    const bcrypt = require('bcrypt');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    password_hash = await bcrypt.hash(fields.password, saltRounds);
    fields.password_hash = password_hash;
    delete fields.password;
  }
  const setClause = keys.map((key, i) => `${key === 'password' ? 'password_hash' : key} = $${i+1}`).join(', ');
  const values = keys.map(k => (k === 'password' ? fields.password_hash : fields[k]));
  values.push(id);
  const result = await db.query(
    `UPDATE usuario SET ${setClause} WHERE id_usuario = $${values.length} RETURNING id_usuario, nombre, email, telefono, direccion, role, created_at, updated_at`,
    values
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await db.query(
    'DELETE FROM usuario WHERE id_usuario = $1 RETURNING id_usuario',
    [id]
  );
  return result.rows[0];
};
