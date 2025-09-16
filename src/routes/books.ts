import express from 'express';
import { BooksController } from '../controllers/books';
import { processIdGeneration } from '../middlewares/processIdGeneration';
import { headerValidation } from '../middlewares/headerValidation';

const router = express.Router();
const booksController = new BooksController();
router.get('/',processIdGeneration,headerValidation, booksController.getAllBooks.bind(booksController));
router.post('/', processIdGeneration,headerValidation, booksController.createBook.bind(booksController));
router.delete('/:id', processIdGeneration,headerValidation, booksController.deleteBook.bind(booksController));
router.put('/:id', processIdGeneration,headerValidation, booksController.updateBook.bind(booksController));
router.get('/:id', processIdGeneration,headerValidation, booksController.getBookById.bind(booksController));
export default router;
    