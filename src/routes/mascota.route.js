const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascota.controller');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, controller.getAll);
router.get('/:id', authenticateToken, controller.getById);
router.post('/', authenticateToken, controller.create);
router.put('/:id', authenticateToken, controller.update);
router.delete('/:id', authenticateToken, controller.remove);

module.exports = router;