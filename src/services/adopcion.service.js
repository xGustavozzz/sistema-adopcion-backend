// services/adopcion.service.js
const adopcionModel = require('../models/adopcion.model'); // Importa el modelo

/**
 * @module AdopcionService
 * @description Capa de lógica de negocio para los registros de adopción.
 */

/**
 * Obtiene todos los registros de adopción.
 * @returns {Promise<Array<object>>} Un array de todos los registros de adopción.
 * @throws {Error} Si hay un error al obtener los registros.
 */
exports.getAllAdopciones = async () => {
    try {
        const adopciones = await adopcionModel.getAllAdopciones();
        // Aquí podrías añadir lógica adicional de negocio si fuera necesario
        return adopciones;
    } catch (error) {
        console.error('Error en el servicio al obtener todas las adopciones:', error.message);
        throw new Error('No se pudieron obtener los registros de adopción.');
    }
};

/**
 * Obtiene un registro de adopción por su ID.
 * @param {number} id_adopcion - El ID del registro de adopción a buscar.
 * @returns {Promise<object|null>} El registro de adopción si se encuentra, de lo contrario null.
 * @throws {Error} Si el ID no es válido o hay un error al obtener el registro.
 */
exports.getAdopcionById = async (id_adopcion) => {
    if (!id_adopcion || typeof id_adopcion !== 'number') {
        throw new Error('El ID de la adopción es obligatorio y debe ser un número.');
    }

    try {
        const adopcion = await adopcionModel.getAdopcionById(id_adopcion);
        return adopcion;
    } catch (error) {
        console.error(`Error en el servicio al obtener adopción con ID ${id_adopcion}:`, error.message);
        throw new Error('No se pudo obtener el registro de adopción.');
    }
};

/**
 * Obtiene todos los registros de adopción asociados a un usuario específico (adoptante).
 * @param {number} id_usuario - El ID del usuario adoptante.
 * @returns {Promise<Array<object>>} Un array de registros de adopción del usuario.
 * @throws {Error} Si el ID de usuario no es válido o hay un error al obtener los registros.
 */
exports.getAdopcionesByUserId = async (id_usuario) => {
    if (!id_usuario || typeof id_usuario !== 'number') {
        throw new Error('El ID de usuario es obligatorio y debe ser un número para obtener sus adopciones.');
    }
    try {
        const adopciones = await adopcionModel.getAdopcionesByUserId(id_usuario);
        return adopciones;
    } catch (error) {
        console.error(`Error en el servicio al obtener adopciones para el usuario con ID ${id_usuario}:`, error.message);
        throw new Error('No se pudieron obtener los registros de adopción para este usuario.');
    }
};

/**
 * Actualiza un registro de adopción existente.
 * Realiza validaciones básicas antes de la actualización.
 * @param {number} id_adopcion - El ID del registro de adopción a actualizar.
 * @param {object} updates - Un objeto con los campos a actualizar (observaciones, entregado_por, fecha_entrega_prevista, fecha_adopcion).
 * @returns {Promise<object|null>} El registro de adopción actualizado si se encuentra, de lo contrario null.
 * @throws {Error} Si los datos no son válidos o hay un error en la actualización.
 */
exports.updateAdopcion = async (id_adopcion, updates) => {
    if (!id_adopcion || typeof id_adopcion !== 'number') {
        throw new Error('El ID de la adopción es obligatorio y debe ser un número.');
    }
    if (!updates || Object.keys(updates).length === 0) {
        throw new Error('Se deben proporcionar datos para actualizar el registro de adopción.');
    }

    // Validaciones más específicas para los campos de 'updates'
    if (updates.entregado_por !== undefined && typeof updates.entregado_por !== 'number' && updates.entregado_por !== null) {
        throw new Error('El ID de la persona que entrega debe ser un número o null.');
    }

    // --- CAMBIO AQUÍ ---
    // Función auxiliar para validar formato de fecha YYYY-MM-DD
    const isValidDateString = (dateString) => {
        if (dateString === null) return true; // null es válido
        if (typeof dateString !== 'string') return false;
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;
        const date = new Date(dateString);
        // Verifica si la fecha es válida y si la conversión de vuelta a string coincide
        return !isNaN(date.getTime()) && date.toISOString().slice(0,10) === dateString;
    };

    if (updates.fecha_entrega_prevista !== undefined && !isValidDateString(updates.fecha_entrega_prevista)) {
        throw new Error('La fecha de entrega prevista debe ser una cadena de texto en formato YYYY-MM-DD o null.');
    }
    if (updates.fecha_adopcion !== undefined && !isValidDateString(updates.fecha_adopcion)) {
        throw new Error('La fecha de adopción debe ser una cadena de texto en formato YYYY-MM-DD o null.');
    }
    // --- FIN CAMBIO ---

    try {
        const updatedAdopcion = await adopcionModel.updateAdopcion(id_adopcion, updates);
        if (!updatedAdopcion) {
            throw new Error(`Registro de adopción con ID ${id_adopcion} no encontrado para actualizar.`);
        }
        return updatedAdopcion;
    } catch (error) {
        console.error(`Error en el servicio al actualizar adopción con ID ${id_adopcion}:`, error.message);
        throw new Error('No se pudo actualizar el registro de adopción.');
    }
};

/**
 * Elimina un registro de adopción por su ID.
 * @param {number} id_adopcion - El ID del registro de adopción a eliminar.
 * @returns {Promise<boolean>} True si el registro fue eliminado, false si no se encontró.
 * @throws {Error} Si el ID no es válido o hay un error en la eliminación.
 */
exports.deleteAdopcion = async (id_adopcion) => {
    if (!id_adopcion || typeof id_adopcion !== 'number') {
        throw new Error('El ID de la adopción es obligatorio y debe ser un número.');
    }

    try {
        const isDeleted = await adopcionModel.deleteAdopcion(id_adopcion);
        if (!isDeleted) {
            throw new Error(`Registro de adopción con ID ${id_adopcion} no encontrado para eliminar.`);
        }
        return isDeleted;
    } catch (error) {
        console.error(`Error en el servicio al eliminar adopción con ID ${id_adopcion}:`, error.message);
        throw new Error('No se pudo eliminar el registro de adopción.');
    }
};