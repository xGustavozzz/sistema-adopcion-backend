// controllers/solicitudAdopcionController.js
const solicitudAdopcionService = require('../services/solicitudadopcion.service'); // Importa el servicio

/**
 * @module SolicitudAdopcionController
 * @description Capa de controladores para manejar las solicitudes HTTP relacionadas con 'solicitudadopcion'.
 */

/**
 * Crea una nueva solicitud de adopción.
 * Ruta: POST /api/solicitudes
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.createSolicitudAdopcion = async (req, res) => {
    try {
        // Asumiendo que el id_usuario viene del token de autenticación (middleware auth)
        const id_usuario = req.user ? req.user.id : req.body.id_usuario; // Ajusta según tu implementación de autenticación
        const { id_mascota } = req.body;

        // Llama al servicio para crear la solicitud
        const newRequest = await solicitudAdopcionService.createSolicitudAdopcion(id_usuario, id_mascota);

        res.status(201).json({
            message: 'Solicitud de adopción creada con éxito.',
            solicitud: newRequest
        });
    } catch (error) {
        console.error('Error en el controlador al crear solicitud de adopción:', error.message);
        // Diferenciar entre errores de validación (400) y errores internos del servidor (500)
        if (error.message.includes('obligatorio') || error.message.includes('número') || error.message.includes('válido')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al crear la solicitud de adopción.' });
        }
    }
};

/**
 * Obtiene todas las solicitudes de adopción.
 * Ruta: GET /api/solicitudes
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.getAllSolicitudesAdopcion = async (req, res) => {
    try {
        const requests = await solicitudAdopcionService.getAllSolicitudesAdopcion();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error en el controlador al obtener todas las solicitudes de adopción:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener las solicitudes de adopción.' });
    }
};

/**
 * Obtiene una solicitud de adopción por su ID.
 * Ruta: GET /api/solicitudes/:id
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.getSolicitudAdopcionById = async (req, res) => {
    try {
        const id_solicitud = parseInt(req.params.id, 10); // Convertir a número entero

        // Validar que el ID sea un número válido
        if (isNaN(id_solicitud)) {
            return res.status(400).json({ error: 'El ID de la solicitud debe ser un número válido.' });
        }

        const request = await solicitudAdopcionService.getSolicitudAdopcionById(id_solicitud);

        if (!request) {
            return res.status(404).json({ message: 'Solicitud de adopción no encontrada.' });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error(`Error en el controlador al obtener solicitud de adopción con ID ${req.params.id}:`, error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener la solicitud de adopción.' });
        }
    }
};

/**
 * Obtiene todas las solicitudes de adopción para el usuario autenticado.
 * Ruta: GET /api/solicitudes/my
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.getMySolicitudes = async (req, res) => {
    try {
        // El ID del usuario viene del token de autenticación (middleware auth)
        const id_usuario = req.user.id; // Asume que `req.user` está disponible y tiene `id`

        if (!id_usuario) {
            return res.status(401).json({ error: 'No se pudo obtener el ID del usuario autenticado.' });
        }

        const requests = await solicitudAdopcionService.getSolicitudesByUserId(id_usuario);
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error en el controlador al obtener las solicitudes del usuario:', error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener tus solicitudes de adopción.' });
        }
    }
};

/**
 * Actualiza el estado de una solicitud de adopción.
 * Ruta: PUT /api/solicitudes/:id/status
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.updateSolicitudAdopcionStatus = async (req, res) => {
    try {
        const id_solicitud = parseInt(req.params.id, 10);
        const { estado_solicitud, motivo_rechazo } = req.body;

        // Validar que el ID sea un número válido
        if (isNaN(id_solicitud)) {
            return res.status(400).json({ error: 'El ID de la solicitud debe ser un número válido.' });
        }

        const updatedRequest = await solicitudAdopcionService.updateSolicitudAdopcionStatus(id_solicitud, estado_solicitud, motivo_rechazo);

        res.status(200).json({
            message: 'Estado de la solicitud de adopción actualizado con éxito.',
            solicitud: updatedRequest
        });
    } catch (error) {
        console.error(`Error en el controlador al actualizar solicitud de adopción con ID ${req.params.id}:`, error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número') || error.message.includes('estado')) {
            res.status(400).json({ error: error.message });
        } else if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al actualizar la solicitud de adopción.' });
        }
    }
};

/**
 * Elimina una solicitud de adopción por su ID.
 * Ruta: DELETE /api/solicitudes/:id
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.deleteSolicitudAdopcion = async (req, res) => {
    try {
        const id_solicitud = parseInt(req.params.id, 10);
        const id_usuario_autenticado = req.user.id; // ID del usuario que está haciendo la petición
        const user_role = req.user.rol; // Rol del usuario que está haciendo la petición

        // Validar que el ID de la solicitud sea un número válido
        if (isNaN(id_solicitud)) {
            return res.status(400).json({ error: 'El ID de la solicitud debe ser un número válido.' });
        }

        // Obtener la solicitud para verificar la propiedad
        const solicitud = await solicitudAdopcionService.getSolicitudAdopcionById(id_solicitud);

        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud de adopción no encontrada para eliminar.' });
        }

        // Verificar si el usuario es administrador o el propietario de la solicitud
        if (user_role === 'admin' || solicitud.id_usuario === id_usuario_autenticado) {
            const isDeleted = await solicitudAdopcionService.deleteSolicitudAdopcion(id_solicitud);

            if (!isDeleted) {
                return res.status(404).json({ message: 'Solicitud de adopción no encontrada para eliminar.' });
            }

            res.status(204).send(); // 204 No Content para eliminación exitosa sin cuerpo de respuesta
        } else {
            // El usuario no es administrador ni el propietario de la solicitud
            return res.status(403).json({ error: 'Acceso denegado. No tienes permisos para eliminar esta solicitud.' });
        }
    } catch (error) {
        console.error(`Error en el controlador al eliminar solicitud de adopción con ID ${req.params.id}:`, error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número')) {
            res.status(400).json({ error: error.message });
        } else if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al eliminar la solicitud de adopción.' });
        }
    }
};
