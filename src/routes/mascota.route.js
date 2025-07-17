const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascota.controller');
const authenticateToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authenticateToken, authorize('admin'), controller.create);
router.put('/:id', authenticateToken, authorize('admin'), controller.update);
router.delete('/:id', authenticateToken, authorize('admin'), controller.remove);

module.exports = router;