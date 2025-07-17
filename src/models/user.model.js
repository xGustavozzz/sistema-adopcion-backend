const db = require('../config/db');

exports.findAll = async () => {
  const result = await db.query(
    'SELECT id_usuario, nombre, email, rol, created_at, updated_at FROM usuario'
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query(
    'SELECT id_usuario, nombre, email, rol, created_at, updated_at FROM usuario WHERE id_usuario = $1',
    [id]
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

exports.update = async (id, fields) => {
  const keys = Object.keys(fields);
  const setClause = keys.map((k, i) => `${k} = $${i+1}`).join(', ');
  const values = keys.map(k => fields[k]);
  values.push(id);
  const result = await db.query(
    `UPDATE usuario SET ${setClause} WHERE id_usuario = $${values.length} RETURNING id_usuario, nombre, email, rol, created_at, updated_at`,
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
