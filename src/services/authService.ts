import apiClient, { setAuthTokens, clearAuthTokens } from '../lib/api';
import { 
  LoginRequest, 
  LoginResponse, 
  LogoutResponse, 
  RefreshTokenResponse,
  User
} from '../types/auth';
import { ApiResponse } from '../types/api';

export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      console.log("login response auth service", response);
      
      // Check if login was successful (status should be string now)
      if (response.status == '200' && response.data.token) {
        const { token } = response.data;
        
        // Store token in localStorage (no refresh token from this API)
        localStorage.setItem('auth_token', token);
        
        // Store remember me preference
        if (credentials.rememberMe) {
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remember_me');
        }
        
        console.log('✅ Token stored in localStorage');
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout user and clear tokens
   */
  static async logout(): Promise<LogoutResponse> {
    try {
      const response = await apiClient.post<LogoutResponse>('/auth/logout');
      clearAuthTokens();
      return response;
    } catch (error) {
      // Clear tokens even if logout fails
      clearAuthTokens();
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
        refreshToken,
      });
      
      if (response.success) {
        const { token } = response.data;
        // Update only the access token
        setAuthTokens(token);
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      clearAuthTokens();
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<{user: User}> {
    try {
      const response = await apiClient.get<ApiResponse<{user: User}>>('/auth/me');
      console.log("getting user data", response);
      
      // Handle the API response format
      if (response.status == '200') {
        return response.data;
      }
      
      throw new Error('Failed to get user data');
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  /**
   * Verify if the current token is valid
   */
  static async verifyToken(): Promise<boolean> {
    try {
      await apiClient.get('/auth/verify');
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', {
        email,
      });
      return response;
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', {
        token,
        password: newPassword,
      });
      return response;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  /**
   * Change password for authenticated user
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{ success: boolean; message: string }>('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }
} 