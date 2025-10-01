import { Book, IBook } from '../models/book';
import { BooksRepository } from '../repositories/books';
import { Types } from 'mongoose'; 

export class BookService {
    booksRepository = new BooksRepository();
   

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
        // bookData.author artık ObjectId tipinde, string değil
        const exist = await this.booksRepository.existByAuthorAndTitle(bookData.author, bookData.title);
        const price = bookData.price;
        if(bookData.price < 0) {
            throw new Error('Fiyat 0\'dan küçük olamaz');
        }
       
        if (exist) {
            throw new Error('Bu yazar ve başlık ile kitap zaten mevcut');
        }
        bookData.price = Math.round(price*100)/100;
        return await this.booksRepository.create(bookData);
    }

    async updateBook(id: string, bookData: Partial<IBook>) {
        try {
            
            const currentBook = await this.booksRepository.findById(id);
            if (!currentBook) {
                throw new Error('Kitap bulunamadı');
            }

            
            if (bookData.price !== undefined) {
                const newPrice = bookData.price;
                if (typeof newPrice !== 'number' || !Number.isFinite(newPrice)) {
                    throw new Error('Fiyat geçerli bir sayı olmalı');
                }
                if (newPrice < 0) {
                    throw new Error('Fiyat 0\'dan küçük olamaz');
                }
                
                
            }
            if (bookData.author || bookData.title) {
                const newAuthor = bookData.author || currentBook.author;
                const newTitle = bookData.title || currentBook.title;
                // book data author ve title değişiyorsa yeniyi kullan değişmiyorsa eskiyi kullan
                
                const exist = await this.booksRepository.existByAuthorAndTitle(newAuthor, newTitle, id);
                if (exist) {
                    throw new Error('Bu yazar ve başlık kombinasyonu zaten mevcut');
                }
            }

            return await this.booksRepository.update(id, bookData);
        } catch (error) {
            throw new Error(`Kitap güncellenirken hata oluştu: ${error.message}`);
        }
    }

}