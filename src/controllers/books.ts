import { Request, Response } from 'express';
import { Book } from '../models/book';

export class BooksController {
    
    async getAllBooks(req: Request, res: Response) {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Kitaplar getirilirken hata oluştu' });
        }
    }

    async getBookById(req:Request,res:Response) {
        try {
            const book = await Book.findById(req.params.id);
            res.status(200).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap bulunurken hata oluştu' });
        }
        }
    

    async createBook(req: Request, res: Response) {
        try { 
            const book = await Book.create(req.body);
            res.status(201).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap eklenirken hata oluştu' });
        }
    }
    async deleteBook(req: Request, res: Response) {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            res.status(200).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap silinirken hata oluştu' });
        }
    }

    async updateBook(req: Request, res: Response) {
        try {
            const book = await Book.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true, runValidators: true }
            );
            res.status(200).json(book);
        } catch(error) {
            res.status(500).json({ message: 'Kitap güncellenirken hata oluştu' });
        }
    }
}
