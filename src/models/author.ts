import mongoose, { Document } from 'mongoose';

export interface IAuthor extends Document {
    name:string;
    email:string;
    birthDate:Date;

}

export const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    birthDate:{
        type:Date,
    }
},
{
    timestamps:true
});
export const Author = mongoose.model<IAuthor>("Author", AuthorSchema);