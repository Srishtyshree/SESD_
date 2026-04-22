const BaseRepository = require('./BaseRepository');

class BookRepository extends BaseRepository {
  constructor() {
    super('book');
  }

  async findByIsbn(isbn) {
    return await this.model.findUnique({ where: { isbn } });
  }

  async searchBooks(query) {
    return await this.model.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { genre: { contains: query, mode: 'insensitive' } }
        ]
      }
    });
  }
}

module.exports = new BookRepository();
