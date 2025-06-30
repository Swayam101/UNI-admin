# Error Handling Guide

This document describes the error handling system implemented in the INCOMING-CLASS admin application.

## Overview

The application now includes comprehensive error handling with:
- **404 Not Found Page** - For when users visit non-existent routes
- **Error Boundary** - For catching unexpected React errors
- **Error Page** - For displaying user-friendly error messages
- **Development Tools** - For testing error scenarios during development

## Components

### 1. NotFoundPage (`src/pages/NotFoundPage.tsx`)
- Displays when users navigate to non-existent routes
- Features a modern design matching the app's aesthetic
- Includes navigation options to return to dashboard or go back
- Shows floating animations and gradient styling

### 2. ErrorPage (`src/pages/ErrorPage.tsx`)
- Displays when unexpected errors occur in the application
- Shows error details with collapsible technical information
- Provides options to retry, go home, or report the error
- Includes a "Report Error" feature that opens email with error details

### 3. ErrorBoundary (`src/components/common/ErrorBoundary.tsx`)
- React class component that catches JavaScript errors anywhere in the component tree
- Automatically displays the ErrorPage when errors occur
- Logs errors to console in development mode
- Can be extended to send errors to error reporting services

### 4. ErrorTester (`src/components/common/ErrorTester.tsx`)
- **Development only** - not shown in production
- Provides a floating panel with a "Trigger Error" button
- Useful for testing the error boundary functionality
- Appears as an orange alert in the bottom-right corner

## Routing Structure

```
/ (root)
├── /login (public)
├── /* (protected routes - wrapped by DashboardLayout)
│   ├── / (dashboard)
│   ├── /schools (school management)
│   ├── /users (user management)
│   ├── ... (other dashboard routes)
│   └── * (404 - handled by NotFoundPage in DashboardRoutes)
```

## Usage

### For Users
- When visiting non-existent URLs, users see the 404 page with helpful navigation
- When JavaScript errors occur, users see the error page instead of a blank screen
- All error pages maintain the app's branding and provide clear next steps

### For Developers
1. **Testing Errors**: In development, use the orange "Development Tools" panel to trigger test errors
2. **Error Logging**: Errors are automatically logged to console in development
3. **Customization**: Error pages can be customized by modifying the respective components
4. **Error Reporting**: The error page includes a "Report Error" button that opens email with error details

## Design Features

- **Consistent Branding**: All error pages use the INCOMING-CLASS admin styling
- **Responsive Design**: Works on mobile and desktop
- **Animated Elements**: Floating dots and glitch effects for visual appeal
- **Gradient Backgrounds**: Matches the login page and app theme
- **Dark/Light Mode**: Supports the app's theme switching

## Future Enhancements

- Integrate with error reporting services (Sentry, LogRocket, etc.)
- Add error recovery mechanisms for specific error types
- Implement offline error handling
- Add error analytics and monitoring 