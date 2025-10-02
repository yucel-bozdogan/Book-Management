import { Request, Response } from 'express';
import { CategoryService } from '../services/category';
import { ResponseModel } from '../utils/types/responseModel';
import { httpOk, badRequest, notFound, internalServerError } from '../helpers/responseHelper';
import { Types } from 'mongoose';
import { log } from '../utils/baseLogger';
import { Category } from '../models/category';

export class CategoryController {
    private categoryService = new CategoryService();

    public validatePagination(page: number, limit: number): { isValid: boolean; error?: string } {
        if (!page || isNaN(page)) {
            return { isValid: false, error: 'Page parametresi gerekli ve sayı olmalı' };
        }
        
        if (page < 1) {
            return { isValid: false, error: 'Page 1 veya daha büyük olmalı' };
        }

        if (limit < 1) {
            return { isValid: false, error: 'Limit 1 veya daha büyük olmalı' };
        }

        if (limit > 100) {
            return { isValid: false, error: 'Limit en fazla 100 olabilir' };
        }

        return { isValid: true };
    }


async getAllCategories(req:Request,res:Response) {
    try {
        const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string) || 3;
            
            const validation = this.validatePagination(page, limit);
            if (!validation.isValid) {
                return badRequest(res, new ResponseModel(false, null, 'INVALID_PAGINATION', validation.error));
            }
            const categories = await this.categoryService.getAllCategories(page, limit);
            log.info(`kategoriler başarıyla getirildi - Toplam: ${categories.length}`, { source: 'controller' });
            return httpOk(res, new ResponseModel(true, categories, null, `kategoriler başarıyla getirildi - Toplam: ${categories.length}`));
}catch(error){
    log.error('kategoriler getirilirken hata oluştu', { source: 'controller' });
    return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'kategoriler getirilirken hata oluştu'));
}
}

async getCategoryById(req:Request,res:Response) {
    try {
        const category = await this.categoryService.getCategoryById(req.params.id);
        if(!category){
            return notFound(res);
        }
        return httpOk(res, new ResponseModel(true, category, null, 'kategori başarıyla getirildi'));
    }catch(error){
        log.error(`kategori bulunurken hata oluştu - ID: ${req.params.id}`, { source: 'controller' });
        return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'kategori bulunurken hata oluştu'));
    }
}

async createCategory(req:Request,res:Response) {
    try {
        const category = await this.categoryService.createCategory(req.body);
        return httpOk(res, new ResponseModel(true, category, null, 'kategori başarıyla oluşturuldu'));
}catch(error){
    log.error(`kategori oluşturulurken hata oluştu - Veri: ${JSON.stringify(req.body)}`, { source: 'controller' });
    return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'kategori oluşturulurken hata oluştu'));
}
}

async updateCategory(req:Request,res:Response) {
    try {
        const category = await this.categoryService.updateCategory(req.params.id, req.body);
        if(!category){
            return notFound(res);
        }
        return httpOk(res, new ResponseModel(true, category, null, 'kategori başarıyla güncellendi'));
    }catch(error){
        log.error(`kategori güncellenirken hata oluştu - ID: ${req.params.id}`, { source: 'controller' });
        return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'kategori güncellenirken hata oluştu'));
    }
}

async deleteCategory(req:Request,res:Response) {
    try {
        const category = await this.categoryService.deleteCategoryById(req.params.id);
        if(!category){
            return notFound(res);
        }
        return httpOk(res, new ResponseModel(true, category, null, 'kategori başarıyla silindi'));
    }catch(error){
        log.error(`kategori silinirken hata oluştu - ID: ${req.params.id}`, { source: 'controller' });
        return internalServerError(res, new ResponseModel(false, null, 'INTERNAL_ERROR', 'kategori silinirken hata oluştu'));
    }
}

}