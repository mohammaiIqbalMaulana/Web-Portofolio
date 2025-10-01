# 🧪 Testing Guide

[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?logo=testing-library&logoColor=white)](https://testing-library.com/)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)

Comprehensive guide for testing the Portfolio Web Application. This guide covers unit testing, integration testing, end-to-end testing, and testing best practices.

## 📋 Table of Contents

- [Testing Strategy](#testing-strategy)
- [Testing Tools](#testing-tools)
- [Project Structure](#project-structure)
- [Unit Testing](#unit-testing)
- [Component Testing](#component-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [API Testing](#api-testing)
- [Test Coverage](#test-coverage)
- [Mocking](#mocking)
- [Continuous Integration](#continuous-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Testing Strategy

### Testing Pyramid

```
End-to-End Tests (E2E)
    │
    ├── Integration Tests
    │
    ├── Component Tests
    │
    └── Unit Tests
```

### Test Types

- **Unit Tests**: Test individual functions, hooks, and utilities
- **Component Tests**: Test React components in isolation
- **Integration Tests**: Test component interactions and API calls
- **E2E Tests**: Test complete user workflows
- **API Tests**: Test backend endpoints and services

### Testing Goals

- **Reliability**: Ensure code works as expected
- **Maintainability**: Catch regressions during refactoring
- **Documentation**: Tests serve as usage examples
- **Confidence**: Enable safe deployments and changes

## Testing Tools

### Frontend Testing

- **Vitest**: Fast unit test framework
- **React Testing Library**: Component testing utilities
- **jsdom**: Browser environment simulation
- **user-event**: User interaction simulation
- **msw**: API mocking

### Backend Testing

- **Jest**: Unit and integration testing
- **Supertest**: HTTP endpoint testing
- **Prisma Test Utils**: Database testing utilities

### End-to-End Testing

- **Playwright**: Cross-browser E2E testing
- **Cypress**: Alternative E2E testing framework

### Code Quality

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Git hooks

## Project Structure

```
src/
├── __tests__/          # Test files
│   ├── unit/           # Unit tests
│   ├── components/     # Component tests
│   ├── integration/    # Integration tests
│   └── utils/          # Test utilities
├── __mocks__/          # Mock files
├── fixtures/           # Test data
└── test-utils/         # Testing utilities
```

## Unit Testing

### Testing Utilities

```typescript
// src/utils/math.test.ts
import { describe, it, expect } from 'vitest';
import { add, multiply, divide } from './math';

describe('Math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should add two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should handle zero multiplication', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});
```

### Testing Custom Hooks

```typescript
// src/hooks/useCounter.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(4);
  });

  it('should reset count', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });
});
```

## Component Testing

### Basic Component Testing

```tsx
// src/components/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with custom variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('btn-secondary');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
```

### Testing with Context

```tsx
// src/components/ThemeToggle.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  it('toggles theme when clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    await user.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('persists theme preference', async () => {
    const user = userEvent.setup();
    const { rerender } = renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Re-render to test persistence
    rerender(<ThemeProvider><ThemeToggle /></ThemeProvider>);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
```

### Testing Forms

```tsx
// src/components/ContactForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  send: vi.fn(),
}));

describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(<ContactForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello world');

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
      });
    });
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });
});
```

## Integration Testing

### Testing API Integration

```typescript
// src/services/api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';

// Mock fetch
global.fetch = vi.fn();

describe('API service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET requests', () => {
    it('fetches projects successfully', async () => {
      const mockProjects = [
        { id: 1, title: 'Project 1' },
        { id: 2, title: 'Project 2' },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, data: mockProjects }),
      });

      const result = await api.get('/projects');
      expect(result).toEqual(mockProjects);
      expect(global.fetch).toHaveBeenCalledWith('/api/projects', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('handles API errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ success: false, error: 'Not found' }),
      });

      await expect(api.get('/projects/999')).rejects.toThrow('API Error: Not found');
    });
  });

  describe('POST requests', () => {
    it('creates project successfully', async () => {
      const newProject = { title: 'New Project', description: 'Description' };
      const createdProject = { id: 3, ...newProject };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, data: createdProject }),
      });

      const result = await api.post('/projects', newProject);
      expect(result).toEqual(createdProject);
      expect(global.fetch).toHaveBeenCalledWith('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
    });
  });
});
```

### Testing Component Integration

```tsx
// src/components/ProjectList.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProjectList } from './ProjectList';
import { api } from '../services/api';

// Mock the API
vi.mock('../services/api');
const mockApi = vi.mocked(api);

describe('ProjectList', () => {
  it('displays loading state initially', () => {
    mockApi.get.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<ProjectList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays projects after loading', async () => {
    const mockProjects = [
      { id: 1, title: 'Project 1', description: 'Description 1' },
      { id: 2, title: 'Project 2', description: 'Description 2' },
    ];

    mockApi.get.mockResolvedValue(mockProjects);
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
  });

  it('displays error message on API failure', async () => {
    mockApi.get.mockRejectedValue(new Error('API Error'));
    render(<ProjectList />);

    await waitFor(() => {
      expect(screen.getByText(/error loading projects/i)).toBeInTheDocument();
    });
  });

  it('refetches data when refresh button is clicked', async () => {
    mockApi.get.mockResolvedValue([]);
    render(<ProjectList />);

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledTimes(1);
    });

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    refreshButton.click();

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledTimes(2);
    });
  });
});
```

## End-to-End Testing

### Playwright Setup

```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Portfolio/);

    // Check hero section
    await expect(page.locator('h1')).toContainText('Hi, I\'m Mohammad Iqbal Maulana');

    // Check navigation
    await expect(page.locator('nav')).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    // Click on projects section
    await page.locator('a[href="#projects"]').click();

    // Check if projects section is visible
    await expect(page.locator('#projects')).toBeInTheViewport();
  });

  test('contact form submission', async ({ page }) => {
    await page.goto('/');

    // Fill contact form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="message"]', 'Test message');

    // Submit form
    await page.click('button[type="submit"]');

    // Check success message
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
```

### Admin Panel Testing

```typescript
// e2e/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/admin/login');
    await page.fill('[name="username"]', 'admin');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('displays dashboard', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    await expect(page.locator('.project-list')).toBeVisible();
  });

  test('creates new project', async ({ page }) => {
    await page.click('button', { hasText: 'Add Project' });

    await page.fill('[name="title"]', 'New Test Project');
    await page.fill('[name="description"]', 'Test project description');
    await page.fill('[name="tech"]', 'React,TypeScript');

    await page.click('button[type="submit"]');

    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('text=New Test Project')).toBeVisible();
  });
});
```

## API Testing

### Backend Unit Tests

```typescript
// backend/src/services/auth.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './auth.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock dependencies
vi.mock('bcryptjs');
vi.mock('jsonwebtoken');
vi.mock('../models/user.model');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('validateCredentials', () => {
    it('returns user for valid credentials', async () => {
      const mockUser = { id: 1, username: 'admin', passwordHash: 'hashed' };
      const mockUserModel = { findByUsername: vi.fn().mockResolvedValue(mockUser) };

      // Mock bcrypt compare to return true
      (bcrypt.compare as any).mockResolvedValue(true);

      const result = await authService.validateCredentials('admin', 'password');

      expect(result).toEqual(mockUser);
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed');
    });

    it('returns null for invalid password', async () => {
      const mockUser = { id: 1, username: 'admin', passwordHash: 'hashed' };

      // Mock bcrypt compare to return false
      (bcrypt.compare as any).mockResolvedValue(false);

      const result = await authService.validateCredentials('admin', 'wrong');

      expect(result).toBeNull();
    });
  });

  describe('generateToken', () => {
    it('generates JWT token', async () => {
      const mockUser = { id: 1, username: 'admin' };
      const mockToken = 'jwt-token';

      (jwt.sign as any).mockReturnValue(mockToken);

      const result = await authService.generateToken(mockUser);

      expect(result).toBe(mockToken);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1, username: 'admin' },
        expect.any(String),
        { expiresIn: '7d' }
      );
    });
  });
});
```

### API Integration Tests

```typescript
// backend/src/routes/auth.routes.test.ts
import request from 'supertest';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import express from 'express';
import { authRoutes } from './auth.routes';
import { AuthService } from '../services/auth.service';

// Mock the auth service
vi.mock('../services/auth.service');

describe('Auth Routes', () => {
  let app: express.Application;
  let mockAuthService: any;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/auth', authRoutes);

    mockAuthService = vi.mocked(AuthService.prototype);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    it('returns token for valid credentials', async () => {
      const mockUser = { id: 1, username: 'admin' };
      const mockToken = 'jwt-token';

      mockAuthService.validateCredentials.mockResolvedValue(mockUser);
      mockAuthService.generateToken.mockResolvedValue(mockToken);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: { token: mockToken, admin: mockUser },
        message: 'Login successful'
      });
    });

    it('returns error for invalid credentials', async () => {
      mockAuthService.validateCredentials.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'admin', password: 'wrong' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });
  });
});
```

## Test Coverage

### Coverage Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.html',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

### Coverage Report

```bash
# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/index.html
```

### Coverage Goals

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## Mocking

### API Mocking with MSW

```typescript
// src/test/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: [
          {
            id: 1,
            title: 'Mock Project',
            description: 'Mock description',
            tech: ['React', 'TypeScript'],
          },
        ],
      })
    );
  }),

  rest.post('/api/projects', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          id: 2,
          ...req.body,
        },
      })
    );
  }),
];
```

```typescript
// src/test/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```typescript
// src/test/setup.ts
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Database Mocking

```typescript
// src/test/mocks/prisma.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

const prismaMock = mockDeep<PrismaClient>();

export { prismaMock };
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
```

### Pre-commit Hooks

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test
```

## Best Practices

### Writing Good Tests

1. **Descriptive Test Names**: Use clear, descriptive names that explain what the test does.

```typescript
// ✅ Good
it('displays error message when login fails')

// ❌ Avoid
it('should work')
it('test login')
```

2. **Arrange, Act, Assert**: Structure tests clearly.

```typescript
it('calculates total correctly', () => {
  // Arrange
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];

  // Act
  const total = calculateTotal(items);

  // Assert
  expect(total).toBe(35);
});
```

3. **Test One Thing**: Each test should verify one specific behavior.

4. **Independent Tests**: Tests should not depend on each other.

5. **Fast Tests**: Keep tests fast to encourage frequent running.

### Test Data Management

```typescript
// src/test/fixtures/projects.ts
export const mockProjects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    github_url: 'https://github.com/username/portfolio',
    live_url: 'https://portfolio.dev',
    featured: true,
  },
  {
    id: 2,
    title: 'E-commerce API',
    description: 'REST API for e-commerce platform',
    tech: ['Node.js', 'Express', 'MySQL'],
    github_url: 'https://github.com/username/ecommerce-api',
    featured: false,
  },
];

// src/test/fixtures/users.ts
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    displayName: 'Administrator',
    email: 'admin@example.com',
  },
];
```

### Test Utilities

```typescript
// src/test/test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AnimationProvider } from '../contexts/AnimationContext';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <AnimationProvider>
        {children}
      </AnimationProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## Troubleshooting

### Common Testing Issues

#### Tests Failing Intermittently

- **Issue**: Tests pass sometimes but fail others
- **Cause**: Race conditions, timing issues, or external dependencies
- **Solution**: Use `waitFor` for async operations, mock external services

#### Mock Not Working

- **Issue**: Mock functions not being called or returning wrong values
- **Cause**: Incorrect mock setup or import order
- **Solution**: Check mock implementation, ensure proper imports

#### Component Not Found in Tests

- **Issue**: `getByText` or `getByRole` can't find elements
- **Cause**: Component not rendered or text/role mismatch
- **Solution**: Check component rendering, use correct queries

#### Memory Leaks in Tests

- **Issue**: Tests causing memory leaks
- **Cause**: Not cleaning up event listeners or timers
- **Solution**: Use cleanup functions, mock timers

### Debugging Tests

```typescript
// Add console.log for debugging
it('debugs component behavior', () => {
  const { container } = render(<MyComponent />);
  console.log(container.innerHTML); // Inspect rendered HTML

  // Use screen.debug() for readable output
  screen.debug();
});

// Pause execution
it('debugs step by step', () => {
  debugger; // Add breakpoint
  render(<MyComponent />);
});
```

### Performance Testing

```typescript
// Measure test performance
describe('Performance Tests', () => {
  it('renders large list quickly', async () => {
    const startTime = performance.now();

    render(<LargeList items={manyItems} />);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100); // Should render in < 100ms
  });
});
```

---

This testing guide provides comprehensive coverage of testing strategies and practices for the Portfolio Web Application. Following these guidelines ensures code reliability, maintainability, and confidence in deployments.

For questions about testing or to contribute test improvements, please refer to the [Contributing Guide](CONTRIBUTING.md).
