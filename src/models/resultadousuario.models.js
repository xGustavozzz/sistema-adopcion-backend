const db = require('../config/db');

// Obtener todos los resultados
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM resultadousuario');
    return result.rows;
};

// Obtener resultado por ID
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM resultadousuario WHERE id_resultado = $1', [id]);
    return result.rows[0];
};

// Obtener resultados por ID de usuario
exports.findByUsuario = async (id_usuario) => {
    const result = await db.query('SELECT * FROM resultadousuario WHERE id_usuario = $1', [id_usuario]);
    return result.rows;
};

// Insertar nuevo resultado
exports.insert = async ({ id_usuario, id_emocional, fecha_resultado }) => {
    const result = await db.query(
        `INSERT INTO resultadousuario (id_usuario, id_emocional, fecha_resultado)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [id_usuario, id_emocional, fecha_resultado]
    );
    return result.rows[0];
};

//findtipoemocional
exports.findByUsuario = async (id_usuario) => {
  const result = await db.query(
    `SELECT te.idtipoemocional, te.nombre_tipo, te.descripcion
     FROM resultadousuario ru
     JOIN tipoemocional te ON ru.idtipoemocional = te.idtipoemocional
     WHERE ru.id_usuario = $1`,
    [id_usuario]
  );
  return result.rows[0] || null;
};

// Actualizar resultado por ID
exports.update = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);

    const result = await db.query(
        `UPDATE resultadousuario
         SET ${setClause}
         WHERE id_resultado = $${values.length}
         RETURNING *`,
        values
    );
    return result.rows[0];
};

// Eliminar resultado por ID
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM resultadousuario WHERE id_resultado = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Eliminar todos los resultados por usuario
exports.removeByUsuario = async (id_usuario) => {
    const result = await db.query('DELETE FROM resultadousuario WHERE id_usuario = $1 RETURNING *', [id_usuario]);
    return result.rows;
};
