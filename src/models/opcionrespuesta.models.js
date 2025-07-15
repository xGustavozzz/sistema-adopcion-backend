const db = require('../config/db');

// Obtener todas las opciones de respuesta
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM opcionrespuesta');
    return result.rows;
};

// Obtener una opción por ID
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM opcionrespuesta WHERE id_opcion = $1', [id]);
    return result.rows[0];
};

// Insertar nueva opción de respuesta
exports.insert = async (opcion) => {
    const { id_pregunta, texto_opcion, id_emocional } = opcion;
    const result = await db.query(
        `INSERT INTO opcionrespuesta (id_pregunta, texto_opcion, id_emocional)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [id_pregunta, texto_opcion, id_emocional]
    );
    return result.rows[0];
};

// Actualizar una opción por ID
exports.update = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);

    const result = await db.query(
        `UPDATE opcionrespuesta SET ${setClause} WHERE id_opcion = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

// Eliminar una opción por ID
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM opcionrespuesta WHERE id_opcion = $1 RETURNING *', [id]);
    return result.rows[0];
};
