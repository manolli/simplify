import { Request, Response } from 'express'
import { AuthRequest } from '../middleware/authJWT'
import Appointment from '../models/Appointment'
import Client from '../models/Client'
import Service from '../models/Service'

export const getDashboardSummary = async (req: AuthRequest, res: Response) => {
  try {
    const tenantId = req.user!.tenantId

    const [appointments, clients, services] = await Promise.all([
      Appointment.countDocuments({ tenantId }),
      Client.countDocuments({ tenantId }),
      Service.countDocuments({ tenantId })
    ])

    const revenueToday = await Appointment.aggregate([
      {
        $match: {
          tenantId,
          date: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lte: new Date()
          }
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service'
        }
      },
      { $unwind: '$service' },
      {
        $group: {
          _id: null,
          total: { $sum: '$service.price' }
        }
      }
    ])

    res.json({
      appointments,
      clients,
      services,
      revenue: `R$ ${revenueToday[0]?.total?.toFixed(2) || '0,00'}`
    })
  } catch (err) {
    console.error('Erro no dashboard:', err)
    res.status(500).json({ error: 'Erro ao carregar resumo do dashboard' })
  }
}
