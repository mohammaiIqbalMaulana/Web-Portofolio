# 📡 API Reference

[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white)](https://www.prisma.io/)

Complete API documentation for the Portfolio Web Application backend. This document provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Test Endpoint](#test-endpoint)
  - [Authentication](#authentication-1)
  - [Projects](#projects)

## Base URL

```
Development: http://localhost:3000
```

All API endpoints are prefixed with `/api`.

## Authentication

The API uses JWT (JSON Web Token) based authentication for protected endpoints.

### Authentication Headers

```http
Authorization: Bearer <jwt_token>
```

### Token Expiration

- **Access Token**: 7 days
- **Refresh Token**: 30 days

### Authentication Flow

1. **Login** with credentials to receive tokens
2. **Include token** in `Authorization` header for protected requests
3. **Logout** to invalidate tokens

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional success message",
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "requestId": "req-123456"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "requestId": "req-123456"
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [
    // Array of items
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "requestId": "req-123456"
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

## Authentication Endpoints

### POST /auth/login

Authenticate admin user and receive JWT token.

#### Request

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "secure-password"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Admin username |
| `password` | string | Yes | Admin password |

#### Response (Success)

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "username": "admin",
      "displayName": "Administrator",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "expiresIn": 604800
  },
  "message": "Login successful"
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
}
```

#### cURL Example

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secure-password"}'
```

### POST /auth/logout

Invalidate the current session.

#### Request

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me

Get current authenticated admin profile.

#### Request

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "displayName": "Administrator",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /auth/refresh

Refresh access token (if refresh tokens are implemented).

#### Request

```http
POST /api/auth/refresh
Authorization: Bearer <refresh-token>
```

## Projects Endpoints

### GET /projects

Get all projects with optional filtering and pagination.

#### Request

```http
GET /api/projects?featured=true&limit=10&page=1&sort=createdAt&order=desc
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `featured` | boolean | - | Filter featured projects only |
| `limit` | number | 50 | Number of items per page |
| `page` | number | 1 | Page number |
| `sort` | string | createdAt | Sort field |
| `order` | string | desc | Sort order (asc/desc) |
| `search` | string | - | Search in title and description |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "title_en": "E-Commerce Platform",
      "description": "A full-stack e-commerce solution...",
      "description_en": "A full-stack e-commerce solution...",
      "tech": ["React", "Node.js", "MySQL", "Stripe"],
      "github_url": "https://github.com/username/project",
      "live_url": "https://project-demo.com",
      "image_url": "/uploads/projects/project-1.jpg",
      "links": [
        {
          "type": "github",
          "url": "https://github.com/username/project",
          "label": "View Source"
        },
        {
          "type": "live",
          "url": "https://project-demo.com",
          "label": "Live Demo"
        }
      ],
      "images": [
        "/uploads/projects/1/image1.jpg",
        "/uploads/projects/1/image2.jpg"
      ],
      "files": [
        {
          "type": "pdf",
          "path": "/uploads/projects/1/documentation.pdf",
          "label": "Technical Documentation"
        }
      ],
      "featured": true,
      "sortOrder": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "creator": {
        "id": 1,
        "username": "admin",
        "displayName": "Administrator"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /projects/:id

Get a specific project by ID.

#### Request

```http
GET /api/projects/1
```

#### Response

Same as individual project object in the array above.

### POST /projects

Create a new project (Admin only).

#### Request

```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: multipart/form-data

# Form data fields:
title=E-Commerce Platform
description=A full-stack e-commerce solution...
tech=["React","Node.js","MySQL"]
featured=true
sortOrder=1
images=<file1.jpg>
files=<documentation.pdf>
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Project title |
| `title_en` | string | No | English title |
| `description` | string | No | Project description |
| `description_en` | string | No | English description |
| `tech` | JSON string | Yes | Array of technologies |
| `github_url` | string | No | GitHub repository URL |
| `live_url` | string | No | Live demo URL |
| `links` | JSON string | No | Additional links |
| `featured` | boolean | No | Featured project flag |
| `sortOrder` | number | No | Display order |
| `images` | files | No | Project images (max 10) |
| `files` | files | No | Additional files (max 5) |

#### Response

```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "E-Commerce Platform",
    // ... other project fields
  },
  "message": "Project created successfully"
}
```

### PUT /projects/:id

Update an existing project (Admin only).

#### Request

```http
PUT /api/projects/1
Authorization: Bearer <token>
Content-Type: multipart/form-data

# Same parameters as POST
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Project Title",
    // ... updated project fields
  },
  "message": "Project updated successfully"
}
```

### DELETE /projects/:id

Delete a project (Admin only).

#### Request

```http
DELETE /api/projects/1
Authorization: Bearer <token>
```

#### Response

```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## Data Types

### Project Object

```typescript
interface Project {
  id: number;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  tech: string[]; // JSON array
  github_url?: string;
  live_url?: string;
  image_url?: string;
  links?: ProjectLink[]; // JSON array
  images?: string[]; // JSON array of paths
  files?: ProjectFile[]; // JSON array
  featured: boolean;
  sortOrder: number;
  createdById?: number;
  createdAt: Date;
  updatedAt: Date;
  creator?: Admin;
}
```

### ProjectLink Object

```typescript
interface ProjectLink {
  type: 'github' | 'live' | 'demo' | 'docs';
  url: string;
  label: string;
}
```

### ProjectFile Object

```typescript
interface ProjectFile {
  type: string; // 'pdf', 'zip', 'docx', etc.
  path: string; // File path
  label: string; // Display label
}
```

### Admin Object

```typescript
interface Admin {
  id: number;
  username: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Error Object

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

## Rate Limiting

API endpoints are protected by rate limiting:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **Login attempts**: 5 attempts per 15 minutes

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

## File Upload

### Supported Formats

#### Images
- **Formats**: JPG, PNG, GIF, WebP
- **Max size**: 5MB per file
- **Max count**: 10 per project

#### Documents
- **Formats**: PDF, DOCX, ZIP, TXT
- **Max size**: 50MB per file
- **Max count**: 5 per project

### Upload Process

1. **Client**: Send multipart/form-data request
2. **Server**: Validate file types and sizes
3. **Server**: Generate unique filename
4. **Server**: Store file in uploads directory
5. **Server**: Return file path in response

### File Access

Uploaded files are served statically:

```
GET /uploads/projects/filename.ext
```

## Webhooks

### Project Created Webhook

Triggered when a new project is created.

```json
{
  "event": "project.created",
  "data": {
    "project": {
      "id": 1,
      "title": "New Project",
      // ... full project object
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Project Updated Webhook

Triggered when a project is updated.

```json
{
  "event": "project.updated",
  "data": {
    "project": {
      "id": 1,
      "title": "Updated Project",
      // ... full project object
    },
    "changes": {
      "title": {
        "from": "Old Title",
        "to": "New Title"
      }
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## SDK & Libraries

### JavaScript/TypeScript SDK

```javascript
import { PortfolioAPI } from 'portfolio-api-sdk';

const api = new PortfolioAPI({
  baseURL: 'https://api.yourportfolio.com',
  apiKey: 'your-api-key'
});

// Get all projects
const projects = await api.projects.getAll({
  featured: true,
  limit: 10
});

// Create a project
const newProject = await api.projects.create({
  title: 'My Project',
  tech: ['React', 'Node.js'],
  featured: true
});
```

### cURL Examples

#### Get Projects
```bash
curl -X GET "http://localhost:3000/api/projects?featured=true&limit=5" \
  -H "Accept: application/json"
```

#### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Project",
    "description": "A sample project",
    "tech": ["React", "TypeScript"],
    "featured": true
  }'
```

#### Upload Files
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=File Upload Project" \
  -F "tech=[\"React\"]" \
  -F "images=@screenshot1.jpg" \
  -F "images=@screenshot2.png" \
  -F "files=@documentation.pdf"
```

---

## Version History

- **v1.0.0**: Initial API release
  - Basic CRUD operations for projects
  - JWT authentication
  - File upload support
  - Rate limiting

For more information, see the [Backend README](../backend/README-backend.md) or contact the development team.
