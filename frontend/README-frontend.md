# 🎨 Portfolio Frontend

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

A modern, responsive React single-page application for showcasing portfolio projects. Built with TypeScript, Vite, and Tailwind CSS, featuring smooth animations, dark mode, and multilingual support.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🔧 Development](#-development)
- [🎨 Components](#-components)
- [🎯 Features Overview](#-features-overview)
- [🌐 Internationalization](#-internationalization)
- [🎭 Animations](#-animations)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Custom Hooks](#-custom-hooks)
- [🎨 Styling](#-styling)
- [🧪 Testing](#-testing)
- [🚀 Build & Deployment](#-build--deployment)
- [🤝 Contributing](#-contributing)

## ✨ Features

- **⚡ Lightning Fast**: Built with Vite for instant development
- **🎨 Modern UI**: Clean, professional design with Tailwind CSS
- **🌙 Dark Mode**: Seamless theme switching
- **🌍 Multilingual**: English and Indonesian support
- **📱 Fully Responsive**: Perfect on all devices
- **🎭 Smooth Animations**: Framer Motion powered transitions
- **⚙️ Type Safe**: Full TypeScript coverage
- **🔧 Custom Hooks**: Reusable logic components
- **📤 Contact Integration**: EmailJS powered contact form
- **🎯 SEO Optimized**: Meta tags and semantic HTML
- **♿ Accessible**: WCAG compliant components

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   ├── HeaderSection.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   └── ...
│   │   ├── sections/        # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ...
│   │   └── admin/           # Admin panel components
│   ├── pages/               # Page components
│   │   └── SinglePageApp.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useContactForm.ts
│   │   ├── useProjects.ts
│   │   ├── useScroll.ts
│   │   └── ...
│   ├── contexts/            # React contexts
│   │   ├── ThemeContext.tsx
│   │   ├── AnimationContext.tsx
│   │   └── ...
│   ├── services/            # API services
│   │   └── api.ts
│   ├── i18n/                # Internationalization
│   │   ├── index.ts
│   │   ├── translations/
│   │   │   ├── en.json
│   │   │   └── id.json
│   ├── styles/              # Global styles
│   │   ├── index.css
│   │   └── hamburger.css
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── config/              # Configuration files
│   │   └── emailjs_example.ts
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── public/                  # Static assets
│   ├── assets/
│   ├── images/
│   └── favicon.ico
├── index.html               # HTML template
└── package.json
```

## 🛠️ Tech Stack

### Core Framework
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful icon library
- **React Icons**: Additional icon collections

### State & Data
- **React Context**: State management for theme and animations
- **React Router DOM**: Client-side routing
- **Custom Hooks**: Reusable stateful logic

### Utilities
- **i18next**: Internationalization framework
- **EmailJS**: Contact form service integration
- **clsx**: Conditional CSS classes utility
- **Tailwind Merge**: Tailwind class merging utility

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Stylelint**: CSS linting
- **TypeScript Compiler**: Type checking

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation & Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure your environment variables
# Edit .env with your API URL and EmailJS keys

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📦 Installation

### Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL="http://localhost:3000/api"

# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID="your-emailjs-service-id"
VITE_EMAILJS_TEMPLATE_ID="your-emailjs-template-id"
VITE_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
```

## ⚙️ Configuration

### Vite Configuration
Located in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Tailwind Configuration
Located in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { ... },
        secondary: { ... }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out'
      }
    },
  },
  plugins: [],
}
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

### Development Workflow

1. **Start Backend**: Ensure API is running
2. **Install Dependencies**: `npm install`
3. **Configure Environment**: Edit `.env` file
4. **Start Development**: `npm run dev`
5. **Code Changes**: Hot reload enabled
6. **Lint & Format**: Run quality checks before commit

## 🎨 Components

### Layout Components

#### MainLayout
The root layout component that structures the entire page.

```tsx
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      <HeaderSection />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        {children}
      </main>
      <FooterSection />
    </div>
  );
};
```

#### HeaderSection
Navigation header with logo, menu, and theme/language toggles.

#### FooterSection
Site footer with contact information and social links.

### Section Components

#### HeroSection
Landing section with animated typing text and call-to-action.

#### AboutSection
Personal introduction and background information.

#### SkillsSection
Technical skills showcase with animated progress bars.

#### ProjectsSection
Portfolio projects display with filtering and modal details.

#### ContactSection
Contact form with EmailJS integration.

### UI Components

#### Button
Customizable button component with variants.

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### ProjectCard
Project showcase card with hover effects.

#### Input/Textarea
Form input components with validation states.

#### SocialLink
Social media link component with icons.

#### SkillCard
Individual skill display with icon and proficiency.

### Admin Components

#### AdminDashboard
Main admin interface for content management.

#### AdminLogin
Authentication form for admin access.

## 🎯 Features Overview

### Theme System
- **Dark/Light Mode**: Automatic system preference detection
- **Smooth Transitions**: CSS transitions for theme changes
- **Persistent Storage**: Theme preference saved in localStorage

### Animation System
- **Scroll Animations**: Elements animate on viewport entry
- **Hover Effects**: Interactive hover states
- **Loading Animations**: Skeleton loaders and spinners
- **Page Transitions**: Smooth navigation transitions

### Contact Form
- **EmailJS Integration**: Direct email sending
- **Form Validation**: Real-time input validation
- **Success/Error States**: User feedback for form submission
- **Responsive Design**: Mobile-optimized form layout

### Project Gallery
- **Dynamic Filtering**: Filter projects by technology
- **Modal Details**: Expanded project information
- **Image Gallery**: Multiple project screenshots
- **External Links**: GitHub and live demo links

### Navigation
- **Responsive Menu**: Hamburger menu for mobile
- **Smooth Scrolling**: Anchor link navigation
- **Active States**: Current section highlighting
- **Keyboard Navigation**: Full keyboard accessibility

## 🌐 Internationalization

### Supported Languages
- **English (en)**: Default language
- **Indonesian (id)**: Native language support

### Translation Files
Located in `src/i18n/translations/`:

```json
// en.json
{
  "hero": {
    "title": "Hi, I'm Mohammad Iqbal Maulana",
    "subtitle": "Full Stack Developer",
    "description": "I create amazing web experiences..."
  }
}
```

### Usage in Components
```tsx
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('hero.title')}</h1>
    <p>{t('hero.description')}</p>
  );
};
```

## 🎭 Animations

### Framer Motion Integration
```tsx
import { motion } from 'framer-motion';

const AnimatedComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
};
```

### Animation Variants
- **Fade In**: Elements fade in on scroll
- **Slide Up**: Content slides up from bottom
- **Scale**: Hover scale effects
- **Stagger**: Sequential animations for lists

### Custom Hooks for Animation
```tsx
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Responsive Utilities
```tsx
// Responsive text sizes
className="text-sm md:text-base lg:text-lg"

// Responsive spacing
className="p-4 md:p-6 lg:p-8"

// Responsive grids
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactive elements
- Optimized typography scaling

## 🔧 Custom Hooks

### useContactForm
Manages contact form state and submission.

```tsx
const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // EmailJS submission logic
  };

  return { formData, setFormData, handleSubmit, isSubmitting };
};
```

### useProjects
Fetches and manages projects data.

```tsx
const useProjects = () => {
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

### useScroll
Detects scroll position and direction.

### useHover
Manages hover states with mouse/touch events.

### useTouchToggle
Handles touch interactions for mobile devices.

## 🎨 Styling

### Tailwind CSS Setup
- **Utility-First**: Compose styles with utility classes
- **Dark Mode**: Automatic dark theme support
- **Custom Colors**: Extended color palette
- **Responsive Design**: Mobile-first breakpoints

### Global Styles
Located in `src/styles/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans text-secondary-900 dark:text-secondary-100;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors;
  }
}
```

### CSS Modules (Optional)
For component-scoped styles:

```css
/* ComponentName.module.css */
.container {
  /* Styles */
}
```

## 🧪 Testing

### Testing Setup
```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
src/
├── __tests__/          # Test files
│   ├── components/
│   ├── hooks/
│   └── utils/
├── __mocks__/          # Mock files
└── test-utils/         # Testing utilities
```

### Example Test
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## 🚀 Build & Deployment

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Build Configuration
- **Output Directory**: `dist/`
- **Asset Optimization**: Images, CSS, JS minification
- **Code Splitting**: Automatic chunk splitting
- **Source Maps**: Development source maps

### Deployment Options

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
netlify build
netlify deploy --prod
```

#### Manual Deployment
```bash
# Build the app
npm run build

# Serve static files
npx serve dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm test`)
5. Format code (`npm run format`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb config with React rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Structured commit messages
- **Component Naming**: PascalCase for components
- **File Naming**: kebab-case for files

### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Request review from maintainers

---

For backend documentation, see [Backend README](../backend/README-backend.md)

For project overview, see [Root README](../README.md)
