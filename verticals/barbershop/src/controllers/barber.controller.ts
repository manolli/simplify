import { Request, Response } from 'express';
import Barber from '../models/Barber';
import { AuthRequest } from '../middleware/authJWT';

export const createBarber = async (req: AuthRequest, res: Response) => {
  const { name, schedule } = req.body;
  const doc = await Barber.create({
    tenantId: req.user!.tenantId,
    name,
    schedule
  });
  res.status(201).json(doc);
};

export const listBarbers = async (req: AuthRequest, res: Response) => {
  const list = await Barber.find({ tenantId: req.user!.tenantId });
  res.json(list);
};
