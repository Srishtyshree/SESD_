const borrowRepository = require('../repositories/BorrowRepository');
const bookRepository = require('../repositories/BookRepository');
const notificationService = require('../observer/NotificationService');
const { DailyFineStrategy } = require('../strategy/FineStrategy');
const BorrowRecord = require('../models/BorrowRecord');

class BorrowService {
  constructor(borrowRepo, bookRepo, notificationSvc, fineStrategy) {
    this.borrowRepo = borrowRepo;
    this.bookRepo = bookRepo;
    this.notificationSvc = notificationSvc;
    this.fineStrategy = fineStrategy;
  }

  async borrowBook(userId, bookId) {
    const bookData = await this.bookRepo.findById(bookId);
    if (!bookData) throw new Error('Book not found');

    if (bookData.availableCopies <= 0) {
      throw new Error('No copies available for borrowing');
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks limit

    const borrowRecord = await this.borrowRepo.create({
      userId,
      bookId,
      dueDate,
      status: 'BORROWED'
    });

    // Update book copies
    await this.bookRepo.update(bookId, {
      availableCopies: bookData.availableCopies - 1
    });

    this.notificationSvc.notify('BOOK_BORROWED', { userId, bookId, dueDate });

    return new BorrowRecord(borrowRecord).toJSON();
  }

  async returnBook(borrowRecordId) {
    const record = await this.borrowRepo.findById(borrowRecordId);
    if (!record || record.status === 'RETURNED') {
      throw new Error('Invalid or already returned record');
    }

    const returnDate = new Date();
    const borrowModel = new BorrowRecord(record);
    
    let fineAmount = 0;
    if (borrowModel.isOverdue()) {
      fineAmount = this.fineStrategy.calculate(borrowModel.calculateOverdueDays());
    }

    await this.borrowRepo.update(borrowRecordId, {
      returnDate,
      status: 'RETURNED'
    });

    // Update book copies
    const book = await this.bookRepo.findById(record.bookId);
    await this.bookRepo.update(record.bookId, {
      availableCopies: book.availableCopies + 1
    });

    if (fineAmount > 0) {
      // Create fine record (using a repository I'll create)
      // For now just notify
      this.notificationSvc.notify('FINE_GENERATED', { userId: record.userId, amount: fineAmount });
    }

    this.notificationSvc.notify('BOOK_RETURNED', { userId: record.userId, bookId: record.bookId });

    return { success: true, fineAmount };
  }
}

module.exports = new BorrowService(
  borrowRepository,
  bookRepository,
  notificationService,
  new DailyFineStrategy()
);
