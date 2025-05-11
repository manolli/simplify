import { Router } from 'express';
import { protect } from '../middleware/authJWT';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/client.controller';

const router = Router();

router.use(protect)

router.post('/', createClient)
router.get('/', getAllClients)
router.get('/:id', getClientById)
router.put('/:id', updateClient)
router.delete('/:id', deleteClient)

export default router;
