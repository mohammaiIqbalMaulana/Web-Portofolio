# 🧩 Component Library Documentation

This document provides a detailed overview of the reusable components used in the frontend of the Portfolio Web Application. It covers component structure, props, usage examples, and design considerations.

## 📋 Table of Contents

- [Component Overview](#component-overview)
- [Layout Components](#layout-components)
- [Section Components](#section-components)
- [UI Components](#ui-components)
- [Admin Components](#admin-components)
- [Custom Hooks](#custom-hooks)
- [Styling and Theming](#styling-and-theming)
- [Accessibility](#accessibility)
- [Testing Components](#testing-components)
- [Best Practices](#best-practices)

## Component Overview

The frontend is built with React and TypeScript, using a modular component-based architecture. Components are organized by their role and reusability.

```
src/components/
├── layout/          # Layout components (MainLayout, HeaderSection, FooterSection)
├── sections/        # Page sections (HeroSection, AboutSection, ProjectsSection)
├── ui/              # Reusable UI components (Button, Input, ProjectCard)
├── admin/           # Admin panel components (AdminDashboard, AdminLogin)
```

## Layout Components

### MainLayout

- **Description**: Root layout component that structures the page with header, main content, and footer.
- **Props**: `children` (ReactNode) - content to render inside main.
- **Usage**:

```tsx
<MainLayout>
  <YourContent />
</MainLayout>
```

### HeaderSection

- **Description**: Navigation header with logo, menu, theme toggle, and language switcher.
- **Features**: Responsive design, accessible navigation, hamburger menu on mobile.

### FooterSection

- **Description**: Footer with contact info, social links, and copyright.

## Section Components

### HeroSection

- **Description**: Landing section with animated typing effect and call-to-action buttons.
- **Features**: Typing animation, responsive layout.

### AboutSection

- **Description**: Personal introduction and background.
- **Features**: Text content, profile image.

### SkillsSection

- **Description**: Displays technical skills with animated progress bars.
- **Features**: Skill cards, icons.

### ProjectsSection

- **Description**: Portfolio projects gallery with filtering and modal details.
- **Features**: Project cards, image gallery, external links.

### ContactSection

- **Description**: Contact form integrated with EmailJS.
- **Features**: Form validation, success/error feedback.

## UI Components

### Button

- **Description**: Customizable button component.
- **Props**:
  - `variant`: 'primary' | 'secondary' | 'outline'
  - `size`: 'sm' | 'md' | 'lg'
  - `disabled`: boolean
  - `onClick`: () => void
- **Usage**:

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Input

- **Description**: Text input with validation states.
- **Props**:
  - `type`: 'text' | 'email' | 'password' | etc.
  - `value`: string
  - `onChange`: (e) => void
  - `placeholder`: string
  - `error`: string | null

### ProjectCard

- **Description**: Displays project summary with image, title, and links.
- **Features**: Hover effects, clickable links.

### Select

- **Description**: Dropdown select component.
- **Props**:
  - `options`: Array<{ label: string; value: string }>
  - `value`: string
  - `onChange`: (value: string) => void

### SkillCard

- **Description**: Displays individual skill with icon and proficiency.
- **Props**:
  - `skillName`: string
  - `icon`: ReactNode
  - `level`: number (0-100)

### SocialLink

- **Description**: Social media icon link.
- **Props**:
  - `href`: string
  - `icon`: ReactNode
  - `label`: string

### Textarea

- **Description**: Multi-line text input.
- **Props**:
  - `value`: string
  - `onChange`: (e) => void
  - `placeholder`: string
  - `error`: string | null

## Admin Components

### AdminDashboard

- **Description**: Main admin interface for managing projects and content.
- **Features**: Project CRUD, file uploads, analytics (future).

### AdminLogin

- **Description**: Login form for admin authentication.
- **Features**: Validation, error handling.

## Custom Hooks

- `useContactForm`: Manages contact form state and submission.
- `useProjects`: Fetches and manages projects data.
- `useScroll`: Detects scroll position and triggers animations.
- `useHover`: Manages hover states.
- `useTouchToggle`: Handles touch interactions.

## Styling and Theming

- Tailwind CSS utility classes used extensively.
- Dark mode support with smooth transitions.
- Responsive design with mobile-first approach.
- Custom CSS modules for scoped styles where needed.

## Accessibility

- Semantic HTML elements used.
- Keyboard navigable components.
- ARIA attributes for interactive elements.
- Color contrast compliant with WCAG 2.1.

## Testing Components

- Unit tests with React Testing Library.
- Snapshot tests for UI consistency.
- Integration tests for form submissions.

## Best Practices

- Use TypeScript for type safety.
- Keep components small and focused.
- Use hooks for reusable logic.
- Follow consistent naming conventions.
- Document components with JSDoc or comments.
- Use ESLint and Prettier for code quality.

---

For detailed usage examples and API, refer to the source code and inline documentation.
