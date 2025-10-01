# 🚀 Deployment Guide

[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?logo=railway&logoColor=white)](https://railway.app/)

Complete guide for deploying the Portfolio Web Application to various platforms including development, staging, and production environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Full-Stack Deployment](#full-stack-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Platform Deployments](#cloud-platform-deployments)
- [SSL Configuration](#ssl-configuration)
- [Monitoring Setup](#monitoring-setup)
- [Backup Strategy](#backup-strategy)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **MySQL**: v8.0 or higher (or compatible database)
- **Git**: Latest version
- **Docker**: Optional, for containerized deployment

### Required Accounts

- **Domain Registrar**: For custom domain
- **Cloud Provider**: AWS, DigitalOcean, Vercel, Railway, etc.
- **Database Provider**: PlanetScale, Railway, AWS RDS, etc.
- **Email Service**: EmailJS account for contact forms

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/web-portofolio.git
cd web-portofolio
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

### 3. Environment Setup

```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

### 4. Database Setup

```bash
# Start MySQL service (if using local MySQL)
# On Windows with XAMPP: Start MySQL from XAMPP Control Panel
# On macOS: brew services start mysql
# On Linux: sudo systemctl start mysql

# Create database
mysql -u root -p
CREATE DATABASE portfolio_db;
EXIT;

# Run migrations
cd backend
npm run db:push
npm run db:seed
```

### 5. Start Development Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

Visit `http://localhost:5173` for frontend and `http://localhost:3000` for API.

## Environment Configuration

### Backend Environment Variables

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/portfolio_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="secure-admin-password"

# EmailJS Configuration
EMAILJS_SERVICE_ID="your-emailjs-service-id"
EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
EMAILJS_PUBLIC_KEY="your-emailjs-public-key"

# Server Configuration
PORT=3000
NODE_ENV="development"

# File Upload
UPLOAD_DIR="uploads"
MAX_FILE_SIZE="52428800"  # 50MB

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### Frontend Environment Variables

```env
# API Configuration
VITE_API_BASE_URL="http://localhost:3000/api"

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID="your-emailjs-service-id"
VITE_EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
VITE_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
```

## Database Setup

### Local MySQL Setup

```bash
# Install MySQL (Ubuntu/Debian)
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation

# Create database and user
sudo mysql
CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Cloud Database Setup

#### PlanetScale

```bash
# Install PlanetScale CLI
npm install -g @planetscale/cli

# Login
pscale auth login

# Create database
pscale database create portfolio-db

# Get connection string
pscale database show portfolio-db
```

#### Railway

1. Create Railway project
2. Add MySQL database
3. Copy DATABASE_URL from Railway dashboard

## Frontend Deployment

### Vercel Deployment

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel --prod

# Set environment variables
vercel env add VITE_API_BASE_URL
vercel env add VITE_EMAILJS_SERVICE_ID
# ... add other variables
```

#### Option 2: GitHub Integration

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: npm run build
   - **Output Directory**: dist
4. Add environment variables in Vercel dashboard

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod --dir=dist

# Or connect to Git repository
netlify init
```

### Manual Static Hosting

```bash
# Build for production
cd frontend
npm run build

# Upload dist/ folder to your hosting provider
# Examples: GitHub Pages, Firebase Hosting, AWS S3 + CloudFront
```

## Backend Deployment

### Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up
```

### Render Deployment

1. Connect GitHub repository
2. Choose "Web Service"
3. Configure build settings:
   - **Runtime**: Node
   - **Build Command**: npm install && npm run build
   - **Start Command**: npm start
4. Add environment variables

### Heroku Deployment

```bash
# Create Heroku app
heroku create your-app-name

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main

# Set environment variables
heroku config:set DATABASE_URL="your-database-url"
heroku config:set JWT_SECRET="your-jwt-secret"
# ... other variables
```

## Full-Stack Deployment

### Railway (Recommended)

1. **Create Project**: `railway init`
2. **Add Services**:
   - Frontend (Static Site)
   - Backend (Node.js)
   - Database (MySQL)
3. **Configure Environment Variables**
4. **Deploy**: `railway up`

### Vercel + Railway

1. **Deploy Backend to Railway**
2. **Deploy Frontend to Vercel**
3. **Configure CORS** in backend for Vercel domain

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/portfolio_db
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=portfolio_db
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## Docker Deployment

### Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Build and Run

```bash
# Build images
docker build -t portfolio-frontend ./frontend
docker build -t portfolio-backend ./backend

# Run containers
docker run -d -p 80:80 portfolio-frontend
docker run -d -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  portfolio-backend
```

## Cloud Platform Deployments

### AWS Deployment

#### Frontend (S3 + CloudFront)

```bash
# Install AWS CLI
pip install awscli

# Configure AWS
aws configure

# Create S3 bucket
aws s3 mb s3://your-portfolio-bucket

# Upload built files
aws s3 sync dist/ s3://your-portfolio-bucket --delete

# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

#### Backend (EC2 + RDS)

```bash
# Launch EC2 instance
aws ec2 run-instances --image-id ami-12345678 --count 1 --instance-type t2.micro

# Create RDS MySQL instance
aws rds create-db-instance \
  --db-instance-identifier portfolio-db \
  --db-instance-class db.t2.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password password \
  --allocated-storage 20
```

### DigitalOcean App Platform

1. **Connect Repository**
2. **Configure Services**:
   - Frontend: Static Site
   - Backend: Node.js service
   - Database: Managed MySQL
3. **Set Environment Variables**
4. **Deploy**

## SSL Configuration

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### CloudFlare SSL

1. **Add Site** to CloudFlare
2. **Update Nameservers**
3. **Enable SSL/TLS** encryption
4. **Set SSL mode** to "Full (strict)"

## Monitoring Setup

### Application Monitoring

```typescript
// backend/src/utils/monitoring.ts
import * as Sentry from '@sentry/node';

export const initMonitoring = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
};
```

### Uptime Monitoring

- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring with alerts
- **New Relic**: Application performance monitoring

### Log Management

```typescript
// Winston logger configuration
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

## Backup Strategy

### Database Backup

```bash
# Manual backup
mysqldump -u username -p portfolio_db > backup.sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u username -p portfolio_db > backup_$DATE.sql

# Upload to cloud storage
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

### File Backup

```bash
# Backup uploaded files
tar -czf uploads_backup.tar.gz backend/uploads/

# Sync to cloud storage
aws s3 sync backend/uploads/ s3://your-backup-bucket/uploads/
```

### Automated Backups

```bash
# Crontab for daily backups
0 2 * * * /path/to/backup-script.sh

# Weekly cleanup (keep last 7 days)
0 3 * * 0 find /path/to/backups -name "backup_*.sql" -mtime +7 -delete
```

## Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Test database connection
mysql -h hostname -u username -p
# Enter password when prompted

# Check if MySQL is running
sudo systemctl status mysql

# Reset MySQL root password if needed
sudo systemctl stop mysql
sudo mysqld_safe --skip-grant-tables &
mysql -u root
UPDATE mysql.user SET authentication_string = PASSWORD('new_password') WHERE User = 'root';
FLUSH PRIVILEGES;
EXIT;
```

#### Build Failures

```bash
# Clear npm cache
npm cache clean --force

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
npm --version
```

#### Environment Variable Issues

```bash
# Check environment variables
printenv | grep VITE_
printenv | grep DATABASE_

# Validate .env file syntax
node -e "require('dotenv').config(); console.log('Env loaded successfully')"
```

#### CORS Issues

```typescript
// backend/src/app.ts
import cors from 'cors';

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com', 'https://www.yourdomain.com']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

#### File Upload Issues

```bash
# Check upload directory permissions
ls -la backend/uploads/

# Fix permissions
chmod 755 backend/uploads/
chmod 755 backend/uploads/projects/

# Check disk space
df -h
```

### Performance Issues

#### Frontend Optimization

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Enable gzip compression
# nginx.conf
gzip on;
gzip_types text/css application/javascript application/json;
```

#### Database Optimization

```sql
-- Check slow queries
SHOW PROCESSLIST;

-- Add indexes for performance
CREATE INDEX idx_project_featured ON Project(featured);
CREATE INDEX idx_project_created_at ON Project(createdAt DESC);

-- Query optimization
EXPLAIN SELECT * FROM projects WHERE featured = 1;
```

### Deployment Issues

#### Port Conflicts

```bash
# Check what's using ports
lsof -i :3000
lsof -i :5173

# Kill process
kill -9 <PID>
```

#### Memory Issues

```bash
# Check memory usage
free -h

# Monitor Node.js memory
node --max-old-space-size=4096 your-app.js

# PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name portfolio-api
pm2 monit
```

---

## Post-Deployment Checklist

- [ ] Domain configured and pointing to server
- [ ] SSL certificate installed and valid
- [ ] Environment variables set correctly
- [ ] Database connected and migrated
- [ ] File uploads working
- [ ] Admin login functional
- [ ] Contact form sending emails
- [ ] All pages loading correctly
- [ ] Mobile responsive design verified
- [ ] Performance optimized
- [ ] Monitoring and logging configured
- [ ] Backup strategy implemented

For additional support, check the troubleshooting section or create an issue in the repository.
