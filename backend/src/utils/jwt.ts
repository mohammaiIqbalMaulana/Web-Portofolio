import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const secret: string = JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  id: number;
  username: string;
}

export const generateJWT = (payload: JWTPayload): string => {
  return (sign as any)(payload, secret, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyJWT = (token: string): JWTPayload | null => {
  try {
    return verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
};

export const getJWTCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/'
});