import express from 'express';
import { BooksController } from '../controllers/books';


const router = express.Router();
const booksController = new BooksController();
router.get('/', booksController.getAllBooks);
router.post('/',booksController.createBook);
router.delete('/:id',booksController.deleteBook);
router.put('/:id',booksController.updateBook);
router.get('/:id',booksController.getBookById);
export default router;
    