const borrowService = require('../services/BorrowService');

class BorrowController {
  async borrowBook(req, res) {
    try {
      const { bookId } = req.body;
      const result = await borrowService.borrowBook(req.user.id, bookId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async returnBook(req, res) {
    try {
      const { borrowRecordId } = req.params;
      const result = await borrowService.returnBook(borrowRecordId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new BorrowController();
