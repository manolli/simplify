// src/routes/auth.routes.ts
import { Router } from 'express';
import { signup, login, profile } from '../controllers/auth.controller';
import { protect, AuthRequest } from '../middleware/authJWT';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, (req: AuthRequest, res) => profile(req, res));
router.get('/health', (_, res) => res.json({ ok: true }));

export default router;
