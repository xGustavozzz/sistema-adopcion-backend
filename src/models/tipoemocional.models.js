const db = require('../config/db');

// Obtener todos los tipos emocionales
exports.findAll = async () => {
    const result = await db.query('SELECT * FROM tipoemocional');
    return result.rows;
};

// Obtener tipo emocional por ID
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM tipoemocional WHERE id_emocional = $1', [id]);
    return result.rows[0];
};

// Insertar nuevo tipo emocional
exports.insert = async ({ descripcion }) => {
    const result = await db.query(
        `INSERT INTO tipoemocional (descripcion) 
         VALUES ($1) 
         RETURNING *`,
        [descripcion]
    );
    return result.rows[0];
};

// Actualizar tipo emocional por ID
exports.update = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id);

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);

    const result = await db.query(
        `UPDATE tipoemocional SET ${setClause} WHERE id_emocional = $${values.length} RETURNING *`,
        values
    );
    return result.rows[0];
};

// Eliminar tipo emocional por ID
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM tipoemocional WHERE id_emocional = $1 RETURNING *', [id]);
    return result.rows[0];
};
