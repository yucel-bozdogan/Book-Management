import mongoose, { Document, Types } from 'mongoose';


export interface IBook extends Document {
    description: string;
    author: Types.ObjectId; // author u id olarak alıcam
    price: number;
    title: string;
  }

export const BookSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
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