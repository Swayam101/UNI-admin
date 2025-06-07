import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/authService';
import { LoginRequest, ApiError } from '../types/auth';
import { notifications } from '@mantine/notifications';
import { clearAuthTokens, isAuthenticated } from '../lib/api';

// Query keys for caching
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  verify: () => [...authKeys.all, 'verify'] as const,
};

/**
 * Hook for user login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.invalidateQueries({ queryKey: authKeys.verify() });
      
      notifications.show({
        title: 'Welcome back!',
        message: data.message || 'Successfully logged in',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      // Don't show notification - error is displayed in the form UI
      console.error('Login error:', error);
    },
  });
};

/**
 * Hook for user logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      notifications.show({
        title: 'Logged out',
        message: 'Successfully logged out',
        color: 'blue',
      });
    },
    onError: () => {
      // Clear tokens even if logout API fails
      clearAuthTokens();
      queryClient.clear();
      
      notifications.show({
        title: 'Logout',
        message: 'You have been logged out',
        color: 'orange',
      });
    },
  });
};

/**
 * Hook to get current user data
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => AuthService.getCurrentUser(),
    enabled: isAuthenticated(), // Only run if user is authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401 errors (user not authenticated)
      if ((error as { code?: string })?.code === '401') {
        return false;
      }
      return failureCount < 3;
    },
  });
};

/**
 * Hook to verify token validity
 */
export const useVerifyToken = () => {
  return useQuery({
    queryKey: authKeys.verify(),
    queryFn: () => AuthService.verifyToken(),
    enabled: isAuthenticated(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: false, // Don't retry token verification
  });
};

/**
 * Hook for password reset request
 */
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => AuthService.requestPasswordReset(email),
    onSuccess: (data) => {
      notifications.show({
        title: 'Password Reset Sent',
        message: data.message || 'Check your email for reset instructions',
        color: 'blue',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      notifications.show({
        title: 'Reset Failed',
        message: apiError.message || 'Failed to send reset email',
        color: 'red',
      });
    },
  });
};

/**
 * Hook for password reset with token
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) => 
      AuthService.resetPassword(token, newPassword),
    onSuccess: (data) => {
      notifications.show({
        title: 'Password Reset',
        message: data.message || 'Password successfully reset',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      notifications.show({
        title: 'Reset Failed',
        message: apiError.message || 'Failed to reset password',
        color: 'red',
      });
    },
  });
};

/**
 * Hook for changing password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => 
      AuthService.changePassword(currentPassword, newPassword),
    onSuccess: (data) => {
      notifications.show({
        title: 'Password Changed',
        message: data.message || 'Password successfully changed',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      notifications.show({
        title: 'Change Failed',
        message: apiError.message || 'Failed to change password',
        color: 'red',
      });
    },
  });
};

/**
 * Custom hook to get authentication state
 */
export const useAuthState = () => {
  const { data: user, isLoading: isUserLoading, error: userError } = useCurrentUser();
  const { data: isTokenValid, isLoading: isVerifyLoading } = useVerifyToken();
  
  const isAuthenticated = Boolean(user && isTokenValid);
  const isLoading = isUserLoading || isVerifyLoading;
  
  return {
    user: user || null,
    isAuthenticated,
    isLoading,
    error: userError || null,
  };
}; 