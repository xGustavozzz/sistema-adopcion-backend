// routes/adopcionRoutes.js
const express = require('express');
const router = express.Router();
const adopcionController = require('../controllers/adopcion.controller'); // Importa el controlador
const authenticateToken = require('../middleware/auth'); // Middleware para verificar el token (autenticación)
const authorizeRole = require('../middleware/authorizerole'); // Middleware para verificar el rol (autorización)

/**
 * @module AdopcionRoutes
 * @description Define las rutas de la API para la gestión de registros de adopción.
 */

// Ruta para obtener TODOS los registros de adopción (visibles solo para administradores)
// La URL efectiva será GET /api/adopciones
router.get('/', authenticateToken, authorizeRole(['admin']), adopcionController.getAllAdopciones);

// Ruta para que los usuarios vean SUS registros de adopción (adopciones donde son el adoptante)
// La URL efectiva será GET /api/adopciones/my
router.get('/my', authenticateToken, adopcionController.getMyAdopciones);

// Ruta para obtener un registro de adopción por su ID (solo administradores)
// La URL efectiva será GET /api/adopciones/:id
router.get('/:id', authenticateToken, authorizeRole(['admin']), adopcionController.getAdopcionById);

// Ruta para actualizar un registro de adopción (solo administradores)
// La URL efectiva será PUT /api/adopciones/:id
router.put('/:id', authenticateToken, authorizeRole(['admin']), adopcionController.updateAdopcion);

// Ruta para eliminar un registro de adopción (solo administradores)
// La URL efectiva será DELETE /api/adopciones/:id
router.delete('/:id', authenticateToken, authorizeRole(['admin']), adopcionController.deleteAdopcion);

module.exports = router;