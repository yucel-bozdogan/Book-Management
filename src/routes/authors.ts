import express from 'express';
import { AuthorsController } from '../controllers/authors';
import { processIdGeneration } from '../middlewares/processIdGeneration';
import { headerValidation } from '../middlewares/headerValidation';

const router = express.Router();
const authorsController = new AuthorsController();

router.get('/', processIdGeneration, headerValidation, authorsController.getAllAuthors.bind(authorsController));
router.post('/', processIdGeneration, headerValidation, authorsController.createAuthor.bind(authorsController));
router.delete('/:id', processIdGeneration, headerValidation, authorsController.deleteAuthor.bind(authorsController));
router.put('/:id', processIdGeneration, headerValidation, authorsController.updateAuthor.bind(authorsController));
router.get('/:id', processIdGeneration, headerValidation, authorsController.getAuthorById.bind(authorsController));

export default router;