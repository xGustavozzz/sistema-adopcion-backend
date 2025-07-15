const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascota.controller');
const authenticateToken = require('../middleware/auth');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authenticateToken, controller.create);
router.put('/:id', authenticateToken, controller.update);
router.delete('/:id', authenticateToken, controller.remove);

module.exports = router;