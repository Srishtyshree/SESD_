const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/:id/read', auth, bookController.readBook);
router.put('/:id', auth, bookController.updateBook);

module.exports = router;
