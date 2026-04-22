const bookService = require('../services/BookService');

class BookController {
  async getAllBooks(req, res) {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  async getBookById(req, res) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({error: 'Book not found'});
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }

  async readBook(req, res) {
    try {
      const info = await bookService.readBook(req.params.id);
      res.json(info);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBook(req, res) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new BookController();
