import { Book, IBook } from '../models/book';

export class BooksRepository {
    
    async findAll(page:number,limit:number) {
        const skip = (page - 1) * limit;
        return await Book.find().skip(skip).limit(limit);
        // skip ilk n kaydı atlar
    }

    async findById(id: string) {
        return await Book.findById(id);
    }

    async create(bookData: IBook) {
        return await Book.create(bookData);
    }

    async update(id: string, bookData: Partial<IBook>) {
        return await Book.findByIdAndUpdate(
            id, 
            bookData, 
            { new: true, runValidators: true }
        );
    }

    async delete(id: string) {
        const result = await Book.findByIdAndDelete(id);
        return !!result; 
    }
   
}



