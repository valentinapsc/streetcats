// Questo file definisce le rotte per gestire i commenti sui gatti, inclusa la visualizzazione e la creazione di commenti.

import { Router } from 'express';
import { list, create } from '../controllers/comments.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = Router({ mergeParams: true });
router.get('/', list);
router.post('/', authMiddleware, create);

export default router;