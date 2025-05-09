import { Router } from 'express';
import { protect } from '../middleware/authJWT';
import {
  createClient,
  listClients
} from '../controllers/client.controller';

const router = Router();

router.post('/', protect, createClient);    // POST /v1/clients
router.get('/', protect, listClients);      // GET  /v1/clients

export default router;
