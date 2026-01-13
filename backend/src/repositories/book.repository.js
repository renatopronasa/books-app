const db = require('../config/database');

class BookRepository {
  async findAll(q) {
    if (!q) {
      const [rows] = await db.query('SELECT * FROM books ORDER BY created_at DESC');
      return rows;
    }

    const like = `%${q}%`;
    const [rows] = await db.query(
      `SELECT * FROM books
        WHERE title LIKE ? OR author LIKE ? OR description LIKE ?
        ORDER BY created_at DESC`,
      [like, like, like]
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM books WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  async create(book) {
    const { title, author, published_at, description, image_url } = book;

    const [result] = await db.query(
      `INSERT INTO books 
        (title, author, published_at, description, image_url)
        VALUES (?, ?, ?, ?, ?)`,
      [title, author, published_at, description, image_url]
    );

    return result.insertId;
  }

  async update(id, book) {
    const { title, author, published_at, description, image_url } = book;

    await db.query(
      `UPDATE books 
        SET title=?, author=?, published_at=?, description=?, image_url=?
        WHERE id=?`,
      [title, author, published_at, description, image_url, id]
    );
  }

  async delete(id) {
    await db.query('DELETE FROM books WHERE id = ?', [id]);
  }
}

module.exports = new BookRepository();
