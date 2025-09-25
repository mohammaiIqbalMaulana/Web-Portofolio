// src/routes/projects.routes.ts
import { Router } from 'express';
import { projectController } from '../controllers/projects.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);

// Admin routes (protected)
router.post('/', authenticateAdmin, projectController.create);
router.put('/:id', authenticateAdmin, projectController.update);
router.delete('/:id', authenticateAdmin, projectController.delete);

export { router as projectRoutes };