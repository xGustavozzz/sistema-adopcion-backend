const db = require('../config/db');

// Obtener todas las preguntas
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM pregunta');
    return result.rows;
};

// Obtener pregunta por ID
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM pregunta WHERE id_pregunta = $1', [id]);
    return result.rows[0];
};

// Insertar nueva pregunta
exports.insert = async (pregunta) => {
    const { id_cuestionario, texto_pregunta } = pregunta;
    const result = await db.query(
        `INSERT INTO pregunta (id_cuestionario, texto_pregunta) 
         VALUES ($1, $2) 
         RETURNING *`,
        [id_cuestionario, texto_pregunta]
    );
    return result.rows[0];
};

// Actualizar una pregunta por ID
exports.update = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);

    const result = await db.query(
        `UPDATE pregunta SET ${setClause} WHERE id_pregunta = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

// Eliminar pregunta por ID
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM pregunta WHERE id_pregunta = $1 RETURNING *', [id]);
    return result.rows[0];
};
