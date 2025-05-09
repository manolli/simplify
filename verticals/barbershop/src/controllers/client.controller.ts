import Client from '../models/Client';
import { AuthRequest } from '../middleware/authJWT';
import { Response } from 'express';

export const createClient = async (req: AuthRequest, res: Response) => {
  const { name, phone, notes } = req.body;
  const doc = await Client.create({
    tenantId: req.user!.tenantId,
    name,
    phone,
    notes
  });
  res.status(201).json(doc);
};

export const listClients = async (req: AuthRequest, res: Response) => {
  const list = await Client.find({ tenantId: req.user!.tenantId });
  res.json(list);
};
