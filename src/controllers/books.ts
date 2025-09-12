import { Request, Response } from 'express';
import { BookService } from '../services/book';

export class BooksController {
    private bookService = new BookService();

    async getAllBooks(req: Request, res: Response) {
        try {
            const books = await this.bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Kitaplar getirilirken hata oluştu' });
        }
    }

    async getBookById(req:Request,res:Response) {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            res.status(200).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap bulunurken hata oluştu' });
        }
        }
    

    async createBook(req: Request, res: Response) {
        try { 
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap eklenirken hata oluştu' });
        }
    }
    async deleteBook(req: Request, res: Response) {
        try {
            const book = await this.bookService.deleteBook(req.params.id);
            res.status(200).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap silinirken hata oluştu' });
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            const book = await this.bookService.updateBook(
                req.params.id, 
                req.body, 
                 );
            
            res.status(200).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap güncellenirken hata oluştu' });
        }
    }
}
