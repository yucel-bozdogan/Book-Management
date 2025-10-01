import { Request, Response } from 'express';
import { AuthorService } from '../services/author';
import { log } from '../utils/baseLogger';
import { IAuthor } from '../models/author';
import { ResponseModel } from '../utils/types/responseModel';
import { httpOk, badRequest, notFound, internalServerError } from '../helpers/responseHelper';

export class AuthorsController {
    private authorService = new AuthorService();

    public validatePagination(page:number,limit:number): {isValid:boolean,error?:string} {
        if (!page || isNaN(page)) {
            return {isValid:false,error:'Page parametresi gerekli ve sayı olmalı'};
        }

        if(page < 1) {
            return {isValid:false,error:'Page 1 veya daha büyük olmalı'};
        }
        if(limit < 1) {
            return {isValid:false,error:'Limit 1 veya daha büyük olmalı'};
        }
        return {isValid:true};
    }

    async getAllAuthors(req:Request,res:Response) {

        try {
            log.info('Tüm yazarlar getiriliyor',{source:'controller'});
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string) || 3;

            const validation = this.validatePagination(page,limit);
            if(!validation.isValid) {
                return badRequest(res, new ResponseModel(false, null, 'INVALID_PAGINATION', validation.error));
            }
            const authors = await this.authorService.getAllAuthors(page,limit);
            log.info(`Yazarlar başarıyla getirildi - Toplam: ${authors.length}`, { source: 'controller' });
            return httpOk(res, new ResponseModel(true, authors, null, `Yazarlar başarıyla getirildi - Toplam: ${authors.length}`));
        }catch(error){
            log.error('Yazarlar getirilirken hata oluştu',{source:'controller'});
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Yazarlar getirilirken hata oluştu'));
        }
    }

    async getAuthorById(req:Request,res:Response) {
        try{
            log.info(`Yazar getiriliyor - ID: ${req.params.id}`, { source: 'controller' });
            const author = await this.authorService.getAuthorById(req.params.id);
            if(!author) {
                return notFound(res);
            }
            return httpOk(res, new ResponseModel(true, author, null, 'Yazar başarıyla getirildi'));
        }catch(error){
            log.error(`Yazar bulunurken hata oluştu - ID: ${req.params.id}`, { source: 'controller' });
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Yazar bulunurken hata oluştu'));
        }
        }

        async updateAuthor(req:Request,res:Response) {
            try {
                log.info(`Yazar güncelleniyor - ID: ${req.params.id}`, { source: 'controller' });
                const author = await this.authorService.updateAuthor(req.params.id,req.body as Partial<IAuthor>);
                if(!author) {
                    return notFound(res);
                }
                log.info(`Yazar başarıyla güncellendi - ID: ${req.params.id}`, { source: 'controller' });
                return httpOk(res, new ResponseModel(true, author, null, 'Yazar başarıyla güncellendi'));
            }catch(error){
                log.error(`Yazar güncellenirken hata oluştu - ID: ${req.params.id}`, { source: 'controller' });
                return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Yazar güncellenirken hata oluştu'));
    }
    
    
        }
        async createAuthor(req: Request, res: Response) {
            try { 
                log.info(`Yazar oluşturuluyor - Veri: ${JSON.stringify(req.body)}`, { source: 'controller' });
                const author = await this.authorService.createAuthor(req.body);
                log.info(`Yazar başarıyla oluşturuldu - ID: ${author._id}`, { source: 'controller' });
                return res.status(201).json(new ResponseModel(true, author, null, 'Yazar başarıyla oluşturuldu'));
            } catch(error) {
                log.error(`Yazar eklenirken hata oluştu - Veri: ${JSON.stringify(req.body)}`, { source: 'controller' });
                return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Yazar eklenirken hata oluştu'));
            }
        }
    
        async deleteAuthor(req: Request, res: Response) {
            try {
                log.info(`Yazar siliniyor - ID: ${req.params.id}`, { source: 'controller' });
                const author = await this.authorService.deleteAuthorById(req.params.id);
                if (!author) {
                    return notFound(res);
                }
                log.info(`Yazar başarıyla silindi - ID: ${req.params.id}`, { source: 'controller' });
                return httpOk(res, new ResponseModel(true, author, null, 'Yazar başarıyla silindi'));
            } catch(error) {
                log.error(`Yazar silinirken hata oluştu - ID: ${req.params.id}`, { source: 'controller' });
                return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Yazar silinirken hata oluştu'));
            }
        }
        }

















