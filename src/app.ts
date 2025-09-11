import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { notFound } from './middlewares/notFound';
import { serverError } from './middlewares/error';
import routes from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_DB_URI; // env dosyasından mongo db url alınıyor

mongoose.connect(MONGODB_URI) // mongo db bağlantısı yapılıyor
.then(() => console.log('MongoDB bağlandı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//health check
app.get('/get/health', (req, res) => {
  res.status(200).json({ status: 'sağlıklı' });
});

// Routes
app.use('/api', routes); 

app.use(notFound);
app.use(serverError);

app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  
});