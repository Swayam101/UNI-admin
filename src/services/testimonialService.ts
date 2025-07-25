import apiClient from '../lib/api';
import type { 
  Testimonial, 
  CreateTestimonialRequest,
  EditTestimonialRequest,
  TestimonialListResponse,
  TestimonialDetailResponse
} from '../types/testimonial';

interface GetAllTestimonialsParams {
  search?: string;
  page?: number;
  limit?: number;
}

const TESTIMONIAL_ENDPOINTS = {
  CREATE: '/testimonials',
  GET_ALL: '/testimonials',
  DELETE: '/testimonials',
  EDIT: '/testimonials',
} as const;

export const testimonialService = {
  // Create a new testimonial
  createTestimonial: async (data: CreateTestimonialRequest): Promise<Testimonial> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('file', data.file);
    formData.append('message', data.message);

    const response = await apiClient.post<TestimonialDetailResponse>(
      TESTIMONIAL_ENDPOINTS.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Get all testimonials with optional search and pagination
  getAllTestimonials: async (params?: GetAllTestimonialsParams) => {
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
      ? `${TESTIMONIAL_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : TESTIMONIAL_ENDPOINTS.GET_ALL;

    const response = await apiClient.get<TestimonialListResponse>(url);
    return response.data;
  },

  // Delete a testimonial
  deleteTestimonial: async (testimonialId: string): Promise<void> => {
    await apiClient.delete(`${TESTIMONIAL_ENDPOINTS.DELETE}/${testimonialId}`);
  },

  // Edit a testimonial
  editTestimonial: async (testimonialId: string, data: EditTestimonialRequest): Promise<Testimonial> => {
    const formData = new FormData();
    
    if (data.name) {
      formData.append('name', data.name);
    }
    if (data.file) {
      formData.append('file', data.file);
    }
    if (data.message) {
      formData.append('message', data.message);
    }

    const response = await apiClient.patch<TestimonialDetailResponse>(
      `${TESTIMONIAL_ENDPOINTS.EDIT}/${testimonialId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
}; 