// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authJWT';
import Tenant from '../models/Tenant';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '12h' });

export const signup = async (req: Request, res: Response) => {
  const { tenantName, verticalId = 'BARBERSHOP', email, password } = req.body;
  if (!tenantName || !email || !password)
    return res.status(400).json({ message: 'Missing fields' });

  const tenant = await Tenant.create({ name: tenantName, verticalId });
  const user = await User.create({ tenantId: tenant._id, email, password });

  const token = signToken({
    id: user._id,
    tenantId: tenant._id,
    role: user.role
  });
  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid creds' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid creds' });

  const token = signToken({
    id: user._id,
    tenantId: user.tenantId,
    role: user.role
  });
  res.json({ token });
};

export const profile = (req: AuthRequest, res: Response) => {
    res.json(req.user);  // agora o TS reconhece
  };
