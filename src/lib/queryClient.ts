import { QueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { ApiError } from '../types/auth';

// Helper function to safely convert error to ApiError
const toApiError = (error: unknown): ApiError => {
  // If it's already an ApiError, return it
  if (error && typeof error === 'object' && 'success' in error && 'message' in error) {
    return error as ApiError;
  }
  
  // If it's a generic Error, convert it
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      code: '500', // Default to server error
    };
  }
  
  // Fallback for unknown error types
  return {
    success: false,
    message: 'An unexpected error occurred',
    code: '500',
  };
};

// Create and configure the query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time of 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time of 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: (failureCount, error) => {
        // Don't retry on client errors (4xx)
        const apiError = toApiError(error);
        if (apiError.code && apiError.code.startsWith('4')) {
          return false;
        }
        return failureCount < 3;
      },
      // Refetch on window focus (useful for real-time data)
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect automatically
      refetchOnReconnect: 'always',
    },
    mutations: {
      // Global error handler for mutations
      onError: (error) => {
        const apiError = toApiError(error);
        
        // Show generic error notification if not handled by specific mutation
        if (!apiError.message.includes('handled')) {
          notifications.show({
            title: 'Error',
            message: apiError.message || 'Something went wrong. Please try again.',
            color: 'red',
          });
        }
      },
    },
  },
});

// Optional: Add global error boundary for queries
export const globalErrorHandler = (error: unknown) => {
  const apiError = toApiError(error);
  
  console.error('Global query error:', apiError);
  
  // Handle specific error types
  if (apiError.code === '401') {
    // Unauthorized - handled by axios interceptor
    return;
  }
  
  if (apiError.code === '403') {
    notifications.show({
      title: 'Access Denied',
      message: 'You don\'t have permission to perform this action.',
      color: 'red',
    });
    return;
  }
  
  if (apiError.code === '500') {
    notifications.show({
      title: 'Server Error',
      message: 'Internal server error. Please try again later.',
      color: 'red',
    });
    return;
  }
  
  // Generic error
  notifications.show({
    title: 'Error',
    message: apiError.message || 'An unexpected error occurred.',
    color: 'red',
  });
}; 