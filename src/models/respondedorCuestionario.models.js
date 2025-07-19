const db = require('../config/db');

// Verifica que la opción seleccionada pertenece a la pregunta
exports.verificarOpcion = async (id_opcion, id_pregunta) => {
    const result = await db.query(
        `SELECT id_emocional FROM opcionrespuesta 
         WHERE id_opcion = $1 AND id_pregunta = $2`,
        [id_opcion, id_pregunta]
    );
    return result.rows[0]; // null si no es válida
};

// Inserta el resultado final del usuario
exports.insertarResultado = async (id_usuario, id_emocional, compatibilidad) => {
    const result = await db.query(
        `INSERT INTO resultadousuario (id_usuario, id_emocional, fecha_resultado, compatibilidad) 
         VALUES ($1, $2, NOW(), $3) RETURNING *`,
        [id_usuario, id_emocional, compatibilidad]
    );
    return result.rows[0];
};

/*
exports.eliminarResultadoPorUsuario = async (id_usuario) => {
    await db.query(
        `DELETE FROM resultadousuario WHERE id_usuario = $1`,
        [id_usuario]
    );
};
*/