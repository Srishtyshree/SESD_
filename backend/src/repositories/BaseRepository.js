const prisma = require('../prisma');

class BaseRepository {
  constructor(model) {
    this.model = prisma[model];
  }

  async findAll(query = {}) {
    return await this.model.findMany(query);
  }

  async findById(id) {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data) {
    return await this.model.create({ data });
  }

  async update(id, data) {
    return await this.model.update({ where: { id }, data });
  }

  async delete(id) {
    return await this.model.delete({ where: { id } });
  }
}

module.exports = BaseRepository;
