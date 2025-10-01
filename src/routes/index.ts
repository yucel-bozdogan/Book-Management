import express from 'express';
import booksRouter from './books';
import authorsRouter from './authors';
const router = express.Router();



router.use('/books', booksRouter);
router.use('/authors', authorsRouter);

export default router;
