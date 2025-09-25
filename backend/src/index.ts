// src/index.ts - FIXED VERSION
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

// Import app AFTER env is loaded
import app from './app';
import { prisma } from './config/database'; // Import prisma from our config

// Environment validation
const requiredEnvVars = ['JWT_SECRET', 'NODE_ENV', 'PORT', 'DATABASE_URL'];
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('💡 Make sure you have .env file with all required variables');
  process.exit(1);
}

const PORT = parseInt(process.env.PORT!) || 4000;

async function startServer() {
  try {
    console.log('🚀 Starting Portfolio Backend Server...');
    console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔑 JWT Secret: ${process.env.JWT_SECRET ? 'Loaded ✅' : 'Missing ❌'}`);
    
    // Test database connection
    console.log('🔌 Connecting to database...');
    await prisma.$connect();
    
    const adminCount = await prisma.admin.count();
    const projectCount = await prisma.project.count();
    
    console.log('✅ Database connected successfully');
    console.log(`📊 Found ${adminCount} admin(s) and ${projectCount} project(s) in database`);

    // Start server
    const server = app.listen(PORT, () => {
      console.log('\n🎉 ====================================');
      console.log(`   Portfolio Backend Server Started`);
      console.log('🎉 ====================================');
      console.log(`📍 Server URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🧪 Test Endpoint: http://localhost:${PORT}/api/test`);
      console.log(`📊 Projects API: http://localhost:${PORT}/api/projects`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/login`);
      console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
      console.log('====================================\n');
      console.log('💡 Ready for API testing!');
      console.log('🔐 Login: username=admin, password=admin123');
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
      
      server.close(async () => {
        console.log('🔌 HTTP server closed');
        try {
          await prisma.$disconnect();
          console.log('🗄️ Database disconnected');
          console.log('✅ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.log('⚠️  Force closing...');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught errors
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        console.error('🔥 Database connection failed. Make sure MySQL is running in Laragon!');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('🔥 Database "portfolio_db" does not exist. Create it first!');
      }
    }
    
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('❌ Error disconnecting from database:', disconnectError);
    }
    
    process.exit(1);
  }
}

// Start the server
startServer();