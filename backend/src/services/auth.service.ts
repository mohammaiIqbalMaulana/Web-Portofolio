// src/services/auth.service.ts
import { prisma } from '../config/database';
import { comparePassword } from '../utils/password';
import { generateJWT } from '../utils/jwt';

type LoginCredentials = {
  username: string;
  password: string;
};

export const authService = {
  login: async ({ username, password }: LoginCredentials) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { username: username.toLowerCase() },
        select: {
          id: true,
          username: true,
          displayName: true,
          passwordHash: true
        }
      });

      if (!admin) {
        return { success: false, error: 'Invalid credentials' };
      }

      const isValidPassword = await comparePassword(password, admin.passwordHash);
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' };
      }

      const token = generateJWT({
        id: admin.id,
        username: admin.username
      });

      return {
        success: true,
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          displayName: admin.displayName
        }
      };
    } catch (error) {
      console.error('Auth service error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }
};