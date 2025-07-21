// services/solicitudAdopcionService.js
const solicitudAdopcionModel = require('../models/solicitudadopcion.model'); // Importa el modelo

/**
 * @module SolicitudAdopcionService
 * @description Capa de lógica de negocio para las solicitudes de adopción.
 */

/**
 * Crea una nueva solicitud de adopción.
 * Realiza validaciones básicas antes de interactuar con el modelo.
 * @param {number} id_usuario - El ID del usuario que realiza la solicitud.
 * @param {number} id_mascota - El ID de la mascota solicitada.
 * @returns {Promise<object>} La solicitud de adopción creada.
 * @throws {Error} Si faltan datos o hay un error en la creación.
 */
exports.createSolicitudAdopcion = async (id_usuario, id_mascota) => {
    // Validaciones de negocio
    if (!id_usuario || !id_mascota) {
        throw new Error('El ID de usuario y el ID de mascota son obligatorios para crear una solicitud.');
    }
    if (typeof id_usuario !== 'number' || typeof id_mascota !== 'number') {
        throw new Error('Los IDs de usuario y mascota deben ser números.');
    }

    try {
        // Llama al modelo para crear la solicitud
        const newRequest = await solicitudAdopcionModel.createRequest(id_usuario, id_mascota);
        return newRequest;
    } catch (error) {
        console.error('Error en el servicio al crear solicitud de adopción:', error.message);
        // Puedes personalizar el mensaje de error para el cliente aquí
        throw new Error('No se pudo crear la solicitud de adopción debido a un problema interno.');
    }
};

/**
 * Obtiene todas las solicitudes de adopción.
 * @returns {Promise<Array<object>>} Un array de todas las solicitudes de adopción.
 * @throws {Error} Si hay un error al obtener las solicitudes.
 */
exports.getAllSolicitudesAdopcion = async () => {
    try {
        const requests = await solicitudAdopcionModel.getAllRequests();
        // Aquí podrías añadir lógica adicional, como filtrar o transformar datos
        return requests;
    } catch (error) {
        console.error('Error en el servicio al obtener todas las solicitudes de adopción:', error.message);
        throw new Error('No se pudieron obtener las solicitudes de adopción.');
    }
};

/**
 * Obtiene una solicitud de adopción por su ID.
 * @param {number} id_solicitud - El ID de la solicitud a buscar.
 * @returns {Promise<object|null>} La solicitud de adopción si se encuentra, de lo contrario null.
 * @throws {Error} Si el ID no es válido o hay un error al obtener la solicitud.
 */
exports.getSolicitudAdopcionById = async (id_solicitud) => {
    if (!id_solicitud || typeof id_solicitud !== 'number') {
        throw new Error('El ID de la solicitud es obligatorio y debe ser un número.');
    }

    try {
        const request = await solicitudAdopcionModel.getRequestById(id_solicitud);
        return request;
    } catch (error) {
        console.error(`Error en el servicio al obtener solicitud de adopción con ID ${id_solicitud}:`, error.message);
        throw new Error('No se pudo obtener la solicitud de adopción.');
    }
};

/**
 * Obtiene todas las solicitudes de adopción para un usuario específico.
 * @param {number} id_usuario - El ID del usuario cuyas solicitudes se desean obtener.
 * @returns {Promise<Array<object>>} Un array de solicitudes de adopción del usuario.
 * @throws {Error} Si el ID de usuario no es válido o hay un error al obtener las solicitudes.
 */
exports.getSolicitudesByUserId = async (id_usuario) => {
    if (!id_usuario || typeof id_usuario !== 'number') {
        throw new Error('El ID de usuario es obligatorio y debe ser un número para obtener sus solicitudes.');
    }
    try {
        const requests = await solicitudAdopcionModel.getRequestsByUserId(id_usuario);
        return requests;
    } catch (error) {
        console.error(`Error en el servicio al obtener solicitudes de adopción para el usuario con ID ${id_usuario}:`, error.message);
        throw new Error('No se pudieron obtener las solicitudes de adopción para este usuario.');
    }
};

/**
 * Actualiza el estado de una solicitud de adopción.
 * Realiza validaciones del estado y el motivo de rechazo.
 * @param {number} id_solicitud - El ID de la solicitud a actualizar.
 * @param {string} estado_solicitud - El nuevo estado de la solicitud ('en_revision', 'aceptada', 'rechazada').
 * @param {string|null} [motivo_rechazo=null] - El motivo del rechazo (solo si el estado es 'rechazada').
 * @returns {Promise<object|null>} La solicitud de adopción actualizada si se encuentra, de lo contrario null.
 * @throws {Error} Si los datos no son válidos o hay un error en la actualización.
 */
exports.updateSolicitudAdopcionStatus = async (id_solicitud, estado_solicitud, motivo_rechazo = null) => {
    if (!id_solicitud || typeof id_solicitud !== 'number') {
        throw new Error('El ID de la solicitud es obligatorio y debe ser un número.');
    }
    const validStates = ['en_revision', 'aceptada', 'rechazada'];
    if (!estado_solicitud || !validStates.includes(estado_solicitud)) {
        throw new Error(`El estado de la solicitud debe ser uno de: ${validStates.join(', ')}.`);
    }
    if (estado_solicitud === 'rechazada' && (!motivo_rechazo || typeof motivo_rechazo !== 'string')) {
        throw new Error('El motivo de rechazo es obligatorio cuando el estado es "rechazada".');
    }
    if (estado_solicitud !== 'rechazada' && motivo_rechazo !== null) {
        // Asegurarse de que motivo_rechazo sea null si el estado no es 'rechazada'
        motivo_rechazo = null;
    }

    try {
        const updatedRequest = await solicitudAdopcionModel.updateRequestStatus(id_solicitud, estado_solicitud, motivo_rechazo);
        if (!updatedRequest) {
            throw new Error(`Solicitud de adopción con ID ${id_solicitud} no encontrada para actualizar.`);
        }
        return updatedRequest;
    } catch (error) {
        console.error(`Error en el servicio al actualizar solicitud de adopción con ID ${id_solicitud}:`, error.message);
        // Puedes diferenciar los errores aquí, por ejemplo, si es un error de BD o de lógica
        throw new Error('No se pudo actualizar la solicitud de adopción.');
    }
};

/**
 * Elimina una solicitud de adopción por su ID.
 * @param {number} id_solicitud - El ID de la solicitud a eliminar.
 * @returns {Promise<boolean>} True si la solicitud fue eliminada, false si no se encontró.
 * @throws {Error} Si el ID no es válido o hay un error en la eliminación.
 */
exports.deleteSolicitudAdopcion = async (id_solicitud) => {
    if (!id_solicitud || typeof id_solicitud !== 'number') {
        throw new Error('El ID de la solicitud es obligatorio y debe ser un número.');
    }

    try {
        const isDeleted = await solicitudAdopcionModel.deleteRequest(id_solicitud);
        if (!isDeleted) {
            throw new Error(`Solicitud de adopción con ID ${id_solicitud} no encontrada para eliminar.`);
        }
        return isDeleted;
    } catch (error) {
        console.error(`Error en el servicio al eliminar solicitud de adopción con ID ${id_solicitud}:`, error.message);
        throw new Error('No se pudo eliminar la solicitud de adopción.');
    }
};

