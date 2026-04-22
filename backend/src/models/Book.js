class Book {
  #id;
  #title;
  #author;
  #genre;
  #isbn;
  #availableCopies;
  #totalCopies;
  #image;
  #description;

  constructor({ id, title, author, genre, isbn, availableCopies, totalCopies, image, description }) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#genre = genre;
    this.#isbn = isbn;
    this.#availableCopies = availableCopies;
    this.#totalCopies = totalCopies;
    this.#image = image;
    this.#description = description;
  }

  getId() { return this.#id; }
  getTitle() { return this.#title; }
  getAuthor() { return this.#author; }
  getIsbn() { return this.#isbn; }
  getAvailableCopies() { return this.#availableCopies; }

  canBorrow() {
    return this.#availableCopies > 0;
  }

  borrow() {
    if (!this.canBorrow()) throw new Error('No copies available');
    this.#availableCopies--;
  }

  returnBook() {
    if (this.#availableCopies < this.#totalCopies) {
      this.#availableCopies++;
    }
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      author: this.#author,
      genre: this.#genre,
      isbn: this.#isbn,
      availableCopies: this.#availableCopies,
      totalCopies: this.#totalCopies,
      image: this.#image,
      description: this.#description
    };
  }
}

module.exports = Book;
