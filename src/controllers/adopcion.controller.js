// controllers/adopcionController.js
const adopcionService = require('../services/adopcion.service'); // Importa el servicio con la sintaxis especificada

/**
 * @module AdopcionController
 * @description Capa de controladores para manejar las solicitudes HTTP relacionadas con 'adopcion'.
 */

/**
 * Obtiene todos los registros de adopción.
 * Ruta: GET /api/adopciones
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.getAllAdopciones = async (req, res) => {
    try {
        const adopciones = await adopcionService.getAllAdopciones();
        res.status(200).json(adopciones);
    } catch (error) {
        console.error('Error en el controlador al obtener todas las adopciones:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener los registros de adopción.' });
    }
};

/**
 * Obtiene un registro de adopción por su ID.
 * Ruta: GET /api/adopciones/:id
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.getAdopcionById = async (req, res) => {
    try {
        const id_adopcion = parseInt(req.params.id, 10); // Convertir a número entero

        // Validar que el ID sea un número válido
        if (isNaN(id_adopcion)) {
            return res.status(400).json({ error: 'El ID de la adopción debe ser un número válido.' });
        }

        const adopcion = await adopcionService.getAdopcionById(id_adopcion);

        if (!adopcion) {
            return res.status(404).json({ message: 'Registro de adopción no encontrado.' });
        }

        res.status(200).json(adopcion);
    } catch (error) {
        console.error(`Error en el controlador al obtener adopción con ID ${req.params.id}:`, error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener el registro de adopción.' });
        }
    }
};

/**
 * Obtiene todos los registros de adopción asociados al usuario autenticado.
 * Ruta: GET /api/adopciones/my
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.getMyAdopciones = async (req, res) => {
    try {
        // El ID del usuario viene del token de autenticación (middleware auth)
        const id_usuario = req.user.id; // Asume que `req.user` está disponible y tiene `id`

        if (!id_usuario) {
            return res.status(401).json({ error: 'No se pudo obtener el ID del usuario autenticado.' });
        }

        const adopciones = await adopcionService.getAdopcionesByUserId(id_usuario);
        res.status(200).json(adopciones);
    } catch (error) {
        console.error('Error en el controlador al obtener las adopciones del usuario:', error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener tus registros de adopción.' });
        }
    }
};

/**
 * Actualiza un registro de adopción existente.
 * Ruta: PUT /api/adopciones/:id
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.updateAdopcion = async (req, res) => {
    try {
        const id_adopcion = parseInt(req.params.id, 10);
        const updates = req.body; // El cuerpo de la solicitud contendrá los campos a actualizar

        // Validar que el ID sea un número válido
        if (isNaN(id_adopcion)) {
            return res.status(400).json({ error: 'El ID de la adopción debe ser un número válido.' });
        }

        const updatedAdopcion = await adopcionService.updateAdopcion(id_adopcion, updates);

        res.status(200).json({
            message: 'Registro de adopción actualizado con éxito.',
            adopcion: updatedAdopcion
        });
    } catch (error) {
        console.error(`Error en el controlador al actualizar adopción con ID ${req.params.id}:`, error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número') || error.message.includes('datos')) {
            res.status(400).json({ error: error.message });
        } else if (error.message.includes('no encontrado')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al actualizar el registro de adopción.' });
        }
    }
};

/**
 * Elimina un registro de adopción por su ID.
 * Ruta: DELETE /api/adopciones/:id
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.deleteAdopcion = async (req, res) => {
    try {
        const id_adopcion = parseInt(req.params.id, 10);

        // Validar que el ID sea un número válido
        if (isNaN(id_adopcion)) {
            return res.status(400).json({ error: 'El ID de la adopción debe ser un número válido.' });
        }

        const isDeleted = await adopcionService.deleteAdopcion(id_adopcion);

        if (!isDeleted) {
            return res.status(404).json({ message: 'Registro de adopción no encontrado para eliminar.' });
        }

        res.status(204).send(); // 204 No Content para eliminación exitosa sin cuerpo de respuesta
    } catch (error) {
        console.error(`Error en el controlador al eliminar adopción con ID ${req.params.id}:`, error.message);
        if (error.message.includes('obligatorio') || error.message.includes('número')) {
            res.status(400).json({ error: error.message });
        } else if (error.message.includes('no encontrado')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al eliminar el registro de adopción.' });
        }
    }
};