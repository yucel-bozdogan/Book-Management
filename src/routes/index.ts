import express from 'express';
import booksRouter from './books';
import { processIdGeneration } from '../middlewares/processIdGeneration';
const router = express.Router();

router.use(processIdGeneration); //processIdGeneration middleware'i tüm route'lara uygulanır

router.use('/books', booksRouter);


export default router;
