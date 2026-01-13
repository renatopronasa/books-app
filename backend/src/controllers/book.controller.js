const service = require('../services/book.service');
const fs = require('fs');
const path = require('path');

class BookController {
  async index(req, res) {
    const q = req.query.q;
    const books = await service.findAll(q);
    const host = `${req.protocol}://${req.get('host')}`;
    const mapped = books.map(b => ({
      ...b,
      image_url: b.image_url && !b.image_url.startsWith('http') ? `${host}${b.image_url}` : b.image_url
    }));
    return res.json(mapped);
  }

  async show(req, res) {
    const book = await service.findById(req.params.id);

    if (!book) {
      return res.sendStatus(404);
    }

    const host = `${req.protocol}://${req.get('host')}`;
    if (book.image_url && !book.image_url.startsWith('http')) {
      book.image_url = `${host}${book.image_url}`;
    }

    return res.json(book);
  }

  async store(req, res) {
    const {
      title,
      author,
      publishedAt,
      description,
      image
    } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (image) {
      imageUrl = image;
    }

    const id = await service.create({
      title,
      author,
      published_at: publishedAt || null,
      description,
      image_url: imageUrl
    });

    return res.status(201).json({ id });
  }

  async update(req, res) {
    const {
      title,
      author,
      publishedAt,
      description,
      image
    } = req.body;

    const existing = await service.findById(req.params.id);
    let imageUrl = existing ? existing.image_url : null;
    if (req.file) {
      if (existing && existing.image_url && !existing.image_url.startsWith('http')) {
        const uploadsDir = path.resolve(__dirname, '..', '..', 'uploads');
        const oldFilename = path.basename(existing.image_url);
        const oldPath = path.join(uploadsDir, oldFilename);
        try {
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        } catch (err) {
        }
      }

      imageUrl = `/uploads/${req.file.filename}`;
    } else if (typeof image !== 'undefined') {
      imageUrl = image || null;
    }

    await service.update(req.params.id, {
      title,
      author,
      published_at: publishedAt || null,
      description,
      image_url: imageUrl
    });

    return res.sendStatus(204);
  }

  async delete(req, res) {
    await service.delete(req.params.id);
    return res.sendStatus(204);
  }
}

module.exports = new BookController();
