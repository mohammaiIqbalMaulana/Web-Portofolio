# 🚀 Portfolio Backend API

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

A robust REST API backend for the portfolio website, built with Node.js, Express, and TypeScript. Features secure authentication, file uploads, and comprehensive project management.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🔧 Development](#-development)
- [📚 API Documentation](#-api-documentation)
- [🗄️ Database Schema](#️-database-schema)
- [🔐 Authentication](#-authentication)
- [📤 File Upload](#-file-upload)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

## ✨ Features

- **🔒 Secure Authentication**: JWT-based admin authentication
- **📁 File Upload**: Support for images and documents
- **🌍 Multilingual Content**: Support for English and Indonesian
- **🗄️ Database Management**: Prisma ORM with MySQL
- **⚡ Rate Limiting**: Protection against abuse
- **🛡️ Security Headers**: Helmet.js integration
- **📝 Input Validation**: Zod schema validation
- **🔄 CORS Support**: Cross-origin resource sharing
- **📊 Project Management**: Full CRUD operations
- **🎯 Type Safety**: Full TypeScript coverage

## 🏗️ Architecture

```
backend/
├── src/
│   ├── controllers/       # Route handlers
│   │   ├── auth.controller.ts
│   │   └── projects.controller.ts
│   ├── routes/           # API route definitions
│   │   ├── auth.routes.ts
│   │   └── projects.routes.ts
│   ├── services/         # Business logic layer
│   │   ├── auth.service.ts
│   │   └── projects.service.ts
│   ├── middleware/       # Express middleware
│   │   └── auth.middleware.ts
│   ├── types/            # TypeScript type definitions
│   │   ├── auth.ts
│   │   └── projects.ts
│   ├── utils/            # Utility functions
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── validator.ts
│   ├── config/           # Configuration files
│   │   └── database.ts
│   ├── upload/           # Upload directories
│   ├── app.ts            # Express app setup
│   └── index.ts          # Server entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Database seeding
└── uploads/              # File upload storage
```

## 🛠️ Tech Stack

- **Runtime**: Node.js v18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Validation**: Zod
- **Security**: Helmet, CORS, express-rate-limit
- **Development**: tsx, nodemon
- **Environment**: dotenv

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation & Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your environment variables
# Edit .env file with your database credentials

# Push database schema
npm run db:push

# Seed initial data (optional)
npm run db:seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:3000`

## 📦 Installation

### Dependencies Installation
```bash
npm install
```

### Database Setup
```bash
# Push schema to database
npm run db:push

# Run migrations (if needed)
npm run db:migrate

# Open Prisma Studio for database management
npm run db:studio

# Reset database (development only)
npm run db:reset
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/portfolio_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="secure-admin-password"

# EmailJS (for contact form)
EMAILJS_SERVICE_ID="your-emailjs-service-id"
EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
EMAILJS_PUBLIC_KEY="your-emailjs-public-key"

# Server Configuration
PORT=3000
NODE_ENV="development"
```

### Database Configuration

The application uses MySQL as the database. Make sure to:

1. Create a MySQL database named `portfolio_db`
2. Update the `DATABASE_URL` in your `.env` file
3. Run `npm run db:push` to create tables

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start with tsx watch mode
npm run dev:nodemon      # Start with nodemon

# Production
npm run build            # Compile TypeScript to JavaScript
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes to database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database with initial data
npm run db:reset         # Reset database (development)
```

### Development Workflow

1. **Start Database**: Ensure MySQL is running
2. **Install Dependencies**: `npm install`
3. **Configure Environment**: Copy and edit `.env`
4. **Setup Database**: `npm run db:push`
5. **Start Development**: `npm run dev`
6. **Test API**: Use tools like Postman or curl

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All responses follow this structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Responses
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🔐 Authentication Endpoints

### POST /auth/login
Authenticate admin user and receive JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "username": "admin",
      "displayName": "Administrator"
    }
  }
}
```

### POST /auth/logout
Invalidate the current session (client-side token removal).

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me
Get current authenticated admin profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "displayName": "Administrator",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 📁 Projects Endpoints

### GET /projects
Get all projects with optional filtering.

**Query Parameters:**
- `featured` (boolean): Filter featured projects only
- `limit` (number): Limit results (default: 50)
- `offset` (number): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Project Title",
      "title_en": "Project Title EN",
      "description": "Project description",
      "description_en": "Project description EN",
      "tech": ["React", "Node.js", "MySQL"],
      "github_url": "https://github.com/...",
      "live_url": "https://example.com",
      "image_url": "/uploads/projects/project-1.jpg",
      "links": [
        {"type": "github", "url": "...", "label": "View Code"},
        {"type": "live", "url": "...", "label": "Live Demo"}
      ],
      "images": ["/uploads/projects/1/image1.jpg"],
      "files": [
        {"type": "zip", "path": "/uploads/projects/1/app.zip", "label": "Download APK"}
      ],
      "featured": true,
      "sortOrder": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /projects/:id
Get a specific project by ID.

**Response:** Same as above but single object in `data`

### POST /projects
Create a new project (Admin only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (string, required): Project title
- `title_en` (string, optional): English title
- `description` (string, optional): Project description
- `description_en` (string, optional): English description
- `tech` (string): JSON array of technologies `["React", "Node.js"]`
- `github_url` (string, optional): GitHub repository URL
- `live_url` (string, optional): Live demo URL
- `links` (string): JSON array of links
- `featured` (boolean): Whether project is featured
- `sortOrder` (number): Display order
- `images` (files): Multiple image files (max 10)
- `files` (files): Additional files (max 5, 50MB each)

### PUT /projects/:id
Update an existing project (Admin only).

**Same parameters as POST**

### DELETE /projects/:id
Delete a project (Admin only).

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## 🗄️ Database Schema

### Admin Model
```prisma
model Admin {
  id          Int      @id @default(autoincrement())
  username    String   @unique @db.VarChar(100)
  passwordHash String  @map("password_hash") @db.VarChar(255)
  displayName String?  @map("display_name") @db.VarChar(150)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  projects Project[] @relation("ProjectCreator")
}
```

### Project Model
```prisma
model Project {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  title_en    String?  @db.VarChar(255)
  description String?  @db.Text
  description_en String?  @db.Text
  tech        Json     // ["Node.js", "Express", "MySQL"]
  github_url  String?  @db.VarChar(500)
  live_url    String?  @db.VarChar(500)
  image_url   String?  @db.VarChar(500)
  links       Json     // [{"type":"github","url":"...","label":"View Code"}]
  images      Json?    // ["/uploads/project1-1.jpg"]
  files       Json?    // [{"type":"zip","path":"/uploads/projects/1/app.zip","label":"Download APK"}]
  featured    Boolean  @default(false)
  sortOrder   Int      @default(0) @map("sort_order")
  createdById Int?     @map("created_by")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  creator Admin? @relation("ProjectCreator", fields: [createdById], references: [id])
}
```

## 🔐 Authentication

### JWT Token Flow
1. Admin logs in via `/auth/login`
2. Server validates credentials and returns JWT token
3. Client stores token (localStorage/cookies)
4. Token included in `Authorization: Bearer <token>` header
5. Server validates token on protected routes

### Password Security
- Passwords hashed with bcryptjs (12 salt rounds)
- JWT tokens expire in 7 days
- Secure admin credentials required

## 📤 File Upload

### Configuration
- **Max File Size**: 50MB per file
- **Max Images**: 10 per project
- **Max Files**: 5 per project
- **Allowed Types**: Images (jpg, png, gif, webp), Documents (pdf, zip, etc.)

### Storage
Files are stored in `uploads/projects/` directory with unique filenames:
```
uploads/projects/
├── project-1-image-1704067200000-123456789.jpg
├── project-1-file-1704067200000-987654321.zip
└── ...
```

### Access
Uploaded files are served statically and accessible via:
```
/uploads/projects/filename.ext
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/auth.test.js
```

### Test Structure
```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── fixtures/       # Test data
└── utils/          # Test utilities
```

## 🚀 Deployment

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Setup
- Set `NODE_ENV=production`
- Use production database
- Configure proper JWT secrets
- Set up file storage (consider cloud storage for production)
- Configure reverse proxy (nginx/apache)

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Update documentation
7. Submit a pull request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Keep functions small and focused
- Add JSDoc comments for public APIs

---

For frontend documentation, see [Frontend README](../frontend/README-frontend.md)

For project overview, see [Root README](../README.md)
