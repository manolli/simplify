import { Router } from 'express';
import { protect } from '../middleware/authJWT';
import {
  createBarber,
  listBarbers
} from '../controllers/barber.controller';

const router = Router();

router.post('/', protect, createBarber);    // POST /v1/barbers
router.get('/', protect, listBarbers);      // GET  /v1/barbers

export default router;
