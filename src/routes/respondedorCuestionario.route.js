const express = require('express');
const router = express.Router();
const controller = require('../controllers/respondedorCuestionario.controller');
const authenticateToken = require('../middleware/auth');

// Ruta protegida para enviar respuestas del formulario
router.post('/responder', authenticateToken, controller.responderCuestionario);

module.exports = router;