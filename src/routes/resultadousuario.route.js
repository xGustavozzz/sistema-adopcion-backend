const express = require('express');
const router = express.Router();
const controller = require('../controllers/resultadousuario.controller');
const authenticateToken = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/usuario/:id_usuario', controller.getByUsuario);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.delete('/usuario/:id_usuario', controller.removeByUsuario);
router.get('/mio', authenticateToken, controller.obtenerMiTipoEmocional);

module.exports = router;
