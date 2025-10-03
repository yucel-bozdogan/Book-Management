import { Request, Response, NextFunction } from 'express';
import { log } from '../utils/baseLogger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  
  // Response tamamlandığında logla
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;
    const userAgent = req.get('User-Agent') || 'Unknown';
    
    // Log seviyesini status code'a göre belirle
    const logLevel = statusCode >= 400 ? 'error' : 'info';
    
    const logData = {
      source: 'requestLogger',
      processId: res.locals.processId,
      traceId: (req as any).traceId,
      method,
      url: originalUrl,
      statusCode,
      duration: `${duration}ms`,
      ip,
      userAgent: userAgent.substring(0, 100) // User-Agent'ı kısalt
    };
    
    console.log('🔍 Request Logger - TraceId:', (req as any).traceId); // Debug log
    
    if (logLevel === 'error') {
      log.error(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`, logData);
    } else {
      log.info(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`, logData);
    }
  });
  
  next();
}