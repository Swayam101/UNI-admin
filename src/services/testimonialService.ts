import apiClient from '../lib/api';
import type { 
  Testimonial, 
  CreateTestimonialRequest,
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
} as const;

export const testimonialService = {
  // Create a new testimonial
  createTestimonial: async (data: CreateTestimonialRequest): Promise<Testimonial> => {
    const response = await apiClient.post<TestimonialDetailResponse>(
      TESTIMONIAL_ENDPOINTS.CREATE,
      data
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
}; 