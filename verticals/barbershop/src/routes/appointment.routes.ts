import { Router } from 'express';
import { protect } from '../middleware/authJWT';
import {
  createAppointment,
  agendaByDay
} from '../controllers/appointment.controller';

const router = Router();

router.post('/', protect, createAppointment);        // POST /v1/appointments
router.get('/', protect, agendaByDay);               // GET  /v1/appointments?date=YYYY‑MM‑DD

export default router;
