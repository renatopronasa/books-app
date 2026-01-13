const express = require('express');
const controller = require('../controllers/book.controller');
const upload = require('../config/multer');

const routes = express.Router();

routes.get('/', controller.index);
routes.get('/:id', controller.show);
routes.post('/', upload.single('image'), controller.store);
routes.put('/:id', upload.single('image'), controller.update);
routes.delete('/:id', controller.delete);

module.exports = routes;
