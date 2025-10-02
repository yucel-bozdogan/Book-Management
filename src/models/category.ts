import mongoose, { Document } from 'mongoose';

export interface ICategory extends Document { // tipi belirliyoruz
    name: string;
}

export const CategorySchema = new mongoose.Schema({
    name: {  //db de nasıl tutacağımızı belirliyoruz
        type: String,
        required: true
    }
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema); //modeli dışarıya açıyoruz
