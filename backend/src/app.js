const express = require('express');
const cors = require('cors');
const path = require('path');

const bookRoutes = require('./routes/book.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/books', bookRoutes);

module.exports = app;

