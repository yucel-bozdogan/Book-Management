import { Author,IAuthor } from "../models/author";
import {Types} from 'mongoose';

export class AuthorsRepository {

    async findAll(page:number,limit:number) {
        const skip = (page - 1) * limit;
        return await Author.find().skip(skip).limit(limit);
    }

    async findById(id:string) {
    return await Author.findById(id);
    }

    async create (authorData:IAuthor) {
        return await Author.create(authorData);
    }

    async update(id:string,authorData:Partial<IAuthor>) {
        return await Author.findByIdAndUpdate(id,authorData,{new:true,runValidators:true});
    }
    async delete(id:string) {
    const result = await Author.findByIdAndDelete(id);
    return !! result;
    }
    async findByEmail(email:string) {
        return await Author.findOne({email});
    }
    



}