const db = require('../config/db');

// Devuelve todos los cuestionarios
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM cuestionario');
    return result.rows;
};

// Devuelve un cuestionario por su ID
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM cuestionario WHERE id_cuestionario = $1', [id]);
    return result.rows[0];
};

// Inserta un nuevo cuestionario
exports.insert = async (cuestionario) => {
    const { descripcion } = cuestionario;
    const result = await db.query(
        `INSERT INTO cuestionario (descripcion) 
         VALUES ($1) 
         RETURNING *`,
        [descripcion]
    );
    return result.rows[0];
};

// Actualiza un cuestionario por su ID
exports.update = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);

    const result = await db.query(
        `UPDATE cuestionario 
         SET ${setClause} 
         WHERE id_cuestionario = $${values.length} 
         RETURNING *`,
        values
    );
    return result.rows[0];
};

// Elimina un cuestionario por su ID
exports.remove = async (id) => {
    const result = await db.query(
        'DELETE FROM cuestionario WHERE id_cuestionario = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};
