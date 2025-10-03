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
import cors from 'cors'; 
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { requestLogger } from './middlewares/requestLogger';
import { traceId } from './middlewares/traceId'; 


dotenv.config();
const app = express();    // express sunucus oluşturuyor
const PORT = process.env.PORT || 3000;  // port bilgisini env den alıyoru
const MONGODB_URI = process.env.MONGO_DB_URI; 

mongoose.connect(MONGODB_URI) // mongo db bağlantısı yapılıyor
.then(() => log.info('MongoDB baglandi', { source: 'database' })) //bağlantı durumu loglanıyor
.catch(() => log.error('MongoDB bağlantı hatası', { source: 'database' }));

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için 15 dakikada maksimum 100 istek
  message: {
    error: 'Çok fazla istek gönderdiniz, lütfen 15 dakika sonra tekrar deneyin.',
    retryAfter: '15 dakika'
  },
  standardHeaders: true, // Rate limit bilgilerini header'larda göster
  legacyHeaders: false, // X-RateLimit-* header'larını devre dışı bırak
});
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ProcessId middleware'ini health check'ten önce uygula
app.use(processIdGeneration);
app.use(traceId);
app.use(requestLogger);
//health check
app.get('/get/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
    
    // TraceId'yi ekleyin
    log.info('Health check yapıldı', { 
      source: 'health-check', 
      processId: res.locals.processId,
      traceId: (req as any).traceId
    });
    
    res.status(200).json({ 
      status: 'sağlıklı',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      traceId: (req as any).traceId
    });
  } catch (error) {
    log.error('Health check sırasında hata oluştu', { 
      source: 'health-check', 
      processId: res.locals.processId,
      traceId: (req as any).traceId
    });
    res.status(500).json({ 
      status: 'hatalı',
      database: 'disconnected',
      error: error.message,
      traceId: (req as any).traceId
    });
  }
});

// Routes
app.use('/api', routes);  // route a yolladık isteği

app.use(notFound);
app.use(serverError);

app.listen(PORT, () => {
  log.info(`Sunucu http://localhost:${PORT} adresinde calisiyor`, { source: 'server' });
});