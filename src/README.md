# Project Structure

This project follows React best practices for folder organization and file structure as outlined in our development guidelines.

## Directory Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── ProtectedRoute.tsx
│   │   ├── TestimonialModal.tsx
│   │   └── index.ts
│   ├── features/            # Business feature components
│   │   ├── SchoolManagement.tsx
│   │   ├── UserManagement.tsx
│   │   ├── PostManagement.tsx
│   │   ├── Analytics.tsx
│   │   ├── EmailCampaigns.tsx
│   │   ├── PaymentManagement.tsx
│   │   ├── TestimonialManagement.tsx
│   │   ├── CollegeForm.tsx
│   │   └── index.ts
│   └── index.ts             # Re-exports from subdirectories
├── pages/                   # Route-level page components
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── CollegeFormPage.tsx
│   └── index.ts
├── layouts/                 # Page wrapper components
│   ├── DashboardLayout.tsx
│   └── index.ts
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts
│   ├── useDashboard.ts
│   ├── useTheme.ts
│   └── ...
├── context/                 # React Context providers
│   ├── ThemeContext.tsx
│   └── theme.ts
├── services/                # API calls and external services
│   ├── api/
│   └── ...
├── utils/                   # Utility functions and constants
│   └── ...
├── styles/                  # Global styles and themes
│   ├── globals/
│   ├── components/
│   └── themes/
│       └── theme/
│           └── mainTheme.ts
├── types/                   # TypeScript type definitions
│   └── ...
├── routes/                  # Routing configuration
│   └── index.tsx
├── lib/                     # External library configurations
│   └── ...
└── assets/                  # Images, icons, fonts
    └── ...
```

## Component Organization

### Common Components (`/components/common/`)
- **Purpose**: Reusable UI components used across multiple features
- **Examples**: ProtectedRoute, TestimonialModal
- **Usage**: Imported via barrel exports for clean import paths

### Feature Components (`/components/features/`)
- **Purpose**: Components specific to business features
- **Examples**: SchoolManagement, UserManagement, PostManagement
- **Organization**: Grouped by business functionality

### Pages (`/pages/`)
- **Purpose**: Top-level components representing application routes
- **Naming**: Always end with "Page" (DashboardPage, LoginPage)
- **Responsibility**: Orchestrate feature components and handle page-specific logic

### Layouts (`/layouts/`)
- **Purpose**: Wrapper components that define page structure
- **Examples**: DashboardLayout
- **Usage**: Applied to groups of pages with similar structure

## Import/Export Standards

### Barrel Exports
Clean import paths using `index.ts` files:

```typescript
// components/common/index.ts
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as TestimonialModal } from './TestimonialModal';

// Usage
import { ProtectedRoute, TestimonialModal } from '@/components/common';
```

### Import Order
1. React and external libraries
2. Internal components and hooks
3. Services and utilities
4. Types (TypeScript)
5. Styles

```typescript
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { ProtectedRoute } from '@/components/common';
import { useAuth } from '@/hooks';

import { userApi } from '@/services/api';
import { formatDate } from '@/utils/helpers';

import type { User } from '@/types';
```

## Routing Architecture

### Centralized Routing
- **AppRoutes**: Main application routes (public/protected)
- **DashboardRoutes**: Dashboard-specific routes
- **Separation of Concerns**: Layouts handle UI structure, routes handle navigation

### Route Structure
```typescript
// routes/index.tsx
export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    } />
  </Routes>
);
```

## State Management

### Local State
- `useState` for component-specific state
- `useReducer` for complex local state logic

### Global State
- **Context**: UI state, themes, user preferences (ThemeContext)
- **React Query**: Server state management and caching

### Custom Hooks
- `useTheme`: Theme management
- `useAuth`: Authentication state
- `useDashboard`: Dashboard-specific data

## Best Practices

### Component Design
- Keep components small and focused (single responsibility)
- Use composition over inheritance
- Prefer functional components with hooks
- Extract custom hooks for reusable logic

### File Naming
- **Components**: PascalCase (UserProfile.tsx)
- **Hooks**: camelCase starting with "use" (useAuth.ts)
- **Services**: camelCase ending with purpose (authService.ts)
- **Utils**: camelCase descriptive names (formatDate.ts)

### Code Quality
- Follow ESLint and Prettier configurations
- Use TypeScript for better type safety
- Implement proper error handling
- Write meaningful commit messages

## Migration Benefits

This new structure provides:

1. **Better Organization**: Clear separation of concerns
2. **Improved Maintainability**: Easier to locate and modify code
3. **Enhanced Scalability**: Structure supports growth
4. **Clean Imports**: Barrel exports reduce import complexity
5. **Team Consistency**: Standardized patterns across the codebase
6. **Better Testing**: Organized structure makes testing easier

## Development Workflow

### Adding New Components
1. Determine if it's common or feature-specific
2. Place in appropriate directory
3. Update relevant `index.ts` for barrel exports
4. Follow naming conventions

### Adding New Pages
1. Create in `/pages` directory
2. End filename with "Page"
3. Add to routes configuration
4. Update barrel exports

### Adding New Features
1. Create feature components in `/components/features`
2. Add necessary hooks in `/hooks`
3. Update routing if needed
4. Add to appropriate barrel exports 