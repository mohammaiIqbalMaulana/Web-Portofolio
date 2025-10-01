# 🤝 Contributing Guide

[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Welcome! We appreciate your interest in contributing to the Portfolio Web Application. This guide will help you get started with contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Submitting Changes](#submitting-changes)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher
- Git
- MySQL (for local development)
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammaiIqbalMaulana/Web-Portofolio.git
   cd Web-Portofolio
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup environment**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Setup database**
   ```bash
   cd backend
   npm run db:push
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev

   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

## Development Workflow

### 1. Choose an Issue

- Check the [Issues](https://github.com/mohammaiIqbalMaulana/Web-Portofolio.git/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-number-description
```

### 3. Make Changes

- Write clear, focused commits
- Test your changes thoroughly
- Follow the code standards below
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run linting
npm run lint

# Run tests (when available)
npm test

# Build for production
npm run build
```

### 5. Submit a Pull Request

- Push your branch to GitHub
- Create a pull request with a clear description
- Reference any related issues
- Wait for review and address feedback

## Submitting Changes

### Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat: add dark mode toggle
fix: resolve contact form validation error
docs: update API documentation
style: format code with prettier
refactor: simplify authentication middleware
test: add unit tests for project service
chore: update dependencies
```

### Pull Request Template

When creating a PR, please include:

- **Description**: What changes were made and why
- **Type of Change**: Bug fix, feature, documentation, etc.
- **Testing**: How the changes were tested
- **Screenshots**: If UI changes were made
- **Breaking Changes**: If any APIs or functionality changed

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Strict type checking enabled
- Use meaningful variable and function names
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Destructure objects and arrays when possible

```typescript
// Good
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: Partial<User>): User => {
  return {
    id: Date.now(),
    name: userData.name || 'Anonymous',
    email: userData.email || '',
  };
};

// Avoid
function createUser(userData) {
  return {
    id: Date.now(),
    name: userData.name ? userData.name : 'Anonymous',
    email: userData.email ? userData.email : ''
  };
}
```

### React Components

- Use functional components with hooks
- Use TypeScript interfaces for props
- Keep components small and focused
- Use custom hooks for reusable logic
- Follow component naming conventions

```tsx
// Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
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
  onClick
}) => {
  return (
    <button
      className={clsx('btn', `btn-${variant}`, `btn-${size}`)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Custom styles in CSS modules when needed
- Follow BEM methodology for complex components
- Use CSS custom properties for theming

```css
/* styles/Button.module.css */
.button {
  --button-bg: var(--color-primary);
  --button-text: var(--color-white);
}

.button:hover {
  --button-bg: var(--color-primary-dark);
}

.button--secondary {
  --button-bg: var(--color-secondary);
}
```

### File Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── sections/     # Page sections
├── hooks/            # Custom hooks
├── services/         # API services
├── types/            # TypeScript definitions
├── utils/            # Utility functions
└── styles/           # Global styles
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `UserProfile`)
- **Files**: kebab-case (`user-profile.tsx`, `auth-service.ts`)
- **Functions/Variables**: camelCase (`getUserData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserData`, `ApiResponse`)

## Testing

### Testing Strategy

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

### Writing Tests

```tsx
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Button.test.tsx
```

## Documentation

### Code Documentation

- Use JSDoc comments for functions and components
- Document complex logic and edge cases
- Keep comments up to date with code changes

```typescript
/**
 * Validates email format using regex pattern
 * @param email - The email string to validate
 * @returns True if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Component Documentation

```tsx
interface ProjectCardProps {
  /** Project data to display */
  project: Project;
  /** Whether the card is featured */
  featured?: boolean;
  /** Callback when card is clicked */
  onClick?: (project: Project) => void;
}

/**
 * Displays a project card with image, title, and description
 * Used in the projects section to showcase portfolio items
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  featured = false,
  onClick
}) => {
  // Component implementation
};
```

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, Node version
- **Screenshots**: If applicable
- **Console Errors**: Browser console output

### Feature Requests

For new features, please include:

- **Description**: What feature you want
- **Use Case**: Why you need this feature
- **Alternatives**: Other solutions you've considered
- **Mockups**: Visual representations if applicable

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation improvements
- `good first issue`: Suitable for newcomers
- `help wanted`: Extra attention needed
- `question`: Further information needed

## Pull Request Process

### Before Submitting

- [ ] Code follows the established patterns and standards
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated
- [ ] Commit messages follow conventional format
- [ ] Branch is up to date with main
- [ ] No merge conflicts

### Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Team member reviews code changes
3. **Feedback**: Reviewer provides comments and suggestions
4. **Revisions**: Address feedback and update PR
5. **Approval**: PR is approved and merged

### Merging

- Use "Squash and merge" for clean commit history
- Delete branch after merging
- Ensure CI/CD passes before merging

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Pull Request Comments**: Code review discussions

### Getting Help

- Check existing issues and documentation first
- Use clear, descriptive titles for issues
- Provide context and examples
- Be patient and respectful

### Recognition

Contributors are recognized through:
- GitHub contributor statistics
- Mention in release notes
- Special contributor badges (future feature)

---

Thank you for contributing to the Portfolio Web Application! Your contributions help make this project better for everyone.

For questions or help getting started, don't hesitate to ask in the issues section.
