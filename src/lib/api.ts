import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from '../types/auth';

// API Configuration
// const API_BASE_URL = 'https://api.incomingclass.com/api/v1';
const API_BASE_URL='http://localhost:4000/api/v1';
const TOKEN_KEY = 'auth_token';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time in development
    if (import.meta.env.DEV && response.config.metadata) {
      const endTime = new Date();
      const duration = endTime.getTime() - response.config.metadata.startTime.getTime();
      console.log(`API Response: ${response.config.url} - ${duration}ms`);
    }
    
    // Automatically extract .data from response for all API calls
    // This allows services to directly use the response without accessing .data
    if (response.data && typeof response.data === 'object') {
      return response.data;
    }
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized) - redirect to login since no refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // No refresh token available, clear tokens and redirect to login
      clearAuthTokens();
      window.location.href = '/login';
    }
    
    // Transform error to our API error format
    const errorData = error.response?.data as { 
      message?: string; 
      statusCode?: number;
      timestamp?: string;
      path?: string;
      errors?: Record<string, string[]>; 
      code?: string; 
    } | undefined;
    
    const apiError: ApiError = {
      success: false,
      message: errorData?.message || error.message || 'An unexpected error occurred',
      errors: errorData?.errors,
      code: errorData?.code || error.code,
    };
    
    return Promise.reject(apiError);
  }
);

// Token management utilities
export const setAuthTokens = (token: string, rememberMe = false) => {
  localStorage.setItem(TOKEN_KEY, token);
  
  // Store remember me preference for future use if needed
  if (rememberMe) {
    localStorage.setItem('remember_me', 'true');
  } else {
    localStorage.removeItem('remember_me');
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('remember_me');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Export the configured axios instance
export default apiClient;

// Type augmentation for axios config metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
    _retry?: boolean;
  }
  
  // Override response type to reflect interceptor modification
  // Now responses return data directly instead of AxiosResponse
  interface AxiosInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  }
} 