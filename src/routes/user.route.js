const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const userCtrl = require('../controllers/user.controller');

// CRUD usuarios (solo admin)
router.get('/', auth, authorize('admin'), userCtrl.getAll);
router.get('/:id', auth, authorize('admin'), userCtrl.getById);
router.post('/',auth, authorize('admin'), userCtrl.create);
router.put('/:id', auth, authorize('admin'), userCtrl.update);
router.delete('/:id', auth, authorize('admin'), userCtrl.remove);

module.exports = router;