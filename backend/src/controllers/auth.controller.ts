// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { loginSchema } from '../utils/validator';
import { getJWTCookieOptions } from '../utils/jwt';

interface AuthRequest extends Request {
  admin?: { id: number; username: string; displayName?: string };
}

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validation.error.errors 
        });
      }

      const result = await authService.login(validation.data);
      
      if (!result.success) {
        return res.status(401).json({ error: result.error });
      }

      res.cookie('auth_token', result.token, getJWTCookieOptions());

      res.json({
        success: true,
        admin: result.admin,
        token: result.token,
        message: 'Login successful'
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  logout: async (req: Request, res: Response) => {
    res.clearCookie('auth_token');
    res.json({ success: true, message: 'Logged out successfully' });
  },

  getProfile: async (req: AuthRequest, res: Response) => {
    res.json({ admin: req.admin });
  }
};