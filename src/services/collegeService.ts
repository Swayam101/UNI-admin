import apiClient from '../lib/api';
import type { 
  College, 
  CreateCollegeRequest, 
  UpdateCollegeRequest,
  CollegeListResponse,
  CollegeDetailResponse,
  CollegeResponse
} from '../types/college';

interface GetAllCollegesParams {
  search?: string;
  page?: number;
  limit?: number;
}

const COLLEGE_ENDPOINTS = {
  CREATE: '/colleges/createCollege',
  GET_ALL: '/colleges/getAllColleges',
  GET_BY_ID: (id: string) => `/colleges/getCollegeById/${id}`,
  UPDATE_BY_ID: (id: string) => `/colleges/updateCollegeById/${id}`,
  DELETE_BY_ID: (id: string) => `/colleges/deleteCollegeById/${id}`,
} as const;

export const collegeService = {
  // Create a new college
  createCollege: async (data: CreateCollegeRequest): Promise<College> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('file', data.file);
    formData.append('instagramBusinessId', data.instagramBusinessId);
    formData.append('instagramAccessToken', data.instagramAccessToken);

    const response = await apiClient.post<CollegeDetailResponse>(
      COLLEGE_ENDPOINTS.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Get all colleges with optional search and pagination
  getAllColleges: async (params?: GetAllCollegesParams) => {
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
      ? `${COLLEGE_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : COLLEGE_ENDPOINTS.GET_ALL;

    const response = await apiClient.get<CollegeListResponse>(url);
    return response.data;
  },

  // Get college by ID
  getCollegeById: async (id: string): Promise<College> => {
    const response = await apiClient.get<CollegeDetailResponse>(
      COLLEGE_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data;
  },

  // Update college by ID
  updateCollegeById: async (id: string, data: UpdateCollegeRequest): Promise<College> => {
    const formData = new FormData();
    
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.username) {
      formData.append('username', data.username);
    }
    if (data.file) {
      formData.append('file', data.file);
    }
    if (data.instagramBusinessId) {
      formData.append('instagramBusinessId', data.instagramBusinessId);
    }
    if (data.instagramAccessToken) {
      formData.append('instagramAccessToken', data.instagramAccessToken);
    }

    const response = await apiClient.put<CollegeDetailResponse>(
      COLLEGE_ENDPOINTS.UPDATE_BY_ID(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Delete college by ID
  deleteCollegeById: async (id: string): Promise<void> => {
    await apiClient.delete<CollegeResponse>(
      COLLEGE_ENDPOINTS.DELETE_BY_ID(id)
    );
  },
}; 