import { Request , Response } from 'express';
import { logger } from '../utils/baseLogger';
import { log } from '../utils/baseLogger';

export function serverError (err:any,req:Request,res:Response) {
    console.error(err.stack); //hata nereden geliyor
    logger.error(`Sunucu hatası - ${err.stack}`);
    log.error(`Sunucu hatası - ${err.stack}`, { source: 'middleware' });
    res.status(500).json({
      error: 'Sunucu hatası'
    });
  }
