import { Router } from 'express';
import { protect } from '../middleware/authJWT';
import {
  createService,
  listServices
} from '../controllers/service.controller';

const router = Router();

router.post('/', protect, createService);   // POST /v1/services
router.get('/', protect, listServices);     // GET  /v1/services

export default router;
