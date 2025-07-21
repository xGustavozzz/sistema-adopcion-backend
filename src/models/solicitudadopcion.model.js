// models/solicitudAdopcionModel.js
const db = require('../config/db'); // Asume que tienes un archivo db.js en config/

/**
 * @module SolicitudAdopcionModel
 * @description Módulo para interactuar con la tabla 'solicitudadopcion' en la base de datos.
 */

/**
 * Crea una nueva solicitud de adopción.
 * @param {number} id_usuario - El ID del usuario que realiza la solicitud.
 * @param {number} id_mascota - El ID de la mascota solicitada.
 * @returns {Promise<object>} La solicitud de adopción creada.
 */
exports.createRequest = async (id_usuario, id_mascota) => {
    try {
        const result = await db.query(
            `INSERT INTO public.solicitudadopcion (id_usuario, id_mascota, fecha_solicitud, estado_solicitud)
             VALUES ($1, $2, CURRENT_DATE, 'en_revision')
             RETURNING *`, // Retorna todos los campos de la fila insertada
            [id_usuario, id_mascota]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear solicitud de adopción:', error);
        throw error; // Propaga el error para que sea manejado por el servicio/controlador
    }
};

/**
 * Obtiene todas las solicitudes de adopción.
 * @returns {Promise<Array<object>>} Un array de todas las solicitudes de adopción.
 */
exports.getAllRequests = async () => {
    try {
        const result = await db.query(
            `SELECT
                sa.id_solicitud,
                sa.id_usuario,
                u.nombre AS nombre_usuario, -- Asumiendo que tienes una tabla 'usuario' con 'nombre'
                sa.id_mascota,
                m.nombre AS nombre_mascota, -- Asumiendo que tienes una tabla 'mascota' con 'nombre'
                sa.fecha_solicitud,
                sa.estado_solicitud,
                sa.motivo_rechazo,
                sa.fecha_revision
            FROM public.solicitudadopcion sa
            LEFT JOIN public.usuario u ON sa.id_usuario = u.id_usuario
            LEFT JOIN public.mascota m ON sa.id_mascota = m.id_mascota
            ORDER BY sa.fecha_solicitud DESC`
        );
        return result.rows;
    } catch (error) {
        console.error('Error al obtener todas las solicitudes de adopción:', error);
        throw error;
    }
};

/**
 * Obtiene una solicitud de adopción por su ID.
 * @param {number} id_solicitud - El ID de la solicitud a buscar.
 * @returns {Promise<object|null>} La solicitud de adopción si se encuentra, de lo contrario null.
 */
exports.getRequestById = async (id_solicitud) => {
    try {
        const result = await db.query(
            `SELECT
                sa.id_solicitud,
                sa.id_usuario,
                u.nombre AS nombre_usuario,
                sa.id_mascota,
                m.nombre AS nombre_mascota,
                sa.fecha_solicitud,
                sa.estado_solicitud,
                sa.motivo_rechazo,
                sa.fecha_revision
            FROM public.solicitudadopcion sa
            LEFT JOIN public.usuario u ON sa.id_usuario = u.id_usuario
            LEFT JOIN public.mascota m ON sa.id_mascota = m.id_mascota
            WHERE sa.id_solicitud = $1`,
            [id_solicitud]
        );
        return result.rows[0] || null; // Retorna la primera fila o null si no se encuentra
    } catch (error) {
        console.error(`Error al obtener solicitud de adopción con ID ${id_solicitud}:`, error);
        throw error;
    }
};

/**
 * Obtiene todas las solicitudes de adopción para un usuario específico.
 * @param {number} id_usuario - El ID del usuario cuyas solicitudes se desean obtener.
 * @returns {Promise<Array<object>>} Un array de solicitudes de adopción del usuario.
 */
exports.getRequestsByUserId = async (id_usuario) => {
    try {
        const result = await db.query(
            `SELECT
                sa.id_solicitud,
                sa.id_usuario,
                u.nombre AS nombre_usuario,
                sa.id_mascota,
                m.nombre AS nombre_mascota,
                sa.fecha_solicitud,
                sa.estado_solicitud,
                sa.motivo_rechazo,
                sa.fecha_revision
            FROM public.solicitudadopcion sa
            LEFT JOIN public.usuario u ON sa.id_usuario = u.id_usuario
            LEFT JOIN public.mascota m ON sa.id_mascota = m.id_mascota
            WHERE sa.id_usuario = $1
            ORDER BY sa.fecha_solicitud DESC`,
            [id_usuario]
        );
        return result.rows;
    } catch (error) {
        console.error(`Error al obtener solicitudes de adopción para el usuario con ID ${id_usuario}:`, error);
        throw error;
    }
};

/**
 * Actualiza el estado de una solicitud de adopción.
 * @param {number} id_solicitud - El ID de la solicitud a actualizar.
 * @param {string} estado_solicitud - El nuevo estado de la solicitud ('en_revision', 'aceptada', 'rechazada').
 * @param {string|null} [motivo_rechazo=null] - El motivo del rechazo (solo si el estado es 'rechazada').
 * @returns {Promise<object|null>} La solicitud de adopción actualizada si se encuentra, de lo contrario null.
 */
exports.updateRequestStatus = async (id_solicitud, estado_solicitud, motivo_rechazo = null) => {
    try {
        // La fecha_revision se actualiza solo cuando el estado cambia a 'aceptada' o 'rechazada'
        const result = await db.query(
            `UPDATE public.solicitudadopcion
             SET
                 estado_solicitud = $1::TEXT, -- Se añade el cast explícito a TEXT
                 motivo_rechazo = $2,
                 fecha_revision = CASE
                                    WHEN $1::TEXT IN ('aceptada', 'rechazada') THEN NOW() -- Se añade el cast explícito a TEXT
                                    ELSE fecha_revision
                                  END
             WHERE id_solicitud = $3
             RETURNING *`,
            [estado_solicitud, motivo_rechazo, id_solicitud]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error(`Error al actualizar estado de solicitud de adopción con ID ${id_solicitud}:`, error);
        throw error;
    }
};

/**
 * Elimina una solicitud de adopción por su ID.
 * @param {number} id_solicitud - El ID de la solicitud a eliminar.
 * @returns {Promise<boolean>} True si la solicitud fue eliminada, false si no se encontró.
 */
exports.deleteRequest = async (id_solicitud) => {
    try {
        const result = await db.query(
            `DELETE FROM public.solicitudadopcion
             WHERE id_solicitud = $1
             RETURNING id_solicitud`, // Retorna el ID de la fila eliminada si existe
            [id_solicitud]
        );
        return result.rows.length > 0; // True si se eliminó al menos una fila
    } catch (error) {
        console.error(`Error al eliminar solicitud de adopción con ID ${id_solicitud}:`, error);
        throw error;
    }
};