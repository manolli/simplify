import Appointment from '../models/Appointment';
import Service from '../models/Service';
import { AuthRequest } from '../middleware/authJWT';
import { Response } from 'express';
import { isSlotAvailable } from '../utils/checkAvailability';

export const createAppointment = async (req: AuthRequest, res: Response) => {
  const { serviceId, barberId, clientId, date } = req.body;
  const tenantId = req.user!.tenantId;
  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const slotFree = await isSlotAvailable(
    tenantId,
    barberId,
    new Date(date),
    service.durationMin
  );
  if (!slotFree)
    return res.status(409).json({ message: 'Time slot not available' });

  const appt = await Appointment.create({
    tenantId,
    serviceId,
    barberId,
    clientId,
    date,
    durationMin: service.durationMin
  });
  res.status(201).json(appt);
};

export const agendaByDay = async (req: AuthRequest, res: Response) => {
  const { date } = req.query;
  const start = new Date(date as string);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const list = await Appointment.find({
    tenantId: req.user!.tenantId,
    date: { $gte: start, $lt: end }
  })
    .populate('serviceId')
    .populate('clientId')
    .populate('barberId')
    .exec();

  res.json(list);
};
