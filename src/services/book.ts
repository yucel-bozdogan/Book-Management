import { Book, IBook } from '../models/book';
import { BooksRepository } from '../repositories/books';

export class BookService {
    private booksRepository = new BooksRepository();

    constructor() {
        this.booksRepository = new BooksRepository();
    }

    async getAllBooks() {
        return await this.booksRepository.findAll();
        
    }

    async getBookById(id: string) {
        return await this.booksRepository.findById(id);
    }   

    async deleteBook(id: string) {
        return await this.booksRepository.delete(id);
        
    }

    async createBook(bookData: Partial<IBook>) {
        if (bookData.title === 'Yücel' || bookData.title === 'Kaan') {
            throw new Error('Yücel kitabı oluşturulamaz');
        }
        return await this.booksRepository.create(bookData);
    }

    async updateBook(id: string, bookData: Partial<IBook>) {
        return await this.booksRepository.update(id, bookData);
        
    }
}
