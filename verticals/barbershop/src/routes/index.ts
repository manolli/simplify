import { Router } from 'express';
import serviceRoutes from './service.routes';
import barberRoutes from './barber.routes';
import clientRoutes from './client.routes';
import appointmentRoutes from './appointment.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

// Prefixos REST
router.use('/services', serviceRoutes);
router.use('/barbers', barberRoutes);
router.use('/clients', clientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/dashboard', dashboardRoutes)

// endpoint de health pública
router.get('/health', (_, res) => res.json({ ok: true }));

export default router;
