import { Router } from 'express'
import { protect } from '../middleware/authJWT'
import { getDashboardSummary } from '../controllers/dashboard.controller'

const router = Router()

router.get('/summary', protect, getDashboardSummary)

export default router
