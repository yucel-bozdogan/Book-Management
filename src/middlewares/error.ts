import { Request , Response } from 'express';
import { logger } from '../utils/logger';
export function serverError (err:any,req:Request,res:Response) {
    console.error(err.stack); //hata nereden geliyor
    logger.error(`Sunucu hatası - ${err.stack}`);
    res.status(500).json({
      error: 'Sunucu hatası'
    });
  }
