import { Book, IBook } from '../models/book';
import { Types } from 'mongoose';

export class BooksRepository {
    
    async findAll(page:number,limit:number) {
        const skip = (page - 1) * limit;
        return await Book.find().skip(skip).limit(limit);
        
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
    async existByAuthorAndTitle(author: Types.ObjectId, title: string, excludeId?: string) {
        const filter: any = { author, title };
        if (excludeId) {
            filter._id = { $ne: excludeId };  //exclude id güncelliyeceğim id $ne: = değilse
        }                                           //yolladığım id filterimin eşleştiği id'ye eşit değilse bu fonksiyon çalışsın
        return await Book.exists(filter);  
    }
}

