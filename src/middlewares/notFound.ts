import { Request , Response } from 'express';
import { logger } from '../utils/logger';

export function notFound (req:Request,res:Response) {
    logger.logError(`Sayfa bulunamadı - ${req.url}`, 'middleware');
    
    res.status(404).json({
      error: 'Sayfa bulunamadı'
    });
}