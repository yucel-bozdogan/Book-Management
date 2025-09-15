import { Request , Response } from 'express';
import { baseLogger } from '../utils/baseLogger';
import { logger } from '../utils/logger';

export function serverError (err:any,req:Request,res:Response) {
    console.error(err.stack); //hata nereden geliyor
    baseLogger.error(`Sunucu hatası - ${err.stack}`);
    logger.logError(`Sunucu hatası - ${err.stack}`, 'middleware');
    res.status(500).json({
      error: 'Sunucu hatası'
    });
  }
