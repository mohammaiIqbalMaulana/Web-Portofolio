// src/app.ts - UPDATED WITH ROUTES
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Import routes
import { authRoutes } from './routes/auth.routes';
import { projectRoutes } from './routes/projects.routes';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests from this IP' }
});

app.use('/api', limiter);

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL?.split(',') || []
    // Dev only: reflect whatever origin made the request. This is what lets you
    // open the dev server from your phone at http://<your-computer-LAN-IP>:3000
    // (or any other device on the same network) without hardcoding an IP that
    // changes every time you reconnect to Wi-Fi.
    : true,
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files with CORS for images/files
app.use('/uploads', (req, res, next) => {
  // Set CORS headers for static assets
  // Dev only: reflect the requesting origin (same reasoning as the CORS
  // middleware above) so images load correctly when the site is opened
  // from a phone/tablet on the same Wi-Fi via the computer's LAN IP.
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL || '*')
    : (req.headers.origin || '*'));
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
}, express.static(path.join(__dirname, '..', 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic route untuk test
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    database: 'MySQL via Laragon',
    jwt: process.env.JWT_SECRET ? 'JWT Secret loaded' : 'JWT Secret missing'
  });
});

// API Routes - ADD THESE LINES
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// 404 handler untuk API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.originalUrl 
  });
});

// Global error handler
app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err);

  const status = (err as any)?.status || (err as any)?.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : (err as Error)?.message || 'Something went wrong';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: (err as Error)?.stack,
      timestamp: new Date().toISOString()
    })
  });
});

// IMPORTANT: Export default
export default app;