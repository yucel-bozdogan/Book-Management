import { Category, ICategory } from "../models/category";
import { Types } from "mongoose";

export class CategoryRepository  {

async findAll(page:number,limit:number) {
    const skip = (page - 1) * limit;
    return await Category.find().skip(skip).limit(limit);
}

async findById(id:string) {
    return await Category.findById(id);
    
}

async create (categoryData:ICategory) {
    return await Category.create(categoryData);
}

async update (id:string,categoryData:Partial<ICategory>) {
    return await Category.findByIdAndUpdate(id,categoryData,{new:true,runValidators:true});
}

async delete (id:string) {
    const result = await Category.findByIdAndDelete(id);
    return !!result;
}

async existsByName(name: string, excludeId?: string) {
    const filter: any = { name: name.trim() };
    if (excludeId && Types.ObjectId.isValid(excludeId)) {
      filter._id = { $ne: excludeId };
    }
    return await Category.exists(filter);
}
}