import { Request , Response } from 'express';
import { logger } from '../utils/logger';
export function notFound (req:Request,res:Response) {
    logger.error(`Sayfa bulunamadı - ${req.url}`);
    
        res.status(404).json({
          
          error: 'Sayfa bulunamadı'
        });
}