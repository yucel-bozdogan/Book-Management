import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { notFound } from './middlewares/notFound';
import { serverError } from './middlewares/error';
import { processIdGeneration } from './middlewares/processIdGeneration';
import routes from './routes';
import { logger } from './utils/baseLogger';
import { log } from './utils/baseLogger';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_DB_URI; // env dosyasından mongo db url alınıyor

mongoose.connect(MONGODB_URI) // mongo db bağlantısı yapılıyor
.then(() => log.info('MongoDB baglandi', { source: 'database' }))
.catch(() => log.error('MongoDB bağlantı hatası', { source: 'database' }));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ProcessId middleware'ini health check'ten önce uygula
app.use(processIdGeneration);

//health check
app.get('/get/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
    log.info('Health check yapıldı', { source: 'health-check', processId: res.locals.processId });
    res.status(200).json({ 
      status: 'sağlıklı',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    log.error('Health check sırasında hata oluştu', { source: 'health-check', processId: res.locals.processId });
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
  log.info(`Sunucu http://localhost:${PORT} adresinde calisiyor`, { source: 'server' });
});