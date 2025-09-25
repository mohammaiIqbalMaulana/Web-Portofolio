import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';
import { prisma } from '../config/database';
import { AuthRequest } from '../types/auth';
import { JWTPayload } from '../utils/jwt';

export const authenticateAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = verifyJWT(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, displayName: true }
    });

    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error: unknown) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
