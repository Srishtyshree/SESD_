const userRepository = require('../repositories/UserRepository');
const bookRepository = require('../repositories/BookRepository');

class AdminController {
  async getAllUsers(req, res) {
    const users = await userRepository.findAll({
      select: { id: true, username: true, email: true, joinedAt: true, role: true }
    });
    res.json(users);
  }

  async getStats(req, res) {
    const userCount = await userRepository.model.count();
    const bookCount = await bookRepository.model.count();
    // Add more stats like active borrows, etc.
    res.json({ users: userCount, books: bookCount });
  }
}

module.exports = new AdminController();
