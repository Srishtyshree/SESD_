const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('user');
  }

  async findByEmail(email) {
    return await this.model.findUnique({ where: { email } });
  }

  async findByUsername(username) {
    return await this.model.findUnique({ where: { username } });
  }
}

module.exports = new UserRepository();
