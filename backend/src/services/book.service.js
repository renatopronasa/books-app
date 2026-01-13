const repository = require('../repositories/book.repository');

class BookService {
  async findAll(q) {
    return repository.findAll(q);
  }

  async findById(id) {
    return repository.findById(id);
  }

  async create(data) {
    if (!data.title || !data.author) {
      throw new Error('Título e autor são obrigatórios');
    }
    return repository.create(data);
  }

  async update(id, data) {
    await repository.update(id, data);
    return repository.findById(id);
  }

  async delete(id) {
    return repository.delete(id);
  }
}

module.exports = new BookService();
