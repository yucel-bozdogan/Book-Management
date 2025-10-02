import express from 'express';
import booksRouter from './books';
import authorsRouter from './authors';
import categoryRouter from './category';
const router = express.Router();



router.use('/books', booksRouter);
router.use('/authors', authorsRouter);
router.use('/categories', categoryRouter);

export default router;
