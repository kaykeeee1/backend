import { Router } from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService
} from '../controllers/service.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware); // 🔥 AQUI ESTÁ O SEGREDO

router.get('/', getServices);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
