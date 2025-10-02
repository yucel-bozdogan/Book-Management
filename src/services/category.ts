import { CategoryRepository } from "../repositories/category";
import { ICategory } from "../models/category";
import { Types } from "mongoose";

export class CategoryService {
categoryRepository = new CategoryRepository();
    async getAllCategories(page:number,limit?:number) {
        try{
            const currentPage = page;
            const pageSize = limit || 3;
            const categories = await this.categoryRepository.findAll(currentPage,pageSize);
            return categories;
        }catch(error){
            throw new Error(`Kategoriler getirilirken hata oluştu: ${error.message}`);
        }
    }
    async getCategoryById(id:string) {
        const category = await this.categoryRepository.findById(id);
        if(!category){
            throw new Error('Kategori bulunamadı');

        }
        return category;
    }
    async deleteCategoryById(id:string) {
        const category = await this.categoryRepository.delete(id);
        if(!category){
            throw new Error('Kategori bulunamadı');

        }
        return {
            category,
            message: 'Kategori başarıyla silindi'
        }
    }
    async createCategory(categoryData: ICategory) {
        
        if (!categoryData.name || categoryData.name.trim() === '') {
            throw new Error('Kategori adı boş olamaz');
        }
        if (categoryData.name.length < 3) {
            throw new Error('Kategori adı en az 3 karakter olmalıdır');
        }
    
        // duplicate kontrolü
        const exists = await this.categoryRepository.existsByName(categoryData.name);
        if (exists) {
            throw new Error('Kategori zaten mevcut');
        }
    
        return await this.categoryRepository.create(categoryData);
    }

    async updateCategory(id: string, categoryData: Partial<ICategory>) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error('Kategori bulunamadı');
        }
    
        if (categoryData.name !== undefined) {
            if (categoryData.name.trim() === '') {
                throw new Error('Kategori adı boş olamaz');
            }
            if (categoryData.name.length < 3) {
                throw new Error('Kategori adı en az 3 karakter olmalıdır');
            }
    
            
            const exists = await this.categoryRepository.existsByName(categoryData.name, id);
            if (exists) {
                throw new Error('Bu isimde kategori zaten mevcut');
            }
        }
    
        return await this.categoryRepository.update(id, categoryData);
    }

     















}