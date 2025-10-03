import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function traceId(req: Request, res: Response, next: NextFunction) {
  const traceId = uuidv4();
  
  console.log('🔍 TraceId middleware çalışıyor:', traceId); // Debug log
  
  (req as any).traceId = traceId;//Controller veya Service tarafında req.traceId ile kullanılabilir.
  res.locals.traceId = traceId; //response işlemleri içinde kullanılabilmesi için
  res.setHeader('X-Trace-Id', traceId); //Response header'ına ekleniyor, böylece client veya başka servisler bu ID'yi görebiliyor.
  
  next();
}