// routes/solicitudAdopcionRoutes.js
const express = require('express');
const router = express.Router();
const solicitudAdopcionController = require('../controllers/solicitudadopcion.controller');
const authenticateToken = require('../middleware/auth'); // Middleware para verificar el token (autenticación)
const authorizeRole = require('../middleware/authorizerole'); // Nuevo middleware para verificar el rol (autorización)

/**
 * @module SolicitudAdopcionRoutes
 * @description Define las rutas de la API para la gestión de solicitudes de adopción.
 */

// Ruta para crear una nueva solicitud de adopción
// La URL efectiva será POST /api/solicitudes
router.post('/', authenticateToken, solicitudAdopcionController.createSolicitudAdopcion);

// Ruta para que los usuarios vean SUS solicitudes de adopción
// La URL efectiva será GET /api/solicitudes/my
router.get('/my', authenticateToken, solicitudAdopcionController.getMySolicitudes);

// Ruta para obtener TODAS las solicitudes de adopción (visibles solo para administradores)
// La URL efectiva será GET /api/solicitudes
router.get('/', authenticateToken, authorizeRole(['admin']), solicitudAdopcionController.getAllSolicitudesAdopcion);

// Ruta para obtener una solicitud de adopción por su ID
// La URL efectiva será GET /api/solicitudes/:id
router.get('/:id', authenticateToken, solicitudAdopcionController.getSolicitudAdopcionById);

// Ruta para actualizar el estado de una solicitud de adopción (solo administradores)
// La URL efectiva será PUT /api/solicitudes/:id/status
router.put('/:id/status', authenticateToken, authorizeRole(['admin']), solicitudAdopcionController.updateSolicitudAdopcionStatus);

// Ruta para eliminar una solicitud de adopción
// ¡CAMBIO AQUÍ! Se elimina el middleware authorizeRole(['admin']) para permitir que el controlador maneje la autorización.
// La URL efectiva será DELETE /api/solicitudes/:id
router.delete('/:id', authenticateToken, solicitudAdopcionController.deleteSolicitudAdopcion);

module.exports = router;
