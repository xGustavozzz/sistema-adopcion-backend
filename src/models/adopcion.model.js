// models/adopcionModel.js
const db = require('../config/db'); // Asume que tienes un archivo db.js en config/

/**
 * @module AdopcionModel
 * @description Módulo para interactuar con la tabla 'adopcion' en la base de datos.
 */

/**
 * Obtiene todos los registros de adopción.
 * Incluye detalles del usuario adoptante, la mascota y la solicitud asociada.
 * @returns {Promise<Array<object>>} Un array de todos los registros de adopción.
 */
exports.getAllAdopciones = async () => {
    try {
        const result = await db.query(
            `SELECT
                a.id_adopcion,
                a.id_solicitud,
                sa.id_usuario AS id_adoptante,
                u.nombre AS nombre_adoptante,
                sa.id_mascota AS id_mascota_adoptada,
                m.nombre AS nombre_mascota_adoptada,
                a.fecha_adopcion,
                a.observaciones,
                a.entregado_por,
                ue.nombre AS nombre_entregado_por, -- Asumiendo que 'entregado_por' es un id_usuario
                a.fecha_entrega_prevista,
                sa.estado_solicitud -- Para referencia, aunque debería ser 'aceptada'
            FROM public.adopcion a
            JOIN public.solicitudadopcion sa ON a.id_solicitud = sa.id_solicitud
            LEFT JOIN public.usuario u ON sa.id_usuario = u.id_usuario -- Usuario adoptante
            LEFT JOIN public.mascota m ON sa.id_mascota = m.id_mascota -- Mascota adoptada
            LEFT JOIN public.usuario ue ON a.entregado_por = ue.id_usuario -- Usuario que entregó
            ORDER BY a.fecha_adopcion DESC`
        );
        return result.rows;
    } catch (error) {
        console.error('Error al obtener todos los registros de adopción:', error);
        throw error;
    }
};

/**
 * Obtiene un registro de adopción por su ID.
 * Incluye detalles del usuario adoptante, la mascota y la solicitud asociada.
 * @param {number} id_adopcion - El ID del registro de adopción a buscar.
 * @returns {Promise<object|null>} El registro de adopción si se encuentra, de lo contrario null.
 */
exports.getAdopcionById = async (id_adopcion) => {
    try {
        const result = await db.query(
            `SELECT
                a.id_adopcion,
                a.id_solicitud,
                sa.id_usuario AS id_adoptante,
                u.nombre AS nombre_adoptante,
                sa.id_mascota AS id_mascota_adoptada,
                m.nombre AS nombre_mascota_adoptada,
                a.fecha_adopcion,
                a.observaciones,
                a.entregado_por,
                ue.nombre AS nombre_entregado_por,
                a.fecha_entrega_prevista,
                sa.estado_solicitud
            FROM public.adopcion a
            JOIN public.solicitudadopcion sa ON a.id_solicitud = sa.id_solicitud
            LEFT JOIN public.usuario u ON sa.id_usuario = u.id_usuario
            LEFT JOIN public.mascota m ON sa.id_mascota = m.id_mascota
            LEFT JOIN public.usuario ue ON a.entregado_por = ue.id_usuario
            WHERE a.id_adopcion = $1`,
            [id_adopcion]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener registro de adopción con ID ${id_adopcion}:`, error);
        throw error;
    }
};

/**
 * Obtiene todos los registros de adopción asociados a un usuario específico (adoptante).
 * Esto se logra uniendo con la tabla solicitudadopcion y filtrando por id_usuario.
 * @param {number} id_usuario - El ID del usuario adoptante.
 * @returns {Promise<Array<object>>} Un array de registros de adopción del usuario.
 */
exports.getAdopcionesByUserId = async (id_usuario) => {
    try {
        const result = await db.query(
            `SELECT
                a.id_adopcion,
                a.id_solicitud,
                sa.id_usuario AS id_adoptante,
                u.nombre AS nombre_adoptante,
                sa.id_mascota AS id_mascota_adoptada,
                m.nombre AS nombre_mascota_adoptada,
                a.fecha_adopcion,
                a.observaciones,
                a.entregado_por,
                ue.nombre AS nombre_entregado_por,
                a.fecha_entrega_prevista,
                sa.estado_solicitud
            FROM public.adopcion a
            JOIN public.solicitudadopcion sa ON a.id_solicitud = sa.id_solicitud
            LEFT JOIN public.usuario u ON sa.id_usuario = u.id_usuario
            LEFT JOIN public.mascota m ON sa.id_mascota = m.id_mascota
            LEFT JOIN public.usuario ue ON a.entregado_por = ue.id_usuario
            WHERE sa.id_usuario = $1
            ORDER BY a.fecha_adopcion DESC`,
            [id_usuario]
        );
        return result.rows;
    } catch (error) {
        console.error(`Error al obtener registros de adopción para el usuario con ID ${id_usuario}:`, error);
        throw error;
    }
};

/**
 * Actualiza un registro de adopción existente.
 * Permite modificar observaciones, el usuario que entregó y la fecha de entrega prevista.
 * @param {number} id_adopcion - El ID del registro de adopción a actualizar.
 * @param {object} updates - Un objeto con los campos a actualizar (observaciones, entregado_por, fecha_entrega_prevista, fecha_adopcion).
 * @returns {Promise<object|null>} El registro de adopción actualizado si se encuentra, de lo contrario null.
 */
exports.updateAdopcion = async (id_adopcion, { observaciones, entregado_por, fecha_entrega_prevista, fecha_adopcion }) => {
    try {
        const result = await db.query(
            `UPDATE public.adopcion
             SET
                 observaciones = COALESCE($1, observaciones),
                 entregado_por = COALESCE($2, entregado_por),
                 fecha_entrega_prevista = COALESCE($3, fecha_entrega_prevista),
                 fecha_adopcion = COALESCE($4, fecha_adopcion)
             WHERE id_adopcion = $5
             RETURNING *`,
            [observaciones, entregado_por, fecha_entrega_prevista, fecha_adopcion, id_adopcion]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error(`Error al actualizar registro de adopción con ID ${id_adopcion}:`, error);
        throw error;
    }
};

/**
 * Elimina un registro de adopción por su ID.
 * @param {number} id_adopcion - El ID del registro de adopción a eliminar.
 * @returns {Promise<boolean>} True si el registro fue eliminado, false si no se encontró.
 */
exports.deleteAdopcion = async (id_adopcion) => {
    try {
        const result = await db.query(
            `DELETE FROM public.adopcion
             WHERE id_adopcion = $1
             RETURNING id_adopcion`, // Retorna el ID de la fila eliminada si existe
            [id_adopcion]
        );
        return result.rows.length > 0; // True si se eliminó al menos una fila
    } catch (error) {
        console.error(`Error al eliminar registro de adopción con ID ${id_adopcion}:`, error);
        throw error;
    }
};