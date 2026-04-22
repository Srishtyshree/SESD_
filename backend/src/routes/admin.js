const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const { auth, authorize } = require('../middleware/auth');

router.get('/users', auth, authorize(['ADMIN', 'LIBRARIAN']), adminController.getAllUsers);
router.get('/stats', auth, authorize(['ADMIN', 'LIBRARIAN']), adminController.getStats);

module.exports = router;
