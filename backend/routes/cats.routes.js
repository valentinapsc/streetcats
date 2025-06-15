import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat
} from '../controllers/cats.controller.js';
import authMiddleware from '../middleware/auth.js';

// Setup multer storage
const uploadsDir = path.join(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}-${file.originalname}`);
  }
});
const upload = multer({ storage });

const router = Router();

// GET    /api/cats
router.get('/', getAllCats);
// GET    /api/cats/:id
router.get('/:id', getCatById);
// POST   /api/cats    (protetto)
router.post('/', authMiddleware, upload.single('image'), createCat);
// PUT    /api/cats/:id (protetto)
router.put('/:id', authMiddleware, upload.single('image'), updateCat);
// DELETE /api/cats/:id (protetto)
router.delete('/:id', authMiddleware, deleteCat);

export default router;