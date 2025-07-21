const db = require('../config/db');

//devuelve resultado de una consulta a la tabla mascota
exports.findAll = async () => {
    const result = await db.query(    
    `SELECT DISTINCT ON (m.id_mascota)
      m.id_mascota,
      m.nombre,
      m.especie,
      m.tamano,
      m.edad,
      m.sexo,
      m.descripcion,
      m.estado_adopcion,
      m.lugar_actual,
      m.requerimientos,
      m.id_emocional,
      te.descripcion AS perfil_emocional,
      replace(encode(mi.imagen, 'base64'), E'\\n','') AS imagen
    FROM mascota m
    LEFT JOIN tipoemocional te
      ON te.id_emocional = m.id_emocional
    LEFT JOIN mascota_imagen mi
      ON mi.id_mascota = m.id_mascota AND mi.orden = 1
    ORDER BY m.id_mascota;`
  );
    return result.rows;
};

//devuelve un mascota por su id
exports.findById = async (id) => {
    const result = await db.query('SELECT * FROM mascota WHERE id_mascota = $1', [id]);
    return result.rows[0];
};

//inserta un nuevo mascota
exports.insert = async (mascota) => {
    const {nombre, especie, tamano, edad, sexo, descripcion, estado_adopcion, lugar_actual, requerimientos, id_emocional} = mascota;
    const result = await db.query(
        `INSERT INTO mascota 
        (nombre, especie, tamano, edad, sexo, descripcion, estado_adopcion, lugar_actual, requerimientos, id_emocional)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [nombre, especie, tamano, edad, sexo, descripcion, estado_adopcion, lugar_actual, requerimientos, id_emocional]
    );
    return result.rows[0];
};

//actualiza un mascota por su id
exports.update = async (id, fields) => {
    // Construir la consulta de actualización dinámicamente
    const keys = Object.keys(fields);
    if (keys.length === 0) return await this.findById(id); // No fields to update

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id); // Agregar el id al final para la cláusula WHERE

    const result = await db.query(
        `UPDATE mascota 
        SET ${setClause} 
        WHERE id_mascota = $${values.length} 
        RETURNING *`,
        values
    );
    return result.rows[0];
};

//elimina un mascota por su id
exports.remove = async (id) => {
    const result = await db.query('DELETE FROM mascota WHERE id_mascota = $1 RETURNING *', [id]);
    return result.rows[0];
};