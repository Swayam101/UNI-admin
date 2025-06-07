import apiClient from '../lib/api';
import type { 
  User, 
  UpdateUserRequest,
  UserListResponse,
  UserDetailResponse
} from '../types/user';

const USER_ENDPOINTS = {
  GET_ALL: '/users/getAllUsers',
  GET_BY_ID: (id: string) => `/users/fetchUserById/${id}`,
  UPDATE_BY_ID: (id: string) => `/users/updateUserById/${id}`,
} as const;

export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<UserListResponse>(
      USER_ENDPOINTS.GET_ALL
    );
    return response.data.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<UserDetailResponse>(
      USER_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data.data;
  },

  // Update user by ID
  updateUserById: async (id: string, data: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.patch<UserDetailResponse>(
      USER_ENDPOINTS.UPDATE_BY_ID(id),
      data
    );
    return response.data.data;
  },
}; 