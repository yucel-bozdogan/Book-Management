import express from 'express';
import { CategoryController } from '../controllers/category';
import { processIdGeneration } from '../middlewares/processIdGeneration';
import { headerValidation } from '../middlewares/headerValidation';


const router = express.Router();
const categoryController = new CategoryController();

router.get('/', processIdGeneration, headerValidation, categoryController.getAllCategories.bind(categoryController));
router.post('/', processIdGeneration, headerValidation, categoryController.createCategory.bind(categoryController));
router.get('/:id', processIdGeneration, headerValidation, categoryController.getCategoryById.bind(categoryController));
router.put('/:id', processIdGeneration, headerValidation, categoryController.updateCategory.bind(categoryController));
router.delete('/:id', processIdGeneration, headerValidation, categoryController.deleteCategory.bind(categoryController));

export default router;