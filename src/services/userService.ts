import apiClient from '../lib/api';
import type { 
  User, 
  UpdateUserRequest,
  UserListResponse,
  UserDetailResponse
} from '../types/user';

interface GetAllUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

const USER_ENDPOINTS = {
  GET_ALL: '/users/getAllUsers',
  GET_BY_ID: (id: string) => `/users/fetchUserById/${id}`,
  UPDATE_BY_ID: `/users/updateUser`,
} as const;

export const userService = {
  // Get all users with optional search and pagination
  getAllUsers: async (params?: GetAllUsersParams) => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const url = queryParams.toString() 
      ? `${USER_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : USER_ENDPOINTS.GET_ALL;

    const response = await apiClient.get<UserListResponse>(url);
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<UserDetailResponse>(
      USER_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  // Update user by ID
  updateUserById: async (id: string, data: UpdateUserRequest): Promise<User> => {
    const response = await apiClient.put<UserDetailResponse>(
      USER_ENDPOINTS.UPDATE_BY_ID,
      data,
      {
        params: {
          userId: id
        }
      }
    );
    return response.data;
  },
}; 