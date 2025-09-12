import express from 'express';
import { BooksController } from '../controllers/books';


const router = express.Router();
const booksController = new BooksController();
router.get('/', booksController.getAllBooks.bind(booksController));
router.post('/', booksController.createBook.bind(booksController));
router.delete('/:id', booksController.deleteBook.bind(booksController));
router.put('/:id', booksController.updateBook.bind(booksController));
router.get('/:id', booksController.getBookById.bind(booksController));
export default router;
    