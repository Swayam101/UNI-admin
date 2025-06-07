import apiClient from '../lib/api';
import type { 
  College, 
  CreateCollegeRequest, 
  UpdateCollegeRequest,
  CollegeListResponse,
  CollegeDetailResponse,
  CollegeResponse
} from '../types/college';

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
    const response = await apiClient.post<CollegeDetailResponse>(
      COLLEGE_ENDPOINTS.CREATE,
      data
    );
    return response.data.data;
  },

  // Get all colleges
  getAllColleges: async (): Promise<College[]> => {
    const response = await apiClient.get<CollegeListResponse>(
      COLLEGE_ENDPOINTS.GET_ALL
    );
    return response.data.data;
  },

  // Get college by ID
  getCollegeById: async (id: string): Promise<College> => {
    const response = await apiClient.get<CollegeDetailResponse>(
      COLLEGE_ENDPOINTS.GET_BY_ID(id)
    );
    return response.data.data;
  },

  // Update college by ID
  updateCollegeById: async (id: string, data: UpdateCollegeRequest): Promise<College> => {
    const response = await apiClient.put<CollegeDetailResponse>(
      COLLEGE_ENDPOINTS.UPDATE_BY_ID(id),
      data
    );
    return response.data.data;
  },

  // Delete college by ID
  deleteCollegeById: async (id: string): Promise<void> => {
    await apiClient.delete<CollegeResponse>(
      COLLEGE_ENDPOINTS.DELETE_BY_ID(id)
    );
  },
}; 