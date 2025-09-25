// src/routes/projects.routes.ts
import { Router } from 'express';
import multer from 'multer';
import { projectController } from '../controllers/projects.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/projects/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Public routes
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);

// Admin routes (protected) - with file upload support
router.post('/', authenticateAdmin, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'files', maxCount: 5 }
]), projectController.create);

router.put('/:id', authenticateAdmin, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'files', maxCount: 5 }
]), projectController.update);

router.delete('/:id', authenticateAdmin, projectController.delete);

export { router as projectRoutes };
