import { Request, Response } from 'express';
import { BookService } from '../services/book';
import { logger } from '../utils/logger';
import { IBook } from '../models/book';
import { ResponseModel } from '../models/responseModel';
import { httpOk, badRequest, notFound, internalServerError } from '../helpers/responseHelper';
export class BooksController {
    private bookService = new BookService();

    public validatePagination(page: number, limit: number): { isValid: boolean; error?: string } {
        if (!page || isNaN(page)) {
            return { isValid: false, error: 'Page parametresi gerekli ve sayı olmalı' };
        }
        
        if (page < 1) {
            return { isValid: false, error: 'Page 1 veya daha büyük olmalı' };
        }

        if (limit < 1) {
            return { isValid: false, error: 'Limit 1 veya daha büyük olmalı' };
        }

        return { isValid: true };
    }

    async getAllBooks(req: Request, res: Response) {
        try {
            logger.logInfo('Tüm kitaplar getiriliyor', 'controller');
            
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string) || 3;
            
            const validation = this.validatePagination(page, limit);
            if (!validation.isValid) {
                return badRequest(res, new ResponseModel(false, null, 'INVALID_PAGINATION', validation.error));
            }
            
            const books = await this.bookService.getAllBooks(page, limit);
            logger.logInfo(`Kitaplar başarıyla getirildi - Toplam: ${books.length}`, 'controller');
            return httpOk(res, new ResponseModel(true, books, null, `Kitaplar başarıyla getirildi - Toplam: ${books.length}`));
        } catch (error) {
            logger.logError('Kitaplar getirilirken hata oluştu', 'controller');
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Kitaplar getirilirken hata oluştu'));
        }
    }

    async getBookById(req:Request,res:Response) {
        try {
            logger.logInfo(`Kitap getiriliyor - ID: ${req.params.id}`, 'controller');
            const book = await this.bookService.getBookById(req.params.id);
            if (!book) {
                return notFound(res);
            }
            return httpOk(res, new ResponseModel(true, book, null, 'Kitap başarıyla getirildi'));
        } catch(error) {
            logger.logError(`Kitap bulunurken hata oluştu - ID: ${req.params.id}`, 'controller');
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Kitap bulunurken hata oluştu'));
        }
        }
    

    async createBook(req: Request, res: Response) {
        try { 
            logger.logInfo(`Kitap oluşturuluyor - Veri: ${JSON.stringify(req.body)}`, 'controller');
            const book = await this.bookService.createBook(req.body);
            logger.logInfo(`Kitap başarıyla oluşturuldu - ID: ${book._id}`, 'controller');
            return res.status(201).json(new ResponseModel(true, book, null, 'Kitap başarıyla oluşturuldu'));
        } catch(error) {
            logger.logError(`Kitap eklenirken hata oluştu - Veri: ${JSON.stringify(req.body)}`, 'controller');
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Kitap eklenirken hata oluştu'));
        }
    }
    async deleteBook(req: Request, res: Response) {
        try {
            logger.logInfo(`Kitap siliniyor - ID: ${req.params.id}`, 'controller');
            const book = await this.bookService.deleteBookById(req.params.id);
            if (!book) {
                return notFound(res);
            }
            logger.logInfo(`Kitap başarıyla silindi - ID: ${req.params.id}`, 'controller');
            return httpOk(res, new ResponseModel(true, book, null, 'Kitap başarıyla silindi'));
        } catch(error) {
            logger.logError(`Kitap silinirken hata oluştu - ID: ${req.params.id}`, 'controller');
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Kitap silinirken hata oluştu'));
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            logger.logInfo(`Kitap güncelleniyor - ID: ${req.params.id} - Veri: ${JSON.stringify(req.body)}`, 'controller');
            const book = await this.bookService.updateBook(
                req.params.id, 
                req.body as Partial<IBook> // interface kullanarak type safety sağlandı artık mognoose a bağımlı değil bir interface içerisinde tanımladık
                 );
            if (!book) {
                return notFound(res);
            }
            logger.logInfo(`Kitap başarıyla güncellendi - ID: ${req.params.id}`, 'controller');
            return httpOk(res, new ResponseModel(true, book, null, 'Kitap başarıyla güncellendi'));
        } catch(error) {
            logger.logError(`Kitap güncellenirken hata oluştu - ID: ${req.params.id} - Veri: ${JSON.stringify(req.body)}`, 'controller');
            return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'Kitap güncellenirken hata oluştu'));
        }
    }
}
