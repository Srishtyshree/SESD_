const BaseRepository = require('./BaseRepository');

class BorrowRepository extends BaseRepository {
  constructor() {
    super('borrowRecord');
  }

  async findActiveByUserId(userId) {
    return await this.model.findMany({
      where: { userId, status: 'BORROWED' },
      include: { book: true }
    });
  }

  async findOverdue() {
    return await this.model.findMany({
      where: {
        status: 'BORROWED',
        dueDate: { lt: new Date() }
      },
      include: { user: true, book: true }
    });
  }
}

module.exports = new BorrowRepository();
