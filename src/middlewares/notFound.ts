import { Request , Response } from 'express';
import { log } from '../utils/baseLogger';

export function notFound (req:Request,res:Response) {
    log.error(`Sayfa bulunamadı - ${req.url}`, { source: 'middleware' });
    
    res.status(404).json({
      error: 'Sayfa bulunamadı'
    });
}