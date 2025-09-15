import { Request, Response } from 'express';
import { BookService } from '../services/book';
import { logger } from '../utils/logger';
import { IBook } from '../models/book';
export class BooksController {
    private bookService = new BookService();

    private validatePagination(page: number, limit: number): { isValid: boolean; error?: string } {
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
                return res.status(400).json({ message: validation.error });
            }
            
            const books = await this.bookService.getAllBooks(page, limit);
            logger.logInfo(`Kitaplar başarıyla getirildi - Toplam: ${books.length}`, 'controller');
            res.status(200).json(books);
        } catch (error) {
            logger.logError('Kitaplar getirilirken hata oluştu', 'controller');
            res.status(500).json({ message: error.message });
        }
    }

    async getBookById(req:Request,res:Response) {
        try {
            logger.logInfo(`Kitap getiriliyor - ID: ${req.params.id}`, 'controller');
            const book = await this.bookService.getBookById(req.params.id);
            res.status(200).json(book);
        } catch(error) {
            logger.logError(`Kitap bulunurken hata oluştu - ID: ${req.params.id}`, 'controller');
            res.status(500).json({ message: error.message });
        }
        }
    

    async createBook(req: Request, res: Response) {
        try { 
            logger.logInfo(`Kitap oluşturuluyor - Veri: ${JSON.stringify(req.body)}`, 'controller');
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch(error) {
            logger.logError(`Kitap eklenirken hata oluştu - Veri: ${JSON.stringify(req.body)}`, 'controller');
            res.status(500).json({ message: error.message });
        }
    }
    async deleteBook(req: Request, res: Response) {
        try {
            logger.logInfo(`Kitap siliniyor - ID: ${req.params.id}`, 'controller');
            const book = await this.bookService.deleteBookById(req.params.id);
            res.status(200).json(book);
        } catch(error) {
            logger.logError(`Kitap silinirken hata oluştu - ID: ${req.params.id}`, 'controller');
            res.status(500).json({ message: error.message });
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            logger.logInfo(`Kitap güncelleniyor - ID: ${req.params.id} - Veri: ${JSON.stringify(req.body)}`, 'controller');
            const book = await this.bookService.updateBook(
                req.params.id, 
                req.body as Partial<IBook> // interface kullanarak type safety sağlandı artık mognoose a bağımlı değil bir interface içerisinde tanımladık
                 );
            logger.logInfo(`Kitap başarıyla güncellendi - ID: ${req.params.id}`, 'controller');
            res.status(200).json(book);
        } catch(error) {
            logger.logError(`Kitap güncellenirken hata oluştu - ID: ${req.params.id} - Veri: ${JSON.stringify(req.body)}`, 'controller');
            res.status(500).json({ message: error.message });
        }
    }
}
