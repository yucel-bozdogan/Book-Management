import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { notFound } from './middlewares/notFound';
import { serverError } from './middlewares/error';
import { processIdGeneration } from './middlewares/processIdGeneration';
import routes from './routes';
import { baseLogger } from './utils/baseLogger';
import { logger } from './utils/logger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_DB_URI; // env dosyasından mongo db url alınıyor

mongoose.connect(MONGODB_URI) // mongo db bağlantısı yapılıyor
.then(() => logger.logInfo('MongoDB baglandi', 'database'))
.catch(() => logger.logError('MongoDB bağlantı hatası', 'database'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ProcessId middleware'ini health check'ten önce uygula
app.use(processIdGeneration);

//health check
app.get('/get/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
    logger.logInfo('Health check yapıldı', 'health-check', res.locals.processId);
    res.status(200).json({ 
      status: 'sağlıklı',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.logError('Health check sırasında hata oluştu', 'health-check', res.locals.processId);
    res.status(500).json({ 
      status: 'hatalı',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Routes
app.use('/api', routes); 

app.use(notFound);
app.use(serverError);

app.listen(PORT, () => {
  logger.logInfo(`Sunucu http://localhost:${PORT} adresinde calisiyor`, 'server');
});