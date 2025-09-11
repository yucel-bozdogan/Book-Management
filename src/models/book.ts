import mongoose from 'mongoose';


export interface IBook extends Document {
    description: string;
    author: string;
    price: number;
    title: string;
  }

export const BookSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    
}
);
export const Book = mongoose.model<IBook>("Book", BookSchema);