const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoemocional.controller');
const authenticateToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.use(authenticateToken,authorize('admin'));
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
