import { Request } from 'express';
import { JWTPayload } from '../utils/jwt';

export interface AuthRequest extends Request {
  admin?: {
    id: number;
    username: string;
    displayName?: string | null;
  };
}
