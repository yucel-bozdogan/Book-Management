import { Book, IBook } from '../models/book';
import { BooksRepository } from '../repositories/books';

export class BookService {
    private booksRepository = new BooksRepository();

    constructor() {
        this.booksRepository = new BooksRepository();
    }

    async getAllBooks(page:number,limit?:number) {
        
        try{
            const currentPage = page;
            const pageSize = limit || 3;
            const books = await this.booksRepository.findAll(currentPage,pageSize);
           
           return books;
        }catch(error){
            throw new Error(`Kitaplar getirilirken hata oluştu: ${error.message}`);
        }
    }

    async getBookById(id: string) {
        const book =await this.booksRepository.findById(id);
        if (!book) {
            throw new Error('Kitap bulunamadı');
        }
        return {
            book,
            message: 'Kitap başarıyla getirildi'
        }
    }   

    async deleteBookById(id: string) {
        const book = await this.booksRepository.delete(id);
        if (!book) {
            throw new Error('verilen id ile Kitap bulunamadı');
        }
        return {
            book,
            message: 'Kitap başarıyla silindi'
        }
    }




    async createBook(bookData: IBook) {
        if (bookData.title === 'Yücel' || bookData.title === 'Kaan') {
            throw new Error('Yücel kitabı oluşturulamaz');
        }
        return await this.booksRepository.create(bookData);
    }

    async updateBook(id: string, bookData: Partial<IBook>) {
        return await this.booksRepository.update(id, bookData);
        
    }
}
