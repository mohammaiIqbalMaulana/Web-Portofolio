# 🌟 Web Portfolio - Mohammad Iqbal Maulana

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

A modern, responsive web portfolio showcasing projects, skills, and professional experience. Built with React frontend and Node.js backend, featuring multilingual support, dark mode, and admin panel for content management.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🔧 Development](#-development)
- [📚 API Documentation](#-api-documentation)
- [🎨 Frontend Features](#-frontend-features)
- [🔐 Admin Panel](#-admin-panel)
- [🌐 Internationalization](#-internationalization)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)

## ✨ Features

- **🎨 Modern UI/UX**: Clean, professional design with smooth animations
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🌍 Multilingual**: Support for English and Indonesian
- **📱 Fully Responsive**: Optimized for all device sizes
- **⚡ Fast Performance**: Built with Vite for lightning-fast development
- **🔒 Admin Panel**: Secure content management system
- **📤 Contact Form**: Integrated with EmailJS for direct messaging
- **🖼️ Project Gallery**: Showcase projects with images and files
- **🎯 SEO Friendly**: Optimized meta tags and structure
- **♿ Accessibility**: WCAG compliant components

## 🏗️ Architecture

This project follows a modern full-stack architecture:

```
web-portofolio/
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
├── backend/           # Express.js API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── prisma/            # Database schema & migrations
└── docs/              # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **Routing**: React Router DOM
- **Forms**: Custom hooks with validation
- **Internationalization**: i18next
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer
- **Validation**: Zod schemas
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: tsx, nodemon

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier, Stylelint
- **Testing**: (Future implementation)
- **Deployment**: (Configure as needed)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MySQL database
- Git

### Clone and Setup
```bash
# Clone the repository
git clone https://github.com/mohammaiIqbalMaulana/Web-Portofolio.git
cd web-portofolio

# Install dependencies for root, frontend, and backend
npm run install:all

# Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Configure your database and other settings in .env files

# Start both development servers from the repo root
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:3000` for the API.

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install

# Setup database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Start development server
npm run dev
```

### Root Level Scripts
```bash
# Install root, frontend, and backend dependencies
npm run install:all

# Start both frontend and backend together
npm run dev

# Start only one app if needed
npm run dev:frontend
npm run dev:backend

# Build for production
npm run build
```

The root `package.json` now acts as the main developer entrypoint, so you do not need to enter `frontend/` and `backend/` separately for everyday work.

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="mysql://user:password@localhost:3306/portfolio_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="secure-password"
EMAILJS_SERVICE_ID="your-emailjs-service"
EMAILJS_TEMPLATE_ID="your-template"
EMAILJS_PUBLIC_KEY="your-public-key"
```

#### Frontend (.env)
```env
VITE_API_BASE_URL="http://localhost:3000/api"
VITE_EMAILJS_SERVICE_ID="your-emailjs-service"
VITE_EMAILJS_TEMPLATE_ID="your-template"
VITE_EMAILJS_PUBLIC_KEY="your-public-key"
```

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

#### Backend
```bash
npm run dev          # Start with tsx watch
npm run dev:nodemon  # Start with nodemon
npm run build        # Compile TypeScript
npm run start        # Start production server
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

### Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Stylelint**: CSS linting
- **TypeScript**: Type checking

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin profile

### Projects Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Request/Response Examples
See [Backend README](backend/README-backend.md) for detailed API documentation.

## 🎨 Frontend Features

### Components Structure
- **Layout**: Header, Footer, Main Layout
- **Sections**: Hero, About, Skills, Projects, Contact
- **UI Components**: Buttons, Inputs, Cards, Modals
- **Admin Components**: Dashboard, Login, Project Management

### Key Features
- **Typing Animation**: Dynamic text animation in hero section
- **Scroll Animations**: Smooth scroll-triggered animations
- **Theme Toggle**: Dark/light mode switcher
- **Language Switcher**: English/Indonesian toggle
- **Contact Form**: EmailJS integration
- **Project Filtering**: Filter projects by technology
- **Responsive Navigation**: Hamburger menu for mobile

## 🔐 Admin Panel

Access the admin panel at `/admin/login` to:
- Manage projects (CRUD operations)
- Upload project images and files
- Update project details
- View analytics (future feature)

## 🌐 Internationalization

The portfolio supports two languages:
- **English** (en)
- **Indonesian** (id)

Language files are located in `frontend/src/i18n/translations/`.

## 📱 Responsive Design

Fully responsive across all devices:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

Uses Tailwind CSS breakpoints and custom responsive utilities.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mohammad Iqbal Maulana**

- LinkedIn: [https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/]
- GitHub: [@mohammaiIqbalMaulana](https://github.com/mohammaiIqbalMaulana/Web-Portofolio.git)
- Email: iqbalmaulana14042005@gmail.com

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ using React, TypeScript, and modern web technologies.
