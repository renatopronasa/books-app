const request = require('supertest');
const app = require('../src/app');

describe('Books API', () => {
  let bookId;

  it('POST /books - should create a book', async () => {
    const res = await request(app)
      .post('/books')
      .send({
        title: 'Clean Code',
        author: 'Robert C. Martin'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');

    bookId = res.body.id;
  });

  it('GET /books - should list books', async () => {
    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /books/:id - should update a book', async () => {
    const res = await request(app)
      .put(`/books/${bookId}`)
      .send({
        title: 'Clean Code',
        author: 'Robert C. Martin'
      });

    expect(res.statusCode).toBe(200);
  });

  it('DELETE /books/:id - should delete a book', async () => {
    const res = await request(app).delete(`/books/${bookId}`);

    expect(res.statusCode).toBe(204);
  });
});
