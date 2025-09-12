import { Book, IBook } from '../models/book';

export class BookService {
    async getAllBooks() {
        return await Book.find();
    }

    async getBookById(id: string) {
        return await Book.findById(id);
    }

    async deleteBook(id: string) {
        return await Book.findByIdAndDelete(id);    
    }

    async createBook(bookData: Partial<IBook>) {
        return await Book.create(bookData);
    }

    async updateBook(id: string, bookData: Partial<IBook>) {
        return await Book.findByIdAndUpdate(id,bookData,
          
            { new: true, runValidators: true }
        );
    }
}
