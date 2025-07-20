const db = require("../config/db");

exports.insert = async (id_mascota, buffer, orden = 1) => {
  const result = await db.query(
    `INSERT INTO mascota_imagen (id_mascota, imagen, orden)
     VALUES ($1, $2, $3)
     RETURNING id_imagen`,
    [id_mascota, buffer, orden]
  );
  return result.rows[0];
};

exports.findByMascota = async (id_mascota) => {
  const result = await db.query(
    `SELECT
       replace(encode(imagen, 'base64'), E'\\n','') AS imagen,
       orden
     FROM mascota_imagen
     WHERE id_mascota = $1
     ORDER BY orden`,
    [id_mascota]
  );
  return result.rows;
};

exports.removeByMascota = async (id_mascota) => {
  await db.query(`DELETE FROM mascota_imagen WHERE id_mascota = $1`, [
    id_mascota,
  ]);
};

exports.removeById = async (id_imagen) => {
  const result = await db.query(
    `DELETE FROM mascota_imagen WHERE id_imagen = $1 RETURNING *`,
    [id_imagen]
  );
  return result.rows[0];
};

exports.getMaxOrden = async (id_mascota) => {
  const result = await db.query(
    `SELECT COALESCE(MAX(orden), 0) AS max
       FROM mascota_imagen
      WHERE id_mascota = $1`,
    [id_mascota]
  );
  return parseInt(result.rows[0].max, 10);
};

