const express = require('express');
const cors = require('cors');

const bookRoutes = require('./routes/book.routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use('/books', bookRoutes);

// Rota de health check (opcional, mas recomendada)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ✅ Middleware de erro (SEMPRE O ÚLTIMO)
app.use((err, req, res, next) => {
  console.error('🔥 ERRO NA API:', err);

  res.status(500).json({
    message: 'Erro interno no servidor',
  });
});

module.exports = app;
