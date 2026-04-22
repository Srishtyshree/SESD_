const User = require('../models/User');

class UserFactory {
  static createUser(data) {
    const { role } = data;
    switch (role) {
      case 'ADMIN':
        return new User({ ...data, role: 'ADMIN' });
      case 'LIBRARIAN':
        return new User({ ...data, role: 'LIBRARIAN' });
      case 'USER':
      default:
        return new User({ ...data, role: 'USER' });
    }
  }
}

module.exports = UserFactory;
