import { Request, Response } from 'express';
import { BookService } from '../services/book';
import { logger } from '../utils/logger';
import { IBook } from '../models/book';
export class BooksController {
    private bookService = new BookService();

    async getAllBooks(req: Request, res: Response) {
        try {
            logger.info('Tüm kitaplar getiriliyor');
            const books = await this.bookService.getAllBooks();
            logger.info(`Kitaplar başarıyla getirildi - Toplam: ${books.length}`);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Kitaplar getirilirken hata oluştu' });
        }
    }

    async getBookById(req:Request,res:Response) {
        try {
            logger.info(`Kitap getiriliyor - ID: ${req.params.id}`);
            const book = await this.bookService.getBookById(req.params.id);
            logger.info(`Kitap başarıyla getirildi - ID: ${req.params.id}`);
            res.status(200).json(book);
        } catch(error) {
            logger.error(`Kitap bulunurken hata oluştu - ID: ${req.params.id}`);//backstik in amacı text içerisine değişken koyabilmemiz dolar işareti de değişkenin içini text olarak gösterir
            res.status(500).json({ message: 'Kitap bulunurken hata oluştu' });
        }
        }
    

    async createBook(req: Request, res: Response) {
        try { 
            logger.info(`Kitap oluşturuluyor - Veri: ${JSON.stringify(req.body)}`); // objeyi stringe çevir çünkü pino loglayabilmesi için
            const book = await this.bookService.createBook(req.body);
            logger.info(`Kitap başarıyla oluşturuldu - ID: ${book._id}`);
            res.status(201).json(book);
        } catch(error) {
            logger.error(`Kitap eklenirken hata oluştu - Veri: ${JSON.stringify(req.body)}`);
            res.status(500).json({ message: 'Kitap eklenirken hata oluştu' });
        }
    }
    async deleteBook(req: Request, res: Response) {
        try {
            logger.info(`Kitap siliniyor - ID: ${req.params.id}`); 
            const book = await this.bookService.deleteBook(req.params.id);
            logger.info(`Kitap başarıyla silindi - ID: ${req.params.id}`);
            res.status(200).json(book);
        } catch(error) {
            logger.error(`Kitap silinirken hata oluştu - ID: ${req.params.id}`);
            res.status(500).json({ message: 'Kitap silinirken hata oluştu' });
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            logger.info(`Kitap güncelleniyor - ID: ${req.params.id} - Veri: ${JSON.stringify(req.body)}`);
            const book = await this.bookService.updateBook(
                req.params.id, 
                req.body as Partial<IBook> // interface kullanarak type safety sağlandı artık mognoose a bağımlı değil bir interface içerisinde tanımladık
                 );
            logger.info(`Kitap başarıyla güncellendi - ID: ${req.params.id}`);
            res.status(200).json(book);
        } catch(error) {
            logger.error(`Kitap güncellenirken hata oluştu - ID: ${req.params.id} - Veri: ${JSON.stringify(req.body)}`);
            res.status(500).json({ message: 'Kitap güncellenirken hata oluştu' });
        }
    }
}
