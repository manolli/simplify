import { Request, Response } from 'express';
import Service from '../models/Service';
import { AuthRequest } from '../middleware/authJWT';

export const createService = async (req: AuthRequest, res: Response) => {
  const { name, durationMin, price } = req.body;
  const svc = await Service.create({
    tenantId: req.user!.tenantId,
    name,
    durationMin,
    price
  });
  res.status(201).json(svc);
};

export const listServices = async (req: AuthRequest, res: Response) => {
  const list = await Service.find({ tenantId: req.user!.tenantId });
  res.json(list);
};
