class BorrowRecord {
  #id;
  #userId;
  #bookId;
  #borrowDate;
  #dueDate;
  #returnDate;
  #status;

  constructor({ id, userId, bookId, borrowDate, dueDate, returnDate, status }) {
    this.#id = id;
    this.#userId = userId;
    this.#bookId = bookId;
    this.#borrowDate = borrowDate;
    this.#dueDate = dueDate;
    this.#returnDate = returnDate;
    this.#status = status;
  }

  isOverdue() {
    return !this.#returnDate && new Date() > new Date(this.#dueDate);
  }

  calculateOverdueDays() {
    if (!this.isOverdue()) return 0;
    const diffTime = Math.abs(new Date() - new Date(this.#dueDate));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  toJSON() {
    return {
      id: this.#id,
      userId: this.#userId,
      bookId: this.#bookId,
      borrowDate: this.#borrowDate,
      dueDate: this.#dueDate,
      returnDate: this.#returnDate,
      status: this.#status
    };
  }
}

module.exports = BorrowRecord;
