import { ApiResponse } from './api';

// Authentication related types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginData {
  id: string;
  firstName: string;
  lastName: string;
  token: string;
  isProfileCompleted: boolean;
}

export interface LoginResponse extends ApiResponse<LoginData> {
  status: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isPremium: boolean;
  isApproved: boolean;
  isPhoneVerified: boolean;
  isProfileCompleted: boolean;
  profileStage: string;
  currentStep: string;
  createdAt: string;
  updatedAt: string;
  
  // Profile information
  bio?: string;
  university?: string;
  major?: string;
  collegeGraduationYear?: string;
  hometown?: string;
  instagram?: string;
  snapchat?: string;
  profilePicture?: string;
  
  // Arrays
  photos?: string[];
  interests?: string[];
  personality?: string[];
  pastimes?: string[];
  physicalActivity?: string[];
  food?: string[];
  other?: string[];
  
  // Optional fields for compatibility
  id?: string;
  name?: string;
  avatar?: string;
  permissions?: string[];
  lastLogin?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenData {
  token: string;
  expiresAt: string;
}

export interface RefreshTokenResponse extends ApiResponse<RefreshTokenData> {
  success: boolean;
}

export interface LogoutResponse extends ApiResponse<null> {
  success: boolean;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 