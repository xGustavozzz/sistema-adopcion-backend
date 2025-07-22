const express = require('express');
const router = express.Router();
const controller = require('../controllers/resultadousuario.controller');
const authenticateToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.use(authenticateToken);
// ⚠️ Primero las rutas estáticas como /mio
router.get('/mio', controller.obtenerMiTipoEmocional);
router.get('/historialemocional', controller.obtenerHistorialEmocional);

router.use(authorize('admin'));
router.get('/', controller.getAll);
router.get('/usuario/:id_usuario', controller.getByUsuario);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.delete('/usuario/:id_usuario', controller.removeByUsuario);


module.exports = router;
