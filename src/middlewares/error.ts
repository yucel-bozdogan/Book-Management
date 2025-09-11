import { Request , Response } from 'express';
export function serverError (err:any,req:Request,res:Response) {
    console.error(err.stack); //hata nereden geliyor
    res.status(500).json({
      error: 'Sunucu hatası'
    });
  }
