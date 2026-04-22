const axios = require('axios');
const bookRepository = require('../repositories/BookRepository');
const Book = require('../models/Book');

class BookService {
  constructor(bookRepo) {
    this.bookRepo = bookRepo;
  }

  async getAllBooks() {
    const books = await this.bookRepo.findAll();
    return books.map(b => new Book(b).toJSON());
  }

  async getBookById(id) {
    const book = await this.bookRepo.findById(id);
    if (!book) throw new Error('Book not found');

    const bookObj = new Book(book).toJSON();

    // Enrich with metadata if ISBN is available
    if (bookObj.isbn) {
      try {
        const metadata = await this.fetchMetadata(bookObj.isbn);
        return {
          ...bookObj,
          description: bookObj.description || metadata.description,
          image: bookObj.image || metadata.image,
          metadata: {
            previewLink: metadata.previewLink,
            infoLink: metadata.infoLink,
            webReaderUrl: metadata.webReaderUrl
          }
        };
      } catch (err) {
        console.warn(`Enrichment failed for ISBN ${bookObj.isbn}:`, err.message);
      }
    }

    return bookObj;
  }

  async fetchMetadata(isbn) {
    console.log(`Fetching metadata from Google Books for ISBN: ${isbn}...`);

    // Fetch from Google Books
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No metadata found for this ISBN');
    }

    const volumeInfo = response.data.items[0].volumeInfo;
    const accessInfo = response.data.items[0].accessInfo;

    const metadata = {
      title: volumeInfo.title,
      author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown',
      description: volumeInfo.description,
      image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : null,
      previewLink: volumeInfo.previewLink,
      infoLink: volumeInfo.infoLink,
      webReaderUrl: accessInfo ? accessInfo.webReaderLink : null
    };

    return metadata;
  }

  async updateBook(id, data) {
    // Validate data if necessary
    const updatedBook = await this.bookRepo.update(id, data);
    return new Book(updatedBook).toJSON();
  }

  async readBook(id) {
    const book = await this.getBookById(id);
    // book is already a plain object from getBookById
    
    let metadata = {};
    if (book.isbn) {
      try {
        metadata = await this.fetchMetadata(book.isbn);
      } catch (err) {
        console.warn(`Could not fetch metadata for reader: ${err.message}`);
      }
    }

    return {
      title: book.title,
      author: book.author,
      pdfUrl: book.pdfUrl,
      previewLink: book.previewLink || metadata.previewLink,
      webReaderUrl: book.webReaderUrl || metadata.webReaderUrl,
      embedUrl: book.pdfUrl || book.webReaderUrl || metadata.webReaderUrl || metadata.previewLink
    };
  }
}

module.exports = new BookService(bookRepository);
