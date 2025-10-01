# 🏗️ Architecture Guide

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

Comprehensive guide to the system architecture, design patterns, data flow, and technical decisions for the Portfolio Web Application.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Architecture Patterns](#architecture-patterns)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Design](#database-design)
- [Security Architecture](#security-architecture)
- [Data Flow](#data-flow)
- [Design Patterns](#design-patterns)
- [Performance Considerations](#performance-considerations)
- [Scalability](#scalability)
- [Deployment Architecture](#deployment-architecture)
- [Monitoring & Logging](#monitoring--logging)

## System Overview

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[React SPA]
    end

    subgraph "API Layer"
        C[Express.js API]
        D[Nginx Reverse Proxy]
    end

    subgraph "Data Layer"
        E[MySQL Database]
        F[File Storage]
    end

    subgraph "External Services"
        G[EmailJS]
        H[CDN]
    end

    A --> B
    B --> D
    D --> C
    C --> E
    C --> F
    C --> G
    C --> H

    style B fill:#e1f5fe
    style C fill:#f3e5f5
    style E fill:#e8f5e8
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript | User interface and interactions |
| **Build Tool** | Vite | Fast development and optimized builds |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **State Management** | React Context | Global state management |
| **Routing** | React Router | Client-side routing |
| **Backend** | Node.js + Express.js | REST API server |
| **Language** | TypeScript | Type-safe development |
| **Database** | MySQL | Relational data storage |
| **ORM** | Prisma | Database access and migrations |
| **Authentication** | JWT | Secure user authentication |
| **File Storage** | Local File System | Static file serving |
| **Email** | EmailJS | Contact form handling |

## Architecture Patterns

### Frontend Patterns

#### Component Architecture

```
src/components/
├── layout/          # Layout components (MainLayout, Header)
├── sections/        # Page sections (Hero, About, Projects)
├── ui/              # Reusable UI components (Button, Input)
├── admin/           # Admin-specific components
└── shared/          # Shared components
```

#### Custom Hooks Pattern

```typescript
// useProjects.ts - Data fetching hook
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, refetch: fetchProjects };
};
```

#### Context Pattern

```typescript
// ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Backend Patterns

#### MVC Pattern

```
src/
├── controllers/     # Request handlers (auth.controller.ts)
├── routes/          # Route definitions (auth.routes.ts)
├── services/        # Business logic (auth.service.ts)
├── middleware/      # Express middleware (auth.middleware.ts)
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

#### Service Layer Pattern

```typescript
// auth.service.ts
export class AuthService {
  async validateCredentials(username: string, password: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) return null;

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    return isValidPassword ? admin : null;
  }

  async generateToken(admin: Admin): Promise<string> {
    return jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }
}
```

#### Repository Pattern

```typescript
// project.repository.ts
export class ProjectRepository {
  async findAll(options: FindOptions = {}): Promise<Project[]> {
    return prisma.project.findMany({
      where: options.where,
      orderBy: options.orderBy,
      skip: options.skip,
      take: options.take,
      include: {
        creator: true
      }
    });
  }

  async findById(id: number): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { id },
      include: {
        creator: true
      }
    });
  }

  async create(data: CreateProjectData): Promise<Project> {
    return prisma.project.create({
      data,
      include: {
        creator: true
      }
    });
  }
}
```

## Frontend Architecture

### Component Hierarchy

```mermaid
graph TD
    A[App] --> B[SinglePageApp]
    B --> C[ThemeProvider]
    B --> D[AnimationProvider]
    C --> E[MainLayout]
    E --> F[HeaderSection]
    E --> G[HeroSection]
    E --> H[AboutSection]
    E --> I[SkillsSection]
    E --> J[ProjectsSection]
    E --> K[ContactSection]
    E --> L[FooterSection]
```

### State Management

#### Local State (useState)

```typescript
const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  message: ''
});
```

#### Global State (Context)

```typescript
// For theme management
const { theme, toggleTheme } = useContext(ThemeContext);

// For animation preferences
const { animationsEnabled, toggleAnimations } = useContext(AnimationContext);
```

#### Server State (Custom Hooks)

```typescript
const { projects, loading, error, refetch } = useProjects();
const { sendMessage, isSubmitting } = useContactForm();
```

### Routing Architecture

```typescript
// App.tsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SinglePageApp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

## Backend Architecture

### Layered Architecture

```mermaid
graph TD
    A[Routes] --> B[Middleware]
    B --> C[Controllers]
    C --> D[Services]
    D --> E[Repositories]
    E --> F[Database]
    D --> G[External APIs]
```

### Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Router
    participant Middleware
    participant Controller
    participant Service
    participant Repository
    participant Database

    Client->>Router: HTTP Request
    Router->>Middleware: Auth Check
    Middleware->>Controller: Validated Request
    Controller->>Service: Business Logic
    Service->>Repository: Data Access
    Repository->>Database: SQL Query
    Database-->>Repository: Result
    Repository-->>Service: Data
    Service-->>Controller: Processed Data
    Controller-->>Client: HTTP Response
```

### Error Handling

```typescript
// Global error handler
app.use((error: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  console.error(error);

  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
        details: error.details
      }
    });
  }

  if (error instanceof AuthenticationError) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    });
  }

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error'
    }
  });
});
```

## Database Design

### Schema Design

```mermaid
erDiagram
    Admin ||--o{ Project : creates
    Admin {
        int id PK
        varchar username UK
        varchar passwordHash
        varchar displayName
        datetime createdAt
        datetime updatedAt
    }
    Project {
        int id PK
        varchar title
        varchar title_en
        text description
        text description_en
        json tech
        varchar github_url
        varchar live_url
        varchar image_url
        json links
        json images
        json files
        boolean featured
        int sortOrder
        int createdById FK
        datetime createdAt
        datetime updatedAt
    }
```

### Indexing Strategy

```sql
-- Primary keys (auto-indexed)
-- Foreign keys (auto-indexed)

-- Additional indexes for performance
CREATE INDEX idx_project_featured ON Project(featured);
CREATE INDEX idx_project_sort_order ON Project(sortOrder);
CREATE INDEX idx_project_created_at ON Project(createdAt DESC);
CREATE INDEX idx_admin_username ON Admin(username);
```

### Data Relationships

- **One-to-Many**: Admin → Projects (one admin can create many projects)
- **Optional Foreign Key**: Projects.creator (projects can exist without creator)

## Security Architecture

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API
    participant Database

    User->>Client: Login Request
    Client->>API: POST /auth/login
    API->>Database: Validate Credentials
    Database-->>API: User Data
    API->>API: Generate JWT
    API-->>Client: JWT Token
    Client->>Client: Store Token
    Client->>API: Protected Request + Token
    API->>API: Verify JWT
    API-->>Client: Protected Data
```

### Security Layers

#### 1. Network Security
- HTTPS enforcement
- CORS configuration
- Rate limiting (100 req/hour for unauth, 1000 req/hour for auth)

#### 2. Application Security
- Input validation (Zod schemas)
- SQL injection prevention (Prisma ORM)
- XSS protection (Helmet.js)
- CSRF protection (if needed)

#### 3. Data Security
- Password hashing (bcrypt, 12 rounds)
- JWT token encryption
- Sensitive data encryption
- File upload validation

### Password Security

```typescript
// Password hashing
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Password verification
const isValid = await bcrypt.compare(password, hashedPassword);
```

### JWT Security

```typescript
// Token generation
const token = jwt.sign(
  {
    id: admin.id,
    username: admin.username,
    type: 'admin'
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: '7d',
    issuer: 'portfolio-api',
    audience: 'portfolio-client'
  }
);
```

## Data Flow

### Project Creation Flow

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant API
    participant FileSystem
    participant Database

    Admin->>Frontend: Submit Project Form
    Frontend->>API: POST /projects (multipart)
    API->>API: Validate Input
    API->>FileSystem: Store Images/Files
    API->>Database: Create Project Record
    Database-->>API: Project ID
    API->>API: Generate Response
    API-->>Frontend: Success Response
    Frontend->>Admin: Show Success Message
```

### Contact Form Flow

```mermaid
sequenceDiagram
    participant Visitor
    participant Frontend
    participant EmailJS
    participant Admin

    Visitor->>Frontend: Fill Contact Form
    Frontend->>EmailJS: Send Email
    EmailJS-->>Frontend: Success Response
    Frontend->>Visitor: Show Success Message
    EmailJS->>Admin: Send Email Notification
```

## Design Patterns

### Singleton Pattern

```typescript
// Database connection
class Database {
  private static instance: Database;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

### Factory Pattern

```typescript
// Service factory
class ServiceFactory {
  static createAuthService(): AuthService {
    return new AuthService();
  }

  static createProjectService(): ProjectService {
    return new ProjectService();
  }
}
```

### Strategy Pattern

```typescript
// File upload strategies
interface UploadStrategy {
  upload(file: Express.Multer.File): Promise<string>;
}

class LocalUploadStrategy implements UploadStrategy {
  async upload(file: Express.Multer.File): Promise<string> {
    // Local file system upload
  }
}

class CloudUploadStrategy implements UploadStrategy {
  async upload(file: Express.Multer.File): Promise<string> {
    // Cloud storage upload
  }
}
```

### Observer Pattern

```typescript
// Event system
class EventEmitter {
  private events: Map<string, Function[]> = new Map();

  on(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  emit(event: string, data: any) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}
```

## Performance Considerations

### Frontend Performance

#### Code Splitting

```typescript
// Lazy loading components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Route-based code splitting
const routes = [
  {
    path: '/admin',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminRoutes />
      </Suspense>
    )
  }
];
```

#### Image Optimization

```typescript
// Responsive images
<img
  srcSet={`${smallImage} 480w, ${mediumImage} 768w, ${largeImage} 1200w`}
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  src={largeImage}
  alt="Project screenshot"
/>
```

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### Backend Performance

#### Database Optimization

```sql
-- Query optimization
EXPLAIN SELECT * FROM projects WHERE featured = 1 ORDER BY sortOrder;

-- Connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
```

#### Caching Strategy

```typescript
// In-memory cache for frequently accessed data
const cache = new Map<string, any>();

const getCachedProjects = async () => {
  const cacheKey = 'featured-projects';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
    return cached.data;
  }

  const projects = await projectService.getFeatured();
  cache.set(cacheKey, { data: projects, timestamp: Date.now() });
  return projects;
};
```

## Scalability

### Horizontal Scaling

```mermaid
graph TD
    subgraph "Load Balancer"
        LB[Nginx Load Balancer]
    end

    subgraph "Application Servers"
        A1[App Server 1]
        A2[App Server 2]
        A3[App Server 3]
    end

    subgraph "Database Cluster"
        DB1[Primary DB]
        DB2[Replica DB 1]
        DB3[Replica DB 2]
    end

    subgraph "File Storage"
        FS[Cloud Storage S3]
    end

    LB --> A1
    LB --> A2
    LB --> A3

    A1 --> DB1
    A2 --> DB1
    A3 --> DB1

    DB1 --> DB2
    DB1 --> DB3

    A1 --> FS
    A2 --> FS
    A3 --> FS
```

### Database Scaling

- **Read Replicas**: Distribute read operations
- **Sharding**: Split data across multiple databases
- **Caching Layer**: Redis for session and data caching

### CDN Integration

```typescript
// CDN configuration for static assets
const cdnUrl = process.env.CDN_URL || '';

const getAssetUrl = (path: string) => {
  return cdnUrl ? `${cdnUrl}${path}` : path;
};
```

## Deployment Architecture

### Development Environment

```mermaid
graph TD
    subgraph "Local Development"
        Dev[Developer Machine]
        Vite[Vite Dev Server :5173]
        Express[Express API :3000]
        MySQL[(MySQL :3306)]
    end

    Dev --> Vite
    Dev --> Express
    Express --> MySQL
```

### Production Environment

```mermaid
graph TD
    subgraph "Production"
        Cloud[Cloud Provider]
        LB[Load Balancer]
        App[App Servers]
        DB[(Managed Database)]
        CDN[CDN]
        Storage[Object Storage]
    end

    Cloud --> LB
    LB --> App
    App --> DB
    App --> Storage
    CDN --> Storage
```

### Docker Configuration

```dockerfile
# Multi-stage Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

## Monitoring & Logging

### Application Logging

```typescript
// Structured logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('User logged in', { userId: 123, ip: '192.168.1.1' });
logger.error('Database connection failed', { error: err.message });
```

### Performance Monitoring

```typescript
// Response time middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent')
    });
  });
  next();
});
```

### Health Checks

```typescript
// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    // Check file system access
    await fs.access(process.env.UPLOAD_DIR!);

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        filesystem: 'up'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});
```

### Error Tracking

```typescript
// Global error handler with Sentry
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

---

This architecture guide provides a comprehensive overview of the system's design and technical decisions. For implementation details, refer to the specific component documentation and API reference.
