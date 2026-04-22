const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/BorrowController');
const { auth } = require('../middleware/auth');

router.post('/borrow', auth, borrowController.borrowBook);
router.post('/return/:borrowRecordId', auth, borrowController.returnBook);

module.exports = router;
