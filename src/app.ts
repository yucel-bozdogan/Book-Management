import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Kitap Yönetim Sistemi API\'sine hoş geldiniz!',
    version: '1.0.0'
  });
});

app.get('/books', (req, res) => {
  res.json({
    message: 'Kitap listesi',
    books: []
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Sayfa bulunamadı'
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Sunucu hatası'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});