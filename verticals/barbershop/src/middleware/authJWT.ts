// src/middleware/authJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
  id: string;
  tenantId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token' });

  try {
    req.user = jwt.verify(
      header.split(' ')[1],
      process.env.JWT_SECRET as string
    ) as AuthPayload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
