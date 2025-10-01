# 📝 Code Style Guide

[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

This guide outlines the coding standards and conventions used in the Portfolio Web Application project. Consistent code style ensures maintainability, readability, and collaboration.

## 📋 Table of Contents

- [General Principles](#general-principles)
- [TypeScript Guidelines](#typescript-guidelines)
- [React Guidelines](#react-guidelines)
- [CSS/Styling Guidelines](#cssstyling-guidelines)
- [File Organization](#file-organization)
- [Naming Conventions](#naming-conventions)
- [Code Formatting](#code-formatting)
- [Best Practices](#best-practices)
- [Linting and Tools](#linting-and-tools)
- [Documentation Standards](#documentation-standards)

## General Principles

### Code Quality

- **Readability**: Code should be self-documenting and easy to understand
- **Maintainability**: Code should be easy to modify and extend
- **Performance**: Consider performance implications of code changes
- **Security**: Follow security best practices
- **Testing**: Code should be testable and include appropriate tests

### Consistency

- Follow established patterns and conventions
- Use consistent formatting and style
- Maintain consistency across the codebase
- Document deviations from standards

## TypeScript Guidelines

### Type Definitions

```typescript
// ✅ Good: Explicit types
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

// ✅ Good: Union types for constrained values
type UserRole = 'admin' | 'user' | 'guest';
type Status = 'pending' | 'approved' | 'rejected';

// ✅ Good: Generic types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ❌ Avoid: any type
const user: any = { id: 1, name: 'John' };

// ❌ Avoid: implicit any
function processData(data) { // Missing parameter type
  return data;
}
```

### Function Signatures

```typescript
// ✅ Good: Explicit return types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

// ✅ Good: Optional parameters
function createUser(name: string, email: string, age?: number): User {
  return {
    id: Date.now(),
    name,
    email,
    age: age ?? 18,
    createdAt: new Date(),
    isActive: true,
  };
}

// ✅ Good: Rest parameters
function formatMessage(template: string, ...args: string[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => args[index] || match);
}
```

### Type Assertions

```typescript
// ✅ Good: Type assertion with type guard
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}

const data: unknown = fetchUser();
if (isUser(data)) {
  console.log(data.name); // TypeScript knows data is User
}

// ❌ Avoid: Force type assertion
const user = data as User; // Unsafe
```

## React Guidelines

### Component Structure

```tsx
// ✅ Good: Functional component with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Hooks Usage

```tsx
// ✅ Good: Custom hook for data fetching
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: () => fetchProjects() };
};

// ✅ Good: Component using the hook
const ProjectsPage = () => {
  const { projects, loading, error, refetch } = useProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### Event Handlers

```tsx
// ✅ Good: Proper event typing
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// ✅ Good: Keyboard event handling
const handleKeyPress = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSubmit(event);
  }
};
```

## CSS/Styling Guidelines

### Tailwind CSS

```tsx
// ✅ Good: Utility-first approach
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Section Title
    </h2>
    <p className="text-gray-600 dark:text-gray-300">
      Section content goes here.
    </p>
  </div>
</div>

// ✅ Good: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>

// ✅ Good: Dark mode support
<button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
  Button
</button>
```

### CSS Modules

```css
/* styles/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.buttonPrimary {
  background-color: #2563eb;
  color: white;
}

.buttonPrimary:hover {
  background-color: #1d4ed8;
}

.buttonDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  children,
}) => {
  const buttonClasses = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    disabled && styles.buttonDisabled,
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};
```

## File Organization

### Directory Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   ├── sections/     # Page sections
│   └── admin/        # Admin-specific components
├── hooks/            # Custom React hooks
├── contexts/         # React contexts
├── services/         # API services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── constants/        # Constants and configuration
├── styles/           # Global styles and CSS modules
├── i18n/             # Internationalization files
├── pages/            # Page components (if using routing)
└── assets/           # Static assets
```

### File Naming

```typescript
// ✅ Good: Component files
Button.tsx
Button.test.tsx
Button.module.css
useAuth.ts
authService.ts
userTypes.ts

// ✅ Good: Consistent naming
ProjectCard.tsx
ProjectList.tsx
ProjectForm.tsx
projectApi.ts
projectTypes.ts

// ❌ Avoid: Inconsistent naming
project-card.tsx
ProjectCard.jsx
projectCard.ts
prj-types.ts
```

### Import Organization

```typescript
// ✅ Good: Organized imports
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { Project } from '../../types/project';
import { formatDate } from '../../utils/date';

// ❌ Avoid: Unorganized imports
import { formatDate } from '../../utils/date';
import React, { useState, useEffect } from 'react';
import { Project } from '../../types/project';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
```

## Naming Conventions

### Components

```tsx
// ✅ Good: PascalCase for component names
export const UserProfile = () => { ... };
export const ProjectCard = () => { ... };
export const ContactForm = () => { ... };

// ✅ Good: File names match component names
// UserProfile.tsx
export const UserProfile = () => { ... };
```

### Hooks

```tsx
// ✅ Good: use prefix for custom hooks
export const useAuth = () => { ... };
export const useProjects = () => { ... };
export const useLocalStorage = () => { ... };

// ✅ Good: Descriptive names
export const useDebounce = (value: string, delay: number) => { ... };
export const useScrollPosition = () => { ... };
```

### Functions and Variables

```typescript
// ✅ Good: camelCase for functions and variables
const getUserData = () => { ... };
const isLoading = false;
const userName = 'John';

// ✅ Good: Descriptive names
const calculateTotalPrice = (items: CartItem[]) => { ... };
const formatUserDisplayName = (user: User) => { ... };

// ❌ Avoid: Abbreviations
const calcTotPrc = (items) => { ... }; // Unclear
const usrNm = 'John'; // Unclear
```

### Constants

```typescript
// ✅ Good: UPPER_SNAKE_CASE for constants
export const API_BASE_URL = 'https://api.example.com';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const DEFAULT_PAGE_SIZE = 10;

// ✅ Good: Group related constants
export const COLORS = {
  PRIMARY: '#2563eb',
  SECONDARY: '#64748b',
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
} as const;
```

### Types and Interfaces

```typescript
// ✅ Good: PascalCase for types and interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'guest';
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// ✅ Good: Descriptive names
interface CreateProjectRequest {
  title: string;
  description?: string;
  tech: string[];
}

type ProjectStatus = 'draft' | 'published' | 'archived';
```

## Code Formatting

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'jsx-a11y/anchor-is-valid': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

## Best Practices

### Error Handling

```typescript
// ✅ Good: Proper error handling
try {
  const response = await api.post('/projects', projectData);
  setProjects(prev => [...prev, response.data]);
} catch (error) {
  if (error.response?.status === 400) {
    setErrors(error.response.data.errors);
  } else {
    setError('An unexpected error occurred');
  }
  console.error('Failed to create project:', error);
}

// ✅ Good: Custom error types
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'NetworkError';
  }
}
```

### Performance Optimization

```tsx
// ✅ Good: Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}, [items]);

// ✅ Good: Callback memoization
const handleSubmit = useCallback((data: FormData) => {
  submitForm(data);
}, [submitForm]);

// ✅ Good: Component memoization
const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => {
  return (
    <div onClick={() => onClick(project)}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
});
```

### Security Best Practices

```typescript
// ✅ Good: Input sanitization
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

// ✅ Good: SQL injection prevention (handled by Prisma)
// ✅ Good: XSS prevention (React handles this)
// ✅ Good: CSRF protection (implement as needed)
```

## Linting and Tools

### Development Tools

```json
// package.json scripts
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx --fix",
    "lint:check": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

### Pre-commit Hooks

```bash
# Install husky
npm install --save-dev husky

# Setup pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run format:check && npm run type-check"
```

### VS Code Configuration

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "typescriptreact",
    "javascript": "javascriptreact"
  }
}
```

## Documentation Standards

### JSDoc Comments

```typescript
/**
 * Calculates the total price of items in the cart
 * @param items - Array of cart items
 * @param discount - Optional discount percentage (0-100)
 * @returns The total price after discount
 * @throws {Error} If discount is not between 0 and 100
 */
export function calculateTotal(items: CartItem[], discount = 0): number {
  if (discount < 0 || discount > 100) {
    throw new Error('Discount must be between 0 and 100');
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);

  return subtotal - discountAmount;
}
```

### Component Documentation

```tsx
interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * A modal dialog component with overlay and animations
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * return (
 *   <Modal
 *     isOpen={isOpen}
 *     onClose={() => setIsOpen(false)}
 *     title="Confirm Action"
 *     size="md"
 *   >
 *     <p>Are you sure you want to proceed?</p>
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button onClick={handleConfirm}>Confirm</Button>
 *   </Modal>
 * );
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  // Component implementation
};
```

---

This code style guide ensures consistency and quality across the Portfolio Web Application codebase. All team members should follow these guidelines when contributing to the project.

For questions or clarifications about these guidelines, please refer to the [Contributing Guide](CONTRIBUTING.md) or create an issue in the repository.
